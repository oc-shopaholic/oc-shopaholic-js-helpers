import createFocusTrap from 'focus-trap';
import Overlay from '@lovata/overlay';

export default new class Modal {
  constructor() {
    this.modalSelector = '.modal';
    this.modalInnerSelector = '.modal__inner';
    this.modalCloseButtonSelector = '[data-modal-close]';
    this.modalOpenButtonSelector = '[data-modal]';
    this.modalActiveClass = 'modal_active';
    this.modalVisibleClass = 'modal_visible';
    this.modalAnimationSpeed = 500;

    this.handler();
  }

  handler() {
    document.addEventListener('click', (event) => {
      const modalOpenButton = event.target.closest(this.modalOpenButtonSelector);

      if (!modalOpenButton) return;

      const modalId = modalOpenButton.dataset.modal;

      this.showModal(modalId);
    });

    document.addEventListener('click', (event) => {
      const modalCloseButton = event.target.closest(this.modalCloseButtonSelector);

      if (!modalCloseButton) return;

      this.hideModal();
    });

    document.addEventListener('click', (event) => {
      if (event.target.closest(this.modalSelector)
        && !event.target.closest(this.modalInnerSelector)) {
        this.hideModal();
      }
    });

    window.addEventListener('keydown', (event) => {
      if (event.keyCode === 27
        && this.activeModal
        && document.activeElement.closest(this.modalSelector)) {
        this.hideModal();
      }
    });
  }

  showModal(id) {
    if (this.activeModal) {
      this.hideModal({
        hideOverlay: false,
      });
    } else {
      Overlay.show();
    }

    this.activeModal = document.querySelector(`#${id}`);
    this.replaceModalToBodyEnd();
    this.activeModal.classList.add(this.modalActiveClass);

    setTimeout(() => {
      this.activeModal.classList.add(this.modalVisibleClass);
      this.activateFocusTrap();
    }, 10);
  }

  hideModal({ hideOverlay = true } = {}) {
    if (!this.activeModal) return;

    const oldActiveModal = document.querySelector(`${this.modalSelector}.${this.modalActiveClass}`);

    this.deactivateFocusTrap();

    if (hideOverlay) {
      Overlay.hide({
        animationSpeed: this.modalAnimationSpeed,
      });
      this.activeModal = null;
    }

    oldActiveModal.classList.remove(this.modalVisibleClass);

    setTimeout(() => {
      oldActiveModal.classList.remove(this.modalActiveClass);
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

  setAnimationSpeed(speed) {
    this.modalAnimationSpeed = speed;
  }
}();
