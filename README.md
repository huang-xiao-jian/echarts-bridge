# echarts-bridge

![Build Status](https://img.shields.io/travis/bornkiller/echarts-bridge.svg?style=flat)
![Coverage Report](http://img.shields.io/coveralls/bornkiller/echarts-bridge.svg?style=flat)
![Package Dependency](https://david-dm.org/bornkiller/echarts-bridge.svg?style=flat)
![Package DevDependency](https://david-dm.org/bornkiller/echarts-bridge/dev-status.svg?style=flat)

echarts imperative programming bridge in MV* frontend framework.

## Break Changes
调整入口配置，默认为`commonjs`风格。

## 目标
前端`MV*`框架，共同点都是不提倡直接进行底层`DOM`操作，只能通过框架提供接口(如`angularjs`指令)，访问原始元素，但是对待图表这种重`DOM`操作，使用数据同步的方式
进行，效率个人持保留意见。

`echarts-bridge`目标是作为`MV*`框架与`echarts`之间的中间层，存在`连接`，`未连接`状态：

+ `连接`状态，实例本身可以看做`echarts instance`，可以直接参照官方文档操作
+ `未连接`状态，实例可以调用`echarts instance` setter方法，但不会立即执行，而是实例内部缓冲，待与实际`DOM`连接后进行操作

## API
```javascript
import { Bridge } from '@bornkiller/echarts-bridge';

/**
  * @description - echarts bridge instance
  *
  * @param {string} theme - echarts theme
  * @param {object} initOptions - echarts init options
  * @param {object} mediaOptions - echarts media options
  */
let instance = Reflect.construct(Bridge, [theme, initOptions, mediaOptions]);
let elem = docment.querySelector('.echarts-box');

instance.setOption({}).on('click', () => {}).connect(elem);
```

实例使用`monkey patch`方式，缓冲开发操作。以下方法，除特别指明，皆可进行`链式操作`。

+ `Bridge#connect`: 数据对象与`DOM`元素连接
+ `Bridge#disconnect`: 断开连接，销毁已生成实例(不支持链式调用，实例已销毁)。
+ `Bridge#resize`: 目前缓冲`DOM`尺寸设定存在问题，连接后一切正常。 http://echarts.baidu.com/api.html#echartsInstance.resize
+ `Bridge#setOption`: http://echarts.baidu.com/api.html#echartsInstance.setOption
+ `Bridge#on`: http://echarts.baidu.com/api.html#echartsInstance.on
+ `Bridge#off`: http://echarts.baidu.com/api.html#echartsInstance.off
+ `Bridge#showLoading`: http://echarts.baidu.com/api.html#echartsInstance.showLoading
+ `Bridge#hideLoading`: http://echarts.baidu.com/api.html#echartsInstance.hideLoading

## 关联项目
目前关联项目为基于`angularjs`的封装: [echarts-ng](https://github.com/bornkiller/echarts-ng) 

## contact
hjj491229492@hotmail.com
