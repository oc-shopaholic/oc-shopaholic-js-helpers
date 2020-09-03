# compare list for [Shopaholic](https://octobercms.com/plugin/lovata-shopaholic) package

Package adds helper methods for integration with [compare list for Shopaholic](https://octobercms.com/plugin/lovata-compareshopaholic)
and [Shopaholic](https://octobercms.com/plugin/lovata-shopaholic) plugins.

Package will allow you to quickly add "Add to compare list", "Remove from compare list", "Clear compare list" buttons in your project.

## installation

```bash
npm install @lovata/shopaholic-compare
```

## **shopaholic-add-compare-list**

Class will allow you to quickly add "Add to compare list" button in your project.

### Basic usage

```html
<div class="_shopaholic-product-wrapper" data-product-id="{{ obProduct.id }}">
    <h2>{{ obProduct.name }}</h2>
    <button type="button" class="_shopaholic-add-compare-list-button" aria-label="Add to compare">
</div>
```

Simple example:
```javascript
import ShopaholicAddCompareList from "@lovata/shopaholic-compare/shopaholic-add-compare-list";

const obHelper = new ShopaholicAddCompareList();
obHelper.init();
````

Advanced example:
```javascript
import ShopaholicAddCompareList from "@lovata/shopaholic-compare/shopaholic-add-compare-list";

const obHelper = new ShopaholicAddCompareList();
obHelper
  .setButtonSelector('.add-compare-list-button')
  .setAjaxRequestCallback((obRequestData, obButton) => {
    obRequestData.loading = '.preloader';
    obRequestData.update = {'compare/compare-list-info': '.compare-list-info-wrapper'};
    obRequestData.complete = () => {
      obButton.hide();
    };
    
    return obRequestData;
  })
  .init();
```

### Methods

#### init()

Method adds 'click' event listener on "Add to compare list" button.

#### setAjaxRequestCallback()

You can set callback function. This callback function will be called before sending ajax request.

You can change request object inside callback function. For example: add called partial and selector, add preloader class, etc.

```javascript
import ShopaholicAddCompareList from "@lovata/shopaholic-compare/shopaholic-add-compare-list";

const obHelper = new ShopaholicAddCompareList();
obHelper.setAjaxRequestCallback((obRequestData, obButton) => {
  obRequestData.loading = '.preloader';
  obRequestData.update = {'compare/compare-list-info': '.compare-list-info-wrapper'}; 
  obRequestData.complete = () => {
    obButton.hide();
  };
  
  return obRequestData;
}).init();
```

#### setButtonSelector()

Redeclare default selector of "Add to compare list" button.
Default value is **"._shopaholic-add-compare-list-button"**.

```javascript
import ShopaholicAddcompareList from "@lovata/shopaholic-compare/shopaholic-add-compare-list";

const obHelper = new ShopaholicAddcompareList();
obHelper.setButtonSelector('.add-compare-list-button').init();
```

## **shopaholic-remove-compare-list**

Class will allow you to quickly add "Remove from compare list" button in your project.

### Basic usage

```html
<div class="_shopaholic-product-wrapper" data-product-id="{{ obProduct.id }}">
    <h2>{{ obProduct.name }}</h2>
    <button type="button" class="_shopaholic-remove-compare-list-button" aria-label="Remove from compare list">
</div>
```

Simple example:
```javascript
import ShopaholicRemoveCompareList from "@lovata/shopaholic-compare/shopaholic-remove-compare-list";

const obHelper = new ShopaholicRemoveCompareList();
obHelper.init();
````

Advanced example:
```javascript
import ShopaholicRemoveCompareList from "@lovata/shopaholic-compare/shopaholic-remove-compare-list";

const obHelper = new ShopaholicRemoveCompareList();
obHelper
  .setButtonSelector('.remove-compare-list-button')
  .setAjaxRequestCallback((obRequestData, obButton) => {
    obRequestData.loading = '.preloader';
    obRequestData.update = {'compare/compare-list-info': '.compare-list-info-wrapper'};
    obRequestData.complete = () => {
      obButton.hide();
    };

    return obRequestData;
  })
  .init();
```

### Methods

#### init()

Method adds 'click' event listener on "Remove from compare list" button.

#### setAjaxRequestCallback()

You can set callback function. This callback function will be called before sending ajax request.

You can change request object inside callback function. For example: add called partial and selector, add preloader class, etc.

```javascript
import ShopaholicRemoveCompareList from "@lovata/shopaholic-compare/shopaholic-remove-compare-list";

const obHelper = new ShopaholicRemoveCompareList();
obHelper.setAjaxRequestCallback((obRequestData, obButton) => {
  obRequestData.loading = '.preloader';
  obRequestData.update = {'compare/compare-list-info': '.compare-list-info-wrapper'};
  obRequestData.complete = () => {
    obButton.hide();
  }; 
  
  return obRequestData;
}).init();
```

#### setButtonSelector()

Redeclare default selector of "Remove from compare list" button.
Default value is **"._shopaholic-remove-compare-list-button"**.

```javascript
import ShopaholicRemoveCompareList from "@lovata/shopaholic-compare/shopaholic-remove-compare-list";

const obHelper = new ShopaholicRemoveCompareList();
obHelper.setButtonSelector('.remove-compare-list-button').init();
```

## **shopaholic-clear-compare-list**

Class will allow you to quickly add "Clear compare list" button in your project.

### Basic usage

```html
<button type="button" class="_shopaholic-clear-compare-list-button" aria-label="Clear compare list">
```

Simple example:
```javascript
import ShopaholicClearCompareList from "@lovata/shopaholic-compare/shopaholic-clear-compare-list";

const obHelper = new ShopaholicClearCompareList();
obHelper.init();
````

Advanced example:
```javascript
import ShopaholicClearCompareList from "@lovata/shopaholic-compare/shopaholic-clear-compare-list";

const obHelper = new ShopaholicClearCompareList();
obHelper
  .setButtonSelector('.clear-compare-list-button')
  .setAjaxRequestCallback((obRequestData, obButton) => {
    obRequestData.loading = '.preloader';
    obRequestData.update = {'compare/compare-list-info': '.compare-list-info-wrapper'};
    obRequestData.complete = () => {
      obButton.hide();
    };
    
    return obRequestData;
  })
  .init();
```

### Methods

#### init()

Method adds 'click' event listener on "Clear compare list" button.

#### setAjaxRequestCallback()

You can set callback function. This callback function will be called before sending ajax request.

You can change request object inside callback function. For example: add called partial and selector, add preloader class, etc.

```javascript
import ShopaholicClearCompareList from "@lovata/shopaholic-compare/shopaholic-clear-compare-list";

const obHelper = new ShopaholicClearCompareList();
obHelper.setAjaxRequestCallback((obRequestData, obButton) => {
  obRequestData.loading = '.preloader';
  obRequestData.update = {'compare/compare-list-info': '.compare-list-info-wrapper'};
  obRequestData.complete = () => {
    obButton.hide();
  }; 
  
  return obRequestData;
}).init();
```

#### setButtonSelector()

Redeclare default selector of "Clear from compare list" button.
Default value is **"._shopaholic-clear-compare-list-button"**.

```javascript
import ShopaholicClearCompareList from "@lovata/shopaholic-compare/shopaholic-clear-compare-list";

const obHelper = new ShopaholicClearCompareList();
obHelper.setButtonSelector('.clear-compare-list-button').init();
```

## License

© 2019, [LOVATA Group, LLC](https://github.com/lovata) under [GNU GPL v3](https://opensource.org/licenses/GPL-3.0).

Developed by [Andrey Kharanenka](https://github.com/kharanenka).