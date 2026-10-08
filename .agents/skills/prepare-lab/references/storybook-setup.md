# Deploy Storybook and add component Dev Resources

Ask for the hosted Storybook URL. Accept an existing working deployment; do not
require GitHub Pages if they already use another host. If a supplied URL points
to a story, extract the site base while preserving its repository subpath.
If the user wants to keep an earlier accepted URL, reuse it. Do not invent a URL
from a repository name or substitute the original project's site.

## Get a GitHub Pages URL when needed

Guide the user through the existing `.github/workflows/storybook.yml`, checking
its current contents before giving instructions:

1. Use the user's GitHub repository or fork with the Storybook workflow present
   on `main`. In a fork, enable GitHub Actions if GitHub asks.
2. Open **Settings → Pages → Build and deployment → Source** and choose
   **GitHub Actions**. Repository settings permissions are required.
3. Open **Actions → Storybook → Run workflow**, select `main`, and run it.
   A push to `main` also triggers deployment. Pull requests only build and check;
   they do not deploy. Review and merge changes through the repository's normal
   branch/PR workflow if they are not yet on `main`.
4. Wait for both build and deploy jobs to succeed. This workflow runs `npm ci`,
   lint, the app build, and `npm run build-storybook`; its Pages artifact is
   `packages/design-system/storybook-static`. Fix actual workflow failures before
   claiming a deployment. Do not commit generated artifacts.
5. Copy the deployed site URL from the `github-pages` environment/deployment
   result or **Settings → Pages**, open it, and provide that URL to the agent.

These are user-operated steps; do not change repository visibility, settings,
push/merge to `main`, or trigger deployment merely to manufacture a URL. Existing
`.storybook/main.js` uses relative asset paths for repository subpaths.
A local `npm run build-storybook` creates an artifact but not a hosted GitHub URL.

## Validate the site and resolve component URLs

Read the hosted site's `index.json` to identify actual story IDs, titles, and
docs entries. Keep the deployment base path; use `?path=/docs/<docs-id>` for an
available component docs entry, or `?path=/story/<story-id>` for a representative
existing story. Prefer docs when present so links cover the component API and
states. Do not guess IDs from display names or link every component to the site
home page. If the site/index is inaccessible, request accessible evidence or
report the blocker rather than fabricating URLs.

Match source `*.stories.jsx` metadata to the hosted index, respecting explicit
CSF IDs and deployed versions. The current mapping is:

| Figma component or set | Storybook metadata title |
| --- | --- |
| Avatar | Atoms/Avatar |
| BigButton | Atoms/BigButton |
| Icon | Atoms/Icon |
| InputField | Atoms/InputField |
| Select | Atoms/Select |
| StatusBadge | Atoms/StatusBadge |
| ThemeToggle | Atoms/ThemeToggle |
| ToggleSwitch | Atoms/ToggleSwitch |
| NavBar / Link | Atoms/NavItem |
| CardThing | Compositions/CardThing |
| EmptyState | Compositions/EmptyState |
| InlineBanner | Compositions/InlineBanner |
| Modal | Compositions/Modal |
| NavBar | Compositions/NavBar |
| PageHeader | Compositions/PageHeader |
| SettingRow | Compositions/SettingRow |
| StatGrid | Compositions/StatGrid |
| TableV2, TableV2 / Cell, TableV2 / Header Cell, TableV2 / Row | Compositions/TableV2 |

Recheck these names against current source and the live index. TableV2's
subcomponents intentionally share its docs because they have no separate story
files. Report any additional component lacking a matching story; do not create
unrequested stories or silently omit it. Verify resolved IDs exist in the hosted
index, and inspect representative links to confirm the intended page opens.

## Write the mapping table into the Design System

Produce the handoff in the accepted Design System file through Figma MCP, not
as a temporary Markdown file. Load `figma-use` and use the latest accepted
`FIGMA_FILE_KEY`. This is documentation on the canvas, distinct from actually
adding Dev Resource links.

Inspect the file's pages before writing. Use the page named **Storybook Dev
Resources** and the frame **Storybook links — instructions and component
mapping**. If the page is absent, create it and an editable auto-layout frame
containing:

- A title, accepted Storybook base URL, component/variant coverage, and accurate
  Dev Resource status. Do not claim links were applied when they were not.
- Concise manual steps: select the main component/set, open Dev resources, add
  the exact URL named Storybook, preserve unrelated links, avoid duplicates,
  and check variant inheritance.
