---
title: Designing a real-time payments ledger
summary: The trade-offs between consistency, latency and auditability when every payment must post in seconds.
date: 2026-11-08
type: essay
topics: [system-design, payments-modernisation]
---

## Why real time changes the design

When payments post in seconds, a nightly batch can no longer catch and correct mistakes before anyone notices them.

The ledger becomes the live source of truth, so its design decisions show up directly in what customers see.

## Consistency comes first

A ledger must never show money that doesn't exist. That makes strong consistency on balance updates non-negotiable, even at the cost of some latency.

## Append, never update

Record every movement as an immutable entry and derive balances from those entries. The audit trail then comes for free, and corrections become new entries rather than edits.

## Where eventual consistency is fine

Reporting, analytics and notifications can lag by a few seconds without harm. Keeping them off the posting path keeps the core fast and simple.
