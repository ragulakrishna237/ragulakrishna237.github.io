import discovered from './discovered-repos.json';

export const siteUrl = 'https://ragulakrishna237.github.io';

export const person = {
  name: 'Saikrishna Ragula',
  alternateName: 'ragulakrishna237',
  jobTitle: 'Data scientist — credit risk, fraud strategy, and data platforms',
  description:
    'I build production-shaped Python systems: first-principles CECL reserves, leakage-safe fraud decisioning, ELT warehouses, and Delta Lake pipelines.',
  image: `${siteUrl}/profile.jpg`,
  email: '',
  location: '',
  github: 'https://github.com/ragulakrishna237',
  linkedin: 'https://www.linkedin.com/in/saikrishna-r-3a415883/',
};

export const headline =
  'I build credit-risk and fraud models, and the data platforms that feed them.';

export const summary =
  'I design Python models where a dollar number stays a probability a reviewer can defend. My public work is a first-principles CECL reserve and a leakage-safe fraud strategy with three-tier dollar decisioning. I also built Airflow and dbt ELT, a local PySpark Delta Lake, and a FastAPI CI/CD image published to GHCR.';

export const seeking = [
  'Data Scientist',
  'Credit Risk / Fraud Model Developer',
  'Quant Developer / Quantitative Engineer',
  'Python Backend Engineer (fintech, credit risk)',
  'Data Engineer (warehouses, finance)',
];

export const knowsAbout = [
  'Python',
  'CECL / expected credit loss',
  'Fraud decisioning',
  'Survival models',
  'XGBoost',
  'Apache Airflow',
  'dbt',
  'Delta Lake',
  'PySpark',
  'PostgreSQL',
  'FastAPI',
  'Docker',
  'GitHub Actions',
];

export type Project = {
  name: string;
  slug: string;
  scope: string;
  detail: string;
  repo: string;
  featured: boolean;
  hidden?: boolean;
};

type DiscoveredRepo = {
  name: string;
  html_url: string;
  description: string;
  language: string | null;
};

