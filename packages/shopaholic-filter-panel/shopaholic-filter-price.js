import UrlGeneration from "@lovata/url-generation";

/**
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group
 */
export default class ShopaholicFilterPrice {
  /**
   * @param {ShopaholicProductList} obProductListHelper
   */
  constructor(obProductListHelper = null) {
    this.obProductListHelper = obProductListHelper;
    this.sEventType = 'change';
    this.sFiledName = 'price';

    this.sInputMinPriceName = 'filter-min-price';
    this.sInputMaxPriceName = 'filter-max-price';

    this.sDefaultInputClass = '_shopaholic-price-filter';
    this.sInputSelector = `.${this.sDefaultInputClass}`;
  }

  /**
   * Init event handlers
   */
  init() {
    $(document).on(this.sEventType, this.sInputSelector, () => {
      UrlGeneration.init();
      this.prepareRequestData();

      UrlGeneration.remove('page');
      UrlGeneration.update();
      if (!this.obProductListHelper) {
        return;
      }

      this.obProductListHelper.send();
    });
  }

  prepareRequestData() {
    //Get min price from filter input
    const obInputList = $(this.setInputSelector),
      obMinInput = obInputList.find(`[name=${this.sInputMinPriceName}]`),
      obMaxInput = obInputList.find(`[name=${this.sInputMaxPriceName}]`),
      fMinLimit = parseFloat(obMinInput.attr('min')),
      fMaxLimit = parseFloat(obMinInput.attr('max'));

    let fMinPrice = obMinInput.val(),
      fMaxPrice = obMaxInput.val();

    if (fMinPrice > 0 && fMinPrice < fMinLimit) {
      fMinPrice = fMinLimit;
      obMinInput.val(fMinLimit);
    }

    if (fMaxPrice > 0 && fMaxPrice > fMaxLimit) {
      fMaxPrice = fMaxLimit;
      obMaxInput.val(fMaxLimit);
    }

    if (fMinPrice == 0 && fMaxPrice == 0) {
      UrlGeneration.remove(this.sFiledName);
    } else {
      UrlGeneration.set(this.sFiledName, [fMinPrice, fMaxPrice]);
    }
  }

  /**
   * Redeclare default selector of filter input
   * Default value is "_shopaholic-price-filter"
   *
   * @param {string} sInputSelector
   * @returns {ShopaholicFilterPrice}
   */
  setInputSelector(sInputSelector) {
    this.sInputSelector = sInputSelector;

    return this;
  }

  /**
   * Redeclare default event type
   * Default value is "change"
   *
   * @param {string} sEventType
   * @returns {ShopaholicFilterPrice}
   */
  setEventType(sEventType) {
    this.sEventType = sEventType;

    return this;
  }

  /**
   * Redeclare default input name with min price
   * Default value is "filter-min-price"
   *
   * @param {string} sInputName
   * @returns {ShopaholicFilterPrice}
   */
  setInputMinPriceName(sInputName) {
    this.sInputMinPriceName = sInputName;

    return this;
  }

  /**
   * Redeclare default input name with max price
   * Default value is "filter-max-price"
   *
   * @param {string} sInputName
   * @returns {ShopaholicFilterPrice}
   */
  setInputMaxPriceName(sInputName) {
    this.sInputMaxPriceName = sInputName;

    return this;
  }

  /**
   * Redeclare default URL filed name
   * Default value is "price"
   *
   * @param {string} sFieldName
   * @returns {ShopaholicFilterPrice}
   */
  setFieldName(sFieldName) {
    this.sFiledName = sFieldName;

    return this;
  }
}
