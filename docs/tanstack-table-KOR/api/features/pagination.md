---
title: Pagination API
id: pagination
---

## State

Pagination state는 다음과 같은 형태로 테이블에 저장됩니다:

```tsx
export type PaginationState = {
  pageIndex: number
  pageSize: number
}

export type PaginationTableState = {
  pagination: PaginationState
}

export type PaginationInitialTableState = {
  pagination?: Partial<PaginationState>
}
```

## Table Options

### `manualPagination`

```tsx
manualPagination?: boolean
```

수동 pagination을 활성화합니다. 이 옵션이 `true`로 설정되면 테이블은 `getPaginationRowModel()`을 사용하여 자동으로 행을 페이지네이션하지 않고 대신 테이블에 전달하기 전에 수동으로 행을 페이지네이션할 것으로 예상합니다. 이는 서버 측 페이지네이션 및 집계를 수행하는 경우에 유용합니다.

### `pageCount`

```tsx
pageCount?: number
```

pagination을 수동으로 제어할 때, 알고 있다면 테이블에 총 `pageCount` 값을 제공할 수 있습니다. 페이지 수를 모르는 경우 이 값을 `-1`로 설정할 수 있습니다. 또는 `rowCount` 값을 제공하면 테이블이 내부적으로 `pageCount`를 계산합니다.

### `rowCount`

```tsx
rowCount?: number
```

pagination을 수동으로 제어할 때, 알고 있다면 테이블에 총 `rowCount` 값을 제공할 수 있습니다. `pageCount`는 `rowCount`와 `pageSize`에서 내부적으로 계산됩니다.

### `autoResetPageIndex`

```tsx
autoResetPageIndex?: boolean
```

`true`로 설정하면, 페이지 변경 상태(예: `data` 업데이트, 필터 변경, 그룹화 변경 등)가 발생할 때 pagination이 첫 페이지로 재설정됩니다.

> 🧠 참고: `manualPagination`이 `true`로 설정된 경우 이 옵션의 기본값은 `false`입니다.

### `onPaginationChange`

```tsx
onPaginationChange?: OnChangeFn<PaginationState>
```

이 함수가 제공되면 pagination 상태가 변경될 때 호출되며 직접 상태를 관리해야 합니다. 관리된 상태를 `tableOptions.state.pagination` 옵션을 통해 테이블에 다시 전달할 수 있습니다.

### `getPaginationRowModel`

```tsx
getPaginationRowModel?: (table: Table<TData>) => () => RowModel<TData>
```

pagination이 수행된 후의 행 모델을 반환하지만, 그 이상은 아닙니다.

pagination 열은 기본적으로 열 목록의 시작 부분으로 자동 재정렬됩니다. 제거하거나 있는 그대로 두고 싶다면 여기에 적절한 모드를 설정하세요.

## Table API

### `setPagination`

```tsx
setPagination: (updater: Updater<PaginationState>) => void
```

`state.pagination` 상태를 설정하거나 업데이트합니다.

### `resetPagination`

```tsx
resetPagination: (defaultState?: boolean) => void
```

**pagination** 상태를 `initialState.pagination`으로 재설정하거나, `true`를 전달하여 기본 빈 상태 `[]`로 강제 재설정할 수 있습니다.

### `setPageIndex`

```tsx
setPageIndex: (updater: Updater<number>) => void
```

제공된 함수나 값을 사용하여 페이지 인덱스를 업데이트합니다.

### `resetPageIndex`

```tsx
resetPageIndex: (defaultState?: boolean) => void
```

페이지 인덱스를 초기 상태로 재설정합니다. `defaultState`가 `true`이면 초기 상태에 관계없이 페이지 인덱스가 `0`으로 재설정됩니다.

### `setPageSize`

```tsx
setPageSize: (updater: Updater<number>) => void
```

제공된 함수나 값을 사용하여 페이지 크기를 업데이트합니다.

### `resetPageSize`

```tsx
resetPageSize: (defaultState?: boolean) => void
```

페이지 크기를 초기 상태로 재설정합니다. `defaultState`가 `true`이면 초기 상태에 관계없이 페이지 크기가 `10`으로 재설정됩니다.

### `getPageOptions`

```tsx
getPageOptions: () => number[]
```

현재 페이지 크기에 대한 페이지 옵션 배열(0부터 시작하는 인덱스)을 반환합니다.

### `getCanPreviousPage`

```tsx
getCanPreviousPage: () => boolean
```

테이블이 이전 페이지로 이동할 수 있는지 여부를 반환합니다.

### `getCanNextPage`

```tsx
getCanNextPage: () => boolean
```

테이블이 다음 페이지로 이동할 수 있는지 여부를 반환합니다.

### `previousPage`

```tsx
previousPage: () => void
```

가능한 경우 페이지 인덱스를 1 감소시킵니다.

### `nextPage`

```tsx
nextPage: () => void
```

가능한 경우 페이지 인덱스를 1 증가시킵니다.

### `firstPage`

```tsx
firstPage: () => void
```

페이지 인덱스를 `0`으로 설정합니다.

### `lastPage`

```tsx
lastPage: () => void
```

페이지 인덱스를 사용 가능한 마지막 페이지로 설정합니다.

### `getPageCount`

```tsx
getPageCount: () => number
```

페이지 수를 반환합니다. 수동으로 페이지네이션하거나 pagination 상태를 제어하는 경우, 이는 `options.pageCount` 테이블 옵션에서 직접 가져오며, 그렇지 않으면 총 행 수와 현재 페이지 크기를 사용하여 테이블 데이터에서 계산됩니다.

### `getPrePaginationRowModel`

```tsx
getPrePaginationRowModel: () => RowModel<TData>
```

pagination이 적용되기 전의 테이블 행 모델을 반환합니다.

### `getPaginationRowModel`

```tsx
getPaginationRowModel: () => RowModel<TData>
```

pagination이 적용된 후의 테이블 행 모델을 반환합니다.
