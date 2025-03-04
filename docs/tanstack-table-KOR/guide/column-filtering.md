---
title: 열 필터링 가이드
---

## 예제

구현으로 바로 가고 싶으신가요? 다음 예제를 확인하세요:

- [열 필터](../../framework/react/examples/filters)
- [Faceted Filters](../../framework/react/examples/filters-faceted) (자동완성 및 범위 필터)
- [Fuzzy Search](../../framework/react/examples/filters-fuzzy) (매치 소터)
- [Editable Data](../../framework/react/examples/editable-data)
- [Expanding](../../framework/react/examples/expanding) (하위 행에서 필터링)
- [Grouping](../../framework/react/examples/grouping)
- [Pagination](../../framework/react/examples/pagination)
- [Row Selection](../../framework/react/examples/row-selection)

## API

[열 필터링 API](../../api/features/column-filtering)

## 열 필터링 가이드

필터링은 두 가지 방식으로 제공됩니다: 열 필터링과 전역 필터링.

이 가이드는 단일 열의 접근자 값에 적용되는 필터인 열 필터링에 중점을 둡니다.

TanStack Table은 클라이언트 측 및 수동 서버 측 필터링을 모두 지원합니다. 이 가이드는 두 가지를 구현하고 사용자 정의하는 방법을 설명하고, 어떤 것이 귀하의 사용 사례에 가장 적합한지 결정하는 데 도움을 줄 것입니다.

### 클라이언트 측 vs 서버 측 필터링

데이터셋이 큰 경우, 모든 데이터를 클라이언트의 브라우저에 로드하여 필터링하지 않으려 할 수 있습니다. 이 경우, 서버 측 필터링, 정렬, 페이지네이션 등을 구현하고 싶을 것입니다.

