# 从零开始搭建 Taro + Vue3 多端编译环境

## 搭建项目架构

#### 初始化项目

初始化项目之前，需安装 taro-cli，请参考 [Taro 文档](https://taro-docs.jd.com/taro/docs/GETTING-STARTED)，完成 taro 安装

使用命令创建模板项目：

```bash
taro init myApp
```

![img](/ScreenShots/init.png)

构建 weapp

```bash
yarn dev:weapp
```

打包完成后发现两点问题

- 微信提示 vonder.js 超过 500KB
- 代码依赖分析一直处于 loading，无法查看主包的依赖构成

好在 taro 在打包的时候在 shell 中输出了提示：

![img](/ScreenShots/tips.png)

在命令中添加`production`就可以开启生产环境的压缩模式，taro-cli 搭建的初始代码经过压缩后为 267KB

![img](/ScreenShots/analyse.png)
