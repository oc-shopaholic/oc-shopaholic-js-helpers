import CartHelper from './components/shopaholic-cart-helper';
import AddToCart from './components/shopaholic-cart-add';
import RemoveFromCart from './components/shopaholic-cart-remove';
import CartUpdate from './components/shopaholic-cart-update';
import ChangeProductQuantity from './components/change-product-quantity';
import SetShippingType from './components/shopaholic-shipping-type';

export default class ShopaholicCart {
  constructor(obOptions = []) {
    this.obOptions = obOptions;

    this.cartHelper = new CartHelper(this.obOptions);
  }

  getCartHelper() {
    return this.cartHelper;
  }

  initAddToCart() {
    return new AddToCart(this.cartHelper);
  }

  initRemoveFromCart() {
    return new RemoveFromCart(this.cartHelper);
  }

  initUpdateCart() {
    return new CartUpdate(this.cartHelper);
  }

  /* eslint-disable class-methods-use-this */

  initProductQuantityHandler() {
    return new ChangeProductQuantity();
  }

  initShippingTypeHandler() {
    return new SetShippingType();
  }

  /* eslint-enable */
}
