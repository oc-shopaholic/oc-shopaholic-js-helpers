/**
 * @author  Uladzimir Ambrazhey, <v.ambrazhey@lovata.com>, LOVATA Group
 */

export default class ShopaholicOrder {
  constructor() {
    this.sOrderFormClass = '_shopaholic-order-form';
    this.sOrderFieldClass = '_shopaholic-order-field';
    this.sGroupAttribute = 'data-group';
    this.sFieldAttribute = 'data-field';
    this.obAjaxRequestCallback = null;

    this.sComponentMethod = 'MakeOrder::onCreate';
    this.obOrder = {
      order: {
        property: {},
      },
      user: {},
      shipping_address: {},
      billing_address: {},
    };
  }

  /**
   * Prepare request object with order data
   * Send ajax request and create order
   */
  create() {
    this.prepareRequestObject();
    this.sendAjaxRequest();
  }

  /**
   * Prepare request object from order form
   */
  prepareRequestObject()
  {
    const obOrderForm = document.querySelector(`.${this.sOrderFormClass}`);
    if (!obOrderForm) {
      return;
    }

    const obFieldList = obOrderForm.querySelectorAll(`.${this.sOrderFieldClass}`);
    if (!obFieldList || obFieldList.length === 0) {
      return;
    }

    obFieldList.forEach((obFieldNode) => {
      this.addFieldValue(obFieldNode);
    });
  }

  /**
   * Process node and add field value in request object
   * @param {node} obFieldNode
   */
  addFieldValue(obFieldNode) {
    const sGroupOriginal = obFieldNode.getAttribute(this.sGroupAttribute);
    const sGroup = !!sGroupOriginal ? sGroupOriginal.replace(/-/g, '_').toLowerCase(): sGroupOriginal;
    let sFieldOriginal = obFieldNode.getAttribute(this.sFieldAttribute);
    let sField = !!sFieldOriginal ? sFieldOriginal.replace(/-/g, '_').toLowerCase() : sFieldOriginal;
    if (!sField) {
      sField = obFieldNode.name.replace(/-/g, '_').toLowerCase();
    }

    const {type: sType} = obFieldNode;

    if ((sType === 'radio' || sType === 'checkbox') && !obFieldNode.checked) {
      return;
    }

    const sValue = obFieldNode.value;
    if (sGroup) {
      sField = `${sGroup}.${sField}`;
    }

    this.addValueToObject(sField, sValue);
  }

  /**
   * Add field value in request object
   * @param {string} sField
   * @param {string} sValue
   */
  addValueToObject(sField, sValue) {
    const arFieldList = sField.split('.');
    let obValueObject = this.obOrder;
    let sLastField = null;

    arFieldList.forEach((sFieldPart) => {
      if (sLastField !== null && obValueObject[sLastField] === null) {
        obValueObject[sLastField] = {};
      }

      if (sLastField !== null) {
        obValueObject = obValueObject[sLastField];
      }

      sLastField = sFieldPart;
      if (obValueObject[sFieldPart] === undefined) {
        obValueObject[sFieldPart] = null;
      }
    });

    if (obValueObject[sLastField] === null) {
      obValueObject[sLastField] = sValue;
    } else if (!!obValueObject[sLastField]) {
      obValueObject[sLastField] = [obValueObject[sLastField]];
      obValueObject[sLastField].push(sValue);
    }
  }

  /**
   * Send ajax request and create order
   */
  sendAjaxRequest() {

    let obRequestData = {data: this.obOrder};

    if (this.obAjaxRequestCallback !== null) {
      obRequestData = this.obAjaxRequestCallback(obRequestData);
    }

    $.request(this.sComponentMethod, obRequestData);
  }

  /**
   * Set ajax request callback
   *
   * @param {function} obCallback
   * @returns {ShopaholicOrder}
   */
  setAjaxRequestCallback(obCallback) {
    this.obAjaxRequestCallback = obCallback;

    return this;
  }
}
