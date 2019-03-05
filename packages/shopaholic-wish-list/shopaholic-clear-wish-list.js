/**
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group
 */
export default new class ShopaholicClearWishList {
  constructor() {
    this.sButtonSelector = '._shopaholic-remove-wish-list-button';

    this.sComponentMethod = 'ProductList::onClearWishList';
    this.obAjaxRequestCallback = null;
  }

  /**
   * Init event handlers
   */
  init() {
    $(document).on('click', this.sButtonSelector, (obEvent) => {
      let obButton = $(obEvent.currentTarget);

      this.clear(obButton);
    });
  }

  /**
   * Clear wish list
   * @param obButton
   */
  clear(obButton) {
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
   * @returns {ShopaholicRemoveWishList}
   */
  setAjaxRequestCallback(obCallback) {
    this.obAjaxRequestCallback = obCallback;

    return this;
  }

  /**
   * Redeclare default selector of "Remove from wish list" button
   * Default value is ._shopaholic-remove-wish-list-button
   *
   * @param {string} sSelector
   * @returns {ShopaholicRemoveWishList}
   */
  setButtonSelector(sSelector) {
    this.sButtonSelector = sSelector;

    return this;
  }

  /**
   * Redeclare default ajax component method
   * Default value is ProductList::onRemoveFromWishList
   *
   * @param {string} sComponentMethod
   * @returns {ShopaholicRemoveWishList}
   */
  setComponentMethod(sComponentMethod) {
    this.sComponentMethod = sComponentMethod;

    return this;
  }
}