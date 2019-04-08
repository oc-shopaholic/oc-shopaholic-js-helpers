/**
 * @author  Andrey Kharanenka, <a.khoronenko@lovata.com>, LOVATA Group,
 * @author  Uladzimir Ambrazhey, <v.ambrazhey@lovata.com>, LOVATA Group
 */
export default class ShopaholicCartPosition {
  constructor(obButton) {
    this.sDefaultWrapperClass = '_shopaholic-product-wrapper';
    this.sWrapperSelector = `.${this.sDefaultWrapperClass}`;

    this.sPositionIDAttr = 'data-position-id';
    this.sOfferIDAttr = 'offer_id';
    this.sQuantityAttr = 'quantity';

    this.obButton = obButton;
    this.obProductCart = obButton.closest(`${this.sWrapperSelector}`);

    this.iPositionID = null;
    this.iOfferID = null;
    this.iQuantity = 1;
    this.obProperty = {};
    this.iRadix = 10;

    this.eventName = 'shopaholic.cart.position.extend';
    if (!this.obProductCart) {
      throw new Error('Product wrapper is empty. It mast contain product card node');
    }

    this.referenceType = 'radio';

    this.initOfferID();
    this.initQuantity();
    this.initCartPositionID();
  }

  /**
   * Get cart position node
   * @returns {*}
   */
  getNode() {
    return this.obProductCart;
  }

  /**
   * Get cart position data
   * @returns {{quantity: number, id: null, offer_id: null}}
   */
  getData() {
    const obData = {
      id: this.iPositionID,
      offer_id: this.iOfferID,
      quantity: this.iQuantity,
      property: this.obProperty
    };
    document.dispatchEvent(this.createCustomEvent(obData));

    return obData;
  }

  /**
   * Get position ID
   * @returns {int}
   */
  getPositionID() {
    return this.iPositionID;
  }

  /**
   * Get quantity
   * @returns {int}
   */
  getQuantity() {
    return this.iQuantity;
  }

  /**
   * Get quantity input node
   * @returns {node}
   */
  getQuantityInput() {
    return this.obProductCart.querySelector(`[name=${this.sQuantityAttr}]`);
  }

  /**
   * Get offer ID from input
   */
  initOfferID() {
    const obOfferIDNodeCollection = this.obProductCart.querySelectorAll(`[name=${this.sOfferIDAttr}]`);
    if (!obOfferIDNodeCollection || obOfferIDNodeCollection.length === 0) {
      return;
    }

    const isRadio = this.getOfferIDInputType(obOfferIDNodeCollection);
    if (isRadio) {
      const obOfferIDNode = [...obOfferIDNodeCollection].filter(node => node.checked);

      this.iOfferID = parseInt(obOfferIDNode[0].value, this.iRadix);
    } else {
      this.iOfferID = parseInt(obOfferIDNodeCollection[0].value, this.iRadix);
    }
  }

  /**
   * Detect type of input with offer id
   */
  getOfferIDInputType(obOfferIDNodeCollection) {
    const firstNode = obOfferIDNodeCollection[0];
    const { type: sType } = firstNode;

    return sType === this.referenceType;
  }

  /**
   * Get offer quantity from cart object
   */
  initQuantity() {
    const obQuantityInput = this.getQuantityInput();
    if (!obQuantityInput) {
      return;
    }

    this.iQuantity = parseInt(obQuantityInput.value, this.iRadix);
  }

  /**
   * Get offer quantity from cart object
   */
  initCartPositionID() {
    this.iPositionID = parseInt(this.obProductCart.getAttribute(`${this.sPositionIDAttr}`), this.iRadix);
  }

  /**
   * Create event
   * @param options
   * @returns {CustomEvent<any>}
   */
  createCustomEvent(options) {
    const event = new CustomEvent(this.eventName, {
      bubbles: true,
      cancelable: true,
      detail: options,
    });

    return event;
  }
}
