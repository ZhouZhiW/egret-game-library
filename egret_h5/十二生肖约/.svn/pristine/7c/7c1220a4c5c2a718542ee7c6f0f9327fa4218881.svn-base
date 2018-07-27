class Data_Activity_MonthCard extends BaseData {
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

    public get status(): number {
        return this.data.status;
    }

    public get restTime(): number {
        return this.data.restTime;
    }
}