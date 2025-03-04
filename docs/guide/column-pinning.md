---
title: 열 고정 가이드
---

## 예제

구현으로 바로 가고 싶으신가요? 다음 예제를 확인하세요:

- [column-pinning](../../framework/react/examples/column-pinning)
- [sticky-column-pinning](../../framework/react/examples/column-pinning-sticky)

### 다른 예제

- [Svelte column-pinning](../../framework/svelte/examples/column-pinning)
- [Vue column-pinning](../../framework/vue/examples/column-pinning)

## API

[열 고정 API](../../api/features/column-pinning)

## 열 고정 가이드

TanStack Table은 테이블 UI에서 열 고정 기능을 구현하는 데 유용한 상태와 API를 제공합니다. 열 고정을 여러 가지 방법으로 구현할 수 있습니다. 고정된 열을 별도의 테이블로 분리하거나, 모든 열을 동일한 테이블에 유지하면서 고정 상태를 사용하여 열을 올바르게 정렬하고 sticky CSS를 사용하여 열을 왼쪽 또는 오른쪽에 고정할 수 있습니다.

### 열 고정이 열 순서에 미치는 영향

열을 재정렬할 수 있는 테이블 기능은 다음과 같은 순서로 발생합니다:

1. **열 고정** - 고정 시, 열은 왼쪽, 중앙(고정되지 않음), 오른쪽 고정 열로 나뉩니다.
2. 수동 [열 순서 지정](../column-ordering) - 수동으로 지정된 열 순서가 적용됩니다.
3. [그룹화](../grouping) - 그룹화가 활성화되어 있고, `tableOptions.groupedColumnMode`가 `'reorder' | 'remove'`로 설정된 경우, 그룹화된 열이 열 흐름의 시작으로 재정렬됩니다.

고정된 열의 순서를 변경하는 유일한 방법은 `columnPinning.left` 및 `columnPinning.right` 상태 자체에서입니다. `columnOrder` 상태는 고정되지 않은 ("중앙") 열의 순서에만 영향을 미칩니다.

### 열 고정 상태

`columnPinning` 상태 관리는 선택 사항이며, 지속적인 상태 기능을 추가하지 않는 한 일반적으로 필요하지 않습니다. TanStack Table은 이미 열 고정 상태를 추적합니다. 필요할 경우 다른 테이블 상태와 마찬가지로 `columnPinning` 상태를 관리하세요.

```jsx
const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
  left: [],
  right: [],
});
//...
const table = useReactTable({
  //...
  state: {
    columnPinning,
    //...
  }
  onColumnPinningChange: setColumnPinning,
  //...
});
```

### 기본적으로 열 고정

매우 일반적인 사용 사례는 일부 열을 기본적으로 고정하는 것입니다. 고정된 columnIds로 `columnPinning` 상태를 초기화하거나 `initialState` 테이블 옵션을 사용하여 이를 수행할 수 있습니다.

```jsx
const table = useReactTable({
  //...
  initialState: {
    columnPinning: {
      left: ['expand-column'],
      right: ['actions-column'],
    },
    //...
  }
  //...
});
```

### 유용한 열 고정 API

> 참고: 이러한 API 중 일부는 v8.12.0에서 새로 추가되었습니다.

열 고정 기능을 구현하는 데 도움이 되는 몇 가지 유용한 열 API 메서드가 있습니다:

- [`column.getCanPin`](../../api/features/column-pinning#getcanpin): 열을 고정할 수 있는지 여부를 결정하는 데 사용합니다.
- [`column.pin`](../../api/features/column-pinning#pin): 열을 왼쪽 또는 오른쪽에 고정하거나 고정을 해제하는 데 사용합니다.
- [`column.getIsPinned`](../../api/features/column-pinning#getispinned): 열이 어디에 고정되어 있는지 결정하는 데 사용합니다.
- [`column.getStart`](../../api/features/column-pinning#getstart): 고정된 열에 대한 올바른 `left` CSS 값을 제공하는 데 사용합니다.
- [`column.getAfter`](../../api/features/column-pinning#getafter): 고정된 열에 대한 올바른 `right` CSS 값을 제공하는 데 사용합니다.
- [`column.getIsLastColumn`](../../api/features/column-pinning#getislastcolumn): 열이 고정된 그룹에서 마지막 열인지 여부를 결정하는 데 사용합니다. 박스-섀도우를 추가하는 데 유용합니다.
- [`column.getIsFirstColumn`](../../api/features/column-pinning#getisfirstcolumn): 열이 고정된 그룹에서 첫 번째 열인지 여부를 결정하는 데 사용합니다. 박스-섀도우를 추가하는 데 유용합니다.

### 분할 테이블 열 고정

단순히 sticky CSS를 사용하여 열을 고정하는 경우, `table.getHeaderGroups` 및 `row.getVisibleCells` 메서드를 사용하여 테이블을 일반적으로 렌더링할 수 있습니다.

그러나 고정된 열을 별도의 테이블로 분리하는 경우, `table.getLeftHeaderGroups`, `table.getCenterHeaderGroups`, `table.getRightHeaderGroups`, `row.getLeftVisibleCells`, `row.getCenterVisibleCells`, `row.getRightVisibleCells` 메서드를 사용하여 현재 테이블과 관련된 열만 렌더링할 수 있습니다.
