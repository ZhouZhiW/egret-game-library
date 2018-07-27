class Data_Mail extends BaseData {
    private items: Array<Data_Mail_Item>;
    constructor() {
        super();
    }

    public setServiceData(data: any) {
        if (data == null) {
            return;
        }
        this.data = data;
        if (data.shops != null) {
            this.items = [];
            for (let i = 0; i < data.shops.length; i++) {
                this.items.push(new Data_Mail_Item(data.shops[i]));
            }
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    }

    public get diamond(): number {
        return this.data.diamond;
    }

    public get shops(): Array<Data_Mail_Item> {
        return this.items;
    }
}