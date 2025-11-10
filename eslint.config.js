import tsParser from "@typescript-eslint/parser"
import tsPlugin from "@typescript-eslint/eslint-plugin"
import boundariesPlugin from "eslint-plugin-boundaries"
import reactPlugin from "eslint-plugin-react"
import reactHooksPlugin from "eslint-plugin-react-hooks"

export default [
  {
    ignores: [
      "node_modules/**",
      "*.config.js",
      "*.config.ts",
      "metro.config.js",
      "babel.config.js",
      "jest.config.js",
      "eslint.config.js",
    ],
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      boundaries: boundariesPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
      "boundaries/elements": [
        {
          type: "app",
          pattern: "src/app/*",
        },
        {
          type: "screens",
          pattern: "src/screens/*",
        },
        {
          type: "widgets",
          pattern: "src/widgets/*",
        },
        {
          type: "features",
          pattern: "src/features/*",
        },
        {
          type: "entities",
          pattern: "src/entities/*",
        },
        {
          type: "shared",
          pattern: "src/shared/*",
        },
      ],
      "boundaries/ignore": ["**/*.test.*", "**/*.spec.*"],
    },
    rules: {
      ...tsPlugin.configs["recommended"].rules,
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: "app",
              allow: ["screens", "widgets", "features", "entities", "shared"],
            },
            {
              from: "screens",
              allow: ["widgets", "features", "entities", "shared"],
            },
            {
              from: "widgets",
              allow: ["features", "entities", "shared"],
            },
            {
              from: "features",
              allow: ["entities", "shared"],
            },
            {
              from: "entities",
              allow: ["shared"],
            },
            {
              from: "shared",
              allow: ["shared"],
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/**/*.test.{ts,tsx}", "src/**/*.spec.{ts,tsx}"],
    rules: {
      "boundaries/element-types": "off",
    },
  },
]

