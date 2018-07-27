var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Gem_Tab = (function (_super) {
    __extends(UI_Gem_Tab, _super);
    function UI_Gem_Tab() {
        var _this = _super.call(this) || this;
        NetEventManager.inst.pushGemPanel();
        return _this;
    }
    Object.defineProperty(UI_Gem_Tab.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/gem/UI_Gem_TabSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    UI_Gem_Tab.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        this.gemTabGemGroup.setGemListener(this.clickGem, this);
        this.gemTabGrooveGroup.addGrooveListener(this.clickGroove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.TouchHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.TouchHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.TouchHandler, this);
        this.gemLottery.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.gemEss.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        DataManager.inst.gemPanel.addDataListener(this.refreshGem, this);
    };
    UI_Gem_Tab.prototype.onDestroy = function () {
        this.gemTabGemGroup.removeGemListener(this.clickGem, this);
        this.gemTabGrooveGroup.removeGrooveListener(this.clickGroove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.TouchHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.TouchHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.TouchHandler, this);
        this.gemLottery.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.gemEss.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        DataManager.inst.gemPanel.removeDataListener(this.refreshGem, this);
        if (this.touchGem != null) {
            this.touchGem.destroy();
            this.touchGem = null;
        }
        _super.prototype.onDestroy.call(this);
    };
    UI_Gem_Tab.prototype.refreshGem = function (e) {
        var data = e.data;
        this.essNums.text = EasyNumber.easyNum(data.gemPieces);
        this.groovesLevel.text = "LV. " + data.groovesLevel;
        this.gemPlayerAtt.text = Utils.numberToPre(data.gemPlayerAtt);
        this.gemPlayerCri.text = Utils.numberToPre(data.gemPlayerCri);
        this.gemPlayerCsd.text = Utils.numberToPre(data.gemPlayerCsd);
        this.gemHerosAtt.text = Utils.numberToPre(data.gemHerosAtt);
        this.gemGold.text = Utils.numberToPre(data.gemMoney);
        this.gemTabGemGroup.setData(data.gemGroupDatas);
        this.gemTabGrooveGroup.setData(data.grooveGroupDatas);
        this.gemLotteryDiamond = data.gemLotteryDiamond;
    };
    UI_Gem_Tab.prototype.equipGem = function (gem, groove) {
        NetEventManager.inst.pushEquipGem(groove.getGroupID(), gem.getMaterialData());
    };
    UI_Gem_Tab.prototype.removeGem = function (groove) {
        NetEventManager.inst.pushRemoveGem(groove.getGroupID());
    };
    UI_Gem_Tab.prototype.replaceGem = function (groove1, groove2) {
        NetEventManager.inst.pushReplaceGem(groove1.getGroupID(), groove2.getGroupID());
    };
    UI_Gem_Tab.prototype.clickGem = function (gem) {
        new UI_Gem_GemDialog(gem, this.gemTabGrooveGroup.getNullGroove(), this.getGemLotteryDialog()).show();
    };
    UI_Gem_Tab.prototype.clickGroove = function (groove) {
        switch (groove.getMaterialData().getGemType()) {
            case DataType_GemType.Lock:
            case DataType_GemType.UnLock:
                var dialog = new UI_Gem_GrooveLockDialog();
                dialog.setData(groove);
                dialog.setBtn();
                dialog.show();
                break;
            default:
                new UI_Gem_GrooveDialog(groove).show();
                break;
        }
    };
    UI_Gem_Tab.prototype.TouchHandler = function (e) {
        var x = e.stageX;
        var y = e.stageY;
        switch (e.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                var v = null;
                v = this.gemTabGemGroup.checkSelectGem(x, y);
                v = v == null ? this.gemTabGrooveGroup.checkSelectGroove(x, y) : v;
                this.touchGem.setDataGem(v);
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                this.touchGem.setPoint(this.globalToLocal(x, y));
                break;
            case egret.TouchEvent.TOUCH_END:
                var dataGem = this.touchGem.getDataGem();
                if (dataGem == null) {
                    return;
                }
                if (dataGem instanceof UI_Gem_Gem) {
                    var groove = this.gemTabGrooveGroup.checkEquipGroove(x, y); //镶嵌宝石
                    if (groove != null && groove.getType() != DataType_GemType.Lock && groove.getType() != DataType_GemType.UnLock) {
                        groove.setMaterialData(this.touchGem.getDataGem().getMaterialData()); // 表现辅助 提前与服务器数据
                        this.equipGem(this.touchGem.getDataGem(), groove);
                    }
                }
                else if (dataGem instanceof UI_Gem_Groove) {
                    if (!this.gemTabGrooveGroup.checkArea(x, y)) {
                        this.touchGem.getDataGem().setMaterialData(null); // 表现辅助 提前与服务器数据
                        this.removeGem(this.touchGem.getDataGem());
                    }
                    var groove = this.gemTabGrooveGroup.checkEquipGroove(x, y); // 替换宝石
                    if (groove != null && groove.getType() != DataType_GemType.Lock && groove.getType() != DataType_GemType.UnLock) {
                        if (this.touchGem.getDataGem().getGroupID() != groove.getGroupID()) {
                            // 表现辅助 提前与服务器数据 start
                            var temp = this.touchGem.getDataGem().getMaterialData();
                            this.touchGem.getDataGem().setMaterialData(groove.getMaterialData());
                            groove.setMaterialData(temp);
                            // end
                            this.replaceGem(this.touchGem.getDataGem(), groove);
                        }
                    }
                }
                this.touchGem.setDataGem(null);
                break;
        }
    };
    UI_Gem_Tab.prototype.clickBtn = function (e) {
        var tag = e.currentTarget;
        switch (tag) {
            case this.gemLottery:
                this.getGemLotteryDialog().show();
                break;
            case this.gemEss:
                var essDialog = new UI_Gem_EssDialog();
                essDialog.show();
                break;
        }
    };
    UI_Gem_Tab.prototype.getGemLotteryDialog = function () {
        var dialog = null;
        if (this.gemLotteryDiamond > DataManager.inst.asset.diamond) {
            dialog = new PayDialog().setTipDiamond(this.gemLotteryDiamond);
        }
        else {
            dialog = new DiamondDialog().setDiamondInfo("   亲，您确定消耗“" + this.gemLotteryDiamond + "”钻石购买一个随机宝箱吗")
                .setClickListener(this.gotoDiamond, this);
        }
        return dialog;
    };
    UI_Gem_Tab.prototype.gotoDiamond = function () {
        NetEventManager.inst.pushGemLottery();
    };
    return UI_Gem_Tab;
}(BaseComponent));
__reflect(UI_Gem_Tab.prototype, "UI_Gem_Tab");
//# sourceMappingURL=UI_Gem_Tab.js.map