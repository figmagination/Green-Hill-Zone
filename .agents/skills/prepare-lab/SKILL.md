---
name: prepare-lab
description: Prepare Green Hill Zone for a training lab by saving Figma file keys and a hidden-entry token, guiding manual library publication, attachment and swapping, verifying available evidence, linking components to hosted Storybook through Figma MCP when supported, and retargeting and publishing React and HTML Code Connect mappings.
---

# Prepare Green Hill Zone for a lab

Use when asked to set up this repository for a lab. Creating or editing this
skill does not itself start lab setup.

## Inspect the project

Locate the repository root using `AGENTS.md`, `package.json`, and `figma-files/`.
Read the root `README.md`, `figma-files/README.md`, and `.env-example` for current
paths and environment conventions. Preserve local changes.

Use the **repository-root `.env`**: the Code Connect CLI loads it from the working
directory, so run project commands from the root. The app and Storybook do not
need credentials. Do not create workspace `.env` files or duplicate the token.
The ignored local configuration needs no commit. Library publication, attachment,
and swapping are manual user steps; guide them and verify with read-only Figma
tools when available. Do not attempt these operations through UI automation or
Plugin API substitutes. Invoking lab setup includes retargeting the tracked Code
Connect configs and publishing both React and HTML mappings to the imported
Design System as the final step. Setup also collects the hosted Storybook URL
and writes a linked component mapping table into the Design System, updating
only Storybook URLs when its handoff page already exists. It adds component
Dev Resource links through supported Figma MCP operations.
Do not modify the repository's original hosted
design files. Editing this skill alone does not authorize running lab setup or
publishing mappings.

Check whether `.env` exists and which setup variables are populated without
displaying their values. Never print the file, token, or credential diff.
Treat example placeholders as unconfigured.

## Display import instructions and prompt for both keys

Show the user these instructions before asking for keys:

1. Sign in to the Figma account and organization for the lab. Open the
   destination folder in the file browser. Organization and Enterprise folders
   require a paid seat and edit access.
2. Choose **Create new → Import → Import from computer** and select both files:
   - `figma-files/Green Hill - Design System.fig`
   - `figma-files/Green Hill - App Screens.fig`
   Alternatively, drag both files into the file browser.
3. Open each imported file and copy its hosted URL. In
   `https://www.figma.com/design/abc123/File-Name?node-id=0-1`, the key is
   `abc123`, immediately after `/design/`. Local paths, filenames, and node IDs
   are not file keys.
4. The imported Design System needs to be published as a Figma library for App
   Screens to use it. You will publish the library, add it to App Screens, and
   use Figma's native Swap library flow. Setup guides these manual steps and
   checks available evidence. Importing both files does not automatically
   reconnect those references.

