export default class ShopaholicCoupon {
  constructor() {
    this.sCouponWrapClass = '_shopaholic_coupon-wrapper';
    this.sCouponBtnClass = '_shopaholic-coupon-submit';
    this.sCouponInputClass = '_shopaholic_coupon-input';

    this.iErrorMessageDisappearingDelay = 1500;

    this.addCouponHandler = 'Cart::onAddCoupon';
    this.removeCouponHandler = 'Cart::onRemoveCoupon';

    this.obAjaxRequestCallback = {};
  }

  initClickHandler() {
    $(document).on('click', `.${this.sCouponBtnClass}`, (e) => {
      e.preventDefault();
      const { currentTarget } = e;
      const wrapper = currentTarget.closest(`.${this.sCouponWrapClass}`);
      const input = wrapper.querySelector(`.${this.sCouponInputClass}`);
      const { value } = input;

      if (!value) return;

      const hasCode = !input.hasAttribute('disabled');

      this.getRequestMethod(hasCode, input, currentTarget);
    });
  }

  getRequestMethod(hasCode, input) {
    if (hasCode) {
      this.addCouponRequest(input);
    } else {
      this.removeCouponRequest(input);
    }
  }

  addCouponRequest(input) {
    const { value } = input;
    const data = {
      data: { coupon: value },
    };
    $.request(this.addCouponHandler, {
      data,
      success: (res) => {
        console.log(res);
      },
    });
  }

  removeCouponRequest(input) {
    const { value } = input;
    const data = {
      data: { coupon: value },
    };
    $.request(this.removeCouponHandler, {
      data,
      success: (res) => {
        console.log(res);
      },
    });
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
