/**
 * @description - echarts option stream engine
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

import { Observable } from '@bornkiller/observable';

import { TITLE_ACTION, LEGEND_ACTION, TOOLTIP_ACTION, TEXT_STYLE_ACTION, STREAM_MODE } from './category.const';

export class StreamEngine extends Observable {
  /**
   * @description - whether sync with browser resize
   *
   * @param {boolean} reactive
   * @param {string} theme = macarons
   * @param {string} mode
   */
  constructor(reactive = true, theme = 'macarons', mode = STREAM_MODE.IMMEDIATE) {
    super();
    
    this._reactive = reactive;
    this._theme = theme;
    this._mode = mode;
    this._actions = [];
  }
  
  /**
   * @description - stream mode, immediate or lazy
   *
   * @param {string} mode
   */
  mode(mode) {
    this._mode = mode;
  }
  
  /**
   * @description - override param for echarts title
   *
   * @param {object|string} payload
   */
  title(payload) {
    this.dispatch(TITLE_ACTION, payload);
  }
  
  /**
   * @description - override param for echarts legend
   *
   * @param {object} payload
   */
  legend(payload) {
    this.dispatch(LEGEND_ACTION, payload);
  }
  
  /**
   * @description - override param for echarts tooltip
   *
   * @param {object} payload
   */
  tooltip(payload) {
    this.dispatch(TOOLTIP_ACTION, payload);
  }
  
  /**
   * @description - override param for echarts textStyle
   *
   * @todo - visual control different type
   *
   * @param {object} payload
   */
  textStyle(payload) {
    this.dispatch(TEXT_STYLE_ACTION, payload);
  }
  
  /**
   * @description - medium between operation and observer
   *
   * @param {string} type
   * @param {object} payload
   */
  dispatch(type, payload) {
    this._mode == STREAM_MODE.IMMEDIATE ? super.next(payload) : this._actions.push({type, payload});
  }
  
  /**
   * @description - notify observer when lazy mode
   */
  save() {
    
  }
}