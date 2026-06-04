import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const agendaCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/agenda' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()).optional(),
    name: z.string().optional(),
    time: z.string(),
    image: z.string().optional(),
    type: z.string(),
    summary: z.string().optional(),
  }),
});

export const collections = {
  agenda: agendaCollection,
};
