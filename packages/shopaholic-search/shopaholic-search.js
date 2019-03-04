/**
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group
 */
export default new class ShopaholicSearch {
  constructor() {
    this.sSearchInput = '._shopaholic-search-input';

    this.sComponentMethod = 'ProductList::onAjaxRequest';
    this.obAjaxRequestCallback = null;
    this.sSearchState = '';
    this.sSearchResultState = '';
    this.iSearchDelay = 400;
    this.iSearchLimit = 3;
    this.obTimer = null;
  }

  /**
   * Init event handlers
   */
  init() {
    $(document).on('change', this.sSearchInput, (obCurrentTarget) => {
      let sSearchString = $(obCurrentTarget).val();
      this.processSearchString(sSearchString);
    });
  }

  /**
   * Process search string and send ajax request
   * @param {string} sSearchString
   */
  processSearchString(sSearchString) {
    sSearchString = sSearchString.trim();
    if (sSearchString < this.iSearchLimit) {
      clearTimeout(this.obTimer);
      return;
    }

    this.sSearchState = sSearchString;
    this.obTimer = setTimeout(() => {
      if (sSearchString !== this.sSearchState) {
        return;
      }

      this.sendAjaxRequest(sSearchString);

    }, this.iSearchDelay);
  }

  /**
   * Send ajax request
   * @param {string} sSearchValue
   */
  sendAjaxRequest(sSearchValue) {
    this.sSearchResultState = sSearchValue;
    let obThis = this;

    let obRequestData = {
      'data': {'search': sSearchValue},
      success: function (obResponse) {
        if (sSearchValue !== obThis.sSearchResultState) {
          return;
        }

        this.success(obResponse);
      }
    };

    if (this.obAjaxRequestCallback !== null) {
      obRequestData = this.obAjaxRequestCallback(obRequestData);
    }

    $.request(this.sComponentMethod, obRequestData);
  }

  /**
   * Set ajax request callback
   *
   * @param {function} obCallback
   * @returns {ShopaholicSearch}
   */
  setAjaxRequestCallback(obCallback) {
    this.obAjaxRequestCallback = obCallback;

    return this;
  }

  /**
   * Redeclare default search limit value
   * Default value is 3 symbols
   * Ajax request will be sent only when user enters the number of characters greater than or equal to specified value.
   *
   * @param {int} iSearchLimit
   * @returns {ShopaholicSearch}
   */
  setSearchLimit(iSearchLimit) {
    if (iSearchLimit > 0) {
      this.iSearchLimit = iSearchLimit;
    }

    return this;
  }

  /**
   * Redeclare default search delay value
   * Default value is 400 ms
   * Ajax request will be sent only when user does not press keys during the delay time.
   *
   * @param {int} iSearchDelay
   * @returns {ShopaholicSearch}
   */
  setSerachDelay(iSearchDelay) {
    if (iSearchDelay > 0) {
      this.iSearchDelay = iSearchDelay;
    }

    return this;
  }

  /**
   * Redeclare default selector of search input
   *
   * @param {string} sSearchInput
   * @returns {ShopaholicSearch}
   */
  setSerachInputSelector(sSearchInput) {
    this.sSearchInput = sSearchInput;

    return this;
  }

  /**
   * Redeclare default ajax component method
   * Default value is ProductList::onAjaxRequest
   *
   * @param {string} sComponentMethod
   * @returns {ShopaholicSearch}
   */
  setComponentMethod(sComponentMethod) {
    this.sComponentMethod = sComponentMethod;

    return this;
  }
}