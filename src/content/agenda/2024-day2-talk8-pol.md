---
title: "Ship your app on a Friday… and enjoy your weekend!"
date: "2024-11-14"
time: "16:30"
name: "Pol Piella"
image: "/images/speakers/2024/pol.webp"
type: "Talk"
summary: "You have been hard at work getting a critical business feature ready and Apple has just approved your version but it’s Friday afternoon. You want to ship your app but surely you shouldn’t ship on a Friday, or should you?"
---

Join me as I share tips on making smooth, automated and risk-free releases!

There are two parts of the release process that you need to get right to ensure you get your changes to your users in a timely manner and to ensure that their experience is not degraded when using the new release: bundling all changes from the previous release and uploading them to App Store Connect and as soon as the app is released, monitoring the new version’s stability and quickly reacting if the user’s experience is degraded.

While these two parts of the process might seem easy at first glance, they have their complications. Depending on the size of your team or your app, you might be archiving your apps and uploading them to App Store Connect manually or, even if you have them automated using a CI/CD workflow, this might only be run fortnightly or monthly, increasing the chances of something going wrong.

You might also only be testing for debug configurations of your app not testing the changes on builds with release configuration. This can lead to missing API keys, values or what’s even worse, even whole frameworks leading to runtime crashes!

On the other hand, let’s say you have uploaded your app to App Store Connect successfully and you hit the release button. As soon as the first users start downloading the new version, you see a new critical crash and you want to stop the adoption of the new version and submit a hotfix version. But you would still need to do all of this manually and you would need to wait for Apple to approve the new build, even if you expedite the review process. How could you make this better to save you response time and effort and mitigate the negative impact on your users?

In this talk I will show you practical examples of things you can build to make your releases as smooth and as safe as possible. From creating nightly builds which test the release workflow and continuously deploy changes for alpha and beta testers to check, to implementing automatic fallback mechanisms built entirely in Swift to be able to immediately rollback to the latest stable version (without having to wait for Apple to approve the new build), just as if you would do for a website or backend service!

After this talk, you will be excited to ship new versions of your app!

## Pol Piella

Hi! I’m Pol, I am a Senior iOS Developer at Glovo. I have been in the industry for more than 6 years now and have worked in apps and products that have been used by millions of weekly users. Aside from my day job, I like writing and tweeting about iOS development in my [personal blog](https://www.polpiella.dev/) and [newsletter](https://ioscinewsletter.com/) and work on my own apps [QReate](https://getqreate.app/), [NowPlaying](https://nowplaying.page/) and [Helm](https://helm-app.com/).
