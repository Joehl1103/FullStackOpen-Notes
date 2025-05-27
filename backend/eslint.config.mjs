import globals from "globals";
import { defineConfig } from "eslint/config";
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin'


export default defineConfig([
  js.configs.recommended,
  { 
    files: ["**/*.js"], 
    languageOptions: { 
      sourceType: "commonjs",
      globals: {...globals.node},
      ecmaVersion: 'latest',
    },
    plugins: {
      js,
      '@stylistic': stylisticJs,
    },
    extends: ["js/recommended"],
    rules: {
      "no-unused-vars": "warn",
      '@stylistic/indent': ['error',4],
      '@stylistic/linebreak-style': ['error','unix'],
      '@stylistic/quotes': ['error','single'],
      '@stylistic/semi': ['error','never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error','always'],
      'arrow-spacing': ['error',{before: true,after:true}],
      'no-console': 'off'
    },
  },
  {
    ignores: ['dist/**'],
  },
]);
