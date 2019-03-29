/**
 * @author  Uladzimir Ambrazhey, <v.ambrazhey@lovata.com>, LOVATA Group
 */

export default class ShopaholicCartUpdate {
  constructor(helper) {
    if (!helper) {
      throw new Error('Helper variable is not defined. You should set it.');
    }
    this.CartHelper = helper;

    this.sWrapperClass = '_shopaholic-product-wrapper';
    this.sQuantityInputClass = '_shopaholic-quantity-input';

    this.sOfferIdAttr = 'offer_id';
    this.obAjaxRequestCallback = {};

    this.iRadix = 10;
    this.sUpdateComponentMethod = 'Cart::onUpdate';
    this.eventName = 'shopaholicCartUpdate';

    this.iDelayBeforeRequest = 400;
  }

  changeQuantityHandlerInit() {
    $(document).on('input', `.${this.sQuantityInputClass}`, ({ currentTarget }) => {
      this.changeQuantityHandler(currentTarget);
    });
  }

  changeQuantityHandler(eventInput) {
    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      const obProduct = eventInput.closest(`.${this.sWrapperClass}`);
      const iQuantity = this.getCurrentQuantity(eventInput);
      const iOfferID = this.CartHelper.getOfferId(obProduct);
      const obData = {
        cart: [
          { offer_id: iOfferID, quantity: iQuantity },
        ],
      };
      this.update(obData);
    }, this.iDelayBeforeRequest);
  }

  /**
   * @description Set new settings
   */
  set obRequestData(obj) {
    const keys = Object.keys(obj);

    keys.forEach((key) => {
      if (key !== 'complete') {
        this.obAjaxRequestCallback[key] = obj[key];
      }
    });
  }

  /**
   * @type {getter}
   * @description Return object with request settings
   */
  get obRequestData() {
    return this.obAjaxRequestCallback;
  }

  /**
   * @description Update cart
   * @param {array} [obCart=[]]
   */
  update(obData = {}) {
    const data = obData;
    this.obAjaxRequestCallback = {
      data,
      complete: ({ responseJSON }) => {
        this.obCartData = responseJSON;
        this.CartHelper.updateCartData(this.obCartData);

        document.dispatchEvent(this.createCustomEvent());
      },
    };

    const ajaxHandler = this.sUpdateComponentMethod;

    $.request(ajaxHandler, this.obRequestData);
  }

  /**
   * @description Return value of quantity input
     */

  getCurrentQuantity(input) {
    return parseInt(input.value, this.iRadix);
  }

  createCustomEvent() {
    const customEvent = new CustomEvent(this.eventName, {
      bubbles: true,
      cancelable: false,
      detail: this.obCartData,
    });

    return customEvent;
  }
}
