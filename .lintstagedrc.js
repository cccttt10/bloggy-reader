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
        'stylelint --fix --allow-empty-input'
    ],
    './src/**/*.less': [
        'stylelint --fix --allow-empty-input --syntax less'
    ],
    './src/**/*.scss': [
        'stylelint --fix --allow-empty-input --syntax scss'
    ]
};
