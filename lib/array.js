/**
 *  增加 array 操作
 */
module.exports = {

	/**
	 *	排序
		var show = {number:1,'file':读取文件.txt,'size':100,'type':file,'mtime':2015-12-07}
	 * show.sort(arry.by('size'))
	 */
	by:function(name){  
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
	},

	/**
	 *  删除重复数据
	 */
	removal:function (array){
		
		var find = array.join(',')+',',rst = [];
		var json = {};
		
		// 转化成 json
		for(var i = 0 ; i < array.length ; i++){
			var iof = find.indexOf(array[i]+',');
			json[array[i]] = iof;
		}
		// 转化成  array 
		for(var key in  json){
			rst.push(key);
		}

		return rst;
	}

}
