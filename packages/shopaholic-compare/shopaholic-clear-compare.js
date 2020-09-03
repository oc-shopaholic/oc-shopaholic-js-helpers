/**
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group
 */
export default class ShopaholicClearCompareList {
  constructor() {
    this.sDefaultButtonClass = '_shopaholic-clear-compare-list-button';
    this.sButtonSelector = `.${this.sDefaultButtonClass}`;

    this.sComponentMethod = 'ProductList::onClearCompareList';
    this.obAjaxRequestCallback = null;
  }

  /**
   * Init event handlers
   */
  init() {
    $(document).on('click', this.sButtonSelector, (obEvent) => {
      const obButton = $(obEvent.currentTarget);

      this.sendAjaxRequest(obButton);
    });
  }

  /**
   * Clear compare list
   * @param obButton
   */
  sendAjaxRequest(obButton) {
    let obRequestData = {};

    if (this.obAjaxRequestCallback !== null) {
      obRequestData = this.obAjaxRequestCallback(obRequestData, obButton);
    }

    $.request(this.sComponentMethod, obRequestData);
  }

  /**
   * Set ajax request callback
   *
   * @param {function} obCallback
   * @returns {ShopaholicClearCompareList}
   */
  setAjaxRequestCallback(obCallback) {
    this.obAjaxRequestCallback = obCallback;

    return this;
  }

  /**
   * Redeclare default selector of "Clear compare list" button
   * Default value is ._shopaholic-clear-compare-list-button
   *
   * @param {string} sSelector
   * @returns {ShopaholicClearCompareList}
   */
  setButtonSelector(sSelector) {
    this.sButtonSelector = sSelector;

    return this;
  }
}