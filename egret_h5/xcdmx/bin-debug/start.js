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
var start = (function (_super) {
    __extends(start, _super);
    function start() {
        var _this = _super.call(this) || this;
        data.Start_Layer = _this;
        _this.CreateBg();
        return _this;
    }
    start.prototype.CreateBg = function () {
        var bg = new egret.Bitmap();
        var textrue = RES.getRes("bg_cover_png");
        bg.texture = textrue;
        this.addChild(bg);
        bg.x = egret.MainContext.instance.stage.stageWidth / 2;
        bg.y = egret.MainContext.instance.stage.stageHeight / 2;
        bg.anchorOffsetX = bg.width / 2;
        bg.anchorOffsetY = bg.height / 2;
        var egret_width = egret.MainContext.instance.stage.stageWidth;
        var egret_height = egret.MainContext.instance.stage.stageHeight;
        data.createBtn("button_jdms_png", function () {
            if (data.Start_Layer.parent) {
                data.Start_Layer.parent.removeChild(data.Start_Layer);
            }
            data.Start_Layer.sound1 = RES.getRes("sound_del2_mp3");
            data.Start_Layer.sound2 = RES.getRes("sound_set2_mp3");
            var channel = data.Start_Layer.sound1.play(0, 1);
            channel.stop();
            var channe2 = data.Start_Layer.sound2.play(0, 1);
            channe2.stop();
            var _game = new game();
            data.Main_Layer.addChild(_game);
            // egret.runEgret(new game())
        }, egret_width / 2, egret_height / 2, this);
    };
    start.prototype.onLoadComplete = function (event) {
        var loader = event.target;
        //获取加载到的 Sound 对象
        var sound = loader.data;
        this.sound1 = sound;
    };
    return start;
}(egret.Sprite));
__reflect(start.prototype, "start");
