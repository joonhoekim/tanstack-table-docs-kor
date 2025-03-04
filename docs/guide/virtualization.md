---
title: 가상화 가이드
---

## 예제

구현으로 바로 가고 싶으신가요? 다음 예제를 확인하세요:

- [가상화된 열](../../framework/react/examples/virtualized-columns)
- [가상화된 행 (동적 행 높이)](../../framework/react/examples/virtualized-rows)
- [가상화된 행 (고정 행 높이)](../../../../../virtual/v3/docs/framework/react/examples/table)
- [가상화된 무한 스크롤링](../../framework/react/examples/virtualized-infinite-scrolling)

## API

[TanStack Virtual Virtualizer API](../../../../../virtual/v3/docs/api/virtualizer)

## 가상화 가이드

TanStack Table 패키지에는 기본적으로 가상화 API나 기능이 포함되어 있지 않지만, TanStack Table은 [react-window](https://www.npmjs.com/package/react-window)나 TanStack의 자체 [TanStack Virtual](https://tanstack.com/virtual/v3)과 같은 다른 가상화 라이브러리와 쉽게 연동할 수 있습니다. 이 가이드는 TanStack Table을 TanStack Virtual과 함께 사용하는 몇 가지 전략을 보여줍니다.
