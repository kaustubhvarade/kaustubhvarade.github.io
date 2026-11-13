import { getCollection, type CollectionEntry } from 'astro:content';
import { TOPIC_LABELS, type TopicId } from '../data/topics';
import { THOUGHTS_ORDER, HOME_THOUGHTS, BUILDS_ORDER, HOME_BUILDS } from '../data/curation';

export type Thought = CollectionEntry<'thoughts'>;
export type Build = CollectionEntry<'builds'>;

// Drafts show on your computer (npm run dev) but never on the live site.
const visible = (draft: boolean) => import.meta.env.DEV || !draft;

// Stops the build if a curation list names a file that doesn't exist,
// repeats a name, or has too many entries.
function checkList(name: string, list: readonly string[], ids: Set<string>, max?: number) {
  const unknown = list.filter((id) => !ids.has(id));
  if (unknown.length) {
    throw new Error(`src/data/curation.ts → ${name} names files that don't exist: ${unknown.join(', ')}`);
  }
  const repeated = list.filter((id, i) => list.indexOf(id) !== i);
  if (repeated.length) {
    throw new Error(`src/data/curation.ts → ${name} lists the same file twice: ${repeated.join(', ')}`);
  }
  if (max && list.length > max) {
    throw new Error(`src/data/curation.ts → ${name} can hold at most ${max} names; it has ${list.length}`);
  }
}

// Your order first is reversed here on purpose: unlisted items come first
// (sorted by the fallback), then the items in your list, in your order.
function curate<T extends { id: string }>(items: T[], order: readonly string[], fallback: (a: T, b: T) => number): T[] {
  const unlisted = items.filter((item) => !order.includes(item.id)).sort(fallback);
  const listed = order
    .map((id) => items.find((item) => item.id === id))
    .filter((item): item is T => Boolean(item));
  return [...unlisted, ...listed];
}

// Your homepage picks, topped up from the ordered list if a pick is unavailable.
function pickHome<T extends { id: string }>(ordered: T[], picks: readonly string[], count = 3): T[] {
  const chosen = picks
    .map((id) => ordered.find((item) => item.id === id))
    .filter((item): item is T => Boolean(item));
  for (const item of ordered) {
    if (chosen.length >= count) break;
    if (!chosen.includes(item)) chosen.push(item);
  }
  return chosen.slice(0, count);
}

export async function getThoughts(): Promise<Thought[]> {
  const everything = await getCollection('thoughts');
  const ids = new Set(everything.map((t) => t.id));
  checkList('THOUGHTS_ORDER', THOUGHTS_ORDER, ids);
  checkList('HOME_THOUGHTS', HOME_THOUGHTS, ids, 3);
  const shown = everything.filter(({ data }) => visible(data.draft));
  return curate(shown, THOUGHTS_ORDER, (a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getBuilds(): Promise<Build[]> {
  const everything = await getCollection('builds');
  const ids = new Set(everything.map((b) => b.id));
  checkList('BUILDS_ORDER', BUILDS_ORDER, ids);
  checkList('HOME_BUILDS', HOME_BUILDS, ids, 3);
  const shown = everything.filter(({ data }) => visible(data.draft));
  return curate(shown, BUILDS_ORDER, (a, b) => a.data.order - b.data.order);
}

export async function getHomeThoughts(): Promise<Thought[]> {
  return pickHome(await getThoughts(), HOME_THOUGHTS);
}

export async function getHomeBuilds(): Promise<Build[]> {
  return pickHome(await getBuilds(), HOME_BUILDS);
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
