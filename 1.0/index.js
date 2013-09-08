/**
 * @fileoverview 
 * @author zhangting<zhangting@taobao.com>
 * @module kds
 **/
KISSY.add(function (S, Node,Base) {
    var EMPTY = '';
    var $ = Node.all;
    /**
     * 
     * @class Kds
     * @constructor
     * @extends Base
     */
    function Kds(comConfig) {
        var self = this;
        //调用父类构造函数
        Kds.superclass.constructor.call(self, comConfig);
    }
    S.extend(Kds, Base, /** @lends Kds.prototype*/{

    }, {ATTRS : /** @lends Kds*/{

    }});
    return Kds;
}, {requires:['node', 'base']});



