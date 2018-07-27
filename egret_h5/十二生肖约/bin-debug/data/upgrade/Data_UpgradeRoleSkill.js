var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 技能相关升级信息
var Data_UpgradeRoleSkill = (function () {
    function Data_UpgradeRoleSkill(data) {
        this.data = data;
        if (this.data == null) {
            console.error("Data_UpgradeRoleSkill setServiceData is null!");
            return;
        }
    }
    Object.defineProperty(Data_UpgradeRoleSkill.prototype, "type", {
        get: function () {
            return this.data.index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_UpgradeRoleSkill.prototype, "status", {
        get: function () {
            return this.data.open;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_UpgradeRoleSkill.prototype, "value", {
        get: function () {
            return this.data.encrease;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_UpgradeRoleSkill.prototype, "lockLevel", {
        get: function () {
            return this.data.openLevel;
        },
        enumerable: true,
        configurable: true
    });
    return Data_UpgradeRoleSkill;
}());
__reflect(Data_UpgradeRoleSkill.prototype, "Data_UpgradeRoleSkill");
//# sourceMappingURL=Data_UpgradeRoleSkill.js.map