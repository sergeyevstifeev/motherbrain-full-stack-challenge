module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard-with-typescript', 'plugin:storybook/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 0,
    '@typescript-eslint/strict-boolean-expressions': ['warn', {
      allowNullableNumber: true
    }]
  }
};
