var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Rank_Friends_Item = (function (_super) {
    __extends(UI_Rank_Friends_Item, _super);
    function UI_Rank_Friends_Item() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/ui/rank/UI_Rank_Friends_ItemSkin.exml";
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onCreate, _this);
        _this.once(egret.Event.REMOVED_FROM_STAGE, _this.onDestroy, _this);
        return _this;
    }
    UI_Rank_Friends_Item.prototype.onCreate = function () {
        this.assistorBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClicked, this);
        // this.userAvatar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedAvater, this);
        this.assistorBtn.setStyle(0);
        this.assistorBtn.setTextSize(18);
    };
    UI_Rank_Friends_Item.prototype.onDestroy = function () {
        this.assistorBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClicked, this);
        // this.userAvatar.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedAvater, this);
    };
    UI_Rank_Friends_Item.prototype.dataChanged = function () {
        this.itemData = this.data;
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
    // private clickedAvater(e: egret.TouchEvent) {
    //     UILayer.inst.showVisit(this.itemData.rankUserID);
    //     // UILayer.inst.home.closeTab();
    // }
    UI_Rank_Friends_Item.prototype.onClicked = function (e) {
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
        if (DataManager.inst.rank.kind == 1) {
            this.getDialog().show();
        }
        else {
            this.pushMessege();
        }
    };
    UI_Rank_Friends_Item.prototype.getDialog = function () {
        var dialog = null;
        dialog = new UI_Rank_Dialog().setText("确定取消与" + DataManager.inst.assistor.username + "的约会吗").setClickListener(this.pushMessege, this);
        return dialog;
    };
    UI_Rank_Friends_Item.prototype.pushMessege = function () {
        NetEventManager.inst.pushAssistor(this.itemData.rankUserID, 1, 0);
        UILayer.inst.home.closeTab();
    };
    return UI_Rank_Friends_Item;
}(eui.ItemRenderer));
__reflect(UI_Rank_Friends_Item.prototype, "UI_Rank_Friends_Item");
//# sourceMappingURL=UI_Rank_Friends_Item.js.map