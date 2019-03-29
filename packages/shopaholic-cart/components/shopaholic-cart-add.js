/**
 * @author  Uladzimir Ambrazhey, <v.ambrazhey@lovata.com>, LOVATA Group
 */

export default class ShopaholicAddCart {
  constructor(helper) {
    this.sButtonClass = '_shopaholic-add-to-cart';
    this.sWrapperClass = '_shopaholic-product-wrapper';
    this.progressClass = '_shopaholic-loading';

    this.sOfferIdAttr = 'offer_id';

    this.obAjaxRequestCallback = {};

    this.sAddComponentMethod = 'Cart::onAdd';
    this.sUpdateComponentMethod = 'Cart::onUpdate';
    this.eventName = 'shopaholicCartAdd';

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
   * @description Get info and add product to cart
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
   * @description Add product to cart
   * @param {int} iOfferID
   * @param {int} quantity
   * @param {node} button
   * @param {boolean} bForceAddMethod Sets enforced method `this.sAddComponentMethod`
   */

  add(iOfferID, quantity, button, bForceAddMethod) {
    if (button) {
      button.classList.add(this.progressClass);
      button.setAttribute('disabled', 'disabled');
    }

    this.obAjaxRequestCallback = {
      data: {
        cart:
          [
            { offer_id: iOfferID, quantity },
          ],
      },
      complete: ({ responseJSON }) => {
        this.completeCallback(responseJSON, button);
      },
    };

    const ajaxHandler = quantity > 1 && !bForceAddMethod
      ? this.sUpdateComponentMethod
      : this.sAddComponentMethod;

    $.request(ajaxHandler, this.obRequestData);
  }


  /**
   *  @description Remove progress styles, update obCartData and call shopaholicCartAdd event
   */
  completeCallback(data, button) {
    this.obCartData = data;
    this.CartHelper.updateCartData(this.obCartData);

    if (button) {
      button.removeAttribute('disabled');
      button.classList.remove(this.progressClass);
      button.dispatchEvent(this.createCustomEvent());
    } else {
      document.dispatchEvent(this.createCustomEvent());
    }
  }

  /**
   * @description Set or rewrite request object settings
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
   * @description Return object with request settings
   */
  get obRequestData() {
    return this.obAjaxRequestCallback;
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
