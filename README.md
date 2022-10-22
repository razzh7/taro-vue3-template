# 功能
- [unocss](https://uno.antfu.me/) - 原子化 css 引擎
- [NutUI 组件库](https://nutui.jd.com/#/zh-CN/guide/intro) - Vue 3 组件库，支持 H5 和 小程序双端编译
- CHANGELOG - 自动生成 commit 提交记录
- ESlint + Prettier - 组合管理代码质量和风格
- Git 提交内容校验 - husky、commitlint、lint-staged

# 插件
可以在扩展（Extentions） 中搜索 @recommended，就像这样：

![img](/screenshots/extentions.png)

这样就可以看到 `.vscode` 文件中推荐的插件扩展了

# 从零开始搭建 Taro + Vue3 多端编译环境

## 一、搭建项目架构

#### 初始化项目

初始化项目之前，需安装 taro-cli，请参考 [Taro 文档](https://taro-docs.jd.com/taro/docs/GETTING-STARTED)，完成 taro 安装

使用命令创建模板项目：

```bash
taro init myApp
```

构建 weapp

```bash
pnpm dev weapp
```

打包完成后发现两点问题

- 微信提示 vonder.js 超过 500KB
- 代码依赖分析一直处于 loading，无法查看主包的依赖构成

好在 taro 在打包的时候在 shell 中输出了提示：

![img](/screenshots/tips.png)

在命令中添加 `production` 就可以开启生产环境的压缩模式，taro-cli 搭建的初始代码经过压缩后为 267KB

![img](/screenshots/analyse.png)

**PS**：在编译 `H5` 平台的时候，不推荐开启 `production` 模式，会导致编译报错：

![img](/screenshots/exceed-size.png)

H5 默认开启 `webpack-bundle-analyzer` 来分析打包后的依赖：

![img](/screenshots/webpack-analyzer.png)

## 二、设置代码规范的 Eslint Prettier

- 代码规范 ESlint
- 代码格式化 Prettier

#### 1、安装依赖

```shell
pnpm add @vue/eslint-config-prettier @vue/eslint-config-typescript eslint-plugin-prettier prettier -D
```

#### 2、设置配置

目录下新增 `.eslintrc.js` 和 `.prettierrc` 文件。  
如果 VSCode 中已经存在插件 prettier，请关闭。两者在保存的时候，VSCode 中的 prettier 插件的优先级大于项目中的 prettier。

## 三、Git 提交规范

- Git 钩子控制 [husky](https://typicode.github.io/husky/#/)
- Git 暂存区 lint 检查 [lint-staged](https://github.com/okonet/lint-staged)
- Git commit 提交检查 [commitlint](https://github.com/conventional-changelog/commitlint)
- Git 自动生成 commit 信息 [changelog](https://github.com/conventional-changelog-archived-repos/conventional-changelog-cli)
- Git 版本控制 [standard-version](https://www.npmjs.com/package/standard-version)

#### 1、husky

```shell
pnpm add husky -D
# 向package中添加script
npm set-script prepare "husky install"
# 始化husky,将 git hooks 钩子交由husky执行
pnpm prepare
```

#### 2、lint-staged

```shell
pnpm add lint-staged -D
# 添加commit前置hook 提交前进行代码检查
npx husky add .husky/pre-commit "npx lint-staged"
# 配置.lintstagedrc.js的检查规则
```

![img](/screenshots/staged-lint.png)

#### 3、commitlint

用于规范 git commit 提交的时候的信息格式，有助于多人开发时候的 commit 信息统一规范

```shell
pnpm add @commitlint/cli @commitlint/config-conventional -D
# 配置commitlint配置文件
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
# 添加husky hook -> commit-msg
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

提交的时候的格式约定：
| 类型 | 描述 |
| ---- | ---- |
| build | 编译相关的修改，例如发布版本、对项目构建或者依赖的改动 |
| chore | 其他修改，比如改变构建流程、或者增加依赖库、工具等 |
| ci | 持续集成修改 |
| docs | 文档修改 |
| feat | 新特性、新功能 |
| fix | 修改 bug |
| pref | 优化相关，比如提升性能、体验 |
| refactor | 代码重构 |
| revert | 回滚到上一个版本 |
| style | 代码格式修改，注意不是 css 修改 |
| test | 测试用例修改 |

来看看官方的 [demo](https://github.com/conventional-changelog/commitlint) 示例：

![图片](https://raw.githubusercontent.com/conventional-changelog/commitlint/6181d69c25371fd5830a5a9b7173a200d3c9fed5/docs/assets/commitlint.svg)

#### 4、conventional-changelog

用于记录 CHANGELOG 日志，可以看到团队的更新日志，并能点击对应的 commit 看相应的代码

```
pnpm add conventional-changelog conventional-changelog-cli -D
```

[Example](https://github.com/karma-runner/karma/blob/master/CHANGELOG.md)

#### 5、standard-version

```
pnpm add standard-version -D
# 配置脚本
npm set-script release "standard-version"
```

配合 `conventional-changelog` 使用，`standard-version` 能做到:

- 可以自动添加 `package` 中的版本号
- 基于提交的 commit 自动生成 changelog
- 自动为当前版本号创建一个 tag，你也可以自己指定版本：

```shell
npm run release -- --release-as xxx (you want version)
```

#### 发版的工作流

- git add .
- git commit -m "feat: xxx"
- git tag
- npm run release
- git push
- git push --tag 将生成的 `tag` 上传至远程仓库

#### 四、安装 unocss

```js
pnpm add unocss @unocss/webpack -D
```

在入口文件 [app.ts](https://github.com/rzhAvenir/taro-vue3-template/blob/master/src/app.ts) 中引入 `unocss`
另外小程序不支持书写` \\，\: \[ \$ \.` 等转义类名，需要插件进行转换操作

```js
pnpm add unocss-preset-weapp unplugin-transform-we-class -D
```

在根目录下新增 `unocss.config.ts`，引入如下代码：

```js
import { defineConfig } from 'unocss'
import presetWeapp from 'unocss-preset-weapp'
export default defineConfig({
  presets: [
    presetWeapp({
      isH5: process.env.TARO_ENV === 'h5',
      platform: 'taro',
      taroWebpack: 'webpack5',
      designWidth: 375,
      deviceRatio: {
        640: 2.34 / 2,
        750: 1,
        828: 1.81 / 2,
        375: 2 / 1
      }
    })
  ]
})
```

另外还要在 `taro` 的 [webpack config](https://github.com/rzhAvenir/taro-vue3-template/blob/master/config/index.js) 文件中配置 `H5` 平台和 `小程序` 平台。

> PS: taro 不同版本的根字体不同，需要在 `index.html` 的 `body` 上添加**class="text-base"**，默认字体大小为 20px。

##### 推荐使用 class 写法

```html
<view class="mt-40px">unocss</view>

<view class="flex items-center text-green/500">unocss</view>
```

对应小程序转换出来将会是:

```css
.mt-40px {
  margin-top: 80rpx;
}
```

对应 H5 平台转换结果：

```css
.mt-40px {
  margin-top: 2rem;
}
```

#### 五、Taro 多平台编译组件

参考 [Taro 多端组件](https://taro-docs.jd.com/taro/docs/envs#%E5%A4%9A%E7%AB%AF%E7%BB%84%E4%BB%B6)  
对应的演示 Demo 分别在 [pages/index](https://github.com/rzhAvenir/taro-vue3-template/blob/master/src/pages/index/index.vue) 和 [components](https://github.com/rzhAvenir/taro-vue3-template/tree/master/src/components) 下
