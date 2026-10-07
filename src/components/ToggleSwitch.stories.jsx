import ToggleSwitch from './ToggleSwitch.jsx'
import { useArgs } from 'storybook/preview-api'
import { fn } from 'storybook/test'

export default {
  title: 'Atoms/ToggleSwitch',
  component: ToggleSwitch,
  parameters: { docs: { description: { component: 'Controlled boolean switch. onChange receives the next boolean. Provide label or labelledBy for an accessible name.' } } },
  argTypes: { checked: {"description": "Controlled boolean state.", "control": "boolean", "type": "boolean"}, onChange: {"description": "Called with the next boolean state.", "control": false}, disabled: {"description": "Disables toggling.", "control": "boolean", "type": "boolean"}, label: {"description": "Accessible name when no labelledBy is supplied.", "control": "text", "type": "string"}, labelledBy: {"description": "Id of an element providing the accessible name.", "control": "text", "type": "string"} },
  args: { checked: false, disabled: false, onChange: fn(), label: 'Email notifications' },
  
}

export const Off = {
  render: function Render(args) {
    const [{ checked }, updateArgs] = useArgs()
    return <ToggleSwitch {...args} checked={checked} onChange={(next) => { args.onChange(next); updateArgs({ checked: next }) }} />
  },
}
export const On = { ...Off, args: { checked: true } }
export const Disabled = { ...Off, args: { disabled: true } }
export const DisabledOn = { ...Off, args: { disabled: true, checked: true } }
