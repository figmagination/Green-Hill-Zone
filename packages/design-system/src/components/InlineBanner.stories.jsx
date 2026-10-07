import { InlineBanner } from './InlineBanner.jsx'
import BigButton from './BigButton.jsx'

export default {
  title: 'Compositions/InlineBanner',
  component: InlineBanner,
  parameters: { docs: { description: { component: 'Inline contextual message with info, success, warning, or danger tone. Description and action are optional; use an action that helps resolve the message.' } } },
  args: { tone: 'info', title: 'New integration available', description: 'Connect your accounting tool to keep invoices up to date.' },
  argTypes: { title: {"description": "Message heading.", "control": "text", "type": "string"}, description: {"description": "Optional supporting message.", "control": "text", "type": "string"}, tone: { control: 'select', options: ['info', 'success', 'warning', 'danger'] }, action: { control: false } },
}

export const Info = {}
export const Success = { args: { tone: 'success', title: 'Sync complete', description: 'All invoices are up to date.' } }
export const Warning = { args: { tone: 'warning', title: 'Sync delayed' } }
export const Danger = { args: { tone: 'danger', title: 'Sync failed', description: 'Reconnect your account to resume syncing.', action: <BigButton size="sm">Reconnect</BigButton> } }
export const TitleOnly = { args: { description: undefined } }
