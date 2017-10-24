var express = require('express');
var app = express();

//your routes here
app.get('/', function (req, res) {
    res.send("Hello World!");
});

app.listen(8080, function () {
  console.log('ReStore listening on port 8080!');
});