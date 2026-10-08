# Green Hill Zone

Green Hill Zone is a foundational training asset: a component library used as the
shared reference for guides on **Figma Dev Mode, Code Connect, the Figma MCP
server, and Figma Make**. It brings together reusable React components, a matching
Figma design system, example app screens, and Code Connect templates so guides
can build on the same design and code foundation.

The component library is the core asset. Storybook documents its states and
interactions, while a small operations app shows how the components work together.
Training authors can reference these examples, and learners can copy the assets
and use them throughout their exercises.

## How the asset supports training

| Guide topic | Foundation provided by this repository |
| --- | --- |
| Figma Dev Mode | Components, tokens, and matching screen examples for exploring design structure and implementation details. |
| Code Connect | React and HTML templates that connect Figma component properties to code examples from the library. |
| Figma MCP server | A concrete codebase and linked design assets for exercises that use design context to implement or modify screens with existing components. |
| Figma Make | Reusable components, example screens, and local development configuration in `.figma/make/` for guided experimentation. |

This repository supplies the shared assets. Individual guides define their
learning objectives, exercises, and any tool or account setup they require.

## Design and code references

- [Green Hill Design System](https://www.figma.com/design/MZEnA8pImq1ffqpPgQCzCZ/COPY-ME---Green-Hill-%E2%80%94-Design-System?node-id=0-1): the companion component library in Figma.
- [Green Hill App Screens](https://www.figma.com/design/wo6sV16gT4kNbl62wiByi8/COPY-ME---Green-Hill-%E2%80%94-App-Screens?node-id=0-1): example screens built from the design system.
- [Component documentation](https://figmagination.github.io/Green-Hill-Zone/): the published Storybook.
- [Code Connect reference](packages/design-system/src/figma/README.md): template format, configuration, and property mappings.
- [Agent instructions](AGENTS.md): build, implementation, and contribution guidance.

## Monorepo layout

This repository uses npm workspaces with one root lockfile:

- `packages/design-system` (`@green-hill/design-system`): reusable components,
  colocated stories, theme tokens and hook, SVG sprite, shared Tailwind preset,
  Storybook, and React/HTML Code Connect templates.
- `apps/app-screens` (`@green-hill/app-screens`): the Vite operations app,
  routes, screen examples, and app assets. It depends on the design system workspace.

Shared linting, Code Connect configuration, Figma source files, and Make scripts
remain at the repository root. Run `npm ci` there to install both workspaces.
The private design-system package exports source JSX and CSS for Vite to process;
it does not require a separate library build or publishing step.

Screens import library components through package exports, for example:

```jsx
import BigButton from '@green-hill/design-system/components/BigButton.jsx'
import { PageHeader } from '@green-hill/design-system'
import '@green-hill/design-system/styles.css'
```

The app's Tailwind config uses `@green-hill/design-system/tailwind-preset`
and scans both screen and component sources. The `@/` alias refers only to the
app's own source. Design-system internals use relative imports.

Root commands below forward to the appropriate workspace. You can also run
`npm run dev --workspace @green-hill/app-screens` or
`npm run storybook --workspace @green-hill/design-system` directly.

## Run the library and example app

Use Node.js 22.12 or newer and npm. CI uses Node 22.

```bash
npm ci
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`. The example app
uses React 18, Vite, React Router, and Tailwind CSS. It has no backend; data is
static or held in component state so exercises can run locally without external
data services. Running the app or Storybook does not require Figma credentials.

To explore the components independently:

```bash
npm run storybook        # http://localhost:6006
```

Storybook provides live examples, prop tables, editable controls, and callback
logging. Use the toolbar to switch between Light, Dark, 16-bit, and 32-bit themes.
Form controls, table sorting and selection, and dialogs have interactive stories.

| Command | Purpose |
| --- | --- |
| `npm run build` | Build the example app into `apps/app-screens/dist/`. |
| `npm run preview` | Preview the app after building it. |
| `npm run lint` | Run ESLint. |
| `npm run build-storybook` | Build component documentation into `packages/design-system/storybook-static/`. |
| `npm run figma:parse` | Validate React Code Connect templates without publishing. |
| `npm run figma:parse:html` | Validate HTML Code Connect templates without publishing. |

## Prepare a copy for training exercises

For exercises that modify code or publish mappings, use your own repository and
Figma file copies.

For guided lab setup in Codex, invoke `$prepare-lab` from this repository.
The [lab setup skill](.agents/skills/prepare-lab/SKILL.md) guides importing both
`.fig` files, collects their keys and a Code Connect token, and saves them in the
ignored root `.env`, preserving unrelated settings. Token capture uses a
Python 3 helper in your own terminal with echo disabled; do not enter the token
in chat or a visible text prompt.

Library publication, adding the library to App Screens, and swapping library
references are manual steps in Figma. The skill guides these steps and verifies
available read-only evidence, reporting unmatched assets and verification gaps.
It also asks for your hosted Storybook URL, guides the existing GitHub Pages
workflow if you need one, and adds component Dev Resource links through Figma MCP
when supported. It writes an editable mapping table on a **Storybook Dev
Resources** page in your Design System, with links to each component node and
its Storybook documentation. If the page already exists, it updates only the
Storybook URLs and their hyperlinks in place. The output includes no agent prompts.
If MCP cannot manage Dev Resource links, the table supports manual linking and
the skill reports the verification gap; it does not use REST.
Its final step retargets `documentUrlSubstitutions` in both Code Connect configs,
parses React and HTML mappings, and publishes both sets to your accepted Design
System copy. Invoking lab setup includes this publication; editing the skill
alone does not run setup or publish anything.

1. Fork or clone this repository and create a meaningful branch before making
   changes. Never make changes directly on `main`.
2. Duplicate the Design System and App Screens files into a workspace where you
   can edit them. Publish your Design System copy as a library for exercises that
   use it across files.
3. Update the App Screens copy to use components from your copied library.
   Verify that its instances reference your Design System copy.
4. For Code Connect exercises, update `documentUrlSubstitutions` in
   `figma.config.json` and, if using HTML mappings, `figma.config.html.json` to
   point to your Design System file. For a duplicate, preserve node IDs unless
   components have been recreated.
5. Configure your Figma access token and file key using the environment setup below.
6. Parse the relevant templates, then publish to your copied file when the
   exercise calls for it:

   ```bash
   npm run figma:parse
   npm run figma:publish
   ```

For guides involving the MCP server or Make, follow the guide's client and
account setup instructions alongside these assets. The repository includes
Make development scripts and path configuration in `.figma/make/`.

## Configure Figma environment variables

For Code Connect, create a personal access token in your Figma account settings.
Give it **Code Connect: Write** and **File content: Read** permissions, and ensure
your account can access the target design file. See Figma's
[Code Connect setup](https://developers.figma.com/docs/code-connect/quickstart-guide/)
and [token instructions](https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens).

Use the file key from your Design System copy's URL. In
`https://www.figma.com/design/abc123/My-Design-System?node-id=0-1`, the file key is
`abc123`, not the file name or node ID. Import the `.fig` files in [figma-files](./figma-files/) into your Figma instance first
to obtain its hosted file URL and key.

### Local environment file

From the repository root, copy the example if you do not already have a `.env`:

```bash
cp -n .env-example .env
```

Edit `.env` with your own values:

```dotenv
FIGMA_ACCESS_TOKEN=your_personal_access_token
FIGMA_FILE_KEY=your_design_system_file_key
FIGMA_APP_SCREENS_FILE_KEY=your_app_screens_file_key
```

The installed Code Connect CLI loads `.env` from the current working directory,
so run the npm commands from the repository root. Existing shell environment
variables take precedence over values in `.env`. If an old exported token is being
used, run `unset FIGMA_ACCESS_TOKEN` before retrying with the file's value.

### Shell environment or CI

You can supply the same values as exported environment variables instead:

```bash
export FIGMA_ACCESS_TOKEN='your_personal_access_token'
export FIGMA_FILE_KEY='your_design_system_file_key'
npm run figma:parse
```

These are placeholders; avoid saving real tokens in shell history. In CI, inject
`FIGMA_ACCESS_TOKEN` from the platform's secret store and supply `FIGMA_FILE_KEY`
as a configuration variable. The exported values apply to commands launched from
that shell and can be cleared with `unset FIGMA_ACCESS_TOKEN FIGMA_FILE_KEY`.

### Configure the target file

`FIGMA_ACCESS_TOKEN` authenticates the CLI. `FIGMA_FILE_KEY` records the target
file for training exercises and scripts; the current npm commands and Code
Connect configs do **not** use it to rewrite template URLs automatically.

`FIGMA_APP_SCREENS_FILE_KEY` records the imported App Screens key for lab
reference; the current app and Code Connect commands do not consume it.

Update the file-key segment of each relevant `documentUrlSubstitutions` URL in
`figma.config.json` and `figma.config.html.json` to match your file key. Preserve
the component node IDs unless components were recreated. Parse the relevant
templates and review their resolved URLs before publishing to your copied file.

Keep real credentials only in the ignored `.env` or your environment. Leave
`.env-example` as a placeholder template, and do not prefix the token with
`VITE_`, which would make it available to browser code. These variables configure
Code Connect and scripts; follow your MCP client's authentication setup separately.

## Component library

Components live in `packages/design-system/src/components/`, with stories beside them in
`*.stories.jsx`. Shared Storybook styles, themes, and routing are configured in
`packages/design-system/.storybook/preview.jsx`.

| Group | Components |
| --- | --- |
| Atoms | `Avatar`, `BigButton`, `Icon`, `InputField`, `Select`, `StatusBadge`, `ThemeToggle`, `ToggleSwitch` |
| Compositions | `PageHeader`, `SettingRow`, `StatGrid`, `InlineBanner`, `EmptyState`, `Modal`, `TableV2`, `NavBar` (including `NavItem`) |
| Card | `CardThing` |

The library covers status indicators, inline errors, empty states, confirm and
form dialogs, and interactive controls. These examples give training guides
specific components and states to reference.

Themes use a two-tier CSS token system in `packages/design-system/src/index.css`: primitives and semantic
tokens that alias them. Tailwind utilities are tied to those tokens in
`packages/design-system/tailwind.preset.js`. The four modes share the same components while changing
colors, typography, radii, and other theme values.

### Design capabilities to explore

| Capability | Reference example |
| --- | --- |
| Single-axis variants | `StatusBadge.Tone`, `Icon.Name` |
| Multiple variant axes | `BigButton`, `InputField` |
| Text properties | `CardThing.Title`, `InputField.Label` |
| Boolean properties | `InlineBanner.Has Action`, `InputField.Required` |
| Instance swaps | `PageHeader.Icon`, `BigButton.Icon` |
| Slots | `PageHeader.Actions`, `SettingRow.Control` |
| Nested instances | `Modal`, `EmptyState`, `TableV2`, `NavBar` |
| Exposed nested properties | `SettingRow` and its `ToggleSwitch` |
| Images and circular crops | `Avatar` |
| Grid layout | `StatGrid` |
| Text truncation | `CardThing.Title`, `PageHeader.Description` |
| Interactive states | `BigButton`, `ToggleSwitch` |
| Dev Mode annotations | Component layers documented in `packages/design-system/src/figma/README.md` |
| React and HTML mappings | `BigButton`, `StatusBadge`, `Icon` |
| Multiple variable modes | Light, Dark, 16-bit, and 32-bit |

## Example app screens

The operations app provides composed examples for training exercises:

| Route | Example |
| --- | --- |
| `/dashboard` | Overview stats and a recent accounts table. |
| `/billing` | Invoice table and a record-payment confirmation dialog. |
| `/billing/aging` | Receivables aging buckets. |
| `/team` | Member list and an invite-user form dialog. |
| `/integrations` | Connected tools and a failed-sync banner. |
| `/reports` | An empty state. |
| `/settings` | Workspace form, toggles, and disabled-button validation. |

Routes are defined in `apps/app-screens/src/App.jsx`; screens live in `apps/app-screens/src/pages/`.

## Code Connect conventions

React templates live in `packages/design-system/src/figma/` and use the parserless `.figma.ts` format
with `figma.code`. Template URL directives use placeholders such as
`// url=<FIGMA_BIG_BUTTON>`. The `documentUrlSubstitutions` configuration resolves
these to the target Figma file and node, keeping file-specific URLs in one place.

Every variant value is mapped explicitly. Hover and pressed variants resolve to
the appropriate code example while browser pseudo-classes handle the actual
interaction. Keep component props and template mappings aligned when extending
the library.

`BigButton`, `StatusBadge`, and `Icon` also have HTML mappings in
`packages/design-system/src/figma-html/`, backed by `packages/design-system/web/green-hill.css`. Their configuration is in
`figma.config.html.json`.

```bash
npm run figma:parse:html
npm run figma:publish:html
# Publish both React and HTML mappings when required:
npm run figma:publish:all
```

Publishing writes mappings to the configured Figma files. See the
[Code Connect reference](packages/design-system/src/figma/README.md) for the full property mapping table,
nesting behavior, and publishing details.

## Contributing

Create a branch with a meaningful name before making changes. Keep the component
library, stories, documentation, and relevant mappings consistent so guides can
continue to use the same examples. Preserve the self-contained app and reuse
shared components when extending screens.

For application changes, run `npm run lint` and `npm run build`. For component or
Storybook changes, also run `npm run build-storybook`. Validate changed mappings
with the relevant parse command and exercise affected interactions in the app or
Storybook across the four themes. There is no dedicated automated test script in
`package.json`. Documentation-only changes need content and whitespace review.

Do not commit credentials, dependencies, or generated build output. Submit
changes through a pull request with a description of the resulting behavior,
validation performed, and any companion Figma updates needed. See
[AGENTS.md](AGENTS.md) for detailed contribution instructions and
[ROADMAP.md](ROADMAP.md) for future platform ideas.

### Storybook deployment

The [Storybook workflow](.github/workflows/storybook.yml) runs lint and builds
the app and Storybook for pull requests targeting `main`. Pushes to `main` and manual workflow
runs on `main` deploy the static documentation through GitHub Pages artifacts.
Generated output and a `gh-pages` branch do not need to be committed.

For a fork, choose **GitHub Actions** under **Settings → Pages → Build and
deployment → Source**. The deployment job reports the resulting site URL.
