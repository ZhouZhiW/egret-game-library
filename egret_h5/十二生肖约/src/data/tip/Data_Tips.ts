class Data_Tips extends BaseData {

    private _tips: Array<Data_Tip>;

    constructor() {
        super();
    }

    public setServiceData(data: any) {
        this.data = data;
        if (data.tips != null) {
            this._tips = [];
            for (let i: number = 0; i < this.data.tips.length; i++) {
                this._tips.push(new Data_Tip(this.data.tips[i]));
            }
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    }

    public get tips(): Array<Data_Tip> {
        return this._tips;
    }


}