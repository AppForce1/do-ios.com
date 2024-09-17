---
title: "The Swift Compiler Features the Core Team Doesn't want you to Know About"
date: "2024-11-13"
time: "10:45"
name: "Michael Hulet"
image: "/images/speakers/2024/michael.png"
type: "Talk"
summary: "Swift is the language we all know and love, but do you know the hidden tricks of the dark arts that allow you to perform some real magic with it?"
---

Together, we’ll go spelunking through the underscored attributes, but beware, as they might come back to bite you

Swift is known for being a highly-opinionated language, and for good reason. It keeps us totally safe from a litany of common mistakes that cause serious – often fatal – errors and vulnerabilities in software created with other languages. However, there are times when its restrictions can feel a little bit too restrictive. The good news is that there’s likely a language feature to help deal with those cases, but you need to be very careful in using them

These features are often implemented as [Underscored Attributes](https://github.com/swiftlang/swift/blob/main/docs/ReferenceGuides/UnderscoredAttributes.md), which the Swift Core Team keeps around primarily for their own use cases, but they remain intentionally exposed to public code. We just simply don’t usually talk about them. For example, did you know that swizzling isn’t just an esoteric capability of the Objective-C runtime, but actually a language feature of Swift on some platforms?

In this talk, I’ll go over several of the most useful underscored attributes and talk about what they do, why they exist, the problem(s) they solve, and when and how to use them

## Michael Hulet

Michael Hulet is a Senior iOS Consultant currently living in The Hague. He’s been building apps for Apple Platforms for more than a decade, including some of the largest apps on the App Store alongside tiny, one-man projects, doing plenty of weird things with the toolchain along the way. In his spare time, he enjoys watching hockey, taking long walks, and exploring the world. He’s currently available for contracting – hire him!
