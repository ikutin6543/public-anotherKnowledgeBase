const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
    // Базовый JavaScript конфиг
    js.configs.recommended,

    // Глобальные переменные для всех файлов
    {
        files: ['**/*.ts'],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.es2022,
                process: 'readonly',
                console: 'readonly',
                setTimeout: 'readonly',
                setInterval: 'readonly',
                clearTimeout: 'readonly',
                clearInterval: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                Buffer: 'readonly',
            },
            ecmaVersion: 2022,
            sourceType: 'module',
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: 'module',
            },
        },
    },

    // Конфигурация для TypeScript файлов
    {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
            '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
        },
        languageOptions: {
            parser: require('@typescript-eslint/parser'),
            parserOptions: {
                project: './tsconfig.json',
            },
        },
        rules: {
            // TypeScript специфичные правила
            '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',

            // Отключаем базовые ESLint правила, которые заменяются TypeScript аналогами
            'no-unused-vars': 'off',
            'no-undef': 'off',
        },
    },

    // Общие правила для всех файлов
    {
        files: ['**/*.ts'],
        rules: {
            "no-trailing-spaces": "error",
            'semi': ['error', 'always'],
            'eol-last': ['error', 'always'],
            'no-multiple-empty-lines': ['error', {max: 1, maxEOF: 0, maxBOF: 0}],
            'padded-blocks': ['error', 'never'],
            // Возможные ошибки
            'no-constructor-return': 'error',
            'no-duplicate-imports': 'error',
            'no-promise-executor-return': 'error',
            'no-self-compare': 'error',
            'no-template-curly-in-string': 'error',
            'no-unreachable-loop': 'error',
            'no-use-before-define': 'off', // Отключаем, т.к. TypeScript лучше обрабатывает это

            // Стиль кода
            'arrow-body-style': ['error', 'as-needed'],
            'camelcase': ['error', {properties: 'always'}],
            'consistent-return': 'error',
            'dot-notation': 'error',
            'eqeqeq': ['error', 'always'],
            'max-depth': ['error', 4],
            'no-array-constructor': 'error',
            'no-lonely-if': 'error',
            'no-multi-assign': 'error',
            'no-negated-condition': 'error',
            'no-nested-ternary': 'error',
            'no-new-object': 'error',
            'no-return-assign': 'error',
            'no-underscore-dangle': ['error', {allowAfterThis: true}],
            'no-unneeded-ternary': 'error',
            'object-shorthand': ['error', 'always'],
            'one-var': ['error', 'never'],
            'operator-assignment': ['error', 'always'],
            'prefer-arrow-callback': 'error',
            'prefer-const': 'error',
            'prefer-destructuring': ['error', {array: false, object: true}],
            'prefer-object-spread': 'error',
            'prefer-template': 'error',
            'quote-props': ['error', 'consistent-as-needed'],
            'radix': 'error',
            'spaced-comment': ['error', 'always', {markers: ['/']}],

            // ES6+ особенности
            'prefer-rest-params': 'error',
            'prefer-spread': 'error',
        },
    },

    // Игнорируемые файлы
    {
        ignores: [
            '**/node_modules/',
            '**/dist/',
            '**/build/',
            '**/coverage/',
            '**/.nyc_output/',
            '**/.eslintrc.js',
            '**/*.min.js',
            '**/webpack.config.js',
            '**/jest.config.js',
            '**/cypress/',
            '**/logs/',
            '**/.git/',
            '**/.vscode/',
            '**/.idea/',
        ],
    },
];