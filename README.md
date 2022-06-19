# 从零开始搭建 Taro + Vue3 多端编译环境

## 一、搭建项目架构

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

## 二、设置代码规范的 Eslint Prettier

- 代码规范 ESlint
- 代码格式化 Prettier    
#### 1、安装依赖

```shell
yarn add @vue/eslint-config-prettier @vue/eslint-config-typescript eslint-plugin-prettier prettier -D
```
#### 2、设置配置  

目录下新增`.eslintrc.js`和`.prettierrc`文件。  
如果VSCode中已经存在插件prettier，请关闭，两者在保存的时候，VSCode中的prettier插件的优先级大于项目中的prettier。

## 三、Git提交规范

- Git钩子控制 [husky](https://typicode.github.io/husky/#/)
- Git暂存区lint检查 [lint-staged](https://github.com/okonet/lint-staged)
- Git commit提交检查 [commitlint](https://github.com/conventional-changelog/commitlint)
- Git自动生成commit信息[changelog](https://github.com/conventional-changelog-archived-repos/conventional-changelog-cli)  
- Git版本控制[standard-version](https://www.npmjs.com/package/standard-version)

#### 1、husky
```shell
yarn add husky -D
# 向package中添加script
npm set-script prepare "husky install" 
# 始化husky,将 git hooks 钩子交由husky执行
yarn prepare 
```
#### 2、lint-staged
```shell
yarn add lint-staged -D
# 添加commit前置hook 提交前进行代码检查
npx husky add .husky/pre-commit "npx lint-staged"
# 配置.lintstagedrc.js的检查规则
```
![img](/ScreenShots/staged-lint.png)
#### 3、commitlint
用于规范git commit提交的时候的信息格式，有助于多人开发时候的commit信息统一规范
```shell
yarn add @commitlint/cli @commitlint/config-conventional -D
# 配置commitlint配置文件
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
# 添加husky hook -> commit-msg
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```
提交的时候的格式约定：
|  类型   | 描述  |
|  ----  | ----  |
| build  | 	编译相关的修改，例如发布版本、对项目构建或者依赖的改动 |
| chore  | 其他修改，比如改变构建流程、或者增加依赖库、工具等 |
| ci  | 持续集成修改 |
| docs  | 文档修改 |
| feat  | 新特性、新功能 |
| fix  | 修改bug |
| pref  | 优化相关，比如提升性能、体验 |
| refactor  | 代码重构 |
| revert  | 回滚到上一个版本 |
| style  | 代码格式修改，注意不是css修改 |
| test  | 测试用例修改 |

来看看官方的[demo](https://github.com/conventional-changelog/commitlint)示例：
![图片](https://raw.githubusercontent.com/conventional-changelog/commitlint/6181d69c25371fd5830a5a9b7173a200d3c9fed5/docs/assets/commitlint.svg)
#### 4、conventional-changelog
用于记录CHANGELOG日志，可以看到团队的更新日志，并能点击对应的commit看相应的代码
```
yarn add conventional-changelog conventional-changelog-cli -D
```
[Example](https://github.com/karma-runner/karma/blob/master/CHANGELOG.md)
#### 5、standard-version
```
yarn add standard-version -D
# 配置脚本
npm set-script release "standard-version"
```
配合`conventional-changelog`使用，`standard-version`能做到:
- 可以自动添加`package`中的版本号
- 基于提交的commit自动生成changelog
- 自动为当前版本号创建一个tag

#### 发版的工作流
- git add .
- git commit -m "feat: xxx"
- git tag
- npm run release
- git push
- git push --tag 将生成的tag上传值云端 

