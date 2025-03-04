---
title: 테이블 상태 (React) 가이드
---

## 예제

구현 방법을 바로 확인하고 싶으신가요? 다음 예제를 확인해보세요:

- [종합 예제](../../examples/kitchen-sink)
- [완전 제어 예제](../../examples/fully-controlled)

## 테이블 상태 (React) 가이드

TanStack Table은 테이블의 상태를 저장하고 관리하기 위한 간단한 내부 상태 관리 시스템을 갖추고 있습니다. 또한 필요한 상태를 선택적으로 추출하여 자체 상태 관리 시스템에서 관리할 수 있게 해줍니다. 이 가이드에서는 테이블의 상태와 상호작용하고 관리하는 다양한 방법을 안내합니다.

### 테이블 상태 접근하기

테이블 상태를 사용하기 위해 특별한 설정이 필요하지 않습니다. `state`, `initialState` 또는 `on[State]Change` 테이블 옵션에 아무것도 전달하지 않으면, 테이블은 자체적으로 내부 상태를 관리합니다. `table.getState()` 테이블 인스턴스 API를 사용하여 이 내부 상태의 어떤 부분이든 접근할 수 있습니다.

```jsx
const table = useReactTable({
  columns,
  data,
  //...
})

console.log(table.getState()) // 전체 내부 상태에 접근
console.log(table.getState().rowSelection) // 행 선택 상태에만 접근
```

### 사용자 정의 초기 상태

특정 상태에 대해 초기 기본값만 사용자 정의하려면, 여전히 상태를 직접 관리할 필요가 없습니다. 테이블 인스턴스의 `initialState` 옵션에 값을 설정하기만 하면 됩니다.

```jsx
const table = useReactTable({
  columns,
  data,
  initialState: {
    columnOrder: ['age', 'firstName', 'lastName'], // 초기 열 순서 사용자 정의
    columnVisibility: {
      id: false // 기본적으로 id 열 숨기기
    },
    expanded: true, // 기본적으로 모든 행 확장
    sorting: [
      {
        id: 'age',
        desc: true // 기본적으로 나이를 내림차순으로 정렬
      }
    ]
  },
  //...
})
```

> **참고**: 각 특정 상태는 `initialState` 또는 `state` 중 하나에만 지정하고, 둘 다에 지정하지 마세요. 특정 상태 값을 `initialState`와 `state` 모두에 전달하면, `state`의 초기화된 상태가 `initialState`의 해당 값을 덮어씁니다.

### 제어된 상태

애플리케이션의 다른 영역에서 테이블 상태에 쉽게 접근해야 하는 경우, TanStack Table은 자체 상태 관리 시스템에서 테이블 상태의 일부 또는 전체를 제어하고 관리하기 쉽게 해줍니다. 이는 자체 상태와 상태 관리 함수를 `state` 및 `on[State]Change` 테이블 옵션에 전달하여 수행할 수 있습니다.

#### 개별 제어 상태

쉽게 접근해야 하는 상태만 제어할 수 있습니다. 필요하지 않다면 모든 테이블 상태를 제어할 필요는 없습니다. 필요한 상태만 사례별로 제어하는 것이 권장됩니다.

특정 상태를 제어하려면, 해당 `state` 값과 `on[State]Change` 함수를 모두 테이블 인스턴스에 전달해야 합니다.

"수동" 서버 측 데이터 가져오기 시나리오에서 필터링, 정렬, 페이지네이션을 예로 들어보겠습니다. API가 열 순서, 열 가시성 등과 같은 다른 상태에 관심이 없다면, 필터링, 정렬, 페이지네이션 상태는 자체 상태 관리에 저장하고 다른 상태는 제외할 수 있습니다.

```jsx
const [columnFilters, setColumnFilters] = React.useState([]) // 기본 필터 없음
const [sorting, setSorting] = React.useState([{
  id: 'age',
  desc: true, // 기본적으로 나이를 내림차순으로 정렬
}]) 
const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 15 })

// 제어된 상태 값을 사용하여 데이터 가져오기
const tableQuery = useQuery({
  queryKey: ['users', columnFilters, sorting, pagination],
  queryFn: () => fetchUsers(columnFilters, sorting, pagination),
  //...
})

const table = useReactTable({
  columns,
  data: tableQuery.data,
  //...
  state: {
    columnFilters, // 제어된 상태를 테이블에 다시 전달 (내부 상태 덮어쓰기)
    sorting,
    pagination
  },
  onColumnFiltersChange: setColumnFilters, // columnFilters 상태를 자체 상태 관리로 끌어올리기
  onSortingChange: setSorting,
  onPaginationChange: setPagination,
})
//...
```

#### 완전 제어 상태

