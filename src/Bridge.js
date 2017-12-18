/**
 * @description - echarts bridge to cache operation
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

import echarts from 'echarts';
import Proxy from './Proxy';
import { uuid } from './util';

export default class Bridge extends Proxy {
  /**
   * @description - echarts bridge instance
   *
   * @param {string} theme - echarts theme
   * @param {object} initOptions - echarts init options
   * @param {object} mediaOptions - echarts media options
   */
  constructor(theme, initOptions = {}, mediaOptions = []) {
    super();
    this.theme = theme;
    this.initOptions = initOptions;
    this.mediaOptions = mediaOptions;
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

    // 此处为部分hack操作
    // 限定媒体查询，简易声明对象时直接指定，而不是后续控制
    this.middleware = echarts.init(element, this.theme, this.initOptions);
    this.middleware.setOption({ series: [] });
    this.middleware.setOption({ media: this.mediaOptions });
    // 传递实例，消费缓存数据
    super.transferCoreBridge(this.middleware);
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
