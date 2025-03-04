---
title: 행 선택 가이드
---

## 예제

구현으로 바로 가고 싶으신가요? 다음 예제를 확인하세요:

- [React 행 선택](../../framework/react/examples/row-selection)
- [Vue 행 선택](../../framework/vue/row-selection)
- [React 확장](../../framework/react/examples/expanding)

## API

[행 선택 API](../../api/features/row-selection)

## 행 선택 가이드

행 선택 기능은 선택된 행을 추적하고 다양한 방법으로 행 선택을 토글할 수 있게 해줍니다. 일반적인 사용 사례를 살펴보겠습니다.

### 행 선택 상태 접근

테이블 인스턴스는 이미 행 선택 상태를 관리합니다 (아래에서 보듯이, 행 선택 상태를 자신의 범위에서 관리하는 것이 더 편리할 수 있습니다). 몇 가지 API를 통해 내부 행 선택 상태나 선택된 행에 접근할 수 있습니다.

- `getState().rowSelection` - 내부 행 선택 상태를 반환합니다
- `getSelectedRowModel()` - 선택된 행을 반환합니다
- `getFilteredSelectedRowModel()` - 필터링 후 선택된 행을 반환합니다
- `getGroupedSelectedRowModel()` - 그룹화 및 정렬 후 선택된 행을 반환합니다

```ts
console.log(table.getState().rowSelection) //행 선택 상태 가져오기 - { 1: true, 2: false, etc... }
console.log(table.getSelectedRowModel().rows) //클라이언트 측에서 선택된 전체 행 가져오기
console.log(table.getFilteredSelectedRowModel().rows) //필터링된 클라이언트 측에서 선택된 행 가져오기
console.log(table.getGroupedSelectedRowModel().rows) //그룹화된 클라이언트 측에서 선택된 행 가져오기
```

> 참고: `manualPagination`을 사용하는 경우, `getSelectedRowModel` API는 현재 페이지에서 선택된 행만 반환합니다. 테이블 행 모델은 전달된 `data`를 기반으로만 행을 생성할 수 있기 때문입니다. 그러나 행 선택 상태는 `data` 배열에 없는 행 ID를 포함할 수 있습니다.

### 행 선택 상태 관리

테이블 인스턴스가 이미 행 선택 상태를 관리하지만, API 호출이나 다른 작업을 위해 사용할 수 있는 선택된 행 ID에 쉽게 접근하기 위해 상태를 직접 관리하는 것이 더 편리합니다.

`onRowSelectionChange` 테이블 옵션을 사용하여 행 선택 상태를 자신의 범위로 끌어올리세요. 그런 다음 `state` 테이블 옵션을 사용하여 행 선택 상태를 테이블 인스턴스로 다시 전달하세요.

```ts
const [rowSelection, setRowSelection] = useState<RowSelectionState>({}) //자신의 행 선택 상태 관리

const table = useReactTable({
  //...
  onRowSelectionChange: setRowSelection, //행 선택 상태를 자신의 범위로 끌어올리기
  state: {
    rowSelection, //행 선택 상태를 테이블 인스턴스로 다시 전달
  },
})
```

### 유용한 행 ID

기본적으로 각 행의 행 ID는 단순히 `row.index`입니다. 행 선택 기능을 사용하는 경우, 행 선택 상태가 행 ID로 키가 지정되기 때문에 더 유용한 행 식별자를 사용하고 싶을 것입니다. `getRowId` 테이블 옵션을 사용하여 각 행에 대한 고유한 행 ID를 반환하는 함수를 지정할 수 있습니다.

```ts
const table = useReactTable({
  //...
  getRowId: row => row.uuid, //데이터베이스의 행의 uuid를 행 ID로 사용
})
```

이제 행이 선택되면, 행 선택 상태는 다음과 같이 보일 것입니다:

```json
{
  "13e79140-62a8-4f9c-b087-5da737903b76": true,
  "f3e2a5c0-5b7a-4d8a-9a5c-9c9b8a8e5f7e": false
  //...
}
```

이 대신:

```json
{
  "0": true,
  "1": false
  //...
}
```

### 조건부로 행 선택 활성화

기본적으로 모든 행에 대해 행 선택이 활성화되어 있습니다. 특정 행에 대해 조건부로 행 선택을 활성화하거나 모든 행에 대해 행 선택을 비활성화하려면, `enableRowSelection` 테이블 옵션을 사용하여 더 세밀한 제어를 위해 불리언 또는 함수를 전달할 수 있습니다.

