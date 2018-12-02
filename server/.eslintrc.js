module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: 'airbnb-base',
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'indent': 'off',
        'linebreak-style' : 'off',
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
};
