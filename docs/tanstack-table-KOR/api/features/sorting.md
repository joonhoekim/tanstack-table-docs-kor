---
제목: Sorting APIs
id: sorting
---

## 상태

정렬 상태는 다음과 같은 형태로 테이블에 저장됩니다:

```tsx
export type SortDirection = 'asc' | 'desc'

export type ColumnSort = {
  id: string
  desc: boolean
}

export type SortingState = ColumnSort[]

export type SortingTableState = {
  sorting: SortingState
}
```

## 정렬 함수

다음 정렬 함수는 테이블 코어에 내장되어 있습니다:

- `alphanumeric`
  - 대소문자를 구분하지 않고 혼합된 알파벳 숫자 값을 정렬합니다. 문자열에 자연스럽게 정렬되어야 하는 숫자가 포함된 경우 더 정확하지만 느립니다.
- `alphanumericCaseSensitive`
  - 대소문자를 구분하여 혼합된 알파벳 숫자 값을 정렬합니다. 문자열에 자연스럽게 정렬되어야 하는 숫자가 포함된 경우 더 정확하지만 느립니다.
- `text`
  - 대소문자를 구분하지 않고 텍스트/문자열 값을 정렬합니다. 문자열에 자연스럽게 정렬되어야 하는 숫자가 포함된 경우 덜 정확하지만 더 빠릅니다.
- `textCaseSensitive`
  - 대소문자를 구분하여 텍스트/문자열 값을 정렬합니다. 문자열에 자연스럽게 정렬되어야 하는 숫자가 포함된 경우 덜 정확하지만 더 빠릅니다.
- `datetime`
  - 시간으로 정렬합니다. 값이 `Date` 객체인 경우 사용하세요.
- `basic`
  - 기본/표준 `a > b ? 1 : a < b ? -1 : 0` 비교를 사용하여 정렬합니다. 가장 빠른 정렬 함수이지만 가장 정확하지 않을 수 있습니다.

모든 정렬 함수는 2개의 행과 열 ID를 받아야 하며, 열 ID를 사용하여 두 행을 비교하여 오름차순으로 `-1`, `0`, `1`을 반환해야 합니다. 다음은 요약표입니다:

| 반환값 | 오름차순 |
| ------ | --------------- |
| `-1`   | `a < b`         |
| `0`    | `a === b`       |
| `1`    | `a > b`         |

모든 정렬 함수의 타입 서명은 다음과 같습니다:

```tsx
export type SortingFn<TData extends AnyData> = {
  (rowA: Row<TData>, rowB: Row<TData>, columnId: string): number
}
```

#### 정렬 함수 사용하기

정렬 함수는 `columnDefinition.sortingFn`에 다음을 전달하여 사용할 수 있습니다:

- 내장 정렬 함수를 참조하는 `string`
- `tableOptions.sortingFns` 옵션을 통해 제공된 사용자 정의 정렬 함수를 참조하는 `string`
- `columnDefinition.sortingFn` 옵션에 직접 제공된 함수

`columnDef.sortingFn`에 사용할 수 있는 최종 정렬 함수 목록은 다음 타입을 사용합니다:

```tsx
export type SortingFnOption<TData extends AnyData> =
  | 'auto'
  | SortingFns
  | BuiltInSortingFns
  | SortingFn<TData>
```

## 열 정의 옵션

### `sortingFn`

```tsx
sortingFn?: SortingFn | keyof SortingFns | keyof BuiltInSortingFns
```

이 열에 사용할 정렬 함수.

옵션:

