export const siteUrl = 'https://ragulakrishna237.github.io';

export const person = {
  name: 'Saikrishna Ragula',
  alternateName: 'ragulakrishna237',
  jobTitle: 'Python engineer — quant systems, market data, and trading infrastructure',
  description:
    'I build production-shaped trading systems: strategy runtimes, market-data services, order management, and the data paths that connect them.',
  image: `${siteUrl}/profile.jpg`,
  email: '',
  location: '',
  github: 'https://github.com/ragulakrishna237',
  linkedin: 'https://www.linkedin.com/in/saikrishna-r-3a415883/',
};

export const headline =
  'I build trading infrastructure: strategy runtimes, market data, and order systems.';

export const summary =
  'I design Python systems where researchers write strategy logic and the platform owns lifecycle, market data, execution, risk, sandboxing, and telemetry. My public work is a three-repo trading stack: a strategy IoC container, a FastAPI market-data vendor, and an order-management service with kill switches and audit trails.';

export const seeking = [
  'Quant Developer / Quantitative Engineer',
  'Trading Systems / Platform Engineer',
  'Market Data Engineer',
  'Python Backend Engineer (markets, fintech)',
  'Data Engineer (streaming, finance)',
];

export const knowsAbout = [
  'Python',
  'Quantitative trading systems',
  'Market data',
  'FastAPI',
  'WebSockets',
  'Apache Kafka',
  'PostgreSQL',
  'Docker',
  'Prometheus',
  'Inversion of Control',
  'Risk controls',
  'Order management',
  'Telemetry',
];

export type Project = {
  name: string;
  slug: string;
  scope: string;
  detail: string;
  repo: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    name: 'quant_platform',
    slug: 'quant-platform',
    scope:
      'I built a Python trading framework that owns the main loop. Quants implement strategy hooks; my container handles market data, execution, risk, process sandboxing, and telemetry.',
    detail:
      'I used Inversion of Control for systematic trading. The strategy interface covers on_start, on_market_data, on_timer, and on_fill. My runtime loads strategies, isolates failures so one bad strategy cannot kill the container, and keeps platform code behind a stable quant_api boundary.',
    repo: 'https://github.com/ragulakrishna237/quant_platform',
    featured: true,
  },
  {
    name: 'trading-platform',
    slug: 'trading-platform',
    scope:
      'I built an order-management service with an enterprise control plane: idempotent orders, position queries, audit rows on every state change, and an admin kill switch.',
    detail:
      'I designed this as the firm OMS, not a strategy host. The order FSM runs NEW → PENDING_RISK → PENDING_FILL → FILLED, with reject and cancel paths. My market-data client handles startup backoff, mid-stream reconnects, sequence-gap detection, and stale-data flags for risk layers.',
    repo: 'https://github.com/ragulakrishna237/trading-platform',
    featured: true,
  },
  {
    name: 'market-data-service',
    slug: 'market-data-service',
    scope:
      'I built a standalone FastAPI/WebSocket vendor: sequenced ticks, REST snapshots, ring-buffer replay, health checks, Prometheus metrics, and Docker.',
    detail:
      'I kept it stateless so I can kill and restart it freely. It emits ticks with seq and ts_event, heartbeats when idle, snapshots by symbol, and replay from a per-symbol ring buffer. This is the external feed the rest of my stack does not control.',
    repo: 'https://github.com/ragulakrishna237/market-data-service',
    featured: true,
  },
  {
    name: 'streaming-service',
    slug: 'streaming-service',
    scope:
      'I built a Kafka producer/consumer path with a Dockerized broker and a FastAPI UI so I can watch messages move in real time.',
    detail:
      'I persist scraped source data, then stream it to a Kafka topic. Separate producer, consumer, and visualization processes make the pipeline inspectable — the same production-grade parameters (broker isolation, topic boundaries, consumer lag) I use in market-data ingestion.',
    repo: 'https://github.com/ragulakrishna237/streaming-service-',
    featured: false,
  },
  {
    name: 'storage-engine',
    slug: 'storage-engine',
    scope:
      'I built hands-on modules for PostgreSQL (and planned MongoDB, DynamoDB, Cassandra) so storage choice stays an explicit engineering decision.',
    detail:
      'I run Docker Compose Postgres with schema samples, CRUD, and join patterns. I want to know when a relational engine is the right default versus a document, key-value, or wide-column store in a trading stack.',
    repo: 'https://github.com/ragulakrishna237/storage-engine',
    featured: false,
  },
  {
    name: 'apollo-data-project',
    slug: 'apollo-data-project',
    scope:
      'I built an Apollo.io API client that pulls finance and trading organizations, buckets them by headcount, and emits LinkedIn-ready CSVs.',
    detail:
      'I run authenticated search across Northeast US finance keywords. I sort and bucket the output so firm lists stay usable for research rather than a raw dump.',
    repo: 'https://github.com/ragulakrishna237/apollo-data-project',
    featured: false,
  },
];

