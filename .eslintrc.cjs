// config-airbnb is not yet officially compatible with flat config
// https://github.com/airbnb/javascript/issues/2961
// Backwards compatibility utility is available
// https://eslint.org/blog/2022/08/new-config-system-part-2/#backwards-compatibility-utility

/**
 * 命名規則
 */
const commonWarnNamingRules = [
  // https://google.github.io/styleguide/tsguide.html#naming-rules-by-identifier-type
  {
    selector: 'variable',
    format: ['camelCase'],
  },

  //
  // Only symbols declared on the module level, static fields of module level classes, and values of module level enums, may use CONST_CASE.
  // https://google.github.io/styleguide/tsguide.html#identifiers-constants
  //
  {
    selector: ['enum', 'enumMember'],
    format: ['UPPER_CASE'],
  },

  {
    selector: 'function',
    format: ['camelCase'],
    leadingUnderscore: 'allow',
  },

  // https://google.github.io/styleguide/tsguide.html#class-members
  {
    selector: 'accessor',
    format: ['camelCase'],
  },

  {
    selector: 'parameter',
    format: ['camelCase'],
    leadingUnderscore: 'allow',
  },

  {
    selector: 'class',
    format: ['PascalCase'],
  },

  //
  // Type parameters, like in Array<T>, may use a single upper case character (T) or UpperCamelCase
  // https://google.github.io/styleguide/tsguide.html#identifiers-type-parameters
  //
  {
    selector: 'typeParameter',
    format: ['PascalCase'],
  },

  // Enforce that boolean variables are prefixed with an allowed verb
  {
    selector: ['memberLike', 'variableLike'],
    types: ['boolean'],
    format: ['PascalCase'],
    prefix: ['can', 'did', 'has', 'is', 'must', 'need', 'should', 'will'],
  },
];

/** 共通命名rules */
const namingRules = {
  '@typescript-eslint/naming-convention': [
    'warn',
    ...commonWarnNamingRules,
  ],
};

module.exports = {
  root: true,
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  extends: [
    // airbnb includes React
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/index.js
    // airbnb-base does not include React
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/index.js
    // "airbnb-base",
    'airbnb',
    // "airbnb-typescript/base",
    'airbnb-typescript',
  ],
  rules: {
    ...namingRules,
  },
};
