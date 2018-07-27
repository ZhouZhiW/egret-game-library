class UI_Visit_Hero_List extends eui.Scroller {
    private dataGroup: eui.DataGroup;
    private upDatas: eui.ArrayCollection;

    public constructor() {
        super();
        this.dataGroup = new eui.DataGroup();
        this.upDatas = new eui.ArrayCollection();
    }

    public setData(datas: Array<Data_HeroTowerRole>) {
        this.upDatas.replaceAll(datas);
    }

    protected createChildren(): void {
        this.viewport = this.dataGroup;
        this.addChild(this.dataGroup);
        this.dataGroup.dataProvider = this.upDatas;
        this.dataGroup.itemRenderer = UI_Visit_Hero_Item;
    }
}