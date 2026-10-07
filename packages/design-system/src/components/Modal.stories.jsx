import { Modal } from './Modal.jsx'
import { useArgs } from 'storybook/preview-api'
import { fn } from 'storybook/test'
import BigButton from './BigButton.jsx'
import { InputField } from './InputField.jsx'

export default {
  title: 'Compositions/Modal',
  component: Modal,
  parameters: { docs: { description: { component: 'Controlled dialog shell: confirm is narrow; form is wider. Closes on Escape or backdrop click. Supply body and footer as React nodes. No focus trap or focus restoration is currently implemented.' } } },
  args: { open: false, title: 'Delete workspace?', type: 'confirm', children: 'This action permanently deletes the workspace.', onClose: fn() },
  argTypes: { open: {"description": "Controls dialog visibility.", "control": "boolean", "type": "boolean"}, onClose: {"description": "Called on Escape or backdrop click; caller must set open false.", "control": false}, title: {"description": "Accessible dialog heading.", "control": "text", "type": "string"}, type: { control: 'select', options: ['confirm', 'form'] }, children: { control: false }, footer: { control: false } },
}

export const Confirm = {
  render: function Render(args) {
    const [{ open }, updateArgs] = useArgs()
    const close = () => { args.onClose(); updateArgs({ open: false }) }
    return <><BigButton onClick={() => updateArgs({ open: true })}>Open dialog</BigButton><Modal {...args} open={open} onClose={close} footer={<><BigButton variant="ghost" onClick={close}>Cancel</BigButton><BigButton variant="danger" onClick={close}>Delete workspace</BigButton></>} /></>
  },
}
export const Form = {
  ...Confirm,
  args: { type: 'form', title: 'Invite a teammate', children: <InputField id="invite-email" label="Email address" type="email" placeholder="alex@example.com" required /> },
  render: function Render(args) {
    const [{ open }, updateArgs] = useArgs()
    const close = () => { args.onClose(); updateArgs({ open: false }) }
    return <><BigButton onClick={() => updateArgs({ open: true })}>Invite teammate</BigButton><Modal {...args} open={open} onClose={close} footer={<><BigButton variant="ghost" onClick={close}>Cancel</BigButton><BigButton onClick={close}>Send invite</BigButton></>} /></>
  },
}
