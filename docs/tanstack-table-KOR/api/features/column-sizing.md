---
title: Column Sizing API
id: column-sizing
---

## State

Column 크기 조정 상태는 다음과 같은 형태로 테이블에 저장됩니다:

```tsx
export type ColumnSizingTableState = {
  columnSizing: ColumnSizing
  columnSizingInfo: ColumnSizingInfoState
}

export type ColumnSizing = Record<string, number>

export type ColumnSizingInfoState = {
  startOffset: null | number
  startSize: null | number
  deltaOffset: null | number
  deltaPercentage: null | number
  isResizingColumn: false | string
  columnSizingStart: [string, number][]
}
```

## Column Def Options

### `enableResizing`

```tsx
enableResizing?: boolean
```

column의 크기 조정을 활성화하거나 비활성화합니다.

### `size`

```tsx
size?: number
```

column의 원하는 크기입니다.

### `minSize`

```tsx
minSize?: number
```

column에 허용되는 최소 크기입니다.

### `maxSize`

```tsx
maxSize?: number
```

column에 허용되는 최대 크기입니다.

## Column API

### `getSize`

```tsx
getSize: () => number
```

column의 현재 크기를 반환합니다.

### `getStart`

```tsx
getStart: (position?: ColumnPinningPosition) => number
```

모든 이전 column의 크기를 측정하여 행 축(일반적으로 표준 테이블의 x축)을 따라 column의 오프셋 측정값을 반환합니다.

column의 sticky 또는 absolute 위치 지정에 유용합니다. (예: `left` 또는 `transform`)

### `getAfter`

```tsx
getAfter: (position?: ColumnPinningPosition) => number
```

모든 후속 column의 크기를 측정하여 행 축(일반적으로 표준 테이블의 x축)을 따라 column의 오프셋 측정값을 반환합니다.

column의 sticky 또는 absolute 위치 지정에 유용합니다. (예: `right` 또는 `transform`)

### `getCanResize`

```tsx
getCanResize: () => boolean
```

column의 크기를 조정할 수 있는 경우 `true`를 반환합니다.

### `getIsResizing`

```tsx
getIsResizing: () => boolean
```

column의 크기가 현재 조정 중인 경우 `true`를 반환합니다.

### `resetSize`

```tsx
resetSize: () => void
```

column 크기를 초기 크기로 재설정합니다.

## Header API

### `getSize`

```tsx
getSize: () => number
```

헤더에 속한 모든 리프 column의 크기를 합산하여 계산된 헤더의 크기를 반환합니다.

### `getStart`

```tsx
getStart: (position?: ColumnPinningPosition) => number
```

헤더의 행 축(일반적으로 표준 테이블의 x축)을 따라 오프셋 측정값을 반환합니다. 이는 효과적으로 모든 이전 헤더의 오프셋 측정값의 합입니다.

### `getResizeHandler`

```tsx
getResizeHandler: () => (event: unknown) => void
```

헤더 크기를 조정하는 데 사용할 수 있는 이벤트 핸들러 함수를 반환합니다. 다음과 같이 사용할 수 있습니다:

- `onMouseDown` 핸들러
- `onTouchStart` 핸들러

드래그 및 릴리스 이벤트는 자동으로 처리됩니다.

## Table Options

### `enableColumnResizing`

```tsx
enableColumnResizing?: boolean
```

**모든 column**에 대한 column 크기 조정을 활성화/비활성화합니다.

### `columnResizeMode`

```tsx
columnResizeMode?: 'onChange' | 'onEnd'
```

columnSizing 상태가 업데이트되는 시기를 결정합니다. `onChange`는 사용자가 크기 조정 핸들을 드래그할 때 상태를 업데이트합니다. `onEnd`는 사용자가 크기 조정 핸들을 놓을 때 상태를 업데이트합니다.

### `columnResizeDirection`

```tsx
columnResizeDirection?: 'ltr' | 'rtl'
```

column 크기 조정을 위한 오른쪽에서 왼쪽으로의 지원을 활성화하거나 비활성화합니다. 기본값은 'ltr'입니다.

### `onColumnSizingChange`

```tsx
onColumnSizingChange?: OnChangeFn<ColumnSizingState>
```

이 선택적 함수는 columnSizing 상태가 변경될 때 호출됩니다. 이 함수를 제공하면 상태를 직접 유지 관리해야 합니다. `state.columnSizing` 테이블 옵션을 통해 이 상태를 테이블에 다시 전달할 수 있습니다.

### `onColumnSizingInfoChange`

```tsx
onColumnSizingInfoChange?: OnChangeFn<ColumnSizingInfoState>
```

이 선택적 함수는 columnSizingInfo 상태가 변경될 때 호출됩니다. 이 함수를 제공하면 상태를 직접 유지 관리해야 합니다. `state.columnSizingInfo` 테이블 옵션을 통해 이 상태를 테이블에 다시 전달할 수 있습니다.

## Table API

### `setColumnSizing`

```tsx
setColumnSizing: (updater: Updater<ColumnSizingState>) => void
```

업데이터 함수 또는 값을 사용하여 column 크기 조정 상태를 설정합니다. 테이블 옵션에 `onColumnSizingChange` 함수가 전달된 경우 이 함수가 트리거되고, 그렇지 않으면 상태가 테이블에 의해 자동으로 관리됩니다.

### `setColumnSizingInfo`

```tsx
setColumnSizingInfo: (updater: Updater<ColumnSizingInfoState>) => void
```

업데이터 함수 또는 값을 사용하여 column 크기 조정 정보 상태를 설정합니다. 테이블 옵션에 `onColumnSizingInfoChange` 함수가 전달된 경우 이 함수가 트리거되고, 그렇지 않으면 상태가 테이블에 의해 자동으로 관리됩니다.

### `resetColumnSizing`

```tsx
resetColumnSizing: (defaultState?: boolean) => void
```

column 크기 조정을 초기 상태로 재설정합니다. `defaultState`가 `true`인 경우, 테이블에 제공된 initialValue 대신 테이블의 기본 상태가 사용됩니다.

### `resetHeaderSizeInfo`

```tsx
resetHeaderSizeInfo: (defaultState?: boolean) => void
```

column 크기 조정 정보를 초기 상태로 재설정합니다. `defaultState`가 `true`인 경우, 테이블에 제공된 initialValue 대신 테이블의 기본 상태가 사용됩니다.

### `getTotalSize`

```tsx
getTotalSize: () => number
```

모든 리프 column의 크기 합계를 계산하여 테이블의 총 크기를 반환합니다.

### `getLeftTotalSize`

```tsx
getLeftTotalSize: () => number
```

고정(pinning)을 사용하는 경우, 모든 왼쪽 리프 column의 크기 합계를 계산하여 테이블의 왼쪽 부분의 총 크기를 반환합니다.

### `getCenterTotalSize`

```tsx
getCenterTotalSize: () => number
```

고정(pinning)을 사용하는 경우, 모든 고정되지 않은/중앙 리프 column의 크기 합계를 계산하여 테이블의 중앙 부분의 총 크기를 반환합니다.

### `getRightTotalSize`

```tsx
getRightTotalSize: () => number
```

고정(pinning)을 사용하는 경우, 모든 오른쪽 리프 column의 크기 합계를 계산하여 테이블의 오른쪽 부분의 총 크기를 반환합니다.
