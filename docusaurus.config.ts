import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'TanStack Table KOR',
  tagline: 'TanStack Table 공식 문서의 한국어 번역 프로젝트',
  favicon: 'img/favicon.ico',
  trailingSlash: true,

  // Set the production url
  url: 'https://joonhoekim.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/tanstack-table-docs-kor/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'joonhoekim', // Usually your GitHub org/user name.
  projectName: 'tanstack-table-docs-kor', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/joonhoekim/tanstack-table-docs-kor/tree/main/',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  // 로컬 검색 플러그인 추가
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        // 한국어 검색 지원을 위한 설정
        hashed: true,
        language: ["en", "ko"],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        docsRouteBasePath: "/",
      }),
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/favicon.ico',
    navbar: {
      title: '',
      logo: {
        alt: 'TanStack Table Logo',
        src: 'img/logo.svg',
      },
      items: [

        {
          to: '/introduction',
          label: '시작하기',
          position: 'left',
        },
        {
          to: '/guide/data',
          label: '핵심 가이드',
          position: 'left',
        },
        {
          to: '/guide/column-ordering',
          label: '기능 가이드',
          position: 'left',
        },
        {
          to: '/api/core/column-def',
          label: '핵심 API',
          position: 'left',
        },
        {
          to: '/api/features/column-filtering',
          label: '기능 API',
          position: 'left',
        },
        {
          href: 'https://github.com/joonhoekim/tanstack-table-docs-kor',
          label: '번역 GitHub',
          position: 'left',
        },
        {
          href: 'https://tanstack.com/table/latest',
          label: '영어 문서',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '문서',
          items: [
            {
              label: '번역 프로젝트 소개',
              to: '/intro',
            },
          ],
        },
        {
          title: '커뮤니티',
          items: [
            {
              label: 'Tanstack Discord',
              href: 'https://discord.com/invite/WrRKjPJ',
            },
          ],
        },
        {
          title: '더 보기',
          items: [
            {
              label: 'TanStack 공식 사이트',
              href: 'https://tanstack.com/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/TanStack/table',
            },
          ],
        },
      ],
      // copyright: 'TanStack Table KOR 번역 프로젝트',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
