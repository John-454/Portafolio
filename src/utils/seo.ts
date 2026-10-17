export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  noIndex?: boolean;
  noFollow?: boolean;
}

export interface OpenGraphProps {
  title: string;
  description: string;
  url: string;
  siteName: string;
  type: 'website' | 'article';
  image?: string;
  imageAlt?: string;
  locale?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}

export interface TwitterCardProps {
  card: 'summary' | 'summary_large_image';
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  site?: string;
  creator?: string;
}

export function generateOpenGraph(props: OpenGraphProps): Record<string, string> {
  const tags: Record<string, string> = {
    'og:title': props.title,
    'og:description': props.description,
    'og:url': props.url,
    'og:site_name': props.siteName,
    'og:type': props.type,
    'og:locale': props.locale || 'es_CO',
  };

  if (props.image) {
    tags['og:image'] = props.image;
    if (props.imageAlt) tags['og:image:alt'] = props.imageAlt;
  }

  if (props.publishedTime) tags['article:published_time'] = props.publishedTime;
  if (props.modifiedTime) tags['article:modified_time'] = props.modifiedTime;
  if (props.authors?.length) props.authors.forEach((a, i) => (tags[`article:author:${i}`] = a));
  if (props.section) tags['article:section'] = props.section;
  if (props.tags?.length) props.tags.forEach((t, i) => (tags[`article:tag:${i}`] = t));

  return tags;
}

export function generateTwitterCard(props: TwitterCardProps): Record<string, string> {
  const tags: Record<string, string> = {
    'twitter:card': props.card,
    'twitter:title': props.title,
    'twitter:description': props.description,
  };

  if (props.image) {
    tags['twitter:image'] = props.image;
    if (props.imageAlt) tags['twitter:image:alt'] = props.imageAlt;
  }
  if (props.site) tags['twitter:site'] = props.site;
  if (props.creator) tags['twitter:creator'] = props.creator;

  return tags;
}

export function generateJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    ...data,
  });
}

export function generatePersonJsonLd() {
  return generateJsonLd({
    '@type': 'Person',
    name: 'John Chitan',
    url: 'https://johnchitan.dev',
    sameAs: [
      'https://github.com/John-454',
      'https://www.linkedin.com/in/john-deivid-chitan-cordoba-17a2b5336',
    ],
    jobTitle: 'Full Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance / Independent',
    },
    knowsAbout: [
      'TypeScript',
      'Angular',
      'Node.js',
      'MongoDB',
      'GraphQL',
      'Software Architecture',
      'Application Security',
      'DevSecOps',
    ],
  });
}

export function generateWebsiteJsonLd() {
  return generateJsonLd({
    '@type': 'WebSite',
    name: 'John Chitan - Portfolio',
    url: 'https://johnchitan.dev',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://johnchitan.dev/projects?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  });
}

export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return generateJsonLd({
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });
}
