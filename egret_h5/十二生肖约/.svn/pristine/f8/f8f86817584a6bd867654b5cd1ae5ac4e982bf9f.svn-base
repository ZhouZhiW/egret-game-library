class UI_Rank_Friends_Tab extends BaseComponent {

    private friendsList: UI_Rank_Friends_List;

    constructor() {
        super();
        NetEventManager.inst.pushFriends(0);
    }

    public onCreate() {
        super.onCreate();
        DataManager.inst.friends.addDataListener(this.refreshFriends, this);
    }
    public onDestroy() {
        super.onDestroy();
    }

    private refreshFriends(e: DataEvent) {
        const data: Data_Rank_MyFriends = e.data;
        this.friendsList.setDatas(data.friendsUser);
    }

    protected get skinPath(): String {
        return "resource/skins/ui/rank/UI_Rank_Friends_TabSkin.exml";
    }
}