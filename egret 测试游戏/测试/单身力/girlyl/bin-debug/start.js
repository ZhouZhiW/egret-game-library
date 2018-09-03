var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var start = (function (_super) {
    __extends(start, _super);
    function start() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    start.prototype.onAddToStage = function () {
        var bg = this.createBitmapByName("start_bg_jpg");
        bg.width = 1080;
        bg.height = 712;
        // bg.y = 50
        this.addChild(bg);
        bg.touchEnabled = true;
        var _text = new egret.TextField();
        _text.text = configData.titel;
        _text.size = 50;
        _text.textColor = 0x000000;
        _text.x = this.stage.stageWidth / 2;
        _text.anchorOffsetX = _text.width / 2;
        _text.y = bg.y + bg.height + 80;
        this.addChild(_text);
        var _shape = new egret.Shape();
        _shape.graphics.beginFill(0xFE745B);
        _shape.graphics.drawRoundRect(0, 0, 350, 100, 50, 50);
        _shape.graphics.endFill();
        this.addChild(_shape);
        _shape.x = this.stage.stageWidth / 2;
        _shape.anchorOffsetX = _shape.width / 2;
        _shape.y = _text.y + _text.height + 80;
        _shape.touchEnabled = true;
        _shape.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterGame, this);
        var _text1 = new egret.TextField();
        _text1.text = "立即开始";
        _text1.size = 50;
        _text1.textColor = 0xffffff;
        _text1.x = this.stage.stageWidth / 2;
        _text1.anchorOffsetX = _text1.width / 2;
        _text1.y = _shape.y + 25;
        // _text1.anchorOffsetY = _text1.height ;
        this.addChild(_text1);
        var _colorshape = new egret.Shape();
        _colorshape.graphics.beginFill(0xf5f5f7);
        console.log("s", this, this.stage.stageWidth);
        _colorshape.graphics.drawRect(0, 0, this.stage.stageWidth, 100);
        _colorshape.graphics.endFill();
        this.addChild(_colorshape);
        _colorshape.y = _shape.y + 180;
        var _titel2 = new egret.TextField();
        _titel2.text = "测试简介";
        _titel2.size = 55;
        _titel2.textColor = 0x000000;
        // _titel2.bold=true;
        _titel2.x = this.stage.stageWidth / 2;
        _titel2.anchorOffsetX = _titel2.width / 2;
        _titel2.y = _colorshape.y + 180;
        // _text1.anchorOffsetY = _text1.height ;
        this.addChild(_titel2);
        var _desc = new egret.TextField();
        _desc.text = configData.dsc;
        _desc.size = 40;
        _desc.textColor = 0xa1a1a0;
        _desc.width = this.stage.stageWidth - 50;
        _desc.height = 300;
        _desc.x = this.stage.stageWidth / 2;
        _desc.anchorOffsetX = _titel2.width / 2;
        _desc.y = _titel2.y + 100;
        _desc.anchorOffsetX = _desc.width / 2;
        _desc.lineSpacing = 10;
        this.addChild(_desc);
    };
    start.prototype.enterGame = function () {
        this.parent.removeChild(this);
        var _gameLayer = new gameGirllayer(configData.gameLevel);
        configData.MainLayer.addChild(_gameLayer);
    };
    start.prototype.CrateDown = function () {
    };
    start.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return start;
}(egret.DisplayObjectContainer));
__reflect(start.prototype, "start");
