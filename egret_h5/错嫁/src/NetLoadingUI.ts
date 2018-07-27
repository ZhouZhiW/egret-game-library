/**
 *
 * @author 
 *
 */
class NetLoadingUI extends egret.Sprite {
    private loadimg: egret.Bitmap;
    public waitTimer: egret.Timer;
    private overtime: egret.Timer;
    private loadimgSheet: egret.SpriteSheet;
    public constructor() {
        super();
        GameUtils.gameSandPause = true;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initstage, this);
    }
    private initstage(event: egret.Event) {
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
    }
    private clearAllListener() {
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
    }
    private overtimerComFunc() {
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
    }
    private timerComFunc() {
        if (this.waitTimer.hasEventListener(egret.TimerEvent.TIMER_COMPLETE)) {
            this.waitTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        }
        this.waitTimer.stop();
        this.waitTimer.reset();
        this.createView();
    }

    private createView(): void {
        var alphaspr: egret.Sprite = new egret.Sprite;
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
    }
    public clearSceneNetLoading(): void {
        this.clearAllListener();
        GameUtils.gameSandPause = false;
    }
}

