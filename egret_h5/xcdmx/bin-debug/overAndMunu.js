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
var overAndMunu = (function (_super) {
    __extends(overAndMunu, _super);
    function overAndMunu() {
        var _this = _super.call(this) || this;
        _this.addbtn();
        return _this;
    }
    overAndMunu.prototype.addbtn = function () {
        var egret_width = egret.MainContext.instance.stage.stageWidth;
        var egret_height = egret.MainContext.instance.stage.stageHeight;
        data.createBtn("home_png", function () {
            data.updateData(); //重置数据；
            data.Game_Layer.parent.removeChild(data.Game_Layer);
            var _start = new start();
            data.Main_Layer.addChild(_start);
        }, egret_width / 2 - 102, egret_height / 2 + 100, this);
        data.createBtn("again_png", function () {
            data.updateData(); //重置数据；
            data.Game_Layer.parent.removeChild(data.Game_Layer);
            var _game = new game();
            data.Main_Layer.addChild(_game);
        }, egret_width / 2 + 102, egret_height / 2 + 100, this);
    };
    return overAndMunu;
}(egret.Sprite));
__reflect(overAndMunu.prototype, "overAndMunu");
