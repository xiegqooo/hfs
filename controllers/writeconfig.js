var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
var dateFormat = require('dateformat');

var writeconfig = function(req, res){
	
	var form = new formidable.IncomingForm();

	form.parse(req, function(err, fields, files) {
		
		var str = '{"'+fields.pname+'":{"plocal":"'+fields.plocal+'","phost":"'+fields.phost+'","ppath":"'+fields.ppath+'"}}';
		

		fs.writeFile("config.json",str,function(err){//会先清空原先的内容
			 if (err) {
				res.json({ success: 'false' });
				return ;
			 }
			 console.log('写入成功');
			 res.json({ success: 'true' });
		})	
	
	});
};


exports.create = writeconfig;
