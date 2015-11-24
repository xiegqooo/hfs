var config = require('./config');

var express = require('express');
var Resource = require('express-resource');
var ejs = require('ejs');
var app = express();

app.set("view engine","ejs"); 
app.set('views', __dirname + '/views');
app.use('/static', express.static('public'));


//"current_dir":"E:\\project\\hfs\\local",
//"target_dir":"/usr/local/p2p_zhnx/appserver/app/webapps/ROOT",

app.resource('/', require('./controllers/index'), { load: '111' });
app.resource('receiver', require('./controllers/receiver'));


// 开启服务
var server = app.listen(config.port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


