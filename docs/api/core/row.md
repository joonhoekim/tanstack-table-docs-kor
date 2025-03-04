---
title: 행 API
---

이것들은 모든 행에 대한 **핵심** 옵션 및 API 속성입니다. 다른 [테이블 기능](../../../guide/features)에 대한 더 많은 옵션 및 API 속성이 제공됩니다.

## 행 API

모든 행 객체는 다음 속성을 가지고 있습니다:

### `id`

```tsx
id: string
```

`options.getRowId` 옵션을 통해 해결된 행의 고유 식별자입니다. 기본값은 행의 인덱스(또는 하위 행인 경우 상대 인덱스)입니다.

### `depth`

```tsx
depth: number
```

루트 행 배열에 상대적인 행의 깊이(중첩되거나 그룹화된 경우)입니다.

### `index`

```tsx
index: number
```

부모 배열(또는 루트 데이터 배열) 내에서 행의 인덱스입니다.

### `original`

```tsx
original: TData
```

테이블에 제공된 원래 행 객체입니다.

> 🧠 행이 그룹화된 행인 경우, 원래 행 객체는 그룹의 첫 번째 원본이 됩니다.

### `parentId`

```tsx
parentId?: string
```

중첩된 경우, 이 행의 부모 행 ID입니다.

### `getValue`

```tsx
getValue: (columnId: string) => TValue
```

주어진 columnId에 대한 행의 값을 반환합니다.

### `renderValue`

```tsx
renderValue: (columnId: string) => TValue
```

주어진 columnId에 대한 행의 값을 렌더링하지만, 값이 없으면 `renderFallbackValue`를 반환합니다.

### `getUniqueValues`

```tsx
getUniqueValues: (columnId: string) => TValue[]
```

주어진 columnId에 대한 행의 고유한 값 배열을 반환합니다.

### `subRows`

```tsx
type subRows = Row<TData>[]
```

`options.getSubRows` 옵션에 의해 반환되고 생성된 행의 하위 행 배열입니다.

### `getParentRow`

```tsx
type getParentRow = () => Row<TData> | undefined
```

행의 부모 행을 반환합니다(존재하는 경우).

### `getParentRows`

```tsx
type getParentRows = () => Row<TData>[]
```

루트 행까지의 모든 부모 행을 반환합니다.

### `getLeafRows`

```tsx
type getLeafRows = () => Row<TData>[]
```

부모 행을 포함하지 않는 행의 리프 행을 반환합니다.

### `originalSubRows`

```tsx
originalSubRows?: TData[]
```

`options.getSubRows` 옵션에 의해 반환된 원래 하위 행 배열입니다.

### `getAllCells`

```tsx
type getAllCells = () => Cell<TData>[]
```

행의 모든 [셀](../cell)을 반환합니다.
