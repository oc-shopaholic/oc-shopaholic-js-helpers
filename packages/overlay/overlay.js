export default new class Overlay {
  constructor() {
    this.overlaySelector = 'overlay';
    this.overlayVisibleSelector = 'overlay_visible';
    this.htmlScrollbarSelector = 'has-scrollbar';
    this.htmlNoScrollSelector = 'noscroll';
    this.overlayAnimationSpeed = null;
  }

  show() {
    this.overlay = document.createElement('div');
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    this.overlay.classList.add(this.overlaySelector);
    document.body.append(this.overlay);

    if (window.innerWidth > document.documentElement.clientWidth) {
      document.documentElement.classList.add(this.htmlScrollbarSelector);
    }

    document.body.style.marginTop = `-${scrollY}px`;
    document.documentElement.classList.add(this.htmlNoScrollSelector);

    setTimeout(() => {
      this.overlay.classList.add(this.overlayVisibleSelector);
      if (this.overlayAnimationSpeed === null) {
        this.overlayAnimationSpeed = this.constructor.getTransitionDuration(this.overlay, 'opacity');
      }
    });
  }

  hide() {
    if (!this.overlay) return;

    const newScrollTop = -document.body.style.marginTop.slice(0, -2);

    this.overlay.classList.remove(this.overlayVisibleSelector);

    setTimeout(() => {
      document.body.removeChild(this.overlay);
      document.documentElement.classList.remove(this.htmlScrollbarSelector);
      document.documentElement.classList.remove(this.htmlNoScrollSelector);
      document.body.style.marginTop = '';
      window.scrollTo(null, newScrollTop);
      this.overlay = null;
    }, this.overlayAnimationSpeed);
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
