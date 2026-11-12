---
title: Why banks need data products
summary: Why pipelines and warehouses are no longer enough for reporting and AI.
date: 2026-10-20
type: essay
topics: [data-products, platforms]
series: Data products 101
part: 1
takeaways:
  - "A data product is a dataset run like a product: it has an owner, consumers, a contract and a release cycle."
  - Banks feel the need first, because regulators expect every reported number to be traceable to its source.
  - The shift is less about technology than about who owns each definition.
draft: false
---

## The problem with pipelines

Most banks I've worked with don't lack data. They have warehouses, lakes and hundreds of pipelines. What they lack is data anyone can trust without asking around first.

A risk analyst finds three versions of a customer's balance, each built by a different pipeline for a different report. Nobody owns the definition, so every new use case starts by rebuilding it.

## What a data product is

A data product is a dataset run like a product. It has a named owner and known consumers. It publishes a contract describing what each field means and how fresh it is. Quality checks run on every release, and it has a roadmap.

If a pipeline is plumbing, a data product is the tap: something a consumer can rely on without seeing what sits behind the wall.

## Why banks feel it first

Banks answer to regulators who expect them to show where every reported number comes from. Principles such as BCBS 239 ask for risk data that is accurate, complete, timely and traceable end to end.

Proving that report by report is expensive and fragile. Building it once, inside a governed data product, makes lineage and quality part of the asset rather than an audit scramble.

## What changes for teams

The hardest part isn't technical. It's agreeing who owns a definition like "active customer", and giving that owner the mandate to change it.

In my experience, the first data product succeeds when it's chosen for a consumer with a pressing decision, not for the source system that is easiest to model.

## What comes next

In part 2, I'll walk through building a data product step by step, from finding the first consumer to a governed release.
