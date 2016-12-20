/**
 * @description - echarts option stream engine
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

import echarts from 'echarts';
import { Observable } from '@bornkiller/observable';

export class Stream extends Observable {
  /**
   * @description - stream instance
   *
   * @param {string} theme - echarts theme
   * @param {object} initOptions - stream config
   * @param {object} instanceOptions - echarts base options
   * @param {object} mediaOptions - echarts media options
   */
  constructor(theme, initOptions = {}, instanceOptions = {}, mediaOptions = []) {
    super();
    this.initialized = false;
    this.theme = theme;
    this.initOptions = initOptions;
    this.instanceOptions = instanceOptions;
    this.mediaOptions = mediaOptions;
    this._instance = {};
  }

  /**
   * @description - 代理echarts初始化函数，只需要传入关键element即可
   *
   * @param {HTMLElement} element
   */
  init(element) {
    this._instance = echarts.init(element, this.theme, this.initOptions);

    this._instance.setOption({
      baseOption: this.instanceOptions,
      media: this.mediaOptions
    });
  }

  get $delegate() {
    return Reflect.construct(Proxy, this._instance, {});
  }

  /**
   * @description - static method create stream
   *
   * @param {string} theme - echarts theme
   * @param {object} initOptions - stream config
   * @param {object} instanceOptions - echarts base options
   * @param {object} mediaOptions - echarts media options
   */
  static create(theme, initOptions = {}, instanceOptions = {}, mediaOptions = []) {
    return Reflect.construct(Stream, [theme, initOptions, instanceOptions, mediaOptions]);
  }
}