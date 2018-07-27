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
var TextUtils = (function (_super) {
    __extends(TextUtils, _super);
    function TextUtils() {
        return _super.call(this) || this;
    }
    /*
     * 文字打字机效果
     */
    TextUtils.typewriterText = function (text, textx, texty, textw, texth, textc, lineSpacing, texts, delayt) {
        if (!text) {
            return;
        }
        this.gametextvalue = text;
        this.gameText = new egret.TextField();
        this.gameText.x = textx;
        this.gameText.y = texty;
        this.gameText.width = textw;
        this.gameText.height = texth;
        this.gameText.textColor = textc;
        this.gameText.lineSpacing = lineSpacing;
        this.gameText.size = texts;
        var textlegth = this.gametextvalue.length;
        this.gametextinde = 0;
        //创建一个计时器对象
        this.timer = new egret.Timer(delayt, textlegth);
        //注册事件侦听器
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        //开始计时
        this.timer.start();
        this.gameTextStage = true;
        return this.gameText;
    };
    TextUtils.typewriterTextCom = function (text, textx, texty, textw, texth, textc, lineSpacing, texts, delayt, comFunc, thisObj) {
        if (!text) {
            return;
        }
        this.gametextvalue = text;
        this.gameText = new egret.TextField();
        this.gameText.x = textx;
        this.gameText.y = texty;
        this.gameText.width = textw;
        this.gameText.height = texth;
        this.gameText.textColor = textc;
        this.gameText.lineSpacing = lineSpacing;
        this.gameText.size = texts;
        var textlegth = this.gametextvalue.length;
        this.gametextinde = 0;
        //创建一个计时器对象
        this.timer = new egret.Timer(delayt, textlegth);
        //注册事件侦听器
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, comFunc, thisObj);
        //开始计时
        this.timer.start();
        this.gameTextStage = true;
        return this.gameText;
    };
    TextUtils.timerFunc = function () {
        this.gameText.text = this.gameText.text + this.gametextvalue.charAt(this.gametextinde);
        this.gametextinde++;
    };
    TextUtils.timerComFunc = function () {
        if (this.timer.hasEventListener(egret.TimerEvent.TIMER)) {
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        }
        if (this.timer.hasEventListener(egret.TimerEvent.TIMER_COMPLETE)) {
            this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        }
        this.timer.stop();
        this.timer.reset();
        this.gameTextStage = false;
    };
    TextUtils.setAllGameDialog = function () {
        if (this.gameText) {
            this.gameText.text = this.gametextvalue;
        }
        if (this.timer) {
            if (this.timer.hasEventListener(egret.TimerEvent.TIMER)) {
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            }
            if (this.timer.hasEventListener(egret.TimerEvent.TIMER_COMPLETE)) {
                this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
            }
            this.timer.stop();
            this.timer.reset();
        }
        this.gameTextStage = false;
    };
    /*
     * %n替换成/n
     */
    TextUtils.replaceText = function (str) {
        str = str.replace(/\%n/g, "\n　　");
        return str;
    };
    /**
     * 限制文字字数，多余的用...表示
     */
    TextUtils.getChar = function (str, len) {
        if (str.length > len) {
            return str.substring(0, len) + "...";
        }
        else {
            return str;
        }
    };
    TextUtils.scrollText = function (text, textx, texty, textw, texth, textc, textspeed, thisObj) {
        this.textspeed = textspeed;
        this.textheight = texth;
        this.scrolltext = new egret.TextField();
        this.scrolltext.size = 30;
        this.scrolltext.x = textx;
        this.scrolltext.y = texty;
        this.scrolltext.width = textw;
        this.scrolltext.height = 1000;
        this.scrolltext.text = text;
        this.scrolltext.textColor = textc;
        this.scrolltext.size = GameUtils.TEXT_SIZE_MIDDLE;
        this.scrolltext.scrollRect = new egret.Rectangle(0, 0, textw, texth);
        this.scrolltext.cacheAsBitmap = true;
        if (this.scrolltext.numLines * this.scrolltext.size > texth) {
            this.scrolltext.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            this.timeOnEnterFrame = egret.getTimer();
            this.scrolldelaytindex = egret.getTimer();
        }
        return this.scrolltext;
    };
    TextUtils.onEnterFrame = function (e) {
        var rect = this.scrolltext.scrollRect;
        var now = egret.getTimer();
        var time = this.timeOnEnterFrame;
        var delaynow = egret.getTimer();
        if (now - this.scrolldelaytindex > this.scrolldelayt) {
            var pass = now - time;
            rect.y += this.textspeed * pass;
            this.scrolltext.scrollRect = rect;
            this.timeOnEnterFrame = egret.getTimer();
            if (rect.y > this.scrolltext.size * this.scrolltext.numLines) {
                rect.y = -this.textheight;
            }
        }
        else {
            this.timeOnEnterFrame = egret.getTimer();
        }
    };
    TextUtils.gametextvalue = "";
    TextUtils.textspeed = 0.02;
    TextUtils.timeOnEnterFrame = 0;
    TextUtils.textheight = 0;
    TextUtils.scrolldelayt = 2000;
    TextUtils.scrolldelaytindex = 0;
    return TextUtils;
}(egret.DisplayObjectContainer));
__reflect(TextUtils.prototype, "TextUtils");
//# sourceMappingURL=TextUtils.js.map