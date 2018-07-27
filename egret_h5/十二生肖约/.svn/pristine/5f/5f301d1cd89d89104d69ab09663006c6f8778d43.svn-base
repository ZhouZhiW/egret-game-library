class BaseList extends eui.Scroller {
    protected dataGroup: eui.DataGroup;
    protected upDatas: eui.ArrayCollection;
    public constructor() {
        super();
        this.dataGroup = new eui.DataGroup();
        this.upDatas = new eui.ArrayCollection();
        this.once(egret.Event.ADDED_TO_STAGE, this.onCreate, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onDestroy, this);
    }

    protected onCreate() {

    }

    protected onDestroy() {

    }
    
    protected createChildren(): void {
        this.viewport = this.dataGroup;
        this.addChild(this.dataGroup);
        this.dataGroup.dataProvider = this.upDatas;
        this.dataGroup.itemRenderer = this.getItemRenderer();
    }

    public setData(datas: Array<any>) {
        this.upDatas.replaceAll(datas);
    }

    public getItemRenderer(): any {
        return null;
    }
}