- A bordered two-column table with headers **Component node** and **Storybook
  documentation URL**. Add one row per local component set or standalone
  component; variants use their owning set's row. Show the component name and
  its actual node ID in the first cell, linked directly to that node using
  `text.hyperlink = { type: 'NODE', value: component.id }`. Show the full verified
  docs/story URL in the second cell, with a matching URL hyperlink. TableV2
  subcomponents retain separate rows even though they share a docs URL.
- Any missing-story mappings or verification gaps, and the TableV2/NavItem
  mapping notes when relevant.

Use the library's existing text styles, semantic colors and spacing tokens.
Keep URLs readable and copyable, and the table editable with aligned columns,
header styling, and visible row borders. Do not add prompts or instructions for
Figma's agent.

If **Storybook Dev Resources** already exists, update only the Storybook URLs
and their URL hyperlinks in its existing frame/table, using the newly accepted
site base and routes verified in that site's index. Include the displayed site
URL. Preserve component node links, row order, content, styling, and layout;
do not create another page/frame, rebuild the table, append instructions, or
remove existing sections. Do not replace every link with the site's home page
or blindly retain route IDs missing from the new index. Report unresolved rows
or a missing/ambiguous frame/table rather than overwriting unrelated content.
An unchanged URL is a no-op.

Load the affected text's fonts before edits, await writes, and return all
created/mutated IDs. Read back exact URLs and component node hyperlinks, verify
row coverage, and visually check new or materially changed layouts. Link to the
Figma frame in the handoff. If MCP cannot write the documentation page, report
that blocker rather than substituting a temporary file.

## Add Dev Resource links through Figma MCP only

Load `figma-use` before `use_figma`. Use the latest accepted `FIGMA_FILE_KEY`.
Inspect the file and cover every local `COMPONENT_SET` and `COMPONENT`, including
variants and standalone components, across all component pages. Map variant
components through their owning set; the URL may be shared among variants.
Leave remote imported assets and unrelated nodes untouched. This step updates
Dev Resources, not descriptions, Code Connect templates, or library references.

Check available dedicated MCP capabilities first. If using Plugin API execution,
verify actual support for `getDevResourcesAsync`, `addDevResourceAsync`, and,
when replacing a stale link, `editDevResourceAsync`. Method names can be present
while calls still return “not a supported API”. An unsupported result is a
capability blocker, not a reason to retry or switch to REST. In this environment,
`getDevResourcesAsync()` has previously returned that error; do not assume this
has changed without evidence.

When supported:

- Read each target's existing resources. Preserve unrelated links. If the exact
  Storybook URL is already present, keep it and avoid a duplicate. Treat inherited
  links as inherited; do not attempt to edit them on the child or instance.
- Add a missing link with `await node.addDevResourceAsync(url, 'Storybook')`.
  Update an unambiguous stale Storybook link with
  `await node.editDevResourceAsync(oldUrl, { url, name: 'Storybook' })`.
  If multiple existing links are ambiguous, report them rather than overwriting
  unrelated resources. Figma identifies resources by URL; duplicate URLs fail.
- Follow the skill's page-loading rules, await every write, return all mutated
  node IDs and added/updated/unchanged counts, and re-read the affected resources
  to verify the exact URLs. After partial failure, inspect results and retry only
  unresolved targets; do not blindly duplicate successful links.

Do not use REST endpoints, the local token, shell HTTP requests, or undocumented
APIs to bypass missing MCP support. If support or permissions are unavailable,
use the Design System's mapping table above as the concrete handoff and guide
the user to select each linked main component/set in Figma Dev Mode, open
**Dev resources**, and add the Storybook link. Wait for completion and verify
what tools permit. Report user-performed links and remaining verification gaps
separately; never claim an automatic write
or successful readback from instructions alone.

Report the site URL, mapping frame URL, table row count, and whether the page was
created or its URLs updated. Separately report Dev Resource target coverage,
added/updated/already-present/manual link counts, missing story mappings,
failures, and verification scope. Continue independent Code Connect work when
possible, but keep incomplete Dev Resource setup visible.
Adding links does not authorize publishing design-library changes.

Sources: [Storybook publishing](https://storybook.js.org/docs/sharing/publish-storybook),
[Storybook index](https://storybook.js.org/docs/8/api/main-config/main-config-indexers),
and [Figma Dev Resource methods](https://developers.figma.com/docs/plugins/api/DevResource/).
