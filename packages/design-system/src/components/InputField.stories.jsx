import { InputField } from './InputField.jsx'
import { useArgs } from 'storybook/preview-api'
import { fn } from 'storybook/test'
import { Icon } from './Icon.jsx'

export default {
  title: 'Atoms/InputField',
  component: InputField,
  parameters: { docs: { description: { component: 'Controlled text input with an associated label, required indicator, help text, and accessible error message. Supply a unique id. Error replaces helpText. The caller owns value and onChange.' } } },
  argTypes: { compact: { description: 'Removes the outer margin and uses a 40px input for grid forms.', control: 'boolean' }, icon: { description: 'Optional decorative leading icon slot.', control: false }, label: {"description": "Visible field label.", "control": "text", "type": "string"}, id: {"description": "Unique input id; connects the label and help/error text.", "control": "text", "type": "string"}, value: {"description": "Controlled input value.", "control": "text", "type": "string"}, onChange: {"description": "Receives the native React change event.", "control": false}, placeholder: {"description": "Hint shown when value is empty.", "control": "text", "type": "string"}, type: {"description": "Native input type, such as text, email, or password.", "control": "text", "type": "string"}, disabled: {"description": "Disables editing.", "control": "boolean", "type": "boolean"}, required: {"description": "Marks the field required.", "control": "boolean", "type": "boolean"}, error: {"description": "Error message; takes precedence over helpText.", "control": "text", "type": "string"}, helpText: {"description": "Optional supporting text.", "control": "text", "type": "string"} },
  args: { id: 'workspace-name', label: 'Workspace name', value: 'Green Hill', helpText: 'Shown to everyone in your workspace.', disabled: false, required: false, onChange: fn() },
  
}

export const Default = {
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()
    return <div style={{ maxWidth: 400 }}><InputField {...args} value={value} onChange={(event) => { args.onChange(event); updateArgs({ value: event.target.value }) }} /></div>
  },
}
export const Required = { ...Default, args: { required: true } }
export const Error = { ...Default, args: { error: 'This field is required.', value: '' } }
export const Disabled = { ...Default, args: { disabled: true } }
export const Compact = { ...Default, args: { compact: true, helpText: undefined } }
export const WithIcon = { ...Compact, args: { ...Compact.args, icon: <Icon name="external" size={16} /> } }
export const Placeholder = { ...Default, args: { value: '', placeholder: 'Enter a workspace name', helpText: undefined } }
export const Password = { ...Default, args: { id: 'password', label: 'Password', type: 'password', value: 'secret-example', helpText: undefined } }
