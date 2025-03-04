---
title: 테이블 API
---

## `createAngularTable` / `useReactTable` / `createSolidTable` / `useQwikTable` / `useVueTable` / `createSvelteTable`

```tsx
type useReactTable = <TData extends AnyData>(
  options: TableOptions<TData>
) => Table<TData>
```

이 함수들은 테이블을 생성하는 데 사용됩니다. 어떤 것을 사용할지는 사용하는 프레임워크 어댑터에 따라 다릅니다.

## 옵션

이것들은 테이블에 대한 **핵심** 옵션 및 API 속성입니다. 다른 [테이블 기능](../../../guide/features)에 대한 더 많은 옵션 및 API 속성이 제공됩니다.

### `data`

```tsx
data: TData[]
```

테이블에 표시할 데이터입니다. 이 배열은 `table.setRowType<...>`에 제공한 유형과 일치해야 하지만, 이론적으로는 아무 것이나 될 수 있습니다. 배열의 각 항목은 일반적으로 키/값 쌍의 객체이지만, 이는 필수 사항은 아닙니다. 열은 문자열/인덱스 또는 기능적 접근자를 통해 이 데이터를 액세스하여 원하는 것을 반환할 수 있습니다.

`data` 옵션이 참조를 변경할 때(`Object.is`를 통해 비교), 테이블은 데이터를 다시 처리합니다. 핵심 데이터 모델에 의존하는 다른 데이터 처리(예: 그룹화, 정렬, 필터링 등)도 다시 처리됩니다.

> 🧠 `data` 옵션이 테이블을 다시 처리하고자 할 때만 변경되도록 하세요. 테이블을 렌더링할 때마다 인라인 `[]`를 제공하거나 데이터 배열을 새 객체로 구성하면 불필요한 재처리가 많이 발생합니다. 이는 작은 테이블에서는 쉽게 눈에 띄지 않을 수 있지만, 큰 테이블에서는 눈에 띌 것입니다.

### `columns`

```tsx
type columns = ColumnDef<TData>[]
```

테이블에 사용할 열 정의의 배열입니다. 열 정의를 만드는 방법에 대한 자세한 내용은 [열 정의 가이드](../../docs/guide/column-defs)를 참조하세요.

### `defaultColumn`

```tsx
defaultColumn?: Partial<ColumnDef<TData>>
```

테이블에 제공된 모든 열 정의에 사용할 기본 열 옵션입니다. 이는 기본 셀/헤더/푸터 렌더러, 정렬/필터링/그룹화 옵션 등을 제공하는 데 유용합니다. `options.columns`에 전달된 모든 열 정의는 이 기본 열 정의와 병합되어 최종 열 정의를 생성합니다.

### `initialState` 옵션

```tsx
initialState?: Partial<
  VisibilityTableState &
  ColumnOrderTableState &
  ColumnPinningTableState &
  FiltersTableState &
  SortingTableState &
  ExpandedTableState &
  GroupingTableState &
  ColumnSizingTableState &
  PaginationTableState &
  RowSelectionTableState
>
```

이 옵션을 사용하여 테이블에 초기 상태를 선택적으로 전달할 수 있습니다. 이 상태는 테이블이 자동으로(예: `options.autoResetPageIndex`) 또는 `table.resetRowSelection()`과 같은 함수를 통해 다양한 테이블 상태를 재설정할 때 사용됩니다. 대부분의 재설정 함수는 초기 상태 대신 빈/기본 상태로 재설정할 수 있는 플래그를 선택적으로 전달할 수 있습니다.

> 🧠 이 객체가 변경될 때 테이블 상태가 재설정되지 않으므로 초기 상태 객체는 안정적일 필요가 없습니다.

### `autoResetAll`

```tsx
autoResetAll?: boolean
```

이 옵션을 설정하여 `autoReset...` 기능 옵션을 재정의합니다.

### `meta`

```tsx
meta?: TableMeta // 이 인터페이스는 선언 병합을 통해 확장 가능합니다. 아래를 참조하세요!
```

`options.meta`에 임의의 객체를 전달하고 `table`이 사용 가능한 모든 곳에서 `table.options.meta`를 통해 액세스할 수 있습니다. 이 유형은 모든 테이블에 대해 전역적이며 다음과 같이 확장할 수 있습니다:

```tsx
declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    foo: string
  }
}
```

> 🧠 이 옵션을 테이블의 임의의 "컨텍스트"로 생각하세요. 테이블이 접하는 모든 것에 전달할 필요 없이 임의의 데이터나 함수를 테이블에 전달하는 좋은 방법입니다. 좋은 예는 날짜, 숫자 등을 포맷하는 데 사용할 로케일 객체를 테이블에 전달하거나 [editable-data 예제](../../../framework/react/examples/editable-data)에서처럼 편집 가능한 데이터를 업데이트하는 데 사용할 수 있는 함수를 전달하는 것입니다.

### `state`

