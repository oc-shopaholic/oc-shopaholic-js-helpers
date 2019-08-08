import createFocusTrap from 'focus-trap';
import Overlay from '@lovata/overlay';

export default new class Modal {
  constructor() {
    this.modalSelector = 'modal';
    this.modalBodySelector = 'modal__body';
    this.modalCloseButtonSelector = '[data-modal-close]';
    this.modalOpenButtonSelector = '[data-modal]';
    this.modalActiveSelector = 'modal_active';
    this.modalVisibleSelector = 'modal_visible';
    this.modalAnimationSpeed = null;

    this.handler();
  }

  handler() {
    document.addEventListener('click', ({ target }) => {
      const modalOpenButton = target.closest(this.modalOpenButtonSelector);

      if (!modalOpenButton) return;

      const modalId = modalOpenButton.dataset.modal;

      this.show(modalId);
    });

    document.addEventListener('click', ({ target }) => {
      const modalCloseButton = target.closest(this.modalCloseButtonSelector);

      if (!modalCloseButton) return;

      this.hide();
    });

    document.addEventListener('click', ({ target }) => {
      if (target.closest(`.${this.modalSelector}`) &&
        !target.closest(`.${this.modalBodySelector}`)) {
        this.hide();
      }
    });

    window.addEventListener('keydown', ({ keyCode }) => {
      if (keyCode === 27 &&
        this.activeModal &&
        document.activeElement.closest(`.${this.modalSelector}`)) {
        this.hide();
      }
    });
  }

  show(id) {
    if (this.activeModal) {
      this.hide({
        hideOverlay: false,
      });
    } else {
      Overlay.show();
    }

    this.activeModal = document.querySelector(`#${id}`);
    this.replaceModalToBodyEnd();
    this.activeModal.classList.add(this.modalActiveSelector);
    if (this.modalAnimationSpeed === null) {
      const activeModalBody = this.activeModal.querySelector(`.${this.modalBodySelector}`);

      this.modalAnimationSpeed = this.constructor.getTransitionDuration(activeModalBody, 'opacity');
    }

    setTimeout(() => {
      this.activeModal.classList.add(this.modalVisibleSelector);
      this.activateFocusTrap();
    });
  }

  hide({ hideOverlay = true } = {}) {
    if (!this.activeModal) return;

    const oldActiveModal = document.querySelector(`.${this.modalSelector}.${this.modalActiveSelector}`);

    this.deactivateFocusTrap();

    if (hideOverlay) {
      Overlay.hide();
      this.activeModal = null;
    }

    oldActiveModal.classList.remove(this.modalVisibleSelector);

    setTimeout(() => {
      oldActiveModal.classList.remove(this.modalActiveSelector);
    }, this.modalAnimationSpeed);
  }

  replaceModalToBodyEnd() {
    if (this.activeModal.parentNode === document.body) return;

    this.activeModal.parentNode.removeChild(this.activeModal);
    document.body.append(this.activeModal);
  }

  activateFocusTrap() {
    if (!this.activeModal) return;

    this.focusTrap = createFocusTrap(this.activeModal);
    this.focusTrap.activate();
  }

  deactivateFocusTrap() {
    if (!this.focusTrap) return;

    this.focusTrap.deactivate();
  }

  static getTransitionDuration(element, propertyName) {
    const computedStyle = getComputedStyle(element);
    const transitions = computedStyle.transition.split(', ');
    const transitionProperties = computedStyle.transitionProperty.split(', ');
    let duration = 0;

    transitionProperties.some((property, index) => {
      if (property === propertyName) {
        duration = +transitions[index].split(' ')[1].slice(0, -1) * 1000;
        return true;
      }
    });

    return duration;
  }
}();
