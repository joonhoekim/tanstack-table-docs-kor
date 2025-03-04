---
title: Solid Table
---

`@tanstack/solid-table` 어댑터는 핵심 테이블 로직을 감싸는 래퍼입니다. 주요 역할은 "solid" 방식으로 상태를 관리하고, 타입을 제공하며, cell/header/footer 템플릿의 렌더링 구현을 제공하는 것입니다.

## `createSolidTable`

`options` 객체를 받아 테이블을 반환합니다.

```tsx
import { createSolidTable } from '@tanstack/solid-table'

function App() {
  const table = createSolidTable(options)

  // ...테이블 렌더링
}
```
