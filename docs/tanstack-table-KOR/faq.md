---
title: FAQ
---

## 무한 렌더링 루프를 어떻게 멈출 수 있나요?

React를 사용하는 경우, 무한 렌더링을 유발할 수 있는 매우 일반적인 함정이 있습니다. `columns`, `data`, 또는 `state`에 안정적인 참조를 제공하지 않으면, React는 테이블 상태가 변경될 때마다 무한 루프의 재렌더링에 들어갑니다.

왜 이런 일이 발생하나요? TanStack Table의 버그인가요? **아니요**, 그렇지 않습니다. *이것은 근본적으로 React가 작동하는 방식입니다*, 그리고 `columns`, `data`, 및 `state`를 적절히 관리하면 이러한 일이 발생하지 않도록 할 수 있습니다.

TanStack Table은 전달된 `data` 또는 `columns`가 변경되거나 테이블의 상태가 변경될 때마다 재렌더링을 트리거하도록 설계되었습니다.

> `columns` 또는 `data`에 안정적인 참조를 제공하지 않으면 무한 루프의 재렌더링을 유발할 수 있습니다.

### 함정 1: 매 렌더링마다 새로운 columns 또는 data 생성

```js
export default function MyComponent() {
  //😵 나쁨: `columns`가 매 렌더링마다 새로운 배열로 재정의되므로 무한 루프의 재렌더링을 유발합니다!
  const columns = [
    // ...
  ];

  //😵 나쁨: `data`가 매 렌더링마다 새로운 배열로 재정의되므로 무한 루프의 재렌더링을 유발합니다!
  const data = [
    // ...
  ];

  //❌ `useReactTable`과 같은 범위에서 안정적인 참조 없이 정의된 columns와 data는 무한 루프를 유발합니다!
  const table = useReactTable({
    columns,
    data,
  });

  return <table>...</table>;
}
```

### 해결책 1: useMemo 또는 useState로 안정적인 참조 제공

React에서는 `useMemo` 또는 `useState`를 사용하거나 3rd party 상태 관리 라이브러리(예: Redux 또는 React Query 😉)를 사용하여 변수에 "안정적인" 참조를 제공할 수 있습니다.

```js
//✅ 괜찮음: 컴포넌트 외부에 columns 정의
const columns = [
  // ...
];

//✅ 괜찮음: 컴포넌트 외부에 data 정의
const data = [
  // ...
];

// 일반적으로 columns와 data를 컴포넌트 내부에 정의하는 것이 더 실용적이므로, `useMemo` 또는 `useState`를 사용하여 안정적인 참조를 제공합니다.
export default function MyComponent() {
  //✅ 좋음: `columns`가 안정적인 참조이므로 무한 루프의 재렌더링을 유발하지 않습니다.
  const columns = useMemo(() => [
    // ...
  ], []);

  //✅ 좋음: `data`가 안정적인 참조이므로 무한 루프의 재렌더링을 유발하지 않습니다.
  const [data, setData] = useState(() => [
    // ...
  ]);

  // 안정적인 참조로 정의된 columns와 data는 무한 루프를 유발하지 않습니다!
  const table = useReactTable({
    columns,
    data,
  });

  return <table>...</table>;
}
```

### 함정 2: columns 또는 data를 제자리에서 변형

초기 `columns`와 `data`에 안정적인 참조를 제공하더라도, 제자리에서 변형하면 여전히 무한 루프에 빠질 수 있습니다. 이는 처음에는 알아차리지 못할 수 있는 일반적인 함정입니다. 간단한 인라인 `data.filter()`도 주의하지 않으면 무한 루프를 유발할 수 있습니다.

```js
export default function MyComponent() {
  //✅ 좋음
  const columns = useMemo(() => [
    // ...
  ], []);

  //✅ 좋음 (React Query는 자동으로 안정적인 참조를 제공합니다)
  const { data, isLoading } = useQuery({
    //...
  });

  const table = useReactTable({
    columns,
    //❌ 나쁨: `data`가 제자리에서 변형되므로 무한 루프의 재렌더링을 유발합니다 (안정적인 참조 파괴)
    data: data?.filter(d => d.isActive) ?? [],
  });

  return <table>...</table>;
}
```

### 해결책 2: 데이터 변환을 메모이제이션

무한 루프를 방지하려면 항상 데이터 변환을 메모이제이션해야 합니다. 이는 `useMemo` 또는 유사한 방법으로 수행할 수 있습니다.

```js
export default function MyComponent() {
  //✅ 좋음
  const columns = useMemo(() => [
    // ...
  ], []);

  //✅ 좋음
  const { data, isLoading } = useQuery({
    //...
  });

  //✅ 좋음: `filteredData`가 메모이제이션되므로 무한 루프의 재렌더링을 유발하지 않습니다.
  const filteredData = useMemo(() => data?.filter(d => d.isActive) ?? [], [data]);

  const table = useReactTable({
    columns,
    data: filteredData, // 안정적인 참조!
  });

  return <table>...</table>;
}
```

### React Forget

React Forget이 출시되면 이러한 문제는 과거의 일이 될 수 있습니다. 아니면 그냥 Solid.js를 사용하세요... 🤓

## 데이터가 변경될 때 테이블 상태가 자동으로 재설정되는 것을 어떻게 멈출 수 있나요?

대부분의 플러그인은 데이터 소스가 변경될 때 _보통_ 재설정되어야 하는 상태를 사용하지만, 데이터를 외부에서 필터링하거나 데이터를 보면서 불변적으로 편집하거나, 데이터를 외부에서 처리하여 테이블 상태가 자동으로 재설정되지 않도록 해야 할 때가 있습니다.

이러한 상황에서는 각 플러그인이 데이터 또는 상태의 일부에 대한 다른 종속성이 변경될 때 내부적으로 상태가 자동으로 재설정되지 않도록 하는 방법을 제공합니다. 이들 중 하나를 `false`로 설정하면 자동 재설정이 트리거되지 않도록 할 수 있습니다.

다음은 `data` 소스를 편집하는 동안 기본적으로 모든 상태가 변경되지 않도록 하는 React 기반의 예제입니다:

```js
const [data, setData] = React.useState([])
const skipPageResetRef = React.useRef()

const updateData = newData => {
  // 이 함수로 데이터가 업데이트될 때, 모든 자동 재설정을 비활성화하는 플래그를 설정합니다.
  skipPageResetRef.current = true

  setData(newData)
}

React.useEffect(() => {
  // 테이블이 업데이트된 후에는 항상 플래그를 제거합니다.
  skipPageResetRef.current = false
})

useReactTable({
  ...
  autoResetPageIndex: !skipPageResetRef.current,
  autoResetExpanded: !skipPageResetRef.current,
})
```

이제 데이터를 업데이트할 때, 위의 테이블 상태는 자동으로 재설정되지 않습니다!
