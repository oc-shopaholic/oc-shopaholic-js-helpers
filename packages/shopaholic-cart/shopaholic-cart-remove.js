import ShopaholicCartPosition from "@lovata/shopaholic-cart/shopaholic-cart-position";
import ShopaholicCart from "@lovata/shopaholic-cart/shopaholic-cart";

/**
 * @author  Uladzimir Ambrazhey, <v.ambrazhey@lovata.com>, LOVATA Group
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group
 */
export default class ShopaholicCartRemove {
  constructor() {
    this.sDefaultButtonClass = '_shopaholic-cart-remove';
    this.sButtonSelector = `.${this.sDefaultButtonClass}`;

    this.obAjaxRequestCallback = null;

    this.sRemoveComponentMethod = 'Cart::onRemove';

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

      this.remove(obButton);
    });
  }

  /**
   * Remove cart position
   * @param {node} obButton
   */

  remove(obButton) {
    if (!obButton) {
      throw new Error('Button node is empty.');
    }

    obButton.setAttribute('disabled', 'disabled');
    const obCartPosition = new ShopaholicCartPosition(obButton);
    const iPositionID = obCartPosition.getPositionID();

    let obRequestData = {
      data: {
        cart: [iPositionID],
        type: 'position'
      },
      complete: ({responseJSON}) => {
        this.completeCallback(responseJSON, obButton);
      },
    };

    if (this.obAjaxRequestCallback !== null) {
      obRequestData = this.obAjaxRequestCallback(obRequestData, obButton);
    }

    $.request(this.sRemoveComponentMethod, obRequestData);
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
   * @returns {ShopaholicCartRemove}
   */
  setAjaxRequestCallback(obCallback) {
    this.obAjaxRequestCallback = obCallback;

    return this;
  }

  /**
   * Redeclare default selector of "Remove from cart" button
   * Default value is "._shopaholic-cart-remove"
   *
   * @param {string} sSelector
   * @returns {ShopaholicCartRemove}
   */
  setButtonSelector(sSelector) {
    this.sButtonSelector = sSelector;

    return this;
  }

  /**
   * Redeclare default selector of product wrapper with product ID in attribute
   * Default value is "._shopaholic-product-wrapper"
   *
   * @param {string} sSelector
   * @returns {ShopaholicCartRemove}
   */
  setWrapperSelector(sSelector) {
    this.sWrapperSelector = sSelector;

    return this;
  }
}
