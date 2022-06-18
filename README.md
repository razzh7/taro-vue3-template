# 从零开始搭建Taro + Vue3多端编译环境

## 搭建项目架构

#### 初始化项目

初始化项目之前，需安装 taro-cli，请参考 [Taro 文档](https://taro-docs.jd.com/taro/docs/GETTING-STARTED)，完成 taro 安装

使用命令创建模板项目：

```bash
taro init myApp
```

![image-20220618104235694](/Users/razzh/Library/Application Support/typora-user-images/image-20220618104235694.png)

构建weapp

```bash
yarn dev:weapp
```

打包完成后发现两点问题

+ 微信提示vonder.js超过500KB
+ 代码依赖分析一直处于loading，无法查看主包的依赖构成

好在taro在打包的时候在shell中输出了提示：

![image-20220618104823001](/Users/razzh/Library/Application Support/typora-user-images/image-20220618104823001.png)

在`package.json`将`dev:weapp`改为`NODE_ENV=production npm run build:weapp -- --watch`就可以开启生产环境的压缩模式，taro-cli搭建的初始代码经过压缩后为267KB

![image-20220618105117028](/Users/razzh/Library/Application Support/typora-user-images/image-20220618105117028.png)