export const TOPIC_IDS = [
  'data-products',
  'core-banking',
  'payments-modernisation',
  'platforms',
  'system-design',
] as const;

export type TopicId = (typeof TOPIC_IDS)[number];

export const TOPIC_LABELS: Record<TopicId, string> = {
  'data-products': 'Data products',
  'core-banking': 'Core banking',
  'payments-modernisation': 'Payments modernisation',
  platforms: 'Platforms',
  'system-design': 'System design',
};

export const TOPIC_MOTIFS: Record<TopicId, string> = {
  'data-products': 'layers',
  'core-banking': 'phone',
  'payments-modernisation': 'card',
  platforms: 'platform',
  'system-design': 'system',
};
