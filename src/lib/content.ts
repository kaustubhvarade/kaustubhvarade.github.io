import { getCollection, type CollectionEntry } from 'astro:content';
import { TOPIC_LABELS, type TopicId } from '../data/topics';

export type Thought = CollectionEntry<'thoughts'>;
export type Build = CollectionEntry<'builds'>;

// Drafts show on your computer (npm run dev) but never on the live site.
const visible = (draft: boolean) => import.meta.env.DEV || !draft;

export async function getThoughts(): Promise<Thought[]> {
  const all = await getCollection('thoughts', ({ data }) => visible(data.draft));
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getBuilds(): Promise<Build[]> {
  const all = await getCollection('builds', ({ data }) => visible(data.draft));
  return all.sort((a, b) => a.data.order - b.data.order);
}

export const TYPE_LABELS: Record<string, string> = {
  essay: 'Essay',
  'case-study': 'Case study',
  video: 'Video',
  talk: 'Talk',
};

export const STATUS_LABELS: Record<string, string> = {
  'in-progress': 'In progress',
  live: 'Live',
  concept: 'Concept',
};

export const isMedia = (t: Thought) => t.data.type === 'video' || t.data.type === 'talk';

export const topicLabels = (ids: readonly TopicId[]) => ids.map((id) => TOPIC_LABELS[id]).join(' · ');

export function formatDate(d: Date) {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}

export function lengthLabel(t: Thought) {
  if (t.data.duration) return t.data.duration;
  const words = (t.body ?? '').split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

export const ctaLabel = (t: Thought) => (isMedia(t) ? 'Watch' : 'Read');

export function youtubeId(url?: string) {
  if (!url) return undefined;
  const match = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
  return match?.[1];
}
