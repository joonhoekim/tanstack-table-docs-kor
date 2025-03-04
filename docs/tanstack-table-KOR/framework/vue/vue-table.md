---
title: Vue Table
---

`@tanstack/vue-table` 어댑터는 핵심 테이블 로직을 감싸는 래퍼입니다. 주요 역할은 "vue" 방식으로 상태를 관리하고, 타입을 제공하며, cell/header/footer 템플릿의 렌더링 구현을 제공하는 것입니다.

## Exports

`@tanstack/vue-table`은 `@tanstack/table-core`의 모든 API와 다음을 다시 내보냅니다:

### `useVueTable`

`options` 객체를 받아 테이블을 반환합니다.

```ts
import { useVueTable } from '@tanstack/vue-table'

const table = useVueTable(options)
// ...테이블 렌더링

```

### `FlexRender`

동적 값으로 cell/header/footer 템플릿을 렌더링하기 위한 Vue 컴포넌트입니다.

예시:

```vue
import { FlexRender } from '@tanstack/vue-table'

<template>
  <tbody>
    <tr v-for="row in table.getRowModel().rows" :key="row.id">
      <td v-for="cell in row.getVisibleCells()" :key="cell.id">
        <FlexRender
          :render="cell.column.columnDef.cell"
          :props="cell.getContext()"
        />
      </td>
    </tr>
  </tbody>
</template>
```
