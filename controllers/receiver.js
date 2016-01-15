var fs = require('fs');
var formidable = require('formidable');
var request = require('request');	
 
 
module.exports = function (config) {

	var logger = require('tracer').dailyfile(config.log);


	return{
		create: function(req, res) {
			
			var form = new formidable.IncomingForm();

			form.parse(req, function(err, fields, files) {
				
				var server = fields.server;
				
				// 发送信息
				var formData = {
					to:fields.to,
					file:fs.createReadStream(fields.file)
				}
				
				// 上传文件
				request.post({url:server, formData: formData}, function optionalCallback(err, httpResponse, body) {
				  if (err) {
					res.json({ success: 'false' })
				  }
				  if('0' == body){
					 // 记录上传文件 
					logger.log(fields.file);
					res.json({ success: 'true' });
				  }
				});

				
			});
		}	
	}
}
