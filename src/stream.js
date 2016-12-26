/**
 * @description - echarts option stream engine
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

import echarts from 'echarts';

export class Stream {
  /**
   * @description - stream instance
   *
   * @param {string} theme - echarts theme
   * @param {object} initOptions - stream config
   * @param {object} mediaOptions - echarts media options
   */
  constructor(theme, initOptions = {}, mediaOptions = []) {
    this.theme = theme;
    this.initOptions = initOptions;
    this.mediaOptions = mediaOptions;

    // flag stand for instance initialize
    this._pristine = true;
    this._instance = {};
    this._bufferOptions = [];
  }

  /**
   * @description - 代理echarts初始化函数，只需要传入关键element即可
   *
   * @param {HTMLElement} element
   */
  init(element) {
    this._instance = echarts.init(element, this.theme, this.initOptions);
    this._instance.setOption({ media: this.mediaOptions });

    // consume buffer option and clean up
    for (let option of this._bufferOptions) {
      this._instance.setOption(option);
    }

    this._pristine = false;
    this._bufferOptions = [];

    return this.$delegate;
  }

  // proxy handler onto setOption
  setOption(...args) {
    if (this._pristine) {
      // buffer option operate with merge and sync mode,
      this._bufferOptions.push(args[0]);
    } else {
      Reflect.apply(this._instance.setOption, this._instance, args);
    }

    return this.$delegate;
  }

  /**
   * @description - intercept echarts instance setOption method
   *  - support lazy setOption before init
   *  - support setOption chain call while echarts not
   */
  get $delegate() {
    return this._pristine
      ? { init: this.init.bind(this), setOption: this.setOption.bind(this) }
      : { ...this._instance, setOption: this.setOption.bind(this) };
  }
}