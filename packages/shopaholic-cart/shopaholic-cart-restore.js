import ShopaholicCartPosition from "@lovata/shopaholic-cart/shopaholic-cart-position";
import ShopaholicCart from "@lovata/shopaholic-cart/shopaholic-cart";
import ShopaholicCartShippingType from "@lovata/shopaholic-cart/shopaholic-cart-shipping-type";

/**
 * @author  Uladzimir Ambrazhey, <v.ambrazhey@lovata.com>, LOVATA Group
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group
 */
export default class ShopaholicCartRestore {
  constructor() {
    this.sDefaultButtonClass = '_shopaholic-cart-restore';
    this.sRestoreComponentMethod = 'Cart::onRestore';
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
   * Restore cart position
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
        'shipping_type_id': obShippingType.getShippingTypeID()
      },
      complete: ({responseJSON}) => {
        this.completeCallback(responseJSON, obButton);
      },
    };

    if (this.obAjaxRequestCallback !== null) {
      obRequestData = this.obAjaxRequestCallback(obRequestData, obButton);
    }

    $.request(this.sRestoreComponentMethod, obRequestData);
  }

  /**
   * Restore disabled attribute from button
   * Update cart data in ShopaholicCart object
   */
  completeCallback(obResponse, obButton) {
    const {data: obCartData} = obResponse;

    ShopaholicCart.instance().updateCartData(obCartData);

    if (obButton) {
      obButton.restoreAttribute('disabled');
    }
  }

  /**
   * Set ajax request callback
   *
   * @param {function} obCallback
   * @returns {ShopaholicCartRestore}
   */
  setAjaxRequestCallback(obCallback) {
    this.obAjaxRequestCallback = obCallback;

    return this;
  }
}
