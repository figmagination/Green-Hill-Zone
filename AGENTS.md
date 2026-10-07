# Agent Instructions

## Purpose and contribution priorities

Green Hill Zone is a foundational training asset. Its component library, matching
Figma design system, example app screens, and Code Connect mappings provide a
shared reference for guides on Figma Dev Mode, Code Connect, the Figma MCP server,
and Figma Make. Changes should keep these assets useful together so learners can
follow the same components from design inspection through implementation and
experimentation.

The application uses React 18, Vite, React Router, and Tailwind CSS. Its operations
screens demonstrate the library in context. Data is static or held in component
state; preserve this self-contained training environment unless the task explicitly
changes that scope. Read `README.md` for setup and design references. `ROADMAP.md`
records future ideas, not requirements to implement during unrelated work.

When contributing:

- Favor clear, reusable component examples that a guide can reference. Keep names,
  props, variants, tokens, stories, and mappings consistent across the assets.
- Treat component APIs and named example states as training references. If a task
  changes them, update the affected documentation, stories, and Code Connect
  templates, and identify any matching Figma updates needed in the handoff.
- For Dev Mode exercises, preserve readable component structure, token usage, and
  the relationship between design properties and code props.
- For Code Connect exercises, maintain exhaustive mappings and usable snippets
  that import the actual library components.
- For MCP server exercises, keep source components and example screens easy to
  locate and reuse. Add client setup instructions only when they are part of the
  task and have been verified for that client.
- For Make exercises, reuse `src/components/` when extending screens and preserve
  the relevant `.figma/make/` configuration. Review any referenced paths when
  renaming or moving files.
- Distinguish the assets supplied here from procedures supplied by individual
  training guides. Do not describe planned guides or integrations as completed.

## Repository map

- `src/App.jsx`: application routes; `src/main.jsx`: application entry point.
- `src/pages/`: dashboard, billing, team, integrations, reports, and settings screens.
- `src/components/`: reusable UI components and colocated `*.stories.jsx` files.
- `src/index.css`: primitive and semantic design tokens, plus theme styles.
- `src/useTheme.js` and `index.html`: theme selection and initial theme application.
- `tailwind.config.js`: utility scales backed by the design tokens.
- `.storybook/`: Storybook setup, theme previews, and shared router decorator.
- `src/stories/Introduction.mdx`: introductory component documentation.
- `public/icons.svg`: shared icon sprite used by `src/components/Icon.jsx`.
- `src/figma/`: React Code Connect templates and detailed mapping guidance.
- `src/figma-html/` and `web/green-hill.css`: HTML mappings and their CSS implementation.
- `figma.config.json` and `figma.config.html.json`: mapping configuration and Figma URL substitutions.
- `.github/workflows/storybook.yml`: pull request checks and Storybook Pages deployment.
- `.figma/make/`: local development scripts and configuration for Make exercises.

## Setup and build

Use Node.js 22.12 or newer; CI uses Node 22. Install dependencies from the checked-in
`package-lock.json` with `npm ci`. Use npm consistently and update the lockfile
alongside `package.json` when intentionally changing dependencies.

| Command | Purpose |
| --- | --- |
| `npm ci` | Install the locked dependency versions. |
| `npm run dev` | Start the Vite development server (normally port 5173; use the printed URL). |
| `npm run build` | Build the application into `dist/`. |
| `npm run preview` | Serve the built application locally after running the build. |
| `npm run lint` | Run ESLint over the repository. |
| `npm run storybook` | Start component documentation at `http://localhost:6006`. |
| `npm run build-storybook` | Build static component documentation into `storybook-static/`. |
| `npm run figma:parse` | Parse the React Code Connect templates without publishing. |
| `npm run figma:parse:html` | Parse the HTML Code Connect templates without publishing. |

The app and Storybook do not require Figma credentials. For Code Connect setup,
follow the environment instructions in `README.md` and the mapping reference in
`src/figma/README.md`. Do not commit `node_modules/`, `dist/`, or `storybook-static/`.

### Figma environment configuration

- Use `FIGMA_ACCESS_TOKEN` for Code Connect authentication. The personal access
  token needs Code Connect write and file content read permissions, and the
  account must have access to the target file.
