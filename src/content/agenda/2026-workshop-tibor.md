---
title: "Workshop: Building a Server-Side Swift App with Feather Framework, Hummingbird, and OpenAPI"
date: "2026-11-10"
time: "09:00"
name: "Tibor Bödecs"
image: "/images/speakers/2026/tibor.webp"
type: "Workshop"
summary: "Build a type-safe Swift backend with Feather Framework and Hummingbird, using OpenAPI as the shared contract between server, admin, and client APIs."
---

Server-side Swift is now a practical choice for building structured, type-safe backends with a strong developer experience. In this workshop, you will build a basic server-side Swift app using Feather Framework and Hummingbird, with OpenAPI serving as the shared contract between the server, the web-based admin surface, and client-facing APIs.

Using a real project structure as a guide, we’ll walk through how to organize a Swift backend into clean layers, define endpoints with shared API types, wire runtime dependencies, and keep handlers thin while ensuring business logic remains testable.

This is a guided build, with the architecture explained in context — based on a real Swift codebase that uses a shared OpenAPI package, a Hummingbird-powered server, and a modular architecture to support both app and admin APIs.

We’ll start with the architecture: why a shared OpenAPI contract gives you strong type safety across boundaries, instead of hand-written request and response models that drift over time. Then we’ll build the core of a small server-side Swift app:

- define the API contract and generated types
- set up a Hummingbird server
- connect Feather Framework components (database, storage, mail, and more)
- wire a simple route through the handler
- split the business logic into domain, application, and infrastructure layers

After that, we’ll look at how the pieces connect in a realistic codebase: OpenAPI as the contract, Hummingbird as the HTTP runtime, module composition for keeping features isolated, builder patterns for wiring dependencies, and how multiple APIs can live in the same system without turning into a mess.

This won’t be framed as “Swift solves everything.” We’ll talk honestly about what this architecture provides, where it adds ceremony, and why that ceremony starts paying off once you have multiple features, background jobs, migrations, or separate admin concerns.

You’ll leave with a working mental model for building scalable backend apps in Swift, a practical starting point for Hummingbird and Feather Framework, and a sense of how OpenAPI can serve as the foundation of the entire system.

**Required tools:** A Mac with Xcode installed. Workshop activities cannot be completed on a tablet or phone.

## Tibor Bödecs

Tibor is a server-side Swift enthusiast, book author, and content creator. He is CEO of Binary Birds, a member of the Swift Server Work Group, and the author of Practical Server Side Swift. He writes at [The.Swift.Dev](https://theswiftdev.com) and builds open-source backend tools including Feather Framework.
