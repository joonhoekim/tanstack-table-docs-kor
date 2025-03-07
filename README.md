# TanStack Table 한국어 문서

이 저장소는 [TanStack Table](https://tanstack.com/table/latest) 공식 문서의 한국어 번역 프로젝트입니다.
한국어 사용자들이 TanStack Table을 더 쉽게 이해하고 활용할 수 있도록 돕는 것을 목표로 합니다.

## 프로젝트 소개

TanStack Table(이전의 React Table)은 React, Vue, Solid 등 다양한 프레임워크에서 사용할 수 있는 강력한 테이블 라이브러리입니다.
이 프로젝트는 영어로 된 공식 문서를 한국어로 번역하여 제공합니다.

### 번역 범위

[공식 문서](https://github.com/TanStack/table/tree/main/docs)가 번역의 범위입니다.
단, StackBlitz로 제공되는 예시들은 제공되지 않습니다.

## 기여하기

이 프로젝트에 기여하고 싶으시다면 다음 방법을 참고해주세요:

### PR 제출
1. 이 저장소를 포크(Fork)합니다.
2. 변경 사항을 작업합니다.
3. Pull Request를 제출합니다.

### Issue 제출
번역 작업에 대해 아쉬운 점을 Issue로 알려주세요.

## 웹사이트 개발 정보
이 웹사이트는 정적 웹 사이트 생성기인 [Docusaurus](https://docusaurus.io/)를 사용하여 구축되었습니다.

### Sidebar 자동 생성

이 프로젝트는 `docs/config.json` 파일을 기반으로, 원 문서와 유사한 사이드바를 자동 생성합니다. `generateSidebar.js` 스크립트가 이 작업을 수행하며, `config.json`의 섹션 구조를 읽어 `sidebars.ts` 파일을 생성합니다. 이 스크립트는 `package.json`의 `prebuild` 및 `prestart` 스크립트에 포함되어 있어, 빌드 또는 로컬 개발 서버 시작 전에 자동으로 실행됩니다.

### 로컬 개발 및 배포

1. 의존성 설치
```bash
yarn
```

2. 로컬 개발
```bash
yarn start
```
이 명령어는 로컬 개발 서버를 시작하고 브라우저 창을 엽니다. 대부분의 변경 사항은 서버를 다시 시작하지 않고도 실시간으로 반영됩니다.

3. 빌드
```bash
yarn build
```
이 명령어는 정적 콘텐츠를 `build` 디렉토리에 생성하며, 빌드 결과물로 정적 콘텐츠 호스팅 서비스를 사용하여 제공할 수 있습니다.
명령어의 사용법에 대한 자세한 내용은 [docusaurus 가이드](https://docusaurus.io/docs/deployment)를 참조하세요.

4. 배포

배포는 github actions를 통해 자동으로 git pages로 배포되고 있습니다.
현재 배포 설정을 확인하시려면 [이 코드](https://github.com/joonhoekim/tanstack-table-docs-kor/blob/main/.github/workflows/deploy.yml)를 참조하세요.

## 라이선스
이 프로젝트는 원본 TanStack Table과 동일한 MIT 라이선스를 따릅니다.
