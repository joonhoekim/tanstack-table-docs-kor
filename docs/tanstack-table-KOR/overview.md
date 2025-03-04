---
title: 개요
---

TanStack Table의 핵심은 **프레임워크에 구애받지 않음**으로, 사용하는 프레임워크에 관계없이 API가 동일합니다. 프레임워크에 따라 테이블 코어 작업을 쉽게 할 수 있도록 어댑터가 제공됩니다. 사용 가능한 어댑터는 어댑터 메뉴를 참조하세요.

## Typescript

TanStack Table은 [TypeScript](https://www.typescriptlang.org/)로 작성되었지만, 애플리케이션에서 TypeScript를 사용하는 것은 선택 사항입니다 (하지만 코드베이스와 사용자 모두에게 뛰어난 이점을 제공하므로 권장됩니다).

TypeScript를 사용하면 모든 테이블 API와 상태에 대해 최고 수준의 타입 안전성과 편집기 자동 완성을 얻을 수 있습니다.

## 헤드리스

[소개](../introduction) 섹션에서 광범위하게 언급했듯이, TanStack Table은 **헤드리스**입니다. 이는 DOM 요소를 렌더링하지 않으며, 대신 UI/UX 개발자가 테이블의 마크업과 스타일을 제공해야 함을 의미합니다. 이는 React, Vue, Solid, Svelte, Qwik, Angular, 심지어 React Native와 같은 JS-to-native 플랫폼을 포함한 모든 UI 프레임워크에서 사용할 수 있는 테이블을 구축하는 훌륭한 방법입니다.

## 아그노스틱(Agnostic)

TanStack Table은 헤드리스이며 바닐라 JavaScript 코어에서 실행되므로 몇 가지 방식으로 아그노스틱합니다:

1. TanStack Table은 **프레임워크 아그노스틱**으로, 원하는 JavaScript 프레임워크(또는 라이브러리)와 함께 사용할 수 있습니다. TanStack Table은 React, Vue, Solid, Svelte, Qwik에 대한 사용 준비가 된 어댑터를 기본적으로 제공하지만, 필요에 따라 자체 어댑터를 만들 수 있습니다.
2. TanStack Table은 **CSS / 구성 요소 라이브러리 아그노스틱**으로, 원하는 CSS 전략이나 구성 요소 라이브러리와 함께 TanStack Table을 사용할 수 있습니다. TanStack Table 자체는 테이블 마크업이나 스타일을 렌더링하지 않습니다. 직접 가져오세요! Tailwind나 ShadCN을 사용하고 싶으신가요? 문제 없습니다! Material UI나 Bootstrap을 사용하고 싶으신가요? 문제 없습니다! 자체 커스텀 디자인 시스템이 있나요? TanStack Table은 당신을 위해 만들어졌습니다!

## 핵심 객체 및 타입

테이블 코어는 어댑터에 의해 일반적으로 노출되는 다음의 추상화를 사용합니다:

- [데이터](../guide/data) - 테이블에 제공하는 핵심 데이터 배열
- [컬럼 정의](../guide/column-defs): 컬럼과 그 데이터 모델, 디스플레이 템플릿 등을 구성하는 데 사용되는 객체
- [테이블 인스턴스](../guide/tables): 상태와 API를 모두 포함하는 핵심 테이블 객체
- [행 모델](../guide/row-models): 사용 중인 기능에 따라 `데이터` 배열이 유용한 행으로 변환되는 방법
- [행](../guide/rows): 각 행은 해당 행 데이터와 일치하며 행별 API를 제공합니다
- [셀](../guide/cells): 각 셀은 해당 행-컬럼 교차점과 일치하며 셀별 API를 제공합니다
- [헤더 그룹](../guide/header-groups): 각 헤더 그룹은 중첩된 헤더 레벨의 계산된 슬라이스로, 각 그룹은 헤더 그룹을 포함합니다
- [헤더](../guide/headers): 각 헤더는 해당 컬럼 정의와 직접적으로 연관되거나 파생되며 헤더별 API를 제공합니다
- [컬럼](../guide/columns): 각 컬럼은 해당 컬럼 정의와 일치하며 컬럼별 API도 제공합니다

## 기능

TanStack Table은 상상할 수 있는 거의 모든 유형의 테이블을 구축하는 데 도움을 줄 것입니다. 다음 기능에 대한 내장 상태 및 API가 있습니다:

- [컬럼 패싯팅](../guide/column-faceting) - 컬럼 값의 고유 목록 또는 컬럼의 최소/최대 값 나열
- [컬럼 필터링](../guide/column-filtering) - 컬럼의 검색 값을 기반으로 행 필터링
- [컬럼 그룹화](../guide/grouping) - 컬럼을 함께 그룹화하고, 집계를 실행하고, 더 많은 작업 수행
- [컬럼 정렬](../guide/column-ordering) - 컬럼의 순서를 동적으로 변경
- [컬럼 고정](../guide/column-pinning) - 테이블의 왼쪽 또는 오른쪽에 컬럼을 고정(고정)합니다
- [컬럼 크기 조정](../guide/column-sizing) - 컬럼의 크기를 동적으로 변경(컬럼 크기 조정 핸들)
- [컬럼 가시성](../guide/column-visibility) - 컬럼 숨기기/표시
- [글로벌 패싯팅](../guide/global-faceting) - 전체 테이블의 컬럼 값의 고유 목록 또는 최소/최대 값 나열
- [글로벌 필터링](../guide/global-filtering) - 전체 테이블의 검색 값을 기반으로 행 필터링
- [행 확장](../guide/expanding) - 행 확장/축소(하위 행)
- [행 페이지 매김](../guide/pagination) - 행 페이지 매김
- [행 고정](../guide/row-pinning) - 테이블의 상단 또는 하단에 행을 고정(고정)합니다
- [행 선택](../guide/row-selection) - 행 선택/선택 해제(체크박스)
- [행 정렬](../guide/sorting) - 컬럼 값을 기준으로 행 정렬

이것들은 TanStack Table로 구축할 수 있는 기능 중 일부에 불과합니다. TanStack Table과 함께 내장 기능을 추가하여 가능한 더 많은 기능이 있습니다.

[가상화](../guide/virtualization)는 TanStack Table에 내장되지 않은 기능의 예이지만, 다른 라이브러리(예: [TanStack Virtual](https://tanstack.com/virtual/v3))를 사용하고 다른 테이블 렌더링 로직과 함께 추가하여 달성할 수 있습니다.

TanStack Table은 또한 테이블 인스턴스를 수정하여 테이블에 자체 커스텀 로직을 더 통합된 방식으로 추가할 수 있는 [커스텀 기능](../guide/custom-features) (플러그인)을 지원합니다.

물론, 원하는 다른 기능을 테이블에 추가하기 위해 자체 상태와 훅을 작성할 수도 있습니다. TanStack Table 코어의 기능은 성능과 DX에 중점을 둔 견고한 기반일 뿐입니다.