function slugFromName(name: string) {
  return (
    name
      .replace(/_/g, '-')
      .replace(/[^a-zA-Z0-9-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase() || 'repo'
  );
}

function catalogKeys(project: Project) {
  const repoName = project.repo.split('/').filter(Boolean).pop() ?? '';
  return [
    project.name.toLowerCase(),
    project.slug.toLowerCase(),
    repoName.toLowerCase(),
    repoName.replace(/-+$/g, '').toLowerCase(),
  ];
}

function mergeProjects(handwritten: Project[], extra: DiscoveredRepo[]): Project[] {
  const keys = new Set(handwritten.flatMap(catalogKeys));
  const appended: Project[] = [];
  for (const repo of extra) {
    const slug = slugFromName(repo.name);
    const aliases = [
      repo.name.toLowerCase(),
      slug,
      repo.name.replace(/-+$/g, '').toLowerCase(),
    ];
    if (aliases.some((alias) => keys.has(alias))) continue;
    const description = repo.description.trim();
    const scope = description
      ? /^I\b/i.test(description)
        ? description
        : `I built ${repo.name}: ${description}`
      : `I published ${repo.name} as a public repository.`;
    appended.push({
      name: repo.name,
      slug,
      scope,
      detail:
        'GitHub listed this repo after I last edited this site. I have not written a longer first-person note for it yet.',
      repo: repo.html_url,
      featured: false,
    });
    for (const alias of aliases) keys.add(alias);
  }
  return [...handwritten, ...appended];
}

const catalog: Project[] = [
  {
    name: 'quant_platform',
    slug: 'quant-platform',
    scope:
      'I built a Python trading framework that owns the main loop. Quants implement strategy hooks; my container handles market data, execution, risk, process sandboxing, and telemetry.',
    detail:
      'I used Inversion of Control for systematic trading. The strategy interface covers on_start, on_market_data, on_timer, and on_fill. My runtime loads strategies, isolates failures so one bad strategy cannot kill the container, and keeps platform code behind a stable quant_api boundary.',
    repo: 'https://github.com/ragulakrishna237/quant_platform',
    featured: false,
    hidden: true,
  },
  {
    name: 'trading-platform',
    slug: 'trading-platform',
    scope:
      'I built an order-management service with an enterprise control plane: idempotent orders, position queries, audit rows on every state change, and an admin kill switch.',
    detail:
      'I designed this as the firm OMS, not a strategy host. The order FSM runs NEW → PENDING_RISK → PENDING_FILL → FILLED, with reject and cancel paths. My market-data client handles startup backoff, mid-stream reconnects, sequence-gap detection, and stale-data flags for risk layers.',
    repo: 'https://github.com/ragulakrishna237/trading-platform',
    featured: false,
    hidden: true,
  },
  {
    name: 'market-data-service',
    slug: 'market-data-service',
    scope:
      'I built a standalone FastAPI/WebSocket vendor: sequenced ticks, REST snapshots, ring-buffer replay, health checks, Prometheus metrics, and Docker.',
    detail:
      'I kept it stateless so I can kill and restart it freely. It emits ticks with seq and ts_event, heartbeats when idle, snapshots by symbol, and replay from a per-symbol ring buffer. This is the external feed the rest of my stack does not control.',
    repo: 'https://github.com/ragulakrishna237/market-data-service',
    featured: false,
    hidden: true,
  },
  {
    name: 'credit-risk-cecl-model',
    slug: 'credit-risk-cecl-model',
    scope:
      'I built a first-principles CECL reserve: discrete-time PD hazard, competing-risk survival, EAD as a rate, and LGD from a discounted recovery curve, assembled as LGD × Σ S_T · PD_T · EAD_T.',
    detail:
      'I chose logistic / hazard regression over a black-box ranker so a dollar reserve stays a probability a reviewer can defend. Tests prove the survival identity, that EAD rejects a dollar vector, and that dropping prepay from survival overstates prime EL. All loan-month data are synthetic.',
    repo: 'https://github.com/ragulakrishna237/credit-risk-cecl-model',
    featured: true,
  },
  {
    name: 'fraud-strategy-model',
    slug: 'fraud-strategy-model',
    scope:
      'I built a leakage-safe fraud strategy: as-of-date features, a shallow XGBoost score, and a three-tier approve / review / decline decision that is a dollar number, not an AUC.',
    detail:
      'Every feature takes as_of_date so a future burst cannot move historical velocity. I split by application date, Platt-calibrate out of time, and set τ_decline by FN and FP cost. Tests cover leakage, class imbalance, monotone tiers, and a drift funnel that names a seeded broken feature.',
    repo: 'https://github.com/ragulakrishna237/fraud-strategy-model',
    featured: true,
  },
  {
    name: 'airflow-dbt-warehouse',
    slug: 'airflow-dbt-warehouse',
    scope:
      'I built an Airflow-orchestrated ELT: extract, load raw orders, then dbt run and test against a star schema I can retarget across warehouses.',
    detail:
      'CI proves the Postgres target. Models are written once and swapped with --target. Re-running a day is safe: the generator is a function of seed and as_of_date, and the loader upserts dimensions then deletes and inserts facts for that order_date.',
    repo: 'https://github.com/ragulakrishna237/airflow-dbt-warehouse',
    featured: false,
  },
  {
    name: 'databricks-delta-lake',
    slug: 'databricks-delta-lake',
    scope:
      'I built a local PySpark + Delta bronze / silver / gold pipeline with append, MERGE, quarantine, and VERSION AS OF time travel.',
    detail:
      'Bronze stays append-only. Silver dedupes on event_id and sends poison rows to quarantine instead of dropping them. Gold is daily order_count and amount_sum, not a copied warehouse star schema. Local tests run PySpark; the DLT file is workspace-only and is not claimed as executed here.',
    repo: 'https://github.com/ragulakrishna237/databricks-delta-lake',
    featured: false,
  },
  {
    name: 'ci-cd-pipeline-demo',
    slug: 'ci-cd-pipeline-demo',
    scope:
      'I built a working CI/CD path for a small FastAPI service: ruff, unit and integration tests, then a Docker image published to GHCR.',
    detail:
      'The app is two endpoints on purpose. CI runs on push and PR. CD re-runs tests, builds the image, and pushes ghcr.io/ragulakrishna237/ci-cd-pipeline-demo. There is no live host; GHCR is the artifact.',
    repo: 'https://github.com/ragulakrishna237/ci-cd-pipeline-demo',
    featured: false,
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
    hidden: true,
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
    hidden: true,
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
    hidden: true,
  },
];

export const projects: Project[] = mergeProjects(catalog, discovered.repos ?? []).filter(
  (project) => !project.hidden,
);

export const faqs = [
  {
    question: 'Who is Saikrishna Ragula?',
    answer:
      'I am Saikrishna Ragula, a data scientist and Python engineer. I build credit-risk and fraud models: a first-principles CECL reserve and a leakage-safe fraud strategy whose decision is a dollar number. I also ship warehouse, Delta Lake, and CI/CD work in public repos.',
  },
  {
    question: 'What jobs is Saikrishna Ragula looking for?',
    answer:
      'I am looking for Data Scientist roles, Credit Risk / Fraud model work, Quant Developer / Quantitative Engineer roles, Python backend roles in fintech or credit risk, and Data Engineer roles focused on warehouses and finance data.',
  },
  {
    question: 'What has Saikrishna Ragula built?',
    answer:
      'I built credit-risk-cecl-model as a first-principles CECL reserve (LGD × Σ S_T · PD_T · EAD_T) and fraud-strategy-model as leakage-safe dollar decisioning. I also built airflow-dbt-warehouse as retargetable ELT, databricks-delta-lake as bronze/silver/gold with MERGE and time travel, and ci-cd-pipeline-demo as FastAPI CI/CD that publishes to GHCR.',
  },
  {
    question: 'What stack does Saikrishna Ragula use?',
    answer:
      'I work in Python with logistic / hazard models, XGBoost, Apache Airflow, dbt, PySpark, Delta Lake, PostgreSQL, FastAPI, Docker, and GitHub Actions. I design CECL identities, leakage-safe features, and CI/CD that publishes images to GHCR.',
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
    description:
      'My public work in credit-risk models, fraud strategy, warehouses, and Python data platforms.',
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
