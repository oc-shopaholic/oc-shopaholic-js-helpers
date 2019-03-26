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
    this.completeCallbackFunc = null;
    this.obAjaxRequestCallback = {};

    this.iRadix = 10;
    this.sUpdateComponentMethod = 'Cart::onUpdate';

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
   * @type {setter}
   * @readonly
   * @description Set new settings
   * @memberof ShopaholicCartUpdate
   */
  set obRequestData(obj) {
    const keys = Object.keys(obj);

    keys.forEach((key) => {
      this.obAjaxRequestCallback[key] = obj[key];
    });
  }

  /**
   * @type {getter}
   * @readonly
   * @memberof ShopaholicCartUpdate
   * @return {object}
   * @description Return object with request settings
   */
  get obRequestData() {
    return this.obAjaxRequestCallback;
  }

  /**
   * @description Return callback function
   * @returns {object}
   * @memberof ShopaholicCartUpdate
   */
  completeCallback() {
    return this.completeCallbackFunc();
  }

  /**
   * @description Update cart
   * @param {array} [obCart=[]]
   * @memberof ShopaholicCartUpdate
   */
  update(obData = {}) {
    const data = obData;
    this.obRequestData = {
      data,
      complete: () => {
        this.CartHelper.updateCartData();
        this.CartHelper.updateLocalPrice();

        if (this.completeCallbackFunc !== null) {
          this.completeCallback();
        }
      },
    };

    const ajaxHandler = this.sUpdateComponentMethod;

    $.request(ajaxHandler, this.obRequestData);
  }

  /**
   * @description Return value of quantity input
   * @param {node} input
   * @returns {int}
   * @memberof ShopaholicAddCart
   */

  getCurrentQuantity(input) {
    return parseInt(input.value, this.iRadix);
  }
}
