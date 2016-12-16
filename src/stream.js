/**
 * @description - echarts option stream engine
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

import { Observable } from '@bornkiller/observable';

export class Stream {
  /**
   * @description - stream instance
   *
   * @param {object} config - stream config
   * @param {object} options - echarts base options
   */
  constructor(config, options) {
    this._options = options;
  }

  init() {}

  /**
   * @description - 创建stream对象
   */
  static create() {}
}