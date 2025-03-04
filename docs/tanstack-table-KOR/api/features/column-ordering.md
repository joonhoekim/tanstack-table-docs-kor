---
title: Column Ordering API
id: column-ordering
---

## State

Column 순서 상태는 다음과 같은 형태로 테이블에 저장됩니다:

```tsx
export type ColumnOrderTableState = {
  columnOrder: ColumnOrderState
}

export type ColumnOrderState = string[]
```

## Table Options

### `onColumnOrderChange`

```tsx
onColumnOrderChange?: OnChangeFn<ColumnOrderState>
```

제공된 경우, 이 함수는 `state.columnOrder`가 변경될 때 `updaterFn`과 함께 호출됩니다. 이는 기본 내부 상태 관리를 재정의하므로 테이블 외부에서 상태 변경을 완전히 또는 부분적으로 유지해야 합니다.

## Table API

### `setColumnOrder`

```tsx
setColumnOrder: (updater: Updater<ColumnOrderState>) => void
```

`state.columnOrder` 상태를 설정하거나 업데이트합니다.

### `resetColumnOrder`

```tsx
resetColumnOrder: (defaultState?: boolean) => void
```

**columnOrder** 상태를 `initialState.columnOrder`로 재설정하거나, `true`를 전달하여 기본 빈 상태 `[]`로 강제 재설정할 수 있습니다.

## Column API

### `getIndex`

```tsx
getIndex: (position?: ColumnPinningPosition) => number
```

표시되는 column 순서에서 column의 인덱스를 반환합니다. 선택적으로 `position` 매개변수를 전달하여 테이블의 하위 섹션에서 column의 인덱스를 가져올 수 있습니다.

### `getIsFirstColumn`

```tsx
getIsFirstColumn: (position?: ColumnPinningPosition) => boolean
```

column이 표시되는 column 순서에서 첫 번째 column인 경우 `true`를 반환합니다. 선택적으로 `position` 매개변수를 전달하여 column이 테이블의 하위 섹션에서 첫 번째인지 확인할 수 있습니다.

### `getIsLastColumn`

```tsx
getIsLastColumn: (position?: ColumnPinningPosition) => boolean
```

column이 표시되는 column 순서에서 마지막 column인 경우 `true`를 반환합니다. 선택적으로 `position` 매개변수를 전달하여 column이 테이블의 하위 섹션에서 마지막인지 확인할 수 있습니다.