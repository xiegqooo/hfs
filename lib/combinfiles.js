var fs = require('fs');

module.exports = {
	
	/**
	 *合并文件 
	 * @param {arry} pathnames
	 * @param {Object} callback
		
		例子
		var array = [
			'E:\\project\\hfs\\log\\log.20151208.log',
			'E:\\project\\hfs\\log\\log.20151207.log'
		]

		combinfiles(array,function(err,data){
			console.log(data.toString('utf8'));
		});
	 */
 
	combinfiles:function (pathnames,callback){
		  var output = [];
		  
		  (function next(i,len){
			if(i<len){
			  fs.readFile(pathnames[i],function (err,data){
				if(err){
				  callback(err)
				}else{
				  output.push(data);
				  next(i+1,len)
				}
			  });
			}else{
			  callback(null,Buffer.concat(output));
			}
		  }(0,pathnames.length));
	}
}
