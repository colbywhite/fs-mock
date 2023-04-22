/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
  extends: ["prettier", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  ignorePatterns: ["dist"],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
};
