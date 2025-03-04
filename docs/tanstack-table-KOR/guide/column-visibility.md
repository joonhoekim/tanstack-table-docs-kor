---
title: 열 가시성 가이드
---

## 예제

구현으로 바로 가고 싶으신가요? 다음 예제를 확인하세요:

- [column-visibility](../../framework/react/examples/column-visibility)
- [column-ordering](../../framework/react/examples/column-ordering)
- [sticky-column-pinning](../../framework/react/examples/column-pinning-sticky)

### 다른 예제

- [SolidJS column-visibility](../../framework/solid/examples/column-visibility)
- [Svelte column-visibility](../../framework/svelte/examples/column-visibility)

## API

[열 가시성 API](../../api/features/column-visibility)

## 열 가시성 가이드

열 가시성 기능을 사용하면 테이블 열을 동적으로 숨기거나 표시할 수 있습니다. 이전 버전의 react-table에서는 이 기능이 열의 정적 속성이었지만, v8에서는 열 가시성을 동적으로 관리하기 위한 전용 `columnVisibility` 상태와 API가 있습니다.

### 열 가시성 상태

`columnVisibility` 상태는 열 ID를 불리언 값에 매핑한 것입니다. 열 ID가 맵에 존재하고 값이 `false`인 경우 열이 숨겨집니다. 열 ID가 맵에 없거나 값이 `true`인 경우 열이 표시됩니다.

```jsx
const [columnVisibility, setColumnVisibility] = useState({
  columnId1: true,
  columnId2: false, // 이 열을 기본적으로 숨기기
  columnId3: true,
});

const table = useReactTable({
  //...
  state: {
    columnVisibility,
    //...
  },
  onColumnVisibilityChange: setColumnVisibility,
});
```

대안으로, 테이블 외부에서 열 가시성 상태를 관리할 필요가 없다면, `initialState` 옵션을 사용하여 초기 기본 열 가시성 상태를 설정할 수 있습니다.

> **참고**: `columnVisibility`가 `initialState`와 `state` 모두에 제공된 경우, `state` 초기화가 우선하며 `initialState`는 무시됩니다. `columnVisibility`를 `initialState`와 `state` 모두에 제공하지 말고, 둘 중 하나에만 제공하세요.

```jsx
const table = useReactTable({
  //...
  initialState: {
    columnVisibility: {
      columnId1: true,
      columnId2: false, // 이 열을 기본적으로 숨기기
      columnId3: true,
    },
    //...
  },
});
```

### 열 숨기기 비활성화

기본적으로 모든 열은 숨기거나 표시할 수 있습니다. 특정 열이 숨겨지지 않도록 하려면, 해당 열에 대해 `enableHiding` 열 옵션을 `false`로 설정하세요.

```jsx
const columns = [
  {
    header: 'ID',
    accessorKey: 'id',
    enableHiding: false, // 이 열에 대해 숨기기 비활성화
  },
  {
    header: 'Name',
    accessor: 'name', // 숨길 수 있음
  },
];
```

### 열 가시성 토글 API

UI에서 열 가시성 토글을 렌더링하는 데 유용한 여러 열 API 메서드가 있습니다.

- `column.getCanHide` - `enableHiding`이 `false`로 설정된 열에 대해 가시성 토글을 비활성화하는 데 유용합니다.
- `column.getIsVisible` - 가시성 토글의 초기 상태를 설정하는 데 유용합니다.
- `column.toggleVisibility` - 열의 가시성을 토글하는 데 유용합니다.
- `column.getToggleVisibilityHandler` - `column.toggleVisibility` 메서드를 UI 이벤트 핸들러에 연결하는 단축키입니다.

```jsx
{table.getAllColumns().map((column) => (
  <label key={column.id}>
    <input
      checked={column.getIsVisible()}
      disabled={!column.getCanHide()}
      onChange={column.getToggleVisibilityHandler()}
      type="checkbox"
    />
    {column.columnDef.header}
  </label>
))}
```

### 열 가시성을 고려한 테이블 API

헤더, 본문, 푸터 셀을 렌더링할 때 사용할 수 있는 많은 API 옵션이 있습니다. `table.getAllLeafColumns` 및 `row.getAllCells`와 같은 API를 볼 수 있지만, 이러한 API를 사용하면 열 가시성을 고려하지 않습니다. 대신, `table.getVisibleLeafColumns` 및 `row.getVisibleCells`와 같은 "visible" 변형 API를 사용해야 합니다.

```jsx
<table>
  <thead>
    <tr>
      {table.getVisibleLeafColumns().map((column) => ( // 열 가시성을 고려함
        //
      ))}
    </tr>
  </thead>
  <tbody>
    {table.getRowModel().rows.map((row) => (
      <tr key={row.id}>
        {row.getVisibleCells().map((cell) => ( // 열 가시성을 고려함
          //
        ))}
      </tr>
    ))}
  </tbody>
</table>
```

헤더 그룹 API를 사용하는 경우, 이미 열 가시성을 고려합니다.
