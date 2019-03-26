# Cart for [Shopaholic](https://octobercms.com/plugin/lovata-shopaholic) package

Package adds helper methods for integration with [Orders for Shopaholic](https://octobercms.com/plugin/lovata-ordersshopaholic)
and [Shopaholic](https://octobercms.com/plugin/lovata-shopaholic) plugins.

Package will allow you to quickly add/update/remove product in cart buttons, change product quantity and etc.

#### installation

```bash
npm install @lovata/shopaholic-cart
```

#### Introduction

This package has 5 classes in it contains.


| Class | Role  |
| --- | --- |
| `shopaholic-card-helper` | Get information about quantity, position and etc of product in cart  |
| `shopaholic-card-add` | Add product to cart  |
| `shopaholic-card-remove` | Remove product from cart  |
| `shopaholic-card-update` | Update cart. Also contain change-quantity handler  |
| `shopaholic-change-product-quantity` | Contain logic for increase/decrease value of quantity input. Also triggering onInput event  |

 One of them must be used: this is `shopaholic-cart-helper` class.
`shopaholic-cart-helper` get some methods which will be use in all other classes.

Besides product card must be have some required fields: input, 'select' or radio buttons collection with offer ID.

#### Example of Initialization

```javascript
    import CartHelper from '@lovata/shopaholic-cart/shopaholic-cart-helper';
    import AddToCart from  '@lovata/shopaholic-cart/shopaholic-cart-add';

    export default new class CartManipulation {
      constructor() {
        // Create CartHelper instance
        this.CartHelper = new CartHelper();

        // Declare object with partials who will bi update
        this.obPartialUpdate = {
          'product/cart/cart-total': '._shopaholic-cart-total-price',
          'product/cart/cart-mini/cart-info-button': '._shopaholic-cart-button-wrapper',
        };

        // Create AddToCart instance. Pass the helper instance as an argument
        this.AddToCart = new AddToCart(this.CartHelper);

        // Init click handler for buy button (or you can call callback function manually)
        this.AddToCart.initClickHandler();

        // Mutate ajax request object with an array of partials
        this.AddToCart.obRequestData.update = this.obPartialUpdate;
      }
    }
```

#### Class description

## Shopaholic helper class

__Options__

| Option | Type |Default |Description |
| --- | --- | --- | --- |
| `sOfferIdAttr` | Input name | offer_id | Storage for offer id |
| `sPositionIdAttr` | Data-attr |data-shopaholic-position-id| Cart item position id storage. At same time it`s selector for wrapper of cart item price. Use it if you need update position price |
| `sPositionCurrentPriceClass` | CSS class |_shopaholic-current-price|Node with current position price|
| `sPositionOldPriceClass` | CSS class |_shopaholic-old-price| Node with current position price|
|`sGetDataHandler`|Name of ajax handler|Cart::onGetData|Handler for getting information about cart|

__Implementation__

```javascript
    import CartHelper from '@lovata/shopaholic-cart/shopaholic-cart-helper';

    export default new class CartManipulation {
      constructor() {
        // Create CartHelper instance
        this.CartHelper = new CartHelper();

        // Change options of you need `NOT RECOMMENDED`
        this.CartHelper.sOfferIdAttr = 'other_attr'

        // Init other shopaholic-cart classes
      }
    }
```

## Shopaholic-cart-add class

__Options__

| Option | Type |Default |Description |
| --- | --- | --- | --- |
|`helper`|instance of cart-helper class|none|Must be define|
| `sWrapperClass`| CSS class | _shopaholic-product-wrapper | Wrapper of cart product card |
| `sButtonClass` |  CSS class|_shopaholic-add-to-cart| Buy-button class |
| `completeCallbackFunc`  | Function |Null|Will be call after 'add-to-cart' ajax|
| `sAddComponentMethod`   | Ajax handler |Cart::onAdd| Add to cart handler|
| `sUpdateComponentMethod`|Ajax handler |Cart::onUpdate|Cart update handler|
| `obAjaxRequestCallback` |Object|{}|Object with ajax settings. |

__Implementation example__

```javascript
    import CartHelper from '@lovata/shopaholic-cart/shopaholic-cart-helper';
    import AddToCart from  '@lovata/shopaholic-cart/shopaholic-cart-add';

    export default new class CartManipulation {
      constructor() {
        // Create CartHelper instance
        this.CartHelper = new CartHelper();

        // Declare object with partials who will bi update
        this.obPartialUpdate = {
          'product/cart/cart-total': '._shopaholic-cart-total-price',
          'product/cart/cart-mini/cart-info-button': '._shopaholic-cart-button-wrapper',
        };

        // Create AddToCart instance. Pass the helper instance as an argument
        this.AddToCart = new AddToCart(this.CartHelper);

        // Init click handler for buy button (or you can call callback function manually)
        this.AddToCart.initClickHandler();

        // Mutate ajax request object with an array of partials
        this.AddToCart.obRequestData.update = this.obPartialUpdate;
      }
    }
```

```html
    <section class="_shopaholic-product-wrapper">
        <input type="hidden" class="filter-size__checkbox" id="size-l" name="offer_id" value="10">
        <button class="_shopaholic-add-to-cart">Add to cart</button>
    </section>
```

## Methods

#### initClickHandler

Add onclick handler on buy-button

#### eventHandlerCallback(obEvent)

Handler for buy-button. `obEvent`  - event object. Add product to cart

#### add(iOfferID, quantity, button)

| Option | Type |Description |
| --- | --- | --- |
| `iOfferID`| int| Offer id |
| `quantity`| int| Offer quantity |
| `button`| DOM node| Buy-button node |

#### obRequestData()

Getter/setter pair. Accepts or gives away ajax settings


## Shopaholic-cart-remove class

__Options__

| Option | Type |Default |Description |
| --- | --- | --- | --- |
|`helper`|instance of cart-helper class|none|Must be define|
| `sWrapperClass`| CSS class | _shopaholic-product-wrapper | Wrapper of cart product card |
| `completeCallbackFunc`  | Function |Null|Will be call after 'add-to-cart' ajax|
| `sRemoveComponentMethod`|Ajax handler |Cart::onRemove|Cart remove handler|
| `obAjaxRequestCallback` |Object|{}|Object with ajax settings. |

__Implementation example__

```javascript
    import CartHelper from '@lovata/shopaholic-cart/shopaholic-cart-helper';
    import RemoveFromCart from  '@lovata/shopaholic-cart/shopaholic-cart-remove';

    export default new class CartManipulation {
      constructor() {
        // Create CartHelper instance
        this.CartHelper = new CartHelper();

        // Declare object with partials who will bi update
        this.obPartialUpdate = {
          'product/cart/cart-total': '._shopaholic-cart-total-price',
          'product/cart/cart-mini/cart-info-button': '._shopaholic-cart-button-wrapper',
        };

        // Create AddToCart instance. Pass the helper instance as an argument
        this.RemoveFromCart = new RemoveFromCart(this.CartHelper);

        // Mutate ajax request object with an array of partials
        this.RemoveFromCart.obRequestData.update = this.obPartialUpdate;
      }

      removeHandler() {
        $(document).on('click', `.${this.removeBtnSelector}`, ({ currentTarget }) => {
          this.RemoveFromCart.remove(currentTarget);
         });
      }
    }
```

```html
    <section class="_shopaholic-product-wrapper">
        <input type="hidden" class="filter-size__checkbox" id="size-l" name="offer_id" value="10">
        <button class="_shopaholic-remove-to-cart">Remove from cart</button>
    </section>
```

## Methods

#### remove(removeBtnNode)

Remove product from cart. 

| Option | Type |Description |
| --- | --- | --- | --- |
|`removeBtnNode`|DOM node|delete node button|

#### obRequestData()

Getter/setter pair. Accepts or gives away ajax settings

## Shopaholic-cart-update class

__Options__

| Option | Type |Default |Description |
| --- | --- | --- | --- |
|`helper`|instance of cart-helper class|none|Must be define|
| `sWrapperClass`| CSS class | _shopaholic-product-wrapper | Wrapper of cart product card |
| `completeCallbackFunc`  | Function |Null|Will be call after 'add-to-cart' ajax|
| `sUpdateComponentMethod`|Ajax handler |Cart::onUpdate|Cart update handler|
| `obAjaxRequestCallback` |Object|{}|Object with ajax settings. |
| `completeCallbackFunc`  | Function |Null|Will be call after 'add-to-cart' ajax|
|`iDelayBeforeRequest`|int|400|Delay before updating request|

__Implementation example__

```javascript
    import CartHelper from '@lovata/shopaholic-cart/shopaholic-cart-helper';
    import UpdateCart from  '@lovata/shopaholic-cart/shopaholic-cart-update';
    import ChangeProductQuantity from '@lovata/shopaholic-cart/shopaholic-change-product-quantity';

    export default new class CartManipulation {
      constructor() {
        // Create CartHelper instance
        this.CartHelper = new CartHelper();

        // Declare object with partials who will bi update
        this.obPartialUpdate = {
          'product/cart/cart-total': '._shopaholic-cart-total-price',
          'product/cart/cart-mini/cart-info-button': '._shopaholic-cart-button-wrapper',
        };

        // Create UpdateCart instance. Pass the helper instance as an argument
        this.UpdateCart = new UpdateCart(this.CartHelper);

        // Mutate ajax request object with an array of partials
        this.UpdateCart.obRequestData.update = this.obPartialUpdate;

        // OnInput hander
        this.updateCart.changeQuantityHandlerInit();

        this.init();
      }

      init() {
          const changeProductQuantity = new ChangeProductQuantity();

          changeProductQuantity.init();
      }
    }
```

```html
    <section class="_shopaholic-product-wrapper">
        <input type="hidden" class="filter-size__checkbox" id="size-l" name="offer_id" value="10">
        <div class="_shopaholic-quantity-wrapper">
            <!-- Section for increase/decrease product quantity in cart -->
            <button type="button" class="_shopaholic-decrease-quantity-button">-</button>
            <input class="_shopaholic-quantity-input" min="1" max="80" name="" value="1" disabled="">
            <button type="button" class="_shopaholic-increase-quantity-button">+</button>
        </div>
    </section>
```

## Methods

#### changeQuantityHandlerInit

Await onInput event on `sQuantityInputClass` and trigger `changeQuantityHandler()`

#### changeQuantityHandler(eventInput)

Update product quantity according `eventInput` value

#### obRequestData()

Getter/setter pair. Accepts or gives away ajax settings

#### update(obData = {})

Ajax request for cart updating. `obData`  - object with `data` request settings 

#### getCurrentQuantity(input)

Return input value

## shopaholic-change-product-quantity class

__Options__

| Option | Type |Default |Description |
| --- | --- | --- | --- |
| `sQuantitySectionWrapper`| CSS class | _shopaholic-quantity-wrapper | Wrapper of change quantity section |
| `sDecreaseBtnSelector`  | CSS class |_shopaholic-decrease-quantity-button|Decrease button|
| `sIncreaseBtnSelector`|CSS class |_shopaholic-increase-quantity-button|Increase button|
| `obAjaxRequestCallback` |CSS class|_shopaholic-quantity-input|Quantity input|

__Implementation example__

```javascript
    import CartHelper from '@lovata/shopaholic-cart/shopaholic-cart-helper';
    import UpdateCart from  '@lovata/shopaholic-cart/shopaholic-cart-update';
    import ChangeProductQuantity from '@lovata/shopaholic-cart/shopaholic-change-product-quantity';

    export default new class CartManipulation {
      constructor() {
        // Create CartHelper instance
        this.CartHelper = new CartHelper();

        // Declare object with partials who will bi update
        this.obPartialUpdate = {
          'product/cart/cart-total': '._shopaholic-cart-total-price',
          'product/cart/cart-mini/cart-info-button': '._shopaholic-cart-button-wrapper',
        };

        // Create UpdateCart instance. Pass the helper instance as an argument
        this.UpdateCart = new UpdateCart(this.CartHelper);

        // Mutate ajax request object with an array of partials
        this.UpdateCart.obRequestData.update = this.obPartialUpdate;

        // OnInput hander
        this.updateCart.changeQuantityHandlerInit();

        this.init();
      }

      init() {
          const changeProductQuantity = new ChangeProductQuantity();

          changeProductQuantity.init();
      }
    }
```

```html
    <section class="_shopaholic-product-wrapper">
        <input type="hidden" class="filter-size__checkbox" id="size-l" name="offer_id" value="10">
        <div class="_shopaholic-quantity-wrapper">
            <!-- Section for increase/decrease product quantity in cart -->
            <button type="button" class="_shopaholic-decrease-quantity-button">-</button>
            <input class="_shopaholic-quantity-input" min="1" max="80" name="" value="1" disabled="">
            <button type="button" class="_shopaholic-increase-quantity-button">+</button>
        </div>
    </section>
```

## Methods

#### init()

Add onclick handler for increase/decrease button
