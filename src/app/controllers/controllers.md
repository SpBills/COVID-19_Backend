# Controllers

This file does all middle-ware functions.
Make sure to export all functions so they may be accessed by routes.js.

```js
exports.listAllLines = (req, res) => {
    Line.find({}, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.json(data);
    })
}

exports.createLine = (req, res) => {
    var newLine = new Line(req.body);
    newLine.save((err, data) => {
        if (err) {
            res.send(err);
        }
        res.json(data);
    })
}
```