import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2rem'}}>
          <Link
            className="button button--secondary button--lg"
            to="/introduction">
            번역본 보기
          </Link>
          <Link
            className="button button--lg button--primary"
            to="https://tanstack.com/table/latest"
            style={{textAlign: 'center', fontSize: '1rem'}}>
            영문 공식 문서 보기 🌐
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - 한국어 번역 문서`}
      description="TanStack Table 공식 문서의 한국어 번역 프로젝트입니다. React, Vue, Solid 등 다양한 프레임워크를 위한 테이블 라이브러리 문서를 한국어로 제공합니다.">
      <HomepageHeader />
      <main>
        <div className="container margin-vert--lg text--center">
          <div className="row">
            <div className="col">
              <h2>TanStack Table 한국어 번역 프로젝트</h2>
              <p>
                이 사이트는 <a href="https://tanstack.com/table/latest" target="_blank" rel="noopener noreferrer">TanStack Table</a>의
                공식 문서를 한국어로 번역한 커뮤니티 프로젝트입니다. <br /> 한국어 사용자들이 더 쉽게 TanStack Table을 이해하고
                활용할 수 있도록 돕는 것을 목표로 합니다.
              </p>
              <p>
                번역에 기여하고 싶으시다면 <a href="https://github.com/joonhoekim/tanstack-table-docs-kor" target="_blank" rel="noopener noreferrer">GitHub 저장소</a>를
                방문해주세요.
              </p>
            </div>
          </div>
        </div>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