```tsx
state?: Partial<
  VisibilityTableState &
  ColumnOrderTableState &
  ColumnPinningTableState &
  FiltersTableState &
  SortingTableState &
  ExpandedTableState &
  GroupingTableState &
  ColumnSizingTableState &
  PaginationTableState &
  RowSelectionTableState
>
```

`state` 옵션은 테이블 상태의 일부 또는 전체를 선택적으로 _제어_하는 데 사용할 수 있습니다. 여기서 전달한 상태는 내부에서 자동으로 관리되는 상태와 병합되어 테이블의 최종 상태를 생성합니다. `onStateChange` 옵션을 통해 상태 변경을 수신할 수도 있습니다.

### `onStateChange`

```tsx
onStateChange: (updater: Updater<TableState>) => void
```

`onStateChange` 옵션은 테이블 내에서 상태 변경을 선택적으로 수신하는 데 사용할 수 있습니다. 이 옵션을 제공하면 테이블 상태를 직접 제어하고 업데이트해야 합니다. `state` 옵션을 사용하여 상태를 테이블에 다시 제공할 수 있습니다.

### `debugAll`

> ⚠️ 디버깅은 개발 모드에서만 사용할 수 있습니다.

```tsx
debugAll?: boolean
```

이 옵션을 true로 설정하여 모든 디버깅 정보를 콘솔에 출력합니다.

### `debugTable`

> ⚠️ 디버깅은 개발 모드에서만 사용할 수 있습니다.

```tsx
debugTable?: boolean
```

이 옵션을 true로 설정하여 테이블 디버깅 정보를 콘솔에 출력합니다.

### `debugHeaders`

> ⚠️ 디버깅은 개발 모드에서만 사용할 수 있습니다.

```tsx
debugHeaders?: boolean
```

이 옵션을 true로 설정하여 헤더 디버깅 정보를 콘솔에 출력합니다.

### `debugColumns`

> ⚠️ 디버깅은 개발 모드에서만 사용할 수 있습니다.

```tsx
debugColumns?: boolean
```

이 옵션을 true로 설정하여 열 디버깅 정보를 콘솔에 출력합니다.

### `debugRows`

> ⚠️ 디버깅은 개발 모드에서만 사용할 수 있습니다.

```tsx
debugRows?: boolean
```

이 옵션을 true로 설정하여 행 디버깅 정보를 콘솔에 출력합니다.

### `_features`

```tsx
_features?: TableFeature[]
```

테이블 인스턴스에 추가할 수 있는 추가 기능의 배열입니다.

### `render`

> ⚠️ 이 옵션은 테이블 어댑터를 구현하는 경우에만 필요합니다.

```tsx
type render = <TProps>(template: Renderable<TProps>, props: TProps) => any
```

`render` 옵션은 테이블에 대한 렌더러 구현을 제공합니다. 이 구현은 테이블의 다양한 열 헤더 및 셀 템플릿을 사용자의 프레임워크에서 지원하는 결과로 변환하는 데 사용됩니다.

### `mergeOptions`

> ⚠️ 이 옵션은 테이블 어댑터를 구현하는 경우에만 필요합니다.

```tsx
type mergeOptions = <T>(defaultOptions: T, options: Partial<T>) => T
```

이 옵션은 테이블 옵션 병합을 선택적으로 구현하는 데 사용됩니다. solid-js와 같은 일부 프레임워크는 반응성과 사용을 추적하기 위해 프록시를 사용하므로 반응형 객체를 병합하는 작업은 신중하게 처리해야 합니다. 이 옵션은 이 프로세스의 제어를 어댑터에 넘깁니다.

### `getCoreRowModel` 옵션

```tsx
getCoreRowModel: (table: Table<TData>) => () => RowModel<TData>
```

이 필수 옵션은 테이블에 대한 핵심 행 모델을 계산하고 반환하는 함수를 생성하는 팩토리입니다. 테이블당 **한 번** 호출되며 테이블에 대한 행 모델을 계산하고 반환하는 **새로운 함수**를 반환해야 합니다.

기본 구현은 모든 테이블 어댑터의 `{ getCoreRowModel }` 내보내기를 통해 제공됩니다.

### `getSubRows`

```tsx
getSubRows?: (
  originalRow: TData,
  index: number
) => undefined | TData[]
```

이 선택적 함수는 주어진 행에 대한 하위 행에 액세스하는 데 사용됩니다. 중첩된 행을 사용하는 경우 이 함수를 사용하여 행에서 하위 행 객체(또는 undefined)를 반환해야 합니다.

### `getRowId`

```tsx
getRowId?: (
  originalRow: TData,
  index: number,
  parent?: Row<TData>
) => string
```

이 선택적 함수는 주어진 행에 대한 고유 ID를 도출하는 데 사용됩니다. 제공되지 않으면 행의 인덱스가 사용됩니다(중첩된 행은 조부모의 인덱스를 사용하여 `.`로 결합됨, 예: `index.index.index`). 서버 측 작업에서 유래한 개별 행을 식별해야 하는 경우, 네트워크 IO/모호성과 상관없이 의미 있는 ID를 반환하는 이 함수를 사용하는 것이 좋습니다. 예: userId, taskId, 데이터베이스 ID 필드 등.

