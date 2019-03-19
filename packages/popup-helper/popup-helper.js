/**
 * @author  Uladzimir Ambrazhei, v.ambrazhey@lovata.com, LOVATA Group
 */

import createFocusTrap from 'focus-trap';

export default new class popupHelper {
  constructor() {
    this.noScrollSelector = '_noscroll';
    this.overlaySelector = 'overlay';

    this.bodyPaddingProp = '--body-padding';

    this.openModalStateAttr = 'data-modal-open';
    this.pageOffset = '';
  }


  /**
   * 
   * 
   * @param {string} cssClass
   * @description Set custom css class for 'body';
   */

  changeNoScrollSelector(cssClass) {
    this.noScrollSelector = cssClass;
  }

   /**
   * Return scroll position
   */
  saveScrollPosition() {
    this.pageOffset = window.pageYOffset;
    window.scrollTo(null, this.pageOffset);
  }

   /**
   * Save scroll position before modal opening
   */
  setScrollPosition() {
    window.scrollTo(null, this.pageOffset);
  }

  /**
   * 
   * @description Complex method. Depending  @param needScroll toggle class on body, 
   * save or set scroll position and padding to avoid shifting content 
   * @param {boolean}  
   */
  setBodyScrollState(needScroll) {
    const body = document.querySelector('body');

    if (needScroll) {
      body.classList.remove(this.noScrollSelector);

      this.setScrollPosition();
    } else {
      this.saveScrollPosition();
      this.setScrollPosition();
      this.setBodyPadding();
      body.classList.add(this.noScrollSelector);
    }
  }

  /**
   * 
   * 
   * @param {boolena} needTrap if true - enable focus trap
   * @param {node} modal node of modal window
   */
  focusTrapManager(needTrap, modal) {
    if (needTrap) {
      this.focusTrap = createFocusTrap(modal, {
        clickOutsideDeactivates: true,
      });
      this.focusTrap.activate();
    } else {
      this.focusTrap.deactivate();
    }
  }


  /**
   * 
   * 
   * @static
   * @returns scrollBar width
   */
  static getScrollBarWidth() {
    return window.innerWidth - document.body.clientWidth;
  }

  /**
   * @description Set css custom-property equal scrollbar width
   */

  setBodyPadding() {
    const scrollWidth = this.constructor.getScrollBarWidth();
    document.body.style.setProperty(this.bodyPaddingProp, `${scrollWidth}px`);
  }
  
    
  /**
   * @description Return false if overlay was create
   * @return {boolean} 
   */

  checkOverlay() {
    const overlay = this.getOverlay();
    return !!overlay;
  }

  
  /**
   * 
   * @param {boolean} needOverlay 
   * @description if @param needOverlay is true create Node for overlay, else remove it
   */

  overlayController(needOverlay) {
    if (needOverlay) {
      this.createOverlay();
    } else {
      this.removeOverlay();
    }
  }

  /**
   * 
   * 
   * @param {boolean} isInit 
   * @param {node} closeBtnNode 
   * @param {node} modalNode 
   * @description Complex method. Create of remove overlay and if @param isInit is true, so set flags and `click` and `esc button press` handlers
   */

  overlayHandler(isInit, closeBtnNode, modalNode) {
    this.overlayController(isInit);

    if (isInit) {
      modalNode.setAttribute(this.openModalStateAttr, true);
      this.overlayClickHandler(closeBtnNode);
      this.escPressHandler(closeBtnNode, modalNode);
    }
  }

  /**
   * 
   * 
   * @description Create overlay node
   */
  createOverlay() {
    if (this.checkOverlay()) return;

    const div = document.createElement('div');
    const body = document.querySelector('body');
    div.classList.add(this.overlaySelector);

    body.append(div);
  }

  
  /**
   * 
   * 
   * @description Remove overlay node
   */
  removeOverlay() {
    if (!this.checkOverlay()) return;

    $(`.${this.overlaySelector}`).remove();
  }


  /**
   * 
   * 
   * @returns overlay node
   */
  getOverlay() {
    return document.querySelector(`.${this.overlaySelector}`);
  }


  /**
   * 
   * 
   * @param {node} triggerTarget Node for close modal window
   * @description Add 'click' handler to overlay 
   */
  overlayClickHandler(triggerTarget) {
    const overlay = this.getOverlay();

    if (!overlay) return;

    overlay.addEventListener('click', () => {
      triggerTarget.click();
    });
  }

  
  /**
   * 
   * 
   * @param {node} triggerTarget Node for close modal window
   * @param {node} modalNode  Node of modal window
   * @description  Add esc button handler
   */
  escPressHandler(triggerTarget, modalNode) {
    if (!triggerTarget || !modalNode) return;

    document.addEventListener('keydown', ({ which }) => {
      if (!this.checkOverlay()) return;

      if (which === 27 && modalNode.hasAttribute(this.openModalStateAttr)) {
        const overlay = this.getOverlay();
        overlay.click();
      }
    });
  }
}();
