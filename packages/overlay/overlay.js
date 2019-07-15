export default new class Overlay {
  constructor() {
    this.overlayClass = 'overlay';
    this.overlayVisibleClass = 'overlay_visible';
    this.overlayAnimationSpeed = 500;
    this.htmlScrollbarClass = 'has-scrollbar';
    this.htmlNoScrollClass = 'noscroll';
  }

  show() {
    const overlay = document.createElement('div');
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    overlay.classList.add(this.overlayClass);
    document.body.append(overlay);

    if (window.innerWidth > document.documentElement.clientWidth) {
      document.documentElement.classList.add(this.htmlScrollbarClass);
    }

    document.body.style.marginTop = `-${scrollY}px`;
    document.documentElement.classList.add(this.htmlNoScrollClass);

    setTimeout(() => {
      overlay.classList.add(this.overlayVisibleClass);
    }, 10);
  }

  hide({ animationSpeed = this.overlayAnimationSpeed } = {}) {
    const overlay = document.querySelector(`.${this.overlayClass}`);
    const newScrollTop = -document.body.style.marginTop.slice(0, -2);

    overlay.classList.remove(this.overlayVisibleClass);

    setTimeout(() => {
      document.body.removeChild(overlay);
      document.documentElement.classList.remove(this.htmlScrollbarClass);
      document.documentElement.classList.remove(this.htmlNoScrollClass);
      document.body.style.marginTop = '';
      window.scrollTo(null, newScrollTop);
    }, animationSpeed);
  }
}();
