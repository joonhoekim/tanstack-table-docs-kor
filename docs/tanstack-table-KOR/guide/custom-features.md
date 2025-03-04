---
title: Custom Features Guide
---

## 예제

구현으로 바로 가고 싶으신가요? 다음 예제를 확인하세요:

- [custom-features](../../framework/react/examples/custom-features)

## Custom Features Guide

이 가이드에서는 TanStack Table을 사용자 정의 기능으로 확장하는 방법을 다루고, TanStack Table v8 코드베이스가 어떻게 구성되고 작동하는지에 대해 더 알아보겠습니다.

### TanStack Table은 경량을 지향합니다

TanStack Table은 정렬, 필터링, 페이지네이션 등과 같은 핵심 기능을 라이브러리에 내장하고 있습니다. 우리는 더 많은 기능을 라이브러리에 추가하라는 요청을 많이 받았으며, 때로는 잘 생각된 PR도 받았습니다. 우리는 항상 라이브러리를 개선할 준비가 되어 있지만, TanStack Table이 대부분의 사용 사례에서 사용되지 않을 가능성이 있는 너무 많은 코드와 부피를 포함하지 않는 경량 라이브러리로 남아 있기를 원합니다. 모든 PR이 핵심 라이브러리에 포함될 수는 없으며, 포함되어서는 안 됩니다. TanStack Table이 사용 사례의 90%를 해결하지만, 조금 더 많은 제어가 필요한 개발자에게는 이것이 좌절감을 줄 수 있습니다.

