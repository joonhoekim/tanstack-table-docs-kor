---
title: Column Filtering API
id: column-filtering
---

## Can-Filter

column이 필터링될 수 있는 능력은 다음에 의해 결정됩니다:

- column이 유효한 `accessorKey`/`accessorFn`으로 정의되었습니다.
- `column.enableColumnFilter`가 `false`로 설정되지 않았습니다.
- `options.enableColumnFilters`가 `false`로 설정되지 않았습니다.
- `options.enableFilters`가 `false`로 설정되지 않았습니다.

## State

필터 상태는 다음과 같은 형태로 테이블에 저장됩니다:

```tsx
export interface ColumnFiltersTableState {
  columnFilters: ColumnFiltersState
}

export type ColumnFiltersState = ColumnFilter[]

export interface ColumnFilter {
  id: string
  value: unknown
}
```

## Filter Functions

다음 필터 함수들이 테이블 코어에 내장되어 있습니다:

- `includesString`
  - 대소문자를 구분하지 않는 문자열 포함
- `includesStringSensitive`
  - 대소문자를 구분하는 문자열 포함
- `equalsString`
  - 대소문자를 구분하지 않는 문자열 일치
- `equalsStringSensitive`
  - 대소문자를 구분하는 문자열 일치
- `arrIncludes`
  - 배열 내 항목 포함
- `arrIncludesAll`
  - 배열에 모든 항목 포함
- `arrIncludesSome`
  - 배열에 일부 항목 포함
- `equals`
  - 객체/참조 동등성 `Object.is`/`===`
- `weakEquals`
  - 약한 객체/참조 동등성 `==`
- `inNumberRange`
  - 숫자 범위 포함

모든 필터 함수는 다음을 받습니다:

- 필터링할 row
- row의 값을 검색하는 데 사용할 columnId
- 필터 값

그리고 row가 필터링된 rows에 포함되어야 하면 `true`를, 제거되어야 하면 `false`를 반환해야 합니다.

모든 필터 함수의 타입 시그니처는 다음과 같습니다:

```tsx
export type FilterFn<TData extends AnyData> = {
  (
    row: Row<TData>,
    columnId: string,
    filterValue: any,
    addMeta: (meta: any) => void
  ): boolean
  resolveFilterValue?: TransformFilterValueFn<TData>
  autoRemove?: ColumnFilterAutoRemoveTestFn<TData>
  addMeta?: (meta?: any) => void
}

export type TransformFilterValueFn<TData extends AnyData> = (
  value: any,
  column?: Column<TData>
) => unknown

export type ColumnFilterAutoRemoveTestFn<TData extends AnyData> = (
  value: any,
  column?: Column<TData>
) => boolean

export type CustomFilterFns<TData extends AnyData> = Record<
  string,
  FilterFn<TData>
>
```

### `filterFn.resolveFilterValue`

이 선택적인 "hanging" 메서드는 모든 `filterFn`에서 필터 함수에 전달되기 전에 필터 값을 변환/정리/포맷할 수 있게 합니다.

### `filterFn.autoRemove`

이 선택적인 "hanging" 메서드는 모든 `filterFn`에서 필터 값을 전달받아 필터 값이 필터 상태에서 제거되어야 하는 경우 `true`를 반환합니다. 예를 들어, 일부 boolean 스타일 필터는 필터 값이 `false`로 설정된 경우 테이블 상태에서 필터 값을 제거하고 싶을 수 있습니다.

#### 필터 함수 사용하기

필터 함수는 `columnDefinition.filterFn`에 다음을 전달하여 사용/참조/정의할 수 있습니다:

- 내장 필터 함수를 참조하는 `string`
- `columnDefinition.filterFn` 옵션에 직접 제공되는 함수

`columnDef.filterFn` 옵션에 사용할 수 있는 최종 필터 함수 목록은 다음 타입을 사용합니다:

```tsx
export type FilterFnOption<TData extends AnyData> =
  | 'auto'
  | BuiltInFilterFn
  | FilterFn<TData>
```

#### Filter Meta

