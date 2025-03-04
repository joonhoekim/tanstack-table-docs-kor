---
title: 테이블 인스턴스 가이드
---

## API

[테이블 API](../../api/core/table)

## 테이블 인스턴스 가이드

TanStack Table은 헤드리스 UI 라이브러리입니다. `table` 또는 "테이블 인스턴스"에 대해 이야기할 때, 우리는 문자 그대로의 `<table>` 요소를 말하는 것이 아닙니다. 대신, 테이블 상태와 API를 포함하는 핵심 테이블 객체를 말합니다. `table` 인스턴스는 어댑터의 `createTable` 함수 (예: `useReactTable`, `useVueTable`, `createSolidTable`, `createSvelteTable`, `createAngularTable`, `useQwikTable`)를 호출하여 생성됩니다.

`createTable` 함수 (프레임워크 어댑터에서)에서 반환된 `table` 인스턴스는 테이블 상태를 읽고 변경하는 데 상호작용할 주요 객체입니다. TanStack Table에서 모든 일이 일어나는 한 곳입니다. UI를 렌더링할 때, 이 `table` 인스턴스의 API를 사용하게 됩니다.

### 테이블 인스턴스 생성

테이블 인스턴스를 생성하려면 3가지 `options`가 필요합니다: `columns`, `data`, 및 `getCoreRowModel` 구현. 기능과 동작을 구성하기 위한 수십 개의 다른 테이블 옵션이 있지만, 이 3가지는 필수입니다.

#### 데이터 정의

안정적인 참조를 가진 객체 배열로 데이터를 정의하세요. `data`는 API 응답이나 코드에 정적으로 정의된 것과 같이 어디에서나 올 수 있지만, 무한 재렌더링을 방지하기 위해 안정적인 참조를 가져야 합니다. TypeScript를 사용하는 경우, 데이터에 부여한 유형이 `TData` 제네릭으로 사용됩니다. 자세한 내용은 [데이터 가이드](../data)를 참조하세요.

#### 열 정의

열 정의는 이전 섹션의 [열 정의 가이드](../column-defs)에서 자세히 다룹니다. 그러나 열의 유형을 정의할 때, 데이터에 사용한 것과 동일한 `TData` 유형을 사용해야 한다는 점을 여기서 언급합니다.

```ts
const columns: ColumnDef<User>[] = [] //User 유형을 제네릭 TData 유형으로 전달
//또는
const columnHelper = createColumnHelper<User>() //User 유형을 제네릭 TData 유형으로 전달
```

열 정의는 TanStack Table에 각 열이 `accessorKey` 또는 `accessorFn`을 사용하여 행 데이터를 어떻게 접근하고/또는 변환해야 하는지를 알려주는 곳입니다. 자세한 내용은 [열 정의 가이드](../column-defs#creating-accessor-columns)를 참조하세요.

#### 행 모델 전달

이는 [행 모델 가이드](../row-models)에서 훨씬 더 자세히 설명되지만, 지금은 TanStack Table에서 `getCoreRowModel` 함수를 가져와 테이블 옵션으로 전달하세요. 사용하려는 기능에 따라 나중에 추가 행 모델을 전달해야 할 수도 있습니다.

```ts
import { getCoreRowModel } from '@tanstack/[framework]-table'

const table = createTable({ columns, data, getCoreRowModel: getCoreRowModel() })
```

#### 테이블 인스턴스 초기화

`columns`, `data`, 및 `getCoreRowModel`이 정의되면, 이제 전달하려는 다른 테이블 옵션과 함께 기본 테이블 인스턴스를 생성할 수 있습니다.

```ts
//바닐라 js
const table = createTable({ columns, data, getCoreRowModel: getCoreRowModel() })

//angular
this.table = createAngularTable({ columns: this.columns, data: this.data(), getCoreRowModel: getCoreRowModel() })

//lit
const table = this.tableController.table({ columns, data, getCoreRowModel: getCoreRowModel() })

//qwik
const table = useQwikTable({ columns, data, getCoreRowModel: getCoreRowModel() })

//react
const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel() })

//solid
const table = createSolidTable({ columns, get data() { return data() }, getCoreRowModel: getCoreRowModel() })

//svelte
const table = createSvelteTable({ columns, data, getCoreRowModel: getCoreRowModel() })

//vue
const table = useVueTable({ columns, data, getCoreRowModel: getCoreRowModel() })
```

그렇다면 `table` 인스턴스에는 무엇이 있을까요? 테이블 인스턴스와 어떤 상호작용을 할 수 있는지 살펴보겠습니다.

### 테이블 상태

테이블 인스턴스는 모든 테이블 상태를 포함하며, `table.getState()` API를 통해 접근할 수 있습니다. 각 테이블 기능은 테이블 상태에 다양한 상태를 등록합니다. 예를 들어, 행 선택 기능은 `rowSelection` 상태를 등록하고, 페이지네이션 기능은 `pagination` 상태를 등록합니다.

각 기능은 테이블 인스턴스에 해당 상태 설정 API와 상태 재설정 API도 갖추고 있습니다. 예를 들어, 행 선택 기능은 `setRowSelection` API와 `resetRowSelection`을 갖추고 있습니다.

```ts
table.getState().rowSelection //행 선택 상태 읽기
table.setRowSelection((old) => ({...old})) //행 선택 상태 설정
table.resetRowSelection() //행 선택 상태 재설정
```

이는 [테이블 상태 가이드](../../framework/react/guide/table-state)에서 더 자세히 다룹니다.

### 테이블 API

각 기능에 의해 생성된 수십 개의 테이블 API가 있으며, 이를 통해 테이블 상태를 다양한 방식으로 읽거나 변경할 수 있습니다.

핵심 테이블 인스턴스 및 모든 다른 기능 API에 대한 API 참조 문서는 API 문서 전반에 걸쳐 찾을 수 있습니다.

예를 들어, 핵심 테이블 인스턴스 API 문서는 여기에서 찾을 수 있습니다: [테이블 API](../../api/core/table#table-api)

### 테이블 행 모델

테이블 인스턴스에서 행을 읽기 위한 특별한 테이블 인스턴스 API 세트가 있으며, 이를 행 모델이라고 합니다. TanStack Table은 생성된 행이 처음 전달한 `data` 배열과 매우 다를 수 있는 고급 기능을 가지고 있습니다. 테이블 옵션으로 전달할 수 있는 다양한 행 모델에 대해 더 알고 싶다면, [행 모델 가이드](../row-models)를 참조하세요.
