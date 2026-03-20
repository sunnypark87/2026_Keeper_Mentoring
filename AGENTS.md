# AGENTS.md 

## Goal

Build a **static mentoring site** using **Next.js + Reveal.js**, deployable on **GitHub Pages**.

## Routes

* `/` → Home (mentoring intro + week list)
* `/week-{number}-{slug}` → Weekly slide page

Examples:

* `/week-1-intro-to-security`
* `/week-2-web-security`

## Core Rules

1. **Static only**

   * Use `output: 'export'`
   * No SSR or server-dependent features

2. **Keep it simple**

   * Flat routing structure
   * Home acts as table of contents

3. **Data-driven**

   * Manage weeks in `data/weeks.ts`
   * Include slug, title, description

4. **Reveal.js**

   * Each week = slide deck
   * Use a shared Deck component

5. **Easy to extend**

   * To add a week:

     * Add data entry
     * Add slide content

## Structure

* `app/`

  * `page.tsx`
  * `[slug]/page.tsx`
* `components/`

  * reveal deck
* `data/`

  * weeks.ts

## Codex Rules

* Preserve existing structure
* Avoid unnecessary complexity
* Ensure GitHub Pages compatibility
* Prefer minimal, targeted changes

## Summary

A simple **weekly slide-based mentoring site** with static deployment.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
