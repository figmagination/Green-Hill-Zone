import { withThemeByClassName } from '@storybook/addon-themes'
import { MemoryRouter } from 'react-router-dom'
import '../src/index.css'

export default {
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    options: { storySort: { order: ['Introduction', 'Atoms', 'Compositions'] } },
  },
  decorators: [
    withThemeByClassName({
      themes: { Light: '', Dark: 'dark', '16-bit': 'mode-16bit', '32-bit': 'mode-32bit' },
      defaultTheme: 'Light',
      parentSelector: 'html',
    }),
    (Story, context) => (
      <MemoryRouter key={context.parameters.route || '/dashboard'} initialEntries={[context.parameters.route || '/dashboard']}>
        <Story />
      </MemoryRouter>
    ),
  ],
}
