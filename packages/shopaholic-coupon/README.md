# Coupon for [Shopaholic](https://octobercms.com/plugin/lovata-shopaholic) package

Package adds helper methods for integration with [Coupons for Shopaholic](https://octobercms.com/plugin/lovata-couponsshopaholic)
and [Shopaholic](https://octobercms.com/plugin/lovata-shopaholic) plugins.

Package will allow you to quickly "apply coupon" button to checkout page.

#### installation

```bash
npm install @lovata/shopaholic-coupon
```

## Basic usage

```html
<input type="text" name="coupon" data-coupon="" value="">

<button class="_shopaholic-coupon-add">Apply coupon</button>
<button class="_shopaholic-coupon-remove">Remove coupon</button>
```

Simple example:
```javascript
import ShopaholicCouponAdd from "@lovata/shopaholic-coupon/shopaholic-coupon-add";
import ShopaholicCouponRemove from "@lovata/shopaholic-coupon/shopaholic-coupon-remove";

const obShopaholicCouponAdd = new ShopaholicCouponAdd();
const obShopaholicCouponRemove = new ShopaholicCouponRemove();

obShopaholicCouponAdd.init();
obShopaholicCouponRemove.init();
```

Advanced example:
```javascript
import ShopaholicCouponAdd from "@lovata/shopaholic-coupon/shopaholic-coupon-add";
import ShopaholicCouponRemove from "@lovata/shopaholic-coupon/shopaholic-coupon-remove";

const obShopaholicCouponAdd = new ShopaholicCouponAdd();
const obShopaholicCouponRemove = new ShopaholicCouponRemove();


obShopaholicCouponAdd
.setAjaxRequestCallback(function(obRequestData, obInput, obButton) {
  obRequestData.loading = '.preloader';
  
  return obRequestData;
})
.init();
obShopaholicCouponRemove
.setAjaxRequestCallback(function(obRequestData, obInput, obButton) {
  obRequestData.loading = '.preloader';
  
  return obRequestData;
})
.init();
```

## Methods

### init()

Method adds **'click'** event listener on buttons with classes **"_shopaholic-coupon-add", "_shopaholic-coupon-remove"**.

### setAjaxRequestCallback()

You can set callback function. This callback function will be called before sending ajax request.

You can change request object inside callback function. For example: add called partial and selector, add preloader class, etc.
