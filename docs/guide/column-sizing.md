---
title: 열 크기 조정 가이드
---

## 예제

구현으로 바로 가고 싶으신가요? 다음 예제를 확인하세요:

- [column-sizing](../../framework/react/examples/column-sizing)
- [column-resizing-performant](../../framework/react/examples/column-resizing-performant)

## API

[열 크기 조정 API](../../api/features/column-sizing)

## 열 크기 조정 가이드

열 크기 조정 기능을 사용하면 각 열의 너비를 선택적으로 지정할 수 있으며, 최소 및 최대 너비도 설정할 수 있습니다. 또한, 사용자가 열 헤더를 드래그하여 모든 열의 너비를 동적으로 변경할 수 있습니다.

### 열 너비

기본적으로 열은 다음과 같은 측정 옵션을 제공합니다:

```tsx
export const defaultColumnSizing = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER,
}
```

이 기본값은 `tableOptions.defaultColumn`과 개별 열 정의에 의해 순서대로 재정의될 수 있습니다.

```tsx
const columns = [
  {
    accessorKey: 'col1',
    size: 270, // 이 열의 크기 설정
  },
  //...
]

const table = useReactTable({
  // 기본 열 크기 재정의
  defaultColumn: {
    size: 200, // 시작 열 크기
    minSize: 50, // 열 크기 조정 중 적용
    maxSize: 500, // 열 크기 조정 중 적용
  },
})
```

열 "크기"는 테이블 상태에 숫자로 저장되며, 일반적으로 픽셀 단위 값으로 해석되지만, 이 열 크기 값을 CSS 스타일에 연결하여 원하는 대로 사용할 수 있습니다.

헤드리스 유틸리티로서, 열 크기 조정을 위한 테이블 로직은 실제로 상태의 모음일 뿐이며, 이를 원하는 레이아웃에 적용할 수 있습니다 (위의 예제는 이 로직의 두 가지 스타일을 구현합니다). 이러한 너비 측정을 다양한 방식으로 적용할 수 있습니다:

- 의미론적 `table` 요소 또는 테이블 CSS 모드로 표시되는 모든 요소
- `div/span` 요소 또는 비테이블 CSS 모드로 표시되는 모든 요소
  - 엄격한 너비를 가진 블록 레벨 요소
  - 엄격한 너비를 가진 절대 위치 요소
  - 느슨한 너비를 가진 Flexbox 위치 요소
  - 느슨한 너비를 가진 Grid 위치 요소
- 셀 너비를 테이블 구조에 보간할 수 있는 모든 레이아웃 메커니즘.

이러한 접근 방식 각각은 UI/컴포넌트 라이브러리 또는 디자인 시스템이 보유한 의견에 따라 보통의 트레이드오프와 제한이 있습니다. 다행히도 당신은 아닙니다 😉.

### 열 크기 조정

TanStack Table은 다양한 UX 및 성능 옵션을 사용하여 테이블 UI에서 열 크기 조정을 쉽게 구현할 수 있는 내장된 열 크기 조정 상태 및 API를 제공합니다.

#### 열 크기 조정 활성화

기본적으로 `column.getCanResize()` API는 모든 열에 대해 기본적으로 `true`를 반환하지만, `enableColumnResizing` 테이블 옵션을 사용하여 모든 열에 대해 열 크기 조정을 비활성화하거나, `enableResizing` 열 옵션을 사용하여 열별로 열 크기 조정을 비활성화할 수 있습니다.

```tsx
const columns = [
  {
    accessorKey: 'id',
    enableResizing: false, // 이 열에 대해서만 크기 조정 비활성화
    size: 200, // 시작 열 크기
  },
  //...
]
```

#### 열 크기 조정 모드

기본적으로 열 크기 조정 모드는 `"onEnd"`로 설정됩니다. 이는 사용자가 열 크기 조정을 완료할 때까지 `column.getSize()` API가 새로운 열 크기를 반환하지 않음을 의미합니다. 일반적으로 사용자가 열 크기 조정을 하는 동안 작은 UI 표시기가 표시됩니다.

React TanStack Table 어댑터에서는 테이블이나 웹 페이지의 복잡성에 따라 60 fps 열 크기 조정 렌더링을 달성하기 어려울 수 있으며, `"onEnd"` 열 크기 조정 모드는 사용자가 열 크기를 조정하는 동안 끊김이나 지연을 피하기 위한 좋은 기본 옵션이 될 수 있습니다. TanStack React Table을 사용할 때 60 fps 열 크기 조정 렌더링을 달성할 수 없다는 것은 아니지만, 이를 달성하기 위해 추가적인 메모이제이션이나 다른 성능 최적화를 수행해야 할 수 있습니다.

