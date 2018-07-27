class UI_Daily_List extends BaseList {
    public constructor() {
        super();
    }

    public setData(datas: Array<Data_Daily_Item>) {
        super.setData(datas);
    }

    public getItemRenderer(): any {
        return UI_Daily_Item;;
    }
}