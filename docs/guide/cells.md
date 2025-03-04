---
title: 셀 가이드
---

## API

[셀 API](../../api/core/cell)

## 셀 가이드

이 빠른 가이드는 TanStack Table에서 `cell` 객체를 검색하고 상호작용하는 다양한 방법을 설명합니다.

### 셀을 어디서 가져올 수 있나요

셀은 [Rows](../rows)에서 나옵니다. 충분히 설명되었죠?

사용 중인 기능에 따라 행에서 적절한 셀을 검색하기 위해 사용할 수 있는 여러 `row` 인스턴스 API가 있습니다. 가장 일반적으로는 `row.getAllCells` 또는 `row.getVisibleCells` API를 사용하게 되지만, 사용할 수 있는 유사한 API가 여러 개 있습니다.

### 셀 객체

모든 셀 객체는 UI의 `<td>` 또는 유사한 셀 요소와 연결될 수 있습니다. 테이블 상태와 상호작용하고 테이블에서 셀 값을 추출하기 위해 사용할 수 있는 몇 가지 속성과 메서드가 `cell` 객체에 있습니다.

#### 셀 ID

모든 셀 객체는 테이블 인스턴스 내에서 고유하게 만드는 `id` 속성을 가지고 있습니다. 각 `cell.id`는 부모 행과 열 ID가 밑줄로 구분된 단순한 결합으로 구성됩니다.

```js
{ id: `${row.id}_${column.id}` }
```

그룹화 또는 집계 기능 중에는 `cell.id`에 추가 문자열이 추가됩니다.

#### 셀 부모 객체

모든 셀은 부모 [row](../rows) 및 [column](../columns) 객체에 대한 참조를 저장합니다.

#### 셀 값 접근

셀에서 데이터 값을 접근하는 권장 방법은 `cell.getValue` 또는 `cell.renderValue` API를 사용하는 것입니다. 이 API 중 하나를 사용하면 접근자 함수의 결과가 캐시되어 렌더링이 효율적으로 유지됩니다. 두 API의 유일한 차이점은 `cell.renderValue`가 값이 정의되지 않은 경우 값 또는 `renderFallbackValue`를 반환하는 반면, `cell.getValue`는 값이 정의되지 않은 경우 값 또는 `undefined`를 반환한다는 것입니다.

> 참고: `cell.getValue` 및 `cell.renderValue` API는 각각 `row.getValue` 및 `row.renderValue` API의 단축키입니다.

```js
// 모든 열에서 데이터 접근
const firstName = cell.getValue('firstName') // firstName 열에서 셀 값을 읽습니다.
const renderedLastName = cell.renderValue('lastName') // lastName 열에서 값을 렌더링합니다.
```

#### 다른 셀에서 행 데이터 접근

모든 셀 객체는 부모 행과 연결되어 있으므로 테이블에서 사용 중인 원래 행의 데이터를 `cell.row.original`을 사용하여 접근할 수 있습니다.

```js
// 다른 셀의 범위에 있더라도 원래 행 데이터를 여전히 접근할 수 있습니다.
const firstName = cell.row.original.firstName // { firstName: 'John', lastName: 'Doe' }
```

### 더 많은 셀 API

테이블에 사용하는 기능에 따라 셀과 상호작용하기 위한 수십 개의 유용한 API가 있습니다. 각 기능의 관련 API 문서 또는 가이드를 참조하세요.

### 셀 렌더링

`cell.renderValue` 또는 `cell.getValue` API를 사용하여 테이블의 셀을 렌더링할 수 있습니다. 그러나 이러한 API는 접근자 함수에서 원시 셀 값만 출력합니다. `cell: () => JSX` 열 정의 옵션을 사용하는 경우 어댑터에서 `flexRender` API 유틸리티를 사용하고 싶을 것입니다.

`flexRender` API를 사용하면 셀이 추가 마크업이나 JSX와 함께 올바르게 렌더링되며 콜백 함수가 올바른 매개변수로 호출됩니다.

```jsx
import { flexRender } from '@tanstack/react-table'

const columns = [
  {
    accessorKey: 'fullName',
    cell: ({ cell, row }) => {
      return <div><strong>{row.original.firstName}</strong> {row.original.lastName}</div>
    }
    //...
  }
]
//...
<tr>
  {row.getVisibleCells().map(cell => {
    return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
  })}
</tr>