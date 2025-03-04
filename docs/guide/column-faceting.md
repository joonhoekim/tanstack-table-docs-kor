---
title: 열 패싯 가이드
---

## 예제

구현으로 바로 가고 싶으신가요? 다음 예제를 확인하세요:

- [필터-패싯](../../framework/react/examples/filters-faceted)

## API

[열 패싯 API](../../api/features/column-faceting)

## 열 패싯 가이드

열 패싯은 주어진 열의 데이터에서 해당 열의 값 목록을 생성할 수 있는 기능입니다. 예를 들어, 자동완성 필터 구성 요소에서 검색 제안으로 사용하기 위해 열의 모든 행에서 고유한 값 목록을 생성할 수 있습니다. 또는, 범위 슬라이더 필터 구성 요소의 범위로 사용하기 위해 숫자 열에서 최소값과 최대값의 튜플을 생성할 수 있습니다.

### 열 패싯 행 모델

열 패싯 기능을 사용하려면, 테이블 옵션에 적절한 행 모델을 포함해야 합니다.

```ts
// 필요한 행 모델만 가져오기
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedMinMaxValues, //getFacetedRowModel에 의존
  getFacetedUniqueValues, //getFacetedRowModel에 의존
}
//...
const table = useReactTable({
  columns,
  data,
  getCoreRowModel: getCoreRowModel(),
  getFacetedRowModel: getFacetedRowModel(), //열에 대한 값 목록이 필요한 경우 (다른 패싯 행 모델은 이 모델에 의존)
  getFacetedMinMaxValues: getFacetedMinMaxValues(), //최소/최대 값이 필요한 경우
  getFacetedUniqueValues: getFacetedUniqueValues(), //고유한 값 목록이 필요한 경우
  //...
})
```

먼저, `getFacetedRowModel` 행 모델을 포함해야 합니다. 이 행 모델은 주어진 열에 대한 값 목록을 생성합니다. 고유한 값 목록이 필요한 경우, `getFacetedUniqueValues` 행 모델을 포함하세요. 최소값과 최대값의 튜플이 필요한 경우, `getFacetedMinMaxValues` 행 모델을 포함하세요.

### 패싯 행 모델 사용

테이블 옵션에 적절한 행 모델을 포함한 후, 패싯 열 인스턴스 API를 사용하여 패싯 행 모델이 생성한 값 목록에 접근할 수 있습니다.

```ts
// 자동완성 필터를 위한 고유한 값 목록
const autoCompleteSuggestions = 
 Array.from(column.getFacetedUniqueValues().keys())
  .sort()
  .slice(0, 5000);
```

```ts
// 범위 필터를 위한 최소값과 최대값의 튜플
const [min, max] = column.getFacetedMinMaxValues() ?? [0, 1];
```

### 사용자 정의 (서버 측) 패싯

내장된 클라이언트 측 패싯 기능을 사용하는 대신, 서버 측에서 자체 패싯 로직을 구현하고 패싯 값을 클라이언트 측에 전달할 수 있습니다. `getFacetedUniqueValues` 및 `getFacetedMinMaxValues` 테이블 옵션을 사용하여 서버 측에서 패싯 값을 해결할 수 있습니다.

```ts
const facetingQuery = useQuery(
  //...
)

const table = useReactTable({
  columns,
  data,
  getCoreRowModel: getCoreRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: (table, columnId) => {
    const uniqueValueMap = new Map<string, number>();
    //...
    return uniqueValueMap;
  },
  getFacetedMinMaxValues: (table, columnId) => {
    //...
    return [min, max];
  },
  //...
})
```

또는, TanStack Table API를 통해 패싯 로직을 전혀 처리할 필요가 없습니다. 목록을 가져와 필터 구성 요소에 직접 전달하세요.