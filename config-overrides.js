// integrate less into CRA:
// https://www.jianshu.com/p/94ac7250ccf0
// https://blog.bitsrc.io/using-less-with-create-react-app-without-ejecting-510a3344ef5d

const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
    config = rewireLess.withLoaderOptions({
            javascriptEnabled: true,
    })(config, env);
    return config;
};