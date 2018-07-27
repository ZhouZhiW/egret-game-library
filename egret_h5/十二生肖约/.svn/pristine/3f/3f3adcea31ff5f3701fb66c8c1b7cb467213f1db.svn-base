class Data_Activity_FirstPayment extends BaseData {
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

}