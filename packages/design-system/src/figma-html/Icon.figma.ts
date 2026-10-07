// url=<FIGMA_ICON>
// source=packages/design-system/web/green-hill.css
// component=gh-icon
import figma from 'figma'
const instance = figma.selectedInstance

// Second mapping for Icon. `nestable: true` plus `metadata.props` is what lets
// the HTML BigButton template read the bare glyph name — a parent template can
// only see a child's metadata if the child is nestable AND published under the
// same label.
const name = instance.getEnum('Name', {
  plus: 'plus',
  check: 'check',
  download: 'download',
  alert: 'alert',
  refresh: 'refresh',
  external: 'external',
})

export default {
  example: figma.code`<svg class="gh-icon" aria-hidden="true"><use href="packages/design-system/src/assets/icons.svg#${name}-icon" /></svg>`,
  imports: ['<link rel="stylesheet" href="packages/design-system/web/green-hill.css" />'],
  id: 'gh-icon',
  metadata: { nestable: true, props: { name } },
}
