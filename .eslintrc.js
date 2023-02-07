module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "import", "prettier"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
  },

  ignorePatterns: [
    "**/*.js",
    "**/*.json",
    "node_modules",
    "public",
    "coverage",
    "dict",
    "build",
  ],
  rules: {
    "react/function-component-definition": [
      "error",
      { namedComponents: "arrow-function" },
    ],
    "react/jsx-props-no-spreading": "off",
    "import/prefer-default-export": "off",
    "consistent-return": ["error", { treatUndefinedAsUnspecified: true }],
    "no-unsafe-optional-chaining": [
      "error",
      { disallowArithmeticOperators: false },
    ],
    // "consistent-retur": ["error", { treatUndefinedAsUnspecified: false }],
  },
};
