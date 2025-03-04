---
title: 확장 가이드
---

## 예제

구현으로 바로 가고 싶으신가요? 다음 예제를 확인하세요:

- [expanding](../../framework/react/examples/expanding)
- [grouping](../../framework/react/examples/grouping)
- [sub-components](../../framework/react/examples/sub-components)

## API

[Expanding API](../../api/features/expanding)

## 확장 기능 가이드

확장은 특정 행과 관련된 추가 데이터를 표시하거나 숨길 수 있는 기능입니다. 이는 계층적 데이터를 가지고 있으며 사용자가 상위 수준에서 데이터를 드릴다운할 수 있도록 허용하고자 할 때 유용할 수 있습니다. 또는 행과 관련된 추가 정보를 표시하는 데 유용할 수 있습니다.

### 확장 기능의 다양한 사용 사례

TanStack Table에서 확장 기능의 여러 사용 사례가 아래에 논의될 것입니다.

1. 하위 행 확장 (자식 행, 집계 행 등)
2. 사용자 정의 UI 확장 (세부 패널, 하위 테이블 등)

### 클라이언트 측 확장 활성화

클라이언트 측 확장 기능을 사용하려면 테이블 옵션에서 getExpandedRowModel 함수를 정의해야 합니다. 이 함수는 확장된 행 모델을 반환하는 역할을 합니다.

```ts
const table = useReactTable({
  // 다른 옵션...
  getExpandedRowModel: getExpandedRowModel(),
})
```

확장된 데이터는 테이블 행을 포함하거나 표시하고자 하는 다른 데이터일 수 있습니다. 이 가이드에서는 두 경우를 모두 다룰 것입니다.

### 테이블 행을 확장된 데이터로 사용

확장된 행은 본질적으로 부모 행과 동일한 열 구조를 상속받는 자식 행입니다. 데이터 객체에 이미 이러한 확장된 행 데이터가 포함되어 있는 경우, getSubRows 함수를 사용하여 이러한 자식 행을 지정할 수 있습니다. 그러나 데이터 객체에 확장된 행 데이터가 포함되어 있지 않은 경우, 이는 다음 섹션에서 논의되는 사용자 정의 확장 데이터로 처리될 수 있습니다.

예를 들어, 다음과 같은 데이터 객체가 있는 경우:

```ts
type Person = {
  id: number
  name: string
  age: number
  children?: Person[] | undefined
}

const data: Person[] =  [
  { id: 1, 
  name: 'John', 
  age: 30, 
  children: [
      { id: 2, name: 'Jane', age: 5 },
      { id: 5, name: 'Jim', age: 10 }
    ] 
  },
  { id: 3,
   name: 'Doe', 
   age: 40, 
    children: [
      { id: 4, name: 'Alice', age: 10 }
    ] 
  },
]
```

그런 다음 getSubRows 함수를 사용하여 각 행의 자식 배열을 확장된 행으로 반환할 수 있습니다. 테이블 인스턴스는 이제 각 행에서 하위 행을 찾을 위치를 이해하게 됩니다.

```ts
const table = useReactTable({
  // 다른 옵션...
  getSubRows: (row) => row.children, // 자식 배열을 하위 행으로 반환
  getCoreRowModel: getCoreRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
})
```

> **참고:** 복잡한 `getSubRows` 함수를 가질 수 있지만, 이 함수는 모든 행과 모든 하위 행에 대해 실행되므로 최적화되지 않으면 비용이 많이 들 수 있습니다. 비동기 함수는 지원되지 않습니다.

### 사용자 정의 확장 UI

일부 경우에는 테이블 데이터 객체의 일부일 수도 있고 아닐 수도 있는 추가 세부 정보나 정보를 표시하고자 할 수 있습니다. 이러한 종류의 확장 행 UI는 "확장 가능한 행", "세부 패널", "하위 구성 요소" 등으로 불려왔습니다.

기본적으로 `row.getCanExpand()` 행 인스턴스 API는 행에서 `subRows`를 찾지 않는 한 false를 반환합니다. 이는 테이블 인스턴스 옵션에서 자체 `getRowCanExpand` 함수를 구현하여 재정의할 수 있습니다.

```ts
//...
const table = useReactTable({
  // 다른 옵션...
  getRowCanExpand: (row) => true, // 행을 확장할 수 있는지 여부를 결정하는 로직을 추가합니다. true는 모든 행이 확장된 데이터를 포함함을 의미합니다.
  getCoreRowModel: getCoreRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
})
//...
<tbody>
  {table.getRowModel().rows.map((row) => (
    <React.Fragment key={row.id}>
     {/* 일반 행 UI */}
      <tr>
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id}>
            <FlexRender
              render={cell.column.columnDef.cell}
              props={cell.getContext()}
            />
          </td>
        ))}
      </tr>
      {/* 행이 확장된 경우, 확장된 UI를 테이블의 너비를 차지하는 단일 셀로 별도의 행으로 렌더링합니다. */}
      {row.getIsExpanded() && (
        <tr>
          <td colSpan={row.getAllCells().length}> // 부모 행과 동일한 열을 공유하지 않는 행의 경우 확장된 데이터에 대해 차지할 열 수
            // 사용자 정의 UI가 여기에 들어갑니다.
          </td>
        </tr>
      )}
    </React.Fragment>
  ))}
</tbody>
//...
```

