import ShopaholicCart from "@lovata/shopaholic-cart/shopaholic-cart";
import ShopaholicCartShippingType from "@lovata/shopaholic-cart/shopaholic-cart-shipping-type";

/**
 * @author  Uladzimir Ambrazhey, <v.ambrazhey@lovata.com>, LOVATA Group
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group
 */
export default class ShopaholicCouponRemove {
  constructor() {
    this.sButtonClass = '_shopaholic-coupon-remove';

    this.sComponentMethod = 'Cart::onRemoveCoupon';

    this.obAjaxRequestCallback = null;
  }

  /**
   * Init event handlers
   */
  init() {
    $(document).on('click', `.${this.sButtonClass}`, (obEvent) => {
      obEvent.preventDefault();
      const { currentTarget: obButton } = obEvent;
      const obInput = document.querySelector('[data-coupon]');
      
      let sValue = '';
      
      if (obInput.tagName.toLocaleLowerCase() === 'input') {
        const { value } = obInput;
        sValue = value;
      } else {
        sValue = obInput.getAttribute('data-coupon-value');
      }

      if (!sValue) return;

      obButton.setAttribute('disabled', 'disabled');

      this.sendAjaxRequest(sValue, obInput, obButton);
    });
  }

  /**
   * Send ajax request and remove coupon
   * @param {string} sValue
   * @param {object} obInput
   * @param {object} obButton
   */
  sendAjaxRequest(sValue, obInput, obButton) {

    const obShippingType = new ShopaholicCartShippingType();

    let obRequestData = {
      data: {
        coupon: sValue,
        shipping_type_id: obShippingType.getShippingTypeID(),
      },
      complete: ({ responseJSON }) => {
        this.completeCallback(responseJSON, obInput, obButton);
      },
    };

    if (this.obAjaxRequestCallback !== null) {
      obRequestData = this.obAjaxRequestCallback(obRequestData, obInput, obButton);
    }

    $.request(this.sComponentMethod, obRequestData);
  }

  /**
   * Remove disabled attribute from button
   * Update cart data in ShopaholicCart object
   * @param {object} obResponse
   * @param {object} obInput
   * @param {object} obButton
   */
  completeCallback(obResponse, obInput, obButton) {
    const {data: obCartData} = obResponse;

    ShopaholicCart.instance().updateCartData(obCartData);

    if (obButton) {
      obButton.removeAttribute('disabled');
    }

    if (obInput) {
      obInput.removeAttribute('disabled');
    }
  }

  /**
   * Set ajax request callback
   *
   * @param {function} obCallback
   * @returns {ShopaholicCouponRemove}
   */
  setAjaxRequestCallback(obCallback) {
    this.obAjaxRequestCallback = obCallback;

    return this;
  }
}
