---
title: 'Workshop: Getting started with Swift Concurrency'
date: '2023-11-07'
time: '09:00'
name: 'Donny Wals'
image: '/images/speakers/2023/donny.webp'
type: 'Workshop'
summary: 'Join Donny Wals for a workshop about Swift Concurrentcy. Expand for details…'
---

## What you'll get out of this workshop
                    
This workshop is an **in-person** workshop that will be in Amsterdam the day before the conference at the NEMO Science Museum. The format alternates between a theoretical explanation with presentations and coding examples, and performing tasks alone, and / or in groups. After each task we go over the solution and there will be tons of room for questions.

Alongside the presentations, you will have access to a reader that you can download. This reader contains all theory that is explained during the workshop, as well as information on each of the tasks, and it also contains the sample app you'll be working on. Having this reader allows you to refer back to what you've learned whenever you want, even after the workshop is already done.

By the end of the workshop, you will receive a certificate of completion so you can show what you've learned to friends, family, and employers!

## Workshop prerequisites

This workshop is intended for intermediate to advanced developers. The sample app we'll work on will be SwiftUI based, but the majority of the work you'll do is done in a UI agnostic manner. This helps ensure that we focus on Swift Concurrency, and not on details like the UI. Of course, we will take a good look at how data flows towards the UI but it's not the workshop's main focus.

Attendees are expected to be familiar with the basics of SwiftUI, networking, and ideally attendees have worked with Grand Central Dispatch at some point. You don't need to have mastered these topics, but basic familiarity is assumed.

The workshop will use Xcode 14.3 with Swift 5.8, and the materials will be focussed on iOS 15.5 and newer.

## Topics covered in the workshop

In this workshop, attendees will refactor a simple application that fetches data from the network with various requirements that make Swift Concurrency a great candidate.

### An introduction into async / await

The cornerstone of Swift Concurrency that programmers interact with most is async/await. In the first section of the Concurrency workshop we’ll dig into the basics of using async/await, and we’ll immediately talk about how Swift Concurrency manages threads and tasks. This is vastly different from GCD and requires some explanation.

After the initial explanation, attendees will practice using async/await in a simple example where they’ll just fetch some data from the network.

### Refactoring existing code to work with async / await

As much as we’d all love to dig in with async/await right now, the fact of the matter is that most of us are maintaining existing codebases and can’t just replace everything all at once. In this section, you will learn about the mechanisms in Swift Concurrency that allows you to take existing callback based code and make it work with async/await.

### Synchronizing access with actors

Actors are a huge part of Swift Concurrency that solve an extremely important and complex problem. In this section, you will learn how actors fix data races. I’ll explain some of the rules and limitations of using actors by building a simple token refresh flow.

While the focus in this section is on actors, we’ll be using various interesting concepts within the world of async await to implement a token refresh flow logic.

### Testing your async / await code

In this section we’ll take a very quick look at XCTest and how you can test your asynchronous code.

### Orchestrating tasks with async / await

Sometimes, you want to kick off multiple tasks that need to be performed asynchronously, and only resume work when all tasks are done. With GCD, we would use tools like a dispatch group to achieve this.

With Swift Concurrency, there are different tools like task groups and `async let` that we can leverage to achieve our goal of performing work and waiting for all work to be finished. You will learn about these features in this section, and then you’ll apply the lessons learned in the sample app.

## Donny Wals

Donny is a passionate and curious iOS developer, Author and Speaker. He has written several books on iOS development and has delivered dozens of talks and workshops over the past years. Next to iOS development he’s a huge cat lover and he likes dabbling on his guitars.
