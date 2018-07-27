class Data_Achieved extends BaseData {

    private dps: number;
    private items: Array<Data_Achieved_Item>;
     

    constructor() {
        super();
        // this.test();
    }

    public setServiceData(data: any) {
        if (data == null) {
            return;
        }
        this.data = data;
        this.dps = data.dps;
        if (data.items != null) {
            this.items = [];
            for (let i: number = 0; i < this.data.items.length; i++) {
                this.items.push(new Data_Achieved_Item(this.data.items[i]));
            }
        } else {
            console.error("Data_Achieved setServiceData is null!")
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    }

    public get acTotalDPS(): string {
        return this.data.dps;
    }

    public get acItems(): Array<Data_Achieved_Item> {
        return this.items;
    }

    // private test() {
    //     this.items = [];
    //     this.dps = "80%";
    //     for (let i: number = 0; i < 12; i++) {

    //         const item = new Data_Achieved_Item();
    //         item.setBtn(false);
    //         item.setIndex(i);
    //         item.setReward("金币掉落提高100%");
    //         item.setTarget("获得100金币")
    //         item.setNow(150);
    //         item.setEnd(180);
    //         this.items.push(item);
    //     }
    // }


}