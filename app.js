var express = require('express');
var app = express();

const PORT=process.env.PORT || 8036;

app.get('/get', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(PORT, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})