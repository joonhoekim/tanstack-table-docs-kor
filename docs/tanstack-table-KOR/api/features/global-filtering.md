---
title: Global Filtering APIs
id: global-filtering
---

## Can-Filter

열이 **전역적으로** 필터링될 수 있는 능력은 다음에 의해 결정됩니다:

- 열이 유효한 `accessorKey`/`accessorFn`으로 정의되었습니다.
- 제공된 경우, `options.getColumnCanGlobalFilter`가 주어진 열에 대해 `true`를 반환합니다. 제공되지 않은 경우, 첫 번째 행의 값이 `string` 또는 `number` 타입이면 열은 전역적으로 필터링 가능한 것으로 간주됩니다.
- `column.enableColumnFilter`가 `false`로 설정되지 않았습니다.
- `options.enableColumnFilters`가 `false`로 설정되지 않았습니다.
- `options.enableFilters`가 `false`로 설정되지 않았습니다.

## State

필터 상태는 다음과 같은 형태로 테이블에 저장됩니다:

```tsx
export interface GlobalFilterTableState {
  globalFilter: any
}
```

## Filter Functions

전역 필터링에는 열 필터링에 사용할 수 있는 것과 동일한 필터 함수를 사용할 수 있습니다. 필터 함수에 대해 자세히 알아보려면 [Column Filtering APIs](../column-filtering)를 참조하세요.

#### Using Filter Functions

필터 함수는 다음을 `options.globalFilterFn`에 전달하여 사용/참조/정의할 수 있습니다:

- 내장 필터 함수를 참조하는 `string`
- `options.globalFilterFn` 옵션에 직접 제공되는 함수

`tableOptions.globalFilterFn` 옵션에 사용할 수 있는 최종 필터 함수 목록은 다음 타입을 사용합니다:

```tsx
export type FilterFnOption<TData extends AnyData> =
  | 'auto'
  | BuiltInFilterFn
  | FilterFn<TData>
```

#### Filter Meta

