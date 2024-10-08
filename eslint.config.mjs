import js from "@eslint/js"
import globals from "globals"
import typescriptParser from "@typescript-eslint/parser"
import typescriptPlugin from "@typescript-eslint/eslint-plugin"
import prettierPluginRecommended from "eslint-plugin-prettier/recommended"
import functionalPlugin from "eslint-plugin-functional"
import immutablePlugin from "eslint-plugin-immutable"
import nodePlugin from "eslint-plugin-node"
import sortKeysFixPlugin from "eslint-plugin-sort-keys-fix"
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort"
import jestPlugin from "eslint-plugin-jest"
import jestFormattingPlugin from "eslint-plugin-jest-formatting"
import promisePlugin from "eslint-plugin-promise"
import testingLibraryPlugin from "eslint-plugin-testing-library"

export default [
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    ignores: [
      "node_modules/",
      "dist/",
      "eslint.config.js",
      ".prettierrc.js",
      "jest.config.*",
    ],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.es2020,
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      functional: functionalPlugin,
      node: nodePlugin,
      "sort-keys-fix": sortKeysFixPlugin,
      immutable: immutablePlugin,
      "simple-import-sort": simpleImportSortPlugin,
      promise: promisePlugin,
      "testing-library": testingLibraryPlugin,
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
        pnp: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescriptPlugin.configs.recommended.rules,

      // Functional programming rules
      "functional/immutable-data": "error",

      // Import sorting
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // Alphabetical sorting for keys in objects
      "sort-keys-fix/sort-keys-fix": "error",

      // Complexity and length
      "max-lines": [
        "warn",
        { max: 400, skipBlankLines: true, skipComments: true },
      ],
      complexity: ["error", { max: 10 }],
      "max-depth": ["error", 4],
      "max-params": ["error", 3],

      // Minimize syntax and enforce structured code
      curly: ["error", "multi-line", "consistent"],
      "no-else-return": ["error", { allowElseIf: false }],

      // Prevent invalid or debug code from slipping through
      "no-console": "error",
      "no-debugger": "error",
      "no-undefined": "warn",

      // Additional rules for better code quality
      "no-use-before-define": ["error", { functions: false, classes: true }],

      // Node specific rules
      "node/no-missing-import": "off",
      "node/no-unpublished-import": "off",

      // Additional best practices
      "prefer-const": "error",
      "no-var": "error",
      "no-unused-vars": ["off", { argsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": "off", // core rule conflict
      "@typescript-eslint/no-use-before-define": "off", // core rule conflict
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/explicit-function-return-type": "error",
    },
  },
  {
    files: ["webpack.*.{js,ts}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-process-env": "off", // Webpack configs often use process.env
      "node/no-unpublished-require": "off", // Allows using devDependencies
      "node/no-missing-require": "off", // Webpack may have custom resolve paths
    },
  },
  {
    files: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
    plugins: {
      jest: jestPlugin,
      "jest-formatting": jestFormattingPlugin,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
      ...jestFormattingPlugin.configs.recommended.rules,
    },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  prettierPluginRecommended,
]
