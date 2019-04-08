import ShopaholicCartPosition from "@lovata/shopaholic-cart/shopaholic-cart-position";
import ShopaholicCart from "@lovata/shopaholic-cart/shopaholic-cart";
import ShopaholicCartShippingType from "@lovata/shopaholic-cart/shopaholic-cart-shipping-type";

/**
 * @author  Uladzimir Ambrazhey, <v.ambrazhey@lovata.com>, LOVATA Group
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group
 */
export default class ShopaholicCartRemove {
  constructor() {
    this.sDefaultButtonClass = '_shopaholic-cart-remove';
    this.sRemoveComponentMethod = 'Cart::onRemove';
    this.obAjaxRequestCallback = null;

    ShopaholicCart.instance();
  }

  /**
  * Init event handlers
  */
  init() {
    $(document).on('click', `.${this.sDefaultButtonClass}`, (obEvent) => {
      obEvent.preventDefault();

      const {currentTarget: obButton} = obEvent;
      if (obButton.hasAttribute('disabled')) {
        return;
      }

      this.sendAjaxRequest(obButton);
    });
  }

  /**
   * Remove cart position
   * @param {node} obButton
   */
  sendAjaxRequest(obButton) {
    if (!obButton) {
      throw new Error('Button node is empty.');
    }

    obButton.setAttribute('disabled', 'disabled');
    const obCartPosition = new ShopaholicCartPosition(obButton);
    const iPositionID = obCartPosition.getPositionID();
    const obShippingType = new ShopaholicCartShippingType();

    let obRequestData = {
      data: {
        cart: [iPositionID],
        type: 'position',
        'shipping_type_id': obShippingType.getShippingTypeID()
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
}
