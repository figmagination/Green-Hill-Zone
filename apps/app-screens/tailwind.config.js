import preset from '@green-hill/design-system/tailwind-preset'

export default {
  presets: [preset],
  content: {
    relative: true,
    files: ['./index.html', './src/**/*.{js,jsx}', '../../packages/design-system/src/**/*.{js,jsx}'],
  },
}
