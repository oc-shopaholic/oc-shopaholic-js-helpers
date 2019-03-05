/**
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group
 */
export default class ShopaholicRemoveWishList {
  constructor() {
    this.sDefaultButtonClass = '_shopaholic-remove-wish-list-button';
    this.sButtonSelector = `.${this.sDefaultButtonClass}`;

    this.sDefaultWrapperClass = '_shopaholic-product-wrapper';
    this.sWrapperSelector = `.${this.sDefaultWrapperClass}`;
    this.sAttributeName = 'data-product-id';

    this.sComponentMethod = 'ProductList::onRemoveFromWishList';
    this.obAjaxRequestCallback = null;
  }

  /**
   * Init event handlers
   */
  init() {
    $(document).on('click', this.sButtonSelector, (obEvent) => {
      const obButton = $(obEvent.currentTarget),
        iProductID = this.getProductID(obButton);

      this.remove(iProductID, obButton);
    });
  }

  /**
   * Remove product from wish list
   * @param {int} iProductID
   * @param obButton
   */
  remove(iProductID, obButton) {
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
   * Redeclare default selector of product wrapper with product ID in attribute
   * Default value is ._shopaholic-product-wrapper
   *
   * @param {string} sSelector
   * @returns {ShopaholicRemoveWishList}
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
   * @returns {ShopaholicRemoveWishList}
   */
  setAttributeName(sAttribute) {
    this.sAttributeName = sAttribute;

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