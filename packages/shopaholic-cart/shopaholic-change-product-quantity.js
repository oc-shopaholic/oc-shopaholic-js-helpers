/**
 * @author  Uladzimir Ambrazhey, <v.ambrazhey@lovata.com>, LOVATA Group
 */

export default class ChangeProductQuantity {
  constructor() {
    this.sQuantitySectionWrapper = '_shopaholic-quantity-wrapper';
    this.sDecreaseBtnSelector = '_shopaholic-decrease-quantity-button';
    this.sIncreaseBtnSelector = '_shopaholic-increase-quantity-button';
    this.sInputSelector = '_shopaholic-quantity-input';

    this.radix = 10;
  }


  init() {
    this.increaseHandler();
    this.decreaseHandler();
  }

  /**
   *
   * @description Init click handler on increase button
   * @memberof ChangeProductQuantity
   */
  increaseHandler() {
    $(document).on('click', `.${this.sIncreaseBtnSelector}`, ({ currentTarget }) => {
      const input = this.getQuantityInput(currentTarget);
      const { value } = input;
      const iValue = parseInt(value, this.radix);
      const max = input.getAttribute('max');

      if (!max) throw new Error('Max attribute is empty');

      if (iValue < parseInt(max, this.radix)) {
        input.value = iValue + 1;
        input.dispatchEvent(this.constructor.createOnInputEvent());
      }
    });
  }


  /**
   *
   * @description Init click handler on decrease button
   * @memberof ChangeProductQuantity
   */
  decreaseHandler() {
    $(document).on('click', `.${this.sDecreaseBtnSelector}`, ({ currentTarget }) => {
      const input = this.getQuantityInput(currentTarget);

      const { value } = input;
      const iValue = parseInt(value, this.radix);


      if (iValue > 1) {
        input.value = parseInt(iValue, this.radix) - 1;
        input.dispatchEvent(this.constructor.createOnInputEvent());
      }
    });
  }


  /**
   * @param {node} button
   * @returns {node} Input with product quantity
   * @memberof ChangeProductQuantity
   */
  getQuantityInput(button) {
    const inputWrapper = button.closest(`.${this.sQuantitySectionWrapper}`);
    const input = inputWrapper.querySelector(`.${this.sInputSelector}`);

    return input;
  }


  /**
   *
   * @description Return oninput event
   * @static
   * @returns {object}
   * @memberof ChangeProductQuantity
   */
  static createOnInputEvent() {
    const inputEvent = new Event('input', { bubbles: true, cancelable: false });

    return inputEvent;
  }
}
