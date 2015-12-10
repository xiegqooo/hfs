var config = require('../config');

var fs = require('fs');
var formidable = require('formidable');
var dateFormat = require('dateformat');
var path = require('path');

var wrok = config.path;
var target = config.target;


var arry = require('../lib/array');

 
var self = function(req, res){
		
	var form = new formidable.IncomingForm();

	form.parse(req, function(err, fields, files) {
				
		if(fields.dir){

			// 美化 url 地址
			wrok = path.join(wrok,fields.dir);
			target = path.join(target,fields.dir).replace(/\\/g,'/');
			
			if(fields.dir == '...'){
				wrok = config.path;
				target = config.target;
			}
			
		}
		
		// s 读取目录
		fs.readdir(wrok,function(err, data){
	
		var show  = [];
		var total = data.length;
		var i = 0 ;
			// s 遍历
			data.forEach(function(file) {
				// s 读取文件信息
				fs.stat(wrok+'\\'+file,function(err, data){
					var type = data.isFile()?'file':'dir';

					show.push({number:i,'file':file,'size':data.size,'type':type,'mtime':dateFormat(data.mtime,"yyyy-mm-dd hh:MM:ss")});
					i ++ ;
					
					if( i == total){
						res.render("index",{
							"current_dir":wrok,
							"target_dir":target,
							"root_dir":config.path,
							"data":show.sort(arry.by('size'))
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
