// Your editorial control panel.
// Each name is a Markdown file name in src/content/, without ".md".
//
// ORDER lists: the order cards appear in, top to bottom.
//   A published post that isn't listed appears first, newest first,
//   until you add it here.
// HOME lists: up to 3 picks for the homepage. If a pick is a draft,
//   the next item in the ORDER list fills its place.

export const THOUGHTS_ORDER = [
  'why-banks-need-data-products',
  'sample-building-a-data-product',
  'sample-data-products-business-value',
  'sample-governance-for-data-products',
  'sample-isa-account-opening',
  'sample-real-time-payments-ledger',
  'sample-platform-product-managers',
  'sample-how-a-card-payment-moves',
  'sample-explaining-a-banks-core',
] as const;

export const HOME_THOUGHTS = [
  'why-banks-need-data-products',
  'sample-isa-account-opening',
  'sample-real-time-payments-ledger',
] as const;

export const BUILDS_ORDER = [
  'agentic-payment-reconciliation',
  'compliance-scanner',
  'this-website',
  'sample-open-banking-consent-dashboard',
] as const;

export const HOME_BUILDS = [
  'agentic-payment-reconciliation',
  'compliance-scanner',
  'this-website',
] as const;
