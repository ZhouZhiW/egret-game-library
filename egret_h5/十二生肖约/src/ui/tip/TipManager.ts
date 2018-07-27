class TipManager {
    // 0 英雄 1 星尘 2 背包 3 任务 4 排行榜 5 商城 
    //10首冲 11月卡 12终身 13邀请 14充值 15日常 16在线

    private dataTips: Array<Data_Tip>;
    private tips: Array<ITipListener>;

    constructor() {
        this.tips = [];
        DataManager.inst.tips.addDataListener(this.refreshTips, this);
    }

    private refreshTips(e: DataEvent) {
        let data: Data_Tips = e.data;
        this.dataTips = data.tips;
        for (let i = 0; i < this.tips.length; i++) {
            const tip = this.tips[i];
            const status = this.getTipStatus(tip.getTipIndex());
            tip.onTipStatus(status);
        }
    }

    public addTip(tip: ITipListener) {
        this.tips.push(tip);
        tip.onTipStatus(this.getTipStatus(tip.getTipIndex()));
    }

    public removeTip(tip: ITipListener) {
        for (var i = 0; i < this.tips.length; i++) {
            if (this.tips[i].getTipIndex() == tip.getTipIndex())
                this.tips.splice(i, 1)
            return;
        }
    }



    private getTipStatus(index: number): number {
        if (this.dataTips == null) {
            console.log("this.dataTips == null");
            return 0;
        }
        for (let i = 0; i < this.dataTips.length; i++) {
            const dataTip = this.dataTips[i];
            if (dataTip.index == index) {
                return dataTip.status;
            }
        }
        return 0;
    }
}