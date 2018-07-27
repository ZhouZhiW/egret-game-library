class UI_Mail_List extends BaseList {
    public constructor() {
        super();
    }

    public setData(datas: Array<Data_Mail_Item>) {
        super.setData(datas);
    }

    public getItemRenderer(): any {
        return UI_Mail_Item;
    }
}