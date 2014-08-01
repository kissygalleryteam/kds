var tpl = juicer([
	'{@each data as it, k}',
		'<div class="demo-text-box prl">',
		    '<h3 class="demo-panel-title">${k}</h3>',
		    '{@each it as it2}',
		    '{@if typeof it2=="string"}',
			'<p><a href="#${k}/${it2}">${it2}</a></p>',
			'{@else}',
			'<p><a href="#${k}/${it2.name}"{@if it2.desc} title="${it2.desc}"{@/if}>{@if it2.alias}${it2.alias}{@else}${it2.name}{@/if}</a>{@if it2.desc}<small title="${it2.desc}">${it2.desc}</small>{@/if}</p>',
			'{@/if}',
			'{@/each}',
		'</div>',
	'{@/each}'
].join(''));

var methodTpl = juicer([
    '<div class="demo-header">',
        '<div class="crumb">',
            '<a href="#">KISSY Demo Store</a> > <a href="#${data.package}">${data.package}</a> > <span>${data.name}</span>',
        '</div>',
        '<h1>${data.name} <small>(kissy版本：{@if data.version}${data.version}{@else}通用{@/if})</small>{@if data.doc} <a href="${data.doc}" target="_blank"><img src="http://gtms03.alicdn.com/tps/i3/T1gRK4Fh0XXXcsSpY4-200-200.png"></a>{@/if}</h1>',
        '{@if data.desc}<p>${data.desc}</p>{@/if}',
        '{@if data.tip}<div class="alert alert-info">${data.tip}</div>{@/if}',
    '</div>',
    '<div class="demo-content">',
        '<h2>Demos</h2>',
        '{@if !data.demo.length}<div class="alert alert-info">当然无可查看的Demo，试试提交一个，做第一个吃螃蟹的人吧：）</div>{@/if}',
        '{@each data.demo as it}',
        '<div class="demo">',
            '<h4>${it.title} {@if it.title}<small>提供者：{@if it.author}${it.author}{@else}匿名{@/if}</small>{@/if}',
            '{@if it.version}<small class="ks-version">适用kissy版本：${it.version}</small>{@/if}</h4>',
            '{@if it.desc}<p>${it.desc}</p>{@/if}',
            '{@if it.tip}<div class="alert alert-info">${it.tip}</div>{@/if}',
            '{@if it.code && /jsbin/.test(it.code)}',
            '<a class="jsbin-embed" href="${it.code}">JS Bin</a>',
            '{@else if it.code && /jsfiddle/.test(it.code)}',
            '<iframe width="2.0.0%" height="300" src="${it.code}" allowfullscreen="allowfullscreen" frameborder="0"></iframe>',
            '{@else if it.code}',
            '<strong>demo地址：</strong><a href="${it.code}" target="_blank">${it.code}</a>',
            '{@else}{@/if}',
        '</div>',
        '{@/each}',
    '</div>'
].join(''));

var kgWhileList = ['kissy-kg', 'kpm', 'kg-express', 'kg-db', 'generator-kissy-kg','switchable'];

var container = $('#content');

$(function(){

	$(window).on('hashchange', function (ev) {
		render();
	});

	var render = function() {

		var API = 'data.js',
			kgAPI = 'https://api.github.com/orgs/kissykgteam/repos',
			loadingEl = $('.loading');

		var getData = function() {
			var page = 1,
				kgReturnValue = {kg:[]};

			var _initGalleryData = function(callback) {

				function _loopGetData() {
					$.get(kgAPI, {
						page: page,
						per_page: 2.0.0
					}, function(data) {
						page++;

						if(data.length) {
							$.each(data, function(idx, componet) {
								if($.inArray(componet.name, kgWhileList) == -1) {
									kgReturnValue.kg.push({
										name: componet.name,
										desc: componet.description
									}); 
								}
							});

							if(data.length < 2.0.0) {
								callback(kgReturnValue);
							} else {
								_loopGetData();
							}
						} else {
							callback(kgReturnValue);
						}
					});
				}

				_loopGetData();
				
			}

			var _isGallery = function(s) {
				return s === 'kg';
			}

			var _getGalleryData = function(params, callback) {
				if(params.length && params.length == 2) {
					//去抓github的kg库
					$.ajax('https://api.github.com/repos/kissykgteam/'+params[1]+'/contents/abc.json', {
						dataType: "jsonp",
						success: function(data) {
							data = $.parseJSON($.base64Decode(data.data.content));

							callback({
								"package":"kg",
								"name":data.name,
								"doc":'http://kg.kissyui.com/'+data.name+'/'+data.version+'/guide/index.html',
								"desc":data.desc,
								"version":">=1.2",
								"demo":[
									{
										"title":"官方demo",
										"code": 'http://kg.kissyui.com/'+data.name+'/'+data.version+'/demo/index.html',
										"author":data.author.name
									}
								]
							});
						},
						error: function() {
							//文件不存在的时候也返回一个内容
							if(params.length == 2) {
								callback({
									"package":params[0],
									"name":params[1],
									"demo":[]
								});
							}
						}
					});
				} else {
					if(kgReturnValue.kg.length) {
						callback(kgReturnValue);
					} else {
						_initGalleryData(callback);
					}
				}
			}

			var _getInnerData = function(params, callback) {
				var api = API;

				if(params.length == 2) {
					api = 'kissy/' + params.join('/') + '.js';
				}

				$.ajax(api, {
					dataType: "json",
					success: function(data) {
						//如果只有一个参数，那么需要过滤其他的
						if(params.length == 1) {
							var t = {};
							t[params[0]] = data[params[0]];
							callback(t);
						} else {
							callback(data);
						}
					},
					error: function() {
						//文件不存在的时候也返回一个内容
						if(params.length == 2) {
							callback({
								"package":params[0],
								"name":params[1],
								"demo":[]
							});
						}
					}
				});

			}

			return function(params, callback) {
				//一级数据
				if(params.length == 1) {
					if(_isGallery(params[0])) {
						_getGalleryData(params, callback);
					} else {
						_getInnerData(params, callback);
					}
				} else if(params.length == 2) {
					if(_isGallery(params[0])) {
						_getGalleryData(params, callback);
					} else {
						_getInnerData(params, callback);
					}
				} else {
					_getInnerData(params, function(data) {
						_getGalleryData(params, function(data2) {
							data['kg'] = data2['kg'];
							callback(data);
						});
					});
				}
			
			}
		}();

		return function(){
			hashValue = location.hash ? location.hash.replace(/#/, '') : '';
			container.html('');
			var params = hashValue ? hashValue.split('/') : [];

			loadingEl.show();

			getData(params, function(data){

				var html = '';

				if(params.length == 2) {
					html = methodTpl.render({
						data: data
					});
				} else {
					html = tpl.render({
						data: data
					});
				}

				container.append(html);
				JSBIN.flush();
				
				if(params.length) {
					//需要选中当前的菜单
					var curMenu = '#' + params[0];
					$('#menu .active').removeClass('active');

					$('#menu a').each(function(idx, el){
						if($(el).attr('href') == curMenu) {
							$(el).parent().addClass('active');
						}
					});
				}

				loadingEl.hide();
				
			});
		}
	}();

	render();

});