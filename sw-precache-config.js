module.exports = {
  staticFileGlobs: [
    'src/**/*',
    'manifest.json',
  ],
  runtimeCaching: [
    {
      urlPattern: /\/@webcomponents\/webcomponentsjs\//,
      handler: 'fastest',
    },
  ],
};
