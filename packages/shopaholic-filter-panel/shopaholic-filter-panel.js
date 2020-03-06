import UrlGeneration from "@lovata/url-generation";

/**
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group
 */
export default class ShopaholicFilterPanel {
  /**
   * @param {ShopaholicProductList} obProductListHelper
   */
  constructor(obProductListHelper = null) {
    this.obProductListHelper = obProductListHelper;
    this.sEventType = 'change';
    this.sFiledName = 'property';
    this.sFilterType = 'data-filter-type';
    this.sPropertyIDAttribute = 'data-property-id';

    this.sDefaultWrapperClass = '_shopaholic-filter-wrapper';
    this.sWrapperSelector = `.${this.sDefaultWrapperClass}`;
  }

  /**
   * Init event handlers
   */
  init() {
    $(document).on(this.sEventType, this.sWrapperSelector, () => {
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
    const obFilterList = $(this.sWrapperSelector);
    if (obFilterList.length == 0) {
      return;
    }

    obFilterList.each((iNumber) => {
      //Get filter type
      const obWrapper = $(obFilterList[iNumber]),
        sFilterType = obWrapper.attr(this.sFilterType),
        iPropertyID = obWrapper.attr(this.sPropertyIDAttribute);

      let sFieldName = `${this.sFiledName}`;
      if (!sFilterType) {
        return;
      }

      if (iPropertyID) {
        sFieldName += `[${iPropertyID}]`;
      }

      let obInputList = null,
        arValueList = [];

      if (sFilterType == 'between') {
        obInputList = obWrapper.find('input');
      } else if (sFilterType == 'checkbox' || sFilterType == 'switch') {
        obInputList = obWrapper.find('input[type="checkbox"]:checked');
      } else if (sFilterType == 'select' || sFilterType == 'select_between') {
        obInputList = obWrapper.find('select');
      } else if (sFilterType == 'radio') {
        obInputList = obWrapper.find('input[type="radio"]:checked');
      }

      if (!obInputList || obInputList.length == 0) {
        UrlGeneration.remove(sFieldName);
        return;
      }

      obInputList.each((iInputNumber) => {
        const sValue = $(obInputList[iInputNumber]).val();
        if (!sValue) {
          return;
        }

        arValueList.push(sValue);
      });

      if (!arValueList || arValueList.length == 0) {
        UrlGeneration.remove(sFieldName);
      } else {
        UrlGeneration.set(sFieldName, arValueList);
      }
    });
  }

  /**
   * Redeclare default selector of filter input
   * Default value is "_shopaholic-filter-wrapper"
   *
   * @param {string} sWrapperSelector
   * @returns {ShopaholicFilterPanel}
   */
  setWrapperSelector(sWrapperSelector) {
    if (sWrapperSelector.slice(0, 1) === '.') {
      this.sWrapperSelector = `.${sWrapperSelector}`;
    } else {
      this.sWrapperSelector = sWrapperSelector;
    }

    return this;
  }

  /**
   * Redeclare default event type
   * Default value is "change"
   *
   * @param {string} sEventType
   * @returns {ShopaholicFilterPanel}
   */
  setEventType(sEventType) {
    this.sEventType = sEventType;

    return this;
  }

  /**
   * Redeclare default URL filed name
   * Default value is "property"
   *
   * @param {string} sFieldName
   * @returns {ShopaholicFilterPanel}
   */
  setFieldName(sFieldName) {
    this.sFiledName = sFieldName;

    return this;
  }
}
