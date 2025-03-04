---
title: Global Faceting APIs
id: global-faceting
---

## Table API

### `getGlobalFacetedRowModel`

```tsx
getGlobalFacetedRowModel: () => RowModel<TData>
```

글로벌 필터에 대한 faceted row model을 반환합니다.

### `getGlobalFacetedUniqueValues`

```tsx
getGlobalFacetedUniqueValues: () => Map<any, number>
```

글로벌 필터에 대한 faceted 고유 값을 반환합니다.

### `getGlobalFacetedMinMaxValues`

```tsx
getGlobalFacetedMinMaxValues: () => [number, number]
```

글로벌 필터에 대한 faceted 최소 및 최대 값을 반환합니다.
