var config = require('../config');

var fs = require('fs');
var formidable = require('formidable');
var dateFormat = require('dateformat');

var path = config.path;
var target = config.target;


var by = function(name){  
    return function(o, p){  
        var a, b;  
        if (typeof o === "object" && typeof p === "object" && o && p) {  
            a = o[name];  
            b = p[name];  
            if (a === b) {  
                return 0;  
            }  
            if (typeof a === typeof b) {  
                return a < b ? -1 : 1;  
            }  
            return typeof a < typeof b ? -1 : 1;  
        }  
        else {  
            throw ("error");  
        }  
    }  
}; 



var self = function(req, res){
		
	var form = new formidable.IncomingForm();

	form.parse(req, function(err, fields, files) {
				
		if(fields.dir){

			// 美化 url 地址
			if(fields.dir == '..'){
				path = path.substring(0,path.lastIndexOf('\\'));
				target = target.substring(0,target.lastIndexOf('/'));
			}else if(fields.dir == '...'){
				path = config.path;
				target = config.target;
			}else{
				path += "\\"+fields.dir;
				target += "/"+fields.dir;
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

					show.push({number:i,'file':file,'size':data.size,'type':type,'mtime':dateFormat(data.mtime,"yyyy-mm-dd hh:MM:ss")});
					i ++ ;
					
					if( i == total){
						res.render("index",{
							"current_dir":path,
							"target_dir":target,
							"root_dir":config.path,
							"data":show.sort(by('size'))
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
