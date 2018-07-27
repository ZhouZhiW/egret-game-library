class UI_Home_ActivityGroup extends BaseComponent {
    private activityGroup: eui.Group;

    public constructor() {
        super();
    }

    protected get skinPath(): String {
        return "resource/skins/ui/home/UI_Home_ActivityGroupSkin.exml";
    }

    protected onCreate() {
        DataManager.inst.activitys.addDataListener(this.refreshData, this)
    }

    protected onDestroy() {
        DataManager.inst.activitys.removeDataListener(this.refreshData, this)
    }

    private refreshData(e: DataEvent) {
        const data: Data_ActivityInfos = e.data;
        this.activityGroup.removeChildren();
        if (data == null || data.activityInfos == null || data.activityInfos.length < 1) {
            return;
        }
        for (let i = 0; i < data.activityInfos.length; i++) {
            const activity: ActivityButton = this.makeActivity(data.activityInfos[i]);
            if (activity != null) {
                this.activityGroup.addChild(activity);
            }
        }
    }

    private makeActivity(data: Data_ActivityInfo): ActivityButton {
        if (data.status != 0) {
            return new ActivityButton(data.index);
        } else {
            return null;
        }
    }

}

class ActivityButton extends BaseComponent implements ITipListener {
    private id: number;
    private icon: eui.Image;
    private tip: eui.Image;

    constructor(id: number) {
        super();
        this.touchChildren = true;
        this.id = id;
        this.icon.source = "resource/res/ui/home/home_activity_" + id + ".png";
        this.once(egret.Event.ADDED_TO_STAGE, this.onCreate, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onDestroy, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
    }

    protected get skinPath(): String {
        return "resource/skins/ui/home/UI_Home_ActivityButtonSkin.exml";
    }

    protected onCreate() {
        UILayer.inst.home.tips.addTip(this);
    }


    protected onDestroy() {
        UILayer.inst.home.tips.removeTip(this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
    }

    private onclick() {
        UILayer.inst.home.showActivity(this.id);
    }


    public getTipIndex(): number {
        return this.id;
    }

    public onTipStatus(status: number) {
        if (status == 0) {
            this.tip.visible = false;
        } else {
            this.tip.visible = true;
        }
    }
}