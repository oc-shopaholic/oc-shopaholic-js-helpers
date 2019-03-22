/**
 * @author  Uladzimir Ambrazhey, v.ambrazhey@lovata.com, LOVATA Group
 */

import CartInfo from './cart';

export default class ShopaholicAddCart {
  constructor() {
    this.sButtonClass = '_shopaholic-add-to-cart';
    this.sWrapperClass = '_shopaholic-product-wrapper';

    this.sQuantityInputClass = '_shopaholic-quantity-input';
    this.sTotalPriceWrapperClass = '_shopaholic-cart-total-price';

    this.sOfferIdAttr = 'offer_id';
    this.obAjaxRequestCallback = {};

    this.sDefaultTotalPricePartial = 'product/cart/cart-mini/cart-mini-price/cart-mini-price';

    this.sAddComponentMethod = 'Cart::onAdd';
    this.sUpdateComponentMethod = 'Cart::onUpdate';
    this.sRemoveComponentMethod = 'Cart::onRemove';

    this.iDefaultRadix = 10;

    this.Cart = new CartInfo();
  }

  /**
  *  @description Init event handlers
  */

  init() {
    $(document).on('click', `.${this.sButtonClass}`, (obEvent) => {
      obEvent.preventDefault();

      const { currentTarget } = obEvent;

      if (currentTarget.hasAttribute('disabled')) return;

      const obProduct = currentTarget.closest(`.${this.sWrapperClass}`);
      const iOfferID = this.getOfferId(obProduct);
      const iQuantity = this.Cart.getOfferQuantity(iOfferID);

      this.add(iOfferID, iQuantity + 1, currentTarget);
    });

    $(document).on('input', `.${this.sQuantityInputClass}`, ({ currentTarget }) => {
      clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        this.changeQuantityHandler(currentTarget);
      }, 400);
    });
  }


  /**
   * @description Update product quantity
   * @param {node} input
   * @memberof ShopaholicAddCart
   */
  changeQuantityHandler(input) {
    const obProduct = input.closest(`.${this.sWrapperClass}`);
    const iQuantity = this.getCurrentQuantity(input);
    const iOfferID = this.getOfferId(obProduct);

    this.add(iOfferID, iQuantity);
  }


  /**
   * @description Return value of quantity input
   * @param {node} input
   * @returns {int}
   * @memberof ShopaholicAddCart
   */

  getCurrentQuantity(input) {
    return parseInt(input.value, this.iDefaultRadix);
  }


  /**
   * @description Add product to cart
   * @param {int} iOfferID
   * @param {int} quantity
   * @param {node} button
   * @param {boolean} forceAdd Sets enforced method `this.sAddComponentMethod`
   */

  add(iOfferID, quantity, button, bForceAddMethod) {
    const $this = this;
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
      update: {
        [this.sDefaultTotalPricePartial]: `.${this.sTotalPriceWrapperClass}`,
      },
      success: function (res) { // eslint-disable-line object-shorthand, func-names
        this.success(res);
        $this.Cart.updateCartData(button);
        $this.Cart.updateLocalPrice();
      },
    };

    const ajaxHandler = quantity > 1 && !bForceAddMethod
      ? this.sUpdateComponentMethod
      : this.sAddComponentMethod;

    $.request(ajaxHandler, this.obRequestData);
  }


  /**
   *
   * @description Remove product
   * @param {node} removeBtnNode
   * @memberof ShopaholicAddCart
   */
  remove(removeBtnNode) {
    const $this = this;
    const obProduct = removeBtnNode.closest(`.${this.sWrapperClass}`);
    const iOfferID = this.getOfferId(obProduct);

    $.request(this.sRemoveComponentMethod, {
      data: {
        cart: [iOfferID],
      },
      update: {
        [this.sDefaultTotalPricePartial]: `.${this.sTotalPriceWrapperClass}`,
      },
      success: function (res) { // eslint-disable-line object-shorthand, func-names
        this.success(res);
        $this.Cart.updateCartData();
        $this.Cart.updateLocalPrice();
      },
    });
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

  /**
   * @description Get product ID from attribute
   * @param {int} obProduct
   * @returns {int}
   */
  getOfferId(obProduct) {
    const iProductIdNodeCollection = obProduct.querySelectorAll(`[name=${this.sOfferIdAttr}]`);


    if (!iProductIdNodeCollection) {
      throw new Error('Product ID was not found');
    }

    const isRadio = this.constructor.getOfferIdInputType(iProductIdNodeCollection);

    const { value: iValue } = isRadio
      ? this.constructor.getIdFromRadioCollection(iProductIdNodeCollection)
      : iProductIdNodeCollection[0];

    return iValue;
  }


  /**
   * @description Get checked radio button
   * @param collection
   * @returns {node}
   */
  static getIdFromRadioCollection(collection) {
    const iProductIdNode = [...collection].filter(node => node.checked);

    return iProductIdNode[0];
  }

  /**
   * @description Detect type of input with offer id
   * @param iProductIdNodeCollection
   * @returns {boolean}
   */
  static getOfferIdInputType(iProductIdNodeCollection) {
    const firstNode = iProductIdNodeCollection[0];
    const { type: sType } = firstNode;

    return sType === 'radio';
  }
}
