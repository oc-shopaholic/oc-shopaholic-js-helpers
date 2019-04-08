# Cart for [Shopaholic](https://octobercms.com/plugin/lovata-shopaholic) package

Package adds helper methods for integration with [Orders for Shopaholic](https://octobercms.com/plugin/lovata-ordersshopaholic)
and [Shopaholic](https://octobercms.com/plugin/lovata-shopaholic) plugins.

Package will allow you to quickly add/update/remove product in cart buttons, change product quantity and etc.

#### installation

```bash
npm install @lovata/shopaholic-cart
```

## **shopaholic-cart-add**

Class will allow you to quickly add "Add to cart" button in your project.

### Basic usage

```html
<div class="_shopaholic-product-wrapper" data-product-id="{{ obProduct.id }}">
    <h2>{{ obProduct.name }}</h2>
    {% set obOfferList = obProduct.offer %}
    {% for obOffer in obOfferList %}
        <input type="radio" name="offer_id" value="{{ obOffer.id }}">
    {% endfor %}
    <input type="number" name="{{ quantity }}" value="1">
    <button type="button" class="_shopaholic-cart-add" aria-label="Add to cart">
</div>
```

Simple example:
```javascript
import ShopaholicCartAdd from '@lovata/shopaholic-cart/shopaholic-cart-add';

const obShopaholicCartAdd = new ShopaholicCartAdd();
obShopaholicCartAdd.setAjaxRequestCallback((obRequestData, obButton) => {
  obRequestData.loading = '.preloader';
}).init();
```

### Methods

#### init()

Method adds 'click' event listener on "Add to cart" button.

#### setAjaxRequestCallback()

You can set callback function. This callback function will be called before sending ajax request.

You can change request object inside callback function. For example: add called partial and selector, add preloader class, etc.

## **shopaholic-cart-remove**

Class will allow you to quickly add "Remove from cart" button in your project.

### Basic usage

```html
<div class="_shopaholic-product-wrapper" data-position-id="{{ obCartPosition.id }}">
    <button type="button" class="_shopaholic-cart-remove" aria-label="Remove from cart">
</div>
```

Simple example:
```javascript
import ShopaholicCartRemove from '@lovata/shopaholic-cart/shopaholic-cart-remove';

const obShopaholicCartRemove = new ShopaholicCartRemove();
obShopaholicCartRemove.setAjaxRequestCallback((obRequestData, obButton) => {
  obRequestData.loading = '.preloader';
}).init();
```

### Methods

#### init()

Method adds 'click' event listener on "Remove from cart" button.

#### setAjaxRequestCallback()

You can set callback function. This callback function will be called before sending ajax request.

You can change request object inside callback function. For example: add called partial and selector, add preloader class, etc.

## **shopaholic-cart-restore**

Class will allow you to quickly add "Remove cart position" button in your project.

### Basic usage

```html
<div class="_shopaholic-product-wrapper" data-position-id="{{ obCartPosition.id }}">
    <button type="button" class="_shopaholic-cart-restore" aria-label="Restore cart position">
</div>
```

Simple example:
```javascript
import ShopaholicCartRestore from '@lovata/shopaholic-cart/shopaholic-cart-restore';

const obShopaholicCartRestore = new ShopaholicCartRestore();
obShopaholicCartRestore.setAjaxRequestCallback((obRequestData, obButton) => {
  obRequestData.loading = '.preloader';
}).init();
```

### Methods

#### init()

Method adds 'click' event listener on "Restore cart position" button.

#### setAjaxRequestCallback()

You can set callback function. This callback function will be called before sending ajax request.

You can change request object inside callback function. For example: add called partial and selector, add preloader class, etc.

## **shopaholic-cart-update**

Class will allow you to quickly add "Increase/Decrease" buttons, "quantity" input in your project.

### Basic usage

```html
<div class="_shopaholic-product-wrapper" data-position-id="{{ obCartPosition.id }}">
    <button type="button" class="_shopaholic-cart-increase-quantity" aria-label="Increase quantity">
    <input class="_shopaholic-cart-quantity" type="number" name="quantity" value="{{ obCartPosition }}" max="{{ obCartPosition.offer.quantity }}" min="1">
    <button type="button" class="_shopaholic-cart-decrease-quantity" aria-label="Decrease quantity">
</div>
```

Simple example:
```javascript
import ShopaholicCartUpdate from '@lovata/shopaholic-cart/shopaholic-cart-update';

const obShopaholicCartUpdate = new ShopaholicCartUpdate();
obShopaholicCartUpdate.setAjaxRequestCallback((obRequestData, obInput) => {
  obRequestData.loading = '.preloader';
}).init();
```

### Methods

#### init()

Method adds 'click' event listener on "Increase/Decrease" buttons and "input" event on "quantity" inputinput.

#### setAjaxRequestCallback()

You can set callback function. This callback function will be called before sending ajax request.

You can change request object inside callback function. For example: add called partial and selector, add preloader class, etc.


## **shopaholic-cart-shipping-type**

Class will allow you to quickly add "Choose shipping type" input in your project.

### Basic usage

```html
{% set obShippingTypeList = ShippingTypeList.make().sort().active() %}
{% for obShippingType in obShippingTypeList %}
    <input type="radio" name="shipping_type_id" value="{{ obShippingType.id }}">
{% endfor %}
```

Simple example:
```javascript
import ShopaholicCartShippingType from '@lovata/shopaholic-cart/shopaholic-cart-shipping-type';

const obShopaholicCartShippingType = new ShopaholicCartShippingType();
obShopaholicCartShippingType.setAjaxRequestCallback((obRequestData, obInput) => {
  obRequestData.loading = '.preloader';
}).init();
```

### Methods

#### init()

Method adds 'change' event listener on "Shipping type" input.

#### setAjaxRequestCallback()

You can set callback function. This callback function will be called before sending ajax request.

You can change request object inside callback function. For example: add called partial and selector, add preloader class, etc.


## **shopaholic-order**

Class will allow you to quickly add "Checkout form" in your project.

### Basic usage

```html
<form class="_shopaholic-order-form">
    <input class="_shopaholic-order-field" name="first_name" data-group="user" data-field="name">
    <input class="_shopaholic-order-field" name="last_name" data-group="user">
    <input class="_shopaholic-order-field" name="email" data-group="user">
    
    <input class="_shopaholic-order-field" name="address" data-group="shipping_address" data-field="address1">
    
    <input class="_shopaholic-order-field" name="comment" data-group="order.property">
</form>
```

Simple example:
```javascript
import ShopaholicOrder from '@lovata/shopaholic-cart/shopaholic-order';

const obShopaholicOrder = new ShopaholicOrder();
obShopaholicOrder.setAjaxRequestCallback((obRequestData, obInput) => {
  obRequestData.loading = '.preloader';
});

obShopaholicOrder.create();
```

### Methods

#### create()

Method prepares request object with order data, sends ajax request and create order.

#### setAjaxRequestCallback()

You can set callback function. This callback function will be called before sending ajax request.

You can change request object inside callback function. For example: add called partial and selector, add preloader class, etc.