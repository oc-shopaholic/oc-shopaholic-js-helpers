import ShopaholicCartPosition from "@lovata/shopaholic-cart/shopaholic-cart-position";
import ShopaholicCart from "@lovata/shopaholic-cart/shopaholic-cart";
import ShopaholicCartShippingType from "@lovata/shopaholic-cart/shopaholic-cart-shipping-type";

/**
 * @author  Uladzimir Ambrazhey, <v.ambrazhey@lovata.com>, LOVATA Group
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group
 */
export default class ShopaholicCartUpdate {
  constructor() {
    this.sDefaultInputClass = '_shopaholic-cart-quantity';
    this.sIncreaseInputClass = '_shopaholic-cart-increase-quantity';
    this.sDecreaseInputClass = '_shopaholic-cart-decrease-quantity';
    this.sUpdateComponentMethod = 'Cart::onUpdate';
    this.obAjaxRequestCallback = null;

    this.iDelayBeforeRequest = 400;
    this.obTimer = null;

    ShopaholicCart.instance();
  }

  /**
  * Init event handlers
  */
  init() {
    this.initUpdateEvent();
    this.initIncreaseEvent();
    this.initDecreaseEvent();
  }

  /**
   * Init update event
   */
  initUpdateEvent() {
    $(document).on('input', `.${this.sDefaultInputClass}`, (obEvent) => {
      if (this.obTimer !== null) {
        clearTimeout(this.obTimer);
      }
      
      this.obTimer = setTimeout(() => {
        const {currentTarget: obInput} = obEvent;
        const iMaxQuantity = this.getMaxQuantity(obInput);
        let iQuantity = this.getQuantity(obInput);
        if (iQuantity < 1) {
          iQuantity = 1;
        }

        if (iQuantity > iMaxQuantity) {
          obInput.value = iMaxQuantity;
          return;
        }

        this.sendAjaxRequest(obInput);
      }, this.iDelayBeforeRequest);
    });
  }

  /**
   * Init increase event
   */
  initIncreaseEvent() {
    $(document).on('click', `.${this.sIncreaseInputClass}`, (obEvent) => {
      if (this.obTimer !== null) {
        clearTimeout(this.obTimer);
      }

      const {currentTarget: obButton} = obEvent;
      const obCartPosition = new ShopaholicCartPosition(obButton);
      const obInput = obCartPosition.getQuantityInput();
      const iMaxQuantity = this.getMaxQuantity(obInput);
      let iQuantity = this.getQuantity(obInput) + 1;
      if (iQuantity > iMaxQuantity) {
        return;
      }

      obInput.value = iQuantity;
      if (iQuantity == iMaxQuantity) {
        obButton.setAttribute('disabled', 'disabled');
      } else {
        obButton.removeAttribute('disabled');
      }
      
      if (iQuantity > 1) {
        const obCartNode = obCartPosition.getNode();
        const obDecreaseButton = obCartNode.querySelector(`.${this.sDecreaseInputClass}`);
        if (obDecreaseButton) {
          obDecreaseButton.removeAttribute('disabled');
        }
      }

      this.obTimer = setTimeout(() => {
        this.sendAjaxRequest(obInput);
      }, this.iDelayBeforeRequest);
    });
  }

  /**
   * Init decrease event
   */
  initDecreaseEvent() {
    $(document).on('click', `.${this.sDecreaseInputClass}`, (obEvent) => {
      if (this.obTimer !== null) {
        clearTimeout(this.obTimer);
      }

      const {currentTarget: obButton} = obEvent;
      const obCartPosition = new ShopaholicCartPosition(obButton);
      const obInput = obCartPosition.getQuantityInput();
      const iMaxQuantity = this.getMaxQuantity(obInput);
      let iQuantity = this.getQuantity(obInput) - 1;
      if (iQuantity < 1) {
        return;
      }

      obInput.value = iQuantity;
      if (iQuantity == 1) {
        obButton.setAttribute('disabled', 'disabled');
      } else {
        obButton.removeAttribute('disabled');
      }

      if (iQuantity < iMaxQuantity) {
        const obCartNode = obCartPosition.getNode();
        const obIncreaseButton = obCartNode.querySelector(`.${this.sIncreaseInputClass}`);
        if (obIncreaseButton) {
          obIncreaseButton.removeAttribute('disabled');
        }
      }

      this.obTimer = setTimeout(() => {
        this.sendAjaxRequest(obInput);
      }, this.iDelayBeforeRequest);
    });
  }

  /**
   * Update position data
   * @param {node} obInput
   */
  sendAjaxRequest(obInput) {
    if (!obInput) {
      throw new Error('Input node is empty.');
    }

    const obCartPosition = new ShopaholicCartPosition(obInput);
    let obPositionData = obCartPosition.getData();
    const obShippingType = new ShopaholicCartShippingType();

    let obRequestData = {
      data: {
        cart: [obPositionData],
        'shipping_type_id': obShippingType.getShippingTypeID()
      },
      complete: ({responseJSON}) => {
        this.completeCallback(responseJSON);
      },
    };

    if (this.obAjaxRequestCallback !== null) {
      obRequestData = this.obAjaxRequestCallback(obRequestData, obInput);
    }

    $.request(this.sUpdateComponentMethod, obRequestData);
  }

  getQuantity(obInput) {
    return parseInt(obInput.value, this.iRadix);
  }

  /**
   * Get offer quantity from cart object
   */
  getMaxQuantity(obInput) {
    return parseInt(obInput.getAttribute('max'), this.iRadix);
  }

  /**
   * Remove disabled attribute from button
   * Update cart data in ShopaholicCart object
   */
  completeCallback(obResponse) {
    const {data: obCartData} = obResponse;

    ShopaholicCart.instance().updateCartData(obCartData);
  }

  /**
   * Set ajax request callback
   *
   * @param {function} obCallback
   * @returns {ShopaholicCartUpdate}
   */
  setAjaxRequestCallback(obCallback) {
    this.obAjaxRequestCallback = obCallback;

    return this;
  }
}
