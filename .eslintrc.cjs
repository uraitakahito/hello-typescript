// config-airbnb is not yet officially compatible with flat config
// https://github.com/airbnb/javascript/issues/2961
// Backwards compatibility utility is available
// https://eslint.org/blog/2022/08/new-config-system-part-2/#backwards-compatibility-utility
module.exports = {
  root: true,
  parserOptions: {
    project: "./tsconfig.json",
  },
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  extends: [
    // airbnb includes React
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/index.js
    // airbnb-base does not include React
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/index.js
    // "airbnb-base",
    "airbnb",
    // "airbnb-typescript/base",
    "airbnb-typescript",
  ],
};
