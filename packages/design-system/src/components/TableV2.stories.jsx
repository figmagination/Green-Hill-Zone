import { TableV2 } from './TableV2.jsx'
import { useArgs } from 'storybook/preview-api'
import { fn } from 'storybook/test'
import { StatusBadge } from './StatusBadge.jsx'

const rows = [
  { id: 'acme', cells: ['Acme', '12000', <StatusBadge key="status" tone="success">Active</StatusBadge>] },
  { id: 'bright', cells: ['Bright Labs', '8500', <StatusBadge key="status" tone="warning">Pending</StatusBadge>] },
  { id: 'cedar', cells: ['Cedar', '4300', <StatusBadge key="status" tone="danger">Overdue</StatusBadge>] },
]

export default {
  title: 'Compositions/TableV2',
  component: TableV2,
  parameters: { docs: { description: { component: 'Rows require a stable id and a cells array. Headers may be strings or { label, key } objects. Sorting and selection are controlled: onSort receives key/direction; onSelect receives a row id. The caller must reorder dataRows.' } } },
  argTypes: { headers: {"description": "Array of strings or sortable { label, key } objects.", "control": "object"}, dataRows: {"description": "Array of { id, cells } rows; ids must be stable.", "control": "object"}, sort: {"description": "Controlled { key, direction: asc or desc } sort state.", "control": "object"}, onSort: {"description": "Called with column key and next direction; caller sorts rows.", "control": false}, selectedId: {"description": "Id of the selected row.", "control": "text", "type": "string"}, onSelect: {"description": "Called with clicked row id.", "control": false} },
  args: { headers: [{ label: 'Account', key: 'account' }, { label: 'Revenue', key: 'revenue' }, 'Status'], dataRows: rows, onSort: fn(), onSelect: fn() },
  
}

export const Interactive = {
  render: function Render(args) {
    const [{ sort, selectedId }, updateArgs] = useArgs()
    const dataRows = [...args.dataRows].sort((a, b) => {
      if (!sort) return 0
      const index = sort.key === 'account' ? 0 : 1
      const result = index === 0 ? a.cells[0].localeCompare(b.cells[0]) : Number(a.cells[1]) - Number(b.cells[1])
      return sort.direction === 'asc' ? result : -result
    })
    return <TableV2 {...args} dataRows={dataRows} sort={sort} selectedId={selectedId} onSort={(key, direction) => { args.onSort(key, direction); updateArgs({ sort: { key, direction } }) }} onSelect={(id) => { args.onSelect(id); updateArgs({ selectedId: id }) }} />
  },
}
export const SelectedRow = { ...Interactive, args: { selectedId: 'acme' } }
export const SortedDescending = { ...Interactive, args: { sort: { key: 'revenue', direction: 'desc' } } }
export const Static = { args: { headers: ['Account', 'Revenue', 'Status'], onSort: undefined, onSelect: undefined } }
export const Empty = { args: { dataRows: [] } }
