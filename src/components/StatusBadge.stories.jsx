import { StatusBadge } from './StatusBadge.jsx'


export default {
  title: 'Atoms/StatusBadge',
  component: StatusBadge,
  parameters: { docs: { description: { component: 'Status pill with semantic success, warning, danger, and neutral tones. The text communicates status alongside the color.' } } },
  args: { children: 'Active', tone: 'success' },
  argTypes: { children: {"description": "Visible status label.", "control": "text", "type": "string"}, tone: { control: 'select', options: ['success', 'warning', 'danger', 'neutral'] } },
}

export const Success = {}
export const Warning = { args: { children: 'Pending', tone: 'warning' } }
export const Danger = { args: { children: 'Overdue', tone: 'danger' } }
export const Neutral = { args: { children: 'Draft', tone: 'neutral' } }
