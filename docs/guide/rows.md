---
title: 행 가이드
---

## API

[행 API](../../api/core/row)

## 행 가이드

이 빠른 가이드는 TanStack Table에서 행 객체를 검색하고 상호작용하는 다양한 방법을 설명합니다.

### 행을 어디서 가져올 수 있나요

테이블 인스턴스에서 행을 검색하기 위해 사용할 수 있는 여러 `table` 인스턴스 API가 있습니다.

#### table.getRow

`id`로 특정 행에 접근해야 하는 경우, `table.getRow` 테이블 인스턴스 API를 사용할 수 있습니다.

```js
const row = table.getRow(rowId)
```

#### 행 모델

`table` 인스턴스는 `row` 객체를 생성하고 이를 "행 모델"이라고 불리는 유용한 배열에 저장합니다. 이는 [행 모델 가이드](../row-models)에서 훨씬 더 자세히 설명되지만, 행 모델에 접근할 수 있는 가장 일반적인 방법은 다음과 같습니다.

##### 행 렌더링

```jsx
<tbody>
  {table.getRowModel().rows.map(row => (
    <tr key={row.id}>
     {/* ... */}
    </tr>
  ))}
</tbody>
```

##### 선택된 행 가져오기

```js
const selectedRows = table.getSelectedRowModel().rows
```

### 행 객체

모든 행 객체는 행 데이터를 포함하고 테이블 상태와 상호작용하거나 테이블 상태에 따라 행에서 셀을 추출하기 위한 많은 API를 포함합니다.

#### 행 ID

모든 행 객체는 테이블 인스턴스 내에서 고유하게 만드는 `id` 속성을 가지고 있습니다. 기본적으로 `row.id`는 행 모델에서 생성된 `row.index`와 동일합니다. 그러나 각 행의 `id`를 행의 데이터에서 고유 식별자로 재정의하는 것이 유용할 수 있습니다. 이를 위해 `getRowId` 테이블 옵션을 사용할 수 있습니다.

```js
const table = useReactTable({
  columns,
  data,
  getRowId: originalRow => originalRow.uuid, //원래 행의 데이터에서 uuid로 row.id를 재정의
})
```

> 참고: 그룹화 및 확장과 같은 일부 기능에서는 `row.id`에 추가 문자열이 추가됩니다.

#### 행 값 접근

행에서 데이터 값을 접근하는 권장 방법은 `row.getValue` 또는 `row.renderValue` API를 사용하는 것입니다. 이 API 중 하나를 사용하면 접근자 함수의 결과가 캐시되어 렌더링이 효율적으로 유지됩니다. 두 API의 유일한 차이점은 `row.renderValue`가 값이 정의되지 않은 경우 값 또는 `renderFallbackValue`를 반환하는 반면, `row.getValue`는 값이 정의되지 않은 경우 값 또는 `undefined`를 반환한다는 것입니다.

```js
// 모든 열에서 데이터 접근
const firstName = row.getValue('firstName') // firstName 열에서 행 값을 읽습니다.
const renderedLastName = row.renderValue('lastName') // lastName 열에서 값을 렌더링합니다.
```

> 참고: `cell.getValue` 및 `cell.renderValue`는 각각 `row.getValue` 및 `row.renderValue` API의 단축키입니다.

#### 원래 행 데이터 접근

모든 행 객체에 대해, 테이블 인스턴스에 전달된 원래의 해당 `data`에 `row.original` 속성을 통해 접근할 수 있습니다. 열 정의의 접근자에서 데이터 변환을 수행한 경우, `row.original` 객체에는 이러한 변환이 반영되지 않습니다.

```js
// 원래 행의 모든 데이터 접근
const firstName = row.original.firstName // { firstName: 'John', lastName: 'Doe' }
```

### 하위 행

그룹화 또는 확장 기능을 사용하는 경우, 행에 하위 행이나 부모 행 참조가 포함될 수 있습니다. 이는 [확장 가이드](../expanding)에서 훨씬 더 자세히 설명되지만, 하위 행을 다루기 위한 유용한 속성과 메서드에 대한 간단한 개요는 다음과 같습니다.

- `row.subRows`: 행의 하위 행 배열.
- `row.depth`: 루트 행 배열에 대한 행의 깊이 (중첩되거나 그룹화된 경우). 루트 레벨 행은 0, 자식 행은 1, 손자 행은 2 등.
- `row.parentId`: 행의 부모 행의 고유 ID (이 행을 하위 행 배열에 포함하는 행).
- `row.getParentRow`: 행의 부모 행을 반환합니다, 존재하는 경우.

### 더 많은 행 API

테이블에 사용하는 기능에 따라 행과 상호작용하기 위한 수십 개의 유용한 API가 있습니다. 각 기능의 관련 API 문서 또는 가이드를 참조하세요.