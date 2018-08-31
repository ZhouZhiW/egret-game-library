class TimerPanel extends egret.Sprite {
    public constructor() {
        super()
        this.draw();
        this.createTimer();
        data.Timer_Layer = this;
    }
    private txt: egret.TextField;

    private draw() {
        this.txt = new egret.TextField();
        this.txt.width = egret.MainContext.instance.stage.stageWidth;
        this.txt.y = egret.MainContext.instance.stage.stageHeight/2;
        this.txt.textColor = 0xff0000;
        this.txt.textAlign = egret.HorizontalAlign.CENTER;
        this.txt.bold=true;
        this.txt.size=50;
        this.txt.text = "3";
        this.addChild(this.txt);

    }
    private _timer: egret.Timer;
    private _num = 3;//表示计时器的计时次数
    private createTimer() {
        this._timer = new egret.Timer(1000, this._num);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this._timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerCom, this);
    }
    private _timers = 3;
    private onTimer() {
        this._timers -= 1;
        this.txt.text = this._timers.toString();
    }
    private onTimerCom() {
        this.txt.text = this._timers.toString();
        if (data.Timer_Layer) {
            data.Timer_Layer.parent.removeChild( data.Timer_Layer)
        }
        var _gameOVer = new gameOver();
        data.Game_Layer.addChild(_gameOVer);
        this.stop();
    }
    public start() {
        this.txt.text = "3"
        this._timers = 3;
        this._timer.reset();//timer使用一次后，timer内部也有计算属性（比如已经走了多少次）
        this._timer.start();//计时器开始计时
    }
    public stop() {
        if(this.parent){
            this.parent.removeChild(this);
        }
        this._timer.stop()//暂停计时器
    }

}