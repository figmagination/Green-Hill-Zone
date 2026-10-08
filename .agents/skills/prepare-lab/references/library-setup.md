# Manual library setup and verification

Library publication, Add to file, and Swap library are user-operated Figma steps.
Do not automate them or substitute Plugin API imports, instance swaps, variable
rebinding, or style changes. Read-only verification is useful, but missing tools
or permissions do not justify attempts at unsupported mutations.

Use the latest accepted `FIGMA_FILE_KEY` and `FIGMA_APP_SCREENS_FILE_KEY`.
Confirm file identity by key, not name. Figma MCP authentication is separate
from the Code Connect token. On access errors, check the connector's account
with `whoami` when available; do not expose the local token to MCP tools.

## Publish the Design System: manual

Guide the user to open the imported Design System, use **Assets → Libraries**,
review the intended components, styles, and variables, and publish. For variables
needed by the screens, have the user check that **Hide from publishing** is
unchecked on both variables and their collections. Wait for completion.

Use supported read-only evidence to verify publication. Load `figma-use` before
`use_figma`; follow its page-loading and API rules. `getPublishStatusAsync()` can
report `CURRENT` (published/current), `CHANGED` (published with pending local
changes), or `UNPUBLISHED`. Not all asset types expose this method through MCP;
check availability and report missing evidence rather than calling unsupported
methods repeatedly. For variants, inspect the containing component set and its
published availability; do not infer that an entire set is unpublished solely
from an individual variant's status. Check variable availability through the
library UI or supported read-only tools. A component key or successful file read
alone does not prove library publication. Never publish pending design changes.

## Add the library to App Screens: manual

Guide the user to open **App Screens → Assets → Libraries**, find the published
imported Design System, confirm its source file URL, and select **Add to file**.
If already enabled, leave it enabled. Wait for the user's completion, then use
`get_libraries` when available to confirm attachment. Match the attached library
to the imported Design System using published asset keys or its source URL;
matching names alone is insufficient. Do not infer attachment from importing an
asset. Leave the old and unrelated libraries enabled during migration.

## Swap references: manual

Guide the user through Figma's native flow:

1. Open **Assets → Libraries → This file** and select the old Green Hill library.
   For missing references, use **View missing libraries** and select the affected
   asset group. There may be multiple old groups from previous copies.
2. Choose **Swap library** and select the attached imported Design System.
   Confirm its source file key; library names may be identical.
3. Review component, variant, style, and variable collection matches. Keep
   **Swap default styles in instances** unchecked. Leave ambiguous or unmatched
   assets unchanged and record their names; do not detach or delete them.
4. Apply the swap to matching assets and report completion and unmatched assets.

Wait for completion. Adding a library is not a swap; an “attached” reply does not
complete this step. Do not repeat swaps for groups already migrated.

## Verify and report the evidence

When tools allow, audit every App Screens page against the target Design System's
asset keys, including nested instance main components, node and text-range
styles, style dependencies, variable bindings in paints/effects, variable alias
chains, and explicit collection mode bindings. Check representative layout and
Light, Dark, 16-bit, and 32-bit screens. Report the scope actually checked;
missing coverage remains a verification gap. If old mode bindings remain, guide
the user to set the same named themes using the new Semantic collection.

A canvas-reference audit does not inspect the full missing-library inventory.
Do not claim that this inventory is empty or that entries are harmless cached
records without direct evidence. If the UI still lists missing assets, collect
the names and usage evidence and distinguish confirmed active references from
unverified retained entries. Do not remove assets to force the list to disappear.

Report publication, attachment, and user-performed swap status separately,
including observable counts, unmatched assets, old references, and unavailable
verification. If blocked, finish independent local work and clearly identify
what remains manual or unverified. After the manual steps, continue to
[Code Connect setup](code-connect-setup.md); Code Connect publication does not
prove design-library migration is complete.

Sources: [Publication statuses](https://developers.figma.com/docs/plugins/api/PublishStatus/),
[library attachment](https://help.figma.com/hc/en-us/articles/1500008731201-Add-or-remove-a-library-from-a-design-file),
and [library swap](https://help.figma.com/hc/en-us/articles/4404856784663-Swap-libraries).
