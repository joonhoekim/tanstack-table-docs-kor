---
title: 헤더 API
---

이것들은 모든 헤더에 대한 **핵심** 옵션 및 API 속성입니다. 다른 [테이블 기능](../../../guide/features)에 대한 더 많은 옵션 및 API 속성이 제공될 수 있습니다.

## 헤더 API

모든 헤더 객체는 다음 속성을 가지고 있습니다:

### `id`

```tsx
id: string
```

헤더에 대한 고유 식별자입니다.

### `index`

```tsx
index: number
```

헤더 그룹 내에서 헤더의 인덱스입니다.

### `depth`

```tsx
depth: number
```

헤더의 깊이로, 0부터 시작합니다.

### `column`

```tsx
column: Column<TData>
```

헤더의 연관된 [Column](../column) 객체입니다.

### `headerGroup`

```tsx
headerGroup: HeaderGroup<TData>
```

헤더의 연관된 [HeaderGroup](../header-group) 객체입니다.

### `subHeaders`

```tsx
type subHeaders = Header<TData>[]
```

헤더의 계층적 하위/자식 헤더입니다. 헤더의 연관된 열이 리프-열인 경우 비어 있습니다.

### `colSpan`

```tsx
colSpan: number
```

헤더의 col-span입니다.

### `rowSpan`

```tsx
rowSpan: number
```

헤더의 row-span입니다.

### `getLeafHeaders`

```tsx
type getLeafHeaders = () => Header<TData>[]
```

이 헤더 아래에 계층적으로 중첩된 리프 헤더를 반환합니다.

### `isPlaceholder`

```tsx
isPlaceholder: boolean
```

헤더가 플레이스홀더 헤더인지 여부를 나타내는 부울 값입니다.

### `placeholderId`

```tsx
placeholderId?: string
```

헤더가 플레이스홀더 헤더인 경우, 테이블의 다른 헤더와 충돌하지 않는 고유한 헤더 ID입니다.

### `getContext`

```tsx
getContext: () => {
  table: Table<TData>
  header: Header<TData, TValue>
  column: Column<TData, TValue>
}
```

헤더, 푸터 및 필터와 같은 열 기반 컴포넌트를 위한 렌더링 컨텍스트(또는 props)를 반환합니다. 이러한 props를 사용하여 프레임워크의 `flexRender` 유틸리티와 함께 원하는 템플릿으로 렌더링하세요:

```tsx
flexRender(header.column.columnDef.header, header.getContext())
```

## 테이블 API

### `getHeaderGroups`

```tsx
type getHeaderGroups = () => HeaderGroup<TData>[]
```

테이블의 모든 헤더 그룹을 반환합니다.

### `getLeftHeaderGroups`

```tsx
type getLeftHeaderGroups = () => HeaderGroup<TData>[]
```

고정 시, 왼쪽 고정 열의 헤더 그룹을 반환합니다.

### `getCenterHeaderGroups`

```tsx
type getCenterHeaderGroups = () => HeaderGroup<TData>[]
```

고정 시, 고정되지 않은 열의 헤더 그룹을 반환합니다.

### `getRightHeaderGroups`

```tsx
type getRightHeaderGroups = () => HeaderGroup<TData>[]
```

고정 시, 오른쪽 고정 열의 헤더 그룹을 반환합니다.

### `getFooterGroups`

```tsx
type getFooterGroups = () => HeaderGroup<TData>[]
```

테이블의 모든 푸터 그룹을 반환합니다.

### `getLeftFooterGroups`

```tsx
type getLeftFooterGroups = () => HeaderGroup<TData>[]
```

고정 시, 왼쪽 고정 열의 푸터 그룹을 반환합니다.

### `getCenterFooterGroups`

```tsx
type getCenterFooterGroups = () => HeaderGroup<TData>[]
```

고정 시, 고정되지 않은 열의 푸터 그룹을 반환합니다.

### `getRightFooterGroups`

```tsx
type getRightFooterGroups = () => HeaderGroup<TData>[]
```

고정 시, 오른쪽 고정 열의 푸터 그룹을 반환합니다.

### `getFlatHeaders`

```tsx
type getFlatHeaders = () => Header<TData, unknown>[]
```

테이블의 모든 열에 대한 헤더를 반환합니다. 상위 헤더를 포함합니다.

### `getLeftFlatHeaders`

```tsx
type getLeftFlatHeaders = () => Header<TData, unknown>[]
```

고정 시, 테이블의 모든 왼쪽 고정 열에 대한 헤더를 반환합니다. 상위 헤더를 포함합니다.

### `getCenterFlatHeaders`

```tsx
type getCenterFlatHeaders = () => Header<TData, unknown>[]
```

고정 시, 고정되지 않은 모든 열에 대한 헤더를 반환합니다. 상위 헤더를 포함합니다.

### `getRightFlatHeaders`

```tsx
type getRightFlatHeaders = () => Header<TData, unknown>[]
```

고정 시, 테이블의 모든 오른쪽 고정 열에 대한 헤더를 반환합니다. 상위 헤더를 포함합니다.

### `getLeafHeaders`

```tsx
type getLeafHeaders = () => Header<TData, unknown>[]
```

테이블의 모든 리프 열에 대한 헤더를 반환합니다. (상위 헤더는 포함하지 않음)

### `getLeftLeafHeaders`

```tsx
type getLeftLeafHeaders = () => Header<TData, unknown>[]
```

고정 시, 테이블의 모든 왼쪽 고정 리프 열에 대한 헤더를 반환합니다. (상위 헤더는 포함하지 않음)

### `getCenterLeafHeaders`

```tsx
type getCenterLeafHeaders = () => Header<TData, unknown>[]
```

고정 시, 고정되지 않은 모든 열에 대한 헤더를 반환합니다. (상위 헤더는 포함하지 않음)

### `getRightLeafHeaders`

```tsx
type getRightLeafHeaders = () => Header<TData, unknown>[]
```

고정 시, 테이블의 모든 오른쪽 고정 리프 열에 대한 헤더를 반환합니다. (상위 헤더는 포함하지 않음)
