/**
 * @author  Uladzimir Ambrazhey, <v.ambrazhey@lovata.com>, LOVATA Group
 */

export default class ShopaholicCartRemove {
  constructor(helper) {
    this.sWrapperClass = '_shopaholic-product-wrapper';

    this.sRemoveComponentMethod = 'Cart::onRemove';
    this.obAjaxRequestCallback = {};
    this.completeCallbackFunc = null;

    if (!helper) {
      throw new Error('Helper variable is not defined. You should set it.');
    }

    this.CartHelper = helper;
  }

  /**
   * @description Return callback function
   * @returns {object}
   * @memberof ShopaholicCartUpdate
   */
  completeCallback() {
    return this.completeCallbackFunc();
  }

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

  /**
   * @description Remove product
   * @param {node} removeBtnNode
   * @memberof ShopaholicAddCart
   */
  remove(removeBtnNode) {
    const obProduct = removeBtnNode.closest(`.${this.sWrapperClass}`);
    const iOfferID = this.CartHelper.getOfferId(obProduct);

    this.obRequestData = {
      data: {
        cart: [iOfferID],
      },
      complete: () => {
        this.CartHelper.updateCartData();

        if (this.completeCallbackFunc !== null) {
          this.completeCallback();
        }
      },
    };

    $.request(this.sRemoveComponentMethod, this.obRequestData);
  }
}
