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
var FloorObject = (function (_super) {
    __extends(FloorObject, _super);
    function FloorObject() {
        return _super.call(this) || this;
    }
    FloorObject.prototype.onCreate = function () {
        this.key = "FloorObject";
        this.bodyView = new eui.Image();
    };
    FloorObject.prototype.setInfo = function (res, object) {
        var view = this.bodyView;
        if (view == null) {
            view = new eui.Image(res);
        }
        view.fillMode = egret.BitmapFillMode.REPEAT;
        view.source = res;
        view.x = object.x;
        view.y = object.y;
        view.width = object.width;
        view.height = object.height;
    };
    FloorObject.prototype.onDestroy = function () {
        var view = this.bodyView;
        if (view != null && view.parent != null) {
            view.parent.removeChild(view);
        }
    };
    FloorObject.prototype.onEnterFrame = function (advancedTime) {
        // console.log(advancedTime);
        this.runView(advancedTime);
    };
    FloorObject.prototype.runView = function (advancedTime) {
        var view = this.bodyView;
        if (view != null) {
            view.x -= advancedTime / 1000 * this.speed * Const.speedOffset;
        }
        this.destorySelfOut();
    };
    /**
     * 向左边出边界销毁自己
     */
    FloorObject.prototype.destorySelfOut = function () {
        var view = this.view;
        if (view != null) {
            if (view.x + view.width < 0) {
                // view.parent && view.parent.removeChild(view);
                ObjectPool.getInstance().destroyObject(this);
            }
        }
    };
    FloorObject.key = "FloorObject";
    return FloorObject;
}(GameObject));
__reflect(FloorObject.prototype, "FloorObject");
//# sourceMappingURL=FloorObject.js.map