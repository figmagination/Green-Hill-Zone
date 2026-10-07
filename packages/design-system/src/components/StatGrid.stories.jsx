import { StatGrid } from './StatGrid.jsx'
import { CardThing } from './CardThing.jsx'

export default {
  title: 'Compositions/StatGrid',
  component: StatGrid,
  parameters: { docs: { description: { component: 'Responsive metric grid with two, three, or four columns. All configurations collapse to one column on narrow screens. Children are normally CardThing instances.' } } },
  args: { columns: 4 },
  argTypes: { children: {"description": "Metric cards to arrange.", "control": false}, columns: { control: 'select', options: [2, 3, 4] } },
}

export const FourColumns = {
  render: (args) => <StatGrid {...args}>{[['Revenue', '$24,800'], ['Accounts', '128'], ['Open invoices', '32'], ['Team members', '18']].map(([title, subtext]) => <CardThing key={title} title={title} subtext={subtext} />)}</StatGrid>,
}
export const ThreeColumns = { ...FourColumns, args: { columns: 3 } }
export const TwoColumns = { ...FourColumns, args: { columns: 2 } }
