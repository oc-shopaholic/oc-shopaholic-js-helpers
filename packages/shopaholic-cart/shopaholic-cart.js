/**
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group
 */
export default new class Cart {
  constructor() {
    this.obCartData = null;
  }

  /**
   * Send ajax request and update cart data object
   */
  updateCartData() {
    $.request('Cart::onGetData', {
      complete: (obResponse) => {
        this.obCartData = obResponse;
      }
    });
  }

  /**
   * Get offer quantity from cart object
   * @param {int} iOfferID
   * @returns {int}
   */
  getOfferQuantity(iOfferID) {

    if (!this.obCartData) {
      return 0
    }

    const obCartPosition = this.findCartPosition(iOfferID, 'Lovata\\Shopaholic\\Models\\Offer');
    if (!obCartPosition) {
      return 0;
    }

    return obCartPosition.quantity;
  }

  /**
   * Find cart position by item ID and type
   * @param {int} iItemID
   * @param {string} sItemType
   * @returns {object}
   */
  findCartPosition(iItemID, sItemType) {
    if (this.obCartData === null) {
      this.updateCartData();
    }

    if (!this.obCartData || !this.obCartData.position) {
      return null;
    }

    const arCartPositionIDList = Object.keys(this.obCartData.position);
    if (arCartPositionIDList.length == 0) {
      return null;
    }

    for (let iKey = 0; iKey < arCartPositionIDList.length; iKey++) {
      const iPositionID = arCartPositionIDList[iKey],
        obCartPosition = this.obCartData.position[iPositionID];
      if (obCartPosition.item_id != iItemID || obCartPosition.item_type != sItemType) {
        continue;
      }

      return obCartPosition;
    }

    return null;
  }
}
