/**
 * @author  Uladzimir Ambrazhey, v.ambrazhey@lovata.com, LOVATA Group
 */

export default class ShopaholicAddCart {
  constructor(helper) {
    this.sButtonClass = '_shopaholic-add-to-cart';
    this.sWrapperClass = '_shopaholic-product-wrapper';

    this.obAjaxRequestCallback = {};
    this.completeCallbackFunc = null;

    this.sAddComponentMethod = 'Cart::onAdd';
    this.sUpdateComponentMethod = 'Cart::onUpdate';

    this.iRadix = 10;

    if (!helper) {
      throw new Error('Helper variable is not defined. You should set it.');
    }

    this.CartHelper = helper;
  }

  /**
  *  @description Init event handlers
  */

  initClickHandler() {
    $(document).on('click', `.${this.sButtonClass}`, (obEvent) => {
      this.eventHandlerCallback(obEvent);
    });
  }

  /**
   * @param {object} obEvent
   * @returns
   * @memberof ShopaholicAddCart
   */
  eventHandlerCallback(obEvent) {
    obEvent.preventDefault();

    const { currentTarget } = obEvent;

    if (currentTarget.hasAttribute('disabled')) return;

    const obProduct = currentTarget.closest(`.${this.sWrapperClass}`);
    const iOfferID = this.CartHelper.getOfferId(obProduct);
    const iQuantity = this.CartHelper.getOfferQuantity(iOfferID);

    this.add(iOfferID, iQuantity + 1, currentTarget);
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
   * @description Add product to cart
   * @param {int} iOfferID
   * @param {int} quantity
   * @param {node} button
   * @param {boolean} bForceAddMethod Sets enforced method `this.sAddComponentMethod`
   */

  add(iOfferID, quantity, button, bForceAddMethod) {
    if (button) {
      button.setAttribute('disabled', 'disabled');
    }

    this.obRequestData = {
      data: {
        cart:
          [
            { offer_id: iOfferID, quantity },
          ],
      },
      complete: () => {
        this.CartHelper.updateCartData(button);
        this.CartHelper.updateLocalPrice();

        if (this.completeCallbackFunc !== null) {
          this.completeCallback();
        }
      },
    };

    const ajaxHandler = quantity > 1 && !bForceAddMethod
      ? this.sUpdateComponentMethod
      : this.sAddComponentMethod;

    $.request(ajaxHandler, this.obRequestData);
  }

  /**
   * @type {setter}
   * @param {object}
   * @memberof ShopaholicAddCart
   * @description Set or rewrite request object settings
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
   * @memberof ShopaholicAddCart
   * @return {object}
   * @description Return object with request settings
   */
  get obRequestData() {
    return this.obAjaxRequestCallback;
  }
}
