---
제목: Row Selection APIs
id: row-selection
---

# 상태

Row selection 상태는 다음과 같은 형태로 테이블에 저장됩니다:

```tsx
export type RowSelectionState = Record<string, boolean>

export type RowSelectionTableState = {
  rowSelection: RowSelectionState
}
```

기본적으로, row selection 상태는 각 행의 인덱스를 행 식별자로 사용합니다. row selection 상태는 테이블에 사용자 정의 [getRowId](../../../api/core/table.md#getrowid) 함수를 전달하여 사용자 정의 고유 행 ID로 추적할 수 있습니다.

## 테이블 옵션

### `enableRowSelection`

```tsx
enableRowSelection?: boolean | ((row: Row<TData>) => boolean)
```

- 테이블의 모든 행에 대해 row selection을 활성화/비활성화하거나
- 주어진 행에 대해 row selection을 활성화/비활성화할지를 반환하는 함수

### `enableMultiRowSelection`

```tsx
enableMultiRowSelection?: boolean | ((row: Row<TData>) => boolean)
```

- 테이블의 모든 행에 대해 다중 row selection을 활성화/비활성화하거나
- 주어진 행의 자식/손자 행에 대해 다중 row selection을 활성화/비활성화할지를 반환하는 함수

### `enableSubRowSelection`

```tsx
enableSubRowSelection?: boolean | ((row: Row<TData>) => boolean)
```

부모 행이 선택될 때 자동으로 하위 행을 선택하도록 활성화/비활성화하거나, 각 행에 대해 자동 하위 행 선택을 활성화/비활성화하는 함수.

(확장 또는 그룹화 기능과 함께 사용)

### `onRowSelectionChange`

```tsx
onRowSelectionChange?: OnChangeFn<RowSelectionState>
```

제공된 경우, 이 함수는 `state.rowSelection`이 변경될 때 `updaterFn`과 함께 호출됩니다. 이는 기본 내부 상태 관리를 재정의하므로 테이블 외부에서 상태 변경을 완전히 또는 부분적으로 유지해야 합니다.

## 테이블 API

### `getToggleAllRowsSelectedHandler`

```tsx
getToggleAllRowsSelectedHandler: () => (event: unknown) => void
```

테이블의 모든 행을 토글하는 데 사용할 수 있는 핸들러를 반환합니다.

### `getToggleAllPageRowsSelectedHandler`

```tsx
getToggleAllPageRowsSelectedHandler: () => (event: unknown) => void
```

현재 페이지의 모든 행을 토글하는 데 사용할 수 있는 핸들러를 반환합니다.

### `setRowSelection`

```tsx
setRowSelection: (updater: Updater<RowSelectionState>) => void
```

`state.rowSelection` 상태를 설정하거나 업데이트합니다.

### `resetRowSelection`

```tsx
resetRowSelection: (defaultState?: boolean) => void
```

**rowSelection** 상태를 `initialState.rowSelection`으로 재설정하거나, `true`를 전달하여 기본 빈 상태 `{}`로 강제 재설정할 수 있습니다.

### `getIsAllRowsSelected`

```tsx
getIsAllRowsSelected: () => boolean
```

테이블의 모든 행이 선택되었는지 여부를 반환합니다.

### `getIsAllPageRowsSelected`

```tsx
getIsAllPageRowsSelected: () => boolean
```

현재 페이지의 모든 행이 선택되었는지 여부를 반환합니다.

### `getIsSomeRowsSelected`

```tsx
getIsSomeRowsSelected: () => boolean
```

테이블의 일부 행이 선택되었는지 여부를 반환합니다.

참고: 모든 행이 선택된 경우 `false`를 반환합니다.

### `getIsSomePageRowsSelected`

```tsx
getIsSomePageRowsSelected: () => boolean
```

현재 페이지의 일부 행이 선택되었는지 여부를 반환합니다.

### `toggleAllRowsSelected`

```tsx
toggleAllRowsSelected: (value: boolean) => void
```

테이블의 모든 행을 선택/선택 해제합니다.

### `toggleAllPageRowsSelected`

```tsx
toggleAllPageRowsSelected: (value: boolean) => void
```

현재 페이지의 모든 행을 선택/선택 해제합니다.

### `getPreSelectedRowModel`

```tsx
getPreSelectedRowModel: () => RowModel<TData>
```

### `getSelectedRowModel`

```tsx
getSelectedRowModel: () => RowModel<TData>
```

### `getFilteredSelectedRowModel`

```tsx
getFilteredSelectedRowModel: () => RowModel<TData>
```

### `getGroupedSelectedRowModel`

```tsx
getGroupedSelectedRowModel: () => RowModel<TData>
```

## 행 API

### `getIsSelected`

```tsx
getIsSelected: () => boolean
```

행이 선택되었는지 여부를 반환합니다.

### `getIsSomeSelected`

```tsx
getIsSomeSelected: () => boolean
```

행의 하위 행 중 일부가 선택되었는지 여부를 반환합니다.

### `getIsAllSubRowsSelected`

```tsx
getIsAllSubRowsSelected: () => boolean
```

행의 모든 하위 행이 선택되었는지 여부를 반환합니다.

### `getCanSelect`

```tsx
getCanSelect: () => boolean
```

행을 선택할 수 있는지 여부를 반환합니다.

### `getCanMultiSelect`

```tsx
getCanMultiSelect: () => boolean
```

행이 다중 선택할 수 있는지 여부를 반환합니다.

### `getCanSelectSubRows`

```tsx
getCanSelectSubRows: () => boolean
```

부모 행이 선택될 때 하위 행을 자동으로 선택할 수 있는지 여부를 반환합니다.

### `toggleSelected`

```tsx
toggleSelected: (value?: boolean) => void
```

행을 선택/선택 해제합니다.

### `getToggleSelectedHandler`

```tsx
getToggleSelectedHandler: () => (event: unknown) => void
```

행을 토글하는 데 사용할 수 있는 핸들러를 반환합니다.
