/**
 * @description - proxy echarts instance, make none-element operation available
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
export class MonkeyPatchAgent {
  constructor() {
    this.instance = {};

    // flag stand for element initialize
    this.connected = false;
    this.restoreBufferVariable();
    this.lazyMethodList = [
      'getWidth', 'getHeight', 'getDom', 'getOption','getDataURL', 'getConnectedDataURL',
      'convertToPixel', 'convertFromPixel', 'containPixel', 'isDisposed', 'resize'
    ];
  }

  /**
   * @description - 统一管控缓存数据
   */
  restoreBufferVariable() {
    // buffer instance group setting
    this.bufferGroupCategory = '';
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
    this.bufferLoadingSwitchery.length && this.showLoading(...this.bufferLoadingSwitchery);
    this.bufferOptions.length && this.bufferOptions.forEach((args) => this.setOption(...args));

    this.restoreBufferVariable();
  }

  /**
   * @description - 暴力方式处理分组标记
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
   * @description - 暴力方式缓冲setOption调用
   *
   * @see - http://echarts.baidu.com/api.html#echartsInstance.setOption
   */
  setOption(...args) {
    this.connected ? Reflect.apply(this.instance.setOption, this.instance, args) : this.bufferOptions.push(args);
    return this;
  }

  /**
   * @description - 暴力方式缓冲showLoading调用
   *
   * @see - http://echarts.baidu.com/api.html#echartsInstance.showLoading
   */
  showLoading(...args) {
    this.connected ? Reflect.apply(this.instance.showLoading, this.instance, args) : (this.bufferLoadingSwitchery = args);
  }

  /**
   * @description - 暴力方式缓冲hideLoading调用
   *
   * @see - http://echarts.baidu.com/api.html#echartsInstance.hideLoading
   */
  hideLoading() {
    this.connected ? Reflect.apply(this.instance.hideLoading, this.instance) : (this.bufferLoadingSwitchery = []);
  }

  /**
   * @description - 暴力方式缓冲clear调用
   *
   * @see - http://echarts.baidu.com/api.html#echartsInstance.clear
   */
  clear() {
    this.connected && this.instance.clear();
  }

  /**
   * @description - 暴力方式缓冲dispose调用
   *
   * @see - http://echarts.baidu.com/api.html#echartsInstance.dispose
   */
  dispose() {
    this.connected && this.instance.dispose();
    this.connected = false;
    // reset buffer content
    this.restoreBufferVariable();
  }
}