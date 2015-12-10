var config = require('../config');

var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
var dateFormat = require('dateformat');

var work = config.path;
var target = config.target;


var arry = require('../lib/array');
var fileconcat = require('../lib/combinfiles');

 
var self = function(req, res){
		
	
		work = path.join(__dirname, '/../', config.log.root);

		// s 读取目录
		fs.readdir(work,function(err, data){
				
		var show  = [];
		var total = data.length;
		var i = 0 ;

			// s 遍历
			data.forEach(function(file) {
				// s 读取文件信息
				fs.stat(work+'\\'+file,function(err, data){
					var type = data.isFile()?'file':'dir';

					show.push({number:i,'file':file,'size':data.size,'type':type,'mtime':dateFormat(data.mtime,"yyyy-mm-dd hh:MM:ss")});
					i ++ ;
					
					if( i == total){
						res.render("readfile",{
							"current_dir":work,
							"target_dir":target,
							"root_dir":config.path,
							"data":show.sort(arry.by('mtime'))
						}); 
					}
				});
				// e 读取文件信息
			});
			// e 遍历
		
		});
		// e 读取目录
		
};




// 读取文件
var readfile = function(req, res){
	
	var form = new formidable.IncomingForm();

	form.parse(req, function(err, fields, files) {
	
			
			if(!fields.files){
				res.send('操作错误!<a href="/log">重新操作</a>');
				return ;
			}
			
			// 处理值
			var str  = fields.files
			var handle = str.substring(0,str.lastIndexOf(','));

	
			// 读取多个文件
			fileconcat.combinfiles(handle.split(','),function(err,data){
				// 转化 utf8 数据
				data = data.toString('utf8');
				//转化为行
				var so = data.replace(/\n/ig,",");
				// 转化为数组
				var ary = so.split(',');
				var temp = [];
				var rst = [];
				// s 便利行
				ary.forEach(function(line){
					var items = line.split(' ');
					if(items[2]){
						temp.push(items[2]);
					}
				});
				// e 便利行
				//  删除重复数据
				rst = arry.removal(temp);
				// 显示数据
				res.render("showlog",{
								"current_dir":work,
								"target_dir":target,
								"root_dir":config.path,
								"data":rst
							}); 
			});
	});
	
};


exports.create = readfile;
exports.index = self;
