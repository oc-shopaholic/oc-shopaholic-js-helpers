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

  create() {
    this.prepareRequestObject();
    this.sendRequest();
  }

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
    
    console.log(this.obOrder);
  }

  addFieldValue(obFieldNode) {
    const sGroup = obFieldNode.getAttribute(this.sGroupAttribute);
    let sField = obFieldNode.getAttribute(this.sFieldAttribute);
    if (!sField) {
      sField = obFieldNode.name;
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

  sendRequest() {

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
