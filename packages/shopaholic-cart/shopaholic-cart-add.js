import ShopaholicCartPosition from "@lovata/shopaholic-cart/shopaholic-cart-position";
import ShopaholicCart from "@lovata/shopaholic-cart/shopaholic-cart";

/**
 * @author  Uladzimir Ambrazhey, <v.ambrazhey@lovata.com>, LOVATA Group
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group
 */
export default class ShopaholicAddCart {
  constructor() {
    this.sDefaultButtonClass = '_shopaholic-cart-add';
    this.sButtonSelector = `.${this.sDefaultButtonClass}`;

    this.obAjaxRequestCallback = null;

    this.sAddComponentMethod = 'Cart::onAdd';
    this.sUpdateComponentMethod = 'Cart::onUpdate';

    ShopaholicCart.instance();
  }

  /**
  * Init event handlers
  */
  init() {
    $(document).on('click', `${this.sButtonSelector}`, (obEvent) => {
      obEvent.preventDefault();

      const {currentTarget: obButton} = obEvent;
      if (obButton.hasAttribute('disabled')) {
        return;
      }

      this.add(obButton);
    });
  }

  /**
   * Add offer to cart
   * @param {node} obButton
   * @param {boolean} bForceAddMethod Sets enforced method `this.sAddComponentMethod`
   */

  add(obButton, bForceAddMethod = false) {
    if (!obButton) {
      throw new Error('Button node is empty.');
    }

    obButton.setAttribute('disabled', 'disabled');
    const obCartPosition = new ShopaholicCartPosition(obButton);
    let obPositionData = obCartPosition.getData();
    const iOfferID = obPositionData.offer_id;

    const iCartQuantity = ShopaholicCart.instance().getOfferQuantity(iOfferID);

    obPositionData.quantity += iCartQuantity;

    let obRequestData = {
      data: {
        cart: [obPositionData],
      },
      complete: ({responseJSON}) => {
        this.completeCallback(responseJSON, obButton);
      },
    };

    if (this.obAjaxRequestCallback !== null) {
      obRequestData = this.obAjaxRequestCallback(obRequestData, obButton);
    }

    const ajaxHandler = iCartQuantity > 1 && !bForceAddMethod ? this.sUpdateComponentMethod : this.sAddComponentMethod;

    $.request(ajaxHandler, obRequestData);
  }

  /**
   * Remove disabled attribute from button
   * Update cart data in ShopaholicCart object
   */
  completeCallback(obResponse, obButton) {
    const {data: obCartData} = obResponse;

    ShopaholicCart.instance().updateCartData(obCartData);

    if (obButton) {
      obButton.removeAttribute('disabled');
    }
  }

  /**
   * Set ajax request callback
   *
   * @param {function} obCallback
   * @returns {ShopaholicAddCart}
   */
  setAjaxRequestCallback(obCallback) {
    this.obAjaxRequestCallback = obCallback;

    return this;
  }

  /**
   * Redeclare default selector of "Add to cart" button
   * Default value is ._shopaholic-cart-add
   *
   * @param {string} sSelector
   * @returns {ShopaholicAddCart}
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
   * @returns {ShopaholicAddCart}
   */
  setWrapperSelector(sSelector) {
    this.sWrapperSelector = sSelector;

    return this;
  }
}
