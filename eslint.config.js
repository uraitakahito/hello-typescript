import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [".Trash*", "coverage", "dist"],
  },
  ...tseslint.configs.recommended,

  // https://typescript-eslint.io/rules/naming-convention/
  {
    ignores: ["eslint.config.js", "jest.config.js"],
    rules: {
      "@typescript-eslint/naming-convention": "error",
    },
  }
);
