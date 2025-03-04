---
title: 정렬 가이드
---

## 예제

구현으로 바로 가고 싶으신가요? 다음 예제를 확인하세요:

- [정렬](../../framework/react/examples/sorting)
- [필터](../../framework/react/examples/filters)

## API

[정렬 API](../../api/features/sorting)

## 정렬 가이드

TanStack Table은 거의 모든 정렬 사용 사례에 대한 솔루션을 제공합니다. 이 가이드는 내장된 클라이언트 측 정렬 기능을 사용자 정의하는 다양한 옵션과 수동 서버 측 정렬을 선호하여 클라이언트 측 정렬을 선택 해제하는 방법을 안내합니다.

### 정렬 상태

정렬 상태는 다음과 같은 형태의 객체 배열로 정의됩니다:

```tsx
type ColumnSort = {
  id: string
  desc: boolean
}
type SortingState = ColumnSort[]
```

정렬 상태는 배열이므로 여러 열을 한 번에 정렬할 수 있습니다. 아래 [다중 정렬](#multi-sorting) 사용자 정의에 대해 더 읽어보세요.

#### 정렬 상태 접근

`table.getState()` API를 사용하여 테이블 인스턴스에서 다른 상태와 마찬가지로 정렬 상태에 직접 접근할 수 있습니다.

```tsx
const table = useReactTable({
  columns,
  data,
  //...
})

console.log(table.getState().sorting) // 테이블 인스턴스에서 정렬 상태에 접근
```

그러나 테이블이 초기화되기 전에 정렬 상태에 접근해야 하는 경우, 아래와 같이 정렬 상태를 "제어"할 수 있습니다.

#### 제어된 정렬 상태

정렬 상태에 쉽게 접근해야 하는 경우, `state.sorting` 및 `onSortingChange` 테이블 옵션을 사용하여 자신의 상태 관리에서 정렬 상태를 제어/관리할 수 있습니다.

```tsx
const [sorting, setSorting] = useState<SortingState>([]) // 여기에서 초기 정렬 상태를 설정할 수 있습니다
//...
// 정렬 상태를 사용하여 서버에서 데이터를 가져오거나 다른 작업을 수행...
//...
const table = useReactTable({
  columns,
  data,
  //...
  state: {
    sorting,
  },
  onSortingChange: setSorting,
})
```

#### 초기 정렬 상태

자신의 상태 관리나 범위에서 정렬 상태를 제어할 필요가 없지만 여전히 초기 정렬 상태를 설정하려는 경우, `state` 대신 `initialState` 테이블 옵션을 사용할 수 있습니다.

```jsx
const table = useReactTable({
  columns,
  data,
  //...
  initialState: {
    sorting: [
      {
        id: 'name',
        desc: true, // 기본적으로 이름을 내림차순으로 정렬
      },
    ],
  },
})
```

> **참고**: `initialState.sorting`과 `state.sorting`을 동시에 사용하지 마세요. `state.sorting`의 초기화된 상태가 `initialState.sorting`을 덮어씁니다.

### 클라이언트 측 vs 서버 측 정렬

클라이언트 측 또는 서버 측 정렬을 사용할지 여부는 클라이언트 측 또는 서버 측 페이지네이션이나 필터링을 사용하는지 여부에 전적으로 달려 있습니다. 일관성을 유지하세요. 클라이언트 측 정렬을 서버 측 페이지네이션이나 필터링과 함께 사용하면 현재 로드된 데이터만 정렬되고 전체 데이터 세트는 정렬되지 않습니다.

### 수동 서버 측 정렬

백엔드 로직에서 자체 서버 측 정렬을 사용하려는 경우, 정렬된 행 모델을 제공할 필요가 없습니다. 그러나 정렬된 행 모델을 제공했지만 이를 비활성화하려는 경우, `manualSorting` 테이블 옵션을 사용할 수 있습니다.

```jsx
const [sorting, setSorting] = useState<SortingState>([])
//...
const table = useReactTable({
  columns,
  data,
  getCoreRowModel: getCoreRowModel(),
  //getSortedRowModel: getSortedRowModel(), // 수동 정렬에는 필요하지 않음
  manualSorting: true, // 정렬된 행 모델 대신 사전 정렬된 행 모델 사용
  state: {
    sorting,
  },
  onSortingChange: setSorting,
})
```

> **참고**: `manualSorting`이 `true`로 설정되면, 테이블은 제공된 데이터가 이미 정렬된 것으로 가정하고 정렬을 적용하지 않습니다.

### 클라이언트 측 정렬

클라이언트 측 정렬을 구현하려면 먼저 테이블에 정렬된 행 모델을 제공해야 합니다. TanStack Table에서 `getSortedRowModel` 함수를 가져와서 정렬된 행으로 변환하는 데 사용됩니다.

```jsx
import { useReactTable } from '@tanstack/react-table'
//...
const table = useReactTable({
  columns,
  data,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(), // 정렬된 행 모델 제공
})
```

### 정렬 함수

모든 열에 대한 기본 정렬 함수는 열의 데이터 유형에서 유추됩니다. 그러나 데이터가 널 가능하거나 표준 데이터 유형이 아닌 경우 특정 열에 사용할 정확한 정렬 함수를 정의하는 것이 유용할 수 있습니다.

`sortingFn` 열 옵션을 사용하여 열별로 사용자 정의 정렬 함수를 결정할 수 있습니다.

기본적으로 선택할 수 있는 6개의 내장 정렬 함수가 있습니다:

- `alphanumeric` - 대소문자 구분 없이 혼합된 알파벳 숫자 값으로 정렬합니다. 느리지만 문자열에 자연스럽게 정렬되어야 하는 숫자가 포함된 경우 더 정확합니다.
- `alphanumericCaseSensitive` - 대소문자 구분하여 혼합된 알파벳 숫자 값으로 정렬합니다. 느리지만 문자열에 자연스럽게 정렬되어야 하는 숫자가 포함된 경우 더 정확합니다.
- `text` - 대소문자 구분 없이 텍스트/문자열 값으로 정렬합니다. 빠르지만 문자열에 자연스럽게 정렬되어야 하는 숫자가 포함된 경우 덜 정확합니다.
- `textCaseSensitive` - 대소문자 구분하여 텍스트/문자열 값으로 정렬합니다. 빠르지만 문자열에 자연스럽게 정렬되어야 하는 숫자가 포함된 경우 덜 정확합니다.
- `datetime` - 시간으로 정렬합니다. 값이 `Date` 객체인 경우 사용하세요.
- `basic` - 기본/표준 `a > b ? 1 : a < b ? -1 : 0` 비교를 사용하여 정렬합니다. 가장 빠른 정렬 함수이지만 가장 정확하지 않을 수 있습니다.

사용자 정의 정렬 함수를 `sortingFn` 열 옵션으로 정의하거나 `sortingFns` 테이블 옵션을 사용하여 전역 정렬 함수로 정의할 수도 있습니다.

#### 사용자 정의 정렬 함수

`sortingFns` 테이블 옵션이나 `sortingFn` 열 옵션으로 사용자 정의 정렬 함수를 정의할 때, 다음과 같은 서명을 가져야 합니다:

```tsx
// 선택적으로 SortingFn을 사용하여 매개변수 유형을 유추
const myCustomSortingFn: SortingFn<TData> = (rowA: Row<TData>, rowB: Row<TData>, columnId: string) => {
  return //-1, 0, 또는 1 - rowA.original 및 rowB.original을 사용하여 모든 행 데이터에 접근
}
```

> 참고: 비교 함수는 열이 내림차순인지 오름차순인지 여부를 고려할 필요가 없습니다. 행 모델이 해당 논리를 처리합니다. `sortingFn` 함수는 일관된 비교만 제공하면 됩니다.

모든 정렬 함수는 2개의 행과 열 ID를 수신하며, 열 ID를 사용하여 두 행을 비교하여 오름차순으로 `-1`, `0`, 또는 `1`을 반환해야 합니다. 다음은 요약입니다:

| 반환 | 오름차순 |
| ------ | --------------- |
| `-1`   | `a < b`         |
| `0`    | `a === b`       |
| `1`    | `a > b`         |

```jsx
const columns = [
  {
    header: () => 'Name',
    accessorKey: 'name',
    sortingFn: 'alphanumeric', // 이름으로 내장 정렬 함수 사용
  },
  {
    header: () => 'Age',
    accessorKey: 'age',
    sortingFn: 'myCustomSortingFn', // 사용자 정의 전역 정렬 함수 사용
  },
  {
    header: () => 'Birthday',
    accessorKey: 'birthday',
    sortingFn: 'datetime', // 날짜 열에 권장
  },
  {
    header: () => 'Profile',
    accessorKey: 'profile',
    // 사용자 정의 정렬 함수 직접 사용
    sortingFn: (rowA, rowB, columnId) => {
      return rowA.original.someProperty - rowB.original.someProperty
    },
  }
]
//...
const table = useReactTable({
  columns,
  data,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  sortingFns: { // 사용자 정의 정렬 함수 추가
    myCustomSortingFn: (rowA, rowB, columnId) => {
      return rowA.original[columnId] > rowB.original[columnId] ? 1 : rowA.original[columnId] < rowB.original[columnId] ? -1 : 0
    },
  },
})
```

### 정렬 사용자 정의

정렬 UX 및 동작을 추가로 사용자 정의할 수 있는 많은 테이블 및 열 옵션이 있습니다.

#### 정렬 비활성화

특정 열 또는 전체 테이블에 대해 정렬을 비활성화하려면 `enableSorting` 열 옵션 또는 테이블 옵션을 사용할 수 있습니다.

```jsx
const columns = [
  {
    header: () => 'ID',
    accessorKey: 'id',
    enableSorting: false, // 이 열에 대한 정렬 비활성화
  },
  {
    header: () => 'Name',
    accessorKey: 'name',
  },
  //...
]
//...
const table = useReactTable({
  columns,
  data,
  enableSorting: false, // 전체 테이블에 대한 정렬 비활성화
})
```

#### 정렬 방향

기본적으로 `toggleSorting` API를 사용하여 열에 대한 정렬을 순환할 때 첫 번째 정렬 방향은 문자열 열의 경우 오름차순이고 숫자 열의 경우 내림차순입니다. `sortDescFirst` 열 옵션 또는 테이블 옵션을 사용하여 이 동작을 변경할 수 있습니다.

```jsx
const columns = [
  {
    header: () => 'Name',
    accessorKey: 'name',
    sortDescFirst: true, // 이름을 내림차순으로 먼저 정렬 (문자열 열의 기본값은 오름차순)
  },
  {
    header: () => 'Age',
    accessorKey: 'age',
    sortDescFirst: false, //sort by age in ascending order first (default is descending for number columns)
  },
  //...
]
//...
const table = useReactTable({
  columns,
  data,
  sortDescFirst: true, //sort by all columns in descending order first (default is ascending for string columns and descending for number columns)
})
```

> **NOTE**: You may want to explicitly set the `sortDescFirst` column option on any columns that have nullable values. The table may not be able to properly determine if a column is a number or a string if it contains nullable values.

#### Invert Sorting

Inverting sorting is not the same as changing the default sorting direction. If `invertSorting` column option is `true` for a column, then the "desc/asc" sorting states will still cycle like normal, but the actual sorting of the rows will be inverted. This is useful for values that have an inverted best/worst scale where lower numbers are better, eg. a ranking (1st, 2nd, 3rd) or golf-like scoring.

```jsx
const columns = [
  {
    header: () => 'Rank',
    accessorKey: 'rank',
    invertSorting: true, // invert the sorting for this column. 1st -> 2nd -> 3rd -> ... even if "desc" sorting is applied
  },
  //...
]
```

#### Sort Undefined Values

Any undefined values will be sorted to the beginning or end of the list based on the `sortUndefined` column option or table option. You can customize this behavior for your specific use-case.

In not specified, the default value for `sortUndefined` is `1`, and undefined values will be sorted with lower priority (descending), if ascending, undefined will appear on the end of the list.

- `'first'` - Undefined values will be pushed to the beginning of the list
- `'last'` - Undefined values will be pushed to the end of the list
- `false` - Undefined values will be considered tied and need to be sorted by the next column filter or original index (whichever applies)
- `-1` - Undefined values will be sorted with higher priority (ascending) (if ascending, undefined will appear on the beginning of the list)
- `1` - Undefined values will be sorted with lower priority (descending) (if ascending, undefined will appear on the end of the list)

> NOTE: `'first'` and `'last'` options are new in v8.16.0

```jsx
const columns = [
  {
    header: () => 'Rank',
    accessorKey: 'rank',
    sortUndefined: -1, // 'first' | 'last' | 1 | -1 | false
  },
]
```

#### Sorting Removal

By default, the ability to remove sorting while cycling through the sorting states for a column is enabled. You can disable this behavior using the `enableSortingRemoval` table option. This behavior is useful if you want to ensure that at least one column is always sorted.

The default behavior when using either the `getToggleSortingHandler` or `toggleSorting` APIs is to cycle through the sorting states like this:

`'none' -> 'desc' -> 'asc' -> 'none' -> 'desc' -> 'asc' -> ...`

If you disable sorting removal, the behavior will be like this:

`'none' -> 'desc' -> 'asc' -> 'desc' -> 'asc' -> ...`

Once a column is sorted and `enableSortingRemoval` is `false`, toggling the sorting on that column will never remove the sorting. However, if the user sorts by another column and it is not a multi-sort event, then the sorting will be removed from the previous column and just applied to the new column.

> Set `enableSortingRemoval` to `false` if you want to ensure that at least one column is always sorted.

```jsx
const table = useReactTable({
  columns,
  data,
  enableSortingRemoval: false, // disable the ability to remove sorting on columns (always none -> asc -> desc -> asc)
})
```

#### Multi-Sorting

Sorting by multiple columns at once is enabled by default if using the `column.getToggleSortingHandler` API. If the user holds the `Shift` key while clicking on a column header, the table will sort by that column in addition to the columns that are already sorted. If you use the `column.toggleSorting` API, you have to manually pass in whether or not to use multi-sorting. (`column.toggleSorting(desc, multi)`).

##### Disable Multi-Sorting

You can disable multi-sorting for either a specific column or the entire table using the `enableMultiSort` column option or table option. Disabling multi-sorting for a specific column will replace all existing sorting with the new column's sorting.

```jsx
const columns = [
  {
    header: () => 'Created At',
    accessorKey: 'createdAt',
    enableMultiSort: false, // always sort by just this column if sorting by this column
  },
  //...
]
//...
const table = useReactTable({
  columns,
  data,
  enableMultiSort: false, // disable multi-sorting for the entire table
})
```

##### Customize Multi-Sorting Trigger

By default, the `Shift` key is used to trigger multi-sorting. You can change this behavior with the `isMultiSortEvent` table option. You can even specify that all sorting events should trigger multi-sorting by returning `true` from the custom function.

```jsx
const table = useReactTable({
  columns,
  data,
  isMultiSortEvent: (e) => true, // normal click triggers multi-sorting
  //or
  isMultiSortEvent: (e) => e.ctrlKey || e.shiftKey, // also use the `Ctrl` key to trigger multi-sorting
})
```

##### Multi-Sorting Limit

By default, there is no limit to the number of columns that can be sorted at once. You can set a limit using the `maxMultiSortColCount` table option.

```jsx
const table = useReactTable({
  columns,
  data,
  maxMultiSortColCount: 3, // only allow 3 columns to be sorted at once
})
```

##### Multi-Sorting Removal

By default, the ability to remove multi-sorts is enabled. You can disable this behavior using the `enableMultiRemove` table option.

```jsx
const table = useReactTable({
  columns,
  data,
  enableMultiRemove: false, // disable the ability to remove multi-sorts
})
```

### Sorting APIs

There are a lot of sorting related APIs that you can use to hook up to your UI or other logic. Here is a list of all of the sorting APIs and some of their use-cases.

- `table.setSorting` - Set the sorting state directly.
- `table.resetSorting` - Reset the sorting state to the initial state or clear it.

- `column.getCanSort` - Useful for enabling/disabling the sorting UI for a column.
- `column.getIsSorted` - Useful for showing a visual sorting indicator for a column.

- `column.getToggleSortingHandler` - Useful for hooking up the sorting UI for a column. Add to a sort arrow (icon button), menu item, or simply the entire column header cell. This handler will call `column.toggleSorting` with the correct parameters.
- `column.toggleSorting` - Useful for hooking up the sorting UI for a column. If using instead of `column.getToggleSortingHandler`, you have to manually pass in whether or not to use multi-sorting. (`column.toggleSorting(desc, multi)`)
- `column.clearSorting` - Useful for a "clear sorting" button or menu item for a specific column.

- `column.getNextSortingOrder` - Useful for showing which direction the column will sort by next. (asc/desc/clear in a tooltip/menu item/aria-label or something)
- `column.getFirstSortDir` - Useful for showing which direction the column will sort by first. (asc/desc in a tooltip/menu item/aria-label or something)
- `column.getAutoSortDir` - Determines whether the first sorting direction will be ascending or descending for a column.
- `column.getAutoSortingFn` - Used internally to find the default sorting function for a column if none is specified.
- `column.getSortingFn` - Returns the exact sorting function being used for a column.

- `column.getCanMultiSort` - Useful for enabling/disabling the multi-sorting UI for a column.
- `column.getSortIndex` - Useful for showing a badge or indicator of the column's sort order in a multi-sort scenario. i.e. whether or not it is the first, second, third, etc. column to be sorted.
