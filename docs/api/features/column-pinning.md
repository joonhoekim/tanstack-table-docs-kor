---
title: Column Pinning API
id: column-pinning
---

## Can-Pin

column이 **고정(pinned)**될 수 있는 능력은 다음에 의해 결정됩니다:

- `options.enablePinning`이 `false`로 설정되지 않았습니다.
- `options.enableColumnPinning`이 `false`로 설정되지 않았습니다.
- `columnDefinition.enablePinning`이 `false`로 설정되지 않았습니다.

## State

고정(pinning) 상태는 다음과 같은 형태로 테이블에 저장됩니다:

```tsx
export type ColumnPinningPosition = false | 'left' | 'right'

export type ColumnPinningState = {
  left?: string[]
  right?: string[]
}


export type ColumnPinningTableState = {
  columnPinning: ColumnPinningState
}
```

## Table Options

### `enableColumnPinning`

```tsx
enableColumnPinning?: boolean
```

테이블의 모든 column에 대한 column 고정을 활성화/비활성화합니다.

### `onColumnPinningChange`

```tsx
onColumnPinningChange?: OnChangeFn<ColumnPinningState>
```

제공된 경우, 이 함수는 `state.columnPinning`이 변경될 때 `updaterFn`과 함께 호출됩니다. 이는 기본 내부 상태 관리를 재정의하므로 자체 관리 상태에서 `state.columnPinning`도 제공해야 합니다.

## Column Def Options

### `enablePinning`

```tsx
enablePinning?: boolean
```

column에 대한 고정을 활성화/비활성화합니다.

## Table API

### `setColumnPinning`

```tsx
setColumnPinning: (updater: Updater<ColumnPinningState>) => void
```

`state.columnPinning` 상태를 설정하거나 업데이트합니다.

### `resetColumnPinning`

```tsx
resetColumnPinning: (defaultState?: boolean) => void
```

**columnPinning** 상태를 `initialState.columnPinning`으로 재설정하거나, `true`를 전달하여 기본 빈 상태 `{ left: [], right: [], }`로 강제 재설정할 수 있습니다.

### `getIsSomeColumnsPinned`

```tsx
getIsSomeColumnsPinned: (position?: ColumnPinningPosition) => boolean
```

column이 고정되어 있는지 여부를 반환합니다. 선택적으로 `left` 또는 `right` 위치에 고정된 column만 확인하도록 지정할 수 있습니다.

_참고: column 가시성을 고려하지 않습니다_

### `getLeftHeaderGroups`

```tsx
getLeftHeaderGroups: () => HeaderGroup<TData>[]
```

테이블의 왼쪽 고정 헤더 그룹을 반환합니다.

### `getCenterHeaderGroups`

```tsx
getCenterHeaderGroups: () => HeaderGroup<TData>[]
```

테이블의 고정되지 않은/중앙 헤더 그룹을 반환합니다.

### `getRightHeaderGroups`

```tsx
getRightHeaderGroups: () => HeaderGroup<TData>[]
```

테이블의 오른쪽 고정 헤더 그룹을 반환합니다.

### `getLeftFooterGroups`

```tsx
getLeftFooterGroups: () => HeaderGroup<TData>[]
```

테이블의 왼쪽 고정 푸터 그룹을 반환합니다.

### `getCenterFooterGroups`

```tsx
getCenterFooterGroups: () => HeaderGroup<TData>[]
```

테이블의 고정되지 않은/중앙 푸터 그룹을 반환합니다.

### `getRightFooterGroups`

```tsx
getRightFooterGroups: () => HeaderGroup<TData>[]
```

테이블의 오른쪽 고정 푸터 그룹을 반환합니다.

### `getLeftFlatHeaders`

```tsx
getLeftFlatHeaders: () => Header<TData>[]
```

부모 헤더를 포함하여 테이블의 왼쪽 고정 헤더의 평면 배열을 반환합니다.

### `getCenterFlatHeaders`

```tsx
getCenterFlatHeaders: () => Header<TData>[]
```

부모 헤더를 포함하여 테이블의 고정되지 않은/중앙 헤더의 평면 배열을 반환합니다.

### `getRightFlatHeaders`

```tsx
getRightFlatHeaders: () => Header<TData>[]
```

부모 헤더를 포함하여 테이블의 오른쪽 고정 헤더의 평면 배열을 반환합니다.

### `getLeftLeafHeaders`

```tsx
getLeftLeafHeaders: () => Header<TData>[]
```

테이블의 리프 노드 왼쪽 고정 헤더의 평면 배열을 반환합니다.

### `getCenterLeafHeaders`

```tsx
getCenterLeafHeaders: () => Header<TData>[]
```

테이블의 리프 노드 고정되지 않은/중앙 헤더의 평면 배열을 반환합니다.

### `getRightLeafHeaders`

```tsx
getRightLeafHeaders: () => Header<TData>[]
```

테이블의 리프 노드 오른쪽 고정 헤더의 평면 배열을 반환합니다.

### `getLeftLeafColumns`

```tsx
getLeftLeafColumns: () => Column<TData>[]
```

모든 왼쪽 고정 리프 column을 반환합니다.

### `getRightLeafColumns`

```tsx
getRightLeafColumns: () => Column<TData>[]
```

모든 오른쪽 고정 리프 column을 반환합니다.

### `getCenterLeafColumns`

```tsx
getCenterLeafColumns: () => Column<TData>[]
```

모든 중앙 고정(고정되지 않은) 리프 column을 반환합니다.

## Column API

### `getCanPin`

```tsx
getCanPin: () => boolean
```

column을 고정할 수 있는지 여부를 반환합니다.

### `getPinnedIndex`

```tsx
getPinnedIndex: () => number
```

고정된 column 그룹 내에서 column의 숫자 고정 인덱스를 반환합니다.

### `getIsPinned`

```tsx
getIsPinned: () => ColumnPinningPosition
```

column의 고정 위치를 반환합니다. (`'left'`, `'right'` 또는 `false`)

### `pin`

```tsx
pin: (position: ColumnPinningPosition) => void
```

column을 `'left'` 또는 `'right'`에 고정하거나, `false`가 전달되면 column을 중앙으로 고정 해제합니다.

## Row API

### `getLeftVisibleCells`

```tsx
getLeftVisibleCells: () => Cell<TData>[]
```

row에서 왼쪽 고정된 모든 리프 셀을 반환합니다.

### `getRightVisibleCells`

```tsx
getRightVisibleCells: () => Cell<TData>[]
```

row에서 오른쪽 고정된 모든 리프 셀을 반환합니다.

### `getCenterVisibleCells`

```tsx
getCenterVisibleCells: () => Cell<TData>[]
```

row에서 중앙 고정된(고정되지 않은) 모든 리프 셀을 반환합니다.
