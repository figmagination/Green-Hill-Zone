import { CardThing } from './CardThing.jsx'


export default {
  title: 'Compositions/CardThing',
  component: CardThing,
  parameters: { docs: { description: { component: 'Metric card with a single-line truncated title, a prominent value, and optional footer. Long titles remain available as a native tooltip.' } } },
  argTypes: { title: {"description": "Metric title; truncates to one line.", "control": "text", "type": "string"}, subtext: {"description": "Prominent metric value.", "control": "text", "type": "string"}, footerNote: {"description": "Optional supporting note.", "control": "text", "type": "string"} },
  args: { title: 'Monthly revenue', subtext: '$24,800', footerNote: '+12% from last month' },
  
}

export const Default = { render: (args) => <div style={{ maxWidth: 320 }}><CardThing {...args} /></div> }
export const WithoutFooter = { ...Default, args: { footerNote: undefined } }
export const LongTitle = { ...Default, args: { title: 'Monthly recurring revenue across all active enterprise accounts' } }
