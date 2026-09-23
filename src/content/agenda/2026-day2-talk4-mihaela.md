---
title: "SwiftUI Is One Graph"
date: "2026-11-12"
time: "13:15"
name: "Mihaela Mihaljevic"
image: "/images/speakers/2026/mihaela.webp"
type: "Talk"
summary: "SwiftUI is a demand-driven graph, not a diffed view tree — measured against the shipping framework and Apple’s patents, then rebuilt in pure Swift."
---

Most of us ship SwiftUI daily and still describe it with metaphors: a view tree that gets diffed, magic that just re-renders. I wanted the real thing, so I came at it from two directions that cannot collude. I measured the shipping framework's behavior until it was predictable, and I read Apple's granted patent line by line. When the black box and Apple's own description agree, you are no longer guessing.

What they describe together is one demand-driven graph. Not a diffed tree, but attributes that each cache a value and a rule, edges discovered by watching what every body reads, and a dirty cone that recomputes only what truly changed. From that single idea the confusing parts fall out cleanly: why state survives a rebuild, why SwiftUI coalesces ten labels into one layer instead of eleven, and why a spring is just a damped oscillator sampled every frame.

Then I go one step past a normal internals talk. To be sure I had it right, I rebuilt the engine, pure Swift from primitives, and verified each piece against the real framework as an oracle. That is where the confidence comes from, and it is what lets me show you the machine as it actually is, not the magic.

## Mihaela Mihaljevic

Mihaela is a Swift engineer who works from first principles: to understand a framework, she rebuilds it and measures parity against the original. That habit produced SlayerMotion, a from-scratch pure-Swift reimplementation of Apple's UI, graphics, and motion pipeline. She writes about Swift internals at [aleahim.com](https://aleahim.com).
