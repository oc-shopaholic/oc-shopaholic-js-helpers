/**
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group
 */
export default new class ShopaholicAddWishList {
  constructor() {
    this.sButtonSelector = '._shopaholic-add-wish-list-button';
    this.sWrapperSelector = '._shopaholic-product-wrapper';
    this.sAttributeName = 'data-product-id';

    this.sComponentMethod = 'ProductList::onAddToWishList';
    this.obAjaxRequestCallback = null;
  }

  /**
   * Init event handlers
   */
  init() {
    $(document).on('click', this.sButtonSelector, (obEvent) => {
      let obButton = $(obEvent.currentTarget),
        obProduct = obButton.parents(this.sWrapperSelector),
        iProductID = obProduct.attr(this.sAttributeName);

      this.add(iProductID, obButton);
    });
  }

  /**
   * Add product to wish list
   * @param {int} iProductID
   * @param obButton
   */
  add(iProductID, obButton) {
    let obRequestData = {
      'data': {'product_id': iProductID}
    };

    if (this.obAjaxRequestCallback !== null) {
      obRequestData = this.obAjaxRequestCallback(obRequestData, obButton);
    }

    $.request(this.sComponentMethod, obRequestData);
  }

  /**
   * Set ajax request callback
   *
   * @param {function} obCallback
   * @returns {ShopaholicAddWishList}
   */
  setAjaxRequestCallback(obCallback) {
    this.obAjaxRequestCallback = obCallback;

    return this;
  }

  /**
   * Redeclare default selector of "Add to wish list" button
   * Default value is ._shopaholic-add-wish-list-button
   *
   * @param {string} sSelector
   * @returns {ShopaholicAddWishList}
   */
  setButtonSelector(sSelector) {
    this.sButtonSelector = sSelector;

    return this;
  }

  /**
   * Redeclare default selector of product wrapper with product ID in attribute
   * Default value is ._shopaholic-product-wrapper
   *
   * @param {string} sSelector
   * @returns {ShopaholicAddWishList}
   */
  setWrapperSelector(sSelector) {
    this.sWrapperSelector = sSelector;

    return this;
  }

  /**
   * Redeclare default attribute name with product ID
   * Default value is data-product-id
   *
   * @param {string} sAttribute
   * @returns {ShopaholicAddWishList}
   */
  setAttributeName(sAttribute) {
    this.sAttributeName = sAttribute;

    return this;
  }

  /**
   * Redeclare default ajax component method
   * Default value is ProductList::onAddToWishList
   *
   * @param {string} sComponentMethod
   * @returns {ShopaholicAddWishList}
   */
  setComponentMethod(sComponentMethod) {
    this.sComponentMethod = sComponentMethod;

    return this;
  }
}