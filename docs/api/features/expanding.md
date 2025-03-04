---
title: Expanding APIs
id: expanding
---

## State

Expanding state는 다음과 같은 형태로 테이블에 저장됩니다:

```tsx
export type ExpandedState = true | Record<string, boolean>

export type ExpandedTableState = {
  expanded: ExpandedState
}
```

## Row API

### `toggleExpanded`

```tsx
toggleExpanded: (expanded?: boolean) => void
```

행의 expanded 상태를 토글합니다(또는 `expanded`가 제공된 경우 해당 값으로 설정합니다).

### `getIsExpanded`

```tsx
getIsExpanded: () => boolean
```

행이 확장되었는지 여부를 반환합니다.

### `getIsAllParentsExpanded`

```tsx
getIsAllParentsExpanded: () => boolean
```

행의 모든 상위 행이 확장되었는지 여부를 반환합니다.

### `getCanExpand`

```tsx
getCanExpand: () => boolean
```

행이 확장 가능한지 여부를 반환합니다.

### `getToggleExpandedHandler`

```tsx
getToggleExpandedHandler: () => () => void
```

행의 expanded 상태를 토글하는 데 사용할 수 있는 함수를 반환합니다. 이 함수는 버튼에 이벤트 핸들러를 바인딩하는 데 사용할 수 있습니다.

## Table Options

### `manualExpanding`

```tsx
manualExpanding?: boolean
```

수동 행 확장을 활성화합니다. 이 값이 `true`로 설정되면, `getExpandedRowModel`이 행을 확장하는 데 사용되지 않으며 자체 데이터 모델에서 확장을 수행해야 합니다. 이는 서버 측 확장을 수행하는 경우에 유용합니다.

### `onExpandedChange`

```tsx
onExpandedChange?: OnChangeFn<ExpandedState>
```

이 함수는 `expanded` 테이블 상태가 변경될 때 호출됩니다. 함수가 제공되면 이 상태를 직접 관리해야 합니다. 관리되는 상태를 테이블에 다시 전달하려면 `tableOptions.state.expanded` 옵션을 사용하세요.

### `autoResetExpanded`

```tsx
autoResetExpanded?: boolean
```

확장 상태가 변경될 때 테이블의 expanded 상태를 자동으로 재설정하려면 이 설정을 활성화하세요.

### `enableExpanding`

```tsx
enableExpanding?: boolean
```

모든 행에 대한 확장을 활성화/비활성화합니다.

### `getExpandedRowModel`

```tsx
getExpandedRowModel?: (table: Table<TData>) => () => RowModel<TData>
```

이 함수는 expanded row model을 반환하는 역할을 합니다. 이 함수가 제공되지 않으면 테이블은 행을 확장하지 않습니다. 기본 내보내기된 `getExpandedRowModel` 함수를 사용하여 expanded row model을 가져오거나 직접 구현할 수 있습니다.

### `getIsRowExpanded`

```tsx
getIsRowExpanded?: (row: Row<TData>) => boolean
```

제공된 경우, 행이 현재 확장되었는지 여부를 결정하는 기본 동작을 재정의할 수 있습니다.

### `getRowCanExpand`

```tsx
getRowCanExpand?: (row: Row<TData>) => boolean
```

제공된 경우, 행이 확장 가능한지 여부를 결정하는 기본 동작을 재정의할 수 있습니다.

### `paginateExpandedRows`

```tsx
paginateExpandedRows?: boolean
```

`true`인 경우 확장된 행은 테이블의 나머지 부분과 함께 페이지네이션됩니다(확장된 행이 여러 페이지에 걸쳐 있을 수 있음을 의미).

`false`인 경우 확장된 행은 페이지네이션에 고려되지 않습니다(확장된 행이 항상 부모 페이지에 렌더링됨을 의미합니다. 이는 설정된 페이지 크기보다 더 많은 행이 렌더링됨을 의미합니다).

## Table API

### `setExpanded`

```tsx
setExpanded: (updater: Updater<ExpandedState>) => void
```

업데이트 함수나 값을 통해 테이블의 expanded 상태를 업데이트합니다.

### `toggleAllRowsExpanded`

```tsx
toggleAllRowsExpanded: (expanded?: boolean) => void
```

모든 행의 expanded 상태를 토글합니다. 선택적으로 expanded 상태를 설정할 값을 제공할 수 있습니다.

### `resetExpanded`

```tsx
resetExpanded: (defaultState?: boolean) => void
```

테이블의 expanded 상태를 초기 상태로 재설정합니다. `defaultState`가 제공되면 expanded 상태는 `{}`로 재설정됩니다.

### `getCanSomeRowsExpand`

```tsx
getCanSomeRowsExpand: () => boolean
```

확장 가능한 행이 있는지 여부를 반환합니다.

### `getToggleAllRowsExpandedHandler`

```tsx
getToggleAllRowsExpandedHandler: () => (event: unknown) => void
```

모든 행의 expanded 상태를 토글하는 데 사용할 수 있는 핸들러를 반환합니다. 이 핸들러는 `input[type=checkbox]` 요소와 함께 사용하기 위한 것입니다.

### `getIsSomeRowsExpanded`

```tsx
getIsSomeRowsExpanded: () => boolean
```

현재 확장된 행이 있는지 여부를 반환합니다.

### `getIsAllRowsExpanded`

```tsx
getIsAllRowsExpanded: () => boolean
```

현재 모든 행이 확장되었는지 여부를 반환합니다.

### `getExpandedDepth`

```tsx
getExpandedDepth: () => number
```

확장된 행의 최대 깊이를 반환합니다.

### `getExpandedRowModel`

```tsx
getExpandedRowModel: () => RowModel<TData>
```

확장이 적용된 후의 row model을 반환합니다.

### `getPreExpandedRowModel`

```tsx
getPreExpandedRowModel: () => RowModel<TData>
```

확장이 적용되기 전의 row model을 반환합니다.
