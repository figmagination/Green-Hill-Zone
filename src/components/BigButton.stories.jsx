import BigButton from './BigButton.jsx'
import { fn } from 'storybook/test'
import { Icon } from './Icon.jsx'

export default {
  title: 'Atoms/BigButton',
  component: BigButton,
  parameters: { docs: { description: { component: 'Primary, ghost, and danger actions in two sizes. The icon slot leads the label and inherits its color. Disabled buttons ignore clicks.' } } },
  args: { children: 'Save changes', variant: 'primary', size: 'md', disabled: false, onClick: fn() },
  argTypes: { children: {"description": "Button label.", "control": "text", "type": "string"}, type: {"description": "Native HTML button type.", "control": "text", "type": "string"}, disabled: {"description": "Disables interaction.", "control": "boolean", "type": "boolean"}, onClick: {"description": "Called when the enabled button is clicked.", "control": false}, variant: { control: 'select', options: ['primary', 'ghost', 'danger'] }, size: { control: 'select', options: ['sm', 'md'] }, icon: { control: false } },
}

export const Primary = {}
export const Ghost = { args: { variant: 'ghost' } }
export const Danger = { args: { variant: 'danger', children: 'Delete workspace' } }
export const Small = { args: { size: 'sm' } }
export const Disabled = { args: { disabled: true } }
export const WithIcon = { args: { children: 'Download report', icon: <Icon name="download" size={16} /> } }
