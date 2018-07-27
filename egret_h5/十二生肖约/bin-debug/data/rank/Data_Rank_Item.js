var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DataType_RankSkillType;
(function (DataType_RankSkillType) {
    DataType_RankSkillType[DataType_RankSkillType["Gold"] = 0] = "Gold";
    DataType_RankSkillType[DataType_RankSkillType["Chest"] = 1] = "Chest";
    DataType_RankSkillType[DataType_RankSkillType["Damage"] = 2] = "Damage";
    DataType_RankSkillType[DataType_RankSkillType["Weak"] = 3] = "Weak";
})(DataType_RankSkillType || (DataType_RankSkillType = {}));
; //Gold 增加金币掉落, Chest 宝箱时间, Damage 伤害, Weak 怪物虚弱
var Data_Rank_item = (function () {
    function Data_Rank_item(data) {
        this.data = data;
        this.count = 0;
    }
    Object.defineProperty(Data_Rank_item.prototype, "timeCount", {
        get: function () {
            return ++this.count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank_item.prototype, "restTime", {
        get: function () {
            return this.data.restTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank_item.prototype, "saveTime", {
        get: function () {
            return this.data.saveTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank_item.prototype, "rankSex", {
        get: function () {
            return this.data.userSex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank_item.prototype, "rankUserName", {
        get: function () {
            return this.data.username;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank_item.prototype, "rankUserAvatar", {
        get: function () {
            return this.data.userAvatar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank_item.prototype, "rankStar", {
        get: function () {
            return this.data.userStar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank_item.prototype, "rankRank", {
        get: function () {
            return this.data.rank;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank_item.prototype, "rankSkillType", {
        get: function () {
            return this.data.rankSkillType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank_item.prototype, "rankSkillValue", {
        get: function () {
            return this.data.rankSkillValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank_item.prototype, "rankBtnStatus", {
        // public get rankGold(): string {//金币收益
        //     return this.data.goldPercent;
        // }
        // public get rankFragment(): string {//底座碎片收益
        //     return this.data.appointmentBaseEssencePercent;
        // }
        // public get rankEssence(): string {//宝石精华收益
        //     return this.data.masterBaseEssencePercent;
        // }
        // public get rankGem(): string {//宝石收益
        //     return this.data.gemPercent;
        // }
        get: function () {
            return this.data.btnStatus;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank_item.prototype, "rankUserID", {
        get: function () {
            return this.data.userId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank_item.prototype, "rankDps", {
        get: function () {
            return this.data.damage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank_item.prototype, "rankDateAvatar", {
        get: function () {
            return this.data.appointmentAvatar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank_item.prototype, "rankDateName", {
        get: function () {
            return this.data.appointmentName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank_item.prototype, "rankDiamond", {
        get: function () {
            return this.data.diamond;
        },
        enumerable: true,
        configurable: true
    });
    return Data_Rank_item;
}());
__reflect(Data_Rank_item.prototype, "Data_Rank_item");
//# sourceMappingURL=Data_Rank_Item.js.map