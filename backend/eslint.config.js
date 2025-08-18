import js from "@eslint/js";
import globals from "globals";
import importPlugin from "eslint-plugin-import";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      js,
      import: importPlugin
    },
    rules: {
      // base JS rules
      ...js.configs.recommended.rules,

      // import plugin rules (from plugin:import/recommended)
      ...importPlugin.configs.recommended.rules,

      // extra rules to catch mismatches
      "import/named": "error",
      "import/default": "error",
      "import/no-unresolved": "error"
    }
  }
]);