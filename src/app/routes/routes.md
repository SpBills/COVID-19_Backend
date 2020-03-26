# Routes

All endpoints are to be laid out in this fashion.
```js
var item = require('../contollers/controller');

/**
 * @desc Use of all items.
 */
app.route('/items')
        .get(lines.listAllLines)
        .post(lines.createLine)

/**
 * @desc Allows use of item with ID
 */
app.route('/lines/:lineId')
    .get(lines.listLine)
    .put(lines.updateLine)
    .delete(lines.deleteLine)
```