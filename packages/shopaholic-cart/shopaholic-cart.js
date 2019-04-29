/**
 * @author  Andrey Kharanenka, <a.khoronenko@lovata.com>, LOVATA Group,
 * @author  Uladzimir Ambrazhey, <v.ambrazhey@lovata.com>, LOVATA Group
 */
import ShopaholicCartPosition from "@lovata/shopaholic-cart/shopaholic-cart-position";

export default class ShopaholicCart {
  constructor() {
    /* Selectors */
    this.sOfferItemType = 'Lovata\\Shopaholic\\Models\\Offer';

    /* Params */
    this.sGetDataHandler = 'Cart::onGetData';
    this.iRadix = 10;

    this.sNodeClass = '_shopaholic-cart';
    this.sOldPriceClass = '_shopaholic-old-price';
    this.sHideOldPriceClass = '_shopaholic-hide-old-price';
    this.sGroupAttribute = 'data-group';
    this.sFieldAttribute = 'data-field';

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

    let obData = obRequestData;

    if (!obRequestData) {
      obData = {};
    }

    obData.complete = ({ responseJSON }) => {
      this.obCartData = responseJSON;
    };

    $.request(this.sGetDataHandler, obData);
  }

  /**
   * Update cart data object
   * @param {object} obCartData
   */
  updateCartData(obCartData) {
    this.obCartData = obCartData;

    this.renderPriceFields();
  }

  /**
   * Get offer quantity from cart object
   * @param {int} iOfferID
   * @param {object} obOfferProperty
   */
  getOfferQuantity(iOfferID, obOfferProperty) {
    let iQuantity = 0;
    const obCartPosition = this.findCartPositionByOfferID(iOfferID, this.sOfferItemType, obOfferProperty);

    if (!!obCartPosition) {
      iQuantity = obCartPosition.quantity;
    }

    return parseInt(iQuantity, this.iRadix);
  }

  /**
   * Get field value from cart position object
   * @param {int} iPositionID
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
   * Get field value from object
   * @param {string} sGroup
   * @param {string} sField
   */
  getField(sGroup, sField) {
    if (!!this.obCartData && !!this.obCartData[sGroup] && !!this.obCartData[sGroup][sField]) {
      return this.obCartData[sGroup][sField];
    }

    return null;
  }

  /**
   * Find cart position by item ID and type
   * @param {int} iItemID
   * @param {string} sItemType
   * @param {object} obOfferProperty
   */
  findCartPositionByOfferID(iItemID, sItemType, obOfferProperty) {
    iItemID = parseInt(iItemID, 10);
    let obPosition = null;

    if (!this.obCartData || !this.obCartData.position) {
      return;
    }

    const obPositionList = this.obCartData.position;
    const arCartPositionIDList = Object.keys(obPositionList);
    for (let iKey of arCartPositionIDList) {
      let obPositionItem = obPositionList[iKey];
      if (obPositionItem.item_id != iItemID || obPositionItem.item_type != sItemType
        || JSON.stringify(obPositionItem.property) != JSON.stringify(obOfferProperty)) {
        continue;
      }

      obPosition = obPositionItem;
      break;
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

  /**
   * Find price fields and update price values
   */
  renderPriceFields() {
    const obNodeList = document.querySelectorAll(`.${this.sNodeClass}`);
    if (!obNodeList || obNodeList.length === 0) {
      return;
    }

    obNodeList.forEach((obPriceNode) => {
      const sGroupOriginal = obPriceNode.getAttribute(this.sGroupAttribute);
      const sGroup = !!sGroupOriginal ? sGroupOriginal.replace(/-/g, '_').toLowerCase() : sGroupOriginal;
      const sFieldOriginal = obPriceNode.getAttribute(this.sFieldAttribute);
      const sField = !!sFieldOriginal? sFieldOriginal.replace(/-/g, '_').toLowerCase() : sFieldOriginal;
      let sNewValue = '';

      if (sGroup === 'position') {
        const obCartPosition = new ShopaholicCartPosition(obPriceNode);
        const iPositionID = obCartPosition.getPositionID();
        sNewValue = this.getOfferPositionField(iPositionID, sField);

        obPriceNode.textContent = sNewValue;
        this.processPositionOldPriceField(obCartPosition, sField, sFieldOriginal, sGroupOriginal);
      } else {
        sNewValue = this.getField(sGroup, sField);

        obPriceNode.textContent = sNewValue;
        this.processOldPriceField(sField, sFieldOriginal, sGroup, sGroupOriginal);
      }

    });
  }

  /**
   * Process old price field of position
   * @param {ShopaholicCartPosition} obCartPosition
   * @param {string} sField
   * @param {string} sFieldOriginal
   * @param {string} sGroupOriginal
   */
  processPositionOldPriceField(obCartPosition, sField, sFieldOriginal, sGroupOriginal) {
    if (sField.indexOf('old_price') < 0) {
      return;
    }

    const iPositionID = obCartPosition.getPositionID();
    const obCartNode = obCartPosition.getNode();
    const obOldPriceNodeList = obCartNode.querySelectorAll(`.${this.sOldPriceClass}[data-group="${sGroupOriginal}"][data-field="${sFieldOriginal}"]`);
    if (!obOldPriceNodeList || obOldPriceNodeList.length === 0) {
      return;
    }

    const fDiscountPrice = this.getOfferPositionField(iPositionID, sField.replace(/old_price/g, 'discount_price') + '_value');

    obOldPriceNodeList.forEach((obOldPriceNode) => {
      if (fDiscountPrice > 0) {
        obOldPriceNode.classList.remove(this.sHideOldPriceClass);
      } else {
        obOldPriceNode.classList.add(this.sHideOldPriceClass);
      }
    });
  }

  /**
   * Process old price field
   * @param {string} sField
   * @param {string} sFieldOriginal
   * @param {string} sGroup
   * @param {string} sGroupOriginal
   */
  processOldPriceField(sField, sFieldOriginal, sGroup, sGroupOriginal) {
    if (sField.indexOf('old_price') < 0) {
      return;
    }

    const obOldPriceNodeList = document.querySelectorAll(`.${this.sOldPriceClass}[data-group="${sGroupOriginal}"][data-field="${sFieldOriginal}"]`);
    if (!obOldPriceNodeList || obOldPriceNodeList.length === 0) {
      return;
    }

    const fDiscountPrice = this.getField(sGroup, sField.replace(/old_price/g, 'discount_price') + '_value');

    obOldPriceNodeList.forEach((obOldPriceNode) => {
      if (fDiscountPrice > 0) {
        obOldPriceNode.classList.remove(this.sHideOldPriceClass);
      } else {
        obOldPriceNode.classList.add(this.sHideOldPriceClass);
      }
    });
  }
}