데이터를 필터링하면 종종 동일한 데이터에 대한 향후 작업을 돕는 데 사용할 수 있는 추가 정보가 노출될 수 있습니다. 이 개념의 좋은 예는 [`match-sorter`](https://github.com/kentcdodds/match-sorter)와 같은 랭킹 시스템으로, 데이터를 동시에 랭킹, 필터링 및 정렬합니다. `match-sorter`와 같은 유틸리티는 단일 차원 필터+정렬 작업에 많은 의미가 있지만, 테이블 구축의 분리된 필터링/정렬 아키텍처는 사용하기 매우 어렵고 느립니다.

랭킹/필터링/정렬 시스템이 테이블에서 작동하도록 하기 위해, `filterFn`은 선택적으로 결과에 **필터 메타** 값을 표시할 수 있으며, 이 값은 나중에 데이터를 원하는 대로 정렬/그룹화/기타 작업하는 데 사용할 수 있습니다. 이는 사용자 정의 `filterFn`에 제공된 `addMeta` 함수를 호출하여 수행됩니다.

아래는 자체 `match-sorter-utils` 패키지(`match-sorter`의 유틸리티 포크)를 사용하여 데이터를 랭킹, 필터링 및 정렬하는 예입니다.

```tsx
import { sortingFns } from '@tanstack/react-table'

import { rankItem, compareItems } from '@tanstack/match-sorter-utils'

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the ranking info
  addMeta(itemRank)

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const fuzzySort = (rowA, rowB, columnId) => {
  let dir = 0

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]!,
      rowB.columnFiltersMeta[columnId]!
    )
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}
```

## Column Def Options

### `filterFn`

```tsx
filterFn?: FilterFn | keyof FilterFns | keyof BuiltInFilterFns
```

이 column에서 사용할 필터 함수입니다.

옵션:

- [내장 필터 함수](#filter-functions)를 참조하는 `string`
- [사용자 정의 필터 함수](#filter-functions)

### `enableColumnFilter`

```tsx
enableColumnFilter?: boolean
```

이 column에 대한 **column** 필터를 활성화/비활성화합니다.

## Column API

### `getCanFilter`

```tsx
getCanFilter: () => boolean
```

column이 **column** 필터링될 수 있는지 여부를 반환합니다.

### `getFilterIndex`

```tsx
getFilterIndex: () => number
```

테이블의 `state.columnFilters` 배열에서 column 필터의 인덱스(`-1` 포함)를 반환합니다.

### `getIsFiltered`

```tsx
getIsFiltered: () => boolean
```

column이 현재 필터링되었는지 여부를 반환합니다.

### `getFilterValue`

```tsx
getFilterValue: () => unknown
```

column의 현재 필터 값을 반환합니다.

### `setFilterValue`

```tsx
setFilterValue: (updater: Updater<any>) => void
```

column의 현재 필터 값을 설정하는 함수입니다. 값이나 기존 값에 대한 불변성 안전 작업을 위한 업데이트 함수를 전달할 수 있습니다.

### `getAutoFilterFn`

```tsx
getAutoFilterFn: (columnId: string) => FilterFn<TData> | undefined
```

column의 첫 번째 알려진 값을 기반으로 자동으로 계산된 필터 함수를 반환합니다.

### `getFilterFn`

```tsx
getFilterFn: (columnId: string) => FilterFn<TData> | undefined
```

지정된 columnId에 대한 필터 함수(사용자 정의 또는 자동, 구성에 따라 다름)를 반환합니다.

## Row API

### `columnFilters`

```tsx
columnFilters: Record<string, boolean>
```

row의 column 필터 맵입니다. 이 객체는 row가 column ID별로 특정 필터를 통과/실패하는지 여부를 추적합니다.

### `columnFiltersMeta`

```tsx
columnFiltersMeta: Record<string, any>
```

row의 column 필터 메타 맵입니다. 이 객체는 필터링 프로세스 중에 선택적으로 제공된 row에 대한 필터 메타를 추적합니다.

## Table Options

### `filterFns`

```tsx
filterFns?: Record<string, FilterFn>
```

이 옵션을 사용하면 column의 `filterFn` 옵션에서 키로 참조할 수 있는 사용자 정의 필터 함수를 정의할 수 있습니다.
예시:

```tsx
declare module '@tanstack/[adapter]-table' {
  interface FilterFns {
    myCustomFilter: FilterFn<unknown>
  }
}

const column = columnHelper.data('key', {
  filterFn: 'myCustomFilter',
})

const table = useReactTable({
  columns: [column],
  filterFns: {
    myCustomFilter: (rows, columnIds, filterValue) => {
      // return the filtered rows
    },
  },
})
```

### `filterFromLeafRows`

```tsx
filterFromLeafRows?: boolean
```

기본적으로 필터링은 부모 row에서 아래로 수행됩니다(따라서 부모 row가 필터링되면 모든 하위 항목도 필터링됩니다). 이 옵션을 `true`로 설정하면 필터링이 리프 row에서 위로 수행됩니다(즉, 하위 또는 손자 row 중 하나가 포함되는 한 부모 row도 포함됩니다).

### `maxLeafRowFilterDepth`

```tsx
maxLeafRowFilterDepth?: number
```

기본적으로 필터링은 모든 row(최대 깊이 100)에 대해 수행되며, 루트 레벨 부모 row인지 부모 row의 자식 리프 row인지는 상관없습니다. 이 옵션을 `0`으로 설정하면 필터링이 루트 레벨 부모 row에만 적용되고 모든 하위 row는 필터링되지 않은 상태로 유지됩니다. 마찬가지로, 이 옵션을 `1`로 설정하면 필터링이 1단계 깊이의 자식 리프 row에만 적용되는 식입니다.

이는 적용된 필터에 관계없이 row의 전체 자식 계층이 표시되기를 원하는 상황에 유용합니다.

### `enableFilters`

```tsx
enableFilters?: boolean
```

테이블의 모든 필터를 활성화/비활성화합니다.

### `manualFiltering`

```tsx
manualFiltering?: boolean
```

데이터 필터링에 `getFilteredRowModel`이 사용되지 않도록 비활성화합니다. 이는 테이블이 클라이언트 측 및 서버 측 필터링을 모두 동적으로 지원해야 하는 경우에 유용할 수 있습니다.

### `onColumnFiltersChange`

```tsx
onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>
```

제공된 경우, 이 함수는 `state.columnFilters`가 변경될 때 `updaterFn`과 함께 호출됩니다. 이는 기본 내부 상태 관리를 재정의하므로 테이블 외부에서 상태 변경을 완전히 또는 부분적으로 유지해야 합니다.

### `enableColumnFilters`

```tsx
enableColumnFilters?: boolean
```

테이블의 **모든** column 필터를 활성화/비활성화합니다.

### `getFilteredRowModel`

```tsx
getFilteredRowModel?: (
  table: Table<TData>
) => () => RowModel<TData>
```

제공된 경우, 이 함수는 테이블당 **한 번** 호출되며 필터링될 때 테이블의 row 모델을 계산하고 반환하는 **새 함수**를 반환해야 합니다.

- 서버 측 필터링의 경우, 서버가 이미 필터링된 row 모델을 반환해야 하므로 이 함수는 불필요하며 무시할 수 있습니다.
- 클라이언트 측 필터링의 경우, 이 함수가 필요합니다. 기본 구현은 모든 테이블 어댑터의 `{ getFilteredRowModel }` 내보내기를 통해 제공됩니다.

예시:

```tsx
import { getFilteredRowModel } from '@tanstack/[adapter]-table'


  getFilteredRowModel: getFilteredRowModel(),
})
```

## Table API

### `setColumnFilters`

```tsx
setColumnFilters: (updater: Updater<ColumnFiltersState>) => void
```

`state.columnFilters` 상태를 설정하거나 업데이트합니다.

### `resetColumnFilters`

```tsx
resetColumnFilters: (defaultState?: boolean) => void
```

**columnFilters** 상태를 `initialState.columnFilters`로 재설정하거나, `true`를 전달하여 기본 빈 상태 `[]`로 강제 재설정할 수 있습니다.

### `getPreFilteredRowModel`

```tsx
getPreFilteredRowModel: () => RowModel<TData>
```

**column** 필터링이 적용되기 전 테이블의 row 모델을 반환합니다.

### `getFilteredRowModel`

```tsx
getFilteredRowModel: () => RowModel<TData>
```

**column** 필터링이 적용된 후 테이블의 row 모델을 반환합니다.
