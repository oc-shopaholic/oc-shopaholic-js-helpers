/**
 * @author  Andrey Kharanenka, <a.khoronenko@lovata.com>, LOVATA Group,
 * @author  Uladzimir Ambrazhey, <v.ambrazhey@lovata.com>, LOVATA Group
 */
import UpdateInfo from './shopaholic-update-info';

export default class CartHelper {
  constructor(obUpdateOptions = []) {
    /* Selectors */
    this.sItemType = 'Lovata\\Shopaholic\\Models\\Offer';
    this.sOfferIdAttr = 'offer_id';
    this.positionIdAttr = 'data-shopaholic-position-id';

    /* Params */
    this.sGetDataHandler = 'Cart::onGetData';
    this.iRadix = 10;
    this.obUpdateOptions = obUpdateOptions;

    // Get first info about cart
    this.init();
  }

  /**
   * @description Load cart info after page loading;
   */
  init() {
    $.request(this.sGetDataHandler, {
      complete: ({ responseJSON }) => {
        this.obCartData = responseJSON;
      },
    });
  }

  /**
   * @description Update data-object and info on page
   * @param {node} button
   */
  updateCartData(obData) {
    this.obCartData = obData.data;
    this.updateInfo = new UpdateInfo(this.obUpdateOptions, this.obCartData);
  }

  /**
   * @description Get offer quantity from cart object
   * @param {int} iOfferID
   */
  getOfferQuantity(iOfferID) {
    let iQuantity = '';
    const obCartPosition = this.findCartPosition(iOfferID, this.sItemType);

    if (!obCartPosition[0]) {
      iQuantity = 0;
    } else {
      const obOfferInfo = this.obCartData.position[obCartPosition[0]];
      const { quantity } = obOfferInfo;

      iQuantity = quantity;
    }

    return parseInt(iQuantity, this.iRadix);
  }

  /**
   * Find cart position by item ID and type
   * @param {int} iItemID
   * @param {string} sItemType
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
   */
  filterPositionList(arCartPositionIDList, iItemID, sItemType) {
    const iPositionID = [...arCartPositionIDList].filter((id) => {
      const obCartPosition = this.obCartData.position[id];

      return obCartPosition.item_id === iItemID && obCartPosition.item_type === sItemType;
    });

    return iPositionID;
  }

  /**
   * @description Get product ID from attribute
   */
  getOfferId(obProduct) {
    if (!obProduct) {
      throw new Error('obProduct variable is empty. It mast contain product card node');
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
   */
  static getIdFromRadioCollection(obCollection) {
    const iProductIdNode = [...obCollection].filter(node => node.checked);

    return iProductIdNode[0];
  }

  /**
   * @description Detect type of input with offer id
   */
  static getOfferIdInputType(iProductIdNodeCollection) {
    const firstNode = iProductIdNodeCollection[0];
    const { type: sType } = firstNode;

    return sType === 'radio';
  }
}
