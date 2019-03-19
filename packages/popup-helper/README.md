# Popup helper package

## installation

```bash
npm install @lovata/popup-helper
```

## Basic usage

```javascript
import PopupHelper from "@lovata/popup-helper";

```

## Methods

### saveScrollPosition()
`Return scroll position`

 
### setScrollPosition()
`Save scroll position before modal opening`

 
### setBodyScrollState(needScroll)
__Complex method__. `Depending  @param needScroll toggle class on body, 
save or set scroll position and padding to avoid shifting content`


| Param | Type |
| --- | --- |
| needScroll | <code>boolean</code> | 

### focusTrapManager(needTrap, modal)
 
| Param | Type | Description |
| --- | --- | --- |
| needTrap | <code>boolena</code> | if true - enable focus trap |
| modal | <code>node</code> | node of modal window |

### getScrollBarWidth()
 
**Returns**: `scrollBar width (type: int)`

### setBodyPadding()
`Set css custom-property equal scrollbar width`
 

### checkOverlay() <code>boolean</code>
`Return false if overlay was create`

 
### overlayController(needOverlay)
`Ff @param needOverlay is true create Node for overlay, else remove it`

 
| Param | Type |
| --- | --- |
| needOverlay | <code>boolean</code> | 

### overlayHandler(isInit, closeBtnNode, modalNode)
__Complex method__. ``Create of remove overlay and if **@param isInit** is true, so set flags and **click** and **esc button press** handlers``

 

| Param | Type |
| --- | --- |
| isInit | <code>boolean</code> | 
| closeBtnNode | <code>node</code> | 
| modalNode | <code>node</code> | 

### createOverlay()
`Create overlay node`

 
### removeOverlay()
`Remove overlay node`

 
### getOverlay()
 
**Returns**: `overlay node`

### overlayClickHandler(triggerTarget)
`Add 'click' handler to overlay`

| Param | Type | Description |
| --- | --- | --- |
| triggerTarget | <code>node</code> | Node for close modal window |

### escPressHandler(triggerTarget, modalNode)
`Add esc button press handler`

| Param | Type | Description |
| --- | --- | --- |
| triggerTarget | <code>node</code> | Node for close modal window |
| modalNode | <code>node</code> | Node of modal window |

## License

© 2019, [LOVATA Group, LLC](https://github.com/lovata) under [GNU GPL v3](https://opensource.org/licenses/GPL-3.0).

Developed by [Uladzimir Ambrazhei](https://github.com/ambrazhei).