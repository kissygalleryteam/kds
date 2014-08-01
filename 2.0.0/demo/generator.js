var fs = require('fs'),
	path = require('path'),
	_ = require('underscore');

var data = JSON.parse(fs.readFileSync('./data.js'));
// console.log(data);

_.each(data, function(value, key) {
	_.each(value, function(method) {
		if(!fs.existsSync('./' + key + '/' + method + '.js')) {
			var docLink;
			if(value.length > 1) {
				docLink = 'http://docs.kissyui.com/docs/html/api/core/' + key + '/' + method + '.html';
			} else {
				docLink = 'http://docs.kissyui.com/docs/html/api/core/' + key + '/index.html';
			}


			if(typeof method === 'string') {
				var text = {
					"package":key,
					"name":method,
					"doc":docLink,
					"desc":"",
					"tip":"",
					"demo":[
					]
				};

				if(!fs.existsSync('./' + key)) {
					fs.mkdirSync('./' + key);
				}
				
				fs.writeFileSync('./' + key + '/' + method + '.js', JSON.stringify(text, null, 4));
			} else {
				
			}
		}
		
	});
});
