class Data_Rank extends BaseData {

    private items: Array<Data_Rank_item>;
    private users: Array<Data_Rank_item>;

    private userRank: number;
    // private _resttime: number;

    constructor() {
        super();
        // this.test();
    }

    public setServiceData(data: any) {
        this.data = data;
        if (data.users != null) {
            this.users = [];
            for (let i: number = 0; i < this.data.users.length; i++) {
                this.users.push(new Data_Rank_item(this.data.users[i]));
                if (DataManager.inst.userInfo.userId == this.data.users[i].userId) {
                    this.userRank = i + 1;
                }

            }
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    }

    public get kind() {//0 传送门 1 约会的人
        return this.data.kind;
    }

    public get userRankNum(): number {
        return this.userRank;
    }

    public get rankItems(): Array<Data_Rank_item> {
        return this.items;
    }

    public get rankUser(): Array<Data_Rank_item> {
        return this.users;
    }

    public get rank(): string {
        return this.data.rank;
    }

    // private test() {
    //     this.items = [];
    //     for (let i: number = 0; i < 20; i++) {
    //         const item = new Data_Rank_item();
    //         this.items.push(item);
    //         this.items[i].setRankNum(i);
    //     }

    // }
}