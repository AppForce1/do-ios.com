---
title: 'From Trace to Fix: Agentic Performance Profiling'
date: '2026-11-11'
time: '11:30'
name: 'Antoine van der Lee'
image: '/images/speakers/2026/antoine.jpeg'
type: 'Talk'
summary: 'Performance work used to be part of the craft. We wrote the code, felt the slowness, and opened Instruments. Now agents write much of our Swift. The code compiles, looks right in review, and nobody has measured what it actually does.'
---

In this talk, we'll start with Xcode Instruments as a manual tool: how it works, what a trace really contains, and why finding the cause of a hang or a slowdown is so hard, even for experienced developers.

Then we'll look at the agent side. Models are moving fast, but context is the real limit, and pasting a .trace file into an agent burns tokens and still produces guesses.
I'll show how I turn traces into structured findings an agent can act on with RocketTrace, and share the benchmark we ran: raw trace versus structured findings.

You'll leave knowing how to read Xcode Instruments trace files, and how to give your agent eyes so it can find, fix, and verify performance issues.

## Antoine van der Lee

Antoine is passionate about contributing to the Swift community. You might know him from his weekly blog posts on his personal blog, SwiftLee, his newsletter, SwiftLee Weekly, or RocketSim, an Xcode Simulator-enhancing app. His contributions to the Apple developer ecosystem have also been recognized by Apple, where he is featured as part of the Apple Developer Community recognition program. He particularly enjoys speaking on best practices for structuring code architecture in a way that creates sustainability, new Swift features, and how iOS developers can be more successful in their work.

Before going indie in 2024, he led the team at WeTransfer as a Staff iOS Engineer and developed several large-scale apps since 2009 (iOS 4!). His most recent work resulted in two brand-new courses: *From Side Project to Going Indie* at [going-indie.com](https://www.going-indie.com) and a course focused on Swift 6 and Concurrency at [swiftconcurrencycourse.com](https://www.swiftconcurrencycourse.com).