import preset from './tailwind.preset.js'

export default {
  presets: [preset],
  content: { relative: true, files: ['./src/**/*.{js,jsx,mdx}'] },
}
