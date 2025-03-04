---
title: 열 정의 가이드
---

## API

[열 정의](../../api/core/column-def)

## 열 정의 가이드

> 참고: 이 가이드는 테이블에 대한 열 정의 설정에 관한 것이며, 테이블 인스턴스 내에서 생성된 실제 [`column`](../columns) 객체에 관한 것이 아닙니다.

열 정의는 테이블을 구축하는 데 있어 가장 중요한 부분입니다. 이들은 다음을 담당합니다:

- 정렬, 필터링, 그룹화 등을 포함한 모든 것에 사용될 기본 데이터 모델 구축
- 테이블에 표시될 데이터 모델 형식화
- [헤더 그룹](../../../api/core/header-group), [헤더](../../../api/core/header) 및 [푸터](../../../api/core/column-def#footer) 생성
- 표시 전용 목적으로 열 생성, 예: 작업 버튼, 체크박스, 확장기, 스파크라인 등

## 열 정의 유형

다음 "유형"의 열 정의는 실제로 TypeScript 유형이 아니라, 열 정의의 전체 범주를 설명하고 설명하는 방법입니다:

- `액세서 열`
  - 액세서 열은 기본 데이터 모델을 가지고 있어 정렬, 필터링, 그룹화 등이 가능합니다.
- `디스플레이 열`
  - 디스플레이 열은 데이터 모델이 없으므로 정렬, 필터링 등이 불가능하지만, 테이블에 임의의 콘텐츠를 표시하는 데 사용할 수 있습니다. 예: 행 작업 버튼, 체크박스, 확장기 등.
- `그룹화 열`
  - 그룹 열은 데이터 모델이 없으므로 정렬, 필터링 등이 불가능하며, 다른 열을 함께 그룹화하는 데 사용됩니다. 열 그룹에 대한 헤더나 푸터를 정의하는 것이 일반적입니다.

## 열 도우미

열 정의는 결국 단순한 객체이지만, 테이블 코어에서 노출된 `createColumnHelper` 함수는 행 유형과 함께 호출될 때 가능한 가장 높은 유형 안전성을 가진 다양한 열 정의 유형을 생성하는 유틸리티를 반환합니다.

다음은 열 도우미를 생성하고 사용하는 예입니다:

```tsx
// 행 모양 정의
type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const columnHelper = createColumnHelper<Person>()

// 몇 가지 열 만들기!
const defaultColumns = [
  // 디스플레이 열
  columnHelper.display({
    id: 'actions',
    cell: props => <RowActions row={props.row} />,
  }),
  // 그룹화 열
  columnHelper.group({
    header: 'Name',
    footer: props => props.column.id,
    columns: [
      // 액세서 열
      columnHelper.accessor('firstName', {
        cell: info => info.getValue(),
        footer: props => props.column.id,
      }),
      // 액세서 열
      columnHelper.accessor(row => row.lastName, {
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: props => props.column.id,
      }),
    ],
  }),
  // 그룹화 열
  columnHelper.group({
    header: 'Info',
    footer: props => props.column.id,
    columns: [
      // 액세서 열
      columnHelper.accessor('age', {
        header: () => 'Age',
        footer: props => props.column.id,
      }),
      // 그룹화 열
      columnHelper.group({
        header: 'More Info',
        columns: [
          // 액세서 열
          columnHelper.accessor('visits', {
            header: () => <span>Visits</span>,
            footer: props => props.column.id,
          }),
          // 액세서 열
          columnHelper.accessor('status', {
            header: 'Status',
            footer: props => props.column.id,
          }),
          // 액세서 열
          columnHelper.accessor('progress', {
            header: 'Profile Progress',
            footer: props => props.column.id,
          }),
        ],
      }),
    ],
  }),
]
```

## 액세서 열 생성

데이터 열은 `data` 배열의 각 항목에 대해 기본 값을 추출하도록 구성되어야 한다는 점에서 독특합니다.

이를 수행하는 방법은 3가지가 있습니다:

- 항목이 `objects`인 경우, 추출하려는 값에 해당하는 객체 키를 사용하세요.
- 항목이 중첩된 `arrays`인 경우, 추출하려는 값에 해당하는 배열 인덱스를 사용하세요.
- 추출하려는 값을 반환하는 액세서 함수를 사용하세요.

## 객체 키

각 항목이 다음과 같은 모양의 객체인 경우:

```tsx
type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}
```

`firstName` 값을 다음과 같이 추출할 수 있습니다:

```tsx

columnHelper.accessor('firstName')

// 또는

{
  accessorKey: 'firstName',
}
```

## 깊은 키

각 항목이 다음과 같은 모양의 객체인 경우:

```tsx
type Person = {
  name: {
    first: string
    last: string
  }
  info: {
    age: number
    visits: number
  }
}
```

`first` 값을 다음과 같이 추출할 수 있습니다:

```tsx
columnHelper.accessor('name.first', {
  id: 'firstName',
})

// 또는

{
  accessorKey: 'name.first',
  id: 'firstName',
}
```

## 배열 인덱스

각 항목이 다음과 같은 모양의 배열인 경우:

```tsx
type Sales = [Date, number]
```

`number` 값을 다음과 같이 추출할 수 있습니다:

```tsx
columnHelper.accessor(1)

// 또는

{
  accessorKey: 1,
}
```

## 액세서 함수

각 항목이 다음과 같은 모양의 객체인 경우:

```tsx
type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}
```

계산된 전체 이름 값을 다음과 같이 추출할 수 있습니다:

```tsx
columnHelper.accessor(row => `${row.firstName} ${row.lastName}`, {
  id: 'fullName',
})

// 또는

{
  id: 'fullName',
  accessorFn: row => `${row.firstName} ${row.lastName}`,
}
```

> 🧠 기억하세요, 액세스된 값은 정렬, 필터링 등에 사용되므로, 액세서 함수가 의미 있는 방식으로 조작할 수 있는 기본 값을 반환해야 합니다. 객체나 배열과 같은 비기본 값을 반환하는 경우, 이를 조작하기 위한 적절한 필터/정렬/그룹화 함수가 필요하거나, 심지어 직접 제공해야 할 수도 있습니다! 😬

## 고유한 열 ID

열은 3가지 전략으로 고유하게 식별됩니다:

- 객체 키 또는 배열 인덱스로 액세서 열을 정의하는 경우, 동일한 것이 열을 고유하게 식별하는 데 사용됩니다.
  - 객체 키의 모든 점(`.`)은 밑줄(`_`)로 대체됩니다.
- 액세서 함수로 액세서 열을 정의하는 경우
  - 열의 `id` 속성이 열을 고유하게 식별하는 데 사용되거나
  - 기본 `string` 헤더가 제공된 경우, 해당 헤더 문자열이 열을 고유하게 식별하는 데 사용됩니다.

> 🧠 기억하기 쉬운 방법: 액세서 함수로 열을 정의하는 경우, 문자열 헤더를 제공하거나 고유한 `id` 속성을 제공하세요.

## 열 형식화 및 렌더링

기본적으로 열 셀은 데이터 모델 값을 문자열로 표시합니다. 사용자 정의 렌더링 구현을 제공하여 이 동작을 재정의할 수 있습니다. 각 구현은 셀, 헤더 또는 푸터에 대한 관련 정보를 제공받고, 프레임워크 어댑터가 렌더링할 수 있는 JSX/컴포넌트/문자열 등을 반환합니다. 이는 사용하는 어댑터에 따라 다릅니다.

사용할 수 있는 몇 가지 포맷터가 있습니다:

- `cell`: 셀 형식을 지정하는 데 사용됩니다.
- `aggregatedCell`: 집계된 셀의 형식을 지정하는 데 사용됩니다.
- `header`: 헤더 형식을 지정하는 데 사용됩니다.
- `footer`: 푸터 형식을 지정하는 데 사용됩니다.

## 셀 형식 지정

`cell` 속성에 함수를 전달하고 `props.getValue()` 함수를 사용하여 셀 값에 접근함으로써 사용자 정의 셀 포맷터를 제공할 수 있습니다:

```tsx
columnHelper.accessor('firstName', {
  cell: props => <span>{props.getValue().toUpperCase()}</span>,
})
```

셀 포맷터에는 `row`와 `table` 객체도 제공되므로 셀 값 이상으로 셀 형식을 사용자 정의할 수 있습니다. 아래 예시는 액세서로 `firstName`을 제공하지만, 원본 행 객체에 있는 사용자 ID도 접두사로 표시합니다:

```tsx
columnHelper.accessor('firstName', {
  cell: props => (
    <span>{`${props.row.original.id} - ${props.getValue()}`}</span>
  ),
})
```

## 집계된 셀 형식 지정

집계된 셀에 대한 자세한 내용은 [그룹화](../grouping)를 참조하세요.

## 헤더 및 푸터 형식 지정

헤더와 푸터는 행 데이터에 접근할 수 없지만, 사용자 정의 콘텐츠를 표시하기 위해 동일한 개념을 사용합니다.
