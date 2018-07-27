var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Rank_Rank_Item = (function (_super) {
    __extends(UI_Rank_Rank_Item, _super);
    function UI_Rank_Rank_Item() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/ui/rank/UI_Rank_Rank_ItemSkin.exml";
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onCreate, _this);
        _this.once(egret.Event.REMOVED_FROM_STAGE, _this.onDestroy, _this);
        return _this;
    }
    UI_Rank_Rank_Item.prototype.onCreate = function () {
        this.assistorBtn.setTextSize(16);
        // this.userAvatar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedAvater, this);
        this.assistorBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClicked, this);
    };
    UI_Rank_Rank_Item.prototype.onDestroy = function () {
        // this.userAvatar.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedAvater, this);
        this.assistorBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClicked, this);
        if (this.assistorAvatar.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.assistorAvatar.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedAssistor, this);
        }
    };
    UI_Rank_Rank_Item.prototype.dataChanged = function () {
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
        }
        if (this.itemData.rankBtnStatus == 3) {
            this.skillIcon.visible = false;
            this.skillValue.visible = false;
            this.skillValueIcon.visible = false;
        }
        else {
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
            var value = this.itemData.rankSkillValue;
            if (value != "") {
                this.skillValue.text = value;
            }
        }
    };
    UI_Rank_Rank_Item.prototype.setAssistorStatus = function (isShow) {
        if (this.assistorAvatar.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.assistorAvatar.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedAssistor, this);
        }
        this.assistorAvatar.removeEventListener;
        this.assistorName.visible = isShow;
        this.assistorAvatar.visible = isShow;
        this.assistorTime.visible = isShow;
        if (isShow) {
            this.assistorName.text = this.itemData.rankDateName;
            this.assistorAvatar.setAvatar(this.itemData.rankDateAvatar);
            this.assistorTime.text = Utils.formatLongTime(this.itemData.restTime);
            this.assistorAvatar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedAssistor, this);
        }
    };
    UI_Rank_Rank_Item.prototype.setRank = function (rank) {
        if (rank < 4) {
            if (this.rankView == null) {
                this.rankView = this.makeRankView(rank);
            }
            else if (!(this.rankView instanceof eui.Image)) {
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
        }
        else {
            if (this.rankView == null) {
                this.rankView = this.makeRankView(rank);
            }
            else if (!(this.rankView instanceof eui.Label)) {
                this.removeChild(this.rankView);
                this.rankView = this.makeRankView(rank);
            }
            this.rankView.text = "" + rank;
        }
    };
    UI_Rank_Rank_Item.prototype.makeRankView = function (rank) {
        var v = null;
        if (rank < 4) {
            v = new eui.Image();
            v.x = 7;
            v.y = 2;
        }
        else {
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
    };
    UI_Rank_Rank_Item.prototype.timerEvent = function () {
        if (this.assistorTime.visible) {
            var offsetTime = this.itemData.restTime + this.itemData.timeCount;
            this.assistorTime.text = Utils.formatLongTime(offsetTime);
        }
    };
    // private clickedAvater(e: egret.TouchEvent) {
    //     UILayer.inst.showVisit(this.itemData.rankUserID);
    //     // UILayer.inst.home.closeTab();
    // }
    UI_Rank_Rank_Item.prototype.clickedAssistor = function (e) {
        if (this.itemData.rankBtnStatus == 2) {
            this.getRobDialog();
        }
    };
    UI_Rank_Rank_Item.prototype.onClicked = function (e) {
        if (1 == DataManager.inst.rank.kind) {
            this.getDialog().show();
        }
        else {
            if (!DataManager.inst.roles.player.isAwoke) {
                var d = new NTextDialog();
                d.setTitle("提示").setContent("星愿还未觉醒,不能进行约会，快去升级吧。");
                d.show();
                return;
            }
            if (this.itemData.rankBtnStatus == 3) {
                var d = new NTextDialog();
                d.setTitle("提示").setContent("对方还未觉醒,不能进行约会。");
                d.show();
                return;
            }
            if (DataManager.inst.asset.diamond < this.itemData.rankDiamond) {
                var d = new PayDialog();
                d.setTipDiamond(this.itemData.rankDiamond);
                d.show();
            }
            else {
                this.pushMessege();
            }
        }
    };
    UI_Rank_Rank_Item.prototype.getDialog = function () {
        var dialog = null;
        dialog = new UI_Rank_Dialog().setText("确定取消与" + DataManager.inst.assistor.username + "的约会吗").setClickListener(this.pushMessege, this);
        return dialog;
    };
    UI_Rank_Rank_Item.prototype.pushMessege = function () {
        NetEventManager.inst.pushAssistor(this.itemData.rankUserID, 0, 0);
        UILayer.inst.home.closeTab();
    };
    UI_Rank_Rank_Item.prototype.getRobDialog = function () {
        var dialog = new UI_Rank_Dialog();
        dialog.setText("确定消费" + this.itemData.rankDiamond + "钻石完成抢约吗");
        dialog.setClickListener(this.pushMessege, this);
        dialog.show();
    };
    return UI_Rank_Rank_Item;
}(eui.ItemRenderer));
__reflect(UI_Rank_Rank_Item.prototype, "UI_Rank_Rank_Item");
//# sourceMappingURL=UI_Rank_Rank_Item.js.map