> 고급 열 크기 조정 성능 팁은 [아래](#advanced-column-resizing-performance)에서 논의될 것입니다.

즉각적인 열 크기 조정 렌더링을 위해 열 크기 조정 모드를 `"onChange"`로 변경하려면 `columnResizeMode` 테이블 옵션을 사용할 수 있습니다.

```tsx
const table = useReactTable({
  //...
  columnResizeMode: 'onChange', // 열 크기 조정 모드를 "onChange"로 변경
})
```

#### 열 크기 조정 방향

기본적으로 TanStack Table은 테이블 마크업이 왼쪽에서 오른쪽 방향으로 배치된다고 가정합니다. 오른쪽에서 왼쪽으로의 레이아웃의 경우, 열 크기 조정 방향을 `"rtl"`로 변경해야 할 수 있습니다.

```tsx
const table = useReactTable({
  //...
  columnResizeDirection: 'rtl', // 특정 로케일에 대해 열 크기 조정 방향을 "rtl"로 변경
})
```

#### UI에 열 크기 조정 API 연결

드래그 상호작용을 UI에 연결하기 위해 사용할 수 있는 몇 가지 매우 유용한 API가 있습니다.

##### 열 크기 API

열 머리글 셀, 데이터 셀 또는 푸터 셀에 열의 크기를 적용하려면 다음 API를 사용할 수 있습니다:

```ts
header.getSize()
column.getSize()
cell.column.getSize()
```

이 크기 스타일을 마크업에 적용하는 방법은 사용자에게 달려 있지만, 열 크기를 적용하기 위해 CSS 변수나 인라인 스타일을 사용하는 것이 일반적입니다.

```tsx
<th
  key={header.id}
  colSpan={header.colSpan}
  style={{ width: `${header.getSize()}px` }}
>
```

그러나 [고급 열 크기 조정 성능 섹션](#advanced-column-resizing-performance)에서 논의된 것처럼, 열 크기를 마크업에 적용하기 위해 CSS 변수를 사용하는 것을 고려할 수 있습니다.

##### 열 크기 조정 API

TanStack Table은 드래그 상호작용을 쉽게 구현할 수 있는 사전 구축된 이벤트 핸들러를 제공합니다. 이 이벤트 핸들러는 열 크기 조정 상태를 업데이트하고 테이블을 다시 렌더링하기 위해 다른 내부 API를 호출하는 편리한 함수일 뿐입니다. `header.getResizeHandler()`를 사용하여 마우스 및 터치 이벤트 모두에 대해 열 크기 조정 드래그 상호작용에 연결할 수 있습니다.

```tsx
<ColumnResizeHandle
  onMouseDown={header.getResizeHandler()} // 데스크탑용
  onTouchStart={header.getResizeHandler()} // 모바일용
/>
```

##### ColumnSizingInfoState를 사용한 열 크기 조정 표시기

TanStack Table은 `columnSizingInfo`라는 상태 객체를 추적하여 열 크기 조정 표시기 UI를 렌더링하는 데 사용할 수 있습니다.

```jsx
<ColumnResizeIndicator
  style={{
    transform: header.column.getIsResizing()
      ? `translateX(${table.getState().columnSizingInfo.deltaOffset}px)`
      : '',
  }}
/>
```

#### 고급 열 크기 조정 성능

큰 또는 복잡한 테이블을 만들고 있는 경우 (그리고 React를 사용하는 경우 😉), 렌더 로직에 적절한 메모이제이션을 추가하지 않으면 사용자가 열 크기 조정 중 성능 저하를 경험할 수 있습니다.

우리는 복잡한 테이블에서 60 fps 열 크기 조정 렌더링을 달성하는 방법을 보여주는 [성능이 좋은 열 크기 조정 예제](../../framework/react/examples/column-resizing-performant)를 만들었습니다. 이 방법이 어떻게 이루어지는지 보려면 해당 예제를 보는 것이 좋지만, 다음은 염두에 두어야 할 기본 사항입니다:

1. 모든 헤더와 모든 데이터 셀에서 `column.getSize()`를 사용하지 마세요. 대신, 모든 열 너비를 한 번에 계산하고, **메모이제이션**하세요!
2. 크기 조정이 진행 중일 때 테이블 본문을 메모이제이션하세요.
3. CSS 변수를 사용하여 테이블 셀에 열 너비를 전달하세요.

이 단계를 따르면 열 크기 조정 중 성능이 크게 향상될 것입니다.

React를 사용하지 않고 Svelte, Vue 또는 Solid 어댑터를 사용하는 경우, 이 문제에 대해 크게 걱정할 필요는 없지만, 유사한 원칙이 적용됩니다.
