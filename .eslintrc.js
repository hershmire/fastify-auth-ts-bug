module.exports = {
  extends: ["plugin:@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  settings: {
    "import/extensions": [".js", ".mjs", ".jsx", ".ts", ".tsx"],
    "import/resolver": {
      node: {
        extensions: [".mjs", ".js", ".json", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "no-console": 0,
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",

    // Ensure consistent use of file extension within the import path
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        mjs: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
  },
};
