/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: 'Roboto Mono, monospace',
      ZCOOL_Q: '"ZCOOL QingKe HuangYou", serif',
      ZCOOL_K: '"ZCOOL KuaiLe", serif',
    },

    extend: {
      height: {
        screen: '100dvh',
      },
    },
  },
  plugins: [],
};