### 확장된 행 상태

테이블의 행 확장 상태를 제어해야 하는 경우, 확장 상태와 `onExpandedChange` 옵션을 사용하여 이를 수행할 수 있습니다. 이를 통해 요구 사항에 따라 확장 상태를 관리할 수 있습니다.

```ts
const [expanded, setExpanded] = useState<ExpandedState>({})

const table = useReactTable({
  // 다른 옵션...
  state: {
    expanded: expanded, // 확장 상태를 테이블에 다시 전달해야 합니다.
  },
  onExpandedChange: setExpanded
})
```

ExpandedState 타입은 다음과 같이 정의됩니다:

```ts
type ExpandedState = true | Record<string, boolean>
```

ExpandedState가 true이면 모든 행이 확장된 것을 의미합니다. 레코드인 경우, ID가 레코드의 키로 존재하고 값이 true로 설정된 행만 확장됩니다. 예를 들어, 확장 상태가 `{ row1: true, row2: false }`이면 ID가 row1인 행은 확장되고 ID가 row2인 행은 확장되지 않습니다. 이 상태는 테이블이 어떤 행이 확장되어 하위 행을 표시해야 하는지를 결정하는 데 사용됩니다.

### 확장된 행을 위한 UI 토글 핸들러

TanStack 테이블은 확장된 데이터에 대한 토글 핸들러 UI를 테이블에 추가하지 않습니다. 각 행의 UI 내에서 수동으로 추가하여 사용자가 행을 확장하고 축소할 수 있도록 해야 합니다. 예를 들어, 열 정의 내에 버튼 UI를 추가할 수 있습니다.

```ts
const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    header: 'Children',
    cell: ({ row }) => {
      return row.getCanExpand() ?
        <button
          onClick={row.getToggleExpandedHandler()}
          style={{ cursor: 'pointer' }}
        >
        {row.getIsExpanded() ? '👇' : '👉'}
        </button>
       : '';
    },
  },
]
```

### 확장된 행 필터링

기본적으로 필터링 프로세스는 부모 행에서 시작하여 하위 행으로 이동합니다. 즉, 부모 행이 필터에 의해 제외되면 모든 자식 행도 제외됩니다. 그러나 `filterFromLeafRows` 옵션을 사용하여 이 동작을 변경할 수 있습니다. 이 옵션이 활성화되면 필터링 프로세스는 리프(자식) 행에서 시작하여 상위로 이동합니다. 이는 적어도 하나의 자식 또는 손자 행이 필터 기준을 충족하는 한 부모 행이 필터링된 결과에 포함되도록 보장합니다. 또한 `maxLeafRowFilterDepth` 옵션을 사용하여 필터 프로세스가 자식 계층 구조에서 얼마나 깊이 들어갈지를 제어할 수 있습니다. 이 옵션을 사용하여 필터가 고려해야 하는 자식 행의 최대 깊이를 지정할 수 있습니다.

```ts
//...
const table = useReactTable({
  // 다른 옵션...
  getSubRows: row => row.subRows,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  filterFromLeafRows: true, // 확장된 행을 검색합니다.
  maxLeafRowFilterDepth: 1, // 검색할 확장된 행의 깊이를 제한합니다.
})
```

### 확장된 행 페이징

기본적으로 확장된 행은 테이블의 나머지 부분과 함께 페이징됩니다 (즉, 확장된 행이 여러 페이지에 걸쳐 있을 수 있습니다). 이 동작을 비활성화하려면 (즉, 확장된 행이 항상 부모 페이지에 렌더링됩니다. 이는 설정된 페이지 크기보다 더 많은 행이 렌더링됨을 의미합니다) `paginateExpandedRows` 옵션을 사용할 수 있습니다.

```ts
const table = useReactTable({
  // 다른 옵션...
  paginateExpandedRows: false,
})
```

### 확장된 행 고정

확장된 행 고정은 일반 행 고정과 동일한 방식으로 작동합니다. 확장된 행을 테이블의 상단 또는 하단에 고정할 수 있습니다. 행 고정에 대한 자세한 내용은 [Pinning Guide](./pinning.md)를 참조하세요.

### 확장된 행 정렬

기본적으로 확장된 행은 테이블의 나머지 부분과 함께 정렬됩니다.

### 수동 확장 (서버 측)

서버 측 확장을 수행하는 경우, manualExpanding 옵션을 true로 설정하여 수동 행 확장을 활성화할 수 있습니다. 이는 `getExpandedRowModel`이 행을 확장하는 데 사용되지 않으며 자체 데이터 모델에서 확장을 수행해야 함을 의미합니다.

```ts
const table = useReactTable({
  // 다른 옵션...
  manualExpanding: true,
})
```
