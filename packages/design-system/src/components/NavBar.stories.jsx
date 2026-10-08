import NavBar from './NavBar.jsx'


export default {
  title: 'Compositions/NavBar',
  component: NavBar,
  parameters: { docs: { description: { component: 'Global navigation with an active link for the current route and nested routes, plus a theme toggle. Requires a React Router provider, supplied by Storybook.' } } },
  argTypes: { brand: {"description": "Workspace brand text.", "control": "text", "type": "string"} },
  args: { brand: 'Green Hill' },
  
}

export const Dashboard = { parameters: { layout: 'fullscreen', route: '/dashboard' } }
export const Accounts = { parameters: { layout: 'fullscreen', route: '/accounts' } }
export const Billing = { parameters: { layout: 'fullscreen', route: '/billing' } }
export const NestedBilling = { parameters: { layout: 'fullscreen', route: '/billing/aging' } }
export const CustomBrand = { ...Dashboard, args: { brand: 'Your workspace' } }
