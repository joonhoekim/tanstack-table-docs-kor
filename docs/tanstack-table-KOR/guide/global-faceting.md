---
title: Global Faceting Guide
---

## 예제

구현으로 바로 가고 싶으신가요? 다음 예제를 확인해보세요:

- [filters-faceted](../../framework/react/examples/filters)

## API

[Global Faceting API](../../api/features/global-faceting)

## Global Faceting 가이드

Global Faceting을 사용하면 테이블의 데이터에서 모든 열의 값 목록을 생성할 수 있습니다. 예를 들어, 테이블의 모든 행과 열에서 고유한 값 목록을 생성하여 자동 완성 필터 구성 요소에서 검색 제안으로 사용할 수 있습니다. 또는, 숫자 테이블에서 최소값과 최대값의 튜플을 생성하여 범위 슬라이더 필터 구성 요소의 범위로 사용할 수 있습니다.

### Global Faceting Row Models

어떤 Global Faceting 기능을 사용하려면 테이블 옵션에 적절한 row model을 포함해야 합니다.

```ts
// 필요한 row model만 가져오기
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedMinMaxValues, // getFacetedRowModel에 의존
  getFacetedUniqueValues, // getFacetedRowModel에 의존
} from '@tanstack/react-table'
//...
const table = useReactTable({
  // 다른 옵션...
  getCoreRowModel: getCoreRowModel(),
  getFacetedRowModel: getFacetedRowModel(), // 클라이언트 측 faceting을 위한 Faceting model (다른 faceting 방법은 이 모델에 의존)
  getFacetedMinMaxValues: getFacetedMinMaxValues(), // 최소/최대 값이 필요할 경우
  getFacetedUniqueValues: getFacetedUniqueValues(), // 고유 값 목록이 필요할 경우
  //...
})
```

### Global Faceted Row Models 사용하기

테이블 옵션에 적절한 row model을 포함한 후에는 faceting table 인스턴스 API를 사용하여 faceted row model이 생성한 값 목록에 접근할 수 있습니다.

```ts
// 자동 완성 필터를 위한 고유 값 목록
const autoCompleteSuggestions =
 Array.from(table.getGlobalFacetedUniqueValues().keys())
  .sort()
  .slice(0, 5000);
```

```ts
// 범위 필터를 위한 최소 및 최대 값의 튜플
const [min, max] = table.getGlobalFacetedMinMaxValues() ?? [0, 1];
```

### Custom Global (Server-Side) Faceting

내장된 클라이언트 측 faceting 기능 대신, 서버 측에서 자체 faceting 로직을 구현하고 faceted 값을 클라이언트 측에 전달할 수 있습니다. getGlobalFacetedUniqueValues 및 getGlobalFacetedMinMaxValues 테이블 옵션을 사용하여 서버 측에서 faceted 값을 해결할 수 있습니다.

```ts
const facetingQuery = useQuery(
  'faceting',
  async () => {
    const response = await fetch('/api/faceting');
    return response.json();
  },
  {
    onSuccess: (data) => {
      table.getGlobalFacetedUniqueValues = () => data.uniqueValues;
      table.getGlobalFacetedMinMaxValues = () => data.minMaxValues;
    },
  }
);
```

이 예제에서는 `react-query`의 `useQuery` 훅을 사용하여 서버에서 faceting 데이터를 가져옵니다. 데이터를 가져온 후, `getGlobalFacetedUniqueValues` 및 `getGlobalFacetedMinMaxValues` 테이블 옵션을 서버 응답에서 faceted 값을 반환하도록 설정합니다. 이를 통해 테이블은 자동 완성 제안 및 범위 필터를 생성하기 위해 서버 측 faceting 데이터를 사용할 수 있습니다.
