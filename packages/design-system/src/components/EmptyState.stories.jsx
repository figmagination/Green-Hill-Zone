import { EmptyState } from './EmptyState.jsx'
import BigButton from './BigButton.jsx'

export default {
  title: 'Compositions/EmptyState',
  component: EmptyState,
  parameters: { docs: { description: { component: 'Placeholder for a section without data. State what is missing and offer one useful action. The illustration area is currently a placeholder.' } } },
  args: { title: 'No reports yet', description: 'Connect a data source to create your first report.' },
  argTypes: { title: {"description": "Heading explaining missing data.", "control": "text", "type": "string"}, description: {"description": "Optional supporting message.", "control": "text", "type": "string"}, action: { control: false } },
}

export const Default = {}
export const WithAction = { args: { action: <BigButton>Connect a data source</BigButton> } }
export const TitleOnly = { args: { description: undefined } }
