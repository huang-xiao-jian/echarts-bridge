/**
 * @description - echarts lite data operator
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

import echarts from 'echarts';
import { MonkeyPatchBridge } from './proxy';

export class Bridge extends MonkeyPatchBridge {
  /**
   * @description - stream instance
   *
   * @param {string} theme - echarts theme
   * @param {object} initOptions - stream config
   * @param {object} mediaOptions - echarts media options
   */
  constructor(theme, initOptions = {}, mediaOptions = []) {
    super();
    this.theme = theme;
    this.initOptions = initOptions;
    this.mediaOptions = mediaOptions;
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

    this.middlware = echarts.init(element, this.theme, this.initOptions);
    this.middlware.setOption({ media: this.mediaOptions });

    super.transferCoreBridge(this.middlware);
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