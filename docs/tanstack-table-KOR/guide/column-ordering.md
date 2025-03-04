---
title: 열 순서 지정 가이드
---

## 예제

구현으로 바로 가고 싶으신가요? 다음 예제를 확인하세요:

- [column-ordering](../../framework/react/examples/column-ordering)
- [column-dnd](../../framework/react/examples/column-dnd)

## API

[열 순서 지정 API](../../api/features/column-ordering)

## 열 순서 지정 가이드

기본적으로 열은 `columns` 배열에 정의된 순서대로 정렬됩니다. 그러나 `columnOrder` 상태를 사용하여 열 순서를 수동으로 지정할 수 있습니다. 열 고정 및 그룹화와 같은 다른 기능도 열 순서에 영향을 줄 수 있습니다.

### 열 순서에 영향을 미치는 요소

열을 재정렬할 수 있는 테이블 기능은 다음과 같은 순서로 발생합니다:

1. [열 고정](../column-pinning) - 고정 시, 열은 왼쪽, 중앙(고정되지 않음), 오른쪽 고정 열로 나뉩니다.
2. 수동 **열 순서 지정** - 수동으로 지정된 열 순서가 적용됩니다.
3. [그룹화](../grouping) - 그룹화가 활성화되어 있고, `tableOptions.groupedColumnMode`가 `'reorder' | 'remove'`로 설정된 경우, 그룹화된 열이 열 흐름의 시작으로 재정렬됩니다.

> **참고:** 열 고정과 함께 사용되는 경우 `columnOrder` 상태는 고정되지 않은 열에만 영향을 미칩니다.

### 열 순서 상태

`columnOrder` 상태를 제공하지 않으면 TanStack Table은 `columns` 배열의 열 순서를 사용합니다. 그러나 열 순서를 지정하기 위해 문자열 열 ID 배열을 `columnOrder` 상태에 제공할 수 있습니다.

#### 기본 열 순서

초기 열 순서만 지정하면 되는 경우, `initialState` 테이블 옵션에서 `columnOrder` 상태를 지정할 수 있습니다.

```jsx
const table = useReactTable({
  //...
  initialState: {
    columnOrder: ['columnId1', 'columnId2', 'columnId3'],
  }
  //...
});
```

> **참고:** `state` 테이블 옵션을 사용하여 `columnOrder` 상태를 지정하는 경우, `initialState`는 효과가 없습니다. 특정 상태는 `initialState` 또는 `state` 중 하나에만 지정하세요.

#### 열 순서 상태 관리

열 순서를 동적으로 변경하거나 테이블이 초기화된 후 열 순서를 설정해야 하는 경우, 다른 테이블 상태와 마찬가지로 `columnOrder` 상태를 관리할 수 있습니다.

```jsx
const [columnOrder, setColumnOrder] = useState<string[]>(['columnId1', 'columnId2', 'columnId3']); //옵션으로 열 순서 초기화
//...
const table = useReactTable({
  //...
  state: {
    columnOrder,
    //...
  }
  onColumnOrderChange: setColumnOrder,
  //...
});
```

### 열 재정렬

테이블에 사용자가 열을 재정렬할 수 있는 UI가 있는 경우, 다음과 같은 로직을 설정할 수 있습니다:

```tsx
const [columnOrder, setColumnOrder] = useState<string[]>(columns.map(c => c.id));

//선택한 dnd 솔루션에 따라, 이와 같은 상태가 필요할 수도 있고 필요하지 않을 수도 있습니다.
const [movingColumnId, setMovingColumnId] = useState<string | null>(null);
const [targetColumnId, setTargetColumnId] = useState<string | null>(null);

//columnOrder 배열을 잘라내고 재정렬하는 유틸 함수
const reorderColumn = <TData extends RowData>(
  movingColumnId: Column<TData>,
  targetColumnId: Column<TData>,
): string[] => {
  const newColumnOrder = [...columnOrder];
  newColumnOrder.splice(
    newColumnOrder.indexOf(targetColumnId),
    0,
    newColumnOrder.splice(newColumnOrder.indexOf(movingColumnId), 1)[0],
  );
  setColumnOrder(newColumnOrder);
};

const handleDragEnd = (e: DragEvent) => {
  if(!movingColumnId || !targetColumnId) return;
  setColumnOrder(reorderColumn(movingColumnId, targetColumnId));
};

//선택한 dnd 솔루션 사용
```

#### 드래그 앤 드롭 열 재정렬 제안 (React)

TanStack Table과 함께 드래그 앤 드롭 기능을 구현하는 방법은 여러 가지가 있습니다. 다음은 나쁜 경험을 피하기 위한 몇 가지 제안입니다:

1. React 18 이상을 사용하는 경우 [`"react-dnd"`](https://react-dnd.github.io/react-dnd/docs/overview)를 사용하지 마세요. React DnD는 그 당시 중요한 라이브러리였지만, 이제는 자주 업데이트되지 않으며, 특히 React Strict Mode에서 React 18과의 호환성 문제가 있습니다. 여전히 작동하게 할 수는 있지만, 더 나은 호환성을 가진 최신 대안이 있으며, 더 적극적으로 유지 관리됩니다. React DnD의 Provider는 앱에서 시도할 수 있는 다른 DnD 솔루션과 충돌할 수 있습니다.

2. [`"@dnd-kit/core"`](https://dndkit.com/)를 사용하세요. DnD Kit은 현대적이고 모듈식이며 가벼운 드래그 앤 드롭 라이브러리로, 현대 React 생태계와 높은 호환성을 가지며, 시맨틱 `<table>` 마크업과 잘 작동합니다. 공식 TanStack DnD 예제인 [Column DnD](../../framework/react/examples/column-dnd)와 [Row DnD](../../framework/react/examples/row-dnd)는 이제 DnD Kit을 사용합니다.

3. [`"react-beautiful-dnd"`](https://github.com/atlassian/react-beautiful-dnd)와 같은 다른 DnD 라이브러리를 고려하세요. 그러나 잠재적으로 큰 번들 크기, 유지 관리 상태 및 `<table>` 마크업과의 호환성에 주의하세요.

4. 네이티브 브라우저 이벤트와 상태 관리를 사용하여 가벼운 드래그 앤 드롭 기능을 구현하는 것을 고려하세요. 그러나 이 접근 방식이 모바일 사용자에게 최적이 아닐 수 있으며, 적절한 터치 이벤트를 구현하기 위해 추가적인 노력이 필요할 수 있습니다. [Material React Table V2](https://www.material-react-table.com/docs/examples/column-ordering)는 `onDragStart`, `onDragEnd`, `onDragEnter`와 같은 브라우저 드래그 앤 드롭 이벤트만 사용하여 TanStack Table을 구현한 라이브러리의 예입니다. 소스 코드를 살펴보세요.