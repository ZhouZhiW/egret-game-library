class Data_TopUp extends BaseData {
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

    public get products() {
        return this.data.products;
    }

}