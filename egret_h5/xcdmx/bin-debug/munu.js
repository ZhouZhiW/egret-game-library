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
var munu = (function (_super) {
    __extends(munu, _super);
    function munu() {
        var _this = _super.call(this) || this;
        _this.addbtn();
        return _this;
    }
    munu.prototype.addbtn = function () {
        var egret_width = egret.MainContext.instance.stage.stageWidth;
        var egret_height = egret.MainContext.instance.stage.stageHeight;
        this.touchEnabled = true; //防止点击穿透；防止下层点击事件被触发
        var sp = new egret.Sprite();
        // sp.graphics.lineStyle(0x000000);
        sp.graphics.beginFill(0x000000, 0.5);
        sp.graphics.drawRect(0, 0, egret_width, egret_height);
        sp.graphics.endFill();
        this.addChild(sp);
        var self = this;
        data.createBtn("continue_png", function () {
            if (self.parent) {
                self.parent.removeChild(self);
            }
        }, egret_width / 2, egret_height / 2 - 100, this);
        var _overAndMunu = new overAndMunu();
        this.addChild(_overAndMunu);
    };
    return munu;
}(egret.Sprite));
__reflect(munu.prototype, "munu");
