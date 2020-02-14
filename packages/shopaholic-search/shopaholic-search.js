/**
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group
 */
export default class ShopaholicSearch {
  constructor() {
    this.sDefaultSearchInputClass = '_shopaholic-search-input';
    this.sSearchInput = `.${this.sDefaultSearchInputClass}`;

    this.sComponentMethod = 'onAjax';
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
    $(document).on('input', this.sSearchInput, (obEvent) => {
      let sSearchString = $(obEvent.currentTarget).val();
      this.processSearchString(sSearchString);
    });
  }

  /**
   * Process search string and send ajax request
   * @param {string} sSearchString
   */
  processSearchString(sSearchString) {
    sSearchString = sSearchString.trim();
    if (sSearchString.length < this.iSearchLimit && this.sSearchState.length < this.iSearchLimit) {
      return;
    }

    if (sSearchString.length < this.iSearchLimit) {
      sSearchString = '';
    }

    if (!!this.obTimer) {
      clearTimeout(this.obTimer);
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
  setSearchDelay(iSearchDelay) {
    if (iSearchDelay > 0) {
      this.iSearchDelay = iSearchDelay;
    }

    return this;
  }
}