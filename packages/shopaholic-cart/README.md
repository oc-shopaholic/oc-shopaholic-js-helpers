# Cart for [Shopaholic](https://octobercms.com/plugin/lovata-shopaholic) package

Package adds helper methods for integration with [Orders for Shopaholic](https://octobercms.com/plugin/lovata-ordersshopaholic)
and [Shopaholic](https://octobercms.com/plugin/lovata-shopaholic) plugins.

Package will allow you to quickly add cart, checkout page in your project.

## installation

```bash
npm install @lovata/shopaholic-cart
```

## **Shopaholic-cart-manipulation**

Class will allow you to quickly add "Add to cart", "Remove from cart"  button in your project.

### Basic usage

You should use this css class for correct package work or change it after class initialization

| Selector | Type |Key |Description |
| --- | --- | --- | --- |
| `_shopaholic-add-to-cart` | CSS class | sButtonClass |Class for buy button |
| `_shopaholic-product-wrapper` | CSS class |sWrapperClass| Product card wrapper |
| `_shopaholic-quantity-input` | CSS class |sQuantityInputClass|Input with product quantity. Default quantity = 1 |
| `_shopaholic-cart-total-price` | CSS class |sTotalPriceWrapperClass| Wrapper for partial with total price |
| `offer_id` | Input name |sOfferIdAttr| `Input` name using as ID for search `offer id` |

Also you should set correct path to total price partial or use default: 
`product/cart/cart-mini/cart-mini-price/cart-mini-price`. For rewrite you can use `.sDefaultTotalPricePartial` key

## Add to cart from page

```html
<section class="_shopaholic-product-wrapper">
    <div class="product-size">
        <input type="hidden" name="offer_id" value="{{ obOffer.id }}" checked>
    </div>
    <button class="_shopaholic-add-to-cart">
        Add To Cart
    </button>
</section>
```

```javascript
import ShopaholicCartManipulation from "@lovata/shopaholic-cart/shopaholic-cart-manipulation";

const CartManipulation = new ShopaholicAddWishList();
CartManipulation.init();
```

### Methods

## init()
Init click handler

## add(iOfferID, quantity, button, forceAdd)
Add product to cart

| Param | Type | Description |
| --- | --- | --- |
| iOfferID | <code>int</code> | Offer ID |
| quantity | <code>int</code> | Product quantity |
| button | <code>node</code> | Add to cart button |
| forceAdd | <code>boolean</code> | Sets the forced method `this.sAddComponentMethod` |

##remove(removeBtnNode)

| Param | Type | Description |
| --- | --- | --- |
| removeBtnNode | <code>Node</code> | Remove product from cart | 

## getOfferId(obProduct) ⇒ <code>int</code>
Get offer ID from attribute

| Param | Type | Description |
| --- | --- | --- |
| obProduct | <code>int</code> | Return Offer ID from product card | 


## getIdFromRadioCollection(collection) ⇒ <code>node</code>
Get checked radio button

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>DOM nodes collection</code> | Return input with product `offer_id` | 


## getOfferIdInputType(iProductIdNodeCollection) ⇒ <code>boolean</code>
Detect type of input with offer id

| Param | Type | Description |
| --- | --- | --- |
| iProductIdNodeCollection | <code>DOM nodes collection</code> | Return true if input with offer_id is `radio button` |

## get/set obRequestData()  ⇒ <code>object</code>
Getter/setter pair for ajax object
You should use it if you want to change ajax logic

## changeQuantityHandler(input)

| Param | Type | Description |
| --- | --- | --- |
| iProductIdNodeCollection | <code>Node</code> | Handler for change product quantity in cart |

## **Shopaholic-cart-info**

Helper class will allow you to methods for work with response object and update `cart mini button` and `position price`.

### Basic usage

You should use this css class for correct package work or change it after class initialization

| Selector | Type |Key |Description |
| --- | --- | --- | --- |
| `_shopaholic-cart-button-wrapper` | CSS class |sCartMiniWrapperClass| Class of button for open mini-cart |
|`_shopaholic-current-price`| CSS class |sPositionCurrentPriceClass| Class of node with current offer price |
|`_shopaholic-old-price`| CSS class |sPositionOldPriceClass| Class of node with old offer price |
| `data-shopaholic-position-id` | Data attribute |positionIdAttr| Contain position id |

Also you should set correct path to cart-mini button partial or use default: 
`this.sDefaultCartMiniPath = 'product/cart/cart-mini/cart-info/cart-info-button`. For rewrite it you can to use `sDefaultCartMiniPath` key


```html
<section class="_shopaholic-product-wrapper">
    <div class="product-size">
        <input type="hidden" name="offer_id" value="{{ obOffer.id }}" checked>
    </div>
    <div class="cart-product__price" data-shopaholic-position-id="{{ obPosition.id }}">
        <span class="cart-product__price-currency">$</span>
        <span class="cart-product__price-value _shopaholic-current-price">89.40</span>  
        <span class="cart-product__price-value _shopaholic-old-price">189.40</span>      
    </div>
</section>
```

### Methods

## updateCartData(button) 
Send ajax request and update cart data object. Also update offer price;

## getOfferQuantity(iOfferID) ⇒ <code>int</code>
Get offer quantity from cart object


| Param | Type |
| --- | --- |
| iOfferID | <code>int</code> | 


## findCartPosition(iItemID, sItemType) ⇒ <code>object</code>
Find cart position by item ID and type

| Param | Type |
| --- | --- |
| iItemID | <code>int</code> | 
| sItemType | <code>string</code> |

## **Shopaholic-change-product-quantity**

Helper class will allow you to methods to increase/decrease  input`s value

### Basic usage

You should use this css class for correct package work

| Selector | Type |Key |Description |
| --- | --- | --- | --- |
| `_shopaholic-quantity-wrapper` | CSS class |sQuantitySectionWrapper| Wrapper of change-quantity partial |
|`_shopaholic-decrease-quantity-button`| CSS class | sDecreaseBtnSelector | Decrease button |
|`_shopaholic-increase-quantity-button`| CSS class | sIncreaseBtnSelector| Increase button |
| `_shopaholic-quantity-input` | CSS Class | sInputSelector| Quantity input |

```html
<div class="cart-product__quantity _shopaholic-quantity-wrapper">
    <button type="button" class="_shopaholic-decrease-quantity-button" aria-label="Decrease quantity">-</button>
    <label for="input">Select quantity</label>
    <input class="_shopaholic-quantity-input" id="input" type="text" min="1" max="92" value="1" disabled="">
    <button type="button" class="_shopaholic-increase-quantity-button" aria-label="Increase quantity">+</button>
</div>
```

```javascript
  
  import ChangeProductQuantity from '@lovata/shopaholic-cart/shopaholic-change-product-quantity';
    const changeProductQuantity = new ChangeProductQuantity();

    changeProductQuantity.init();
```
