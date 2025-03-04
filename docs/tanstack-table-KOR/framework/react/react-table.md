---
title: React Table
---

`@tanstack/react-table` 어댑터는 핵심 테이블 로직을 감싸는 래퍼입니다. 주요 역할은 "react" 방식으로 상태를 관리하고, 타입을 제공하며, cell/header/footer 템플릿의 렌더링 구현을 제공하는 것입니다.

## `useReactTable`

`options` 객체를 받아 테이블을 반환합니다.

```tsx
import { useReactTable } from '@tanstack/react-table'

function App() {
  const table = useReactTable(options)

  // ...테이블 렌더링
}
```
