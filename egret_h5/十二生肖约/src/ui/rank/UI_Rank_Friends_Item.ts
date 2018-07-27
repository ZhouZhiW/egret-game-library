class UI_Rank_Friends_Item extends eui.ItemRenderer {

    private itemData: Data_Rank_MyFriendsItem;

    private userAvatar: UI_UserAvatar;
    private playerName: eui.Label;
    private playerHoroscope: eui.Label;
    private playerDps: eui.Label;
    private playerSex: eui.Image;
    private assistorBtn: UI_BaseCostomButton;
    private skillIcon: eui.Image;
    private skillValue: eui.Label;
    private skillValueIcon: eui.Image;
    public constructor() {
        super();
        this.skinName = "resource/skins/ui/rank/UI_Rank_Friends_ItemSkin.exml";
        this.once(egret.Event.ADDED_TO_STAGE, this.onCreate, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onDestroy, this);
    }

    protected onCreate() {
        this.assistorBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClicked, this);
        // this.userAvatar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedAvater, this);
        this.assistorBtn.setStyle(0);
        this.assistorBtn.setTextSize(18);
    }

    protected onDestroy() {
        this.assistorBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClicked, this);
        // this.userAvatar.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedAvater, this);
    }

    protected dataChanged(): void {
        this.itemData = <Data_Rank_MyFriendsItem>this.data;
        this.playerDps.text = "秒伤: " + EasyNumber.easyNum(this.itemData.damage);
        this.userAvatar.setAvatar(this.itemData.rankUserAvatar);
        this.playerName.text = this.itemData.rankUserName;
        this.playerHoroscope.text = Utils.getHoroscopeName(this.itemData.rankStar);
        this.playerSex.source = Utils.getSexIconPath(this.itemData.rankSex);

        switch (this.itemData.rankBtnStatus) {
            case 0:
            case 3:
                this.assistorBtn.setText("约会");
                this.assistorBtn.enabled = true;
                break;
            case 1:
                this.assistorBtn.setText("已约");
                this.assistorBtn.enabled = false;
                break;
        }
        if (this.itemData.rankBtnStatus == 3) {
            this.skillIcon.visible = false;
            this.skillValue.visible = false;
            this.skillValueIcon.visible = false;
        } else {
            this.skillIcon.visible = true;
            this.skillValue.visible = true;
            this.skillValueIcon.visible = true;
            switch (this.itemData.rankSkillType) {
                case DataType_RankSkillType.Gold:
                    this.skillIcon.source = "resource/res/ui/rank/rk_item_skill_gold.png";
                    break;
                case DataType_RankSkillType.Chest:
                    this.skillIcon.source = "resource/res/ui/rank/rk_item_skill_chest.png";
                    break;
                case DataType_RankSkillType.Damage:
                    this.skillIcon.source = "resource/res/ui/rank/rk_item_skill_damage.png";
                    break;
                case DataType_RankSkillType.Weak:
                    this.skillIcon.source = "resource/res/ui/rank/rk_item_skill_weak.png";
                    break;
            }
            const value = this.itemData.rankSkillValue;
            if (value != "") {
                this.skillValue.text = value;
            }
        }
    }

    // private clickedAvater(e: egret.TouchEvent) {
    //     UILayer.inst.showVisit(this.itemData.rankUserID);
    //     // UILayer.inst.home.closeTab();
    // }

    private onClicked(e: egret.TouchEvent) {
        if (!DataManager.inst.roles.player.isAwoke) {
            const d = new NTextDialog();
            d.setTitle("提示").setContent("星愿还未觉醒,不能进行约会，快去升级吧。");
            d.show();
            return;
        }
        if (this.itemData.rankBtnStatus == 3) {
            const d = new NTextDialog();
            d.setTitle("提示").setContent("对方还未觉醒,不能进行约会。");
            d.show();
            return;
        }
        if (DataManager.inst.rank.kind == 1) {
            this.getDialog().show();
        } else {
            this.pushMessege();
        }
    }

    private getDialog(): NTextDialog {
        let dialog = null;
        dialog = new UI_Rank_Dialog().setText("确定取消与" + DataManager.inst.assistor.username + "的约会吗").setClickListener(this.pushMessege, this);
        return dialog;
    }

    private pushMessege() {
        NetEventManager.inst.pushAssistor(this.itemData.rankUserID, 1, 0);
        UILayer.inst.home.closeTab();
    }


}