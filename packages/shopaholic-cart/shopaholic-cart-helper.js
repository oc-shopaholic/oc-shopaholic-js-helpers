/**
 * @author  Andrey Kharanenka, <a.khoronenko@lovata.com>, LOVATA Group,
 * @author  Uladzimir Ambrazhey, <v.ambrazhey@lovata.com>, LOVATA Group
 */

export default class CartHelper {
  constructor() {
    this.sItemType = 'Lovata\\Shopaholic\\Models\\Offer';
    this.sOfferIdAttr = 'offer_id';

    this.positionIdAttr = 'data-shopaholic-position-id';
    this.sPositionCurrentPriceClass = '_shopaholic-current-price';
    this.sPositionOldPriceClass = '_shopaholic-old-price';

    this.sGetDataHandler = 'Cart::onGetData';

    this.init();
  }

  /**
   * @description Load cart info after page loading;
   * @memberof Cart
   */
  init() {
    this.updateCartData();
  }

  /**
   * @description Send ajax request and update cart data object
   * @param {node} button
   * @memberof Cart
   */
  updateCartData(button) {
    $.request(this.sGetDataHandler, {
      complete: ({ responseJSON }) => {
        this.obCartData = responseJSON;
        this.updateLocalPrice();
        if (button) {
          button.removeAttribute('disabled');
        }
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

    if (!obCartPosition[0]) {
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
    let iPositionID = null;

    const { position: obPosition } = this.obCartData;

    if (!!this.obCartData && !!obPosition) {
      const arCartPositionIDList = Object.keys(obPosition);

      iPositionID = this.filterPositionList(arCartPositionIDList, iItemID, sItemType);
    }
    return iPositionID;
  }

  /**
   * @description Return filtered array with position ID
   * @param {array} arCartPositionIDList
   * @param {int} iItemID
   * @param {string} sItemType
   * @returns {int}
   * @memberof CartHelper
   */
  filterPositionList(arCartPositionIDList, iItemID, sItemType) {
    const iPositionID = [...arCartPositionIDList].filter((id) => {
      const obCartPosition = this.obCartData.position[id];

      return obCartPosition.item_id === iItemID && obCartPosition.item_type === sItemType;
    });

    return iPositionID;
  }

  /**
   * @memberof CartHelper
   */

  updateLocalPrice() {
    const { position: arPosition } = this.obCartData;

    [...Object.keys(arPosition)].forEach(id => this.changePrice(id, arPosition));
  }

  /**
   * @description Update product price in product card
   * @param {int} id
   * @param {object} obPosition
   * @memberof CartHelper
   */

  changePrice(id, arPosition) {
    const priceNode = document.querySelectorAll(`[${this.positionIdAttr}="${id}"]`);

    if (!priceNode) return;

    [...priceNode].forEach(node => this.setNewPrice(node, arPosition, id));
  }

  setNewPrice(priceNode, arPosition, id) {
    const currentPriceNode = priceNode.querySelectorAll(`.${this.sPositionCurrentPriceClass}`);
    if (!currentPriceNode) return;
    [...currentPriceNode].forEach((node) => { node.innerHTML = arPosition[id].price; });

    const oldPriceNode = priceNode.querySelectorAll(`.${this.sPositionOldPriceClass}`);
    if (!oldPriceNode) return;
    [...oldPriceNode].forEach((node) => { node.innerHTML = arPosition[id].old_price; });
  }

  /**
   * @description Get product ID from attribute
   * @param obProduct
   * @returns {int}
   */
  getOfferId(obProduct) {
    if (!obProduct) {
      throw new Error('obProduct variable is empty');
    }

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
  static getIdFromRadioCollection(obCollection) {
    const iProductIdNode = [...obCollection].filter(node => node.checked);

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
