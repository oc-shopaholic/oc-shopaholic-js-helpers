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
    <div class="modal__body">
        <button type="button" data-modal-close></button>
        
    </div>
</div>
```

Element with attribute `data-modal-close` click will close modal.

Element with attribute `data-modal-open="{id}"` click will open modal with specified id:

```html
<button type="button" data-modal-open="{id}">...</button>
```

## CSS settings

Helper accepts some css custom properties

| Property | Default value |
| --- | --- |
| --modal__body--transition-timing-function | ease |
| --modal__body--transition-duration | 0.5s |

## Methods

### show(id)

`Open modal window`

| Param | Type |
| --- | --- |
| id | <code>string</code> |

### hide({ hideOverlay })

`Close opened modal window`

| Param | Type | Description |
| --- | --- | --- |
| hideOverlay | <code>boolean</code> | Wheter to hide overlay. Default - true |

### activateFocusTrap()

`Activate focus trap for active modal`

### deactivateFocusTrap()

`Deactivate focus trap for active modal`