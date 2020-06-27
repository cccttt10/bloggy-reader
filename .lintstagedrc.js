module.exports = {
    './src/**/*.ts': [
        'prettier --config ./.prettierrc.json --check',
        'eslint --no-error-on-unmatched-pattern'
    ],
    './src/**/*.tsx': [
        'prettier --config ./.prettierrc.json --check',
        'eslint --no-error-on-unmatched-pattern'
    ],
    './src/**/*.js': [
        'prettier --config ./.prettierrc.json --check',
        'eslint --no-error-on-unmatched-pattern'
    ],
    './src/**/*.jsx': [
        'prettier --config ./.prettierrc.json --check',
        'eslint --no-error-on-unmatched-pattern'
    ],
    './src/**/*.css': [
        'prettier --config ./.prettierrc.json --check',
        'stylelint --fix --allow-empty-input'
    ],
    './src/**/*.less': [
        'prettier --config ./.prettierrc.json --check',
        'stylelint --fix --allow-empty-input --syntax less'
    ],
    './src/**/*.scss': [
        'prettier --config ./.prettierrc.json --check',
        'stylelint --fix --allow-empty-input --syntax scss'
    ]
};
