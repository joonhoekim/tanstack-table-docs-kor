---
title: V8로의 마이그레이션 가이드
---

## V8로의 마이그레이션

TanStack Table V8은 React Table v7을 TypeScript로 완전히 새로 작성한 것입니다. 마크업과 CSS의 전체 구조/조직은 크게 변하지 않지만, 많은 API가 이름이 변경되거나 대체되었습니다.

### 주목할 만한 변경 사항

- 기본 패키지에 포함된 타입과 함께 TypeScript로 완전한 재작성
- 제어 역전을 선호하여 플러그인 시스템 제거
- 훨씬 더 크고 개선된 API (및 고정과 같은 새로운 기능)
- 더 나은 제어 상태 관리
- 서버 측 작업에 대한 더 나은 지원
- 완전한 (하지만 선택적인) 데이터 파이프라인 제어
- React, Solid, Svelte, Vue 및 잠재적으로 더 많은 프레임워크 어댑터를 가진 독립적인 코어
- 새로운 개발 도구

### 새 버전 설치

새로운 TanStack Table 버전은 `@tanstack` 범위로 게시됩니다. 선호하는 패키지 관리자를 사용하여 새 패키지를 설치하세요:

```bash
npm uninstall react-table @types/react-table
npm install @tanstack/react-table
```

```tsx
- import { useTable } from 'react-table' // [!code --]
+ import { useReactTable } from '@tanstack/react-table' // [!code ++]
```

타입은 이제 기본 패키지에 포함되어 있으므로 `@types/react-table` 패키지를 제거할 수 있습니다.

> 원한다면, 코드를 점진적으로 마이그레이션할 수 있도록 이전 `react-table` 패키지를 설치된 상태로 유지할 수 있습니다. 별도의 테이블에 대해 두 패키지를 나란히 사용할 수 있어야 합니다.

### 테이블 옵션 업데이트

- `useTable`을 `useReactTable`로 이름 변경
- 이전 훅 및 플러그인 시스템은 제거되었지만, 각 기능에 대한 트리 쉐이커블 행 모델 가져오기로 대체되었습니다.

```tsx
- import { useTable, usePagination, useSortBy } from 'react-table'; // [!code --]
+ import { // [!code ++]
+   useReactTable, // [!code ++]
+   getCoreRowModel, // [!code ++]
+   getPaginationRowModel, // [!code ++]
+   getSortedRowModel // [!code ++]
+ } from '@tanstack/react-table'; // [!code ++]

// ...

-   const tableInstance = useTable( // [!code --]
-     { columns,  data }, // [!code --]
-     useSortBy, // [!code --]
-     usePagination, //order of hooks used to matter // [!code --]
-     // etc. // [!code --]
-   ); // [!code --]
+   const tableInstance = useReactTable({ // [!code ++]
+     columns, // [!code ++]
+     data, // [!code ++]
+     getCoreRowModel: getCoreRowModel(), // [!code ++]
+     getPaginationRowModel: getPaginationRowModel(), // [!code ++]
+     getSortedRowModel: getSortedRowModel(), //order doesn't matter anymore! // [!code ++]
+     // etc. // [!code ++]
+   }); // [!code ++]
```

- 모든 `disable*` 테이블 옵션은 `enable*` 테이블 옵션으로 이름이 변경되었습니다. (예: `disableSortBy`는 이제 `enableSorting`, `disableGroupBy`는 이제 `enableGrouping` 등)
- ...

### 열 정의 업데이트

- accessor는 `accessorKey` 또는 `accessorFn`으로 이름이 변경되었습니다 (문자열 또는 함수를 사용하는지에 따라 다름)
- width, minWidth, maxWidth는 size, minSize, maxSize로 이름이 변경되었습니다
- 선택적으로, 더 나은 TypeScript 힌트를 위해 각 열 정의 주위에 새로운 `createColumnHelper` 함수를 사용할 수 있습니다. (선호하는 경우 여전히 열 정의 배열을 사용할 수 있습니다.)
  - 첫 번째 매개변수는 accessor 함수 또는 accessor 문자열입니다.
  - 두 번째 매개변수는 열 옵션의 객체입니다.

```tsx
const columns = [
-  { // [!code --]
-    accessor: 'firstName', // [!code --]
-    Header: 'First Name', // [!code --]
-  }, // [!code --]
-  { // [!code --]
-    accessor: row => row.lastName, // [!code --]
-    Header: () => <span>Last Name</span>, // [!code --]
-  }, // [!code --]

// Best TypeScript experience, especially when using `cell.getValue()` later on
+  columnHelper.accessor('firstName', { //accessorKey // [!code ++]
+    header: 'First Name', // [!code ++]
+  }), // [!code ++]
+  columnHelper.accessor(row => row.lastName, { //accessorFn // [!code ++]
+    header: () => <span>Last Name</span>, // [!code ++]
+  }), // [!code ++]

// OR (if you prefer)
+ { // [!code ++]
+   accessorKey: 'firstName', // [!code ++]
+   header: 'First Name', // [!code ++]
+ }, // [!code ++]
+ { // [!code ++]
+   accessorFn: row => row.lastName, // [!code ++]
+   header: () => <span>Last Name</span>, // [!code ++]
+ }, // [!code ++]
]
```

