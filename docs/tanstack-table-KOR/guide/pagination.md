---
title: Pagination Guide
---

## 예제

구현으로 바로 가고 싶으신가요? 다음 예제를 확인하세요:

- [pagination](../../framework/react/examples/pagination)
- [pagination-controlled (React Query)](../../framework/react/examples/pagination-controlled)
- [editable-data](../../framework/react/examples/editable-data)
- [expanding](../../framework/react/examples/expanding)
- [filters](../../framework/react/examples/filters)
- [fully-controlled](../../framework/react/examples/fully-controlled)
- [row-selection](../../framework/react/examples/row-selection)

## API

[Pagination API](../../api/features/pagination)

## Pagination Guide

TanStack Table은 클라이언트 측 및 서버 측 페이지네이션을 모두 훌륭하게 지원합니다. 이 가이드는 테이블에서 페이지네이션을 구현하는 다양한 방법을 안내합니다.

### 클라이언트 측 페이지네이션

클라이언트 측 페이지네이션을 사용하면 가져온 `data`가 테이블의 모든 행을 포함하게 되며, 테이블 인스턴스는 프론트엔드에서 페이지네이션 로직을 처리합니다.

#### 클라이언트 측 페이지네이션을 사용해야 할까요?

클라이언트 측 페이지네이션은 TanStack Table을 사용할 때 페이지네이션을 구현하는 가장 간단한 방법이지만, 매우 큰 데이터셋에는 실용적이지 않을 수 있습니다.

그러나 많은 사람들이 클라이언트 측에서 처리할 수 있는 데이터의 양을 과소평가합니다. 테이블에 몇 천 개의 행만 있거나 그 이하일 경우, 클라이언트 측 페이지네이션은 여전히 유효한 옵션이 될 수 있습니다. TanStack Table은 페이지네이션, 필터링, 정렬 및 그룹화를 위한 성능이 괜찮은 상태로 수만 개의 행까지 확장할 수 있도록 설계되었습니다. [공식 페이지네이션 예제](../../framework/react/examples/pagination)는 100,000개의 행을 로드하며, 몇 개의 열만 있는 경우에도 여전히 잘 작동합니다.

모든 사용 사례는 테이블의 복잡성, 열의 수, 각 데이터 조각의 크기 등에 따라 다릅니다. 주의해야 할 주요 병목 현상은 다음과 같습니다:

1. 서버가 모든 데이터를 합리적인 시간(및 비용) 내에 쿼리할 수 있는가?
2. 가져온 데이터의 총 크기는 얼마인가? (열이 많지 않다면 생각보다 나쁘지 않을 수 있습니다.)
3. 모든 데이터를 한 번에 로드할 경우 클라이언트의 브라우저가 너무 많은 메모리를 사용하는가?

확신이 서지 않는다면, 클라이언트 측 페이지네이션으로 시작한 후 데이터가 증가함에 따라 서버 측 페이지네이션으로 전환할 수 있습니다.

#### 대신 가상화를 사용해야 할까요?

