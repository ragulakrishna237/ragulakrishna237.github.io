import type { APIRoute } from 'astro';
import { projects, projectHref, siteUrl } from '../data/site';

export const prerender = true;

const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (character) => {
    const map: Record<string, string> = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      "'": '&apos;',
      '"': '&quot;',
    };
    return map[character] ?? character;
  });

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL(siteUrl);
  const paths = [
    '/',
    '/work/',
    '/llms.txt',
    ...projects.map(projectHref),
    ...projects.flatMap((project) => (project.walkthrough ? [project.walkthrough] : [])),
  ];
  const urls = paths
    .map(
      (path) => `  <url>
    <loc>${escapeXml(new URL(path, origin).href)}</loc>
    <changefreq>weekly</changefreq>
  </url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
