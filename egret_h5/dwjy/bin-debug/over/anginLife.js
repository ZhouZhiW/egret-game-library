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
var anginLife = (function (_super) {
    __extends(anginLife, _super);
    function anginLife(score) {
        var _this = _super.call(this) || this;
        _this._timeTxt = 9;
        _this.touchEnabled = true;
        _this.score = score;
        _this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    anginLife.prototype.onAddToStage = function () {
        RES.getResByUrl("resource/res/fnt/num.fnt", this.onLoadComplete, this, RES.ResourceItem.TYPE_FONT);
        this.skinName = "resource/skins/overLife.exml";
        this.ceshi();
        this.AddTimer();
    };
    anginLife.prototype.ceshi = function () {
        this.btn.touchEnabled = true;
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Sharecallfun, this);
        this.skipbtn.touchEnabled = true;
        this.skipbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.skipOver, this);
    };
    anginLife.prototype.Sharecallfun = function () {
        var that = this;
        this.timer.stop();
        window.platform.shareAppMessage().then(function (res) {
            console.log('分享成功回调', res);
            that.Callfun(true);
            return true;
        }, function (err) {
            console.log('分享失败回调', err);
            that.Callfun(false);
            return false;
        });
    };
    anginLife.prototype.Callfun = function (_bool) {
        if (_bool) {
            Data.playlayer.IsClick = true;
            Data.playlayer.bloodNum = 5;
            Data.shareNum += 1;
            for (var a = 0; a < Data.playlayer.bloodArr.length; a++) {
                Data.playlayer.bloodArr[a].visible = true;
            }
        }
        else {
            console.log("quxiao");
            Data.playlayer.endAmation();
        }
        this.parent.removeChild(this);
    };
    anginLife.prototype.skipOver = function () {
        this.timer.stop();
        Data.playlayer.endAmation();
        this.parent.removeChild(this);
    };
    anginLife.prototype.AddTimer = function () {
        this.timer = new egret.Timer(1000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.start();
        this._time = new egret.TextField();
        // this._time.font = font;
        this._time.size = 200;
        this._time.text = this._timeTxt.toString();
        this._time.y = this.stage.height / 2;
        this._time.x = this.stage.stageWidth / 2;
        this._time.anchorOffsetX = this._time.width / 2;
        this._time.anchorOffsetY = this._time.height / 2;
        this.addChild(this._time);
    };
    anginLife.prototype.timerFunc = function () {
        this._timeTxt--;
        this._time.text = this._timeTxt.toString();
        if (this._timeTxt == 0) {
            this.timer.stop();
            if (this && this.parent) {
                Data.playlayer.endAmation();
                this.parent.removeChild(this);
            }
        }
    };
    anginLife.prototype.onLoadComplete = function (font) {
        var _score = new egret.BitmapText();
        _score.font = font;
        _score.text = this.score.toString();
        ;
        _score.y = 300;
        _score.x = this.stage.stageWidth / 2;
        _score.anchorOffsetX = _score.width / 2;
        this.addChild(_score);
    };
    return anginLife;
}(eui.Component));
__reflect(anginLife.prototype, "anginLife");
