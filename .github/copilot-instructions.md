## Copilot / AI Agent Instructions — Marathon Motors

Short summary
- This is a Next.js (App Router) site with an embedded Sanity Studio at `/app/studio/[[...tool]]/page.tsx`.
- 3D car models are rendered with React Three Fiber in `components/canvas/*` and the model assets come from Sanity file uploads (see `sanity/schemaTypes/vehicle.ts`).

Quick commands
- Dev server: `npm run dev` (Next dev). Open `http://localhost:3000`.
- Build: `npm run build` then `npm start`.
- Lint: `npm run lint` (eslint).

Big-picture architecture
- Frontend: Next.js (App Router, root `app/`), TypeScript. Client components use the `"use client"` directive.
- 3D: `@react-three/fiber`, `@react-three/drei`, `three`, and `three-stdlib` are used in `components/canvas/` (notably `VehicleCanvas.tsx`, `VehicleShowcase.tsx`, `HyundaiModel.tsx`).
- CMS: Sanity Studio configured in `sanity/` and mounted in the Next app. Schemas live in `sanity/schemaTypes/` (`vehicle.ts`, `news.ts`, `event.ts`, ...). The app queries Sanity via `sanity/client.ts` (used by `lib/cms-api.ts`).
- State: lightweight UI store with `zustand` at `lib/store.ts`.

Important repository specifics (do not assume defaults)
- Sanity client: the canonical client is `sanity/client.ts` (used by `lib/cms-api.ts`). Note `useCdn: false` in that file — this is intentional so uploaded 3D model files are available immediately after upload.
- Model URL resolution: `lib/cms-api.ts` maps `"modelUrl": modelFile.asset->url` — the UI expects a public URL to a `.glb` (or similar) file.
- Sanity schemas are the source of truth: modify `sanity/schemaTypes/*.ts` when adding content fields. The Studio is embedded in the Next app; editing local schema files is preferred over cloud-only edits.
- App Router + Client Components: many UI and 3D components are client components and explicitly use `"use client"`. Be careful when moving code between `app/` server components and `components/` client components.

Patterns & common hotspots for changes
- 3D renderer tuning: `components/canvas/VehicleCanvas.tsx` contains critical renderer settings (toneMapping, lights, `PresentationControls`, `Environment`, `BakeShadows`). Small numeric tweaks here change visual output dramatically.
- Loading UX: `components/canvas/VehicleShowcase.tsx` uses `useProgress()` from `@react-three/drei` and a timed fade-in (`isLoaded`) — when changing loading behavior, update both the progress usage and the fallback overlay.
- Data fetching: `lib/cms-api.ts` contains GROQ queries used by pages/components. Use the same projection names (e.g., `modelUrl`, `imageUrl`) to avoid breaking consumers.
- State: global UI flags (search, auth modal) live in `lib/store.ts` using `zustand`; follow this pattern for small UI state.

Files to inspect when diagnosing issues
- `app/layout.tsx`, `app/page.tsx` — app entry points and global styles.
- `components/canvas/VehicleCanvas.tsx`, `components/canvas/VehicleShowcase.tsx`, `components/canvas/HyundaiModel.tsx` — 3D scene construction, model loading, lighting.
- `lib/cms-api.ts` — GROQ queries and shape of returned objects (`Vehicle` type).
- `sanity/schemaTypes/vehicle.ts` and `sanity/schemaTypes/index.ts` — canonical content model for vehicles.
- `sanity/client.ts` — Sanity client configuration and caching behavior (env vars: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`).

Conventions and coding guidance specific to this repo
- Prefer changing local Sanity schema files under `sanity/schemaTypes/` rather than editing schema from cloud tooling.
- Keep 3D-related code inside `components/canvas/` and preserve `"use client"` on components that use React hooks or three internals.
- When adding new fields returned from Sanity, update `lib/cms-api.ts` projections and the `Vehicle` interface there.
- Avoid adding heavy runtime work to server components — 3D rendering remains strictly in client components.

Integrations / external dependencies to be aware of
- Sanity Studio (package `sanity`) — studio is embedded via `app/studio/...` route.
- `@react-three/fiber`, `@react-three/drei`, `three` — used for all 3D rendering.
- `next-sanity` / `@sanity/image-url` — used to fetch and build image URLs.

Testing & debugging tips
- Quick smoke test: start the dev server (`npm run dev`) and check `/` and `/studio`.
- If a new 3D model doesn't show after upload, check `sanity/client.ts` (we set `useCdn: false`) and verify the asset URL via `lib/cms-api.ts` query in a node REPL or the Studio Vision tool.
- Use browser devtools to inspect network requests for `.glb` files and ensure CORS & MIME types are correct on the uploaded asset.

What to ask the maintainer if unsure
- Should CI run `npm run build` and `npm run lint`? (No tests found.)
- Are schema deployments done via local `sanity` CLI or through a cloud workflow?

If you change anything significant, run the dev server and preview `/studio` and `/` locally before opening a PR.

— End of guidance —

If you want, I can iterate this file to include specific debugging commands, CI notes, or expand sections with concrete code snippets from `components/canvas/VehicleCanvas.tsx`.
