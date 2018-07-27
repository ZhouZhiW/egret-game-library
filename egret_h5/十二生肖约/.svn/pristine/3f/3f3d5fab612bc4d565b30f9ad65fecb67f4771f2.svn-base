class UI_Home_Title extends BaseComponent {
    private userAvatar:UI_UserAvatar;
    private homeTitleUserHelp: eui.Image;
    private homeTitleUserTx: eui.Label;
    private homeTitleProgressBar: UI_Home_TitleProgressBar;

    private homeTitleAsset: UI_Home_TitleAsset;
    private homeTitlePass0: UI_Home_TitlePass
    private homeTitlePass1: UI_Home_TitlePass
    private homeTitlePass2: UI_Home_TitlePass
    private homeTitlePass3: UI_Home_TitlePass
    private homeTitlePass4: UI_Home_TitlePass
    private homeTitlePass: Array<UI_Home_TitlePass>;
    constructor() {
        super();
    }

    public onCreate() {
        this.homeTitlePass = [];
        this.homeTitlePass.push(this.homeTitlePass0);
        this.homeTitlePass.push(this.homeTitlePass1);
        this.homeTitlePass.push(this.homeTitlePass2);
        this.homeTitlePass.push(this.homeTitlePass3);
        this.homeTitlePass.push(this.homeTitlePass4);
        DataManager.inst.userInfo.addDataListener(this.refreshUserInfo, this);
        DataManager.inst.gameLevel.addDataListener(this.refreshChapter, this);
    }

    public onDestroy() {
        DataManager.inst.userInfo.removeDataListener(this.refreshUserInfo, this);
        DataManager.inst.gameLevel.removeDataListener(this.refreshChapter, this);
    }

    private setPass(level: number, maxLevel: number) {
        if (maxLevel == null || maxLevel < level) {
            maxLevel = level;
        }
        let n = level % 5;
        n = (n == 0) ? 5 : n;
        let first = level - n + 1;

        for (let i = first; i < first + 5; i++) {
            let type = 0;
            if (i == level) {
                type = UI_Home_TitlePassType.CURRENTATT;
            } else if (i <= maxLevel) {
                type = UI_Home_TitlePassType.COMPLETED;
            } else {
                type = UI_Home_TitlePassType.LOCK;
            }
            let m = i % 5;

            m = (m == 0) ? 5 - 1 : m - 1;
            this.homeTitlePass[m].setInfo(type, i);
        }
    }

    private refreshUserInfo(e: DataEvent) {
        const data: Data_UserInfo = e.data;
        this.userAvatar.setAvatar( data.avatar);
        this.homeTitleUserTx.text = data.userName;//设置用户名
    }

    private refreshChapter(e: DataEvent) {
        let data: Data_GameLevel = e.data;
        this.setPass(data.chapterIndex, data.maxChapter);//设置关卡
    }

    protected get skinPath(): String {
        return "resource/skins/ui/home/UI_Home_TitleSkin.exml";
    }

}