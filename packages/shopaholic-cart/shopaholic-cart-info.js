/**
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group,
 * @author  Uladzimir Ambrazhey, v.ambrazhey@lovata.com, LOVATA Group
 */

export default class Cart {
  constructor() {
    this.sItemType = 'Lovata\\Shopaholic\\Models\\Offer';
    this.sCartMiniWrapperClass = '_shopaholic-cart-button-wrapper';
    this.sDefaultCartMiniPath = 'product/cart/cart-mini/cart-info/cart-info-button';

    this.positionIdAttr = 'data-shopaholic-position-id';
    this.sPositionCurrentPriceClass = '_shopaholic-current-price';
    this.sPositionOldPriceClass = '_shopaholic-old-price';

    this.init();
  }


  /**
   *
   * @description Load cart info after page loading;
   * @memberof Cart
   */
  init() {
    window.addEventListener('load', () => {
      this.updateCartData();
    });
  }

  /**
   *
   * @description Send ajax request and update cart data object
   * @param {node} button
   * @memberof Cart
   */
  updateCartData(button) {
    $.request('Cart::onGetData', {
      update: {
        [this.sDefaultCartMiniPath]: `.${this.sCartMiniWrapperClass}`,
      },
      complete: ({ responseJSON }) => {
        this.obCartData = responseJSON;
        this.updateLocalPrice();
        if (!button) return;

        button.removeAttribute('disabled');
      },
    });
  }

  /**
   * Get offer quantity from cart object
   * @param {int} iOfferID
   * @returns {int}
   */
  getOfferQuantity(iOfferID) {
    let iQuantity = '';
    const obCartPosition = this.findCartPosition(iOfferID, this.sItemType);


    if (!obCartPosition) {
      iQuantity = 0;
    } else {
      const obOfferInfo = this.obCartData.position[obCartPosition];
      const { quantity } = obOfferInfo;
      iQuantity = quantity;
    }

    return parseInt(iQuantity, 10);
  }

  /**
   * Find cart position by item ID and type
   * @param {int} iItemID
   * @param {string} sItemType
   * @returns {object}
   */

  findCartPosition(ItemID, sItemType) {
    const iItemID = parseInt(ItemID, 10);

    if (this.obCartData === null) {
      this.updateCartData();
    }

    const { position: obPosition } = this.obCartData;

    if (!this.obCartData || !obPosition) return;

    const arCartPositionIDList = Object.keys(obPosition);

    if (!arCartPositionIDList.length) return;

    const iPositionID = [...arCartPositionIDList].filter((id) => {
      const obCartPosition = this.obCartData.position[id];

      return obCartPosition.item_id === iItemID && obCartPosition.item_type === sItemType;
    });

    return iPositionID[0]; // eslint-disable-line consistent-return
  }


  /**
   * @memberof Cart
   */

  updateLocalPrice() {
    const { position: obPosition } = this.obCartData;

    [...Object.keys(obPosition)].forEach(id => this.changePrice(id, obPosition));
  }


  /**
   *
   * @description Update product price in product card
   * @param {int} id
   * @param {object} obPosition
   * @memberof Cart
   */


  changePrice(id, obPosition) {
    const priceNode = document.querySelector(`[${this.positionIdAttr}="${id}"]`);

    if (!priceNode) return;

    const currentPriceNode = document.querySelectorAll(`.${this.sPositionCurrentPriceClass}`);

    if (!currentPriceNode) return;

    [...currentPriceNode].forEach((node) => {
      node.innerHTML = obPosition[id].price; // eslint-disable-line no-param-reassign
    });

    const oldPriceNode = document.querySelectorAll(`.${this.sPositionOldPriceClass}`);

    if (!oldPriceNode) return;

    [...oldPriceNode].forEach((node) => {
      node.innerHTML = obPosition[id].old_price; // eslint-disable-line no-param-reassign
    });
  }
}
