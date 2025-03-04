---
title: Lit Table
---

`@tanstack/lit-table` 어댑터는 핵심 테이블 로직을 감싸는 래퍼입니다. 주요 역할은 "lit" 방식으로 상태를 관리하고, 타입을 제공하며, cell/header/footer 템플릿의 렌더링 구현을 제공하는 것입니다.

## Exports

`@tanstack/lit-table`은 `@tanstack/table-core`의 모든 API와 다음을 다시 내보냅니다:

### `TableController`

`options` 객체를 받아 테이블 인스턴스를 반환하는 `table` API를 제공하는 반응형 컨트롤러입니다.

```ts
import { TableController } from '@tanstack/lit-table'

@customElement('my-table-element')
class MyTableElement extends LitElement {
  private tableController = new TableController<Person>(this)

  protected render() {
    const table = this.tableController.table(options)
    // ...테이블 렌더링
  }
}
```

### `flexRender`

동적 값으로 cell/header/footer 템플릿을 렌더링하기 위한 유틸리티 함수입니다.

예시:

```jsx
import { flexRender } from '@tanstack/lit-table'
//...
return html`
<tbody>
  ${table
    .getRowModel()
    .rows.slice(0, 10)
    .map(
      row => html`
        <tr>
          ${row
            .getVisibleCells()
            .map(
              cell => html`
                <td>
                  ${flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              `
            )}
        </tr>
      `
    )}
</tbody>
`
```
