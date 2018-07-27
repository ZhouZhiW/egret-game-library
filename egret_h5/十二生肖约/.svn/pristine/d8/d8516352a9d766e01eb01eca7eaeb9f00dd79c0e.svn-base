class UI_Achieved_List extends eui.Scroller {
    private dataGroup: eui.DataGroup;
    private acDatas: eui.ArrayCollection;
    public constructor() {
        super();
        this.dataGroup = new eui.DataGroup();
        this.acDatas = new eui.ArrayCollection();
    }

    public setData(datas: Array<Data_Achieved_Item>) {
        this.acDatas.replaceAll(datas);
        
    }



    protected createChildren(): void {
        this.viewport = this.dataGroup;
        this.addChild(this.dataGroup);
        this.dataGroup.dataProvider = this.acDatas;
        this.dataGroup.itemRenderer = UI_Achieved_Item;
    }

}