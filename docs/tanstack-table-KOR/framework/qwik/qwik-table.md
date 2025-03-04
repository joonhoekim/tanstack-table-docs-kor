---
title: Qwik Table
---

`@tanstack/qwik-table` 어댑터는 핵심 테이블 로직을 감싸는 래퍼입니다. 주요 역할은 "qwik" 방식으로 상태를 관리하고, 타입을 제공하며, cell/header/footer 템플릿의 렌더링 구현을 제공하는 것입니다.

## Exports

`@tanstack/qwik-table`은 `@tanstack/table-core`의 모든 API와 다음을 다시 내보냅니다:

### `useQwikTable`

`options` 객체를 받아 `NoSerialize`가 적용된 Qwik Store에서 테이블을 반환합니다.

```ts
import { useQwikTable } from '@tanstack/qwik-table'

const table = useQwikTable(options)
// ...테이블 렌더링

```

### `flexRender`

동적 값으로 cell/header/footer 템플릿을 렌더링하기 위한 유틸리티 함수입니다.

예시:

```jsx
import { flexRender } from '@tanstack/qwik-table'
//...
return (
  <tbody>
    {table.getRowModel().rows.map(row => {
      return (
        <tr key={row.id}>
          {row.getVisibleCells().map(cell => (
            <td key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      )
    })}
  </tbody>
);
```
