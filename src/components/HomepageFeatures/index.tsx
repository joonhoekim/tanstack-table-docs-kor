import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
  id: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: '한국어로 이해하기 쉽게',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        TanStack Table의 공식 문서를 한국어로 번역하여 더 많은 개발자분들이 
        쉽게 이해하고 활용할 수 있도록 노력하고 있습니다.
      </>
    ),
    id: 'easy-korean',
  },
  {
    title: 'LLM을 활용한 문서 번역',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        LLM을 이용해 번역한 문서입니다. 
        중요한 부분은 영어 원문도 함께 참고해주시기 바랍니다.
      </>
    ),
    id: 'latest-docs',
  },
  {
    title: '커뮤니티 기반 프로젝트',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        이 프로젝트는 한국어 사용자 커뮤니티의 기여로 만들어집니다. 
        함께 참여하여 더 나은 번역 문서를 만들어 나가실 수 있습니다.
      </>
    ),
    id: 'community-based',
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props) => (
            <Feature key={props.id} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
