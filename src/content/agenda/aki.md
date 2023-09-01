---
title: 'Deep Dive into "any" and "some"'
date: "2023-11-08"
time: "15:30"
name: "Aki Yuki"
image: "/images/speakers/2023/aki.webp"
type: "Talk"
summary: "As you may know, Swift 5.7 introduced the “any” keyword for protocol types, and future Swift versions will enforce its usage."
---

We have already know about a similar keyword, “some,” which is mainly used in SwiftUI. We know usage differences because compiler tells us with warnings and errors, however, there are still many secrets even if the build is passed, such as, runtime behavior, performance between module, and more, which is not talked in WWDC session. If we understand the deep side of them with compiler knowledge, we can create more effective and performant Swift APIs with this knowledge.

In this talk, Aki will discuss the mechanisms of “any” and “some” and what Swift Engineers really have to know about them. This talk puts the highest importance on knowledge of Swift Compiler, such as “Existential Container” which is the special mechanism of “Existential Type”, protocol types and method dispatch.

You’ll learn …

- The evolution of “any” and “some” with good Swifty API design (Recap)
- How Swift Compiler achieves feature of protocol type and it’s performance
  - “Existential Container” and “Existential Type” to understand “any” performance
  - Module optimization of any and some
- Why we really need to have “any” keyword from Swift 5.7 from above perspective

This talk is targeting for the person who don’t understand how they can use “any” and “some” effectively, also you will enjoy this talk if you want to know about deep side of “any” from compiler side.

## Aki Yuki

Yuki is an iOS Engineer at LINE. He frequently goes by “freddi” in Japan. He works for LINE, improving the Build System of the LINE application (which is most popular messaging application in Japan). He has spoken at many conferences (NSSpain, try! Swift, SwiftHeroes) and meetups as he enjoys talking about what he learned while coding in Swift. He also contributed to OSS projects, like Swift Compiler, fastlane, and XcodeGen while he had time. He loves music, cartoons (like “Tom and Jerry”, “Fooly Cooly” …), drawing cats, hand-made keyboard, his family cats, Pokemon cards, and traveling.