Link [Figma's import instructions](https://help.figma.com/hc/en-us/articles/360041003114-Import-files-to-the-file-browser).
Importing is a manual user step; do not claim to have uploaded the files.

Prompt for **both** keys, clearly labeled Design System and App Screens. Accept
bare keys or hosted Figma Design URLs and extract their keys. Use a user-input
tool when available, or ask in chat and wait. If asking in chat, ask for each key independently.
Never substitute the original repository file keys for missing answers. Reject empty values, placeholders,
local paths, node IDs, and malformed URLs; ask for the affected value again.
Bare keys must contain only ASCII letters and digits. If both keys match, ask
the user to check which imported file each belongs to. Elapsed time does not
complete a manual step.

For existing configuration, let the user keep existing keys or supply
replacements. Do not overwrite existing values without that choice.

## Display token instructions and prompt for the token

Show the user these instructions before asking for the token:

1. In Figma's file browser, open the account menu, choose **Settings**, then
   **Security**.
2. Under **Personal access tokens**, choose **Generate new token**. Name it
   something recognizable, such as `Green Hill Zone lab`, and choose an
   expiration appropriate for the lab.
3. Enable **Code Connect: Write** (`code_connect:write`) and **File content:
   Read** (`file_content:read`). The account must have access to the imported
   Design System file.
4. Generate and copy the token immediately; Figma only displays it at creation.

Link [Figma's token instructions](https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens)
and [Code Connect setup](https://developers.figma.com/docs/code-connect/quickstart-guide/).

If already configured, offer to keep the token or replace it; never overwrite
it without that choice. **Token entry must not display the token on screen.**
Never request it in chat, an ordinary text input tool, or a visible editor.

For a new or replacement token, ask the user to run this command from the repo
root in their own interactive terminal:

```bash
python3 .agents/skills/prepare-lab/scripts/capture_token.py
```

The helper prompts with terminal echo disabled and saves the token directly in
the root `.env`. Nothing appears while typing or pasting. Ask the user to reply
only when it reports success. Do not launch it in an agent-owned terminal and
then ask for the token through chat or a tool call. The helper refuses to read
input if hidden entry is unavailable. If Python or an interactive terminal is
unavailable, report that token capture is blocked; do not fall back to visible
input. Wait for completion; never invent a token or treat a timeout as consent.

Reject empty values, placeholders, and whitespace or line breaks. Do not enforce
a particular token prefix or length. Never echo the token, include it in
command-line arguments or shell history, or put it in a tracked file. Validation
errors must not include rejected values.

## Save local configuration

Save accepted values under these exact names:

| Variable | Value |
| --- | --- |
| `FIGMA_FILE_KEY` | Imported Design System key; retains the existing convention. |
| `FIGMA_APP_SCREENS_FILE_KEY` | Imported App Screens key for lab reference. |
| `FIGMA_ACCESS_TOKEN` | Code Connect personal access token. |

Before saving a token, verify `.env` is ignored and untracked with
`git check-ignore .env` and `git ls-files -- .env`. If tracked or not ignored,
resolve that issue with the user before storing credentials. Reject symlinks
that redirect the write outside the intended repository file.

If `.env` is absent, initialize it from `.env-example`. Otherwise update only
setup variables the user supplied for replacement. Preserve unrelated
variables, comments, and existing credentials, including the token saved by
the hidden-input helper. Keep retained values unchanged. Ensure each
setup variable has one active assignment so stale duplicates do not win.

Use dotenv-compatible values and file APIs or a safely quoted script; never
interpolate raw user input into shell commands. Write without emitting contents.
Use owner-only read/write file permissions where supported. Never add `VITE_`
prefixes or save real values in `.env-example`.

Verify saved variables are present and non-placeholder through a check that
prints only variable names and configured/missing status. Do not source `.env`
as shell code. Report the path and variable names saved, never the token. Report
incomplete input or blocked writes accurately.

## Guide and verify manual library setup

Follow [Manual library setup and verification](references/library-setup.md).
Use `FIGMA_FILE_KEY` as the target Design System and
`FIGMA_APP_SCREENS_FILE_KEY` as the App Screens file. Re-read the configured keys
before each phase so replacements do not leave stale file targets in use.
Guide the user through publication, attachment, and swapping; wait for each
required manual step and verify what read-only tools permit. Never claim to
have performed a manual operation or that a canvas audit proves Figma's missing
library inventory is empty. Report unavailable tools and verification gaps
without repeatedly attempting unsupported actions.

## Collect the Storybook URL and link components

Ask for the user's hosted **Storybook** URL (also called “storyboard” in some
requests). Do not assume the repository's published example is their lab site.
If they do not have a URL, follow
[Deploy Storybook and add component Dev Resources](references/storybook-setup.md)
to guide the existing GitHub Actions/Pages workflow; wait for a working URL.
Use that reference to validate the site and write an editable mapping table on
its **Storybook Dev Resources** page in the accepted Design System. Link each
component cell to its actual Figma node and each documentation cell to its
verified Storybook URL. If the page exists, update only Storybook URLs and their
hyperlinks in place. Do not include agent-prompt instructions or substitute a
temporary file for the Figma output. Then add or update Dev Resource links
through supported Figma MCP operations. Invoking lab setup authorizes the page
and these links. Never use REST for Dev Resource changes. If MCP cannot perform
or verify the resource changes, use the table for manual linking and report the
gap.

## Final step: retarget and publish Code Connect

After library setup and the Storybook link step, follow
[Retarget, parse, and publish both mappings](references/code-connect-setup.md).
Read `packages/design-system/src/figma/README.md` before modifying mappings.
Update `documentUrlSubstitutions` in both `figma.config.json` and
`figma.config.html.json` to the accepted Design System **file key**, preserving
node IDs. A library asset key is not a hosted file key. Then parse both sets,
verify the targets, and publish both React and HTML using the existing npm
commands. Invoking lab setup authorizes this final publication; do not add a
second confirmation when the target is already accepted.

## Handoff

Report the root `.env` path and configured variable names without their values,
manual library step completion, publication and attachment evidence, reference
audit scope, any unmatched assets or remaining references, and verification gaps.
Report the hosted Storybook URL, linked mapping frame, table row count, and
whether the page was created or its URLs updated. Report actual Dev Resource
link counts separately, along with missing stories, manual links, unsupported
MCP operations, and verification gaps.
Report both config updates, React and HTML parse outcomes, and each publish
outcome separately. Do not describe the lab as fully ready if a required manual
step, verification, or either publication remains incomplete.

Explain that `.env` keys do not rewrite Code Connect URLs automatically; setup
now updates both configs explicitly. Exported shell variables override `.env`;
an old exported `FIGMA_ACCESS_TOKEN` may need to be unset. Saving configuration
alone does not prove API access or token scopes. Do not publish the design
library on the user's behalf, mutate App Screens, change unrelated Figma files,
install dependencies, or configure MCP authentication as part of this setup.
