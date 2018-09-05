class anginLife extends eui.Component {
    constructor(score) {
        super();
        this.touchEnabled = true;
        this.score = score;
        this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage() {
        RES.getResByUrl("resource/res/fnt/num.fnt", this.onLoadComplete, this, RES.ResourceItem.TYPE_FONT);
        this.skinName = "resource/skins/overLife.exml";
        this.ceshi();
        this.AddTimer();

    }
    public btn: eui.Image;
    private score: Number;
    public skipbtn: eui.Image;
    private ceshi() {
        this.btn.touchEnabled = true;
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Sharecallfun, this)
        this.skipbtn.touchEnabled = true;
        this.skipbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.skipOver, this)
    }
    private Sharecallfun() {
        var that = this;
        this.timer.stop();
        window.platform.shareAppMessage().then((res) => {
            console.log('分享成功回调', res);
            that.Callfun(true);
            return true;
        }, (err) => {
            console.log('分享失败回调', err);
            that.Callfun(false);
            return false;
        })
    }
    private Callfun(_bool) {
        if (_bool) {
            
            Data.playlayer.IsClick = true;
            Data.playlayer.bloodNum = 5;
            Data.shareNum += 1;
            for (var a = 0; a < Data.playlayer.bloodArr.length; a++) {
                Data.playlayer.bloodArr[a].visible = true;
            }
        } else {
            console.log("quxiao")
            Data.playlayer.endAmation();
        }
        this.parent.removeChild(this);
    }
    private skipOver() {
        this.timer.stop();
        Data.playlayer.endAmation();
        this.parent.removeChild(this);
    }
    private _score;
    private _time;
    private timer;
    private AddTimer() {
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
    }
    private timerFunc() {
        this._timeTxt--;
        this._time.text = this._timeTxt.toString();
        if (this._timeTxt == 0) {
            this.timer.stop();
            if (this&&this.parent) {
                Data.playlayer.endAmation();
                this.parent.removeChild(this);
            }

        }
    }
    private _timeTxt = 9;
    private onLoadComplete(font: egret.BitmapFont) {
        var _score = new egret.BitmapText();
        _score.font = font;
        _score.text = this.score.toString();;
        _score.y = 300;
        _score.x = this.stage.stageWidth / 2;
        _score.anchorOffsetX = _score.width / 2;
        this.addChild(_score);




    }
}