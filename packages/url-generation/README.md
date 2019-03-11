# URL generation package

## installation

```bash
npm install @lovata/url-generation
```

## Basic usage

```javascript
import UrlGeneration from "@lovata/url-generation";

UrlGeneration.init();
UrlGeneration.remove('page');
UrlGeneration.set('sorting', 'popularity|desc');

UrlGeneration.update();
```

## Methods

### set(sFiled, obValue)

Add field value in search string
For example:
```javascript
import UrlGeneration from "@lovata/url-generation";

//URL http:://site.com?page=1
UrlGeneration.init();
UrlGeneration.set('sorting', 'popularity|desc');
UrlGeneration.update();

//URL http:://site.com?page=1&sorting=popularity|desc

UrlGeneration.set('brand', ['apple', 'samsung']);
UrlGeneration.update();
//URL http:://site.com?page=1&sorting=popularity|desc&brand=apple|samsung
```

### remove(sFiled)

Remove field value from search string
For example:
```javascript
import UrlGeneration from "@lovata/url-generation";

//URL http:://site.com?page=1&sorting=popularity|desc&brand=apple|samsung
UrlGeneration.init();
UrlGeneration.set('brand');
UrlGeneration.update();

//URL http:://site.com?page=1&sorting=popularity|desc
```

### clear()

Clear search string.
For example:
```javascript
import UrlGeneration from "@lovata/url-generation";

//URL http:://site.com?page=1&sorting=popularity|desc&brand=apple|samsung
UrlGeneration.init();
UrlGeneration.clear();

//URL http:://site.com
```

## License

© 2019, [LOVATA Group, LLC](https://github.com/lovata) under [GNU GPL v3](https://opensource.org/licenses/GPL-3.0).

Developed by [Andrey Kharanenka](https://github.com/kharanenka).