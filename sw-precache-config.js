module.exports = {
  staticFileGlobs: [
    'dist/**/*',
    'images/*',
    '*.css',
    'electron-color-theme.json',
  ],
  runtimeCaching: [
    {
      urlPattern: /\/@webcomponents\/webcomponentsjs\//,
      handler: 'fastest',
    },
  ],
};
