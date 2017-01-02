/**
 * @description - echarts lite data operator
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

import echarts from 'echarts';
import { MonkeyPatchBridge } from './proxy';
import { uuid } from './util';

export class Bridge extends MonkeyPatchBridge {
  /**
   * @description - echarts bridge instance
   *
   * @param {string} theme - echarts theme
   * @param {object} initOptions - stream config
   */
  constructor(theme, initOptions = {}) {
    super();
    this.theme = theme;
    this.initOptions = initOptions;
    this.uuid = uuid();
  }

  /**
   * @description - 代理echarts初始化函数，只需要传入关键element即可
   *
   * @param {HTMLElement} element
   */
  connect(element) {
    if (!(element instanceof HTMLElement)) {
      throw new Error('HTMLElement argument required');
    }

    super.transferCoreBridge(echarts.init(element, this.theme, this.initOptions));
    super.dealWithInventory();

    return this;
  }

  /**
   * @description - 销毁应用实例
   */
  disconnect() {
    super.clear();
    super.dispose();
  }
}