module.exports = {
  suites: [
    'test',
  ],
  expanded: true,
  plugins: {
    local: {
      browsers: ['chrome'],
    },
    istanbulcoverage: {
      dir: './coverage',
      reporters: [
        'text',
        'text-summary',
        'lcov',
        'json',
      ],
      include: [
        'dist/**/*.html',
      ],
      exclude: [],
      thresholds: {
        global: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80,
        },
      },
    },
  },
};
