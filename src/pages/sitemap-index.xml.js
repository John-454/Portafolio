import { getCollection } from 'astro:content';

export async function GET({ site }) {
  const projects = await getCollection('projects');

  const staticPages = [
    '',
    '/projects/',
    '/about/',
    '/experience/',
    '/services/',
    '/contact/',
    '/privacy/',
    '/terms/',
  ];

  const projectUrls = projects.map((project) => `/projects/${project.slug}/`);

  const allUrls = [...staticPages, ...projectUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${new URL(url, site).toString()}</loc>
    <changefreq>${url === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${url === '' ? '1.0' : '0.8'}</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${new URL(url, site).toString()}" />
    <xhtml:link rel="alternate" hreflang="en" href="${new URL(url, site).toString()}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${new URL(url, site).toString()}" />
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
