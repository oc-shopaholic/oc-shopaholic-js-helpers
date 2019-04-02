/**
 * @author  Uladzimir Ambrazhey, <v.ambrazhey@lovata.com>, LOVATA Group
 */

export default class ChangeProductQuantity {
  constructor() {
    /* Selectors */
    this.sDecreaseBtnSelector = '_shopaholic-decrease-quantity-button';
    this.sIncreaseBtnSelector = '_shopaholic-increase-quantity-button';
    this.inputSelector = '_shopaholic-quantity-input';
    this.positionSelector = 'data-shopaholic-position-id';

    /* Params */
    this.radix = 10;
    this.dispatchEventType = 'input';
  }

  /* init click handler */
  init() {
    $(document).on('click', `.${this.sIncreaseBtnSelector}`, ({ currentTarget }) => {
      this.increaseHandler(currentTarget);
    });

    $(document).on('click', `.${this.sDecreaseBtnSelector}`, ({ currentTarget }) => {
      this.decreaseHandler(currentTarget);
    });
  }

  /**
   * @description Handler for increase button
   */
  increaseHandler(increaseBtnNode) {
    const currentWrapper = this.getQuantityInput(increaseBtnNode);

    [...currentWrapper].forEach((node) => {
      const input = node.querySelector(`.${this.inputSelector}`);
      const { value } = input;
      const iValue = parseInt(value, this.radix);
      const max = input.getAttribute('max');

      if (!max) throw new Error('Max attribute is empty');

      if (iValue < parseInt(max, this.radix)) {
        input.value = iValue + 1;
        input.dispatchEvent(this.createOnInputEvent());
      }
    });
  }

  /**
   * @description Init click handler on decrease button
   */
  decreaseHandler(decreaseBtnNode) {
    const currentWrapper = this.getQuantityInput(decreaseBtnNode);

    [...currentWrapper].forEach((node) => {
      const input = node.querySelector(`.${this.inputSelector}`);
      const { value } = input;
      const iValue = parseInt(value, this.radix);

      if (iValue > 1) {
        input.value = parseInt(iValue, this.radix) - 1;
        input.dispatchEvent(this.createOnInputEvent());
      }
    });
  }

  /**
   * @returns {node} Input with product quantity
   */
  getQuantityInput(currentTarget) {
    const wrapper = currentTarget.closest(`[${this.positionSelector}]`);
    const id = wrapper.getAttribute(this.positionSelector);
    const currentWrapper = document.querySelectorAll(`[${this.positionSelector}="${id}"]`);

    return currentWrapper;
  }

  /**
   * @description Return custom event
  */
  createOnInputEvent() {
    const inputEvent = new Event(this.dispatchEventType, { bubbles: true, cancelable: false });

    return inputEvent;
  }
}
