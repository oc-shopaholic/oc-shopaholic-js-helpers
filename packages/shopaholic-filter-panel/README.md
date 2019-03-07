# Filter panel for [Shopaholic](https://octobercms.com/plugin/lovata-shopaholic) package

Package adds helper methods for integration with [Filter for Shopaholic](https://octobercms.com/plugin/lovata-filtershopaholic)
and [Shopaholic](https://octobercms.com/plugin/lovata-shopaholic) plugins.

Package will allow you to quickly add filter panel in your project.

## installation

```bash
npm install @lovata/shopaholic-filter
```

## shopaholic-filter-price

Class will allow you to quickly filter by price with ajax request in your project.

### Basic usage

```html
<div class="_shopaholic-price-filter">
    <input type="number" name="filter-min-price">
    <input type="number" name="filter-max-price">
</div>
```

```javascript
import ShopaholicProductList from "@lovata/shopaholic-product-list/shopaholic-product-list";
import ShopaholicFilterPrice from "@lovata/shopaholic-product-list/shopaholic-filter-price";

const obListHelper = new ShopaholicProductList();
obListHelper.setAjaxRequestCallback((obRequestData) => {
  obRequestData.update = {'catalog/catalog-ajax': `.catalog_wrapper`};

  return obRequestData;
});

const obFilterPrice = new ShopaholicFilterPrice(obListHelper);
obFilterPrice.setEventType('blur').init();
```

### Methods

#### init()

Method adds event handler on inputs with price filter and send ajax request with using ShopaholicProductList class object.
Method adds "price" param in your search string. For example: http::site.com/catalog?price=10|25

#### setInputSelector()

Redeclare default selector of filter input.
Default value is **"_shopaholic-price-filter"**.

```javascript
const obFilterPrice = new ShopaholicFilterPrice();
obFilterPrice.setInputSelector('price_filter').init();
```

#### setEventType()

Redeclare default event type.
Default value is **"change"**.

```javascript
const obFilterPrice = new ShopaholicFilterPrice();
obFilterPrice.setEventType('blur').init();
```

#### setInputMinPriceName()

Redeclare default input name with min price.
Default value is **"filter-min-price"**.

```javascript
const obFilterPrice = new ShopaholicFilterPrice();
obFilterPrice.setInputMinPriceName('min-price').init();
```

#### setInputMaxPriceName()

Redeclare default input name with max price.
Default value is **"filter-max-price"**.

```javascript
const obFilterPrice = new ShopaholicFilterPrice();
obFilterPrice.setInputMaxPriceName('max-price').init();
```

#### setFieldName()

Redeclare default URL filed name.
Default value is **"price"**.

```javascript
const obFilterPrice = new ShopaholicFilterPrice();
obFilterPrice.setFieldName('price-filter').init();
```

## shopaholic-filter-panel

Class will allow you to quickly filter panel with ajax request in your project.

### Basic usage

```html
<div class="_shopaholic-filter-wrapper" data-filter-type="checkbox" data-property-id="2">
<b>Size</b>
<ul>
    <li>
        <input type="checkbox" value="M">
    </li>
    <li>
        <input type="checkbox" value="L">
    </li>
    <li>
        <input type="checkbox" value="XL">
    </li>
</ul>
</div>
```

```javascript
import ShopaholicProductList from "@lovata/shopaholic-product-list/shopaholic-product-list";
import ShopaholicFilterPanel from "@lovata/shopaholic-filter-panel/shopaholic-filter-panel";

const obListHelper = new ShopaholicProductList();
obListHelper.setAjaxRequestCallback((obRequestData) => {
  obRequestData.update = {'catalog/catalog-ajax': `.catalog_wrapper`};

  return obRequestData;
});

const obFilterPanel = new ShopaholicFilterPanel(obListHelper);
obFilterPanel.init();
```

### Methods

#### init()

Method adds event handler on inputs, selects with filter and send ajax request with using ShopaholicProductList class object.
Method adds "property" param in your search string. For example: http::site.com/catalog?property[2]=M|S|XL&property[5]=blue

#### setWrapperSelector()

Redeclare default selector of filter input.
Default value is **"_shopaholic-filter-wrapper"**.

```javascript
const obFilterPanel = new ShopaholicFilterPanel();
obFilterPanel.setWrapperSelector('price_filter').init();
```

#### setEventType()

Redeclare default event type.
Default value is **"change"**.

```javascript
const obFilterPanel = new ShopaholicFilterPanel();
obFilterPanel.setEventType('blur').init();
```

#### setFieldName()

Redeclare default URL filed name.
Default value is **"property"**.

```javascript
const obFilterPanel = new ShopaholicFilterPanel();
obFilterPanel.setFieldName('filter').init();
```

#### setFilterType()

Redeclare default filter type attribute.
Default value is **"data-filter-type"**.

```javascript
const obFilterPanel = new ShopaholicFilterPanel();
obFilterPanel.setFilterType('data-type').init();
```

#### setPropertyIDAttribute()

Redeclare default attribute with property ID.
Default value is **"data-property-id"**.

```javascript
const obFilterPanel = new ShopaholicFilterPanel();
obFilterPanel.setPropertyIDAttribute('data-id').init();
```

## License

© 2019, [LOVATA Group, LLC](https://github.com/lovata) under [GNU GPL v3](https://opensource.org/licenses/GPL-3.0).

Developed by [Andrey Kharanenka](https://github.com/kharanenka).