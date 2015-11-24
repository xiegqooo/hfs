var config = require('../config');

var fs = require('fs');
var formidable = require('formidable');

var path = config.path;
var target = config.target;


var self = function(req, res){
		
	var form = new formidable.IncomingForm();

	form.parse(req, function(err, fields, files) {
				
		if(fields.dir){

			// 美化 url 地址
			if(fields.dir == '..'){
				path = path.substring(0,path.lastIndexOf('\\'));
				target = target.substring(0,target.lastIndexOf('\\'));
			}else{
				path += "\\"+fields.dir;
				target += "\\"+fields.dir;
			}
		}
		
		// s 读取目录
		fs.readdir(path,function(err, data){
	
		var show  = [];
		var total = data.length;
		var i = 0 ;
			// s 遍历
			data.forEach(function(file) {
				// s 读取文件信息
				fs.stat(path+'\\'+file,function(err, data){
					var type = data.isFile()?'file':'dir';
					show.push({number:i,'file':file,'size':data.size,'type':type});
					i ++ ;
					
					if( i == total){
						res.render("index",{
							"current_dir":path,
							"target_dir":target,
							"data":show
						}); 
					}
				});
				// e 读取文件信息
			});
			// e 遍历

		});
		// e 读取目录
		
	});
};


exports.create = self;
exports.index = self;