그러나 [페이지네이션 가이드](../pagination#should-you-use-client-side-pagination)에서도 논의된 바와 같이, 많은 개발자들이 클라이언트 측에서 성능 저하 없이 로드할 수 있는 행의 수를 과소평가합니다. TanStack Table 예제는 종종 클라이언트 측 필터링, 정렬, 페이지네이션 및 그룹화를 위해 최대 100,000개 이상의 행을 처리할 수 있도록 테스트됩니다. 이는 반드시 귀하의 앱이 그 많은 행을 처리할 수 있음을 의미하지는 않지만, 테이블에 최대 몇 천 개의 행만 있을 경우, TanStack Table이 제공하는 클라이언트 측 필터링, 정렬, 페이지네이션 및 그룹화를 활용할 수 있을 것입니다.

> TanStack Table은 수천 개의 클라이언트 측 행을 좋은 성능으로 처리할 수 있습니다. 클라이언트 측 필터링, 페이지네이션, 정렬 등을 먼저 고려해 보세요.

모든 사용 사례는 다르며 테이블의 복잡성, 열의 수, 각 데이터 조각의 크기 등에 따라 달라집니다. 주의해야 할 주요 병목 현상은 다음과 같습니다:

1. 서버가 모든 데이터를 합리적인 시간(및 비용) 내에 쿼리할 수 있는가?
2. 가져오기(fetch)의 총 크기는 얼마인가? (열이 많지 않다면 생각보다 나쁘지 않을 수 있습니다.)
3. 모든 데이터를 한 번에 로드하면 클라이언트의 브라우저가 너무 많은 메모리를 사용하는가?

확신이 서지 않는 경우, 클라이언트 측 필터링 및 페이지네이션으로 시작한 후 데이터가 증가함에 따라 서버 측 전략으로 전환할 수 있습니다.

### 수동 서버 측 필터링

내장된 클라이언트 측 필터링 대신 서버 측 필터링을 구현해야 한다고 결정한 경우, 다음과 같이 수행합니다.

수동 서버 측 필터링에는 `getFilteredRowModel` 테이블 옵션이 필요하지 않습니다. 대신, 테이블에 전달하는 `data`는 이미 필터링되어 있어야 합니다. 그러나 `getFilteredRowModel` 테이블 옵션을 전달한 경우, `manualFiltering` 옵션을 `true`로 설정하여 테이블이 이를 건너뛰도록 할 수 있습니다.

```jsx
const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  // getFilteredRowModel: getFilteredRowModel(), // 수동 서버 측 필터링에는 필요하지 않음
  manualFiltering: true,
})
```

> **참고:** 수동 필터링을 사용할 때, 이 가이드의 나머지 부분에서 논의된 많은 옵션은 효과가 없습니다. `manualFiltering`이 `true`로 설정되면, 테이블 인스턴스는 전달된 행에 대해 필터링 로직을 적용하지 않습니다. 대신, 전달된 `data`를 있는 그대로 사용합니다.

### 클라이언트 측 필터링

내장된 클라이언트 측 필터링 기능을 사용하는 경우, 먼저 테이블 옵션에 `getFilteredRowModel` 함수를 전달해야 합니다. 이 함수는 테이블이 데이터를 필터링해야 할 때마다 호출됩니다. TanStack Table에서 기본 `getFilteredRowModel` 함수를 가져오거나 직접 만들 수 있습니다.

```jsx
import { useReactTable, getFilteredRowModel } from '@tanstack/react-table'
//...
const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(), // 클라이언트 측 필터링에 필요
})
```

### 열 필터 상태

클라이언트 측 또는 서버 측 필터링을 사용하든 상관없이, TanStack Table이 제공하는 내장된 열 필터 상태 관리를 활용할 수 있습니다. 필터 상태를 변형하고 상호작용하며 열 필터 상태를 검색하기 위한 많은 테이블 및 열 API가 있습니다.

열 필터링 상태는 다음과 같은 형태의 객체 배열로 정의됩니다:

```ts
interface ColumnFilter {
  id: string
  value: unknown
}
type ColumnFiltersState = ColumnFilter[]
```

열 필터 상태는 객체 배열이므로 여러 열 필터를 동시에 적용할 수 있습니다.

#### 열 필터 상태 접근

테이블 인스턴스에서 `table.getState()` API를 사용하여 다른 테이블 상태와 마찬가지로 열 필터 상태에 접근할 수 있습니다.

```jsx
const table = useReactTable({
  columns,
  data,
  //...
})

console.log(table.getState().columnFilters) // 테이블 인스턴스에서 열 필터 상태에 접근
```

그러나 테이블이 초기화되기 전에 열 필터 상태에 접근해야 하는 경우, 아래와 같이 열 필터 상태를 "제어"할 수 있습니다.

### 제어된 열 필터 상태

열 필터 상태에 쉽게 접근해야 하는 경우, `state.columnFilters` 및 `onColumnFiltersChange` 테이블 옵션을 사용하여 열 필터 상태를 제어/관리할 수 있습니다.

```tsx
const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]) // 여기서 초기 열 필터 상태를 설정할 수 있음
//...
const table = useReactTable({
  columns,
  data,
  //...
  state: {
    columnFilters,
  },
  onColumnFiltersChange: setColumnFilters,
})
```

#### 초기 열 필터 상태

자체 상태 관리 또는 범위에서 열 필터 상태를 제어할 필요가 없지만 초기 열 필터 상태를 설정하려는 경우, `state` 대신 `initialState` 테이블 옵션을 사용할 수 있습니다.

```jsx
const table = useReactTable({
  columns,
  data,
  //...
  initialState: {
    columnFilters: [
      {
        id: 'name',
        value: 'John', // 기본적으로 'John'으로 이름 열 필터링
      },
    ],
  },
})
```

> **참고:** `initialState.columnFilters`와 `state.columnFilters`를 동시에 사용하지 마세요. `state.columnFilters`의 초기화된 상태가 `initialState.columnFilters`를 덮어씁니다.

### FilterFns

각 열은 고유한 필터링 로직을 가질 수 있습니다. TanStack Table에서 제공하는 필터 함수 중 하나를 선택하거나 직접 만들 수 있습니다.

기본적으로 선택할 수 있는 10개의 내장 필터 함수가 있습니다:

- `includesString` - 대소문자 구분 없는 문자열 포함
- `includesStringSensitive` - 대소문자 구분 있는 문자열 포함
- `equalsString` - 대소문자 구분 없는 문자열 동등성
- `equalsStringSensitive` - 대소문자 구분 있는 문자열 동등성
- `arrIncludes` - 배열 내 항목 포함
- `arrIncludesAll` - 배열 내 모든 항목 포함
- `arrIncludesSome` - 배열 내 일부 항목 포함
- `equals` - 객체/참조 동등성 `Object.is`/`===`
- `weakEquals` - 약한 객체/참조 동등성 `==`
- `inNumberRange` - 숫자 범위 포함

자신만의 사용자 정의 필터 함수를 `filterFn` 열 옵션으로 정의하거나 `filterFns` 테이블 옵션을 사용하여 전역 필터 함수로 정의할 수도 있습니다.

#### 사용자 정의 필터 함수

> **참고:** 이러한 필터 함수는 클라이언트 측 필터링 중에만 실행됩니다.

`filterFn` 열 옵션이나 `filterFns` 테이블 옵션에서 사용자 정의 필터 함수를 정의할 때, 다음과 같은 서명을 가져야 합니다:

```ts
const myCustomFilterFn: FilterFn = (row: Row, columnId: string, filterValue: any, addMeta: (meta: any) => void) => boolean
```

모든 필터 함수는 다음을 수신합니다:

- 필터링할 행
- 행의 값을 검색하는 데 사용할 columnId
- 필터 값

그리고 필터링된 행에 포함되어야 하는 경우 `true`를 반환하고, 제거되어야 하는 경우 `false`를 반환해야 합니다.

```jsx
const columns = [
  {
    header: () => 'Name',
    accessorKey: 'name',
    filterFn: 'includesString', // 내장 필터 함수 사용
  },
  {
    header: () => 'Age',
    accessorKey: 'age',
    filterFn: 'inNumberRange',
  },
  {
    header: () => 'Birthday',
    accessorKey: 'birthday',
    filterFn: 'myCustomFilterFn', // 사용자 정의 전역 필터 함수 사용
  },
  {
    header: () => 'Profile',
    accessorKey: 'profile',
    // 사용자 정의 필터 함수 직접 사용
    filterFn: (row, columnId, filterValue) => {
      return // 사용자 정의 로직에 따라 true 또는 false 반환
    },
  }
]
//...
const table = useReactTable({
  columns,
  data,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  filterFns: { // 사용자 정의 전역 필터 함수 추가
    myCustomFilterFn: (row, columnId, filterValue) => { // 여기서 인라인으로 정의
      return // 사용자 정의 로직에 따라 true 또는 false 반환
    },
    startsWith: startsWithFilterFn, // 다른 곳에서 정의
  },
})
```

##### 필터 함수 동작 사용자 정의

필터 함수에 몇 가지 다른 속성을 첨부하여 동작을 사용자 정의할 수 있습니다:

- `filterFn.resolveFilterValue` - 주어진 `filterFn`의 이 선택적 "매달린" 메서드는 필터 함수가 필터 값을 변환/정리/형식화할 수 있도록 합니다.

- `filterFn.autoRemove` - 주어진 `filterFn`의 이 선택적 "매달린" 메서드는 필터 값을 전달받고 필터 값이 필터 상태에서 제거되어야 하는 경우 `true`를 반환해야 합니다. 예를 들어, 일부 부울 스타일 필터는 필터 값이 `false`로 설정된 경우 테이블 상태에서 필터 값을 제거하려고 할 수 있습니다.

```tsx
const startsWithFilterFn = <TData extends MRT_RowData>(
  row: Row<TData>,
  columnId: string,
  filterValue: number | string, // resolveFilterValue가 이를 문자열로 변환
) =>
  row
    .getValue<number | string>(columnId)
    .toString()
    .toLowerCase()
    .trim()
    .startsWith(filterValue); // `resolveFilterValue`에서 toString, toLowerCase, trim 필터 값

// 필터 값이 falsy(이 경우 빈 문자열)인 경우 필터 상태에서 필터 값을 제거
startsWithFilterFn.autoRemove = (val: any) => !val; 

// transform/sanitize/format the filter value before it is passed to the filter function
startsWithFilterFn.resolveFilterValue = (val: any) => val.toString().toLowerCase().trim(); 
```

### 열 필터링 사용자 정의

열 필터링 동작을 더욱 사용자 정의할 수 있는 많은 테이블 및 열 옵션이 있습니다.

#### 열 필터링 비활성화

기본적으로, 모든 열에 대해 열 필터링이 활성화되어 있습니다. `enableColumnFilters` 테이블 옵션이나 `enableColumnFilter` 열 옵션을 사용하여 모든 열 또는 특정 열에 대해 열 필터링을 비활성화할 수 있습니다. `enableFilters` 테이블 옵션을 `false`로 설정하여 열 및 전역 필터링을 모두 끌 수도 있습니다.

열에 대한 필터링을 비활성화하면 해당 열에 대해 `column.getCanFilter` API가 `false`를 반환합니다.

```jsx
const columns = [
  {
    header: () => 'Id',
    accessorKey: 'id',
    enableColumnFilter: false, // 이 열에 대한 열 필터링 비활성화
  },
  //...
]
//...
const table = useReactTable({
  columns,
  data,
  enableColumnFilters: false, // 모든 열에 대한 열 필터링 비활성화
})
```

#### 하위 행 필터링 (확장)

확장, 그룹화 및 집계와 같은 기능을 사용할 때 열 필터링 동작을 사용자 정의할 수 있는 몇 가지 추가 테이블 옵션이 있습니다.

##### 리프 행에서 필터링

기본적으로, 필터링은 부모 행에서 아래로 수행되므로, 부모 행이 필터링되면 모든 하위 행도 필터링됩니다. 사용 사례에 따라, 사용자가 최상위 행만 검색하도록 하려는 경우, 이는 원하는 동작일 수 있습니다. 이는 또한 가장 성능이 좋은 옵션입니다.

그러나 부모 행이 필터링되더라도 하위 행을 필터링하고 검색할 수 있도록 하려면 `filterFromLeafRows` 테이블 옵션을 `true`로 설정할 수 있습니다. 이 옵션을 `true`로 설정하면 필터링이 리프 행에서 위로 수행되므로, 자식 또는 손자 행 중 하나가 포함된 경우 부모 행도 포함됩니다.

```jsx
const table = useReactTable({
  columns,
  data,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  filterFromLeafRows: true, // 하위 행을 필터링하고 검색
})
```

##### 최대 리프 행 필터 깊이

기본적으로, 필터링은 루트 수준 부모 행이든 부모 행의 자식 리프 행이든 상관없이 트리의 모든 행에 대해 수행됩니다. `maxLeafRowFilterDepth` 테이블 옵션을 `0`으로 설정하면 필터링이 루트 수준 부모 행에만 적용되며, 모든 하위 행은 필터링되지 않은 상태로 유지됩니다. 이 옵션을 `1`로 설정하면 필터링이 자식 리프 행 1단계 깊이에만 적용됩니다.

부모 행이 필터를 통과하는 동안 부모 행의 하위 행이 필터링되지 않도록 하려면 `maxLeafRowFilterDepth: 0`을 사용하세요.

```jsx
const table = useReactTable({
  columns,
  data,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  maxLeafRowFilterDepth: 0, // 루트 수준 부모 행만 필터링
})
```

### 열 필터 API

열 필터 상태와 상호작용하고 UI 구성 요소에 연결할 수 있는 많은 열 및 테이블 API가 있습니다. 사용 가능한 API와 가장 일반적인 사용 사례는 다음과 같습니다:

- `table.setColumnFilters` - 새로운 상태로 전체 열 필터 상태를 덮어씁니다.
- `table.resetColumnFilters` - "모두 지우기/필터 재설정" 버튼에 유용합니다.

- **`column.getFilterValue`** - 입력의 기본 초기 필터 값을 가져오거나 필터 값을 필터 입력에 직접 제공하는 데 유용합니다.
- **`column.setFilterValue`** - 필터 입력을 `onChange` 또는 `onBlur` 핸들러에 연결하는 데 유용합니다.

- `column.getCanFilter` - 필터 입력을 비활성화/활성화하는 데 유용합니다.
- `column.getIsFiltered` - 열이 현재 필터링되고 있음을 시각적으로 표시하는 데 유용합니다.
- `column.getFilterIndex` - 현재 필터가 어떤 순서로 적용되고 있는지 표시하는 데 유용합니다.

- `column.getAutoFilterFn` - 열에 대해 기본 필터 함수를 찾는 데 내부적으로 사용됩니다.
- `column.getFilterFn` - 현재 사용 중인 필터 모드 또는 함수를 표시하는 데 유용합니다.