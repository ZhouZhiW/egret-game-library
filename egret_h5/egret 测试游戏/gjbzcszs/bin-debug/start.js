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
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    start.prototype.onAddToStage = function () {
        var bg = this.createBitmapByName("gamebg_png");
        this.addChild(bg);
        this.CrateDown();
        var _title = new egret.TextField();
        _title.text = configData.titel;
        _title.textColor = 0x548DD2;
        _title.size = 35;
        _title.bold = true;
        this.addChild(_title);
        _title.x = egret.MainContext.instance.stage.stageWidth / 2;
        _title.y = 200;
        _title.anchorOffsetX = _title.width / 2;
        var _dsc = new egret.TextField();
        _dsc.text = configData.dsc;
        _dsc.lineSpacing = 10;
        _dsc.width = 540;
        _dsc.height = 500;
        _dsc.textColor = 0x548DD2;
        _dsc.size = 28;
        this.addChild(_dsc);
        _dsc.x = egret.MainContext.instance.stage.stageWidth / 2;
        _dsc.y = 300;
        _dsc.anchorOffsetX = _dsc.width / 2;
        var _shape = new egret.Shape();
        _shape.graphics.beginFill(0x548DD2);
        _shape.graphics.drawRoundRect(0, 0, 500, 80, 50, 50);
        _shape.graphics.endFill();
        this.addChild(_shape);
        _shape.x = egret.MainContext.instance.stage.stageWidth / 2 - _shape.width / 2;
        _shape.y = 530;
        var startbtn = new egret.TextField();
        startbtn.text = "开始测试";
        this.addChild(startbtn);
        startbtn.x = egret.MainContext.instance.stage.stageWidth / 2 - startbtn.width / 2;
        startbtn.y = _shape.y + _shape.height / 2 - startbtn.height / 2;
        _shape.touchEnabled = true;
        _shape.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterGame, this);
    };
    start.prototype.enterGame = function () {
        this.parent.removeChild(this);
        var _gameLayer = new gamelayer(configData.gameLevel);
        configData.MainLayer.addChild(_gameLayer);
    };
    start.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    start.prototype.CrateDown = function () {
        // var num = Math.floor(Math.random() * 2);
        var num = 0;
        var _d = this.createBitmapByName(configData.downUrl[num].img);
        _d.width = egret.MainContext.instance.stage.stageWidth;
        // _d.y = egret.MainContext.instance.stage.height-100;
        _d.y = 0;
        _d.height = 100;
        this.addChild(_d);
        _d.touchEnabled = true;
        _d.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            top.window.location.href = configData.downUrl[num].url;
        }, this);
    };
    return start;
}(egret.DisplayObjectContainer));
__reflect(start.prototype, "start");
//# sourceMappingURL=start.js.map