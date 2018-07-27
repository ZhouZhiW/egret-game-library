class UI_Home_Main extends BaseComponent {
    private title: UI_Home_Title;
    private footer: UI_Home_Footer;
    private activities: UI_Home_ActivityGroup;
    private currentTab: UI_Base_Tab;
    private tipManager: TipManager;
    private currentActivity: UI_Base_Activity;
    constructor() {
        super();
        this.tipManager = new TipManager();
    }

    protected onCreate() {
        const offline = DataManager.inst.offline;
        if (offline.offlineTime > 0) {
            new UI_Home_Offline_Dialog(offline).show();
        }
    }

    protected onDestroy() {

    }

    public get tips(): TipManager {
        return this.tipManager;
    }

    public showTab(tabIndex: number, subIndex = 0) {
        this.closeTab();
        switch (tabIndex) {
            case 0:
                this.currentTab = new UI_Up_Tab();
                break;
            case 1:
                this.currentTab = new UI_Gem_Main_Tab();
                break;
            case 2:
                this.currentTab = new UI_Backpack_Tab();
                break;
            case 3:
                this.currentTab = new UI_Mission_Main_Tab();
                break;
            case 4:
                this.currentTab = new UI_Rank_Main_Tab(subIndex);
                break;
            case 5:
                this.currentTab = new UI_Mail_Tab();
                break;
        }

        if (this.currentTab != null) {
            this.footer.showTab(tabIndex);
            this.addChild(this.currentTab);
            this.swapChildren(this.footer, this.currentTab);
        }
    }



    public closeTab() {
        if (this.currentTab != null) {
            if (this.currentTab.parent != null) {
                this.currentTab.parent.removeChild(this.currentTab);
            }
            this.currentTab = null;
        }
        this.footer.closeTab();
    }


    public showActivity(activityId: number) {
        this.closeActivity();
        switch (activityId) {
            case 10:
                this.currentActivity = new UI_FirstPayment_Tab(10);;
                break;
            case 11:
                this.currentActivity = new UI_FirstPayment_Tab(11);
                break;
            case 12:
                this.currentActivity = new UI_FirstPayment_Tab(12);
                break;
            case 13:
                this.currentActivity = new UI_TopUp_Tab();
                break;
            case 14:
                this.currentActivity = new UI_Invitation_Tab();
                break;
            case 15:
                this.currentActivity = new UI_Daily_Tab();
                break;
            case 16:
                this.currentActivity = new UI_Online_Tab();
                break;
        }
        if (this.currentActivity != null) {
            this.addChild(this.currentActivity);
        }
    }

    public closeActivity() {
        if (this.currentActivity != null) {
            if (this.currentActivity.parent != null) {
                this.currentActivity.parent.removeChild(this.currentActivity);
            }
            this.currentActivity = null;
        }
    }



    protected get skinPath(): String {
        return "resource/skins/ui/home/UI_Home_MainSkin.exml";
    }

}