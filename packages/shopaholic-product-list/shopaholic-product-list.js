/**
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group
 */
export default class ShopaholicProductList {
  constructor() {
    this.sComponentMethod = 'onAjax';
    this.obAjaxRequestCallback = null;
  }

  /**
   * Add product to wish list
   * @param {int} iProductID
   * @param obButton
   */
  send(obRequestData = {}) {

    if (this.obAjaxRequestCallback !== null) {
      obRequestData = this.obAjaxRequestCallback(obRequestData);
    }

    $.request(this.sComponentMethod, obRequestData);
  }

  /**
   * Set ajax request callback
   *
   * @param {function} obCallback
   * @returns {ShopaholicProductList}
   */
  setAjaxRequestCallback(obCallback) {
    this.obAjaxRequestCallback = obCallback;

    return this;
  }
}