- [내장 정렬 함수](#sorting-functions)를 참조하는 `string`
- [사용자 정의 정렬 함수](#sorting-functions)

### `sortDescFirst`

```tsx
sortDescFirst?: boolean
```

이 열의 정렬 토글이 내림차순 방향으로 시작하도록 설정합니다.

### `enableSorting`

```tsx
enableSorting?: boolean
```

이 열에 대한 정렬을 활성화/비활성화합니다.

### `enableMultiSort`

```tsx
enableMultiSort?: boolean
```

이 열에 대한 다중 정렬을 활성화/비활성화합니다.

### `invertSorting`

```tsx
invertSorting?: boolean
```

이 열에 대한 정렬 순서를 반전시킵니다. 이는 낮은 숫자가 더 나은 경우(예: 순위(1위, 2위, 3위) 또는 골프와 같은 점수)와 같이 반전된 최상/최악 척도를 가진 값에 유용합니다.

### `sortUndefined`

```tsx
sortUndefined?: 'first' | 'last' | false | -1 | 1 // 기본값은 1
```

- `'first'`
  - 정의되지 않은 값은 목록의 시작으로 이동됩니다.
- `'last'`
  - 정의되지 않은 값은 목록의 끝으로 이동됩니다.
- `false`
  - 정의되지 않은 값은 동점으로 간주되며 다음 열 필터 또는 원래 인덱스에 의해 정렬되어야 합니다(적용되는 경우).
- `-1`
  - 정의되지 않은 값은 더 높은 우선순위로 정렬됩니다(오름차순)(오름차순인 경우 정의되지 않은 값은 목록의 시작에 나타납니다).
- `1`
  - 정의되지 않은 값은 더 낮은 우선순위로 정렬됩니다(내림차순)(오름차순인 경우 정의되지 않은 값은 목록의 끝에 나타납니다).

> 참고: `'first'` 및 `'last'` 옵션은 v8.16.0에서 새로 추가되었습니다.

## 열 API

### `getAutoSortingFn`

```tsx
getAutoSortingFn: () => SortingFn<TData>
```

열의 값에 따라 자동으로 추론된 정렬 함수를 반환합니다.

### `getAutoSortDir`

```tsx
getAutoSortDir: () => SortDirection
```

열의 값에 따라 자동으로 추론된 정렬 방향을 반환합니다.

### `getSortingFn`

```tsx
getSortingFn: () => SortingFn<TData>
```

이 열에 사용할 해결된 정렬 함수를 반환합니다.

### `getNextSortingOrder`

```tsx
getNextSortingOrder: () => SortDirection | false
```

다음 정렬 순서를 반환합니다.

### `getCanSort`

```tsx
getCanSort: () => boolean
```

이 열이 정렬될 수 있는지 여부를 반환합니다.

### `getCanMultiSort`

```tsx
getCanMultiSort: () => boolean
```

이 열이 다중 정렬될 수 있는지 여부를 반환합니다.

### `getSortIndex`

```tsx
getSortIndex: () => number
```

정렬 상태 내에서 이 열의 정렬 위치를 반환합니다.

### `getIsSorted`

```tsx
getIsSorted: () => false | SortDirection
```

이 열이 정렬되었는지 여부를 반환합니다.

### `getFirstSortDir`

```tsx 
getFirstSortDir: () => SortDirection
```

이 열을 정렬할 때 사용해야 하는 첫 번째 방향을 반환합니다.

### `clearSorting`

```tsx
clearSorting: () => void
```

이 열을 테이블의 정렬 상태에서 제거합니다.

### `toggleSorting`

```tsx
toggleSorting: (desc?: boolean, isMulti?: boolean) => void
```

이 열의 정렬 상태를 토글합니다. `desc`가 제공되면 해당 값으로 정렬 방향을 강제합니다. `isMulti`가 제공되면 열을 다중 정렬로 추가하거나 이미 정렬된 경우 토글합니다.

### `getToggleSortingHandler`

```tsx
getToggleSortingHandler: () => undefined | ((event: unknown) => void)
```

이 열의 정렬 상태를 토글하는 데 사용할 수 있는 함수를 반환합니다. 이는 열 헤더에 클릭 핸들러를 연결하는 데 유용합니다.

## 테이블 옵션

### `sortingFns`

```tsx
sortingFns?: Record<string, SortingFn>
```

이 옵션을 사용하면 열의 `sortingFn` 옵션에서 키로 참조할 수 있는 사용자 정의 정렬 함수를 정의할 수 있습니다.
예시:

```tsx
declare module '@tanstack/table-core' {
  interface SortingFns {
    myCustomSorting: SortingFn<unknown>
  }
}

const column = columnHelper.data('key', {
  sortingFn: 'myCustomSorting',
})

const table = useReactTable({
  columns: [column],
  sortingFns: {
    myCustomSorting: (rowA: any, rowB: any, columnId: any): number =>
      rowA.getValue(columnId).value < rowB.getValue(columnId).value ? 1 : -1,
  },
})
```

### `manualSorting`

```tsx
manualSorting?: boolean
```

테이블에 대한 수동 정렬을 활성화합니다. 이 옵션이 `true`인 경우 데이터를 테이블에 전달하기 전에 정렬해야 합니다. 서버 측 정렬을 수행하는 경우 유용합니다.

### `onSortingChange`

```tsx
onSortingChange?: OnChangeFn<SortingState>
```

제공된 경우, `state.sorting`이 변경될 때 `updaterFn`과 함께 이 함수가 호출됩니다. 이는 기본 내부 상태 관리를 재정의하므로 테이블 외부에서 상태 변경을 완전히 또는 부분적으로 유지해야 합니다.

### `enableSorting`

```tsx
enableSorting?: boolean
```

테이블에 대한 정렬을 활성화/비활성화합니다.

### `enableSortingRemoval`

```tsx
enableSortingRemoval?: boolean
```

테이블에 대한 정렬 제거 기능을 활성화/비활성화합니다.
- `true`인 경우 정렬 순서 변경은 다음과 같이 순환합니다: 'none' -> 'desc' -> 'asc' -> 'none' -> ...
- `false`인 경우 정렬 순서 변경은 다음과 같이 순환합니다: 'none' -> 'desc' -> 'asc' -> 'desc' -> 'asc' -> ...

### `enableMultiRemove`

```tsx
enableMultiRemove?: boolean
```

다중 정렬 제거 기능을 활성화/비활성화합니다.

### `enableMultiSort`

```tsx
enableMultiSort?: boolean
```

테이블에 대한 다중 정렬을 활성화/비활성화합니다.

### `sortDescFirst`

```tsx
sortDescFirst?: boolean
```

`true`인 경우 모든 정렬은 첫 번째 토글 상태로 내림차순을 기본값으로 사용합니다.

### `getSortedRowModel`

```tsx
getSortedRowModel?: (table: Table<TData>) => () => RowModel<TData>
```

정렬된 행 모델을 검색하는 데 사용되는 함수입니다. 서버 측 정렬을 사용하는 경우 이 함수는 필요하지 않습니다. 클라이언트 측 정렬을 사용하려면 어댑터에서 내보낸 `getSortedRowModel()`을 테이블에 전달하거나 직접 구현하세요.

### `maxMultiSortColCount`

```tsx
maxMultiSortColCount?: number
```

다중 정렬할 수 있는 최대 열 수를 설정합니다.

### `isMultiSortEvent`

```tsx
isMultiSortEvent?: (e: unknown) => boolean
```

다중 정렬 이벤트가 트리거되어야 하는지 여부를 결정하는 데 사용되는 사용자 정의 함수를 전달합니다. 정렬 토글 핸들러의 이벤트가 전달되며, 이벤트가 다중 정렬을 트리거해야 하는 경우 `true`를 반환해야 합니다.

## 테이블 API

### `setSorting`

```tsx
setSorting: (updater: Updater<SortingState>) => void
```

`state.sorting` 상태를 설정하거나 업데이트합니다.

### `resetSorting`

```tsx
resetSorting: (defaultState?: boolean) => void
```

**정렬** 상태를 `initialState.sorting`으로 재설정하거나, `true`를 전달하여 기본 빈 상태 재설정을 `[]`로 강제할 수 있습니다.

### `getPreSortedRowModel`

```tsx
getPreSortedRowModel: () => RowModel<TData>
```

정렬이 적용되기 전의 테이블에 대한 행 모델을 반환합니다.

### `getSortedRowModel`

```tsx
getSortedRowModel: () => RowModel<TData>
```

정렬이 적용된 후의 테이블에 대한 행 모델을 반환합니다.
