---
title: 그룹화 가이드
---

## 예제

구현을 바로 보고 싶으신가요? 다음 예제를 확인해보세요:

- [grouping](../../framework/react/examples/grouping)

## API

[Grouping API](../../api/features/grouping)

## 그룹화 가이드

테이블의 열을 재정렬할 수 있는 3가지 기능이 있으며, 다음 순서로 발생합니다:

1. [Column Pinning](../column-pinning) - 고정 시, 열은 왼쪽, 중앙(고정되지 않음), 오른쪽 고정 열로 나뉩니다.
2. 수동 [Column Ordering](../column-ordering) - 수동으로 지정된 열 순서가 적용됩니다.
3. **Grouping** - 그룹화가 활성화되고, 그룹화 상태가 활성화되며 `tableOptions.groupedColumnMode`가 `'reorder' | 'remove'`로 설정된 경우, 그룹화된 열은 열 흐름의 시작으로 재정렬됩니다.

TanStack 테이블의 그룹화는 열에 적용되는 기능으로, 특정 열을 기준으로 테이블 행을 분류하고 조직할 수 있습니다. 이는 많은 양의 데이터를 가지고 있고 특정 기준에 따라 그룹화하고 싶을 때 유용합니다.

그룹화 기능을 사용하려면 그룹화된 행 모델을 사용해야 합니다. 이 모델은 그룹화 상태에 따라 행을 그룹화하는 역할을 합니다.

```tsx
import { getGroupedRowModel } from '@tanstack/react-table'

const table = useReactTable({
  // 다른 옵션...
  getGroupedRowModel: getGroupedRowModel(),
})
```

그룹화 상태가 활성화되면, 테이블은 일치하는 행을 그룹화된 행의 하위 행으로 추가합니다. 그룹화된 행은 첫 번째 일치하는 행과 동일한 인덱스에 테이블 행으로 추가됩니다. 일치하는 행은 테이블 행에서 제거됩니다.
사용자가 그룹화된 행을 확장하고 축소할 수 있도록 하려면 확장 기능을 사용할 수 있습니다.

```tsx
import { getGroupedRowModel, getExpandedRowModel} from '@tanstack/react-table'

const table = useReactTable({
  // 다른 옵션...
  getGroupedRowModel: getGroupedRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
})
```

### 그룹화 상태

그룹화 상태는 문자열 배열로, 각 문자열은 그룹화할 열의 ID입니다. 배열의 문자열 순서는 그룹화 순서를 결정합니다. 예를 들어, 그룹화 상태가 ['column1', 'column2']인 경우, 테이블은 먼저 column1으로 그룹화하고, 각 그룹 내에서 column2로 그룹화합니다. setGrouping 함수를 사용하여 그룹화 상태를 제어할 수 있습니다:

```tsx
table.setGrouping(['column1', 'column2']);
```

초기 상태로 그룹화 상태를 재설정하려면 resetGrouping 함수를 사용할 수 있습니다:

```tsx
table.resetGrouping();
```

기본적으로 열이 그룹화되면 테이블의 시작으로 이동됩니다. 이 동작은 groupedColumnMode 옵션을 사용하여 제어할 수 있습니다. 'reorder'로 설정하면 그룹화된 열이 테이블의 시작으로 이동됩니다. 'remove'로 설정하면 그룹화된 열이 테이블에서 제거됩니다. false로 설정하면 그룹화된 열이 이동되거나 제거되지 않습니다.

```tsx
const table = useReactTable({
  // 다른 옵션...
  groupedColumnMode: 'reorder',
})
```

### 집계

행이 그룹화되면 aggregationFn 옵션을 사용하여 열별로 그룹화된 행의 데이터를 집계할 수 있습니다. 이는 집계 함수의 ID인 문자열입니다. aggregationFns 옵션을 사용하여 집계 함수를 정의할 수 있습니다.

```tsx
const column = columnHelper.accessor('key', {
  aggregationFn: 'sum',
})
```

위의 예제에서 sum 집계 함수는 그룹화된 행의 데이터를 집계하는 데 사용됩니다.
기본적으로 숫자 열은 sum 집계 함수를 사용하고, 비숫자 열은 count 집계 함수를 사용합니다. 이 동작은 열 정의에서 aggregationFn 옵션을 지정하여 재정의할 수 있습니다.

사용할 수 있는 여러 내장 집계 함수가 있습니다:

- sum - 그룹화된 행의 값을 합산합니다.
- count - 그룹화된 행의 행 수를 셉니다.
- min - 그룹화된 행의 최소값을 찾습니다.
- max - 그룹화된 행의 최대값을 찾습니다.
- extent - 그룹화된 행의 값의 범위(최소값과 최대값)를 찾습니다.
- mean - 그룹화된 행의 평균을 찾습니다.
- median - 그룹화된 행의 중간값을 찾습니다.
- unique - 그룹화된 행의 고유한 값 배열을 반환합니다.
- uniqueCount - 그룹화된 행의 고유한 값 수를 셉니다.

#### 사용자 정의 집계

행이 그룹화되면 aggregationFns 옵션을 사용하여 그룹화된 행의 데이터를 집계할 수 있습니다. 이는 집계 함수의 ID가 키이고, 집계 함수 자체가 값인 레코드입니다. 그런 다음 열의 aggregationFn 옵션에서 이러한 집계 함수를 참조할 수 있습니다.

```tsx
const table = useReactTable({
  // 다른 옵션...
  aggregationFns: {
    myCustomAggregation: (columnId, leafRows, childRows) => {
      // 집계된 값을 반환합니다
    },
  },
})
```

위의 예제에서 myCustomAggregation은 열 ID, 리프 행, 자식 행을 받아 집계된 값을 반환하는 사용자 정의 집계 함수입니다. 그런 다음 이 집계 함수를 열의 aggregationFn 옵션에서 사용할 수 있습니다:

```tsx
const column = columnHelper.accessor('key', {
  aggregationFn: 'myCustomAggregation',
})
```

### 수동 그룹화

서버 측 그룹화 및 집계를 수행하는 경우, manualGrouping 옵션을 사용하여 수동 그룹화를 활성화할 수 있습니다. 이 옵션이 true로 설정되면, 테이블은 getGroupedRowModel()을 사용하여 행을 자동으로 그룹화하지 않으며, 대신 행을 테이블에 전달하기 전에 수동으로 그룹화할 것으로 예상합니다.

```tsx
const table = useReactTable({
  // 다른 옵션...
  manualGrouping: true,
})
```

> **참고:** TanStack Table로 서버 측 그룹화를 쉽게 수행할 수 있는 방법은 현재 많이 알려져 있지 않습니다. 이를 위해 많은 사용자 정의 셀 렌더링이 필요합니다.

### 그룹화 변경 핸들러

그룹화 상태를 직접 관리하고 싶다면, onGroupingChange 옵션을 사용할 수 있습니다. 이 옵션은 그룹화 상태가 변경될 때 호출되는 함수입니다. 관리된 상태를 tableOptions.state.grouping 옵션을 통해 테이블에 다시 전달할 수 있습니다.

```tsx
const [grouping, setGrouping] = useState<string[]>([])

const table = useReactTable({
  // 다른 옵션...
  state: {
    grouping: grouping,
  },
  onGroupingChange: setGrouping
})
```
