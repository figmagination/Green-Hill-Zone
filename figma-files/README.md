# Figma training files

This folder contains local Figma Design exports for the Green Hill Zone training
asset. Import them into your Figma workspace to use alongside the component
library for guides on Dev Mode, Code Connect, the Figma MCP server, and Make.

## Files

| File | Purpose | Related code |
| --- | --- | --- |
| [Green Hill - Design System.fig](<Green Hill - Design System.fig>) | The companion design system: reusable components, variants, and design tokens used as the foundation for exercises. | [`packages/design-system/src/components/`](../packages/design-system/src/components/), [`packages/design-system/src/index.css`](../packages/design-system/src/index.css), and [`packages/design-system/src/figma/`](../packages/design-system/src/figma/). |
| [Green Hill - App Screens.fig](<Green Hill - App Screens.fig>) | Example operations screens that show the design system in context, including dashboard, billing, team, integrations, reports, and settings examples. | [`apps/app-screens/src/pages/`](../apps/app-screens/src/pages/) and the routes in [`apps/app-screens/src/App.jsx`](../apps/app-screens/src/App.jsx). |

Both files were exported on **October 7, 2026 (UTC)**, according to their embedded
metadata. They are snapshots; changes to hosted Figma files or repository code
do not automatically update these exports.

## Import into Figma

1. Sign in to the Figma account and organization where you will run the exercises.
2. Open the destination folder in Figma's file browser.
3. Choose **Create new → Import → Import from computer** and select both `.fig`
   files. You can also drag them into the file browser.
4. Open the imported Design System and App Screens files and save their URLs for
   use in the guides.

Importing into an Organization or Enterprise folder requires a paid seat and
edit access to that folder. See
[Figma's import instructions](https://help.figma.com/hc/en-us/articles/360041003114-Import-files-to-the-file-browser).
The Figma MCP tools available for this project do not provide a complete `.fig`
upload workflow; import through Figma before using the hosted file with MCP.

## Connect your training copies

### Design library and app screens

Publish the imported Design System as a library when the exercise requires
cross-file component reuse. Check the App Screens instances and swap their
library references to your imported Design System as needed. Importing both files
does not guarantee that screen instances reference your new library.

### Code Connect

Use the hosted Design System URL to find its file key: in
`https://www.figma.com/design/<file-key>/<file-name>`, it is the segment after
`/design/`.

Follow the [environment setup](../README.md#configure-figma-environment-variables)
to configure `FIGMA_ACCESS_TOKEN` and `FIGMA_FILE_KEY` in the repository-root
`.env` or shell environment. Then update `documentUrlSubstitutions` in
[`figma.config.json`](../figma.config.json) and, for HTML mappings,
[`figma.config.html.json`](../figma.config.html.json) to target your imported file.
`FIGMA_FILE_KEY` does not automatically rewrite these URLs. Verify that each node
ID resolves to the intended component in the imported file.

Run `npm run figma:parse` and, if using HTML mappings,
`npm run figma:parse:html` from the repository root. Review the resolved URLs
before publishing mappings to your training copy. The
[Code Connect reference](../packages/design-system/src/figma/README.md) explains the mapping and
publishing workflow.

### MCP server and Make

Provide the hosted file or node URLs from your imported copies when a guide asks
for design context. Follow that guide's MCP client or Make setup instructions;
the local `.fig` files supply the design assets. Use the repository's existing
components when implementing or extending the example screens.

For app setup, Storybook, and contribution guidance, see the
[project README](../README.md) and [agent instructions](../AGENTS.md).
