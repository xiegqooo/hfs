
module.exports = {
  port:  3000,
  log:{
	  root:'./log', 
	  format : [
		"{{timestamp}} {{message}}", //default format
		{
			error : "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}" // error format
		}
	],
	dateformat : "yyyy-mm-dd HH:MM:ss"
  },
  path:'E:\\workspace\\Xiangxin\\src\\app\\src\\main\\webapp',
  target:'E:\\project\\hfs\\upload\\t',
  server:'http://localhost:8000/receiver',
  mysql: {
	host     : 'localhost',
	user     : 'root',
	port	 : 3306,
	password : '111111'
  }
};