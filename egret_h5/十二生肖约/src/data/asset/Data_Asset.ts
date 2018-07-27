class Data_Asset extends BaseData {
    public static AssetData_Refresh_Gold = 100;
    constructor() {
        super();
    }


    public setServiceData(data: any) {
        this.data = data;
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    }


    public get clientGold(): number {//金币数
        return this.data.gold;
    }
    public get diamond(): number {//钻石数
        return this.data.diamond;
    }
    public get gemEssence(): number {//宝石精华数
        return this.data.gemEssence;
    }

}