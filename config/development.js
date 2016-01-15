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
  }
};