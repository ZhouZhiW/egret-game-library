class Data_Pedestal extends BaseData {

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

    public get percent(): string {
        return this.data.percent;
    }

    public get nextPercent(): string {
        return this.data.nextPercent;
    }

    public get fragmentNum(): number {
        return this.data.appMasterBaseChip;
    }

    public get baseLevel(): number {
        return this.data.appMasterBaseLevel;
    }

    public get costFragment(): number {
        return this.data.chipNum;
    }

}