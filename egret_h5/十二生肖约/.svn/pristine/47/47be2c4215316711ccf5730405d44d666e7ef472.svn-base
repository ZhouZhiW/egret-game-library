class Data_Rank_MyFriends extends BaseData {

    private items: Array<Data_Rank_MyFriendsItem>;
    private friends: Array<Data_Rank_MyFriendsItem>;
    private itemtype: number;
    private arrayType: number;
     

    constructor() {
        super();
        // console.log("进入了DATA构造");

        // this.arrayType = num;
        // this.test();
    }

    public setServiceData(data: any) {
        this.data = data;
        // console.log(this.data);
        // console.log(this.data.users[1]);
        if (data.friends != null) {
            this.friends = [];
            this.arrayType = data.arrayID;
            // console.log("dataArrayID" + data.arrayID);
            for (let i: number = 0; i < this.data.friends.length; i++) {
                // const item = new Data_Rank_MyFriendsItem(this.data.friends[i]);
                this.friends.push(new Data_Rank_MyFriendsItem(this.data.friends[i]));
                this.friends[i].setRankNum(i);
            }
            this.callListener(BaseData.DATA_SOURCE_SERVICE);
        }
    }

    public clearData() {
        this.data = null;
    }

    public get myFriendsItems(): Array<Data_Rank_MyFriendsItem> {
        return this.items;
    }

    public get friendsUser(): Array<Data_Rank_MyFriendsItem> {
        return this.friends;
    }

    public setItemType(type: number) {
        this.itemtype = type;
    }

    public get arrayID() {
        return this.arrayType;
    }

    private get tpye() {
        return this.itemtype;
    }


    private test() {
        this.items = [];
        for (let i: number = 0; i < 5; i++) {
            const item = new Data_Rank_MyFriendsItem(0);
            item.setItemType(this.itemtype);
            this.items.push(item);
            this.items[i].setRankNum(i);
        }

    }

    public setArrayType(type: number) {
        this.arrayType = type;
    }
}