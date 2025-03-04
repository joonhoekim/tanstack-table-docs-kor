---
title: 셀 API
---

이것들은 모든 셀에 대한 **핵심** 옵션 및 API 속성입니다. 다른 [테이블 기능](../../../guide/features)에 대한 더 많은 옵션 및 API 속성이 제공됩니다.

## 셀 API

모든 셀 객체는 다음 속성을 가지고 있습니다:

### `id`

```tsx
id: string
```

테이블 전체에서 셀에 대한 고유 ID입니다.

### `getValue`

```tsx
getValue: () => any
```

연관된 열의 접근자 키 또는 접근자 함수를 통해 셀의 값을 반환합니다.

### `renderValue`

```tsx
renderValue: () => any
```

`getValue`와 동일하게 셀의 값을 렌더링하지만, 값이 없을 경우 `renderFallbackValue`를 반환합니다.

### `row`

```tsx
row: Row<TData>
```

셀에 연관된 행 객체입니다.

### `column`

```tsx
column: Column<TData>
```

셀에 연관된 열 객체입니다.

### `getContext`

```tsx
getContext: () => {
  table: Table<TData>
  column: Column<TData, TValue>
  row: Row<TData>
  cell: Cell<TData, TValue>
  getValue: <TTValue = TValue,>() => TTValue
  renderValue: <TTValue = TValue,>() => TTValue | null
}
```

셀 기반 컴포넌트(예: 셀 및 집계된 셀)를 위한 렌더링 컨텍스트(또는 props)를 반환합니다. 이러한 props를 사용하여 프레임워크의 `flexRender` 유틸리티와 함께 원하는 템플릿으로 렌더링하세요:

```tsx
flexRender(cell.column.columnDef.cell, cell.getContext())
```
