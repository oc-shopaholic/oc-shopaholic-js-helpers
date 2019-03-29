/**
 * @author  Uladzimir Ambrazhey, <v.ambrazhey@lovata.com>, LOVATA Group
 */

export default class ShopaholicCartRemove {
  constructor(helper) {
    this.sWrapperClass = '_shopaholic-product-wrapper';

    this.sRemoveComponentMethod = 'Cart::onRemove';
    this.obAjaxRequestCallback = {};

    if (!helper) {
      throw new Error('Helper variable is not defined. You should set it.');
    }

    this.eventName = 'shopaholicCartRemove';

    this.CartHelper = helper;
  }

  set obRequestData(obj) {
    const keys = Object.keys(obj);

    keys.forEach((key) => {
      this.obAjaxRequestCallback[key] = obj[key];
    });
  }

  /**
   * @description Return object with request settings
   */
  get obRequestData() {
    return this.obAjaxRequestCallback;
  }

  /**
   * @description Remove product
   */
  remove(removeBtnNode) {
    const obProduct = removeBtnNode.closest(`.${this.sWrapperClass}`);
    const iOfferID = this.CartHelper.getOfferId(obProduct);

    this.obAjaxRequestCallback = {
      data: {
        cart: [iOfferID],
      },
      complete: ({ responseJSON }) => {
        this.obCartData = responseJSON;
        this.CartHelper.updateCartData(this.obCartData);
        obProduct.dispatchEvent(this.createCustomEvent());
      },
    };

    $.request(this.sRemoveComponentMethod, this.obRequestData);
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
