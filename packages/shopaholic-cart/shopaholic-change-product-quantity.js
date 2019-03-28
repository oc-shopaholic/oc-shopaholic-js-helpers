/**
 * @author  Uladzimir Ambrazhey, <v.ambrazhey@lovata.com>, LOVATA Group
 */

export default class ChangeProductQuantity {
  constructor() {
    this.sQuantitySectionWrapper = '_shopaholic-quantity-wrapper';
    this.sDecreaseBtnSelector = '_shopaholic-decrease-quantity-button';
    this.sIncreaseBtnSelector = '_shopaholic-increase-quantity-button';
    this.inputSelector = '_shopaholic-quantity-input';

    this.radix = 10;
  }

  init() {
    this.increaseHandler();
    this.decreaseHandler();
  }

  /**
   * @description Init click handler on increase button
   * @memberof ChangeProductQuantity
   */
  increaseHandler() {
    $(document).on('click', `.${this.sIncreaseBtnSelector}`, () => {
      const inputList = this.getQuantityInput();

      [...inputList].forEach((input) => {
        const { value } = input;
        const iValue = parseInt(value, this.radix);
        const max = input.getAttribute('max');

        if (!max) throw new Error('Max attribute is empty');

        if (iValue < parseInt(max, this.radix)) {
          input.value = iValue + 1; // eslint-disable-line no-param-reassign
          input.dispatchEvent(this.constructor.createOnInputEvent());
        }
      });
    });
  }

  /**
   * @description Init click handler on decrease button
   * @memberof ChangeProductQuantity
   */
  decreaseHandler() {
    $(document).on('click', `.${this.sDecreaseBtnSelector}`, () => {
      const inputList = this.getQuantityInput();

      [...inputList].forEach((input) => {
        const { value } = input;
        const iValue = parseInt(value, this.radix);

        if (iValue > 1) {
          input.value = parseInt(iValue, this.radix) - 1; // eslint-disable-line no-param-reassign
          input.dispatchEvent(this.constructor.createOnInputEvent());
        }
      });
    });
  }

  /**
   * @returns {node} Input with product quantity
   * @memberof ChangeProductQuantity
   */
  getQuantityInput() {
    const input = document.querySelectorAll(`.${this.inputSelector}`);

    return input;
  }

  /**
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