> 참고: 컴포넌트 내에서 열을 정의하는 경우, 여전히 열 정의에 안정적인 ID를 부여해야 합니다. 이는 성능에 도움이 되고 불필요한 재렌더링을 방지합니다. 열 정의를 `useMemo` 또는 `useState` 훅에 저장하세요.

- 열 옵션 이름 변경

  - `Header`는 `header`로 이름이 변경되었습니다
  - `Cell`은 `cell`로 이름이 변경되었습니다 (셀 렌더 함수도 변경되었습니다. 아래 참조)
  - `Footer`는 `footer`로 이름이 변경되었습니다
  - 모든 `disable*` 열 옵션은 `enable*` 열 옵션으로 이름이 변경되었습니다. (예: `disableSortBy`는 이제 `enableSorting`, `disableGroupBy`는 이제 `enableGrouping` 등)
  - `sortType`은 `sortingFn`으로 변경되었습니다
  - ...

- 사용자 정의 셀 렌더러 변경 사항

  - `value`는 `getValue`로 이름이 변경되었습니다 (업그레이드 전반에 걸쳐, 값을 직접 제공하는 대신, 값을 평가하기 위한 함수 `getValue`가 노출됩니다. 이 변경은 `getValue()`가 호출될 때만 값을 평가하고 캐시하여 성능을 향상시키기 위한 것입니다.)
  - `cell: { isGrouped, isPlaceholder, isAggregated }`는 이제 `cell: { getIsGrouped, getIsPlaceholder, getIsAggregated }`입니다
  - `column`: 기본 수준의 props는 이제 RT 전용입니다. 정의할 때 객체에 추가한 값은 이제 `columnDef`에서 한 단계 더 깊어졌습니다.
  - `table`: `useTable` 훅에 전달된 props는 이제 `options` 아래에 나타납니다.

### 테이블 마크업 마이그레이션

- `cell.render('Cell')` 또는 `column.render('Header')` 대신 `flexRender()`를 사용하세요.
- `getHeaderProps`, `getFooterProps`, `getCellProps`, `getRowProps` 등은 모두 _deprecated_되었습니다.
  - TanStack Table은 더 이상 `style` 또는 접근성 속성(예: `role`)을 기본적으로 제공하지 않습니다. 이러한 속성은 여전히 중요하지만, 프레임워크 독립성을 지원하기 위해 제거해야 했습니다.
  - `onClick` 핸들러를 수동으로 정의해야 하지만, 이를 간단하게 유지하기 위한 새로운 `get*Handler` 도우미가 있습니다.
  - `key` props를 수동으로 정의해야 합니다
  - 그룹화된 헤더, 집계 등과 같은 기능을 사용하는 경우 `colSpan` props를 수동으로 정의해야 합니다

```tsx
- <th {...header.getHeaderProps()}>{cell.render('Header')}</th> // [!code --]
+ <th colSpan={header.colSpan} key={column.id}> // [!code ++]
+   {flexRender( // [!code ++]
+     header.column.columnDef.header, // [!code ++]
+     header.getContext() // [!code ++]
+   )} // [!code ++]
+ </th> // [!code ++]
```

```tsx
- <td {...cell.getCellProps()}>{cell.render('Cell')}</td> // [!code --]
+ <td key={cell.id}> // [!code ++]
+   {flexRender( // [!code ++]
+     cell.column.columnDef.cell, // [!code ++]
+     cell.getContext() // [!code ++]
+   )} // [!code ++]
+ </td> // [!code ++]
```

```tsx
// in column definitions in this case
- Header: ({ getToggleAllRowsSelectedProps }) => ( // [!code --]
-   <input type="checkbox" {...getToggleAllRowsSelectedProps()} /> // [!code --]
- ), // [!code --]
- Cell: ({ row }) => ( // [!code --]
-   <input type="checkbox" {...row.getToggleRowSelectedProps()} /> // [!code --]
- ), // [!code --]
+ header: ({ table }) => ( // [!code ++]
+   <Checkbox // [!code ++]
+     checked={table.getIsAllRowsSelected()} // [!code ++]
+     indeterminate={table.getIsSomeRowsSelected()} // [!code ++]
+     onChange={table.getToggleAllRowsSelectedHandler()} // [!code ++]
+   /> // [!code ++]
+ ), // [!code ++]
+ cell: ({ row }) => ( // [!code ++]
+   <Checkbox // [!code ++]
+     checked={row.getIsSelected()} // [!code ++]
+     disabled={!row.getCanSelect()} // [!code ++]
+     indeterminate={row.getIsSomeSelected()} // [!code ++]
+     onChange={row.getToggleSelectedHandler()} // [!code ++]
+   /> // [!code ++]
+ ), // [!code ++]
```

### 기타 변경 사항

- 사용자 정의 `filterTypes` (이제 `filterFns`라고 함)는 행이 포함되어야 하는지 여부에 대한 부울만 반환하는 새로운 함수 서명을 가집니다.

```tsx
- (rows: Row[], id: string, filterValue: any) => Row[] // [!code --]
+ (row: Row, id: string, filterValue: any) => boolean // [!code ++]
```

- ...

> 이 가이드는 진행 중인 작업입니다. 시간이 있다면 기여를 고려해 주세요!
