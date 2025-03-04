---
title: Column Visibility API
id: column-visibility
---

## State

Column 가시성 상태는 다음과 같은 형태로 테이블에 저장됩니다:

```tsx
export type VisibilityState = Record<string, boolean>

export type VisibilityTableState = {
  columnVisibility: VisibilityState
}
```

## Column Def Options

### `enableHiding`

```tsx
enableHiding?: boolean
```

column 숨기기를 활성화/비활성화합니다.

## Column API

### `getCanHide`

```tsx
getCanHide: () => boolean
```

column을 숨길 수 있는지 여부를 반환합니다.

### `getIsVisible`

```tsx
getIsVisible: () => boolean
```

column이 표시되는지 여부를 반환합니다.

### `toggleVisibility`

```tsx
toggleVisibility: (value?: boolean) => void
```

column 가시성을 토글합니다.

### `getToggleVisibilityHandler`

```tsx
getToggleVisibilityHandler: () => (event: unknown) => void
```

column 가시성을 토글하는 데 사용할 수 있는 함수를 반환합니다. 이 함수는 체크박스에 이벤트 핸들러를 바인딩하는 데 사용할 수 있습니다.

## Table Options

### `onColumnVisibilityChange`

```tsx
onColumnVisibilityChange?: OnChangeFn<VisibilityState>
```

제공된 경우, 이 함수는 `state.columnVisibility`가 변경될 때 `updaterFn`과 함께 호출됩니다. 이는 기본 내부 상태 관리를 재정의하므로 테이블 외부에서 상태 변경을 완전히 또는 부분적으로 유지해야 합니다.

### `enableHiding`

```tsx
enableHiding?: boolean
```

column 숨기기를 활성화/비활성화합니다.

## Table API

### `getVisibleFlatColumns`

```tsx
getVisibleFlatColumns: () => Column<TData>[]
```

부모 column을 포함하여 표시되는 column의 평면 배열을 반환합니다.

### `getVisibleLeafColumns`

```tsx
getVisibleLeafColumns: () => Column<TData>[]
```

표시되는 리프 노드 column의 평면 배열을 반환합니다.

### `getLeftVisibleLeafColumns`

```tsx
getLeftVisibleLeafColumns: () => Column<TData>[]
```

column 고정을 사용하는 경우, 테이블의 왼쪽 부분에 표시되는 리프 노드 column의 평면 배열을 반환합니다.

### `getRightVisibleLeafColumns`

```tsx
getRightVisibleLeafColumns: () => Column<TData>[]
```

column 고정을 사용하는 경우, 테이블의 오른쪽 부분에 표시되는 리프 노드 column의 평면 배열을 반환합니다.

### `getCenterVisibleLeafColumns`

```tsx
getCenterVisibleLeafColumns: () => Column<TData>[]
```

column 고정을 사용하는 경우, 테이블의 고정되지 않은/중앙 부분에 표시되는 리프 노드 column의 평면 배열을 반환합니다.

### `setColumnVisibility`

```tsx
setColumnVisibility: (updater: Updater<VisibilityState>) => void
```

업데이터 함수 또는 값을 통해 column 가시성 상태를 업데이트합니다.

### `resetColumnVisibility`

```tsx
resetColumnVisibility: (defaultState?: boolean) => void
```

column 가시성 상태를 초기 상태로 재설정합니다. `defaultState`가 제공되면 상태는 `{}`로 재설정됩니다.

### `toggleAllColumnsVisible`

```tsx
toggleAllColumnsVisible: (value?: boolean) => void
```

모든 column의 가시성을 토글합니다.

### `getIsAllColumnsVisible`

```tsx
getIsAllColumnsVisible: () => boolean
```

모든 column이 표시되는지 여부를 반환합니다.

### `getIsSomeColumnsVisible`

```tsx
getIsSomeColumnsVisible: () => boolean
```

일부 column이 표시되는지 여부를 반환합니다.

### `getToggleAllColumnsVisibilityHandler`

```tsx
getToggleAllColumnsVisibilityHandler: () => ((event: unknown) => void)
```

모든 column의 가시성을 토글하기 위한 핸들러를 반환합니다. `input[type=checkbox]` 요소에 바인딩하기 위한 것입니다.

## Row API

### `getVisibleCells`

```tsx
getVisibleCells: () => Cell<TData>[]
```

row에 대해 column 가시성을 고려한 셀 배열을 반환합니다.