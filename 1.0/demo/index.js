var tpl = juicer([
	'{@each data as it, k}',
		'<div class="demo-text-box prl">',
		    '<h3 class="demo-panel-title">${k}</h3>',
		    '{@each it as it2}',
			'<p><a href="#${k}/${it2}">${it2}</a></p>',
			'{@/each}',
		'</div>',
	'{@/each}'
].join(''));

var methodTpl = juicer([
    '<div class="demo-header">',
        '<div class="crumb">',
            '<a href="#">KISSY Demo Store</a> > <a href="#${data.package}">Lang</a> > <span>${data.name}</span>',
        '</div>',
        '<h1>${data.name} <small>(kissy版本：{@if data.version}${data.version}{@else}通用{@/if})</small>{@if data.doc} <a href="${data.doc}" target="_blank"><img src="flat-ui/images/icons/clipboard@2x.png"></a>{@/if}</h1>',
        '{@if data.desc}<p>${data.desc}</p>{@/if}',
        '{@if data.tip}<div class="alert alert-info">${data.tip}</div>{@/if}',
    '</div>',
    '<div class="demo-content">',
        '<h2>Demos</h2>',
        '{@each data.demo as it}',
        '<div class="demo">',
            '<h4>${it.title} <small>提供者：{@if it.author}${it.author}{@else}匿名{@/if}</small>',
            '{@if it.version}<small class="ks-version">适用kissy版本：${it.version}</small>{@/if}</h4>',
            '{@if it.desc}<p>${it.desc}</p>{@/if}',
            '{@if it.tip}<div class="alert alert-info">${it.tip}</div>{@/if}',
            '{@if /jsbin/.test(it.code)}',
            '<a class="jsbin-embed" href="${it.code}">JS Bin</a>',
            '{@else if /jsfiddle/.test(it.code)}',
            '<iframe width="100%" height="300" src="${it.code}" allowfullscreen="allowfullscreen" frameborder="0"></iframe>',
            '{@else}',
            '<strong>demo地址：</strong><a href="${it.code}" target="_blank">${it.code}</a>',
            '{@/if}',
        '</div>',
        '{@/each}',
    '</div>'
].join(''));

var galleryWhileList = ['kissy-gallery', 'kpm', 'gallery-express', 'gallery-db', 'generator-kissy-gallery','switchable'];

var container = $('#content');

$(function(){

	$(window).on('hashchange', function (ev) {
		render();
	});

	var render = function() {

		var API = 'data.js';

		var getData = function(param, callback) {
			var useAPI = API;

			if(/\//.test(param)) {
				useAPI = param + '.js';
			}

			$.getJSON(useAPI, function(data) {
				data = typeof data == 'string' ? $.parseJSON(data) : data;
				callback(data);
			});
		}

		var getGalleryData = function () {
			var page = 1,
				ret = {gallery:[]};

			return function(callback) {
				if(ret.gallery.length) {
					callback(ret);
				} else {
					$.get('https://api.github.com/orgs/kissygalleryteam/repos', {
						page: page,
						per_page: 100
					}, function(data) {
						if(data.length) {
							if(data[0] && data[0].id === '772281') {
								data.shift();
							}
							
							$.each(data, function(idx, componet) {
								if($.inArray(componet.name, galleryWhileList) == -1) {
									ret.gallery.push(componet.name); 
								}
							});

							callback(ret);
						}
					});
				}
			}
		}();

		return function(){
			hashValue = location.hash ? location.hash.replace(/#/, '') : '';

			if(hashValue) {
				if(hashValue == 'gallery') {
					//加载gallery
					getGalleryData(function(data) {
						container.html(tpl.render({
							data: data
						}));
					});
				} else {
					getData(hashValue, function(data) {
						if(!/\//.test(hashValue)) {
							//需要把其他不需要展现的内容删除
							var t = {};
							t[hashValue] = data[hashValue];

							container.html(tpl.render({
								data: t
							}));

						} else {
							//方法模板的展现
							container.html(methodTpl.render({
								data: data
							}));

							JSBIN.flush();
						}
					});
				}

				//需要选中当前的菜单
				var curMenu = location.hash ? location.hash.replace(/\/.*$/, '') : '';
				$('#menu .active').removeClass('active');

				$('#menu a').each(function(idx, el){
					if($(el).attr('href') == curMenu) {
						$(el).parent().addClass('active');
					}
				});
			} else {
				getData('', function(data){
					container.html(tpl.render({
						data: data
					}));

					//加载gallery
					getGalleryData(function(data) {
						container.append(tpl.render({
							data: data
						}));
					});
				});
			}
		}
	}();

	render();

});