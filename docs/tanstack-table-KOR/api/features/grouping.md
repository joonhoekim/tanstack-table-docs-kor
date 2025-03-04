---
title: Grouping API
id: grouping
---

## State

Grouping state는 다음과 같은 형태로 테이블에 저장됩니다:

```tsx
export type GroupingState = string[]

export type GroupingTableState = {
  grouping: GroupingState
}
```

## Aggregation Functions

다음 aggregation function들은 테이블 코어에 내장되어 있습니다:

- `sum`
  - 행 그룹의 값들을 합산합니다
- `min`
  - 행 그룹의 최소값을 찾습니다
- `max`
  - 행 그룹의 최대값을 찾습니다
- `extent`
  - 행 그룹의 최소값과 최대값을 찾습니다
- `mean`
  - 행 그룹의 평균값을 찾습니다
- `median`
  - 행 그룹의 중앙값을 찾습니다
- `unique`
  - 행 그룹의 고유 값들을 찾습니다
- `uniqueCount`
  - 행 그룹의 고유 값 개수를 찾습니다
- `count`
  - 그룹 내 행의 개수를 계산합니다

모든 grouping function은 다음을 받습니다:

- 그룹 행의 leaf 값을 검색하는 함수
- 그룹 행의 직계 자식 값을 검색하는 함수

그리고 집계된 행 모델을 구축하기 위한 값(일반적으로 원시값)을 반환해야 합니다.

모든 aggregation function의 타입 시그니처는 다음과 같습니다:

```tsx
export type AggregationFn<TData extends AnyData> = (
  getLeafRows: () => Row<TData>[],
  getChildRows: () => Row<TData>[]
) => any
```

#### Aggregation Functions 사용하기

Aggregation function은 다음을 `columnDefinition.aggregationFn`에 전달하여 사용/참조/정의할 수 있습니다:

- 내장 aggregation function을 참조하는 `string`
- `tableOptions.aggregationFns` 옵션을 통해 제공된 사용자 정의 aggregation function을 참조하는 `string`
- `columnDefinition.aggregationFn` 옵션에 직접 제공된 함수

`columnDef.aggregationFn`에 사용 가능한 최종 aggregation function 목록은 다음 타입을 사용합니다:

```tsx
export type AggregationFnOption<TData extends AnyData> =
  | 'auto'
  | keyof AggregationFns
  | BuiltInAggregationFn
  | AggregationFn<TData>
```

## Column Def Options

### `aggregationFn`

```tsx
aggregationFn?: AggregationFn | keyof AggregationFns | keyof BuiltInAggregationFns
```

이 열에 사용할 aggregation function입니다.

옵션:

