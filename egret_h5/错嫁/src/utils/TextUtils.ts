/**
 *
 * @author 
 *
 */
class TextUtils extends egret.DisplayObjectContainer {
    public static gameText: egret.TextField;
    public static gametextvalue: string = "";
    public static gametextinde: number;
    public static timer: egret.Timer;
    public static gameTextStage: boolean;
    public constructor() {
        super();
    }
    /*
     * 文字打字机效果
     */
    public static typewriterText(text: string, textx: number, texty: number, textw: number, texth: number, textc: number, lineSpacing: number, texts: number, delayt: number): egret.TextField {
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
    }
    public static typewriterTextCom(text: string, textx: number, texty: number, textw: number, texth: number, textc: number, lineSpacing: number, texts: number, delayt: number, comFunc: Function, thisObj: any): egret.TextField {
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
    }
    private static timerFunc() {
        this.gameText.text = this.gameText.text + this.gametextvalue.charAt(this.gametextinde);
        this.gametextinde++;
    }
    private static timerComFunc() {
        if (this.timer.hasEventListener(egret.TimerEvent.TIMER)) {
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        }
        if (this.timer.hasEventListener(egret.TimerEvent.TIMER_COMPLETE)) {
            this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        }
        this.timer.stop();
        this.timer.reset();
        this.gameTextStage = false;
    }
    public static setAllGameDialog(): void {
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
    }
    /*
     * %n替换成/n
     */
    public static replaceText(str: string): string {
        str = str.replace(/\%n/g, "\n　　");
        return str;
    }
    /**
     * 限制文字字数，多余的用...表示
     */
    public static getChar(str: string, len: number): string {
        if (str.length > len) {
            return str.substring(0, len) + "...";
        } else {
            return str;
        }
    }
    /*
     * 文字滚动效果
     */
    public static scrolltext: egret.TextField;
    private static textspeed: number = 0.02;
    private static timeOnEnterFrame = 0;
    private static textheight: number = 0;
    private static scrolldelayt: number = 2000;
    private static scrolldelaytindex = 0;
    public static scrollText(text: string, textx: number, texty: number, textw: number, texth: number, textc: number, textspeed: number, thisObj: any): egret.TextField {
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
    }
    private static onEnterFrame(e: egret.Event) {
        var rect: egret.Rectangle = this.scrolltext.scrollRect;
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
        } else {
            this.timeOnEnterFrame = egret.getTimer();
        }
    }
}
