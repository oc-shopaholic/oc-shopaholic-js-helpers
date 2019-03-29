import ShopaholicUpdateHandler from './shopaholic-update-handler';

export default class ShopaholicUpdateInfo {
  constructor(obOptions = [], obResponse = {}) {
    if (obOptions && !Array.isArray(obOptions)) {
      throw new Error('"obOptions" must be array[]');
    }

    if (obResponse.toString() !== '[object Object]') {
      throw new Error('"obResponse" is not define or not object{}');
    }
    this.handler = new ShopaholicUpdateHandler(obOptions, obResponse);

    /* Selectors */
    this.infoGroupSelector = 'data-shopaholic-info-group';

    /* Storage */
    this.infoGroupStorage = null;

    /* init */
    this.updateInfo();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.getInfoGroup();
    });
  }

  getInfoGroup() {
    const infoGroupList = document.querySelectorAll(`[${this.infoGroupSelector}]`);

    if (!infoGroupList) return;

    this.infoGroupStorage = infoGroupList;
  }

  updateInfo() {
    this.getInfoGroup();
    [...this.infoGroupStorage].forEach(item => this.getInfoType(item));
  }

  getInfoType(item) {
    const type = item.getAttribute(this.infoGroupSelector);

    if (!type) {
      throw new Error(`Type of info group is not defined. Check you ${this.infoGroupTypeSelector}`);
    }

    const formattedType = type.replace(/-/g, '_').toLowerCase();

    this.getGroupHandler(item, formattedType);
  }

  getGroupHandler(item, type) {
    const obHandlerList = {
      position: this.handler.positionHandler,
      position_total_price: this.handler.positionTotalPriceHandler,
      quantity: this.handler.quantityHandler,
      shipping_price: this.handler.shippingPriceHandler,
      total_price: this.handler.totalPriceHandler,
      total_quantity: this.handler.totalQuantity,
    };

    return obHandlerList[type].call(this.handler, item);
  }
}
