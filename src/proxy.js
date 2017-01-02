/**
 * @description - proxy echarts instance, make none-element operation available
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

import { isFunction } from './util';

export class MonkeyPatchBridge {
  constructor() {
    // middleware echarts instance
    this.instance = {};
    // flag stand for element initialize
    this.connected = false;
    // stock history options for controller cache or ng HMR
    this.history = {};
    // buffer event listener, stock history event listen for re-connect
    this.bufferEventListen = [];
    this.restoreBufferVariable();
    this.lazyMethodList = [
      'getWidth', 'getHeight', 'getDom', 'getOption', 'getDataURL', 'getConnectedDataURL',
      'convertToPixel', 'convertFromPixel', 'containPixel', 'isDisposed', 'dispatchAction'
    ];
  }

  /**
   * @description - 统一管控缓存数据
   */
  restoreBufferVariable() {
    // buffer instance group setting
    this.bufferGroupCategory = '';
    // buffer DOM width and height setting
    this.bufferVisionSize = [];
    // buffer loading status switcher
    this.bufferLoadingSwitchery = [];
    // buffer options setting
    this.bufferOptions = [];
  }

  /**
   * @description - 传递echarts实例
   *
   * @see - http://echarts.baidu.com/api.html#echartsInstance
   *
   * @param {object} instance
   */
  transferCoreBridge(instance) {
    this.instance = instance;
    this.connected = true;

    // 延后加载非关键部分方法，属性
    this.lazyMethodList.forEach((key) => {
      Reflect.set(this, key, Reflect.get(this.instance, key).bind(this.instance));
    });
  }

  /**
   * @description - 消费实例化前缓存数据
   */
  dealWithInventory() {
    this.group = this.bufferGroupCategory;
    this.bufferVisionSize.length && this.resize(...this.bufferVisionSize);
    this.bufferLoadingSwitchery.length && this.showLoading(...this.bufferLoadingSwitchery);
    this.bufferOptions.length && this.bufferOptions.forEach((args) => this.setOption(...args));
    this.bufferEventListen.length && this.bufferEventListen.forEach((stock) => this.on(stock.eventName, stock.handler));

    this.restoreBufferVariable();
  }

  /**
   * @description - 缓冲分组标记
   *
   * @see - http://echarts.baidu.com/api.html#echartsInstance.group
   */
  get group() {
    return this.connected ? Reflect.get(this.instance, 'group') : this.bufferGroupCategory;
  }

  set group(value) {
    this.connected ? Reflect.set(this.instance, 'group', value) : (this.bufferGroupCategory = value);
    return value;
  }

  /**
   * @description - 缓冲setOption调用
   *
   * @see - http://echarts.baidu.com/api.html#echartsInstance.setOption
   */
  setOption(...args) {
    this.connected ? Reflect.apply(this.instance.setOption, this.instance, args) : this.bufferOptions.push(args);
    this.connected && (this.history = Reflect.apply(this.instance.getOption, this.instance, []));
    return this;
  }

  /**
   * @description - 式缓冲resize调用
   *
   * @see - http://echarts.baidu.com/api.html#echartsInstance.on
   */
  resize(...args) {
    this.connected ? Reflect.apply(this.instance.resize, this.instance, args) : this.bufferVisionSize = args;
    return this;
  }

  /**
   * @description - 缓冲事件绑定
   *
   * @see - http://echarts.baidu.com/api.html#echartsInstance.on
   *
   * @param {string} eventName
   * @param {function} handler
   *
   * @return {MonkeyPatchBridge}
   */
  on(eventName, handler) {
    if (this.connected) {
      Reflect.apply(this.instance.on, this.instance, [eventName, handler]);
    } else {
      this.bufferEventListen = [...this.bufferEventListen, { eventName, handler }];
    }

    return this;
  }

  /**
   * @description - 缓冲事件解绑
   *
   * @see - http://echarts.baidu.com/api.html#echartsInstance.off
   *
   * @param {string} eventName
   * @param {function} handler
   *
   * @return {MonkeyPatchBridge}
   */
  off(eventName, handler) {
    if (this.connected) {
      Reflect.apply(this.instance.off, this.instance, [eventName, handler]);
    } else {
      this.bufferEventListen = this.bufferEventListen.filter((stock) => {
        return isFunction(handler) ? !(stock.eventName === eventName && stock.handler === handler) : !(stock.eventName === eventName);
      });
    }

    return this;
  }

  /**
   * @description - 处理controller实例重连接引发的潜在问题
   */
  replay() {
    this.instance.setOption(this.history);
    return this;
  }

  /**
   * @description - 缓冲showLoading调用
   *
   * @see - http://echarts.baidu.com/api.html#echartsInstance.showLoading
   */
  showLoading(...args) {
    this.connected ? Reflect.apply(this.instance.showLoading, this.instance, args) : (this.bufferLoadingSwitchery = args.length ? args : ['default']);
    return this;
  }

  /**
   * @description - 缓冲hideLoading调用
   *
   * @see - http://echarts.baidu.com/api.html#echartsInstance.hideLoading
   */
  hideLoading() {
    this.connected ? Reflect.apply(this.instance.hideLoading, this.instance, []) : (this.bufferLoadingSwitchery = []);
    return this;
  }

  /**
   * @description - 缓冲clear调用
   *
   * @see - http://echarts.baidu.com/api.html#echartsInstance.clear
   */
  clear() {
    this.connected && this.instance.clear();
    return this;
  }

  /**
   * @description - 缓冲dispose调用
   *
   * @see - http://echarts.baidu.com/api.html#echartsInstance.dispose
   */
  dispose() {
    this.connected && this.instance.dispose();
    this.instance = {};
    this.connected = false;
    // reset buffer content
    this.restoreBufferVariable();
    // 剔除延迟加载方法
    this.lazyMethodList.forEach((key) => {
      Reflect.deleteProperty(this, key);
    });
  }
}