const { override, fixBabelImports } = require('customize-cra');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
module.exports = override(
    fixBabelImports('import',{
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),

)