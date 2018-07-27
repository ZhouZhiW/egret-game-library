class UI_Rank_Rank_Item extends eui.ItemRenderer {
    private itemData: Data_Rank_item;
    private rankView;

    private userAvatar: UI_UserAvatar;
    private playerName: eui.Label;
    private playerHoroscope: eui.Label;
    private playerDps: eui.Label;
    private playerSex: eui.Image;
    private assistorName: eui.Label;
    private assistorTime: eui.Label;
    private assistorBtn: UI_BaseCostomButton;
    private assistorAvatar: UI_Rank_AssistorAvatar;

    private skillIcon: eui.Image;
    private skillValue: eui.Label;
    private skillValueIcon: eui.Image;

    public constructor() {
        super();
        this.skinName = "resource/skins/ui/rank/UI_Rank_Rank_ItemSkin.exml";
        this.once(egret.Event.ADDED_TO_STAGE, this.onCreate, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onDestroy, this);
    }

    protected onCreate() {
        this.assistorBtn.setTextSize(16);
        // this.userAvatar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedAvater, this);
        this.assistorBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClicked, this);


    }

    protected onDestroy() {
        // this.userAvatar.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedAvater, this);
        this.assistorBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClicked, this);
        if (this.assistorAvatar.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.assistorAvatar.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedAssistor, this);
        }
    }

    protected dataChanged(): void {
        this.itemData = this.data;
        this.userAvatar.setAvatar(this.itemData.rankUserAvatar);
        this.setRank(this.itemData.rankRank);
        this.playerName.text = this.itemData.rankUserName;
        this.playerHoroscope.text = Utils.getHoroscopeName(this.itemData.rankStar);
        this.playerDps.text = "秒伤: " + EasyNumber.easyNum(this.itemData.rankDps);
        this.playerSex.source = Utils.getSexIconPath(this.itemData.rankSex);



        switch (this.itemData.rankBtnStatus) {
            case 0:
            case 3:
                this.assistorBtn.setStyle(1);
                this.assistorBtn.setIcon(0);
                this.assistorBtn.setIconSize(18);
                this.assistorBtn.setText("约会");
                this.assistorBtn.setValue(this.itemData.rankDiamond);
                this.setAssistorStatus(false);
                this.assistorBtn.visible = true;
                this.assistorBtn.enabled = true;
                break;
            case 1:
                this.assistorBtn.setStyle(0);
                this.assistorBtn.setText("约会中");
                this.setAssistorStatus(true);
                this.assistorBtn.visible = false;
                this.assistorBtn.enabled = false;
                this.assistorAvatar.setTitle(0);
                break;
            case 2:
                this.assistorBtn.setStyle(1);
                this.assistorBtn.setIcon(0);
                this.assistorBtn.setIconSize(18);
                this.assistorBtn.setText("抢约");
                this.assistorBtn.setValue(this.itemData.rankDiamond);
                this.setAssistorStatus(true);
                this.assistorBtn.visible = false;
                this.assistorBtn.enabled = true;
                this.assistorAvatar.setTitle(1);
                break;
            // case 3:
            //     this.assistorBtn.setStyle(0);
            //     this.assistorBtn.setText("约会");
            //     this.setAssistorStatus(false);
            //     this.assistorBtn.visible = true;
            //     this.assistorBtn.enabled = false;
            //     break;
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

    private setAssistorStatus(isShow: boolean) {
        if (this.assistorAvatar.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.assistorAvatar.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedAssistor, this);
        }
        this.assistorAvatar.removeEventListener
        this.assistorName.visible = isShow;
        this.assistorAvatar.visible = isShow;
        this.assistorTime.visible = isShow;
        if (isShow) {
            this.assistorName.text = this.itemData.rankDateName;
            this.assistorAvatar.setAvatar(this.itemData.rankDateAvatar);
            this.assistorTime.text = Utils.formatLongTime(this.itemData.restTime);
            this.assistorAvatar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedAssistor, this);
        }
    }


    private setRank(rank: number) {
        if (rank < 4) {
            if (this.rankView == null) {
                this.rankView = this.makeRankView(rank);
            } else if (!(this.rankView instanceof eui.Image)) {
                this.removeChild(this.rankView);
                this.rankView = this.makeRankView(rank);

            }
            switch (rank) {
                case 1:
                    this.rankView.source = "resource/res/ui/rank/rk_item_crown_G.png";
                    break;
                case 2:
                    this.rankView.source = "resource/res/ui/rank/rk_item_crown_S.png";
                    break;
                case 3:
                    this.rankView.source = "resource/res/ui/rank/rk_item_crown_C.png";
                    break;
            }

        } else {
            if (this.rankView == null) {
                this.rankView = this.makeRankView(rank);
            } else if (!(this.rankView instanceof eui.Label)) {
                this.removeChild(this.rankView);
                this.rankView = this.makeRankView(rank);
            }
            this.rankView.text = "" + rank;
        }
    }

    private makeRankView(rank: number): egret.DisplayObject {
        let v = null;
        if (rank < 4) {
            v = new eui.Image();
            v.x = 7;
            v.y = 2;
        } else {
            v = new eui.Label();
            v.size = 24;
            v.fontFamily = "黑体";
            v.bold = true;
            v.textColor = 0xf3f3f3;
            v.stroke = 2;
            v.strokeColor = 0x675444;
            v.x = 16;
            v.y = 12;
        }
        this.addChild(v);
        return v;
    }

    public timerEvent() {
        if (this.assistorTime.visible) {
            const offsetTime = this.itemData.restTime + this.itemData.timeCount;
            this.assistorTime.text = Utils.formatLongTime(offsetTime);
            // if (this.itemData.saveTime > 0 && this.itemData.saveTime < offsetTime) {
            //     UI_Rank_Rank_Tab.refresh();
            // }
        }
    }

    // private clickedAvater(e: egret.TouchEvent) {
    //     UILayer.inst.showVisit(this.itemData.rankUserID);
    //     // UILayer.inst.home.closeTab();
    // }



    private clickedAssistor(e: egret.TouchEvent) {
        if (this.itemData.rankBtnStatus == 2) {
            this.getRobDialog();
        }
    }

    private onClicked(e: egret.TouchEvent) {
        if (1 == DataManager.inst.rank.kind) {
            this.getDialog().show();
        } else {
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
            if (DataManager.inst.asset.diamond < this.itemData.rankDiamond) {
                const d = new PayDialog();
                d.setTipDiamond(this.itemData.rankDiamond);
                d.show();
            } else {
                this.pushMessege();
            }
        }
    }


    private getDialog(): NTextDialog {
        let dialog = null;
        dialog = new UI_Rank_Dialog().setText("确定取消与" + DataManager.inst.assistor.username + "的约会吗").setClickListener(this.pushMessege, this);
        return dialog;
    }

    private pushMessege() {
        NetEventManager.inst.pushAssistor(this.itemData.rankUserID, 0, 0);
        UILayer.inst.home.closeTab();
    }

    private getRobDialog() {
        const dialog = new UI_Rank_Dialog();
        dialog.setText("确定消费" + this.itemData.rankDiamond + "钻石完成抢约吗");
        dialog.setClickListener(this.pushMessege, this);
        dialog.show();
    }



}