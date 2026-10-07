import postcss from 'postcss';
import tailwind from 'tailwindcss';
import fs from 'fs';
const cfg = './apps/app-screens/tailwind.config.js';
const css = '@tailwind base;@tailwind components;@tailwind utilities;';
const res = await postcss([tailwind(cfg)]).process(css, {from: undefined});
fs.writeFileSync('/tmp/out.css', res.css);
console.log('bytes', res.css.length);