- [내장 aggregation function](#aggregation-functions)을 참조하는 `string`
- [사용자 정의 aggregation function](#aggregation-functions)

### `aggregatedCell`

```tsx
aggregatedCell?: Renderable<
  {
    table: Table<TData>
    row: Row<TData>
    column: Column<TData>
    cell: Cell<TData>
    getValue: () => any
    renderValue: () => any
  }
>
```

셀이 집계된 경우 열의 각 행을 표시할 셀입니다. 함수가 전달되면 셀의 컨텍스트가 포함된 props 객체를 전달받고 어댑터에 맞는 속성 타입을 반환해야 합니다(정확한 타입은 사용 중인 어댑터에 따라 다릅니다).

### `enableGrouping`

```tsx
enableGrouping?: boolean
```

이 열의 grouping을 활성화/비활성화합니다.

### `getGroupingValue`

```tsx
getGroupingValue?: (row: TData) => any
```

이 열에서 행을 그룹화하는 데 사용할 값을 지정합니다. 이 옵션이 지정되지 않으면 `accessorKey` / `accessorFn`에서 파생된 값이 대신 사용됩니다.

## Column API

### `aggregationFn`

```tsx
aggregationFn?: AggregationFnOption<TData>
```

열에 대해 확인된 aggregation function입니다.

### `getCanGroup`

```tsx
getCanGroup: () => boolean
```

열을 그룹화할 수 있는지 여부를 반환합니다.

### `getIsGrouped`

```tsx
getIsGrouped: () => boolean
```

열이 현재 그룹화되어 있는지 여부를 반환합니다.

### `getGroupedIndex`

```tsx
getGroupedIndex: () => number
```

grouping state에서 열의 인덱스를 반환합니다.

### `toggleGrouping`

```tsx
toggleGrouping: () => void
```

열의 grouping state를 토글합니다.

### `getToggleGroupingHandler`

```tsx
getToggleGroupingHandler: () => () => void
```

열의 grouping state를 토글하는 함수를 반환합니다. 이는 버튼의 `onClick` prop에 전달하는 데 유용합니다.

### `getAutoAggregationFn`

```tsx
getAutoAggregationFn: () => AggregationFn<TData> | undefined
```

열에 대해 자동으로 유추된 aggregation function을 반환합니다.

### `getAggregationFn`

```tsx
getAggregationFn: () => AggregationFn<TData> | undefined
```

열에 대한 aggregation function을 반환합니다.

## Row API

### `groupingColumnId`

```tsx
groupingColumnId?: string
```

이 행이 그룹화된 경우, 이 행이 그룹화된 열의 ID입니다.

### `groupingValue`

```tsx
groupingValue?: any
```

이 행이 그룹화된 경우, 이 그룹의 모든 행에 대한 `groupingColumnId`의 고유/공유 값입니다.

### `getIsGrouped`

```tsx
getIsGrouped: () => boolean
```

행이 현재 그룹화되어 있는지 여부를 반환합니다.

### `getGroupingValue`

```tsx
getGroupingValue: (columnId: string) => unknown
```

모든 행과 열(leaf 행 포함)에 대한 grouping 값을 반환합니다.

## Table Options

### `aggregationFns`

```tsx
aggregationFns?: Record<string, AggregationFn>
```

이 옵션을 사용하면 열의 `aggregationFn` 옵션에서 키로 참조할 수 있는 사용자 정의 aggregation function을 정의할 수 있습니다.
예시:

```tsx
declare module '@tanstack/table-core' {
  interface AggregationFns {
    myCustomAggregation: AggregationFn<unknown>
  }
}

const column = columnHelper.data('key', {
  aggregationFn: 'myCustomAggregation',
})

const table = useReactTable({
  columns: [column],
  aggregationFns: {
    myCustomAggregation: (columnId, leafRows, childRows) => {
      // 집계된 값 반환
    },
  },
})
```

### `manualGrouping`

```tsx
manualGrouping?: boolean
```

수동 grouping을 활성화합니다. 이 옵션이 `true`로 설정되면 테이블은 `getGroupedRowModel()`을 사용하여 자동으로 행을 그룹화하지 않고 대신 테이블에 전달하기 전에 수동으로 행을 그룹화할 것으로 예상합니다. 이는 서버 측 그룹화 및 집계를 수행하는 경우에 유용합니다.

### `onGroupingChange`

```tsx
onGroupingChange?: OnChangeFn<GroupingState>
```

이 함수가 제공되면 grouping state가 변경될 때 호출되며 직접 상태를 관리해야 합니다. 관리된 상태를 `tableOptions.state.grouping` 옵션을 통해 테이블에 다시 전달할 수 있습니다.

### `enableGrouping`

```tsx
enableGrouping?: boolean
```

모든 열에 대한 grouping을 활성화/비활성화합니다.

### `getGroupedRowModel`

```tsx
getGroupedRowModel?: (table: Table<TData>) => () => RowModel<TData>
```

grouping이 수행된 후의 행 모델을 반환하지만, 그 이상은 아닙니다.

### `groupedColumnMode`

```tsx
groupedColumnMode?: false | 'reorder' | 'remove' // 기본값: `reorder`
```

그룹화된 열은 기본적으로 열 목록의 시작 부분으로 자동 재정렬됩니다. 제거하거나 있는 그대로 두고 싶다면 여기에 적절한 모드를 설정하세요.

## Table API

### `setGrouping`

```tsx
setGrouping: (updater: Updater<GroupingState>) => void
```

`state.grouping` 상태를 설정하거나 업데이트합니다.

### `resetGrouping`

```tsx
resetGrouping: (defaultState?: boolean) => void
```

**grouping** 상태를 `initialState.grouping`으로 재설정하거나, `true`를 전달하여 기본 빈 상태 `[]`로 강제 재설정할 수 있습니다.

### `getPreGroupedRowModel`

```tsx
getPreGroupedRowModel: () => RowModel<TData>
```

grouping이 적용되기 전의 테이블 행 모델을 반환합니다.

### `getGroupedRowModel`

```tsx
getGroupedRowModel: () => RowModel<TData>
```

grouping이 적용된 후의 테이블 행 모델을 반환합니다.

## Cell API

### `getIsAggregated`

```tsx
getIsAggregated: () => boolean
```

셀이 현재 집계되어 있는지 여부를 반환합니다.

### `getIsGrouped`

```tsx
getIsGrouped: () => boolean
```

셀이 현재 그룹화되어 있는지 여부를 반환합니다.

### `getIsPlaceholder`

```tsx
getIsPlaceholder: () => boolean
```

셀이 현재 플레이스홀더인지 여부를 반환합니다.