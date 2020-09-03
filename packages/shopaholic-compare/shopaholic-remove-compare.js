/**
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group
 */
export default class ShopaholicRemoveCompareList {
  constructor() {
    this.sDefaultButtonClass = '_shopaholic-remove-compare-list-button';
    this.sButtonSelector = `.${this.sDefaultButtonClass}`;

    this.sDefaultWrapperClass = '_shopaholic-product-wrapper';
    this.sWrapperSelector = `.${this.sDefaultWrapperClass}`;
    this.sAttributeName = 'data-product-id';

    this.sComponentMethod = 'ProductList::onRemoveFromCompare';
    this.obAjaxRequestCallback = null;
  }

  /**
   * Init event handlers
   */
  init() {
    $(document).on('click', this.sButtonSelector, (obEvent) => {
      const obButton = $(obEvent.currentTarget),
        iProductID = this.getProductID(obButton);

      this.sendAjaxRequest(iProductID, obButton);
    });
  }

  /**
   * Remove product from compare list
   * @param {int} iProductID
   * @param obButton
   */
  sendAjaxRequest(iProductID, obButton) {
    let obRequestData = {
      'data': {'product_id': iProductID}
    };

    if (this.obAjaxRequestCallback !== null) {
      obRequestData = this.obAjaxRequestCallback(obRequestData, obButton);
    }

    $.request(this.sComponentMethod, obRequestData);
  }

  /**
   * Get product ID from attribute
   * @param obButton
   * @returns {int}
   */
  getProductID(obButton) {
    const obProduct = obButton.parents(this.sWrapperSelector),
      iProductID = obProduct.attr(this.sAttributeName);

    return iProductID;
  }

  /**
   * Set ajax request callback
   *
   * @param {function} obCallback
   * @returns {ShopaholicRemoveCompareList}
   */
  setAjaxRequestCallback(obCallback) {
    this.obAjaxRequestCallback = obCallback;

    return this;
  }

  /**
   * Redeclare default selector of "Remove from compare list" button
   * Default value is ._shopaholic-remove-compare-list-button
   *
   * @param {string} sSelector
   * @returns {ShopaholicRemoveCompareList}
   */
  setButtonSelector(sSelector) {
    this.sButtonSelector = sSelector;

    return this;
  }
}