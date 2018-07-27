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
/**
 *
 * @author
 *
 */
var NetLoadingUI = (function (_super) {
    __extends(NetLoadingUI, _super);
    function NetLoadingUI() {
        var _this = _super.call(this) || this;
        GameUtils.gameSandPause = true;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initstage, _this);
        return _this;
    }
    NetLoadingUI.prototype.initstage = function (event) {
        this.loadimgSheet = RES.getRes("loadimg_json");
        this.waitTimer = new egret.Timer(1500, 1);
        //注册事件侦听器
        this.waitTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        //开始计时
        this.waitTimer.start();
        //超时处理
        this.overtime = new egret.Timer(1000 * 6, 1);
        //注册事件侦听器
        this.overtime.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.overtimerComFunc, this);
        //开始计时
        this.overtime.start();
    };
    NetLoadingUI.prototype.clearAllListener = function () {
        if (this.overtime) {
            if (this.overtime.hasEventListener(egret.TimerEvent.TIMER_COMPLETE)) {
                this.overtime.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.overtimerComFunc, this);
            }
            this.overtime.stop();
            this.overtime.reset();
        }
        if (this.waitTimer) {
            if (this.waitTimer.hasEventListener(egret.TimerEvent.TIMER_COMPLETE)) {
                this.waitTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
            }
            this.waitTimer.stop();
            this.waitTimer.reset();
        }
    };
    NetLoadingUI.prototype.overtimerComFunc = function () {
        this.clearAllListener();
        GameUtils.gameSandPause = false;
        if (this) {
            if (this.parent) {
                var tishi = new DrawUtils();
                tishi.createTishi("coverimg_json", "tishikuang1", "请求超时");
                this.parent.addChild(tishi);
                this.parent.removeChild(this);
            }
        }
    };
    NetLoadingUI.prototype.timerComFunc = function () {
        if (this.waitTimer.hasEventListener(egret.TimerEvent.TIMER_COMPLETE)) {
            this.waitTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        }
        this.waitTimer.stop();
        this.waitTimer.reset();
        this.createView();
    };
    NetLoadingUI.prototype.createView = function () {
        var alphaspr = new egret.Sprite;
        alphaspr.graphics.beginFill(0x000000, 1);
        alphaspr.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H);
        alphaspr.graphics.endFill();
        alphaspr.width = GameUtils.SCREEN_W;
        alphaspr.height = GameUtils.SCREEN_H;
        alphaspr.alpha = 0.3;
        this.addChild(alphaspr);
        alphaspr.touchEnabled = true;
        this.loadimg = new egret.Bitmap();
        this.loadimg.texture = this.loadimgSheet.getTexture("netloading");
        this.loadimg.x = GameUtils.SCREEN_W / 2;
        this.loadimg.y = GameUtils.SCREEN_H / 2 - 100;
        this.loadimg.anchorOffsetX = 40;
        this.loadimg.anchorOffsetY = 40;
        this.addChild(this.loadimg);
        var tw = egret.Tween.get(this.loadimg, { loop: true });
        tw.to({ rotation: 360 }, 1000);
    };
    NetLoadingUI.prototype.clearSceneNetLoading = function () {
        this.clearAllListener();
        GameUtils.gameSandPause = false;
    };
    return NetLoadingUI;
}(egret.Sprite));
__reflect(NetLoadingUI.prototype, "NetLoadingUI");
//# sourceMappingURL=NetLoadingUI.js.map