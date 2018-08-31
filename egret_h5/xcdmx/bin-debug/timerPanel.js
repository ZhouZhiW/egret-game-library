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
var TimerPanel = (function (_super) {
    __extends(TimerPanel, _super);
    function TimerPanel() {
        var _this = _super.call(this) || this;
        _this._num = 3; //表示计时器的计时次数
        _this._timers = 3;
        _this.draw();
        _this.createTimer();
        data.Timer_Layer = _this;
        return _this;
    }
    TimerPanel.prototype.draw = function () {
        this.txt = new egret.TextField();
        this.txt.width = egret.MainContext.instance.stage.stageWidth;
        this.txt.y = egret.MainContext.instance.stage.stageHeight / 2;
        this.txt.textColor = 0xff0000;
        this.txt.textAlign = egret.HorizontalAlign.CENTER;
        this.txt.bold = true;
        this.txt.size = 50;
        this.txt.text = "3";
        this.addChild(this.txt);
    };
    TimerPanel.prototype.createTimer = function () {
        this._timer = new egret.Timer(1000, this._num);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this._timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerCom, this);
    };
    TimerPanel.prototype.onTimer = function () {
        this._timers -= 1;
        this.txt.text = this._timers.toString();
    };
    TimerPanel.prototype.onTimerCom = function () {
        this.txt.text = this._timers.toString();
        if (data.Timer_Layer) {
            data.Timer_Layer.parent.removeChild(data.Timer_Layer);
        }
        var _gameOVer = new gameOver();
        data.Game_Layer.addChild(_gameOVer);
        this.stop();
    };
    TimerPanel.prototype.start = function () {
        this.txt.text = "3";
        this._timers = 3;
        this._timer.reset(); //timer使用一次后，timer内部也有计算属性（比如已经走了多少次）
        this._timer.start(); //计时器开始计时
    };
    TimerPanel.prototype.stop = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this._timer.stop(); //暂停计时器
    };
    return TimerPanel;
}(egret.Sprite));
__reflect(TimerPanel.prototype, "TimerPanel");
