var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 相关升级信息
var Data_UpgradeRole = (function () {
    function Data_UpgradeRole(data) {
        this.data = data;
        this.skills = [];
        if (this.data == null || this.data.skills == null) {
            console.error("Data_UpgradeRole setServiceData is null!");
            return;
        }
        for (var i = 0; i < this.data.skills.length; i++) {
            this.skills.push(new Data_UpgradeRoleSkill(this.data.skills[i]));
        }
    }
    Object.defineProperty(Data_UpgradeRole.prototype, "isPlayer", {
        //0：主角 1：英雄
        get: function () {
            return this.data.type == 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_UpgradeRole.prototype, "type", {
        get: function () {
            return this.data.index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_UpgradeRole.prototype, "star", {
        get: function () {
            return this.data.star;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_UpgradeRole.prototype, "sex", {
        get: function () {
            return this.data.sex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_UpgradeRole.prototype, "level", {
        get: function () {
            return this.data.level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_UpgradeRole.prototype, "DPS", {
        get: function () {
            return this.data.dps;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_UpgradeRole.prototype, "DPSProportion", {
        get: function () {
            return this.data.dpsPercent == null ? 0 : this.data.dpsPercent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_UpgradeRole.prototype, "upgradedType", {
        get: function () {
            return this.data.skillType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_UpgradeRole.prototype, "upgradedMoney", {
        get: function () {
            return this.data.upCash;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_UpgradeRole.prototype, "upgradeDiamond", {
        get: function () {
            return this.data.upDiamond;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_UpgradeRole.prototype, "skillData", {
        get: function () {
            return this.skills;
        },
        enumerable: true,
        configurable: true
    });
    return Data_UpgradeRole;
}());
__reflect(Data_UpgradeRole.prototype, "Data_UpgradeRole");
//# sourceMappingURL=Data_UpgradeRole.js.map