import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '@/data/personal';

export async function GET(context) {
  const projects = await getCollection('projects');
  const sortedProjects = projects.sort(
    (a, b) => new Date(b.data.startDate).getTime() - new Date(a.data.startDate).getTime()
  );

  return rss({
    title: siteConfig.name,
    description: siteConfig.description,
    site: context.site,
    items: sortedProjects.map((project) => ({
      title: project.data.name,
      link: `/projects/${project.slug}/`,
      description: project.data.description,
      pubDate: new Date(project.data.startDate),
      categories: project.data.technologies,
      customData: `<content:encoded><![CDATA[${project.body || project.data.description}]]></content:encoded>`,
    })),
    customData: `<language>es-CO</language><atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml" />`,
  });
}
