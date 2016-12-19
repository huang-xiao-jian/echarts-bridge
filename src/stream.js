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
   * @param {object} config - stream config
   * @param {object} options - echarts base options
   * @param {object} mediaOptions - echarts media options
   */
  constructor(config, options, mediaOptions) {
    super();
    this._config = config;
    this._options = options;
    this._mediaOptions = mediaOptions;
    this._initialized = false;
    this._instance = {};
  }
  
  /**
   * @description - 代理echarts初始化函数，只需要传入关键element即可
   *
   * @param {HTMLElement} element
   */
  init(element) {
    this._initialized = true;
    this._instance = echarts.init(element, this._config.theme);
  }
  
  get $delegate() {
    return this._initialized ? this._instance : undefined;
  }
  
  
  /**
   * @description - 创建stream对象
   */
  static create() {
  }
}