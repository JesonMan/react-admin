# react-admin

react + redux + react-router + sass + antd + eslint + webpack 后台管理系统Demo

项目预览地址 [https://jesonman.github.io/react-admin-demo/](https://jesonman.github.io/react-admin-demo/)（预览地址无法访问的话，把DNS改成 114.114.114.114 即可访问）

# 使用方法

先执行以下命令，下载所有依赖的第三方模块

```shell
npm install
```

接着执行以下命令，dll化常用的第三方模块，只需dll一次，生成对应文件即可，后续这些第三方模块没更新的情况下，都不需要再次dll了。dll化可以提高webpack构建速度，也有利于客户端缓存。

```shell
npm run dll
```

执行以下命令，可进行开发

```shell
npm run dev
```

执行以下命令，可打包项目

```shell
npm run build
```

# 相关优化

1. 使用DllPlugin和DllReferencePlugin插件，dll化常用的第三方模块，提高webpack构建速度，也有利于客户端缓存。
2. 使用HappyPack插件开启多进程loader转换，提高webpack构建速度。
3. 使用autoprefixer实现自动补全css浏览器兼容前缀。
4. 使用MiniCssExtractPlugin插件抽离css到单独的css文件，并使用OptimizeCssAssetsPlugin插件对css进行压缩。
5. 使用react-loadable实现代码分割，从而实现按需加载。

# 相关页面

### 登录
![登录](https://jesonman.github.io/images/react-admin/login.png)

### 首页
![首页](https://jesonman.github.io/images/react-admin/home.png)
