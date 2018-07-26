/**
 *
 * 匿名函数 操作 外部变量
 *
 */
var Tmd = (function () {
    function Tmd() {
        this.aaa = 0;
        this.bbb = "";
    }
    var d = __define,c=Tmd,p=c.prototype;
    p.setTmd_a = function (a) {
        this.aaa = a;
    };
    p.getTmd_a = function () {
        return this.aaa;
    };
    p.setTmd_b = function (b) {
        this.bbb = b;
    };
    p.getTmd_b = function () {
        return this.bbb;
    };
    return Tmd;
})();
egret.registerClass(Tmd,'Tmd');
//# sourceMappingURL=Tmd.js.map