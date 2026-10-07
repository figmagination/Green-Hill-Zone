import { PageHeader } from './PageHeader.jsx'
import BigButton from './BigButton.jsx'
import { Icon } from './Icon.jsx'
import { StatusBadge } from './StatusBadge.jsx'

export default {
  title: 'Compositions/PageHeader',
  component: PageHeader,
  parameters: { docs: { description: { component: 'Screen title and optional two-line description. Icon, badge, and actions are React node slots; the title row and actions wrap on smaller screens.' } } },
  args: { title: 'Billing & invoices', description: 'Track outstanding invoices and record payments.' },
  argTypes: { title: {"description": "Screen heading.", "control": "text", "type": "string"}, description: {"description": "Optional subtitle, limited to two lines.", "control": "text", "type": "string"}, icon: { control: false }, badge: { control: false }, actions: { control: false } },
}

export const Default = {}
export const WithSlots = { args: { icon: <Icon name="download" />, badge: <StatusBadge tone="warning">3 overdue</StatusBadge>, actions: <><BigButton variant="ghost">Export</BigButton><BigButton icon={<Icon name="plus" size={16} />}>Create invoice</BigButton></> } }
export const TitleOnly = { args: { description: undefined } }
