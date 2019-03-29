export default class SetShippingType {
  constructor() {
    this.sSetShippingTypeHandler = 'Cart::onSetShippingType';

    this.shippingTypeSelector = 'shipping_type_id';

    this.obAjaxRequestCallback = {};

    // Basic event`s for select and radio buttons.
    this.eventList = 'change';
    this.eventName = 'shopaholicShippingTypeChange';
  }

  /**
   * @description Listen onChange event on shipping-type node
   */
  initHandlers() {
    const deliveryInputCollection = document.querySelectorAll(`[name='${this.shippingTypeSelector}']`);

    if (!deliveryInputCollection) return;

    this.setDefaultShippingType();
    $(document).on('change', `[name='${this.shippingTypeSelector}']`, ({ currentTarget }) => {
      this.eventCallback(currentTarget);
    });
  }

  /**
   * @description Get shipping-type-id after page loading
   */
  setDefaultShippingType() {
    const shippingList = document.querySelectorAll(`[name=${this.shippingTypeSelector}]`);
    let shippingTypeNode = '';

    if (!shippingList.length) return;

    if (shippingList[0].tagName.toLocaleUpperCase() === 'INPUT'
      && shippingList[0].type.toLocaleUpperCase() === 'RADIO') {
      const input = [...shippingList].filter(el => el.checked);
      [shippingTypeNode] = input;
    } else {
      const node = shippingList[0];

      shippingTypeNode = node;
    }

    this.eventCallback(shippingTypeNode);
  }

  /**
   * @description Send request with shipping_type_id
   */
  eventCallback(eventTarget) {
    const { value } = eventTarget;

    this.obAjaxRequestCallback = {
      data: {
        shipping_type_id: value,
      },
      complete: ({ responseJSON }) => {
        this.obCartData = responseJSON;
        eventTarget.dispatchEvent(this.createCustomEvent());
      },
    };

    $.request(this.sSetShippingTypeHandler, this.obRequestData);
  }


  /**
   * @description Set more options for request
   */
  set obRequestData(obj) {
    const keys = Object.keys(obj);

    keys.forEach((key) => {
      if (key !== 'complete') {
        this.obAjaxRequestCallback[key] = obj[key];
      }
    });
  }

  get obRequestData() {
    return this.obAjaxRequestCallback;
  }

  createCustomEvent() {
    const customEvent = new CustomEvent(this.eventName, {
      bubbles: true,
      cancelable: false,
      detail: this.obCartData,
    });


    return customEvent;
  }
}
