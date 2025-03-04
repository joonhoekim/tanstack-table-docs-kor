---
title: 데이터 가이드
---

## 데이터 가이드

테이블은 데이터로 시작합니다. 열 정의와 행은 데이터의 형태에 따라 달라집니다. TanStack Table은 TypeScript 기능을 통해 테이블 코드를 타입 안전하게 작성할 수 있도록 도와줍니다. 데이터를 올바르게 설정하고 타입을 지정하면, TanStack Table은 데이터의 형태를 추론하고 열 정의가 올바르게 작성되도록 강제할 수 있습니다.

### TypeScript

TanStack Table 패키지를 사용하는 데 TypeScript가 필수는 아닙니다... ***하지만*** TanStack Table은 TypeScript 경험을 주요 판매 포인트 중 하나로 느끼게 할 만큼 잘 작성되고 구성되어 있습니다. TypeScript를 사용하지 않으면 자동 완성과 타입 검사 기능을 놓치게 되어 개발 속도가 느려지고 코드의 버그가 증가할 수 있습니다.

#### TypeScript Generics

TypeScript Generics가 무엇인지 기본적으로 이해하면 이 가이드를 더 잘 이해할 수 있지만, 진행하면서 쉽게 익힐 수 있습니다. 공식 [TypeScript Generics 문서](https://www.typescriptlang.org/docs/handbook/2/generics.html)가 도움이 될 수 있습니다.

### 데이터 타입 정의

`data`는 테이블의 행으로 변환될 객체 배열입니다. 배열의 각 객체는 데이터의 행을 나타냅니다(일반적인 경우). TypeScript를 사용하는 경우, 데이터의 형태에 대한 타입을 정의합니다. 이 타입은 다른 테이블, 열, 행, 셀 인스턴스에 대한 제네릭 타입으로 사용됩니다. 이 제네릭은 TanStack Table 타입과 API 전반에서 `TData`로 참조됩니다.

예를 들어, 사용자의 목록을 배열로 표시하는 테이블이 있다면:

```json
[
  {
    "firstName": "Tanner",
    "lastName": "Linsley",
    "age": 33,
    "visits": 100,
    "progress": 50,
    "status": "Married"
  },
  {
    "firstName": "Kevin",
    "lastName": "Vandy",
    "age": 27,
    "visits": 200,
    "progress": 100,
    "status": "Single"
  }
]
```

다음과 같이 User (TData) 타입을 정의할 수 있습니다:

```ts
//TData
type User = {
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: string
}
```

이 타입으로 `data` 배열을 정의하면, TanStack Table은 나중에 열, 행, 셀 등에서 많은 타입을 지능적으로 추론할 수 있습니다. 이는 `data` 타입이 `TData` 제네릭 타입으로 정의되기 때문입니다. 테이블 옵션에 `data`를 전달하면 나머지 테이블 인스턴스에 대한 `TData` 타입이 됩니다. 나중에 열 정의를 할 때 `data` 타입과 동일한 `TData` 타입을 사용해야 합니다.

```ts
//참고: 데이터는 "안정적인" 참조가 필요하여 무한 재렌더링을 방지합니다.
const data: User[] = []
//또는
const [data, setData] = React.useState<User[]>([])
//또는
const data = ref<User[]>([]) //vue
//등등...
```

#### 깊이 있는 키 데이터

데이터가 평평한 객체 배열이 아니라면 괜찮습니다! 열을 정의할 때 접근자를 통해 깊이 있는 데이터에 접근하는 전략이 있습니다.

데이터가 다음과 같다면:

```json
[
  {
    "name": {
      "first": "Tanner",
      "last": "Linsley"
    },
    "info": {
      "age": 33,
      "visits": 100,
    }
  },
  {
    "name": {
      "first": "Kevin",
      "last": "Vandy"
    },
    "info": {
      "age": 27,
      "visits": 200,
    }
  }
]
```

다음과 같이 타입을 정의할 수 있습니다:

```ts
type User = {
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

그리고 열 정의에서 accessorKey의 점 표기법을 사용하거나 accessorFn을 사용하여 데이터를 접근할 수 있습니다.

```ts
const columns = [
  {
    header: 'First Name',
    accessorKey: 'name.first',
  },
  {
    header: 'Last Name',
    accessorKey: 'name.last',
  },
  {
    header: 'Age',
    accessorFn: row => row.info.age, 
  },
  //...
]
```

이는 [Column Def Guide](../column-defs)에서 더 자세히 논의됩니다.

> 참고: JSON 데이터의 "키"는 보통 무엇이든 될 수 있지만, 키에 있는 모든 점은 깊이 있는 키로 해석되어 오류를 일으킬 수 있습니다.

#### 중첩된 하위 행 데이터

확장 기능을 사용하는 경우, 데이터에 중첩된 하위 행이 있는 것이 일반적입니다. 이는 약간 다른 재귀 타입을 결과로 가져옵니다.

데이터가 다음과 같다면:

```json
[
  {
    "firstName": "Tanner",
    "lastName": "Linsley",
    "subRows": [
      {
        "firstName": "Kevin",
        "lastName": "Vandy",
      },
      {
        "firstName": "John",
        "lastName": "Doe",
        "subRows": [
          //...
        ]
      }
    ]
  },
  {
    "firstName": "Jane",
    "lastName": "Doe",
  }
]
```

다음과 같이 타입을 정의할 수 있습니다:

```ts
type User = {
  firstName: string
  lastName: string
  subRows?: User[] // "subRows"라고 불릴 필요는 없으며, 무엇이든 될 수 있습니다.
}
```

여기서 `subRows`는 `User` 객체의 선택적 배열입니다. 이는 [Expanding Guide](../expanding)에서 더 자세히 논의됩니다.

### 데이터에 "안정적인" 참조 제공

테이블 인스턴스에 전달하는 `data` 배열은 무한 재렌더링을 방지하기 위해 "안정적인" 참조를 가져야 합니다(특히 React에서).

사용하는 프레임워크 어댑터에 따라 다르지만, React에서는 `React.useState`, `React.useMemo` 또는 유사한 것을 사용하여 `data`와 `columns` 테이블 옵션이 안정적인 참조를 가지도록 해야 합니다.

```tsx
const fallbackData = []

export default function MyComponent() {
  //✅ 좋음: `columns`가 안정적인 참조이기 때문에 무한 루프의 재렌더링을 일으키지 않습니다.
  const columns = useMemo(() => [
    // ...
  ], []);

  //✅ 좋음: `data`가 안정적인 참조이기 때문에 무한 루프의 재렌더링을 일으키지 않습니다.
  const [data, setData] = useState(() => [
    // ...
  ]);

  // 열과 데이터가 안정적인 참조로 정의되어 있어 무한 루프를 일으키지 않습니다!
  const table = useReactTable({
    columns,
    data ?? fallbackData, // 안정적인 참조로 컴포넌트 외부에 정의된 폴백 배열을 사용하는 것도 좋습니다.
  });

  return <table>...</table>;
}
```

`React.useState`와 `React.useMemo`는 데이터에 안정적인 참조를 제공하는 유일한 방법이 아닙니다. 컴포넌트 외부에 데이터를 정의하거나 Redux, Zustand, TanStack Query와 같은 3rd party 상태 관리 라이브러리를 사용할 수도 있습니다.

피해야 할 주요 사항은 `useReactTable` 호출과 동일한 범위 내에서 `data` 배열을 정의하는 것입니다. 이는 `data` 배열이 매 렌더링마다 재정의되어 무한 루프의 재렌더링을 일으킬 것입니다.

```tsx
export default function MyComponent() {
  //😵 나쁨: `columns`가 매 렌더링마다 새로운 배열로 재정의되기 때문에 무한 루프의 재렌더링을 일으킬 것입니다!
  const columns = [
    // ...
  ];

  //😵 나쁨: `data`가 매 렌더링마다 새로운 배열로 재정의되기 때문에 무한 루프의 재렌더링을 일으킬 것입니다!
  const data = [
    // ...
  ];

  //❌ 열과 데이터가 안정적인 참조 없이 `useReactTable`과 동일한 범위 내에 정의되어 있어 무한 루프를 일으킬 것입니다!
  const table = useReactTable({
    columns,
    data ?? [], //❌ 매 렌더링마다 재생성되는 폴백 배열도 나쁩니다.
  });

  return <table>...</table>;
}
```

### TanStack Table이 데이터를 변환하는 방법

이 문서의 다른 부분에서는 TanStack Table이 테이블에 전달된 `data`를 처리하고 테이블을 생성하는 데 사용되는 행과 셀 객체를 생성하는 방법을 볼 수 있습니다. 테이블에 전달된 `data`는 TanStack Table에 의해 변형되지 않지만, 열 정의의 접근자나 [row models](../row-models)에서 수행되는 그룹화 또는 집계와 같은 다른 기능에 의해 행과 셀의 실제 값이 변형될 수 있습니다.

### TanStack Table이 처리할 수 있는 데이터 양

믿기 어렵겠지만, TanStack Table은 실제로 클라이언트에서 수십만 개의 행 데이터를 처리할 수 있도록 확장할 수 있도록 설계되었습니다. 이는 각 열의 데이터 크기와 열 수에 따라 항상 가능한 것은 아니지만, 정렬, 필터링, 페이지네이션, 그룹화 기능은 대규모 데이터셋을 위한 성능을 염두에 두고 구축되었습니다.

데이터 그리드를 구축하는 개발자의 기본 사고방식은 대규모 데이터셋에 대해 서버 측 페이지네이션, 정렬, 필터링을 구현하는 것입니다. 이는 여전히 일반적으로 좋은 생각이지만, 많은 개발자는 실제로 클라이언트에서 현대 브라우저와 적절한 최적화를 통해 처리할 수 있는 데이터 양을 과소평가합니다. 테이블에 몇 천 개 이상의 행이 없을 경우, TanStack Table의 클라이언트 측 기능을 활용하여 서버에서 직접 구현하는 대신 사용할 수 있습니다. 물론, 실제 데이터로 테스트하여 성능이 충분한지 확인해야 합니다.

이는 [Pagination Guide](../pagination#should-you-use-client-side-pagination)에서 더 자세히 논의됩니다.
