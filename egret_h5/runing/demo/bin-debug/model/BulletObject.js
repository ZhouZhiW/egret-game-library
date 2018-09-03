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
var BulletObject = (function (_super) {
    __extends(BulletObject, _super);
    function BulletObject() {
        return _super.call(this) || this;
    }
    BulletObject.prototype.onCreate = function () {
        this.bodyView = new eui.Image();
    };
    BulletObject.prototype.setInfo = function (res, object) {
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
    BulletObject.prototype.onDestroy = function () {
        var view = this.bodyView;
        if (view != null && view.parent != null) {
            view.parent.removeChild(view);
        }
    };
    BulletObject.prototype.onEnterFrame = function (advancedTime) {
        // console.log(advancedTime);
        this.runView(advancedTime);
    };
    BulletObject.prototype.runView = function (advancedTime) {
        var view = this.bodyView;
        if (view != null) {
            view.x -= advancedTime / 1000 * this.speed * Const.speedOffset;
        }
        this.destorySelfOut();
    };
    /**
     * 向左边出边界销毁自己
     */
    BulletObject.prototype.destorySelfOut = function () {
        var view = this.view;
        if (view != null) {
            if (view.x + view.width < 0) {
                // view.parent && view.parent.removeChild(view);
                ObjectPool.getInstance().destroyObject(this);
            }
        }
    };
    BulletObject.key = "BulletObject";
    return BulletObject;
}(GameObject));
__reflect(BulletObject.prototype, "BulletObject");
//# sourceMappingURL=BulletObject.js.map