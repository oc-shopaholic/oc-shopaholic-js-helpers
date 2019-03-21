import Cart from "@lovata/shopaholic-cart";

/**
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group
 */
export default new class CartAdd {
  constructor() {
    this.sDefaultWrapperClass = '_shopaholic-product-wrapper';
    this.sWrapperSelector = `.${this.sDefaultWrapperClass}`;

    this.sDefaulButtonClass = '_shopaholic-cart-add-button';
    this.sButtonSelector = `.${this.sDefaulButtonClass}`;

    this.sAddComponentMethod = 'Cart::onAdd';
    this.sUpdateComponentMethod = 'Cart::onUpdate';
    this.obAjaxRequestCallback = null;
  }

  init() {
    $(document).on('click', this.sButtonSelector, (obEvent) => {
      const obButton = $(obEvent.currentTarget),
        obProduct = obButton.parents(this.sWrapperSelector),
        iOfferID = parseInt(obProduct.find('[name="offer_id"]').val()),
        iQuantity = parseInt(obProduct.find('[name="quantity"]').val());

      if (iOfferID < 1) {
        return;
      }

      this.sendAjax(iOfferID, iQuantity);
    });
  }

  /**
   * Sean ajax request and add offer to cart
   * @param {int} iOfferID
   * @param {int} iQuantity
   * @param {object} obProperty
   */
  sendAjax(iOfferID, iQuantity, obProperty = {}) {
    if (iQuantity < 1) {
      iQuantity = 1;
    }

    //Get offer quantity from current cart object
    let iCartQuantity = Cart.getOfferQuantity(iOfferID);
    if (iCartQuantity > 0) {
      iQuantity += iCartQuantity;
    }

    //Prepare request data
    let obRequestData = {
      'data': {
        'cart': [{'offer_id': iOfferID, 'quantity': iQuantity, 'property': obProperty}]
      },
      complete: () => {
        Cart.updateCartData();
      }
    };

    if (this.obAjaxRequestCallback !== null) {
      obRequestData = this.obAjaxRequestCallback(obRequestData, iOfferID);
    }

    //Send ajax request
    $.request(iCartQuantity > 0 ? this.sUpdateComponentMethod: this.sAddComponentMethod, obRequestData);
  }

  /**
   * Set ajax request callback
   *
   * @param {function} obCallback
   * @returns {CartAdd}
   */
  setAjaxRequestCallback(obCallback) {
    this.obAjaxRequestCallback = obCallback;

    return this;
  }

  /**
   * Redeclare default selector of "Add to cart" button
   * Default value is ._shopaholic-cart-add-button
   *
   * @param {string} sSelector
   * @returns {CartAdd}
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
   * @returns {CartAdd}
   */
  setWrapperSelector(sSelector) {
    this.sWrapperSelector = sSelector;

    return this;
  }

  /**
   * Redeclare default ajax component method (onAdd method)
   * Default value is Cart::onAdd
   *
   * @param {string} sComponentMethod
   * @returns {CartAdd}
   */
  setAddComponentMethod(sComponentMethod) {
    this.sAddComponentMethod = sComponentMethod;

    return this;
  }

  /**
   * Redeclare default ajax component method (onUpdate method)
   * Default value is Cart::onUpdate
   *
   * @param {string} sComponentMethod
   * @returns {CartAdd}
   */
  setUpdateComponentMethod(sComponentMethod) {
    this.sAddComponentMethod = sComponentMethod;

    return this;
  }
}