```ts
const table = useReactTable({
  //...
  enableRowSelection: row => row.original.age > 18, //성인에 대해서만 행 선택 활성화
})
```

UI에서 행이 선택 가능한지 여부를 강제하려면, `row.getCanSelect()` API를 체크박스나 다른 선택 UI에 사용할 수 있습니다.

### 단일 행 선택

기본적으로 테이블은 여러 행을 동시에 선택할 수 있습니다. 그러나 한 번에 하나의 행만 선택할 수 있도록 하려면, `enableMultiRowSelection` 테이블 옵션을 `false`로 설정하여 다중 행 선택을 비활성화하거나, 행의 하위 행에 대해 조건부로 다중 행 선택을 비활성화하는 함수를 전달할 수 있습니다.

이것은 체크박스 대신 라디오 버튼이 있는 테이블을 만드는 데 유용합니다.

```ts
const table = useReactTable({
  //...
  enableMultiRowSelection: false, //한 번에 하나의 행만 선택할 수 있도록 허용
  // enableMultiRowSelection: row => row.original.age > 18, //성인에 대해서만 한 번에 하나의 행만 선택할 수 있도록 허용
})
```

### 하위 행 선택

기본적으로 부모 행을 선택하면 모든 하위 행이 선택됩니다. 자동 하위 행 선택을 비활성화하려면, `enableSubRowSelection` 테이블 옵션을 `false`로 설정하여 하위 행 선택을 비활성화하거나, 행의 하위 행에 대해 조건부로 하위 행 선택을 비활성화하는 함수를 전달할 수 있습니다.

```ts
const table = useReactTable({
  //...
  enableSubRowSelection: false, //하위 행 선택 비활성화
  // enableSubRowSelection: row => row.original.age > 18, //성인에 대해 하위 행 선택 비활성화
})
```

### 행 선택 UI 렌더링

TanStack 테이블은 행 선택 UI를 렌더링하는 방법을 지시하지 않습니다. 체크박스, 라디오 버튼을 사용하거나 단순히 행 자체에 클릭 이벤트를 연결할 수 있습니다. 테이블 인스턴스는 행 선택 UI를 렌더링하는 데 도움이 되는 몇 가지 API를 제공합니다.

#### 체크박스 입력에 행 선택 API 연결

TanStack Table은 행 선택을 토글하기 위해 체크박스 입력에 직접 연결할 수 있는 몇 가지 핸들러 함수를 제공합니다. 이 함수는 자동으로 다른 내부 API를 호출하여 행 선택 상태를 업데이트하고 테이블을 다시 렌더링합니다.

`row.getToggleSelectedHandler()` API를 사용하여 체크박스 입력에 연결하여 행 선택을 토글하세요.

"모두 선택" 체크박스 입력에 연결하여 모든 행 선택을 토글하려면, `table.getToggleAllRowsSelectedHandler()` 또는 `table.getToggleAllPageRowsSelectedHandler` API를 사용하세요.

이 함수 핸들러에 대해 더 세밀한 제어가 필요한 경우, `row.toggleSelected()` 또는 `table.toggleAllRowsSelected()` API를 직접 사용할 수 있습니다. 또는 다른 상태 업데이트와 마찬가지로 `table.setRowSelection()` API를 호출하여 행 선택 상태를 직접 설정할 수도 있습니다. 이 핸들러 함수는 단지 편의 기능입니다.

```tsx
const columns = [
  {
    id: 'select-col',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()} //또는 getToggleAllPageRowsSelectedHandler
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  },
  //... 더 많은 열 정의...
]
```

#### UI에 행 선택 API 연결

더 간단한 행 선택 UI를 원한다면, 행 자체에 클릭 이벤트를 연결할 수 있습니다. `row.getToggleSelectedHandler()` API는 이 사용 사례에도 유용합니다.

```tsx
<tbody>
  {table.getRowModel().rows.map(row => {
    return (
      <tr
        key={row.id}
        className={row.getIsSelected() ? 'selected' : null}
        onClick={row.getToggleSelectedHandler()}
      >
        {row.getVisibleCells().map(cell => {
          return <td key={cell.id}>{/* */}</td>
        })}
      </tr>
    )
  })}
</tbody>
```
