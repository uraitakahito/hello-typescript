import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [".Trash*", "coverage", "dist"],
  },
  ...tseslint.configs.recommended
);
