import { defineCollection, z } from 'astro:content';

export const projectSchema = z.object({
  name: z.string(),
  description: z.string(),
  problem: z.string(),
  solution: z.string(),
  /**
   * Resultado medible y opcional del proyecto (ej. "Redujo un 98% del
   * problema planteado"). Se muestra destacado en tarjeta y detalle.
   */
  result: z.string().optional(),
  technologies: z.array(z.string()),
  architecture: z.string(),
  features: z.array(z.string()),
  status: z.enum(['En producción', 'En desarrollo', 'Archivado', 'Completado']),
  role: z.string(),
  technicalChallenges: z.array(z.string()),
  startDate: z.string(),
  endDate: z.string().optional(),
  github: z.string().url().optional(),
  demo: z.string().url().optional(),
  images: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  order: z.number().default(0),
});

export const collections = {
  projects: defineCollection({
    type: 'content',
    schema: projectSchema,
  }),
};

/**
 * Tipo del frontmatter de los proyectos.
 *
 * `CollectionEntry<'projects'>['data']` puede resolver a `any` según cómo
 * Astro genere `.astro/types.d.ts`, así que se infiere aquí directamente
 * desde el zod schema para tener tipado real en los componentes.
 */
export type ProjectData = z.infer<typeof projectSchema>;
