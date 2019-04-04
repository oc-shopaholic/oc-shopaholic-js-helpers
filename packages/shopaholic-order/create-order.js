/**
 * @author  Uladzimir Ambrazhey, <v.ambrazhey@lovata.com>, LOVATA Group
 */

export default class CreateOrder {
  constructor() {
    this.sOrderFormClass = '_shopaholic-order-form';
    this.sOrderFormFieldsetClass = '_shopaholic-order-form-fieldset';
    this.sDeliveryMethodWrapperClass = '_shopaholic-delivery';
    this.sDeliveryMethodField = '_shopaholic-delivery-field';
    this.sPaymentMethodWrapperClass = '_shopaholic-payment';
    this.sFieldClass = '_shopaholic-order-field';

    this.sErrorMessageContainer = '_shopaholic-error';
    this.sErrorMessageContainerBoxModel = 'block';
    this.iErrorMessageDisappearingDelay = 3000;

    this.sTypeOfSelectionMethodAttribute = 'data-selection-type';
    this.sNestingAttribute = 'data-nesting';

    this.defaultSeparator = '|';
    this.sendOrderMethod = 'MakeOrder::onCreate';
    this.obOrderInfo = {
      order: {
        property: {},
      },
      user: {},
      shipping_address: {},
      billing_address: {},
    };
  }
  

  /**
   * @description Initialize object of order creation
   */
  createOrderObject() {
    const form = document.querySelector(`.${this.sOrderFormClass}`);

    if (!form) return;

    const fieldSet = form.querySelectorAll(`.${this.sOrderFormFieldsetClass}`);

    [...fieldSet].forEach(inputGroup => this.checkGropeType(inputGroup));
  }

   /**
   * @description Check type of input group and initialize correct handler
   */
  checkGropeType(inputGroup) {
    if (inputGroup.matches(`.${this.sDeliveryMethodWrapperClass}`)) {
      this.getDeliveryMethod(inputGroup);
    } else if (inputGroup.matches(`.${this.sPaymentMethodWrapperClass}`)) {
      this.getPaymentMethod(inputGroup);
    } else {
      this.getOrderInfo(inputGroup);
    }
  }

  /**
   * @description Select correct handler for current type of delivery selection method and get deliveryID
   * @returns {int} deliveryID
   */
  getDeliveryMethod(inputGroup) {
    const type = this.getSelectionType(inputGroup);

    const deliveryID = type === 'radio' ? this.getRadioValue(inputGroup) : this.getSelectValue(inputGroup);

    return deliveryID;
  }

  /**
   * @description Select correct handler for current type of payment selection method and get paymentID
   * @returns {int} paymentID
   */
  getPaymentMethod(inputGroup) {
    const type = this.getSelectionType(inputGroup);
    const paymentID = type === 'radio' ? this.getRadioValue(inputGroup) : this.getSelectValue(inputGroup);

    return paymentID;
  }

   /**
   * @description Find checked radio button and return it
   * @returns {node} Checked radio button
   */
  getRadioValue(inputGroup) {
    const radioCollection = inputGroup.querySelectorAll(`.${this.sFieldClass}`);

    const checkedRadio = [...radioCollection].filter(input => input.checked && input.type === 'radio');

    if (!checkedRadio.length) return;

    this.setObOfferInfo(checkedRadio[0]);
  }

   /**
   * @description Find <select> node and return it
   * @returns {node} Checked radio button
   */
  getSelectValue(inputGroup) {
    const select = inputGroup.querySelector(`.${this.sFieldClass}`);

    if (!select) return;

    this.setObOfferInfo(select);
  }
  

  /**
   *  @description Find <input> or <select> nodes, get their value and send into setObOfferInfo() handler
   */
  getOrderInfo(inputGroup) {
    const inputCollection = inputGroup.querySelectorAll(`.${this.sFieldClass}`);

    const filledInputArray = [...inputCollection].filter(input => input.value);

    if (!filledInputArray.length) return;

    [...filledInputArray].forEach(input => this.setObOfferInfo(input));
  }

   /**
   *  @description Get field value, name and nesting options and add value to this.obOrderInfo
   */
  setObOfferInfo(input) {
    const { name, value } = input;

    const nesting = input.getAttribute(this.sNestingAttribute);
    const nestingArray = nesting.split(this.defaultSeparator);

    if (!nesting) {
      this.obOrderInfo[name] = value;
    } else {
      this.createNestedObject(nestingArray, name, value);
    }
  }

  createNestedObject(nestingArray, name, value) {
    const { length } = nestingArray;

    if (length === 1) {
      this.obOrderInfo[nestingArray[0]][name] = value;
    } else if (length === 2) {
      this.obOrderInfo[nestingArray[0]][nestingArray[1]][name] = value;
    }
  }

    
  /**
   * @description Use for options with one selectable variant (<radio> or <select> node). 
   * Check type and return it or error if type incorrect
   * @returns {string} Type of elements or error text
   */
  getSelectionType(inputGroup) {
    const type = inputGroup.getAttribute(this.sTypeOfSelectionMethodAttribute);

    if (!type || (type !== 'radio' && type !== 'select')) {
      throw new Error(`The type of selection is not defined. 
                       Set the data-selection-type attribute to "select" or "radio"`);
    }

    return type;
  }

   /**
   * @description Send request
   */
  sendOrder(success, loading) {
    $.request(this.sendOrderMethod, {
      data: this.obOrderInfo,
      success,
      loading,
      complete: (res) => {
        this.setCompleteAction(res);
      },
    });
  }

   /**
   * @description Check error message in server response
   */
  setCompleteAction(serverResponse) {
    const { responseJSON } = serverResponse;

    if (!responseJSON) return;

    const { status, message } = responseJSON;

    if (status === false) {
      this.showErrorMessage(message);
    }
  }
  
  
   /**
   * @description Show node with error message and hide it after some time (default = 3000ms)
   */
  showErrorMessage(message) {
    const messageContainer = document.querySelector(`.${this.sErrorMessageContainer}`);

    if (!tooltip || !message) return;

    messageContainer.innerHTML = message;

    messageContainer.style.display = this.sErrorMessageContainerBoxModel;

    setTimeout(() => {
      messageContainer.style.display = 'none';
    }, this.iErrorMessageDisappearingDelay);
  }
}
