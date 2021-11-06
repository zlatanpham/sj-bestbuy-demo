module.exports = {
  presets: ['next/babel'],
  plugins: [
    'babel-plugin-macros',
    [
      'inline-react-svg',
      {
        svgo: {
          plugins: [
            {
              cleanupIDs: {
                minify: false,
              },
            },
          ],
        },
      },
    ],
  ],
};
