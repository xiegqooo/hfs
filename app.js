var config = require('./config');

var express = require('express');
var Resource = require('express-resource');
var ejs = require('ejs');
var c = require('child_process');
var app = express();

//  设置
app.set("view engine","ejs"); 
app.set('views', __dirname + '/views');
app.use('/static', express.static('public'));

// 模块
app.resource('/', require('./controllers/index'));
app.resource('receiver', require('./controllers/receiver'));
app.resource('log', require('./controllers/readfile'));


// 开启服务
var server = app.listen(config.port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
  c.exec("start http://localhost:"+port)
});


