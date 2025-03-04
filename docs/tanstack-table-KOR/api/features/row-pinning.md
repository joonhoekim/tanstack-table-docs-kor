---
title: Row Pinning APIs
id: row-pinning
---

## Can-Pin

행을 **고정**할 수 있는 능력은 다음에 의해 결정됩니다:

- `options.enableRowPinning`이 `true`로 설정됨
- `options.enablePinning`이 `false`로 설정되지 않음

## State

고정 상태는 다음 형태로 테이블에 저장됩니다:

```tsx
export type RowPinningPosition = false | 'top' | 'bottom'

export type RowPinningState = {
  top?: string[]
  bottom?: string[]
}

export type RowPinningRowState = {
  rowPinning: RowPinningState
}
```

## Table Options

### `enableRowPinning`

```tsx
enableRowPinning?: boolean | ((row: Row<TData>) => boolean)
```

모든 행에 대해 행 고정을 활성화/비활성화합니다.

### `keepPinnedRows`

```tsx
keepPinnedRows?: boolean
```

`false`일 경우, 고정된 행은 필터링되거나 페이지네이션되어 테이블에서 제외될 경우 보이지 않습니다. `true`일 경우, 필터링이나 페이지네이션과 상관없이 항상 보입니다. 기본값은 `true`입니다.

### `onRowPinningChange`

```tsx
onRowPinningChange?: OnChangeFn<RowPinningState>
```

제공된 경우, `state.rowPinning`이 변경될 때 `updaterFn`과 함께 호출됩니다. 이는 기본 내부 상태 관리를 대체하므로, `state.rowPinning`을 직접 관리하는 상태에서 제공해야 합니다.

## Table API

### `setRowPinning`

```tsx
setRowPinning: (updater: Updater<RowPinningState>) => void
```

`state.rowPinning` 상태를 설정하거나 업데이트합니다.

### `resetRowPinning`

```tsx
resetRowPinning: (defaultState?: boolean) => void
```

**rowPinning** 상태를 `initialState.rowPinning`으로 재설정하거나, `true`를 전달하여 기본 빈 상태 `{}`로 강제 재설정할 수 있습니다.

### `getIsSomeRowsPinned`

```tsx
getIsSomeRowsPinned: (position?: RowPinningPosition) => boolean
```

어떤 행이 고정되어 있는지 여부를 반환합니다. `top` 또는 `bottom` 위치에 고정된 행만 확인하려면 선택적으로 지정할 수 있습니다.

### `getTopRows`

```tsx
getTopRows: () => Row<TData>[]
```

모든 상단 고정 행을 반환합니다.

### `getBottomRows`

```tsx
getBottomRows: () => Row<TData>[]
```

모든 하단 고정 행을 반환합니다.

### `getCenterRows`

```tsx
getCenterRows: () => Row<TData>[]
```

상단 또는 하단에 고정되지 않은 모든 행을 반환합니다.

## Row API

### `pin`

```tsx
pin: (position: RowPinningPosition) => void
```

행을 `'top'` 또는 `'bottom'`에 고정하거나, `false`를 전달하여 중앙으로 고정 해제합니다.

### `getCanPin`

```tsx
getCanPin: () => boolean
```

행을 고정할 수 있는지 여부를 반환합니다.

### `getIsPinned`

```tsx
getIsPinned: () => RowPinningPosition
```

행의 고정 위치를 반환합니다. (`'top'`, `'bottom'` 또는 `false`)

### `getPinnedIndex`

```tsx
getPinnedIndex: () => number
```

고정된 행 그룹 내에서 행의 숫자 고정 인덱스를 반환합니다.