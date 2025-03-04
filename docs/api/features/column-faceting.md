---
title: Column Faceting API
id: column-faceting
---

## Column API

### `getFacetedRowModel`

```tsx
type getFacetedRowModel = () => RowModel<TData>
```

> ⚠️ `options.facetedRowModel`에 유효한 `getFacetedRowModel` 함수를 전달해야 합니다. 기본 구현은 내보낸 `getFacetedRowModel` 함수를 통해 제공됩니다.

자체 필터를 제외한 다른 모든 column 필터가 적용된 row model을 반환합니다. faceted 결과 수를 표시하는 데 유용합니다.

### `getFacetedUniqueValues`

```tsx
getFacetedUniqueValues: () => Map<any, number>
```

> ⚠️ `options.getFacetedUniqueValues`에 유효한 `getFacetedUniqueValues` 함수를 전달해야 합니다. 기본 구현은 내보낸 `getFacetedUniqueValues` 함수를 통해 제공됩니다.

`column.getFacetedRowModel`에서 파생된 고유 값과 해당 발생 횟수의 `Map`을 **계산하고 반환**하는 함수입니다. faceted 결과 값을 표시하는 데 유용합니다.

### `getFacetedMinMaxValues`

```tsx
getFacetedMinMaxValues: () => Map<any, number>
```

> ⚠️ `options.getFacetedMinMaxValues`에 유효한 `getFacetedMinMaxValues` 함수를 전달해야 합니다. 기본 구현은 내보낸 `getFacetedMinMaxValues` 함수를 통해 제공됩니다.

`column.getFacetedRowModel`에서 파생된 최소/최대 튜플을 **계산하고 반환**하는 함수입니다. faceted 결과 값을 표시하는 데 유용합니다.

## Table Options

### `getColumnFacetedRowModel`

```tsx
getColumnFacetedRowModel: (columnId: string) => RowModel<TData>
```

주어진 columnId에 대한 faceted row model을 반환합니다.