또는 `onStateChange` 테이블 옵션을 사용하여 전체 테이블 상태를 제어할 수 있습니다. 이는 전체 테이블 상태를 자체 상태 관리 시스템으로 끌어올립니다. 이 접근 방식을 사용할 때는 주의해야 합니다. `columnSizingInfo` 상태와 같이 자주 변경되는 상태 값을 React 트리 위로 올리면 성능 문제가 발생할 수 있습니다.

이를 작동시키기 위해 몇 가지 추가 기법이 필요할 수 있습니다. `onStateChange` 테이블 옵션을 사용하는 경우, `state`의 초기 값은 사용하려는 모든 기능에 대한 모든 관련 상태 값으로 채워져야 합니다. 모든 초기 상태 값을 수동으로 입력하거나, 아래와 같이 특별한 방식으로 `table.setOptions` API를 사용할 수 있습니다.

```jsx
// 기본 상태 값으로 테이블 인스턴스 생성
const table = useReactTable({
  columns,
  data,
  //... 참고: `state` 값은 아직 전달되지 않음
})


const [state, setState] = React.useState({
  ...table.initialState, // 테이블 인스턴스의 모든 기본 상태 값으로 초기 상태 채우기
  pagination: {
    pageIndex: 0,
    pageSize: 15 // 선택적으로 초기 페이지네이션 상태 사용자 정의
  }
})

// table.setOptions API를 사용하여 완전 제어 상태를 테이블 인스턴스에 병합
table.setOptions(prev => ({
  ...prev, // 위에서 설정한 다른 옵션 유지
  state, // 완전 제어 상태가 내부 상태를 덮어씀
  onStateChange: setState // 모든 상태 변경은 자체 상태 관리로 전달됨
}))
```

### 상태 변경 콜백

지금까지 `on[State]Change`와 `onStateChange` 테이블 옵션이 테이블 상태 변경을 자체 상태 관리로 "끌어올리는" 방식을 살펴보았습니다. 그러나 이러한 옵션을 사용할 때 알아야 할 몇 가지 사항이 있습니다.

#### 1. **상태 변경 콜백은 반드시 `state` 옵션에 해당 상태 값이 있어야 합니다**.

`on[State]Change` 콜백을 지정하면 테이블 인스턴스에 이것이 제어된 상태가 될 것임을 알립니다. 해당 `state` 값을 지정하지 않으면, 그 상태는 초기 값으로 "고정"됩니다.

```jsx
const [sorting, setSorting] = React.useState([])
//...
const table = useReactTable({
  columns,
  data,
  //...
  state: {
    sorting, // `onSortingChange`를 사용하기 때문에 필요함
  },
  onSortingChange: setSorting, // `state.sorting`을 제어 상태로 만듦
})
```

#### 2. **업데이터는 원시 값이나 콜백 함수일 수 있습니다**.

`on[State]Change`와 `onStateChange` 콜백은 React의 `setState` 함수와 정확히 같은 방식으로 작동합니다. 업데이터 값은 새 상태 값이거나 이전 상태 값을 받아 새 상태 값을 반환하는 콜백 함수일 수 있습니다.

이것이 어떤 의미를 가질까요? `on[State]Change` 콜백에 추가 로직을 넣고 싶다면 가능하지만, 새로 들어오는 업데이터 값이 함수인지 값인지 확인해야 한다는 의미입니다.

```jsx
const [sorting, setSorting] = React.useState([])
const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 })

const table = useReactTable({
  columns,
  data,
  //...
  state: {
    pagination,
    sorting,
  }
  // 문법 1
  onPaginationChange: (updater) => {
    setPagination(old => {
      const newPaginationValue = updater instanceof Function ? updater(old) : updater
      // 새 페이지네이션 값으로 무언가 수행
      //...
      return newPaginationValue
    })
  },
  // 문법 2
  onSortingChange: (updater) => {
    const newSortingValue = updater instanceof Function ? updater(sorting) : updater
    // 새 정렬 값으로 무언가 수행
    //...
    setSorting(updater) // 일반 상태 업데이트
  }
})
```

### 상태 타입

TanStack Table의 모든 복잡한 상태는 가져와서 사용할 수 있는 자체 TypeScript 타입을 가지고 있습니다. 이는 제어하는 상태 값에 대해 올바른 데이터 구조와 속성을 사용하고 있는지 확인하는 데 유용할 수 있습니다.

```tsx
import { useReactTable, type SortingState } from '@tanstack/react-table'
//...
const [sorting, setSorting] = React.useState<SortingState[]>([
  {
    id: 'age', // `id`와 `desc` 속성에 대한 자동 완성을 얻을 수 있습니다
    desc: true,
  }
])
```
