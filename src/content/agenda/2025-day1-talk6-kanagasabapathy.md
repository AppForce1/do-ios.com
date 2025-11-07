---
title: "Swift Concurrency in 6.2: Patterns & Pitfalls Nobody Told You About"
date: "2025-11-12"
time: "15:30"
name: "Kanagasabapathy Rajkumar"
image: "/images/speakers/2025/kanagasabapathy.jpg"
type: "Talk"
summary: "Swift 6.2 introduces stricter concurrency rules—Sendable, actor isolation, and priority enforcement—all of which reshape how we write async Swift. This talk unpacks real-world pitfalls, surprising edge cases, and modern concurrency patterns that actually hold up in production."
---

Swift Concurrency made writing async code easier—until Swift 6.2 made it stricter. With enforced Sendable, region-based actor isolation, and tighter priority checks, it’s now easier than ever to run into unexpected compiler errors or subtle runtime bugs.

In this talk, I’ll walk through real-world examples and live Xcode demos to explore: • How Swift 6.2 enforces actor isolation and what that means for your code • When Sendable really matters—and how to conform without overcomplicating things • Common reentrancy issues with actors, and simple patterns to avoid them • Using TaskGroup, MainActor.run, and structured concurrency effectively under the new model • How to debug async hangs, race conditions, and flaky behavior in production

You’ll leave with reliable patterns, a stronger grasp of modern Swift concurrency, and the confidence to ship safe, performant async code in Swift 6.2 and beyond.

## Kanagasabapathy Rajkuma

I’m a Senior iOS Developer with over 10 years of experience building production-grade Swift apps across startups and enterprise teams. My current focus is on Swift Concurrency, developer tooling, and scalable architecture.

I regularly speak at meetups like Swift Bengaluru and Swift Chennai, and enjoy sharing practical insights from real-world projects—whether it’s debugging tricky async/await issues, implementing structured concurrency, or integrating AI tools into the iOS workflow.