- For local setup, copy `.env-example` to the repository-root `.env` only if it
  does not already exist, then configure `FIGMA_ACCESS_TOKEN` and `FIGMA_FILE_KEY`.
  Preserve existing environment files and never overwrite a user's credentials.
- Alternatively, export these variables in the shell or inject the token from a
  CI secret store. The installed CLI loads `.env` from the working directory;
  exported variables take precedence. Run project commands from the repository root.
- Extract `FIGMA_FILE_KEY` from the `/design/<file-key>/` segment of the hosted
  Design System URL. A local `.fig` path or a node ID is not a file key.
- `FIGMA_FILE_KEY` is an exercise/script configuration value in this repository.
  The current npm commands do not interpolate it into Code Connect config URLs.
  Update the relevant `documentUrlSubstitutions` entries in both configs to target
  the intended file, then review parsed URLs before publishing.
- Keep `.env-example` limited to placeholders. Never print tokens in tool output,
  include them in documentation or commits, or expose them through `VITE_`
  variables. MCP client authentication is configured separately.

## Implementation conventions

- Follow the existing JSX and ES module style: functional components, hooks,
  single quotes, and no statement-ending semicolons. Preserve each module's
  existing named or default export convention.
- Use the `@/` alias for imports from `src/` where appropriate; it is configured
  in Vite and `jsconfig.json` and provides stable imports for Code Connect snippets.
- Reuse the shared components rather than duplicating their markup or overriding
  their variant styling in screens. Keep component props, stories, and relevant
  Code Connect mappings consistent when changing a component API.
- Use semantic CSS variables and the Tailwind scales in `tailwind.config.js`.
  Spacing and font sizes use custom scales; check available keys before adding
  utilities. Avoid hardcoded theme colors and unnecessary per-component theme overrides.
- Verify visual changes in Light, Dark, 16-bit, and 32-bit modes. Keep initial
  theme application in `index.html` consistent with `src/useTheme.js` when changing
  theme behavior.
- Preserve accessible labels, keyboard interaction, focus states, disabled states,
  and dialog behavior. Use the existing `Icon` component and SVG sprite for glyphs;
  retain base-path-safe asset URLs for Storybook on GitHub Pages.
- Add or update colocated Storybook stories for meaningful component states.
  Follow existing metadata, controls, and callback logging patterns; shared themes
  and the memory router are already supplied by `.storybook/preview.jsx`.

## Figma Code Connect

Read `src/figma/README.md` before changing mappings. Use the existing parserless
`.figma.ts` format with `figma.code`; do not introduce `.figma.tsx` mappings using
`figma.connect()`. Keep `// url=<FIGMA_...>` placeholders in templates and resolve
them through `documentUrlSubstitutions` in the appropriate config.

Map every variant value explicitly, including hover and pressed states that
resolve to the default code output. When targeting a duplicated design file,
update the relevant file keys in both configs as needed and preserve node IDs
unless components were recreated. Keep React and HTML implementations aligned
for components that have both mappings.

Run the relevant parse command before publishing. Publishing commands are
`npm run figma:publish`, `npm run figma:publish:html`, and
`npm run figma:publish:all`; they write to the configured Figma files, so run them
only when publishing is part of the requested work.

## Validation and contribution workflow

1. Inspect `git status` and the current branch before editing. Create a meaningful
   branch for new work, for example `feat/invoice-filter`, `fix/modal-focus`, or
   `docs/agent-guidance`; continue related work on its existing branch. Preserve
   unrelated local changes.
2. Keep changes focused on the requested behavior and update affected documentation,
   stories, and mappings alongside implementation changes.
3. For application changes, run `npm run lint` and `npm run build`. For component
   or Storybook changes, also run `npm run build-storybook`. CI runs lint and the
   Storybook build for pull requests targeting `main`.
4. There is no dedicated automated test script in `package.json`. Exercise affected
   routes and component interactions in the app or Storybook, including relevant
   empty, error, disabled, and responsive states. Run the appropriate Code Connect
   parse commands for mapping changes. Documentation-only changes need a content
   and whitespace review rather than application builds.
5. Review the final diff and run `git diff --check`. In the handoff or pull request,
   describe the resulting behavior, checks performed, and any unresolved failures
   or checks that could not be run.

Storybook deploys to GitHub Pages after pushes to `main` or a manual workflow run
on `main`. Contribute through a branch and pull request; generated Pages artifacts
are handled by CI and do not belong in commits.
