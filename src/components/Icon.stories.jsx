import { Icon } from './Icon.jsx'


export default {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: { docs: { description: { component: 'SVG sprite glyphs inherit currentColor. Omit label for decorative icons; provide label for a meaningful standalone icon.' } } },
  args: { name: 'plus', size: 20 },
  argTypes: { size: {"description": "Width and height in pixels.", "control": "number", "type": "number"}, label: {"description": "Accessible name; omit for decorative icons.", "control": "text", "type": "string"}, name: { control: 'select', options: ['plus', 'check', 'download', 'alert', 'refresh', 'external'] } },
}

export const Default = {}
export const Accessible = { args: { name: 'alert', label: 'Attention required' } }
export const AllGlyphs = {
  render: (args) => <div className="flex flex-wrap gap-6">{['plus', 'check', 'download', 'alert', 'refresh', 'external'].map((name) => <div key={name} className="flex items-center gap-2"><Icon {...args} name={name} /><span>{name}</span></div>)}</div>,
}
