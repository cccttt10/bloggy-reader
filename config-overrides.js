// integrate less into CRA: // https://www.jianshu.com/p/94ac7250ccf0

const { override, addLessLoader } = require('customize-cra');

module.exports = override(
    addLessLoader({
        strictMath: true,
        noIeCompat: true,
        javascriptEnabled: true,
        cssLoaderOptions: {
            modules: { localIdentName: '[name]_[local]_[hash:base64:5]' }
        }
    })
);