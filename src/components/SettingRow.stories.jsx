import { SettingRow } from './SettingRow.jsx'
import { useArgs } from 'storybook/preview-api'
import { fn } from 'storybook/test'
import BigButton from './BigButton.jsx'

export default {
  title: 'Compositions/SettingRow',
  component: SettingRow,
  parameters: { docs: { description: { component: 'Controlled boolean switch. onChange receives the next boolean. The row wires its title to the nested switch. A custom control slot replaces the switch and ignores checked/onChange.' } } },
  argTypes: { title: {"description": "Visible title and nested switch accessible name.", "control": "text", "type": "string"}, description: {"description": "Optional supporting text.", "control": "text", "type": "string"}, checked: {"description": "Controlled nested switch state.", "control": "boolean", "type": "boolean"}, onChange: {"description": "Called with the next switch boolean.", "control": false}, disabled: {"description": "Disables the nested switch.", "control": "boolean", "type": "boolean"}, control: {"description": "Custom React control; replaces the nested switch.", "control": false} },
  args: { checked: false, disabled: false, onChange: fn(), title: 'Email notifications', description: 'Receive a daily summary of workspace activity.' },
  
}

export const Off = {
  render: function Render(args) {
    const [{ checked }, updateArgs] = useArgs()
    return <SettingRow {...args} checked={checked} onChange={(next) => { args.onChange(next); updateArgs({ checked: next }) }} />
  },
}
export const On = { ...Off, args: { checked: true } }
export const Disabled = { ...Off, args: { disabled: true } }
export const DisabledOn = { ...Off, args: { disabled: true, checked: true } }
export const CustomControl = { args: { control: <BigButton variant="ghost" size="sm">Manage preferences</BigButton> } }
