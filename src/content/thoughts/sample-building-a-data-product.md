---
title: Building a data product, step by step
summary: From finding the first consumer to a governed release, in five stages.
date: 2026-10-24
type: essay
topics: [data-products, platforms]
series: Data products 101
part: 2
---

## Start with one consumer and one decision

Every data product I've seen succeed began with a named consumer and a decision they make again and again: a risk team setting limits, or an operations lead choosing which payments to investigate.

Write that decision down. It becomes the test for every choice that follows.

## Define the contract before the pipeline

Agree what each field means, how fresh it must be and what quality is good enough, before anyone writes transformation code.

The contract is the product. The pipeline is how you deliver it.

## Build the thinnest useful version

Ship the fields the first consumer needs, not every field the source system holds. A narrow product that people trust beats a wide one they question.

## Make quality visible

Publish the checks that run on every release, and their results, where consumers can see them. Trust grows when people can see why the data deserves it.

## Release, then govern the change

Version the contract. When a definition changes, consumers should hear about it before their reports do.
