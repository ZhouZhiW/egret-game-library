class Data_ActivityInfos extends BaseData {

    private _activityInfos: Array<Data_ActivityInfo>;

    constructor() {
        super();
        this._activityInfos = [];
    }

    public setServiceData(data: any) {
        this.data = data;
        if (data.activities != null) {
            this._activityInfos = [];
            for (let i: number = 0; i < this.data.activities.length; i++) {
                this._activityInfos.push(new Data_ActivityInfo(this.data.activities[i]));
            }
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    }

    public get activityInfos(): Array<Data_ActivityInfo> {
        return this._activityInfos;
    }


}