// url=<FIGMA_CARD_THING>
// source=packages/design-system/src/components/CardThing.jsx
// component=CardThing
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Title')
const subtext = instance.getString('Subtext')
const footerNote = instance.getString('FooterNote')
const hasFooter = instance.getEnum('Has Footer', { true: true, false: false })

export default {
  example: figma.code`<CardThing title="${title}" subtext="${subtext}"${hasFooter ? figma.code` footerNote="${footerNote}"` : ''} />`,
  imports: ["import { CardThing } from '@green-hill/design-system/components/CardThing.jsx'"],
  id: 'card-thing',
  metadata: { nestable: true },
}
