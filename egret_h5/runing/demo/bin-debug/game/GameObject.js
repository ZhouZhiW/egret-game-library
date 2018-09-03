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
var GameObject = (function (_super) {
    __extends(GameObject, _super);
    function GameObject() {
        var _this = _super.call(this) || this;
        _this.key = "gameObject";
        _this.speed = 500;
        return _this;
    }
    GameObject.prototype.onCreate = function () {
    };
    /**
     * 销毁view
     */
    GameObject.prototype.onDestroy = function () {
        var view = this.view;
        if (view != null) {
            view.parent && view.parent.removeChild(view);
        }
    };
    GameObject.prototype.onEnterFrame = function (advancedTime) {
    };
    return GameObject;
}(egret.HashObject));
__reflect(GameObject.prototype, "GameObject");
//# sourceMappingURL=GameObject.js.map