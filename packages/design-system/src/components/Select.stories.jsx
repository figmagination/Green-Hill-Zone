import { Select } from './Select.jsx'
import { useArgs } from 'storybook/preview-api'
import { fn } from 'storybook/test'

export default {
  title: 'Atoms/Select',
  component: Select,
  parameters: { docs: { description: { component: 'Controlled native select with an associated label, required indicator, help text, and accessible error message. Supply a unique id. Error replaces helpText. The caller owns value and onChange.' } } },
  argTypes: { label: {"description": "Visible field label.", "control": "text", "type": "string"}, id: {"description": "Unique select id for label and message associations.", "control": "text", "type": "string"}, value: {"description": "Controlled selected option value.", "control": "text", "type": "string"}, onChange: {"description": "Receives the native React change event.", "control": false}, options: {"description": "Array of { value, label } option objects.", "control": "object"}, disabled: {"description": "Disables selection.", "control": "boolean", "type": "boolean"}, required: {"description": "Marks the field required.", "control": "boolean", "type": "boolean"}, error: {"description": "Error message; replaces helpText.", "control": "text", "type": "string"}, helpText: {"description": "Optional supporting text.", "control": "text", "type": "string"} },
  args: { id: 'region', label: 'Data region', value: 'us', options: [{ value: 'us', label: 'United States' }, { value: 'eu', label: 'Europe' }], helpText: 'Choose where your data is stored.', disabled: false, required: false, onChange: fn() },
  
}

export const Default = {
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()
    return <div style={{ maxWidth: 400 }}><Select {...args} value={value} onChange={(event) => { args.onChange(event); updateArgs({ value: event.target.value }) }} /></div>
  },
}
export const Required = { ...Default, args: { required: true } }
export const Error = { ...Default, args: { error: 'This field is required.', value: '' } }
export const Disabled = { ...Default, args: { disabled: true } }
