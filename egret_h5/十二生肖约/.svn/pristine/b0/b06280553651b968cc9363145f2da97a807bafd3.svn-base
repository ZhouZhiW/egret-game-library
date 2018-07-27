class UI_Online_List extends BaseList {
    private onlineTimer: egret.Timer;

    public constructor() {
        super();
    }

    protected onCreate() {
        this.onlineTimer = new egret.Timer(1000, 0);
        this.onlineTimer.addEventListener(egret.TimerEvent.TIMER, this.timerEvent, this);
        this.onlineTimer.start();
    }

    protected onDestroy() {
        if (this.onlineTimer != null) {
            this.onlineTimer.stop();
            this.onlineTimer.removeEventListener(egret.TimerEvent.TIMER, this.timerEvent, this);
            this.onlineTimer = null;
        }
    }

    private timerEvent() {
        for (let i = 0; i < this.dataGroup.numChildren; i++) {
            const child = this.dataGroup.getChildAt(i);
            if (child instanceof UI_Online_Item) {
                child.timerEvent();
            }
        }
    }

    public setData(datas: Array<Data_Online_Item>) {
        super.setData(datas);
    }

    public getItemRenderer(): any {
        return UI_Online_Item;;
    }
}