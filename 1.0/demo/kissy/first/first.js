{
	"package":"first",
	"name":"新手入门",
	"desc":"引入官网一句话简介，KISSY是由阿里集团前端工程师们发起创建的一个开源 JS 框架。它具备模块化、高扩展性、组件齐全，接口一致、自主开发、适合多种应用场景等特性。",
	"tip":"这篇文章将一步一步指引怎么上手kissy，用最简单的demo来解决初期的困惑",
	"version":"如未特殊说明，理论上本教程只适合kissy1.2及其以上版本，在一般情况下，除1.1.6外，其余版本的api基本兼容",
	"demo":[
		{
			"title":"KISSY的引入",
			"desc":"kissy作为一个脚本，也类似其他脚本一样，需要引入到页面中，可以引用cdn的地址，如下demo，也可以下载代码到本地，直接引入",
			"code":"http://jsbin.com/uBuzeni/1/edit?html,js,console"
		},
		{
			"title":"普通代码组织",
			"desc":"kissy和jquery一样，都可以直接通过调用方法来运行，下面的demo展示了最普通的kissy组织方法",
			"tip": "这也是最简单的方式，如果你的代码就几行，甚至都可以放到页面中直接执行",
			"code":"http://jsbin.com/EmEFOQe/1/edit?html,js"
		},
		{
			"title":"使用异步方式",
			"desc":"当需要用到不同的kissy模块时，甚至于是自定义模块时，就需要使用到kissy的use方法",
			"tip": "尽可能避免在代码中间使用use",
			"code":"http://jsbin.com/ekiqanA/1/edit?html,js,console"
		},
		{
			"title":"KISSY标准的模块化组织方式",
			"tip":" 经常有看到最后一个参数为undefined的情况，原因见这里http://www.jb51.net/article/20991.htm",
			"desc":"KISSY 1.2开始使用的是类似于commonJs规范的模块组织方式，这也是目前最流行的方式，gallery组件一般使用的就是这种方式",
			"code":"http://jsbin.com/iveTAGu/2/edit?html,js,console"
		},
		{
			"title":"KISSY 1.2和1.3的略微不同",
			"desc":"KISSY 1.2在add后会立即执行，所以有时候可以只定义add，无需use",
			"code":"http://jsbin.com/IVOQiwU/1/edit?html,js,console"
		},
		{
			"title":"使用dom和event模块",
			"desc":"dom和event模块是最常用的kissy模块，用它们可以进行dom选择和事件绑定",
			"tip":"dom和yui的操作非常相似，选择器仅支持常用的几个。如果需要选择器和jquery一样，需要引入sizzle模块，此外需要jquery的链式调用，可以使用node模块",
			"code":"http://jsbin.com/oFUMOYi/1/edit?html,js,output"
		},
		{
			"title":"多模块编程",
			"desc":"通过add、use、requires就可以完成简单的模块依赖",
			"code":"http://jsbin.com/oNiPAwO/3/edit?html,js,console"
		},
		{
			"title":"",
			"desc":"至此应该基本了解了KISSY的模块编程思路，剩下的就是查询api函数了，现在看官方的入门是不是不那么吃力了呢 => http://docs.kissyui.com/docs/html/tutorials/quickstart/index.html"
		}
	]
}