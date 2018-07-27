class UI_Rank_Rank_List extends BaseList {
    private rankTimer: egret.Timer;
    public constructor() {
        super();
    }

    protected onCreate() {
        this.rankTimer = new egret.Timer(1000, 0);
        this.rankTimer.addEventListener(egret.TimerEvent.TIMER, this.timerEvent, this);
        this.rankTimer.start();
    }

    protected onDestroy() {
        if (this.rankTimer != null) {
            this.rankTimer.stop();
            this.rankTimer.removeEventListener(egret.TimerEvent.TIMER, this.timerEvent, this);
            this.rankTimer = null;
        }
    }

    private timerEvent() {
        for (let i = 0; i < this.dataGroup.numChildren; i++) {
            const child = this.dataGroup.getChildAt(i);
            if (child instanceof UI_Rank_Rank_Item) {
                child.timerEvent();
            }
        }
    }

    public setDatas(datas: Array<Data_Rank_item>) {
        super.setData(datas);
    }

    public getItemRenderer(): any {
        return UI_Rank_Rank_Item;
    }

}