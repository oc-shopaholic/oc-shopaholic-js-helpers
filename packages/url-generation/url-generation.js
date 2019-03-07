/**
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group
 */
export default new class UrlGeneration {
  constructor() {
    this.sBaseURL = `${location.origin}${location.pathname}`;
    this.sSearchString = window.location.search.substring(1);
    this.obParamList = {};

    let arPartList = this.sSearchString.split('&');
    arPartList.forEach((sParam) => {
      let iPosition = sParam.indexOf("=");
      if (iPosition < 0) {
        return;
      }

      let sFiled = sParam.substring(0, iPosition),
        sValue = sParam.substring(iPosition + 1);
      if (!sFiled && !sValue) {
        return;
      }

      this.obParamList[sFiled] = sValue.split('|');
    });
  }

  update() {
    this.generateSearchString();
    history.pushState(null, null, `${this.sBaseURL}?${this.sSearchString}`);
  }

  generateSearchString() {
    let arFieldList = Object.keys(this.obParamList);

    this.sSearchString = '';
    arFieldList.forEach((sField) => {
      if (this.sSearchString.length > 0) {
        this.sSearchString += '&'
      }

      this.sSearchString += `${sField}=${this.obParamList[sField].join('|')}`;
    });
  }

  /**
   * Set field value in URL
   * @param sFiled
   * @param obValue
   */
  set(sFiled, obValue) {
    if (!sFiled || !obValue) {
      return;
    }

    if (typeof obValue == 'string') {
      obValue = [obValue];
    }

    this.obParamList[sFiled] = obValue;
  }

  /**
   * Remove field value from URL
   * @param {string} sFiled
   */
  remove(sFiled) {
    if (!sFiled || !this.obParamList.hasOwnProperty(sFiled)) {
      return;
    }

    delete this.obParamList[sFiled];
  }
}