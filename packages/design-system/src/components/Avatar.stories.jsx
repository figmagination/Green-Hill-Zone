import { Avatar } from './Avatar.jsx'


export default {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: { docs: { description: { component: 'Person avatar with a circular photo or up to two initials derived from name. Sizes are sm (24px), md (32px), and lg (40px). Pair initials with visible name text.' } } },
  args: { name: 'Alex Morgan', size: 'md' },
  argTypes: { name: {"description": "Person\u2019s full name; also the image alt text and source of initials.", "control": "text", "type": "string"}, src: {"description": "Optional photo URL. Omit to show initials.", "control": "text", "type": "string"}, size: { control: 'select', options: ['sm', 'md', 'lg'] } },
}

export const Initials = {}
export const Small = { args: { size: 'sm' } }
export const Large = { args: { size: 'lg' } }
export const SingleName = { args: { name: 'Alex' } }
export const WithImage = { args: { src: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="#b7dfc5"/><circle cx="40" cy="29" r="15" fill="#265c43"/><ellipse cx="40" cy="76" rx="28" ry="29" fill="#265c43"/></svg>')}` } }
