// prettier-ignore
module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true
    },
    'extends': ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 9,
        'sourceType': 'module'
    },
    'plugins': ['simple-import-sort', 'react', '@typescript-eslint'],
    'rules': {
        '@typescript-eslint/explicit-function-return-type': 'warn',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': ['error', {
            'argsIgnorePattern': '^(props)$',
            'varsIgnorePattern': 'React'
        }],
        '@typescript-eslint/no-use-before-define': 'error',
        'camelcase': 'error',
        'eqeqeq': 'error',
        'max-lines': ['warn', 200],
        'no-console': 'warn',
        'no-trailing-spaces': 'error',
        'no-unused-vars': ['error', {
            'argsIgnorePattern': '^(props)$',
            'varsIgnorePattern': 'React'
        }],
        'no-var': 'error',
        'react/boolean-prop-naming': 'error',
        'react/jsx-key': 'error',
        'react/no-children-prop': 'off',
        'react/no-unused-prop-types': 'error',
        'react/no-unused-state': 'error',
        'react/prefer-stateless-function': 'error',
        'react/prop-types': 'off',
        'require-await': 'error',
        'simple-import-sort/sort': 'error'
    },
    'settings': {
        'react': {
            'version': 'detect'
        }
    }
};