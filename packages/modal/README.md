# Modal helper package

## Installation

```bash
npm install @lovata/modal
```

## Initialization

```javascript
import Modal from '@lovata/modal';
```

```css
@import '@lovata/modal/css/modal';
```

## HTML layout

```html
<div class="modal" id="{id}">
    <div class="modal__inner">
        <button type="button" class="modal__close-btn" data-modal-close></button>
        
    </div>
</div>
```

Element with attribute `data-modal-close` click will close modal.

Element with attribute `data-modal-open="{id}"` click will open modal with specified id:

```html
<button type="button" data-modal-open="{id}">...</button>
```

## Methods

### showModal(id)

`Open modal window`

| Param | Type |
| --- | --- |
| id | <code>string</code> |

### hideModal({ hideOverlay })

`Close opened modal window`

| Param | Type | Description |
| --- | --- | --- |
| hideOverlay | <code>boolean</code> | Wheter to hide overlay. Default - true |

### setAnimationSpeed(speed)

`Set custom overlay animation speed in ms`

| Param | Type | Description |
| --- | --- | --- |
| speed | <code>number</code> | Default - 500 |

### activateFocusTrap()

`Activate focus trap for active modal`

### deactivateFocusTrap()

`Deactivate focus trap for active modal`