module.exports = {
  staticFileGlobs: [
    'src/**/*',
    'dist/**/*',
    'images/*',
    'electron-color-theme.json',
  ],
  runtimeCaching: [
    {
      urlPattern: /\/@webcomponents\/webcomponentsjs\//,
      handler: 'fastest',
    },
  ],
};
