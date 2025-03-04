---
title: 컬럼 정의 API
---

컬럼 정의는 다음 옵션을 가진 일반 객체입니다:

## 옵션

### `id`

```tsx
id: string
```

컬럼의 고유 식별자입니다.

> 🧠 컬럼 ID는 다음의 경우 선택 사항입니다:
>
> - 객체 키 접근자로 생성된 접근자 컬럼
> - 컬럼 헤더가 문자열로 정의된 경우

### `accessorKey`

```tsx
accessorKey?: string & typeof TData
```

컬럼의 값을 추출할 때 사용할 행 객체의 키입니다.

### `accessorFn`

```tsx
accessorFn?: (originalRow: TData, index: number) => any
```

각 행에서 컬럼의 값을 추출할 때 사용할 접근자 함수입니다.

### `columns`

```tsx
columns?: ColumnDef<TData>[]
```

그룹 컬럼에 포함할 자식 컬럼 정의입니다.

### `header`

```tsx
header?:
  | string
  | ((props: {
      table: Table<TData>
      header: Header<TData>
      column: Column<TData>
    }) => unknown)
```

컬럼에 표시할 헤더입니다. 문자열이 전달되면 컬럼 ID의 기본값으로 사용할 수 있습니다. 함수가 전달되면 헤더에 대한 props 객체가 전달되며 렌더링된 헤더 값을 반환해야 합니다 (정확한 타입은 사용 중인 어댑터에 따라 다릅니다).

### `footer`

```tsx
footer?:
  | string
  | ((props: {
      table: Table<TData>
      header: Header<TData>
      column: Column<TData>
    }) => unknown)
```

컬럼에 표시할 푸터입니다. 함수가 전달되면 푸터에 대한 props 객체가 전달되며 렌더링된 푸터 값을 반환해야 합니다 (정확한 타입은 사용 중인 어댑터에 따라 다릅니다).

### `cell`

```tsx
cell?:
  | string
  | ((props: {
      table: Table<TData>
      row: Row<TData>
      column: Column<TData>
      cell: Cell<TData>
      getValue: () => any
      renderValue: () => any
    }) => unknown)
```

각 행에 대해 컬럼에 표시할 셀입니다. 함수가 전달되면 셀에 대한 props 객체가 전달되며 렌더링된 셀 값을 반환해야 합니다 (정확한 타입은 사용 중인 어댑터에 따라 다릅니다).

### `meta`

```tsx
meta?: ColumnMeta // 이 인터페이스는 선언 병합을 통해 확장 가능합니다. 아래를 참조하세요!
```

컬럼과 연관된 메타 데이터입니다. 컬럼이 사용 가능한 경우 어디서든 `column.columnDef.meta`를 통해 접근할 수 있습니다. 이 타입은 모든 테이블에 대해 전역적이며 다음과 같이 확장할 수 있습니다:

```tsx
import '@tanstack/react-table' // 또는 vue, svelte, solid, qwik 등

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    foo: string
  }
}
```