export const faqs = [
  {
    question: 'Who is Saikrishna Ragula?',
    answer:
      'I am Saikrishna Ragula, a Python engineer. I build trading infrastructure: strategy runtimes, market-data services, and order-management systems. Researchers write strategy logic; my platform owns lifecycle, execution, risk, sandboxing, and telemetry.',
  },
  {
    question: 'What jobs is Saikrishna Ragula looking for?',
    answer:
      'I am looking for Quant Developer, Quantitative Engineer, Trading Systems / Platform Engineer, Market Data Engineer, Python backend roles in markets or fintech, and Data Engineer roles focused on streaming finance data.',
  },
  {
    question: 'What trading systems has Saikrishna Ragula built?',
    answer:
      'I built quant_platform as an inversion-of-control strategy runtime, trading-platform as an order-management service with kill switches and audit trails, and market-data-service as a FastAPI/WebSocket vendor with sequenced ticks, snapshots, replay, and Prometheus metrics.',
  },
  {
    question: 'What stack does Saikrishna Ragula use?',
    answer:
      'I work in Python with FastAPI, WebSockets, Apache Kafka, PostgreSQL, Docker, and Prometheus. I design inversion-of-control runtimes, order-state machines, risk controls, and telemetry for systematic trading systems.',
  },
  {
    question: "Where is Saikrishna Ragula's canonical profile?",
    answer:
      'My canonical site is https://ragulakrishna237.github.io/. GitHub is https://github.com/ragulakrishna237. LinkedIn is https://www.linkedin.com/in/saikrishna-r-3a415883/.',
  },
];

export const pages = [
  { path: '/', label: 'Home', description: headline },
  {
    path: '/work/',
    label: 'Work',
    description: 'My public work in trading systems, market data, and Python infrastructure.',
  },
] as const;

export const projectHref = (project: Project) => `/work/${project.slug}/`;

export const identityLinks = () => {
  const links: { label: string; href: string; rel: string; icon: 'github' | 'linkedin' }[] = [
    { label: 'GitHub', href: person.github, rel: 'me noopener', icon: 'github' },
  ];
  if (person.linkedin) {
    links.push({ label: 'LinkedIn', href: person.linkedin, rel: 'me noopener', icon: 'linkedin' });
  }
  return links;
};

export const sameAs = () => {
  const urls = [person.github];
  if (person.linkedin) urls.push(person.linkedin);
  return urls;
};

export const personId = `${siteUrl}/#saikrishna-ragula`;

export function personJsonLd() {
  return {
    '@type': 'Person',
    '@id': personId,
    name: person.name,
    alternateName: person.alternateName,
    jobTitle: person.jobTitle,
    description: person.description,
    url: `${siteUrl}/`,
    image: person.image,
    ...(person.email ? { email: `mailto:${person.email}` } : {}),
    ...(person.location ? { homeLocation: { '@type': 'Place', name: person.location } } : {}),
    knowsAbout,
    sameAs: sameAs(),
    seeks: seeking.map((role) => ({
      '@type': 'Demand',
      name: role,
    })),
  };
}

export function softwareSourceCodeJsonLd(project: Project) {
  const url = `${siteUrl}${projectHref(project)}`;
  return {
    '@type': 'SoftwareSourceCode',
    '@id': `${url}#code`,
    name: project.name,
    description: project.scope,
    url,
    codeRepository: project.repo,
    programmingLanguage: 'Python',
    author: { '@id': personId },
  };
}

export function faqJsonLd() {
  return {
    '@type': 'FAQPage',
    '@id': `${siteUrl}/#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function graphJsonLd(
  pageUrl: string,
  pageName: string,
  extra: Record<string, unknown>[] = [],
) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: `${person.name} — portfolio`,
        url: `${siteUrl}/`,
        description: person.description,
        inLanguage: 'en',
        publisher: { '@id': personId },
      },
      personJsonLd(),
      {
        '@type': 'ProfilePage',
        '@id': `${pageUrl}#page`,
        url: pageUrl,
        name: pageName,
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': personId },
        mainEntity: { '@id': personId },
      },
      ...extra,
    ],
  };
}
