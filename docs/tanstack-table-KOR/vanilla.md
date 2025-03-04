---
title: 바닐라 TS/JS
---

`@tanstack/table-core` 라이브러리는 TanStack Table의 핵심 로직을 포함하고 있습니다. 비표준 프레임워크를 사용하거나 프레임워크에 접근할 수 없는 경우, TypeScript 또는 JavaScript를 통해 코어 라이브러리를 직접 사용할 수 있습니다.

## `createTable`

`options` 객체를 받아 테이블을 반환합니다.

```tsx
import { createTable } from '@tanstack/table-core'

const table = createTable(options)
```
