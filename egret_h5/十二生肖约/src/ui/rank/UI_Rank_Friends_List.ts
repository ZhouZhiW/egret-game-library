class UI_Rank_Friends_List extends BaseList {

    public constructor() {
        super();

    }

    public setDatas(datas: Array<Data_Rank_MyFriendsItem>) {
        super.setData(datas);
    }


    public getItemRenderer(): any {
        return UI_Rank_Friends_Item;
    }
}