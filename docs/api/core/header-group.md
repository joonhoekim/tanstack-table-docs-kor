---
title: 헤더 그룹 API
---

이것들은 모든 헤더 그룹에 대한 **핵심** 옵션 및 API 속성입니다. 다른 [테이블 기능](../../../guide/features)에 대한 더 많은 옵션 및 API 속성이 제공됩니다.

## 헤더 그룹 API

모든 헤더 그룹 객체는 다음 속성을 가지고 있습니다:

### `id`

```tsx
id: string
```

헤더 그룹의 고유 식별자입니다.

### `depth`

```tsx
depth: number
```

헤더 그룹의 깊이로, 0부터 시작하는 인덱스 기반입니다.

### `headers`

```tsx
type headers = Header<TData>[]
```

이 헤더 그룹에 속하는 [헤더](../header) 객체의 배열입니다.
