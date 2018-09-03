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
var GroundObject = (function (_super) {
    __extends(GroundObject, _super);
    function GroundObject() {
        return _super.call(this) || this;
    }
    GroundObject.prototype.onCreate = function () {
        this.bodyView = new eui.Image();
    };
    GroundObject.prototype.onDestroy = function () {
        var view = this.bodyView;
        if (view != null && view.parent != null) {
            view.parent.removeChild(view);
        }
    };
    GroundObject.prototype.setInfo = function (res, object) {
        var view = this.bodyView;
        if (view == null) {
            view = new eui.Image(res);
        }
        view.source = res;
        view.x = object.x;
        view.y = object.y;
        view.width = object.width;
        view.height = object.height;
    };
    GroundObject.prototype.onEnterFrame = function (advancedTime) {
        this.runView(advancedTime);
    };
    GroundObject.prototype.runView = function (advancedTime) {
        var view = this.bodyView;
        if (view != null) {
            view.x -= advancedTime / 1000 * this.speed * Const.speedOffset;
        }
        this.destorySelfOut();
    };
    /**
     * 向左边出边界销毁自己
     */
    GroundObject.prototype.destorySelfOut = function () {
        var view = this.bodyView;
        if (view != null) {
            if (view.x + view.width < 0) {
                // view.parent && view.parent.removeChild(view);
                ObjectPool.getInstance().destroyObject(this);
            }
        }
    };
    GroundObject.key = "GroundObject";
    return GroundObject;
}(GameObject));
__reflect(GroundObject.prototype, "GroundObject");
//# sourceMappingURL=GroundObject.js.map