TanStack Table은 항상 매우 확장 가능하도록 설계되었습니다(적어도 v7 이후로). 사용 중인 프레임워크 어댑터(`useReactTable`, `useVueTable` 등)에서 반환되는 `table` 인스턴스는 추가 속성이나 API를 추가할 수 있는 일반 JavaScript 객체입니다. 항상 구성을 사용하여 테이블 인스턴스에 사용자 정의 로직, 상태 및 API를 추가할 수 있었습니다. [Material React Table](https://github.com/KevinVandy/material-react-table/blob/v2/packages/material-react-table/src/hooks/useMRT_TableInstance.ts)과 같은 라이브러리는 단순히 `useReactTable` 훅 주위에 사용자 정의 래퍼 훅을 만들어 테이블 인스턴스를 사용자 정의 기능으로 확장했습니다.

그러나 버전 8.14.0부터 TanStack Table은 새로운 `_features` 테이블 옵션을 노출하여 내장된 테이블 기능이 이미 통합된 것과 동일한 방식으로 사용자 정의 코드를 테이블 인스턴스에 더 깔끔하게 통합할 수 있게 되었습니다.

> TanStack Table v8.14.0은 테이블 인스턴스에 사용자 정의 기능을 추가할 수 있는 새로운 `_features` 옵션을 도입했습니다.

이 새로운 더 긴밀한 통합을 통해 테이블에 더 복잡한 사용자 정의 기능을 쉽게 추가할 수 있으며, 이를 패키지화하여 커뮤니티와 공유할 수도 있습니다. 시간이 지남에 따라 이것이 어떻게 발전할지 지켜볼 것입니다. 향후 v9 릴리스에서는 모든 기능을 선택적으로 포함하여 TanStack Table의 번들 크기를 줄일 수도 있지만, 이는 아직 탐색 중입니다.

### TanStack Table 기능이 작동하는 방식

TanStack Table의 소스 코드는 아마도 다소 간단합니다(적어도 우리는 그렇게 생각합니다). 각 기능의 모든 코드는 자체 객체/파일로 분리되어 있으며, 초기 상태를 생성하고, 기본 테이블 및 열 옵션을 생성하고, `table`, `header`, `column`, `row`, `cell` 인스턴스에 추가할 수 있는 API 메서드를 생성하는 인스턴스화 메서드를 포함합니다.

기능 객체의 모든 기능은 TanStack Table에서 내보내는 `TableFeature` 타입으로 설명할 수 있습니다. 이 타입은 기능을 생성하는 데 필요한 기능 객체의 모양을 설명하는 TypeScript 인터페이스입니다.

```ts
export interface TableFeature<TData extends RowData = any> {
  createCell?: (
    cell: Cell<TData, unknown>,
    column: Column<TData>,
    row: Row<TData>,
    table: Table<TData>
  ) => void
  createColumn?: (column: Column<TData, unknown>, table: Table<TData>) => void
  createHeader?: (header: Header<TData, unknown>, table: Table<TData>) => void
  createRow?: (row: Row<TData>, table: Table<TData>) => void
  createTable?: (table: Table<TData>) => void
  getDefaultColumnDef?: () => Partial<ColumnDef<TData, unknown>>
  getDefaultOptions?: (
    table: Table<TData>
  ) => Partial<TableOptionsResolved<TData>>
  getInitialState?: (initialState?: InitialTableState) => Partial<TableState>
}
```

이것은 약간 혼란스러울 수 있으므로 각 메서드가 무엇을 하는지 살펴보겠습니다:

#### 기본 옵션 및 초기 상태

<br />

##### getDefaultOptions

테이블 기능의 `getDefaultOptions` 메서드는 해당 기능의 기본 테이블 옵션을 설정하는 역할을 합니다. 예를 들어, [Column Sizing](https://github.com/TanStack/table/blob/main/packages/table-core/src/features/ColumnSizing.ts) 기능에서는 `getDefaultOptions` 메서드가 기본값으로 `"onEnd"` 값을 가진 `columnResizeMode` 옵션을 설정합니다.

<br />

##### getDefaultColumnDef

테이블 기능의 `getDefaultColumnDef` 메서드는 해당 기능의 기본 열 옵션을 설정하는 역할을 합니다. 예를 들어, [Sorting](https://github.com/TanStack/table/blob/main/packages/table-core/src/features/RowSorting.ts) 기능에서는 `getDefaultColumnDef` 메서드가 기본값으로 `1` 값을 가진 `sortUndefined` 열 옵션을 설정합니다.

<br />

##### getInitialState

테이블 기능의 `getInitialState` 메서드는 해당 기능의 기본 상태를 설정하는 역할을 합니다. 예를 들어, [Pagination](https://github.com/TanStack/table/blob/main/packages/table-core/src/features/RowPagination.ts) 기능에서는 `getInitialState` 메서드가 기본값으로 `10` 값을 가진 `pageSize` 상태와 기본값으로 `0` 값을 가진 `pageIndex` 상태를 설정합니다.

#### API 생성자

<br />

##### createTable

테이블 기능의 `createTable` 메서드는 `table` 인스턴스에 메서드를 추가하는 역할을 합니다. 예를 들어, [Row Selection](https://github.com/TanStack/table/blob/main/packages/table-core/src/features/RowSelection.ts) 기능에서는 `createTable` 메서드가 `toggleAllRowsSelected`, `getIsAllRowsSelected`, `getIsSomeRowsSelected` 등의 테이블 인스턴스 API 메서드를 추가합니다. 따라서 `table.toggleAllRowsSelected()`를 호출하면 `RowSelection` 기능에 의해 테이블 인스턴스에 추가된 메서드를 호출하는 것입니다.

<br />

##### createHeader

테이블 기능의 `createHeader` 메서드는 `header` 인스턴스에 메서드를 추가하는 역할을 합니다. 예를 들어, [Column Sizing](https://github.com/TanStack/table/blob/main/packages/table-core/src/features/ColumnSizing.ts) 기능에서는 `createHeader` 메서드가 `getStart` 등의 헤더 인스턴스 API 메서드를 추가합니다. 따라서 `header.getStart()`를 호출하면 `ColumnSizing` 기능에 의해 헤더 인스턴스에 추가된 메서드를 호출하는 것입니다.

<br />

##### createColumn

테이블 기능의 `createColumn` 메서드는 `column` 인스턴스에 메서드를 추가하는 역할을 합니다. 예를 들어, [Sorting](https://github.com/TanStack/table/blob/main/packages/table-core/src/features/RowSorting.ts) 기능에서는 `createColumn` 메서드가 `getNextSortingOrder`, `toggleSorting` 등의 열 인스턴스 API 메서드를 추가합니다. 따라서 `column.toggleSorting()`을 호출하면 `RowSorting` 기능에 의해 열 인스턴스에 추가된 메서드를 호출하는 것입니다.

<br />

##### createRow

테이블 기능의 `createRow` 메서드는 `row` 인스턴스에 메서드를 추가하는 역할을 합니다. 예를 들어, [Row Selection](https://github.com/TanStack/table/blob/main/packages/table-core/src/features/RowSelection.ts) 기능에서는 `createRow` 메서드가 `toggleSelected`, `getIsSelected` 등의 행 인스턴스 API 메서드를 추가합니다. 따라서 `row.toggleSelected()`를 호출하면 `RowSelection` 기능에 의해 행 인스턴스에 추가된 메서드를 호출하는 것입니다.

<br />

##### createCell

테이블 기능의 `createCell` 메서드는 `cell` 인스턴스에 메서드를 추가하는 역할을 합니다. 예를 들어, [Column Grouping](https://github.com/TanStack/table/blob/main/packages/table-core/src/features/ColumnGrouping.ts) 기능에서는 `createCell` 메서드가 `getIsGrouped`, `getIsAggregated` 등의 셀 인스턴스 API 메서드를 추가합니다. 따라서 `cell.getIsGrouped()`를 호출하면 `ColumnGrouping` 기능에 의해 셀 인스턴스에 추가된 메서드를 호출하는 것입니다.

### 사용자 정의 기능 추가하기

가상의 사용 사례를 위해 사용자 정의 테이블 기능을 만드는 과정을 살펴보겠습니다. 테이블 인스턴스에 테이블의 "밀도"(셀의 패딩)를 변경할 수 있는 기능을 추가하고 싶다고 가정해 보겠습니다.

전체 구현을 보려면 [custom-features](../../framework/react/examples/custom-features) 예제를 확인하세요. 하지만 여기서는 사용자 정의 기능을 만드는 단계에 대한 심층적인 설명을 제공합니다.

#### 1단계: TypeScript 타입 설정

내장된 TanStack Table 기능과 동일한 전체 타입 안전성을 원한다고 가정하고, 새로운 기능을 위한 모든 TypeScript 타입을 설정해 보겠습니다. 새로운 테이블 옵션, 상태 및 테이블 인스턴스 API 메서드에 대한 타입을 생성하겠습니다.

이러한 타입은 TanStack Table 내부에서 사용되는 명명 규칙을 따르지만, 원하는 대로 이름을 지정할 수 있습니다. 아직 TanStack Table에 이러한 타입을 추가하지 않았지만, 다음 단계에서 추가할 것입니다.

```ts
// 새로운 기능의 사용자 정의 상태에 대한 타입 정의
export type DensityState = 'sm' | 'md' | 'lg'
export interface DensityTableState {
  density: DensityState
}

// 새로운 기능의 테이블 옵션에 대한 타입 정의
export interface DensityOptions {
  enableDensity?: boolean
  onDensityChange?: OnChangeFn<DensityState>
}

// 새로운 기능의 테이블 API에 대한 타입 정의
export interface DensityInstance {
  setDensity: (updater: Updater<DensityState>) => void
  toggleDensity: (value?: DensityState) => void
}
```

#### 2단계: 선언 병합을 사용하여 TanStack Table에 새로운 타입 추가

TypeScript에 TanStack Table에서 내보내는 타입을 수정하여 새로운 기능의 타입을 포함하도록 지시할 수 있습니다. 이를 "선언 병합"이라고 하며 TypeScript의 강력한 기능입니다. 이렇게 하면 새로운 기능의 코드나 애플리케이션 코드에서 `as unknown as CustomTable` 또는 `// @ts-ignore`와 같은 TypeScript 해킹을 사용할 필요가 없습니다.

```ts
// 선언 병합을 사용하여 새로운 기능의 API 및 상태 타입을 TanStack Table의 기존 타입에 추가합니다.
declare module '@tanstack/react-table' { // 또는 사용 중인 프레임워크 어댑터
  // 새로운 기능의 상태를 기존 테이블 상태와 병합
  interface TableState extends DensityTableState {}
  // 새로운 기능의 옵션을 기존 테이블 옵션과 병합
  interface TableOptionsResolved<TData extends RowData>
    extends DensityOptions {}
  // 새로운 기능의 인스턴스 API를 기존 테이블 인스턴스 API와 병합
  interface Table<TData extends RowData> extends DensityInstance {}
  // 셀 인스턴스 API를 추가해야 하는 경우...
  // interface Cell<TData extends RowData, TValue> extends DensityCell
  // 행 인스턴스 API를 추가해야 하는 경우...
  // interface Row<TData extends RowData> extends DensityRow
  // 열 인스턴스 API를 추가해야 하는 경우...
  // interface Column<TData extends RowData, TValue> extends DensityColumn
  // 헤더 인스턴스 API를 추가해야 하는 경우...
  // interface Header<TData extends RowData, TValue> extends DensityHeader

  // 참고: `ColumnDef`에 대한 선언 병합은 복잡한 타입이기 때문에 불가능합니다.
  // 하지만 `ColumnDef.meta`에 대한 선언 병합은 여전히 가능합니다.
}
```

이 작업을 올바르게 수행하면 새로운 기능의 코드를 생성하고 애플리케이션에서 사용할 때 TypeScript 오류가 발생하지 않아야 합니다.

##### 선언 병합 사용의 주의사항

선언 병합을 사용할 때의 주의사항 중 하나는 코드베이스의 모든 테이블에 대해 TanStack Table 타입에 영향을 미친다는 것입니다. 애플리케이션의 모든 테이블에 동일한 기능 세트를 로드할 계획이라면 문제가 되지 않지만, 일부 테이블은 추가 기능을 로드하고 일부는 로드하지 않는 경우 문제가 될 수 있습니다. 또는 TanStack Table 타입을 확장하여 새로운 기능을 추가한 사용자 정의 타입을 많이 만들 수도 있습니다. 이는 [Material React Table](https://github.com/KevinVandy/material-react-table/blob/v2/packages/material-react-table/src/types.ts)에서 사용하는 방법으로, 기본 TanStack Table 테이블의 타입에 영향을 미치지 않도록 하기 위한 것입니다. 하지만 이는 다소 번거롭고, 특정 지점에서 많은 타입 캐스팅이 필요합니다.

#### 3단계: 기능 객체 생성

모든 TypeScript 설정이 완료되면 이제 새로운 기능을 위한 기능 객체를 생성할 수 있습니다. 여기서 테이블 인스턴스에 추가할 메서드를 정의합니다.

`TableFeature` 타입을 사용하여 기능 객체를 올바르게 생성하고 있는지 확인하세요. TypeScript 타입이 올바르게 설정되어 있으면 새로운 상태, 옵션 및 인스턴스 API로 기능 객체를 생성할 때 TypeScript 오류가 발생하지 않아야 합니다.

```ts
export const DensityFeature: TableFeature<any> = { // TableFeature 타입을 사용하세요!!
  // 새로운 기능의 초기 상태 정의
  getInitialState: (state): DensityTableState => {
    return {
      density: 'md',
      ...state,
    }
  },

  // 새로운 기능의 기본 옵션 정의
  getDefaultOptions: <TData extends RowData>(
    table: Table<TData>
  ): DensityOptions => {
    return {
      enableDensity: true,
      onDensityChange: makeStateUpdater('density', table),
    } as DensityOptions
  },
  // 기본 열 정의를 추가해야 하는 경우...
  // getDefaultColumnDef: <TData extends RowData>(): Partial<ColumnDef<TData>> => {
  //   return { meta: {} } // 타입스크립트 문제를 피하기 위해 columnDef에 직접 추가하는 대신 meta를 사용하세요
  // },

  // 새로운 기능의 테이블 인스턴스 메서드 정의
  createTable: <TData extends RowData>(table: Table<TData>): void => {
    table.setDensity = updater => {
      const safeUpdater: Updater<DensityState> = old => {
        let newState = functionalUpdate(updater, old)
        return newState
      }
      return table.options.onDensityChange?.(safeUpdater)
    }
    table.toggleDensity = value => {
      table.setDensity(old => {
        if (value) return value
        return old === 'lg' ? 'md' : old === 'md' ? 'sm' : 'lg' // 3가지 옵션을 순환
      })
    }
  },

  // 행 인스턴스 API를 추가해야 하는 경우...
  // createRow: <TData extends RowData>(row, table): void => {},
  // 셀 인스턴스 API를 추가해야 하는 경우...
  // createCell: <TData extends RowData>(cell, column, row, table): void => {},
  // 열 인스턴스 API를 추가해야 하는 경우...
  // createColumn: <TData extends RowData>(column, table): void => {},
  // 헤더 인스턴스 API를 추가해야 하는 경우...
  // createHeader: <TData extends RowData>(header, table): void => {},
}
```

#### 4단계: 테이블에 기능 추가

이제 기능 객체가 준비되었으므로 테이블 인스턴스를 생성할 때 `_features` 옵션에 전달하여 테이블 인스턴스에 추가할 수 있습니다.

```ts
const table = useReactTable({
  _features: [DensityFeature], // 새로운 기능을 전달하여 내장된 모든 기능과 함께 병합
  columns,
  data,
  //..
})
```

#### 5단계: 애플리케이션에서 기능 사용

이제 기능이 테이블 인스턴스에 추가되었으므로 애플리케이션에서 새로운 인스턴스 API 옵션 및 상태를 사용할 수 있습니다.

```tsx
const table = useReactTable({
  _features: [DensityFeature], // 테이블에 사용자 정의 기능을 전달하여 생성 시 인스턴스화
  columns,
  data,
  //...
  state: {
    density, // 테이블에 밀도 상태 전달, TS는 여전히 만족 :)
  },
  onDensityChange: setDensity, // 새로운 onDensityChange 옵션 사용, TS는 여전히 만족 :)
})
//...
const { density } = table.getState()
return(
  <td
    key={cell.id}
    style={{
      // 새로운 기능을 코드에서 사용
      padding:
        density === 'sm'
          ? '4px'
          : density === 'md'
            ? '8px'
            : '16px',
      transition: 'padding 0.2s',
    }}
  >
    {flexRender(
      cell.column.columnDef.cell,
      cell.getContext()
    )}
  </td>
)
```

#### 꼭 이렇게 해야 하나요?

이것은 TanStack Table의 내장 기능과 함께 사용자 정의 코드를 통합하는 새로운 방법일 뿐입니다. 위의 예에서는 `density` 상태를 `React.useState`에 저장하고, 어디에서나 `toggleDensity` 핸들러를 정의하고, 테이블 인스턴스와 별도로 코드에서 사용하는 것이 더 쉬웠을 수도 있습니다. TanStack Table과 함께 테이블 기능을 구축하는 대신 테이블 인스턴스에 깊이 통합하지 않고 사용자 정의 기능을 구축하는 것은 여전히 유효한 방법입니다. 사용 사례에 따라 TanStack Table을 사용자 정의 기능으로 확장하는 가장 깔끔한 방법이 아닐 수도 있습니다.
