var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 *
 * @author
 *
 */
var NetImageLoader = (function (_super) {
    __extends(NetImageLoader, _super);
    function NetImageLoader() {
        return _super.call(this) || this;
    }
    return NetImageLoader;
}(egret.ImageLoader));
__reflect(NetImageLoader.prototype, "NetImageLoader");
//# sourceMappingURL=NetImageLoader.js.map