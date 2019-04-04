export default class SetShippingType {
  constructor() {
    this.sDeliveryMethodField = '_shopaholic-delivery-field';
    this.sSetShippingTypeHandler = 'Cart::onSetShippingType';

    this.obAjaxRequestCallback = {};
    this.completeCallback = null;

    // Basic event`s for select and radio buttons.
    this.eventList = 'change, input';
  }
  
  initHandlers() {
    const deliveryInputCollection = document.querySelectorAll(`.${this.sDeliveryMethodField}`);

    if (!deliveryInputCollection) return;

    $(document).on(this.eventList, `.${this.sDeliveryMethodField}`, ({ currentTarget }) => {
      this.eventCallback(currentTarget);
    });
  }

  eventCallback(eventTarget) {
    const { value } = eventTarget;

    this.obRequestData = {
      data: {
        shipping_type_id: value,
      },
    };

    $.request(this.sSetShippingTypeHandler, this.obRequestData);
  }

  set obRequestData(obj) {
    const keys = Object.keys(obj);

    keys.forEach((key) => {
      this.obAjaxRequestCallback[key] = obj[key];
    });
  }

  get obRequestData() {
    return this.obAjaxRequestCallback;
  }
}
