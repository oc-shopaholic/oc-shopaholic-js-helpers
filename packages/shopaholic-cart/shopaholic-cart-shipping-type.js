import ShopaholicCart from "@lovata/shopaholic-cart/shopaholic-cart";

/**
 * @author  Uladzimir Ambrazhey, <v.ambrazhey@lovata.com>, LOVATA Group
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group
 */
export default class ShopaholicCartShippingType {
  constructor() {
    this.sDefaultInputName = 'shipping_type_id';

    this.obAjaxRequestCallback = null;
    this.iRadix = 10;

    this.sComponentMethod = 'Cart::onSetShippingType';

    ShopaholicCart.instance();
  }

  /**
  * Init event handlers
  */
  init() {
    $(document).on('change', `[name="${this.sDefaultInputName}"]`, (obEvent) => {

      const {currentTarget: obInput} = obEvent;
      this.sendAjaxRequest(obInput);
    });
  }

  /**
   * Send ajax request and update prices with new shipping-type-id
   */
  sendAjaxRequest(obInput) {

    const iShippingTypeID = this.getShippingTypeID();

    let obRequestData = {
      data: {
        'shipping_type_id': iShippingTypeID,
      },
      complete: ({responseJSON}) => {
        this.completeCallback(responseJSON);
      },
    };

    if (this.obAjaxRequestCallback !== null) {
      obRequestData = this.obAjaxRequestCallback(obRequestData, obInput);
    }

    $.request(this.sComponentMethod, obRequestData);
  }

  /**
   * Get active shipping type
   * @returns {null|number}
   */
  getShippingTypeID() {
    let iShippingTypeID = null;
    const obInputList = document.querySelectorAll(`[name=${this.sDefaultInputName}]`);
    if (!obInputList || obInputList.length === 0) {
      return iShippingTypeID;
    }

    const isRadio = this.getInputType(obInputList);
    if (isRadio) {
      const obInputNode = [...obInputList].filter(node => node.checked);

      iShippingTypeID = parseInt(obInputNode[0].value, this.iRadix);
    } else {
      iShippingTypeID = parseInt(obInputList[0].value, this.iRadix);
    }

    return  iShippingTypeID;
  }

  /**
   * Detect type of input with offer id
   */
  getInputType(obInputList) {
    const firstNode = obInputList[0];
    const {type: sType} = firstNode;

    return sType === 'radio';
  }

  /**
   * Update cart data in ShopaholicCart object
   */
  completeCallback(obResponse) {
    const {data: obCartData} = obResponse;

    ShopaholicCart.instance().updateCartData(obCartData);
  }

  /**
   * Set ajax request callback
   *
   * @param {function} obCallback
   * @returns {ShopaholicCartShippingType}
   */
  setAjaxRequestCallback(obCallback) {
    this.obAjaxRequestCallback = obCallback;

    return this;
  }
}
