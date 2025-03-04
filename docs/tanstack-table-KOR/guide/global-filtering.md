---
title: Global Filtering Guide
---

## 예제

구현으로 바로 가고 싶으신가요? 다음 예제를 확인하세요:

- [Global Filters](../../framework/react/examples/filters-global)

## API

[Global Filtering API](../../api/features/global-filtering)

## Global Filtering Guide

필터링은 두 가지 방식으로 제공됩니다: Column Filtering과 Global Filtering.

이 가이드는 모든 열에 적용되는 필터인 global filtering에 중점을 둡니다.

### 클라이언트 측 vs 서버 측 필터링

데이터셋이 큰 경우, 모든 데이터를 클라이언트의 브라우저에 로드하여 필터링하는 것을 원하지 않을 수 있습니다. 이 경우, 서버 측 필터링, 정렬, 페이지네이션 등을 구현하는 것이 좋습니다.

그러나 [Pagination Guide](../pagination#should-you-use-client-side-pagination)에서도 논의된 바와 같이, 많은 개발자들이 클라이언트 측에서 성능 저하 없이 로드할 수 있는 행의 수를 과소평가합니다. TanStack table 예제는 종종 클라이언트 측 필터링, 정렬, 페이지네이션, 그룹화를 통해 최대 100,000개의 행을 처리할 수 있도록 테스트됩니다. 이는 반드시 여러분의 앱이 그 많은 행을 처리할 수 있다는 것을 의미하지는 않지만, 테이블에 최대 몇 천 개의 행만 있을 경우, TanStack table이 제공하는 클라이언트 측 필터링, 정렬, 페이지네이션, 그룹화를 활용할 수 있습니다.

> TanStack Table은 수천 개의 클라이언트 측 행을 좋은 성능으로 처리할 수 있습니다. 클라이언트 측 필터링, 페이지네이션, 정렬 등을 먼저 고려해보세요.

모든 사용 사례는 테이블의 복잡성, 열의 수, 각 데이터의 크기 등에 따라 다릅니다. 주의해야 할 주요 병목 현상은 다음과 같습니다:

1. 서버가 모든 데이터를 합리적인 시간(및 비용) 내에 쿼리할 수 있는가?
2. 페치의 총 크기는 얼마인가? (열이 많지 않다면 생각보다 나쁘지 않을 수 있습니다.)
3. 모든 데이터를 한 번에 로드할 경우 클라이언트의 브라우저가 너무 많은 메모리를 사용하는가?

확신이 서지 않는다면, 클라이언트 측 필터링과 페이지네이션으로 시작한 후 데이터가 증가함에 따라 서버 측 전략으로 전환할 수 있습니다.

### 수동 서버 측 Global Filtering

내장된 클라이언트 측 global filtering 대신 서버 측 global filtering을 구현하기로 결정했다면, 다음과 같이 할 수 있습니다.

수동 서버 측 global filtering에는 `getFilteredRowModel` 테이블 옵션이 필요하지 않습니다. 대신, 테이블에 전달하는 `data`는 이미 필터링되어 있어야 합니다. 그러나 `getFilteredRowModel` 테이블 옵션을 전달한 경우, `manualFiltering` 옵션을 `true`로 설정하여 테이블이 이를 건너뛰도록 할 수 있습니다.

```jsx
const table = useReactTable({
  data,
  columns,
  // getFilteredRowModel: getFilteredRowModel(), // 수동 서버 측 global filtering에는 필요하지 않음
  manualFiltering: true,
})
```

참고: 수동 global filtering을 사용할 때, 이 가이드의 나머지 부분에서 논의된 많은 옵션은 효과가 없습니다. manualFiltering이 true로 설정되면, 테이블 인스턴스는 전달된 행에 대해 global filtering 논리를 적용하지 않습니다. 대신, 전달된 데이터를 그대로 사용합니다.

### 클라이언트 측 Global Filtering

내장된 클라이언트 측 global filtering을 사용하는 경우, 먼저 테이블 옵션에 getFilteredRowModel 함수를 전달해야 합니다.

```jsx
import { useReactTable, getFilteredRowModel } from '@tanstack/react-table'
//...
const table = useReactTable({
  // 다른 옵션...
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(), // 클라이언트 측 global filtering에 필요
})
```

### Global Filter Function

globalFilterFn 옵션을 사용하여 global filtering에 사용할 필터 함수를 지정할 수 있습니다. 필터 함수는 내장된 필터 함수를 참조하는 문자열, tableOptions.filterFns 옵션을 통해 제공된 사용자 정의 필터 함수를 참조하는 문자열, 또는 사용자 정의 필터 함수일 수 있습니다.

```jsx
const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  globalFilterFn: 'text' // 내장 필터 함수
})
```

기본적으로 선택할 수 있는 10개의 내장 필터 함수가 있습니다:

- includesString - 대소문자 구분 없는 문자열 포함
- includesStringSensitive - 대소문자 구분 있는 문자열 포함
- equalsString - 대소문자 구분 없는 문자열 동일
- equalsStringSensitive - 대소문자 구분 있는 문자열 동일
- arrIncludes - 배열 내 항목 포함
- arrIncludesAll - 배열 내 모든 항목 포함
- arrIncludesSome - 배열 내 일부 항목 포함
- equals - 객체/참조 동일 Object.is/===
- weakEquals - 약한 객체/참조 동일 ==
- inNumberRange - 숫자 범위 포함

또한 globalFilterFn 테이블 옵션으로 사용자 정의 필터 함수를 정의할 수 있습니다.

### Global Filter State

global filter 상태는 테이블의 내부 상태에 저장되며, table.getState().globalFilter 속성을 통해 접근할 수 있습니다. 테이블 외부에서 global filter 상태를 유지하려면, global filter 상태가 변경될 때마다 호출되는 콜백 함수를 제공하는 onGlobalFilterChange 옵션을 사용할 수 있습니다.

```jsx
const [globalFilter, setGlobalFilter] = useState<any>([])

const table = useReactTable({
  // 다른 옵션...
  state: {
    globalFilter,
  },
  onGlobalFilterChange: setGlobalFilter
})
```

global filtering 상태는 다음과 같은 형태의 객체로 정의됩니다:

```jsx
interface GlobalFilter {
  globalFilter: any
}
```

### UI에 global filter 입력 추가

TanStack table은 테이블에 global filter 입력 UI를 추가하지 않습니다. 사용자가 테이블을 필터링할 수 있도록 UI에 수동으로 추가해야 합니다. 예를 들어, 사용자가 검색어를 입력할 수 있도록 테이블 위에 입력 UI를 추가할 수 있습니다.

```jsx
return (
  <div>
    <input
      value=""
      onChange={e => table.setGlobalFilter(String(e.target.value))}
      placeholder="Search..."
    />
  </div>
)
```

### 사용자 정의 Global Filter Function

사용자 정의 global filter 함수를 사용하려면, 함수를 정의하고 globalFilterFn 옵션에 전달할 수 있습니다.

> **참고:** global filtering에 fuzzy filtering 함수를 사용하는 것이 종종 인기가 있습니다. 이는 [Fuzzy Filtering Guide](./fuzzy-filtering.md)에서 논의됩니다.

```jsx
const customFilterFn = (rows, columnId, filterValue) => {
  // 사용자 정의 필터 로직
}

const table = useReactTable({
  // 다른 옵션...
  globalFilterFn: customFilterFn
})
```

### 초기 Global Filter State

테이블이 초기화될 때 초기 global filter 상태를 설정하려면, 테이블 initialState 옵션의 일부로 global filter 상태를 전달할 수 있습니다.

그러나 state.globalFilter 옵션에서 초기 global filter 상태를 지정할 수도 있습니다.

```jsx
const [globalFilter, setGlobalFilter] = useState("search term") // globalFilter 상태를 여기서 초기화하는 것이 좋습니다

const table = useReactTable({
  // 다른 옵션...
  initialState: {
    globalFilter: 'search term', // globalFilter 상태를 관리하지 않는 경우, 초기 상태를 여기서 설정
  }
  state: {
    globalFilter, // 관리되는 globalFilter 상태를 테이블에 전달
  }
})
```

> 참고: initialState.globalFilter와 state.globalFilter를 동시에 사용하지 마세요. state.globalFilter에 초기화된 상태가 initialState.globalFilter를 덮어씁니다.

### Global Filtering 비활성화

기본적으로, global filtering은 모든 열에 대해 활성화되어 있습니다. enableGlobalFilter 테이블 옵션을 사용하여 모든 열에 대해 global filtering을 비활성화할 수 있습니다. enableFilters 테이블 옵션을 false로 설정하여 열과 global filtering을 모두 끌 수도 있습니다.

global filtering을 비활성화하면, column.getCanGlobalFilter API는 해당 열에 대해 false를 반환합니다.

```jsx
const columns = [
  {
    header: () => 'Id',
    accessorKey: 'id',
    enableGlobalFilter: false, // 이 열에 대해 global filtering 비활성화
  },
  //...
]
//...
const table = useReactTable({
  // 다른 옵션...
  columns,
  enableGlobalFilter: false, // 모든 열에 대해 global filtering 비활성화
})
```
