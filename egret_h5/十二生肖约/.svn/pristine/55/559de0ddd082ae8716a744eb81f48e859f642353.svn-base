var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Data_HeroTowerRole = (function () {
    function Data_HeroTowerRole(data) {
        this.skills = [];
        this.data = data;
        if (this.data == null) {
            console.error("Data_HeroTowerRole setServiceData is null!");
            return;
        }
        for (var i = 0; i < this.data.skills.length; i++) {
            this.skills.push(new Data_HeroTowerRoleSkills(this.data.skills[i]));
        }
    }
    Object.defineProperty(Data_HeroTowerRole.prototype, "isPlayer", {
        get: function () {
            return this.data.type == 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_HeroTowerRole.prototype, "type", {
        get: function () {
            return this.data.index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_HeroTowerRole.prototype, "star", {
        get: function () {
            return this.data.star;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_HeroTowerRole.prototype, "sex", {
        get: function () {
            return this.data.sex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_HeroTowerRole.prototype, "level", {
        get: function () {
            return this.data.level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_HeroTowerRole.prototype, "DPS", {
        get: function () {
            return this.data.dps;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_HeroTowerRole.prototype, "DPSProportion", {
        get: function () {
            return this.data.dpsPercent == null ? 0 : this.data.dpsPercent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_HeroTowerRole.prototype, "upgradedType", {
        get: function () {
            return this.data.skillType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_HeroTowerRole.prototype, "upgradedMoney", {
        get: function () {
            return this.data.upCash;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_HeroTowerRole.prototype, "upgradeDiamond", {
        get: function () {
            return this.data.upDiamond;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_HeroTowerRole.prototype, "skillData", {
        get: function () {
            return this.skills;
        },
        enumerable: true,
        configurable: true
    });
    return Data_HeroTowerRole;
}());
__reflect(Data_HeroTowerRole.prototype, "Data_HeroTowerRole");
//# sourceMappingURL=Data_HeroTowerRole.js.map