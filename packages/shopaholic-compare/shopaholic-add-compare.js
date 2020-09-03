/**
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group
 */
export default class ShopaholicAddCompareList {
  constructor() {
    this.sDefaultButtonClass = '_shopaholic-add-compare-list-button';
    this.sButtonSelector = `.${this.sDefaultButtonClass}`;

    this.sDefaultWrapperClass = '_shopaholic-product-wrapper';
    this.sWrapperSelector = `.${this.sDefaultWrapperClass}`;
    this.sAttributeName = 'data-product-id';

    this.sComponentMethod = 'ProductList::onAddToCompare';
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
   * Add product to compare list
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
   * @returns {ShopaholicAddCompareList}
   */
  setAjaxRequestCallback(obCallback) {
    this.obAjaxRequestCallback = obCallback;

    return this;
  }

  /**
   * Redeclare default selector of "Add to compare list" button
   * Default value is ._shopaholic-add-compare-list-button
   *
   * @param {string} sSelector
   * @returns {ShopaholicAddCompareList}
   */
  setButtonSelector(sSelector) {
    this.sButtonSelector = sSelector;

    return this;
  }
}