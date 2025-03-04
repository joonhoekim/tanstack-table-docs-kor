---
title: 설치
---

API를 살펴보기 전에 설정을 완료하세요!

선호하는 npm 패키지 관리자를 사용하여 테이블 어댑터를 종속성으로 설치하세요.

_다음 패키지 중 하나만 설치하세요:_

## React Table

```bash
npm install @tanstack/react-table
```

`@tanstack/react-table` 패키지는 React 16.8, React 17, React 18, React 19와 호환됩니다.

> 참고: React 어댑터는 React 19와 함께 작동하지만, React 19와 함께 출시될 새로운 React 컴파일러와는 작동하지 않을 수 있습니다. 이는 향후 TanStack Table 업데이트에서 수정될 수 있습니다.

## Vue Table

```bash
npm install @tanstack/vue-table
```

`@tanstack/vue-table` 패키지는 Vue 3과 호환됩니다.

## Solid Table

```bash
npm install @tanstack/solid-table
```

`@tanstack/solid-table` 패키지는 Solid-JS 1과 호환됩니다.

## Svelte Table

```bash
npm install @tanstack/svelte-table
```

`@tanstack/svelte-table` 패키지는 Svelte 3 및 Svelte 4와 호환됩니다.

> 참고: 아직 Svelte 5에 대한 내장 어댑터는 없지만, 커뮤니티의 사용자 정의 어댑터를 사용하여 Svelte 5와 TanStack Table을 사용할 수 있습니다. 영감을 얻으려면 이 [PR](https://github.com/TanStack/table/pull/5403)을 참조하세요.

## Qwik Table

```bash
npm install @tanstack/qwik-table
```

`@tanstack/qwik-table` 패키지는 Qwik 1과 호환됩니다.

> 참고: Qwik 2를 지원하기 위한 "중대한 변경" 릴리스가 곧 있을 예정입니다. 이는 마이너 버전 증가로 출시되지만 문서화될 것입니다. Qwik 2 자체에는 중대한 변경 사항이 없지만, npm 레지스트리에서 이름이 변경되고 다른 피어 종속성이 필요합니다.

> 참고: 현재 qwik 어댑터는 CSR에서만 작동합니다. 더 많은 개선 사항은 향후 테이블 버전까지 제공되지 않을 수 있습니다.

## Angular Table

```bash
npm install @tanstack/angular-table
```

`@tanstack/angular-table` 패키지는 Angular 17과 호환됩니다. Angular 어댑터는 새로운 Angular Signal 구현을 사용합니다.

## Lit Table

```bash
npm install @tanstack/lit-table
```

`@tanstack/lit-table` 패키지는 Lit 3과 호환됩니다.

## Table Core (프레임워크 없음)

```bash
npm install @tanstack/table-core
```

선호하는 프레임워크(또는 프레임워크의 선호하는 버전)가 목록에 없나요? `@tanstack/table-core` 패키지를 사용하여 자체 코드베이스에서 어댑터를 직접 빌드할 수 있습니다. 일반적으로 상태 관리 및 특정 프레임워크에 대한 렌더링을 위해 얇은 래퍼만 필요합니다. 모든 다른 어댑터의 [소스 코드](https://github.com/TanStack/table/tree/main/packages)를 살펴보세요.
