---
title: 헤더 가이드
---

## API

[Header API](../../api/core/header)

## 헤더 가이드

이 빠른 가이드는 TanStack Table에서 `header` 객체를 검색하고 상호작용하는 다양한 방법에 대해 설명합니다.

헤더는 `<tbody>` 섹션 대신 `<thead>` 섹션을 위한 셀과 동등합니다.

### 헤더를 어디서 얻을 수 있나요?

헤더는 [Header Groups](../header-groups)에서 오며, 이는 `<tbody>` 섹션 대신 `<thead>` 섹션을 위한 행과 동등합니다.

#### HeaderGroup Headers

헤더 그룹에 있는 경우, 헤더는 `headerGroup.headers` 속성에 배열로 저장됩니다. 일반적으로 이 배열을 매핑하여 헤더를 렌더링합니다.

```jsx
<thead>
  {table.getHeaderGroups().map(headerGroup => {
    return (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map(header => ( // headerGroup headers 배열을 매핑
          <th key={header.id} colSpan={header.colSpan}>
            {/* */}
          </th>
        ))}
      </tr>
    )
  })}
</thead>
```

#### Header Table Instance APIs

사용하는 기능에 따라 헤더 목록을 검색하는 데 사용할 수 있는 여러 `table` 인스턴스 API가 있습니다. 가장 일반적으로 사용할 수 있는 API는 `table.getFlatHeaders`로, 테이블의 모든 헤더를 평면 목록으로 반환하지만, 열 가시성 및 열 고정 기능과 함께 유용한 최소한의 다른 헤더가 있습니다. 사용 사례에 따라 `table.getLeftLeafHeaders` 또는 `table.getRightFlatHeaders`와 같은 API가 유용할 수 있습니다.

### 헤더 객체

헤더 객체는 [Cell](../cells) 객체와 유사하지만, `<tbody>` 섹션 대신 `<thead>` 섹션을 위한 것입니다. 모든 헤더 객체는 UI에서 `<th>` 또는 유사한 셀 요소와 연결될 수 있습니다. 테이블 상태와 상호작용하고 테이블 상태에 따라 셀 값을 추출하는 데 사용할 수 있는 몇 가지 속성과 메서드가 `header` 객체에 있습니다.

#### 헤더 ID

모든 헤더 객체에는 테이블 인스턴스 내에서 고유하게 만드는 `id` 속성이 있습니다. 일반적으로 이 `id`는 React 키의 고유 식별자로만 필요하거나 [performant column resizing example](../../framework/react/examples/column-resizing-performant)을 따르는 경우에 필요합니다.

고급 중첩 또는 그룹화된 헤더 로직이 없는 간단한 헤더의 경우, `header.id`는 부모 `column.id`와 동일합니다. 그러나 헤더가 그룹 열의 일부이거나 자리 표시자 셀인 경우, 헤더 패밀리, 깊이/헤더 행 인덱스, 열 ID 및 헤더 그룹 ID에서 구성된 더 복잡한 ID를 가집니다.

#### 중첩 그룹화된 헤더 속성

헤더 객체에 중첩되거나 그룹화된 헤더 구조의 일부인 경우에만 유용한 몇 가지 속성이 있습니다. 이러한 속성에는 다음이 포함됩니다:

- `colspan`: 헤더가 차지해야 하는 열의 수입니다. 이는 `<th>` 요소의 `colSpan` 속성을 렌더링하는 데 유용합니다.
- `rowSpan`: 헤더가 차지해야 하는 행의 수입니다. 이는 `<th>` 요소의 `rowSpan` 속성을 렌더링하는 데 유용합니다. (현재 기본 TanStack Table에서는 구현되지 않음)
- `depth`: 헤더 그룹이 속한 "행 인덱스"입니다.
- `isPlaceholder`: 헤더가 자리 표시자 헤더인 경우 true인 부울 플래그입니다. 자리 표시자 헤더는 열이 숨겨지거나 그룹 열의 일부인 경우에 간격을 채우는 데 사용됩니다.
- `placeholderId`: 자리 표시자 헤더의 고유 식별자입니다.
- `subHeaders`: 이 헤더에 속하는 하위/자식 헤더의 배열입니다. 헤더가 리프 헤더인 경우 비어 있습니다.

> 참고: `header.index`는 헤더 그룹(헤더 행) 내에서의 인덱스를 나타내며, 즉 왼쪽에서 오른쪽으로의 위치를 나타냅니다. 이는 헤더 그룹 "행 인덱스"를 나타내는 `header.depth`와 동일하지 않습니다.

#### 헤더 부모 객체

모든 헤더는 부모 [column](../columns) 객체와 부모 [header group](../header-groups) 객체에 대한 참조를 저장합니다.

### 더 많은 헤더 API

헤더에는 테이블 상태와 상호작용하는 데 유용한 몇 가지 추가 API가 있습니다. 대부분은 열 크기 조정 및 크기 조정 기능과 관련이 있습니다. 자세한 내용은 [Column Resizing Guide](../column-resizing)를 참조하세요.

### 헤더 렌더링

정의한 `header` 열 옵션은 문자열, jsx 또는 이들 중 하나를 반환하는 함수일 수 있으므로, 헤더를 렌더링하는 가장 좋은 방법은 어댑터에서 `flexRender` 유틸리티를 사용하는 것입니다. 이는 모든 경우를 처리합니다.

```jsx
{headerGroup.headers.map(header => (
  <th key={header.id} colSpan={header.colSpan}>
    {/* `header`에 대한 모든 가능한 헤더 열 정의 시나리오를 처리 */}
    {flexRender(header.column.columnDef.header, header.getContext())}
  </th>
))}
