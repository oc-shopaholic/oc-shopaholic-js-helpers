# Product list for [Shopaholic](https://octobercms.com/plugin/lovata-shopaholic) package

Package adds helper methods for integration with [Shopaholic](https://octobercms.com/plugin/lovata-shopaholic) plugin.

Package will allow you to quickly add dynamic product list in your project.

## installation

```bash
npm install @lovata/shopaholic-product-list
```

## shopaholic-pagination

Class will allow you to quickly pagination with ajax request in your project.

### Basic usage

```html
<ul>
    <li class="_shopaholic-pagination" data-page="1">First</li>
    <li class="_shopaholic-pagination" data-page="3">3</li>
    <li class="_shopaholic-pagination" data-page="4">4</li>
    <li class="_shopaholic-pagination" data-page="5">5</li>
    <li class="_shopaholic-pagination" data-page="6">6</li>
    <li class="_shopaholic-pagination" data-page="7">7</li>
    <li class="_shopaholic-pagination" data-page="10">Last</li>
</ul>
```

```javascript
import ShopaholicProductList from "@lovata/shopaholic-product-list/shopaholic-product-list";
import ShopaholicPagination from "@lovata/shopaholic-product-list/shopaholic-pagination";

const obListHelper = new ShopaholicProductList();
obListHelper.setAjaxRequestCallback((obRequestData) => {
  obRequestData.update = {'catalog/catalog-ajax': `.catalog_wrapper`};

  return obRequestData;
});

const obPaginationHelper = new ShopaholicPagination(obListHelper);
obPaginationHelper.init();
```

### Methods

#### init()

Method adds event handler on pagination links and send ajax request with using ShopaholicProductList class object.
Method adds "page" param in your search string. For example: http::site.com/catalog?page=10

#### setButtonSelector()

Redeclare default selector of pagination button.
Default value is **"_shopaholic-pagination"**.

```javascript
const obPaginationHelper = new ShopaholicPagination();
obPaginationHelper.setButtonSelector('pagination_link').init();
```

## shopaholic-sorting

Class will allow you to quickly sorting with ajax request in your project.

### Basic usage

```html
<select class="_shopaholic-sorting">
    <option value="popularity|desc">Popular</option>
    <option value="price|desc">Expensive</option>
    <option value="price|asc">Cheap</option>
</select>
```

```javascript
import ShopaholicProductList from "@lovata/shopaholic-product-list/shopaholic-product-list";
import ShopaholicSorting from "@lovata/shopaholic-product-list/shopaholic-sorting";

const obListHelper = new ShopaholicProductList();
obListHelper.setAjaxRequestCallback((obRequestData) => {
  obRequestData.update = {'catalog/catalog-ajax': `.catalog_wrapper`};

  return obRequestData;
});

const obSortingHelper = new ShopaholicSorting(obListHelper);
obSortingHelper.init();
```

### Methods

#### init()

Method adds event handler on select with sorting variants and send ajax request with using ShopaholicProductList class object.
Method adds "sort" param in your search string. For example: http::site.com/catalog?sort=popularity|desc

## shopaholic-product-list

Class will allow you to quickly add dynamic product list in your project.

### Basic usage

```javascript
import ShopaholicProductList from "@lovata/shopaholic-product-list/shopaholic-product-list";

const obListHelper = new ShopaholicProductList();
obListHelper.setAjaxRequestCallback((obRequestData) => {
  obRequestData.update = {'catalog/catalog-ajax': `.catalog_wrapper`};

  return obRequestData;
});
```

### Methods

#### send(obRequestData = {})

Method sends ajax request and update partial with product list.

#### setAjaxRequestCallback()

You can set callback function. This callback function will be called before sending ajax request.

You can change request object inside callback function. For example: add called partial and selector, add preloader class, etc.

```javascript
import ShopaholicProductList from "@lovata/shopaholic-product-list/shopaholic-product-list";

const obListHelper = new ShopaholicProductList();
obListHelper.setAjaxRequestCallback((obRequestData) => {
  obRequestData.update = {'catalog/catalog-ajax': `.catalog_wrapper`};

  return obRequestData;
});
```

## License

© 2019, [LOVATA Group, LLC](https://github.com/lovata) under [GNU GPL v3](https://opensource.org/licenses/GPL-3.0).

Developed by [Andrey Kharanenka](https://github.com/kharanenka).