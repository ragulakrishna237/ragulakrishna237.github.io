import type { APIRoute } from 'astro';
import {
  person,
  headline,
  summary,
  seeking,
  knowsAbout,
  projects,
  faqs,
  siteUrl,
  identityLinks,
  projectHref,
} from '../data/site';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL(siteUrl);
  const work = projects
    .map(
      (project) =>
        `- ${project.name}: ${project.scope} ${new URL(projectHref(project), origin).href} ${project.repo}`,
    )
    .join('\n');
  const questions = faqs
    .map((faq) => `### ${faq.question}\n\n${faq.answer}`)
    .join('\n\n');
  const roles = seeking.map((role) => `- ${role}`).join('\n');
  const topics = knowsAbout.map((topic) => `- ${topic}`).join('\n');
  const links = identityLinks()
    .map((link) => `- ${link.label}: ${link.href}`)
    .join('\n');

  const body = `# ${person.name}

> ${headline}

## Canonical pages

- Homepage: ${new URL('/', origin).href}
- Work: ${new URL('/work/', origin).href}
- LLM profile: ${new URL('/llms.txt', origin).href}
- GitHub: ${person.github}${person.linkedin ? `\n- LinkedIn: ${person.linkedin}` : ''}

## Profile

${summary}

## I'm looking for

${roles}

## Selected work

${work}

## What I work with

${topics}

## Questions I get asked

${questions}

## Contact

${links}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
