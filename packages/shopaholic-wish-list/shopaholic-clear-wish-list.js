/**
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group
 */
export default class ShopaholicClearWishList {
  constructor() {
    this.sDefaultButtonClass = '_shopaholic-clear-wish-list-button';
    this.sButtonSelector = `.${this.sDefaultButtonClass}`;

    this.sComponentMethod = 'ProductList::onClearWishList';
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
   * Clear wish list
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
   * @returns {ShopaholicClearWishList}
   */
  setAjaxRequestCallback(obCallback) {
    this.obAjaxRequestCallback = obCallback;

    return this;
  }

  /**
   * Redeclare default selector of "Clear wish list" button
   * Default value is ._shopaholic-clear-wish-list-button
   *
   * @param {string} sSelector
   * @returns {ShopaholicClearWishList}
   */
  setButtonSelector(sSelector) {
    this.sButtonSelector = sSelector;

    return this;
  }
}