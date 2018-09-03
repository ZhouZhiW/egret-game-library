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
var gamelayer = (function (_super) {
    __extends(gamelayer, _super);
    function gamelayer(num) {
        var _this = _super.call(this) || this;
        _this.gameIndex = num;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    gamelayer.prototype.onAddToStage = function () {
        this.Createtitlebg();
    };
    gamelayer.prototype.Createtitlebg = function () {
        var bg = this.createBitmapByName("gamebg_png");
        this.addChild(bg);
        this.CrateDown();
        this.titlebg = new egret.Bitmap();
        this.titlebg.texture = RES.getRes(configData.data[this.gameIndex].url);
        this.titlebg.y = 100;
        this.titlebg.width = egret.MainContext.instance.stage.stageWidth;
        this.titlebg.x = egret.MainContext.instance.stage.stageWidth / 2;
        this.titlebg.anchorOffsetX = this.titlebg.width / 2;
        this.addChild(this.titlebg);
        this.Createtitle(this.titlebg.height);
    };
    gamelayer.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    gamelayer.prototype.Createtitle = function (num) {
        var _shape = new egret.Shape();
        _shape.graphics.beginFill(0xB0E1FB);
        _shape.graphics.drawRect(0, 0, egret.MainContext.instance.stage.stageWidth, 100);
        _shape.graphics.endFill();
        this.addChild(_shape);
        _shape.y = this.titlebg.y + num - 20;
        this.title = this.CreateText(configData.data[this.gameIndex].title);
        this.title.y = _shape.y;
        this.title.width = egret.MainContext.instance.stage.stageWidth - 80;
        this.title.lineSpacing = 5;
        this.title.height = 100;
        this.title.x = this.title.width / 2 + 40;
        this.title.anchorOffsetX = this.title.width / 2;
        this.title.textAlign = egret.HorizontalAlign.CENTER;
        this.title.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.title.textColor = 0x548dd4;
        this.AddResult();
    };
    gamelayer.prototype.AddResult = function () {
        var _result = configData.data[this.gameIndex].result;
        for (var a = 0; a < _result.length; a++) {
            this.CreateResult(a, _result[a]);
        }
    };
    gamelayer.prototype.CreateResult = function (index, txt) {
        var _shape = new bgshape(index);
        _shape.graphics.beginFill(0x548DD2);
        _shape.graphics.drawRoundRect(0, 0, 500, 50, 20, 20);
        _shape.graphics.endFill();
        this.addChild(_shape);
        _shape.x = egret.MainContext.instance.stage.stageWidth / 2;
        _shape.y = this.title.y + 150 + 70 * index;
        _shape.anchorOffsetX = _shape.width / 2;
        _shape.touchEnabled = true;
        _shape.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterGame, this);
        var title = this.CreateText(txt);
        title.size = 25;
        title.y = this.title.y + 150 + 70 * index;
        title.width = egret.MainContext.instance.stage.stageWidth - 80;
        title.height = 50;
        title.x = title.width / 2 + 40;
        title.anchorOffsetX = title.width / 2;
        title.textAlign = egret.HorizontalAlign.CENTER;
        title.verticalAlign = egret.VerticalAlign.MIDDLE;
        title.textColor = 0xffffff;
    };
    gamelayer.prototype.enterGame = function (evt) {
        configData.selectScore += configData.result[configData.gameLevel][evt.currentTarget.Id];
        this.parent.removeChild(this);
        setTimeout(function () {
            configData.gameLevel++;
            if (configData.gameLevel > configData.data.length - 1) {
                var _gameover = new gameOver();
                configData.MainLayer.addChild(_gameover);
            }
            else {
                var _gameLayer = new gamelayer(configData.gameLevel);
                configData.MainLayer.addChild(_gameLayer);
            }
        }, 100);
    };
    gamelayer.prototype.CreateText = function (txt) {
        var _text = new egret.TextField();
        _text.text = txt;
        this.addChild(_text);
        return _text;
    };
    gamelayer.prototype.CrateDown = function () {
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
    return gamelayer;
}(egret.DisplayObjectContainer));
__reflect(gamelayer.prototype, "gamelayer");
//# sourceMappingURL=game.js.map