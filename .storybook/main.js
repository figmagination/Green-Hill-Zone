export default {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.jsx'],
  addons: ['@storybook/addon-docs', '@storybook/addon-themes'],
  framework: { name: '@storybook/react-vite', options: {} },
  staticDirs: ['../public'],
  core: { disableTelemetry: true },
  async viteFinal(config) {
    // Relative assets work on both / and /<repository>/ GitHub Pages sites.
    return { ...config, base: './' }
  },
}