## 테이블 API

이 속성과 메서드는 테이블 객체에서 사용할 수 있습니다:

### `initialState`

```tsx
initialState: VisibilityTableState &
  ColumnOrderTableState &
  ColumnPinningTableState &
  FiltersTableState &
  SortingTableState &
  ExpandedTableState &
  GroupingTableState &
  ColumnSizingTableState &
  PaginationTableState &
  RowSelectionTableState
```

테이블의 초기 상태가 해결된 것입니다.

### `reset`

```tsx
reset: () => void
```

이 함수를 호출하여 테이블 상태를 초기 상태로 재설정합니다.

### `getState`

```tsx
getState: () => TableState
```

이 함수를 호출하여 테이블의 현재 상태를 가져옵니다. 테이블 상태를 수동으로 관리할 때 이 함수와 그 상태를 사용하는 것이 좋습니다. 이는 테이블이 제공하는 모든 기능과 기능에 대해 내부적으로 사용되는 정확히 동일한 상태입니다.

> 🧠 이 함수가 반환하는 상태는 자동으로 관리되는 내부 테이블 상태와 `options.state`를 통해 전달된 수동으로 관리되는 상태의 얕은 병합 결과입니다.

### `setState`

```tsx
setState: (updater: Updater<TableState>) => void
```

이 함수를 호출하여 테이블 상태를 업데이트합니다. 상태를 업데이트하기 위해 `(prevState) => newState` 형식의 업데이트 함수를 전달하는 것이 좋지만, 직접 객체를 전달할 수도 있습니다.

> 🧠 `options.onStateChange`가 제공된 경우, 이 함수는 새 상태와 함께 트리거됩니다.

### `options`

```tsx
options: TableOptions<TData>
```

테이블의 현재 옵션에 대한 읽기 전용 참조입니다.

> ⚠️ 이 속성은 일반적으로 내부적으로 또는 어댑터에 의해 사용됩니다. 테이블에 새 옵션을 전달하여 업데이트할 수 있습니다. 이는 어댑터마다 다릅니다. 어댑터 자체의 경우, 테이블 옵션은 `setOptions` 함수를 통해 업데이트해야 합니다.

### `setOptions`

```tsx
setOptions: (newOptions: Updater<TableOptions<TData>>) => void
```

> ⚠️ 이 함수는 일반적으로 어댑터에 의해 테이블 옵션을 업데이트하는 데 사용됩니다. 테이블 옵션을 직접 업데이트하는 데 사용할 수 있지만, 어댑터의 테이블 옵션 업데이트 전략을 우회하는 것은 일반적으로 권장되지 않습니다.

### `getCoreRowModel`

```tsx
getCoreRowModel: () => {
  rows: Row<TData>[],
  flatRows: Row<TData>[],
  rowsById: Record<string, Row<TData>>,
}
```

어떠한 처리가 적용되기 전의 핵심 행 모델을 반환합니다.

### `getRowModel`

```tsx
getRowModel: () => {
  rows: Row<TData>[],
  flatRows: Row<TData>[],
  rowsById: Record<string, Row<TData>>,
}
```

사용된 다른 기능의 모든 처리가 적용된 후 최종 모델을 반환합니다.

### `getAllColumns`

```tsx
type getAllColumns = () => Column<TData>[]
```

테이블의 모든 열을 정규화되고 중첩된 계층 구조로 반환합니다. 테이블에 전달된 열 정의에서 미러링됩니다.

### `getAllFlatColumns`

```tsx
type getAllFlatColumns = () => Column<TData>[]
```

테이블의 모든 열을 단일 수준으로 평면화하여 반환합니다. 이는 계층 구조 전반에 걸쳐 상위 열 객체를 포함합니다.

### `getAllLeafColumns`

```tsx
type getAllLeafColumns = () => Column<TData>[]
```

테이블의 모든 리프 노드 열을 단일 수준으로 평면화하여 반환합니다. 이는 상위 열을 포함하지 않습니다.

### `getColumn`

```tsx
type getColumn = (id: string) => Column<TData> | undefined
```

ID로 단일 열을 반환합니다.

### `getHeaderGroups`

```tsx
type getHeaderGroups = () => HeaderGroup<TData>[]
```

테이블의 헤더 그룹을 반환합니다.

### `getFooterGroups`

```tsx
type getFooterGroups = () => HeaderGroup<TData>[]
```

테이블의 푸터 그룹을 반환합니다.

### `getFlatHeaders`

```tsx
type getFlatHeaders = () => Header<TData>[]
```

테이블의 헤더 객체를 평면 배열로 반환합니다. 상위 헤더를 포함합니다.

### `getLeafHeaders`

```tsx
type getLeafHeaders = () => Header<TData>[]
```

테이블의 리프 노드 헤더 객체를 평면 배열로 반환합니다.
