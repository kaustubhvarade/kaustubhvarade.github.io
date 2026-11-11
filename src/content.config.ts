import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TOPIC_IDS } from './data/topics';

const thoughts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/thoughts' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    type: z.enum(['essay', 'case-study', 'video', 'talk']),
    topics: z.array(z.enum(TOPIC_IDS)).min(1).max(3),
    series: z.string().optional(),
    part: z.number().int().positive().optional(),
    event: z.string().optional(),
    youtube: z.string().url().optional(),
    duration: z.string().optional(),
    takeaways: z.array(z.string()).max(5).optional(),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const builds = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/builds' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.enum(['in-progress', 'live', 'concept']),
    stack: z.array(z.string()).min(1),
    started: z.string().optional(),
    link: z.string().url().optional(),
    linkLabel: z.string().optional(),
    order: z.number().default(100),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { thoughts, builds };
