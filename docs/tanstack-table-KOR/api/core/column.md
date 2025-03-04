---
title: 열 API
---

이것들은 모든 열에 대한 **핵심** 옵션 및 API 속성입니다. 다른 [테이블 기능](../../../guide/features)에 대한 더 많은 옵션 및 API 속성이 제공됩니다.

## 열 API

모든 열 객체는 다음 속성을 가지고 있습니다:

### `id`

```tsx
id: string
```

열에 대한 고유 식별자는 다음 우선 순위로 해결됩니다:

- 열 정의에서 수동으로 지정한 `id` 속성
- 열 정의에서의 접근자 키
- 열 정의에서의 헤더 문자열

### `depth`

```tsx
depth: number
```

루트 열 정의 배열에 상대적인 열의 깊이 (그룹화된 경우).

### `accessorFn`

```tsx
accessorFn?: AccessorFn<TData>
```

각 행에서 열의 값을 추출할 때 사용할 해결된 접근자 함수. 열 정의에 유효한 접근자 키 또는 함수가 정의된 경우에만 정의됩니다.

### `columnDef`

```tsx
columnDef: ColumnDef<TData>
```

열을 생성하는 데 사용된 원래 열 정의.

### `columns`

```tsx
type columns = ColumnDef<TData>[]
```

자식 열 (열이 그룹 열인 경우). 열이 그룹 열이 아닌 경우 빈 배열이 됩니다.

### `parent`

```tsx
parent?: Column<TData>
```

이 열의 상위 열. 이 열이 루트 열인 경우 정의되지 않습니다.

### `getFlatColumns`

```tsx
type getFlatColumns = () => Column<TData>[]
```

이 열과 이 열의 모든 자식/손자 열의 평면 배열을 반환합니다.

### `getLeafColumns`

```tsx
type getLeafColumns = () => Column<TData>[]
```

이 열의 모든 리프 노드 열의 배열을 반환합니다. 열에 자식이 없는 경우, 이는 유일한 리프 노드 열로 간주됩니다.
