module.exports = {
  syntax: 'scss',
  plugins: ['stylelint-scss', 'stylelint-prettier'],
  extends: ['stylelint-config-recess-order', 'stylelint-config-recommended-scss'],
  rules: {
    'function-no-unknown': null,
    'no-empty-source': null,
    'block-no-empty': null,
    'font-family-no-missing-generic-family-keyword': null,
    'no-descending-specificity': null,
    'selector-id-pattern': null,
    'color-function-notation': 'legacy',
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['initial-scale', ':root'],
        ignoreSelectors: [':root'],
        ignoreAtRules: ['use', 'forward'],
      },
    ],
    'at-rule-no-unknown': null,
    'scss/at-mixin-pattern': '^[_a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    'selector-pseudo-element-colon-notation': 'double',
    'scss/selector-no-union-class-name': null,
  },
};
