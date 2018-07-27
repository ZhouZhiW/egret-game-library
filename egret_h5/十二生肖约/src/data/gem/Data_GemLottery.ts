class Data_GemLottery extends BaseData {
     
    constructor() {
        super();
    }

    protected setServiceData(data: any) {
        if (data == null) {
            return;
        }
        this.data = data;
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    }

    public get gemLotteryDiamond(): number {//单抽宝箱所需钻石
        return this.data.composeDiamond;
    }
}