대안으로, 데이터를 페이지네이션하는 대신, 큰 데이터셋의 모든 행을 동일한 페이지에 렌더링할 수 있지만, 보이는 뷰포트에 있는 행만 브라우저의 리소스를 사용하여 렌더링할 수 있습니다. 이 전략은 종종 "가상화" 또는 "윈도잉"이라고 불립니다. TanStack은 TanStack Table과 잘 작동할 수 있는 가상화 라이브러리인 [TanStack Virtual](https://tanstack.com/virtual/latest)을 제공합니다. 가상화와 페이지네이션의 UI/UX는 각각의 장단점이 있으므로, 사용 사례에 가장 적합한 것을 선택하세요.

#### Pagination Row Model

TanStack Table의 내장 클라이언트 측 페이지네이션을 활용하려면, 먼저 페이지네이션 행 모델을 전달해야 합니다.

```jsx
import { useReactTable, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
//...
const table = useReactTable({
  columns,
  data,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(), //클라이언트 측 페이지네이션 코드 로드
});
```

### 수동 서버 측 페이지네이션

서버 측 페이지네이션을 사용해야 한다고 결정한 경우, 다음과 같이 구현할 수 있습니다.

서버 측 페이지네이션에는 페이지네이션 행 모델이 필요하지 않지만, 다른 테이블에 필요하여 공유 컴포넌트에 제공한 경우, `manualPagination` 옵션을 `true`로 설정하여 클라이언트 측 페이지네이션을 끌 수 있습니다. `manualPagination` 옵션을 `true`로 설정하면 테이블 인스턴스가 `table.getPrePaginationRowModel` 행 모델을 내부적으로 사용하도록 하며, 전달된 `data`가 이미 페이지네이션된 것으로 가정합니다.

#### 페이지 수 및 행 수

테이블 인스턴스는 백엔드에 총 몇 개의 행/페이지가 있는지 알 방법이 없으므로, `rowCount` 또는 `pageCount` 테이블 옵션을 제공하여 테이블 인스턴스에 총 페이지 수를 알려야 합니다. `rowCount`를 제공하면 테이블 인스턴스가 `rowCount`와 `pageSize`를 기반으로 `pageCount`를 내부적으로 계산합니다. 그렇지 않으면 이미 알고 있는 경우 `pageCount`를 직접 제공할 수 있습니다. 페이지 수를 모르는 경우, `pageCount`에 `-1`을 전달할 수 있지만, 이 경우 `getCanNextPage` 및 `getCanPreviousPage` 행 모델 함수는 항상 `true`를 반환합니다.

```jsx
import { useReactTable, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
//...
const table = useReactTable({
  columns,
  data,
  getCoreRowModel: getCoreRowModel(),
  // getPaginationRowModel: getPaginationRowModel(), //서버 측 페이지네이션에는 필요하지 않음
  manualPagination: true, //클라이언트 측 페이지네이션 끄기
  rowCount: dataQuery.data?.rowCount, //테이블에 총 행 수를 전달하여 페이지 수를 알림 (제공되지 않은 경우 내부적으로 pageCount 계산)
  // pageCount: dataQuery.data?.pageCount, //rowCount 대신 pageCount를 직접 전달
});
```

> **참고**: `manualPagination` 옵션을 `true`로 설정하면 테이블 인스턴스가 전달된 `data`가 이미 페이지네이션된 것으로 가정합니다.

### Pagination State

클라이언트 측 또는 수동 서버 측 페이지네이션을 사용하든 상관없이, 내장된 `pagination` 상태와 API를 사용할 수 있습니다.

`pagination` 상태는 다음 속성을 포함하는 객체입니다:

- `pageIndex`: 현재 페이지 인덱스 (0부터 시작).
- `pageSize`: 현재 페이지 크기.

`pagination` 상태는 테이블 인스턴스의 다른 상태와 마찬가지로 관리할 수 있습니다.

```jsx
import { useReactTable, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
//...
const [pagination, setPagination] = useState({
  pageIndex: 0, //초기 페이지 인덱스
  pageSize: 10, //기본 페이지 크기
});

const table = useReactTable({
  columns,
  data,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  onPaginationChange: setPagination, //내부 API가 pagination 상태를 변경할 때 pagination 상태 업데이트
  state: {
    //...
    pagination,
  },
});
```

대안으로, `pagination` 상태를 자체 범위에서 관리할 필요가 없지만, `pageIndex`와 `pageSize`에 대해 다른 초기 값을 설정해야 하는 경우, `initialState` 옵션을 사용할 수 있습니다.

```jsx
const table = useReactTable({
  columns,
  data,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  initialState: {
    pagination: {
      pageIndex: 2, //사용자 정의 초기 페이지 인덱스
      pageSize: 25, //사용자 정의 기본 페이지 크기
    },
  },
});
```

> **참고**: `pagination` 상태를 `state`와 `initialState` 옵션 모두에 전달하지 마세요. `state`는 `initialState`를 덮어씁니다. 둘 중 하나만 사용하세요.

### Pagination Options

수동 서버 측 페이지네이션에 유용한 `manualPagination`, `pageCount`, `rowCount` 옵션 외에도 이해하기 유용한 다른 테이블 옵션이 하나 더 있습니다.

#### Auto Reset Page Index

기본적으로, `pageIndex`는 `data`가 업데이트되거나, 필터가 변경되거나, 그룹화가 변경되는 등 페이지를 변경하는 상태 변경이 발생할 때 `0`으로 재설정됩니다. 이 동작은 `manualPagination`이 true일 때 자동으로 비활성화되지만, `autoResetPageIndex` 테이블 옵션에 명시적으로 boolean 값을 할당하여 재정의할 수 있습니다.

```jsx
const table = useReactTable({
  columns,
  data,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  autoResetPageIndex: false, //pageIndex의 자동 재설정 끄기
});
```

그러나 `autoResetPageIndex`를 끄면 빈 페이지를 표시하지 않도록 `pageIndex`를 재설정하는 로직을 추가해야 할 수 있습니다.

### Pagination APIs

페이지네이션 UI 컴포넌트를 연결하는 데 유용한 여러 페이지네이션 테이블 인스턴스 API가 있습니다.

#### Pagination Button APIs

- `getCanPreviousPage`: 첫 페이지에 있을 때 "이전 페이지" 버튼을 비활성화하는 데 유용합니다.
- `getCanNextPage`: 더 이상 페이지가 없을 때 "다음 페이지" 버튼을 비활성화하는 데 유용합니다.
- `previousPage`: 이전 페이지로 이동하는 데 유용합니다. (버튼 클릭 핸들러)
- `nextPage`: 다음 페이지로 이동하는 데 유용합니다. (버튼 클릭 핸들러)
- `firstPage`: 첫 페이지로 이동하는 데 유용합니다. (버튼 클릭 핸들러)
- `lastPage`: 마지막 페이지로 이동하는 데 유용합니다. (버튼 클릭 핸들러)
- `setPageIndex`: "페이지로 이동" 입력에 유용합니다.
- `resetPageIndex`: 테이블 상태를 원래 페이지 인덱스로 재설정하는 데 유용합니다.
- `setPageSize`: "페이지 크기" 입력/선택에 유용합니다.
- `resetPageSize`: 테이블 상태를 원래 페이지 크기로 재설정하는 데 유용합니다.
- `setPagination`: 모든 페이지네이션 상태를 한 번에 설정하는 데 유용합니다.
- `resetPagination`: 테이블 상태를 원래 페이지네이션 상태로 재설정하는 데 유용합니다.

> **참고**: 이러한 API 중 일부는 `v8.13.0`에서 새로 추가되었습니다.

```jsx
<Button
  onClick={() => table.firstPage()}
  disabled={!table.getCanPreviousPage()}
>
  {'<<'}
</Button>
<Button
  onClick={() => table.previousPage()}
  disabled={!table.getCanPreviousPage()}
>
  {'<'}
</Button>
<Button
  onClick={() => table.nextPage()}
  disabled={!table.getCanNextPage()}
>
  {'>'}
</Button>
<Button
  onClick={() => table.lastPage()}
  disabled={!table.getCanNextPage()}
>
  {'>>'}
</Button>
<select
  value={table.getState().pagination.pageSize}
  onChange={e => {
    table.setPageSize(Number(e.target.value))
  }}
>
  {[10, 20, 30, 40, 50].map(pageSize => (
    <option key={pageSize} value={pageSize}>
      {pageSize}
    </option>
  ))}
</select>
```

#### Pagination Info APIs

- `getPageCount`: 총 페이지 수를 표시하는 데 유용합니다.
- `getRowCount`: 총 행 수를 표시하는 데 유용합니다.
