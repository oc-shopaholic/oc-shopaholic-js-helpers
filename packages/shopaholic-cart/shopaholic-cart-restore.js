import ShopaholicCartPosition from "@lovata/shopaholic-cart/shopaholic-cart-position";
import ShopaholicCart from "@lovata/shopaholic-cart/shopaholic-cart";

/**
 * @author  Uladzimir Ambrazhey, <v.ambrazhey@lovata.com>, LOVATA Group
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group
 */
export default class ShopaholicCartRestore {
  constructor() {
    this.sDefaultButtonClass = '_shopaholic-cart-restore';
    this.sButtonSelector = `.${this.sDefaultButtonClass}`;

    this.obAjaxRequestCallback = null;

    this.sRestoreComponentMethod = 'Cart::onRestore';

    ShopaholicCart.instance();
  }

  /**
  * Init event handlers
  */
  init() {
    $(document).on('click', `${this.sButtonSelector}`, (obEvent) => {
      obEvent.preventDefault();

      const {currentTarget: obButton} = obEvent;
      if (obButton.hasAttribute('disabled')) {
        return;
      }

      this.restore(obButton);
    });
  }

  /**
   * Restore cart position
   * @param {node} obButton
   */

  restore(obButton) {
    if (!obButton) {
      throw new Error('Button node is empty.');
    }

    obButton.setAttribute('disabled', 'disabled');
    const obCartPosition = new ShopaholicCartPosition(obButton);
    const iPositionID = obCartPosition.getPositionID();

    let obRequestData = {
      data: {
        cart: [iPositionID],
      },
      complete: ({responseJSON}) => {
        this.completeCallback(responseJSON, obButton);
      },
    };

    if (this.obAjaxRequestCallback !== null) {
      obRequestData = this.obAjaxRequestCallback(obRequestData, obButton);
    }

    $.request(this.sRestoreComponentMethod, obRequestData);
  }

  /**
   * Restore disabled attribute from button
   * Update cart data in ShopaholicCart object
   */
  completeCallback(obResponse, obButton) {
    const {data: obCartData} = obResponse;

    ShopaholicCart.instance().updateCartData(obCartData);

    if (obButton) {
      obButton.restoreAttribute('disabled');
    }
  }

  /**
   * Set ajax request callback
   *
   * @param {function} obCallback
   * @returns {ShopaholicCartRestore}
   */
  setAjaxRequestCallback(obCallback) {
    this.obAjaxRequestCallback = obCallback;

    return this;
  }

  /**
   * Redeclare default selector of "Restore cart position" button
   * Default value is "._shopaholic-cart-restore"
   *
   * @param {string} sSelector
   * @returns {ShopaholicCartRestore}
   */
  setButtonSelector(sSelector) {
    this.sButtonSelector = sSelector;

    return this;
  }

  /**
   * Redeclare default selector of product wrapper with product ID in attribute
   * Default value is "._shopaholic-product-wrapper"
   *
   * @param {string} sSelector
   * @returns {ShopaholicCartRestore}
   */
  setWrapperSelector(sSelector) {
    this.sWrapperSelector = sSelector;

    return this;
  }
}
