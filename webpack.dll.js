const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');

module.exports = {
    mode: 'production',
    // 应用入口
    entry: {
        vendor: ['react', 'react-dom', 'react-redux', 'redux', 'react-router-dom', 'react-loadable']
    },
    // 输出目录
    output: {
        filename: '[name].dll.js', // name代表entry对应的名字; hash代表 整个app打包完成后根据内容加上hash。一旦整个文件内容变更，hash就会变化
        path: path.join(__dirname, 'dll'), // 打包好之后的输出路径
        library: '_dll_[name]'
    },
    plugins: [
        new DllPlugin({
            name: '_dll_[name]',
            // 描述动态链接库的 manifest.json 文件输出时的文件名称
            path: path.join(__dirname, 'dll', '[name].manifest.json'),
        })
    ]
};