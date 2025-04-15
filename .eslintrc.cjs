module.exports = {
  env: {
    node: true,
    browser: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['import'],
  settings: {
    'import/resolver': 'typescript',
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
  },
  rules: {
    // 使用していない引数の許可
    'no-unused-vars': 'off',
  },
  overrides: [
    {
      files: ['*.js', '*.cjs', '*.mjs'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parserOptions: {
        ecmaVersion: 'latest',
        project: ['tsconfig.json'],
        tsconfigRootDir: '.',
        warnOnUnsupportedTypeScriptVersion: false,
      },
      rules: {
        // this のエイリアス設定する場合は self 指定に。
        '@typescript-eslint/no-this-alias': [
          'error',
          {
            allowDestructuring: true,
            allowedNames: ['self'],
          },
        ],
        // non-null アサーション（!）を許容する
        '@typescript-eslint/no-non-null-assertion': 0,
        // 関数の戻り値の型を指定することを許容する
        '@typescript-eslint/explicit-function-return-type': 0,
      },
    },
  ],
};
