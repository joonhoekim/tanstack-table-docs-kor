import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'TanStack Table 한국어 문서',
  tagline: '강력한 헤드리스 테이블 & 데이터그리드',
  favicon: 'img/favicon.ico',

  // Set the production url (UNDER CONSTRUCTION)
  url: 'https://tanstack-table-kor.vercel.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'joonhoekim', // Usually your GitHub org/user name.
  projectName: 'tanstack-table-docs-kor', // Usually your repo name.

  onBrokenLinks: 'throw',
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

  themeConfig: {
    // Replace with your project's social card
    image: 'img/tanstack-table-social-card.jpg',
    navbar: {
      title: 'TanStack Table 한국어 문서',
      logo: {
        alt: 'TanStack Table Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '문서',
        },
        {
          href: 'https://github.com/TanStack/table',
          label: 'TanStack Table GitHub',
          position: 'right',
        },
        {
          href: 'https://github.com/joonhoekim/tanstack-table-docs-kor',
          label: '한국어 문서 GitHub',
          position: 'right',
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
              label: '시작하기',
              to: '/intro',
            },
          ],
        },
        {
          title: '커뮤니티',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.com/invite/WrRKjPJ',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/tanstack',
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
      copyright: `Copyright © ${new Date().getFullYear()} TanStack Table 한국어 문서. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
