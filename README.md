## 使用
项目使用 [pnpm](https://pnpm.io/zh/) 包管理工具:
```js
npm install -g pnpm
```

安装依赖：
```js
pnpm install
```

启动 H5:
```js
pnpm dev:h5
```

启动微信小程序:
```js
pnpm dev:weapp
```

## 功能
- [UnoCSS](https://uno.antfu.me/) - 原子化 CSS 引擎
- [NutUI 组件库](https://nutui.jd.com/#/zh-CN/guide/intro) - Vue 3 组件库，支持 H5 和 小程序双端编译
- CHANGELOG - 自动生成 commit 提交记录
- ESLint + Prettier - 组合管理代码质量和风格
- Git 提交内容校验 - husky、commitlint、lint-staged

## UnoCSS 写法
可以到 [UnoCSS 文档](https://uno.antfu.me/) 中查询语法  

推荐使用带 `class` 写法：

```html
<view class="mt-40px">unocss</view>

<view class="flex items-center text-green/500">unocss</view>
```

`class="mt-40px"` 在375（`iphone6`、`iphoneX`）的屏幕下对应小程序转换出来将会是:

```css
.mt-40px {
  margin-top: 80rpx;
}
```

对应 `H5` 平台转换结果：

```css
.mt-40px {
  margin-top: 40px;
}
```

## Taro 多平台编译组件

参考 [Taro 多端组件](https://taro-docs.jd.com/taro/docs/envs#%E5%A4%9A%E7%AB%AF%E7%BB%84%E4%BB%B6)  


对应的演示 `demo` 分别在 [pages/index](https://github.com/rzhAvenir/taro-vue3-template/blob/master/src/pages/index/index.vue) 和 [components](https://github.com/rzhAvenir/taro-vue3-template/tree/master/src/components) 下

## 搭建过程和用法
文章地址：[从零搭建 Taro 多端编译环境](https://rzhavenir.github.io/blog/front/engineer/taro.html)

## 插件
可以在扩展（Extentions) 中搜索 `@recommended`，就像这样：

![img](/screenshots/extentions.png)

这样就可以看到 `.vscode` 文件中推荐的插件扩展了