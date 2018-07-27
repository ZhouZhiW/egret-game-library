class Data_Backpack extends BaseData {
    private grids: Array<Data_BaseMaterial>;
    constructor() {
        super();
    }

    protected setServiceData(data: any) {
        if (data == null) {
            return;
        }
        this.data = data;
        this.grids = []
        for (let i = 0; i < data.backpacks.length; i++) {
            this.grids.push(new Data_BaseMaterial(data.backpacks[i]));
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    }

    public get bpGrids(): Array<Data_BaseMaterial> {
        return this.grids;
    }

}