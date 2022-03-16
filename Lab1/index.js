var express = require('express');
var app = express();
var query;

app.get('/', function (req, res) {
    var num1 = +req.params.num1;
    var num2 = +req.params.num2;
    var sum = num1 + num2;
    
    res.send(sum.toString());
});
app.listen(3000);

