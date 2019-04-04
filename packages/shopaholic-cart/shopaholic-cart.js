/**
 * @author  Andrey Kharanenka, <a.khoronenko@lovata.com>, LOVATA Group,
 * @author  Uladzimir Ambrazhey, <v.ambrazhey@lovata.com>, LOVATA Group
 */
export default class ShopaholicCart {
  constructor() {
    /* Selectors */
    this.sOfferItemType = 'Lovata\\Shopaholic\\Models\\Offer';

    /* Params */
    this.sGetDataHandler = 'Cart::onGetData';
    this.iRadix = 10;

    this.obCartData = null;
  }

  /**
   * Init singleton object of ShopaholicCart
   * @param {object} obRequestData
   * @returns {ShopaholicCart}
   */
  static instance(obRequestData = null) {
    if (window.ShopaholicCart === undefined) {
      window.ShopaholicCart = new ShopaholicCart();
      window.ShopaholicCart.init(obRequestData);
    }

    return window.ShopaholicCart;
  }

  /**
   * Init cart data object if it is empty
   */
  init(obRequestData) {
    if (this.obCartData !== null) {
      return;
    }

    if (!obRequestData) {
     let obRequestData = {};
    }

    obRequestData.complete = ({responseJSON}) => {
      this.obCartData = responseJSON;
    };

    $.request(this.sGetDataHandler, obRequestData);
  }

  /**
   * Update cart data object
   * @param {object} obCartData
   */
  updateCartData(obCartData) {
    this.obCartData = obCartData;
  }

  /**
   * Get offer quantity from cart object
   * @param {int} iOfferID
   */
  getOfferQuantity(iOfferID) {
    let iQuantity = 0;
    const obCartPosition = this.findCartPositionByOfferID(iOfferID, this.sOfferItemType);

    if (!!obCartPosition) {
      iQuantity = obCartPosition.quantity;
    }

    return parseInt(iQuantity, this.iRadix);
  }

  /**
   * Get field value from cart position object
   * @param {int} iOfferID
   * @param {string} sField
   */
  getOfferPositionField(iPositionID, sField) {
    const obCartPosition = this.findCartPositionByID(iPositionID);
    if (!!obCartPosition && !!obCartPosition[sField]) {
      return obCartPosition[sField];
    }

    return null;
  }

  /**
   * Find cart position by item ID and type
   * @param {int} iItemID
   * @param {string} sItemType
   */
  findCartPositionByOfferID(iItemID, sItemType) {
    iItemID = parseInt(iItemID, 10);
    let obPosition = null;

    if (!this.obCartData || !this.obCartData.position) {
      return;
    }

    const obPositionList = this.obCartData.position;
    const arCartPositionIDList = Object.keys(obPositionList);
    for (let iKey in arCartPositionIDList) {
      obPosition = obPositionList[arCartPositionIDList[iKey]];
      if (obPosition.item_id == iItemID && obPosition.item_id == sItemType) {
        return obPosition;
      }
    }

    return obPosition;
  }

  /**
   * Find cart position by position ID
   * @param {int} iPositionID
   */
  findCartPositionByID(iPositionID) {
    iPositionID = parseInt(iPositionID, 10);
    let obPosition = null;

    if (!this.obCartData || !this.obCartData.position) {
      return;
    }

    const obPositionList = this.obCartData.position;
    if (!!obPositionList[iPositionID]) {
      return obPositionList[iPositionID];
    }

    return obPosition;
  }
}
