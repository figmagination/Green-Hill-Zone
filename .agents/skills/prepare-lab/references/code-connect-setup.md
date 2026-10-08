# Retarget, parse, and publish both mappings

This is the final lab setup step after the user-operated library steps. Editing
this skill alone does not run this workflow. A request to run lab setup includes
publishing both mapping sets to the user's accepted imported Design System.

## Retarget both configurations

Read `packages/design-system/src/figma/README.md`. Inspect Git status and the
branch, preserve unrelated changes, and follow the repository's contribution
instructions before editing tracked config files.

Read the latest accepted Design System file key from the root `.env` without
printing credentials or sourcing the file as shell code. If an exported
`FIGMA_FILE_KEY` conflicts, resolve the intended target rather than silently
selecting it. Use the hosted **file key**, not a library key or component key.

Update every Design URL's `/design/<file-key>` segment in
`codeConnect.documentUrlSubstitutions` in both `figma.config.json` and
`figma.config.html.json`. Use structured JSON or a safely quoted file script;
preserve placeholder names, node IDs, query parameters, includes, labels,
languages, and unrelated settings. Do not bake environment credentials into
configs or templates. Leave `// url=<FIGMA_...>` template directives intact.

Verify all resolved targets use the accepted file key. With read-only Figma
access, check each configured node resolves to the expected component or set
in that file. Node IDs may survive copying but must not be assumed correct.
If any target is missing or ambiguous, stop before publishing and report it;
do not guess replacement nodes or publish to the repository's original files.

## Parse before either publish

Run from the repository root with existing installed dependencies:

```bash
npm run figma:parse
npm run figma:parse:html
```

Require both to pass before publishing either set. Inspect resolved node URLs,
React label/language (`React` / `jsx`), HTML label/language (`HTML` / `html`), and
mapping counts. Parsing does not prove token access or scopes. If dependencies
are unavailable, report the blocker instead of installing them as lab setup.

The CLI loads the root `.env`; exported variables take precedence. Do not print
or pass the token in command-line arguments. If a stale exported token overrides
`.env`, use a process environment that excludes that export or have the user
unset it. For replacement credentials, return to the hidden-input helper.

## Publish React and HTML

After successful target checks and both parses, run:

```bash
npm run figma:publish
npm run figma:publish:html
```

These are independent mapping labels. Track each command's exit status and CLI
result; report counts and target file for each. A successful React publish is
not a successful HTML publish. If one fails, report partial publication and
retry only the failed set after addressing the cause. Do not unpublish working
mappings, suppress validation, or claim success from a parse alone. If a network,
authentication, permission, or approval blocker prevents publishing, report it
accurately and provide the failed command for the user's own terminal.

Finish with `git diff --check` and review the config diff, without showing any
credential file. State which configs changed and whether each mapping set was
parsed and published. Design library publication and Code Connect snippet
publication are separate operations.
