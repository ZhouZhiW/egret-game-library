var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Backpack_MailDialog = (function (_super) {
    __extends(UI_Backpack_MailDialog, _super);
    function UI_Backpack_MailDialog(id) {
        var _this = _super.call(this) || this;
        _this.bpID = id;
        _this.delBtn = _this.addButton("删除", true, _this.clickDelBtn, _this);
        _this.getBtn = _this.addButton("领取", true, _this.clickGetBtn, _this);
        NetEventManager.inst.pushEMail(id, 0);
        return _this;
    }
    UI_Backpack_MailDialog.prototype.onCreate = function () {
    };
    UI_Backpack_MailDialog.prototype.onDestroy = function () {
    };
    UI_Backpack_MailDialog.prototype.setData = function (data) {
        this.titleTx.text = data.getMailTitle();
        this.contentTx.text = data.getMailContent();
        this.timeTx.text = data.getDate();
        this.endTime.text = data.getExpireTime();
        this.rewardGroup.removeChildren();
        this.gemGroup.removeChildren();
        data.analysisIconRewards();
        if (data.getIconRewards() != null) {
            for (var i = 0; i < data.getIconRewards().length; i++) {
                var reward = new IconImageMaterial();
                reward.setMaterialData(data.getIconRewards[i]);
                this.rewardGroup.addChild(reward);
            }
        }
        data.analysisGemRewards();
        if (data.getGemRewards() != null) {
            for (var i = 0; i < data.getGemRewards().length; i++) {
                var gem = new UI_Gem_Gem();
                gem.setMaterialData(data.getGemRewards[i]);
                gem.setListener(this.clickedGem, this);
                this.rewardGroup.addChild(gem);
            }
        }
        if (data.getReceiveState() == 0) {
            this.getBtn.enabled = true;
        }
        if (data.getReceiveState() == 1 || data.getReceiveState() == 2) {
            this.getBtn.enabled = false;
        }
    };
    UI_Backpack_MailDialog.prototype.clickedGem = function (gem) {
        var dialog = new NTextDialog();
        dialog.setTitle(UI_Tre_GemConfig.getGemName(gem.getMaterialData().getGemType(), gem.getMaterialData().getGemLevel()) + "  x" + gem.getMaterialData().getCounts());
        dialog.setContent(UI_Tre_GemConfig.getAttributesInfo(gem.getMaterialData().getGemType(), gem.getMaterialData().gemAttributes));
        dialog.show();
    };
    UI_Backpack_MailDialog.prototype.clickGetBtn = function (d) {
        d.close();
        NetEventManager.inst.pushEMail(this.bpID, 1);
    };
    UI_Backpack_MailDialog.prototype.clickDelBtn = function (d) {
        this.tipsDialog = new NTextDialog();
        this.tipsDialog.setContent("确定删除此封邮件吗");
        this.tipsDialog.addButton("确定", true, this.clickedBtn, this);
        this.tipsDialog.show();
    };
    UI_Backpack_MailDialog.prototype.clickedBtn = function (d) {
        NetEventManager.inst.pushEMail(this.bpID, 2);
        this.close();
        this.tipsDialog.close();
    };
    Object.defineProperty(UI_Backpack_MailDialog.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/backpack/UI_Backpack_MailDialogSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UI_Backpack_MailDialog.prototype, "style", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    return UI_Backpack_MailDialog;
}(CustomDialog));
__reflect(UI_Backpack_MailDialog.prototype, "UI_Backpack_MailDialog");
//# sourceMappingURL=UI_Backpack_MailDialog.js.map