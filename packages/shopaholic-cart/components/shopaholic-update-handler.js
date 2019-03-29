/**
 * @author  Uladzimir Ambrazhey, <v.ambrazhey@lovata.com>, LOVATA Group
 */

export default class ShopaholicUpdateHandler {
  constructor(obOptions = [], obResponse = {}) {
    this.obOptions = obOptions;
    this.positionIdSelector = 'data-shopaholic-position-id';
    this.obResponse = obResponse;
  }

  positionHandler(item) {
    const obPositionData = this.obResponse.position;
    const positionList = item.querySelectorAll(`[${this.positionIdSelector}]`);

    [...positionList].forEach(listItem => this.getPositionData(listItem, obPositionData));
  }

  getPositionData(item, obPositionData) {
    const id = item.getAttribute(this.positionIdSelector);
    const data = obPositionData[id];

    this.setNewInfo(data, item);
  }

  setNewInfo(data, item) {
    this.obOptions.forEach((option) => {
      if (data === undefined) return;

      const optionNodeList = item.querySelectorAll(`[${option}]`);

      if (!optionNodeList) return;

      const formattedOption = option.replace('data-', '').replace(/-/g, '_').toLowerCase();
      const value = data[formattedOption];

      if (!value) return;

      [...optionNodeList].forEach((node) => {
        node.innerHTML = value; // eslint-disable-line no-param-reassign
      });
    });
  }

  positionTotalPriceHandler(item) {
    const obPositionPriceData = this.obResponse.position_total_price;
    this.setNewInfo(obPositionPriceData, item);
  }

  quantityHandler(item) {
    const quantityData = this.obResponse.quantity;
    this.setNewInfo(quantityData, item);
  }

  shippingPriceHandler(item) {
    const obShippingPriceData = this.obResponse.shipping_price;
    this.setNewInfo(obShippingPriceData, item);
  }

  totalPriceHandler(item) {
    const obTotalPrice = this.obResponse.total_price;
    this.setNewInfo(obTotalPrice, item);
  }

  totalQuantity(item) {
    const obTotalQuantity = this.obResponse.total_quantity;
    this.setNewInfo(obTotalQuantity, item);
  }
}
