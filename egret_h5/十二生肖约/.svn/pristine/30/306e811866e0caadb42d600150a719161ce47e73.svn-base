class Data_Treasures extends BaseData {
    private _treasures: Array<Data_Material>;
    constructor() {
        super();
        this._treasures = [];
    }
    public setServiceData(data: any) {
        if (data == null || data.dataList == null || data.dataList.length < 1) {
            // console.error("Data_Treasures setServiceData is null!")
            return;
        }
        this.data = data;
        this._treasures = [];
        for (let i = 0; i < data.dataList.length; i++) {
            this._treasures.push(new Data_Material(data.dataList[i]));
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    }

    public get treasures(): Array<Data_Material> {
        return this._treasures;
    }

}