---
title: Fuzzy Filtering Guide
---

## 예제

구현으로 바로 가고 싶으신가요? 다음 예제를 확인해보세요:

- [filters-fuzzy](../../framework/react/examples/filters-fuzzy)

## API

[Filters API](../../api/features/filters)

## Fuzzy Filtering 가이드

Fuzzy filtering은 대략적인 일치에 기반하여 데이터를 필터링할 수 있는 기술입니다. 이는 주어진 값과 정확히 일치하지 않더라도 유사한 데이터를 검색하고자 할 때 유용합니다.

클라이언트 측 fuzzy filtering을 구현하려면 사용자 정의 필터 함수를 정의해야 합니다. 이 함수는 행, columnId, 필터 값을 입력으로 받아야 하며, 해당 행이 필터링된 데이터에 포함되어야 하는지를 나타내는 boolean을 반환해야 합니다.

Fuzzy filtering은 주로 글로벌 필터링과 함께 사용되지만, 개별 열에도 적용할 수 있습니다. 우리는 두 경우 모두에 대해 fuzzy filtering을 구현하는 방법을 논의할 것입니다.

> **참고:** fuzzy filtering을 사용하려면 `@tanstack/match-sorter-utils` 라이브러리를 설치해야 합니다.
> TanStack Match Sorter Utils는 Kent C. Dodds의 [match-sorter](https://github.com/kentcdodds/match-sorter)를 TanStack Table의 행별 필터링 접근 방식에 더 잘 맞도록 포크한 것입니다.

match-sorter 라이브러리를 사용하는 것은 선택 사항이지만, TanStack Match Sorter Utils 라이브러리는 검색 쿼리에 대한 가장 가까운 일치로 행을 정렬할 수 있도록 랭크 정보를 반환하여 fuzzy filter와 정렬을 모두 수행하는 훌륭한 방법을 제공합니다.

### 사용자 정의 Fuzzy Filter 함수 정의

다음은 사용자 정의 fuzzy filter 함수의 예입니다:

```typescript
import { rankItem } from '@tanstack/match-sorter-utils';
import { FilterFn } from '@tanstack/table';

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // 항목을 랭크합니다
  const itemRank = rankItem(row.getValue(columnId), value)

  // itemRank 정보를 저장합니다
  addMeta({ itemRank })

  // 항목이 필터링되어야 하는지를 반환합니다
  return itemRank.passed
}
```

이 함수에서는 @tanstack/match-sorter-utils 라이브러리의 rankItem 함수를 사용하여 항목을 랭크합니다. 그런 다음 행의 메타 데이터에 랭킹 정보를 저장하고 항목이 랭킹 기준을 통과했는지를 반환합니다.

### 글로벌 필터링과 함께 Fuzzy Filtering 사용

글로벌 필터링과 함께 fuzzy filtering을 사용하려면 테이블 인스턴스의 globalFilterFn 옵션에 fuzzy filter 함수를 지정할 수 있습니다:

```typescript
const table = useReactTable({ // 또는 프레임워크의 해당 함수
    columns,
    data,
    filterFns: {
      fuzzy: fuzzyFilter, // 열 정의에서 사용할 수 있는 필터 함수로 정의
    },
    globalFilterFn: 'fuzzy', // 글로벌 필터에 fuzzy filter 적용 (fuzzy filter의 가장 일반적인 사용 사례)
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // 클라이언트 측 필터링
    getSortedRowModel: getSortedRowModel(), // 정렬도 사용하려면 클라이언트 측 정렬 필요
})
```

### 열 필터링과 함께 Fuzzy Filtering 사용

열 필터링과 함께 fuzzy filtering을 사용하려면 먼저 테이블 인스턴스의 filterFns 옵션에 fuzzy filter 함수를 정의해야 합니다. 그런 다음 열 정의의 filterFn 옵션에 fuzzy filter 함수를 지정할 수 있습니다:

```typescript
const column = [
  {
    accessorFn: row => `${row.firstName} ${row.lastName}`,
    id: 'fullName',
    header: 'Full Name',
    cell: info => info.getValue(),
    filterFn: 'fuzzy', // 사용자 정의 fuzzy filter 함수 사용
  },
  // 다른 열...
];
```

이 예제에서는 데이터의 firstName과 lastName 필드를 결합한 열에 fuzzy filter를 적용하고 있습니다.

#### Fuzzy Filtering을 사용한 정렬

열 필터링과 함께 fuzzy filtering을 사용할 때 랭킹 정보를 기반으로 데이터를 정렬하고자 할 수도 있습니다. 이를 위해 사용자 정의 정렬 함수를 정의할 수 있습니다:

```typescript
import { compareItems } from '@tanstack/match-sorter-utils'
import { sortingFns } from '@tanstack/table'

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0

  // 열에 랭킹 정보가 있는 경우에만 랭크로 정렬
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    )
  }

  // 항목 랭크가 동일할 때 알파벳 순서로 대체
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}
```

이 함수에서는 두 행의 랭킹 정보를 비교합니다. 랭크가 동일한 경우 알파벳 순서로 대체합니다.

그런 다음 열 정의의 sortFn 옵션에 이 정렬 함수를 지정할 수 있습니다:

```typescript
{
  accessorFn: row => `${row.firstName} ${row.lastName}`,
  id: 'fullName',
  header: 'Full Name',
  cell: info => info.getValue(),
  filterFn: 'fuzzy', // 사용자 정의 fuzzy filter 함수 사용
  sortFn: 'fuzzySort', // 사용자 정의 fuzzy sort 함수 사용
}
```
