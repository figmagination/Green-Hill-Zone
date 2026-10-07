import { NavItem } from './NavBar.jsx'

export default {
  title: 'Atoms/NavItem',
  component: NavItem,
  argTypes: { to: {"description": "Router destination.", "control": "text", "type": "string"}, active: {"description": "Marks this link as the current page.", "control": "boolean", "type": "boolean"}, children: {"description": "Link label.", "control": "text", "type": "string"} },
  args: { to: '/dashboard', children: 'Dashboard', active: false },
  parameters: { docs: { description: { component: 'Navigation link with a controlled active state and aria-current="page". Requires a router, supplied by Storybook. NavBar derives active from the route.' } } },
}
export const Default = {}
export const Active = { args: { active: true } }
