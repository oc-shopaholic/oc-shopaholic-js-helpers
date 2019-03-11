import UrlGeneration from "@lovata/url-generation";

/**
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group
 */
export default class ShopaholicSorting {
  /**
   * @param {ShopaholicProductList} obProductListHelper
   */
  constructor(obProductListHelper = null) {
    this.obProductListHelper = obProductListHelper;
    this.sEventType = 'change';
    this.sFiledName = 'sort';

    this.sDefaultSelectClass = '_shopaholic-sorting';
    this.sSelectSelector = `.${this.sDefaultSelectClass}`;
  }

  /**
   * Init event handlers
   */
  init() {
    $(document).on(this.sEventType, this.sSelectSelector, (obEvent) => {
      const obSelect = $(obEvent.currentTarget),
        sSorting = obSelect.val();

      UrlGeneration.init();
      UrlGeneration.set(this.sFiledName, [sSorting]);
      UrlGeneration.update();
      if (!this.obProductListHelper) {
        return;
      }

      this.obProductListHelper.send();
    });
  }

  /**
   * Redeclare default selector of sorting select
   * Default value is "_shopaholic-sorting"
   *
   * @param {string} sSelectSelector
   * @returns {ShopaholicSorting}
   */
  setSelectSelector(sSelectSelector) {
    this.sSelectSelector = sSelectSelector;

    return this;
  }
}