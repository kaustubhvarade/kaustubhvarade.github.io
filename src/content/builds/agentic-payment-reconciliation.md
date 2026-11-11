---
title: Agentic payment reconciliation
summary: An AI agent that matches payments across ledgers and statements, flags breaks and explains each one. Built on synthetic data.
status: in-progress
stack: [Python, LLM agents, Google Cloud]
order: 1
cover: recon
---

## The problem

Payment operations teams spend hours matching transactions across ledgers, bank statements and scheme files, then investigating the breaks by hand.

## My approach

An AI agent that pulls the three sources, proposes matches with a confidence score, groups the breaks by likely cause and drafts an explanation for each, for a person to approve. Built entirely on synthetic data.

## Progress log

- Next: generate synthetic ledgers, statements and scheme files
- Then: rule-based matching as a baseline
- Then: the agent that explains each break
