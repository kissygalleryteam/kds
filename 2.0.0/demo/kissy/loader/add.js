{
    "package": "loader",
    "name": "add",
    "doc": "http://docs.kissyui.com/docs/html/api/seed/loader/add.html",
    "desc": "添加一个kissy模块",
    "tip": "和use搭配使用，在kissy 1.2时add后会自动执行，而1.3时由于懒加载原则需要在use时才执行了",
    "demo":[
    	{
			"title":"add的基本使用",
			"tip":"经常有看到最后一个参数为undefined的情况，原因见这里http://www.jb51.net/article/20991.htm",
			"desc":"KISSY 1.2开始使用的是类似于commonJs规范的模块组织方式",
			"code":"http://jsbin.com/iveTAGu/2/edit?html,js,console"
		},
    	{
			"title":"KISSY 1.2和1.3的略微不同",
			"desc":"KISSY 1.2在add后会立即执行，所以有时候可以只定义add，无需use",
			"code":"http://jsbin.com/IVOQiwU/1/edit?html,js,console"
		},
		{
			"title":"多模块编程",
			"desc":"通过add、use、requires就可以完成简单的模块依赖",
			"code":"http://jsbin.com/oNiPAwO/3/edit?html,js,console"
		}
    ]
}