필터링 데이터는 종종 동일한 데이터에 대한 다른 미래 작업을 돕는 데 사용할 수 있는 추가 정보를 노출할 수 있습니다. 이 개념의 좋은 예는 [`match-sorter`](https://github.com/kentcdodds/match-sorter)와 같은 랭킹 시스템으로, 데이터를 동시에 랭킹, 필터링 및 정렬합니다. `match-sorter`와 같은 유틸리티는 단일 차원 필터+정렬 작업에 많은 의미가 있지만, 테이블을 구축하는 분리된 필터링/정렬 아키텍처는 사용하기 매우 어렵고 느립니다.

랭킹/필터링/정렬 시스템이 테이블과 작동하도록 하기 위해, `filterFn`은 선택적으로 나중에 데이터를 원하는 대로 정렬/그룹화/등을 하는 데 사용할 수 있는 **필터 메타** 값으로 결과를 표시할 수 있습니다. 이는 사용자 정의 `filterFn`에 제공된 `addMeta` 함수를 호출하여 수행됩니다.

아래는 자체 `match-sorter-utils` 패키지(match-sorter의 유틸리티 포크)를 사용하여 데이터를 랭킹, 필터링 및 정렬하는 예입니다.

```tsx
import { sortingFns } from '@tanstack/[adapter]-table'

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

### `enableGlobalFilter`

```tsx
enableGlobalFilter?: boolean
```

테이블의 전역 필터를 활성화/비활성화합니다.

### `getColumnCanGlobalFilter`

```tsx
getColumnCanGlobalFilter?: (column: Column<TData>) => boolean
```

제공된 경우, 이 함수는 열과 함께 호출되며 이 열이 전역 필터링에 사용되어야 하는지 여부를 나타내는 `true` 또는 `false`를 반환해야 합니다.
이는 열이 `string` 또는 `number`가 아닌 데이터(예: `undefined`)를 포함할 수 있는 경우에 유용합니다.

## Column API

### `getCanGlobalFilter`

```tsx
getCanGlobalFilter: () => boolean
```

열이 **전역적으로** 필터링될 수 있는지 여부를 반환합니다. 전역 필터링 중에 열이 스캔되지 않도록 하려면 `false`로 설정하세요.

## Row API

### `columnFiltersMeta`

```tsx
columnFiltersMeta: Record<string, any>
```

행에 대한 열 필터 메타 맵입니다. 이 객체는 필터링 과정에서 선택적으로 제공된 행에 대한 필터 메타를 추적합니다.

## Table Options

### `filterFns`

```tsx
filterFns?: Record<string, FilterFn>
```

이 옵션을 사용하면 열의 `filterFn` 옵션에서 키로 참조할 수 있는 사용자 정의 필터 함수를 정의할 수 있습니다.
예시:

```tsx
declare module '@tanstack/table-core' {
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

기본적으로 필터링은 부모 행에서 아래로 수행됩니다(따라서 부모 행이 필터링되면 모든 하위 행도 필터링됩니다). 이 옵션을 `true`로 설정하면 필터링이 리프 행에서 위로 수행됩니다(즉, 하위 행이나 손자 행 중 하나가 포함되는 한 부모 행도 포함됩니다).

### `maxLeafRowFilterDepth`

```tsx
maxLeafRowFilterDepth?: number
```

기본적으로 필터링은 모든 행(최대 깊이 100)에 대해 수행되며, 루트 레벨 부모 행인지 부모 행의 하위 리프 행인지는 상관없습니다. 이 옵션을 `0`으로 설정하면 필터링은 루트 레벨 부모 행에만 적용되고 모든 하위 행은 필터링되지 않습니다. 마찬가지로, 이 옵션을 `1`로 설정하면 필터링은 깊이가 1인 하위 리프 행에만 적용되는 식입니다.

이는 적용된 필터에 관계없이 행의 전체 하위 계층이 표시되기를 원하는 상황에 유용합니다.

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

### `getFilteredRowModel`

```tsx
getFilteredRowModel?: (
  table: Table<TData>
) => () => RowModel<TData>
```

제공된 경우, 이 함수는 테이블당 **한 번** 호출되며 필터링될 때 테이블의 행 모델을 계산하고 반환하는 **새 함수**를 반환해야 합니다.

- 서버 측 필터링의 경우, 서버가 이미 필터링된 행 모델을 반환해야 하므로 이 함수는 불필요하며 무시할 수 있습니다.
- 클라이언트 측 필터링의 경우, 이 함수가 필요합니다. 기본 구현은 모든 테이블 어댑터의 `{ getFilteredRowModel }` 내보내기를 통해 제공됩니다.

예시:

```tsx
import { getFilteredRowModel } from '@tanstack/[adapter]-table'

  getFilteredRowModel: getFilteredRowModel(),
})
```

### `globalFilterFn`

```tsx
globalFilterFn?: FilterFn | keyof FilterFns | keyof BuiltInFilterFns
```

전역 필터링에 사용할 필터 함수입니다.

옵션:

- [내장 필터 함수](#filter-functions)를 참조하는 `string`
- `tableOptions.filterFns` 옵션을 통해 제공된 사용자 정의 필터 함수를 참조하는 `string`
- [사용자 정의 필터 함수](#filter-functions)

### `onGlobalFilterChange`

```tsx
onGlobalFilterChange?: OnChangeFn<GlobalFilterState>
```

제공된 경우, 이 함수는 `state.globalFilter`가 변경될 때 `updaterFn`과 함께 호출됩니다. 이는 기본 내부 상태 관리를 재정의하므로, 상태 변경을 테이블 외부에서 완전히 또는 부분적으로 유지해야 합니다.

## Table API

### `getPreFilteredRowModel`

```tsx
getPreFilteredRowModel: () => RowModel<TData>
```

**열** 필터링이 적용되기 전의 테이블에 대한 행 모델을 반환합니다.

### `getFilteredRowModel`

```tsx
getFilteredRowModel: () => RowModel<TData>
```

**열** 필터링이 적용된 후의 테이블에 대한 행 모델을 반환합니다.

### `setGlobalFilter`

```tsx
setGlobalFilter: (updater: Updater<any>) => void
```

`state.globalFilter` 상태를 설정하거나 업데이트합니다.

### `resetGlobalFilter`

```tsx
resetGlobalFilter: (defaultState?: boolean) => void
```

**globalFilter** 상태를 `initialState.globalFilter`로 재설정하거나, `true`를 전달하여 기본 빈 상태를 `undefined`로 강제 재설정할 수 있습니다.

### `getGlobalAutoFilterFn`

```tsx
getGlobalAutoFilterFn: (columnId: string) => FilterFn<TData> | undefined
```

현재 이 함수는 내장된 `includesString` 필터 함수를 반환합니다. 향후 릴리스에서는 제공된 데이터의 특성에 따라 더 동적인 필터 함수를 반환할 수 있습니다.

### `getGlobalFilterFn`

```tsx
getGlobalFilterFn: (columnId: string) => FilterFn<TData> | undefined
```

테이블에 대한 전역 필터 함수(구성에 따라 사용자 정의 또는 자동)를 반환합니다.