class Data_Offline extends BaseData {

    private _offlineMaterials: Array<Data_Material>;
    constructor() {
        super();
        this._offlineMaterials = [];
    }

    public setServiceData(data: any) {
        this.data = data;
        this._offlineMaterials = [];
        for (let i: number = 0; i < this.data.offlineMaterials.length; i++) {
            this._offlineMaterials.push(new Data_Material(this.data.offlineMaterials[i]));
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    }

    public get offlineTime(): number {
        return this.data.offlineTime;//
    }


    public get offlineMaterials(): Array<Data_Material> {
        return this._offlineMaterials;
    }
}