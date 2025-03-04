---
title: 행 모델 가이드
---

## 행 모델 가이드

TanStack Table의 가장 기본적인 예제를 보면 다음과 같은 코드 스니펫을 볼 수 있습니다:

```ts
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'

function Component() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(), //row model
  })
}
```

이 `getCoreRowModel` 함수는 무엇일까요? 그리고 왜 TanStack Table에서 가져와서 다시 자신에게 전달해야 할까요?

그 이유는 TanStack Table이 모듈식 라이브러리이기 때문입니다. 모든 기능에 대한 코드가 기본적으로 createTable 함수/훅에 포함되어 있지 않습니다. 사용하려는 기능에 따라 행을 올바르게 생성하기 위해 필요한 코드만 가져와 포함하면 됩니다.

### 행 모델이란 무엇인가요?

행 모델은 TanStack Table의 내부에서 필터링, 정렬, 그룹화, 확장, 페이지네이션과 같은 데이터 그리드 기능에 필요한 방식으로 원래 데이터를 변환합니다. 화면에 렌더링되는 행은 테이블에 전달한 원래 데이터와 반드시 1:1로 매핑되지 않을 수 있습니다. 정렬되거나, 필터링되거나, 페이지네이션될 수 있습니다.

### 행 모델 가져오기

필요한 행 모델만 가져와야 합니다. 다음은 사용할 수 있는 모든 행 모델입니다:

```ts
// 필요한 행 모델만 가져오기
import {
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
}
//...
const table = useReactTable({
  columns,
  data,
  getCoreRowModel: getCoreRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  getFacetedMinMaxValues: getFacetedMinMaxValues(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
  getFilteredRowModel: getFilteredRowModel(),
  getGroupedRowModel: getGroupedRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
})
```

### 행 모델 사용자 정의/포크

TanStack Table에서 제공하는 정확한 행 모델을 사용할 필요는 없습니다. 특정 행 모델에 대한 고급 사용자 정의가 필요한 경우, 사용자 정의하려는 행 모델의 [소스 코드](https://github.com/TanStack/table/tree/main/packages/table-core/src/utils)를 복사하여 필요에 맞게 수정할 수 있습니다.

### 행 모델 사용하기

테이블 인스턴스가 생성되면 필요한 모든 행 모델에 테이블 인스턴스에서 직접 접근할 수 있습니다. 가져온 행 모델 외에도 더 많은 파생 행 모델이 제공됩니다.

일반적인 렌더링 사용 사례에서는 아마도 `table.getRowModel()` 메서드만 사용하면 될 것입니다. 이 행 모델은 활성화되거나 비활성화된 기능에 따라 다른 모든 행 모델을 사용하여 최종 행 모델을 생성합니다. 다른 모든 행 모델은 테이블에서 발생하는 기본 데이터 변환을 "파고들기" 위해 사용할 수 있습니다.

### 테이블 인스턴스에서 사용할 수 있는 행 모델

- **`getRowModel`** - 테이블 행 마크업을 렌더링하는 데 사용해야 하는 주요 행 모델입니다. 다른 모든 행 모델을 사용하여 테이블 행을 렌더링하는 데 사용할 최종 행 모델을 생성합니다.

- `getCoreRowModel` - 테이블에 전달된 원래 데이터의 1:1 매핑인 기본 행 모델을 반환합니다.

- `getFilteredRowModel` - 열 필터링 및 전역 필터링을 고려한 행 모델을 반환합니다.
- `getPreFilteredRowModel` - 열 필터링 및 전역 필터링이 적용되기 전의 행 모델을 반환합니다.

- `getGroupedRowModel` - 데이터를 그룹화하고 집계하여 하위 행을 생성하는 행 모델을 반환합니다.
- `getPreGroupedRowModel` - 그룹화 및 집계가 적용되기 전의 행 모델을 반환합니다.

- `getSortedRowModel` - 정렬이 적용된 행 모델을 반환합니다.
- `getPreSortedRowModel` - 정렬이 적용되기 전의 행 모델을 반환합니다 (행은 원래 순서대로).

- `getExpandedRowModel` - 확장/숨김 하위 행을 고려한 행 모델을 반환합니다.
- `getPreExpandedRowModel` - 확장된 하위 행이 포함되지 않은 루트 레벨 행만 포함하는 행 모델을 반환합니다. 여전히 정렬이 포함됩니다.

- `getPaginationRowModel` - 페이지네이션 상태에 따라 현재 페이지에 표시되어야 하는 행만 포함하는 행 모델을 반환합니다.
- `getPrePaginationRowModel` - 페이지네이션이 적용되지 않은 행 모델을 반환합니다 (모든 행 포함).

- `getSelectedRowModel` - 선택된 모든 행의 행 모델을 반환합니다 (테이블에 전달된 데이터에만 기반). getCoreRowModel 이후 실행됩니다.
- `getPreSelectedRowModel` - 행 선택이 적용되기 전의 행 모델을 반환합니다 (단순히 getCoreRowModel을 반환).
- `getGroupedSelectedRowModel` - 그룹화 후 선택된 행의 행 모델을 반환합니다. getSortedRowModel 이후 실행되며, 이는 getGroupedRowModel 이후 실행되며, 이는 getFilteredRowModel 이후 실행됩니다.
- `getFilteredSelectedRowModel` - 열 필터링 및 전역 필터링 후 선택된 행의 행 모델을 반환합니다. getFilteredRowModel 이후 실행됩니다.

### 행 모델 실행 순서

TanStack Table이 내부적으로 행을 처리하는 방법을 알면 내부에서 무슨 일이 일어나고 있는지 더 잘 이해할 수 있으며, 발생할 수 있는 문제를 디버그하는 데 도움이 됩니다.

내부적으로, 각 행 모델이 데이터에 적용되는 순서는 다음과 같습니다. 해당 기능이 활성화된 경우:

`getCoreRowModel` -> `getFilteredRowModel` -> `getGroupedRowModel` -> `getSortedRowModel` -> `getExpandedRowModel` -> `getPaginationRowModel` -> `getRowModel`

어떤 경우든 해당 기능이 비활성화되거나 "manual*" 테이블 옵션으로 꺼진 경우, 그 단계의 과정에서 `getPre*RowModel`이 대신 사용됩니다.

위에서 볼 수 있듯이, 먼저 데이터가 필터링되고, 그 다음 그룹화되고, 그 다음 정렬되고, 그 다음 확장되고, 마지막으로 페이지네이션됩니다.

### 행 모델 데이터 구조

각 행 모델은 3가지 유용한 형식으로 행을 제공합니다:

1. `rows` - 행의 배열.
2. `flatRows` - 행의 배열이지만 모든 하위 행이 최상위 수준으로 평탄화됩니다.
3. `rowsById` - 각 행이 `id`로 키가 지정된 행의 객체. `id`로 행을 빠르게 조회하는 데 유용합니다.

```ts
console.log(table.getRowModel().rows) // 행의 배열
console.log(table.getRowModel().flatRows) // 행의 배열이지만 모든 하위 행이 최상위 수준으로 평탄화됩니다.
console.log(table.getRowModel().rowsById['row-id']) // 각 행이 `id`로 키가 지정된 행의 객체
```