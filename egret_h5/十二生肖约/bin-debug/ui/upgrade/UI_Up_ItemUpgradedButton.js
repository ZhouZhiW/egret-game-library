var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Up_ItemUpgradedButton = (function (_super) {
    __extends(UI_Up_ItemUpgradedButton, _super);
    function UI_Up_ItemUpgradedButton() {
        var _this = _super.call(this) || this;
        _this.visible = false;
        return _this;
    }
    UI_Up_ItemUpgradedButton.prototype.onCreate = function () {
        DataManager.inst.asset.addDataListener(this.refreshAsset, this);
        this.upItemButtonA_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickButton, this);
        this.upItemButtonA_10.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickButton, this);
        this.upItemButtonA_100.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickButton, this);
        this.upItemButtonB.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickButton, this);
    };
    UI_Up_ItemUpgradedButton.prototype.onDestroy = function () {
        DataManager.inst.asset.removeDataListener(this.refreshAsset, this);
        this.upItemButtonA_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickButton, this);
        this.upItemButtonA_10.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickButton, this);
        this.upItemButtonA_100.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickButton, this);
        this.upItemButtonB.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickButton, this);
        _super.prototype.onDestroy.call(this);
    };
    UI_Up_ItemUpgradedButton.prototype.clickButton = function (e) {
        var type = 0;
        switch (e.currentTarget) {
            case this.upItemButtonA_1:
                type = 1;
                break;
            case this.upItemButtonA_10:
                type = 10;
                break;
            case this.upItemButtonA_100:
                type = 100;
                break;
            case this.upItemButtonB:
                type = 1;
                break;
        }
        this.type = type;
        if (this.upgradeMoney > this.gameMoney) {
            // switch (this.upgradeType) {
            //     case DataType_UpgradedType.Skill:
            //     case DataType_UpgradedType.Again:
            //     case DataType_UpgradedType.Call:
            //         if (this.upgradeDiamond > this.gameDiamond) {
            //             new PayDialog().setTipDiamond(this.upgradeDiamond).show();
            //         } else {
            //             new DiamondDialog().setDiamond(this.upgradeDiamond)
            //                 .setClickListener(this.gotoDiamond, this).show();
            //         }
            //         break;
            //     default:
            //         break;
            // }
            new MallsDialog().show();
        }
        else {
            if (this.upgradeType == DataType_UpgradedType.Awoke) {
                var d = new UI_Up_Selection_Dialog();
                d.show();
                return;
            }
            if (this.roleId > 0 && !DataManager.inst.roles.player.isAwoke) {
                this.showAwokeTipDialog();
                return;
            }
            if (this.upgradeType == DataType_UpgradedType.Again) {
                var d = new UI_Rank_Dialog().setText("转生后所有技能将被重置，是否继续转生").setClickListener(this.pushMessege, this);
                d.show();
                return;
            }
            this.pushMessege();
        }
    };
    UI_Up_ItemUpgradedButton.prototype.showAwokeTipDialog = function () {
        var d = new NTextDialog();
        d.setTitle("提示").setContent("星愿50级将会觉醒,将开启换装和约会功能等全新功能,建议优先升级！");
        d.addButton("继续", true, this.clickSelect, this);
        d.addButton("放弃");
        d.show();
    };
    UI_Up_ItemUpgradedButton.prototype.clickSelect = function (dialog) {
        dialog.close();
        this.pushMessege();
    };
    UI_Up_ItemUpgradedButton.prototype.pushMessege = function () {
        NetEventManager.inst.pushUpgrade(this.roleId, this.type);
    };
    UI_Up_ItemUpgradedButton.prototype.gotoDiamond = function () {
        NetEventManager.inst.pushUpgrade(this.roleId, 0);
    };
    UI_Up_ItemUpgradedButton.prototype.refreshAsset = function (e) {
        var data = e.data;
        this.gameMoney = data.clientGold;
        this.gameDiamond = data.diamond;
        this.setBtnColor();
    };
    UI_Up_ItemUpgradedButton.prototype.setBtnColor = function () {
        var color = this.gameMoney >= this.upgradeMoney ? 0xFFFFFF : 0xFE5353;
        this.upItemButtonA_1_value.textColor = color;
        this.upItemButtonB_value.textColor = color;
    };
    UI_Up_ItemUpgradedButton.prototype.setData = function (roleId, type, money, diamond) {
        this.visible = true;
        this.roleId = roleId;
        this.upgradeType = type;
        this.upgradeMoney = money;
        this.upgradeDiamond = diamond;
        this.setBtnColor();
        if (type == DataType_UpgradedType.Up) {
            this.upItemButtonA_G.visible = true;
            this.upItemButtonB_G.visible = false;
            this.upItemButtonA_1_value.text = EasyNumber.easyNum(money);
        }
        else {
            this.upItemButtonA_G.visible = false;
            this.upItemButtonB_G.visible = true;
            var tx = void 0;
            switch (type) {
                case DataType_UpgradedType.Call:
                    tx = "召唤";
                    break;
                case DataType_UpgradedType.Again:
                    tx = "转生";
                    break;
                case DataType_UpgradedType.Awoke:
                    tx = "觉醒";
                    break;
                case DataType_UpgradedType.Skill:
                default:
                    tx = "学习技能";
                    break;
            }
            this.upItemButtonB_name.text = tx;
            this.upItemButtonB_value.text = EasyNumber.easyNum(money);
        }
    };
    return UI_Up_ItemUpgradedButton;
}(BaseComponent));
__reflect(UI_Up_ItemUpgradedButton.prototype, "UI_Up_ItemUpgradedButton");
//# sourceMappingURL=UI_Up_ItemUpgradedButton.js.map