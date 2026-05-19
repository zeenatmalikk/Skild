<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into the Skild TanStack Start application. The following changes were made:

- **`posthog-js`** and **`posthog-node`** packages were installed.
- **`vite.config.ts`** was updated to add a reverse proxy routing `/ingest`, `/ingest/static`, and `/ingest/array` to PostHog's ingestion endpoints, improving reliability and avoiding CORS issues.
- **`src/routes/__root.tsx`** was updated to wrap the app with `PostHogProvider` (using env vars for key/host), and a `PostHogIdentifier` component was added inside `ClerkProvider` to automatically identify users via Clerk's `useUser` hook — calling `posthog.identify()` on login and `posthog.reset()` on sign-out.
- **`src/routes/index.tsx`** was updated to capture `browse_registry_clicked` and `publish_skill_clicked` events on hero CTA link clicks.
- **`src/components/SkillCard.tsx`** was updated to capture `skill_install_command_copied` (with skill metadata) in the copy handler, `skill_card_opened` on the Open link, and `posthog.captureException()` on clipboard errors.
- **`.env`** was created with `VITE_PUBLIC_POSTHOG_KEY` and `VITE_PUBLIC_POSTHOG_HOST`.

| Event | Description | File |
|---|---|---|
| `browse_registry_clicked` | User clicks "Browse Registry" CTA in the hero section | `src/routes/index.tsx` |
| `publish_skill_clicked` | User clicks "Publish Skill" CTA in the hero section | `src/routes/index.tsx` |
| `skill_install_command_copied` | User copies a skill's install command from a skill card | `src/components/SkillCard.tsx` |
| `skill_card_opened` | User clicks "Open" on a skill card to view skill details | `src/components/SkillCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/1594672)
- [Skill Install Commands Copied](/insights/3jqQiotY) — Total install command copies over time
- [Homepage CTA Engagement](/insights/jxkFaND0) — Browse Registry vs Publish Skill clicks side by side
- [Skill Cards Opened (Unique Users)](/insights/NjADdWFH) — Daily unique users opening skill cards
- [Registry to Install Funnel](/insights/azfK0X4I) — Conversion from browsing the registry to copying an install command
- [Skill Engagement Funnel](/insights/7GHzSDLd) — Full 3-step funnel: Browse → Open Skill → Copy Install Command

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
