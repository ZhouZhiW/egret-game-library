var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Home_Offline_Dialog = (function (_super) {
    __extends(UI_Home_Offline_Dialog, _super);
    function UI_Home_Offline_Dialog(data) {
        var _this = _super.call(this) || this;
        _this.offlineTime.text = Utils.formatLongTime(data.offlineTime);
        for (var i = 0; i < data.offlineMaterials.length; i++) {
            var material = new UI_Home_offline_Material(data.offlineMaterials[i]);
            _this.materialGroup.addChild(material);
            _this.offlineInfo.text = _this.getofflineInfo();
        }
        return _this;
    }
    UI_Home_Offline_Dialog.prototype.getofflineInfo = function () {
        switch (DataManager.inst.userInfo.vipType) {
            case 0:
                return "当前用户最多累计6小时离线奖励\n月卡或终身卡可增加离线收益";
            case 1:
                return "月卡用户最多累计9小时离线奖励\n终身卡可增加离线收益";
            case 2:
                return "终身卡用户最多累计12小时离线收益";
        }
    };
    Object.defineProperty(UI_Home_Offline_Dialog.prototype, "style", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UI_Home_Offline_Dialog.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/home/UI_Home_Offline_DialogSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    return UI_Home_Offline_Dialog;
}(CustomDialog));
__reflect(UI_Home_Offline_Dialog.prototype, "UI_Home_Offline_Dialog");
var UI_Home_offline_Material = (function (_super) {
    __extends(UI_Home_offline_Material, _super);
    function UI_Home_offline_Material(data) {
        var _this = _super.call(this) || this;
        _this.subscriptMaterial.setMaterialData(data);
        _this.materialName.text = data.name;
        return _this;
    }
    Object.defineProperty(UI_Home_offline_Material.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/home/UI_Home_offline_MaterialSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    UI_Home_offline_Material.prototype.onCreate = function () {
    };
    UI_Home_offline_Material.prototype.onDestroy = function () {
    };
    return UI_Home_offline_Material;
}(BaseComponent));
__reflect(UI_Home_offline_Material.prototype, "UI_Home_offline_Material");
//# sourceMappingURL=UI_Home_Offline_Dialog.js.map