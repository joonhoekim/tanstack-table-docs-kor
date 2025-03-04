---
title: 헤더 그룹 가이드
---

## API

[Header Group API](../../api/core/header-group)

## 헤더 그룹 가이드

이 빠른 가이드는 TanStack Table에서 헤더 그룹 객체를 검색하고 상호작용하는 다양한 방법에 대해 설명합니다.

### 헤더 그룹이란 무엇인가요?

헤더 그룹은 단순히 헤더의 "행"입니다. 이름에 혼동하지 마세요, 그것은 매우 간단합니다. 대부분의 테이블은 하나의 헤더 행(단일 헤더 그룹)만 가지지만, [Column Groups 예제](../../framework/react/examples/column-groups)와 같이 중첩된 열 구조로 정의하면 여러 행의 헤더(여러 헤더 그룹)를 가질 수 있습니다.

### 헤더 그룹을 어디서 얻을 수 있나요?

테이블 인스턴스에서 헤더 그룹을 검색하는 데 사용할 수 있는 여러 `table` 인스턴스 API가 있습니다. `table.getHeaderGroups`는 가장 일반적으로 사용되는 API이지만, 사용하는 기능에 따라 `table.get[Left/Center/Right]HeaderGroups`와 같은 다른 API를 사용해야 할 수도 있습니다.

### 헤더 그룹 객체

헤더 그룹 객체는 [Row](../rows) 객체와 유사하지만, 헤더 행에서는 본문 행만큼 많은 일이 일어나지 않기 때문에 더 간단합니다.

기본적으로 헤더 그룹은 세 가지 속성만 가집니다:

- `id`: 깊이(인덱스)에서 생성된 헤더 그룹의 고유 식별자입니다. 이는 React 컴포넌트의 키로 유용합니다.
- `depth`: 0부터 시작하는 헤더 그룹의 깊이입니다. 이는 모든 헤더 행 중에서의 행 인덱스로 생각할 수 있습니다.
- `headers`: 이 헤더 그룹(행)에 속하는 [Header](../headers) 셀 객체의 배열입니다.

### 헤더 셀 접근

헤더 그룹에서 헤더 셀을 렌더링하려면, 헤더 그룹 객체의 `headers` 배열을 매핑하면 됩니다.

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