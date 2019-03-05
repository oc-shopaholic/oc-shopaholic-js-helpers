# Wish list for [Shopaholic](https://octobercms.com/plugin/lovata-shopaholic) package

Package adds helper methods for integration with [Wish list for Shopaholic](https://octobercms.com/plugin/lovata-wishlistshopaholic)
and [Shopaholic](https://octobercms.com/plugin/lovata-shopaholic) plugins.

Package will allow you to quickly add "Add to wish list", "Remove from wish list", "Clear wish list" buttons in your project.

## installation

```bash
npm install @lovata/shopaholic-wish-list
```

## **shopaholic-add-wish-list**

Class will allow you to quickly add "Add to wish list" button in your project.

### Basic usage

```html
<div class="product-wrapper _shopaholic-product-wrapper" data-product-id="{{ obProduct.id }}">
    <h2>{{ obProduct.name }}</h2>
    <button type="button" class="_shopaholic-add-wish-list-button" aria-label="Add to wish list">
</div>
```

Simple example:
```javascript
import ShopaholicAddWishList from "@lovata/shopaholic-wish-list/shopaholic-add-wish-list";

ShopaholicAddWishList.init();
````

Advanced example:
```javascript
import ShopaholicAddWishList from "@lovata/shopaholic-wish-list/shopaholic-add-wish-list";

ShopaholicAddWishList
.setButtonSelector('.add-wish-list-button')
.setWrapperSelector('.product-wrapper')
.setAttributeName('data-id')
.setAjaxRequestCallback((obRequestData, obButton) => {
  obRequestData.loading = '.preloader';
  obRequestData.update = {'wish-list/wish-list-info': '.wish-list-info-wrapper'};
  obRequestData.complete = () => {
    obButton.hide();
  };
    
  return obRequestData;
})
.init();
```

### Methods

#### init()

Method adds 'click' event listener on "Add to wish list" button.

#### setAjaxRequestCallback()

You can set callback function. This callback function will be called before sending ajax request.

You can change request object inside callback function. For example: add called partial and selector, add preloader class, etc.

```javascript
import ShopaholicAddWishList from "@lovata/shopaholic-wish-list/shopaholic-add-wish-list";

ShopaholicAddWishList.setAjaxRequestCallback((obRequestData, obButton) => {
  obRequestData.loading = '.preloader';
  obRequestData.update = {'wish-list/wish-list-info': '.wish-list-info-wrapper'}; 
  obRequestData.complete = () => {
    obButton.hide();
  };
  
  return obRequestData;
}).init();
```

#### setButtonSelector()

Redeclare default selector of "Add to wish list" button.
Default value is **"._shopaholic-add-wish-list-button"**.

```javascript
import ShopaholicAddWishList from "@lovata/shopaholic-wish-list/shopaholic-add-wish-list";

ShopaholicAddWishList.setButtonSelector('.add-wish-list-button').init();
```

#### setWrapperSelector()

Redeclare default selector of product wrapper with product ID in attribute.
Default value is **"._shopaholic-product-wrapper"**.

```javascript
import ShopaholicAddWishList from "@lovata/shopaholic-wish-list/shopaholic-add-wish-list";

ShopaholicAddWishList.setWrapperSelector('.product-wrapper').init();
```

#### setAttributeName()

Redeclare default attribute name with product ID.
Default value is **"data-product-id"**.

```javascript
import ShopaholicAddWishList from "@lovata/shopaholic-wish-list/shopaholic-add-wish-list";

ShopaholicAddWishList.setAttributeName('.data-id').init();
```

#### setComponentMethod()

Redeclare default ajax component method.
Default value is **"ProductList::onAddToWishList"**.

```javascript
import ShopaholicAddWishList from "@lovata/shopaholic-wish-list/shopaholic-add-wish-list";

ShopaholicAddWishList.setAttributeName('ProductPage::onAddToWishList').init();
```

## **shopaholic-remove-wish-list**

Class will allow you to quickly add "Remove from wish list" button in your project.

### Basic usage

```html
<div class="product-wrapper _shopaholic-product-wrapper" data-product-id="{{ obProduct.id }}">
    <h2>{{ obProduct.name }}</h2>
    <button type="button" class="_shopaholic-remove-wish-list-button" aria-label="Remove from wish list">
</div>
```

Simple example:
```javascript
import ShopaholicRemoveWishList from "@lovata/shopaholic-wish-list/shopaholic-remove-wish-list";

ShopaholicRemoveWishList.init();
````

Advanced example:
```javascript
import ShopaholicRemoveWishList from "@lovata/shopaholic-wish-list/shopaholic-remove-wish-list";

ShopaholicRemoveWishList
.setButtonSelector('.remove-wish-list-button')
.setWrapperSelector('.product-wrapper')
.setAttributeName('data-id')
.setAjaxRequestCallback((obRequestData, obButton) => {
  obRequestData.loading = '.preloader';
  obRequestData.update = {'wish-list/wish-list-info': '.wish-list-info-wrapper'};
  obRequestData.complete = () => {
    obButton.hide();
  };
    
  return obRequestData;
})
.init();
```

### Methods

#### init()

Method adds 'click' event listener on "Remove from wish list" button.

#### setAjaxRequestCallback()

You can set callback function. This callback function will be called before sending ajax request.

You can change request object inside callback function. For example: add called partial and selector, add preloader class, etc.

```javascript
import ShopaholicRemoveWishList from "@lovata/shopaholic-wish-list/shopaholic-remove-wish-list";

ShopaholicRemoveWishList.setAjaxRequestCallback((obRequestData, obButton) => {
  obRequestData.loading = '.preloader';
  obRequestData.update = {'wish-list/wish-list-info': '.wish-list-info-wrapper'};
  obRequestData.complete = () => {
    obButton.hide();
  }; 
  
  return obRequestData;
}).init();
```

#### setButtonSelector()

Redeclare default selector of "Remove from wish list" button.
Default value is **"._shopaholic-remove-wish-list-button"**.

```javascript
import ShopaholicRemoveWishList from "@lovata/shopaholic-wish-list/shopaholic-remove-wish-list";

ShopaholicRemoveWishList.setButtonSelector('.remove-wish-list-button').init();
```

#### setWrapperSelector()

Redeclare default selector of product wrapper with product ID in attribute.
Default value is **"._shopaholic-product-wrapper"**.

```javascript
import ShopaholicRemoveWishList from "@lovata/shopaholic-wish-list/shopaholic-remove-wish-list";

ShopaholicRemoveWishList.setWrapperSelector('.product-wrapper').init();
```

#### setAttributeName()

Redeclare default attribute name with product ID.
Default value is **"data-product-id"**.

```javascript
import ShopaholicRemoveWishList from "@lovata/shopaholic-wish-list/shopaholic-remove-wish-list";

ShopaholicRemoveWishList.setAttributeName('.data-id').init();
```

#### setComponentMethod()

Redeclare default ajax component method.
Default value is **"ProductList::onRemoveFromWishList"**.

```javascript
import ShopaholicRemoveWishList from "@lovata/shopaholic-wish-list/shopaholic-remove-wish-list";

ShopaholicRemoveWishList.setAttributeName('ProductPage::onRemoveFromWishList').init();
```

## **shopaholic-clear-wish-list**

Class will allow you to quickly add "Clear wish list" button in your project.

### Basic usage

```html
<button type="button" class="_shopaholic-clear-wish-list-button" aria-label="Clear wish list">
```

Simple example:
```javascript
import ShopaholicClearWishList from "@lovata/shopaholic-wish-list/shopaholic-clear-wish-list";

ShopaholicClearWishList.init();
````

Advanced example:
```javascript
import ShopaholicClearWishList from "@lovata/shopaholic-wish-list/shopaholic-clear-wish-list";

ShopaholicClearWishList
.setButtonSelector('.clear-wish-list-button')
.setAjaxRequestCallback((obRequestData, obButton) => {
  obRequestData.loading = '.preloader';
  obRequestData.update = {'wish-list/wish-list-info': '.wish-list-info-wrapper'};
  obRequestData.complete = () => {
    obButton.hide();
  };
    
  return obRequestData;
})
.init();
```

### Methods

#### init()

Method adds 'click' event listener on "Clear wish list" button.

#### setAjaxRequestCallback()

You can set callback function. This callback function will be called before sending ajax request.

You can change request object inside callback function. For example: add called partial and selector, add preloader class, etc.

```javascript
import ShopaholicClearWishList from "@lovata/shopaholic-wish-list/shopaholic-clear-wish-list";

ShopaholicClearWishList.setAjaxRequestCallback((obRequestData, obButton) => {
  obRequestData.loading = '.preloader';
  obRequestData.update = {'wish-list/wish-list-info': '.wish-list-info-wrapper'};
  obRequestData.complete = () => {
    obButton.hide();
  }; 
  
  return obRequestData;
}).init();
```

#### setButtonSelector()

Redeclare default selector of "Clear from wish list" button.
Default value is **"._shopaholic-clear-wish-list-button"**.

```javascript
import ShopaholicClearWishList from "@lovata/shopaholic-wish-list/shopaholic-clear-wish-list";

ShopaholicClearWishList.setButtonSelector('.clear-wish-list-button').init();
```

#### setComponentMethod()

Redeclare default ajax component method.
Default value is **"ProductList::onClearWishList"**.

```javascript
import ShopaholicClearWishList from "@lovata/shopaholic-wish-list/shopaholic-clear-wish-list";

ShopaholicClearWishList.setAttributeName('ProductPage::onClearWishList').init();
```

## License

© 2019, [LOVATA Group, LLC](https://github.com/lovata) under [GNU GPL v3](https://opensource.org/licenses/GPL-3.0).

Developed by [Andrey Kharanenka](https://github.com/kharanenka).