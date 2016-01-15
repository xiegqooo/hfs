var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var formidable = require('formidable');
var dateFormat = require('dateformat');
var path = require('path');

var arry = require('../lib/array');


module.exports = function (config) {
	// 获取初始值	
	var ps = [];
	var current_project;
	var i = 0 ;
	for(var p in config.projects){
		ps.push(p);
		if(i == 0){
			current_project  = p;
		}
		i++;
	}
	
	var wrok = '' ,target = '',ischangProject = true;

	var readdir = function(req, res){

		var form = new formidable.IncomingForm();
		var urlParsed = url.parse(req.url);
		var getData = querystring.parse(urlParsed.query);
		
		//  GET 处理 切换项目
		if(getData.project){
			if(current_project == getData.project){
                ischangProject = false;
            }else{
                 ischangProject = true;
            }
            current_project = getData.project;
            
			
		}
		
		form.parse(req, function(err, fields, files) {
			
			//  POST 处理 切换项目
			if(fields.project){
                // 当项目名和传入项目名一置不进行 刷新处理
                if(current_project == fields.project){
                    ischangProject = false;
                }else{
                    ischangProject = true;
                }
                // 当前项目名称
				current_project = fields.project;
			}
			// 获取项目
			if(ischangProject){
				// 设置目录
				wrok = config.projects[current_project].plocal;
				target = config.projects[current_project].ppath;
				// 重置
				ischangProject = false;
			}
			// 目录进入
			if(fields.dir){

				// 美化 url 地址
				wrok = path.join(wrok,fields.dir);
				target = path.join(target,fields.dir).replace(/\\/g,'/');
				// 根目录
				if(fields.dir == '...'){
					wrok = config.projects[current_project].plocal;
					target = config.projects[current_project].ppath;
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
								"projects": ps,
								"current_project":current_project,
								"server_url":config.projects[current_project].phost,
								"root_dir":config.projects[current_project].plocal,
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
	}

	return{
		create:readdir,
		index:readdir,
	}
}