// integrate less into CRA: // https://www.jianshu.com/p/94ac7250ccf0

// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const { override, addLessLoader } = require('customize-cra');

// module.exports = override(
//     addLessLoader({
//         strictMath: true,
//         noIeCompat: true,
//         javascriptEnabled: true,
//         cssLoaderOptions: {
//             modules: { localIdentName: '[name]_[local]_[hash:base64:5]' }
//         }
//     })
// );

const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {

    config = rewireLess.withLoaderOptions({
            javascriptEnabled: true,
    })(config, env);

    return config;
};