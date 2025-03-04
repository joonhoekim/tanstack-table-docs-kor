---
title: Svelte Table
---

`@tanstack/svelte-table` 어댑터는 핵심 테이블 로직을 감싸는 래퍼입니다. 주요 역할은 "svelte" 방식으로 상태를 관리하고, 타입을 제공하며, cell/header/footer 템플릿의 렌더링 구현을 제공하는 것입니다.

## `createSvelteTable`

`options` 객체를 받아 테이블을 반환합니다.

```svelte
<script>

import { createSvelteTable } from '@tanstack/svelte-table'

const table = createSvelteTable(options)

</script>
```
