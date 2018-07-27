var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Data_Rank_MyFriendsItem = (function () {
    function Data_Rank_MyFriendsItem(data) {
        this.data = data;
    }
    Data_Rank_MyFriendsItem.prototype.getItemTyp = function () {
        return this.itemType;
    };
    Object.defineProperty(Data_Rank_MyFriendsItem.prototype, "rankNum", {
        get: function () {
            return this.Num;
        },
        enumerable: true,
        configurable: true
    });
    Data_Rank_MyFriendsItem.prototype.setItemType = function (type) {
        this.itemType = type;
    };
    Data_Rank_MyFriendsItem.prototype.setRankNum = function (index) {
        this.Num = index + 1;
    };
    Object.defineProperty(Data_Rank_MyFriendsItem.prototype, "rankUserName", {
        get: function () {
            return this.data.nickName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank_MyFriendsItem.prototype, "rankRestTime", {
        get: function () {
            return this.data.restTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank_MyFriendsItem.prototype, "rankUserAvatar", {
        get: function () {
            return this.data.userAvatar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank_MyFriendsItem.prototype, "rankStar", {
        get: function () {
            return this.data.userStar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank_MyFriendsItem.prototype, "rankSex", {
        get: function () {
            return this.data.userSex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank_MyFriendsItem.prototype, "rankBtnStatus", {
        get: function () {
            return this.data.btnStatus;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank_MyFriendsItem.prototype, "rankUserID", {
        get: function () {
            return this.data.userId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank_MyFriendsItem.prototype, "damage", {
        get: function () {
            return this.data.damage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank_MyFriendsItem.prototype, "rankSkillType", {
        get: function () {
            return this.data.rankSkillType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank_MyFriendsItem.prototype, "rankSkillValue", {
        get: function () {
            return this.data.rankSkillValue;
        },
        enumerable: true,
        configurable: true
    });
    return Data_Rank_MyFriendsItem;
}());
__reflect(Data_Rank_MyFriendsItem.prototype, "Data_Rank_MyFriendsItem");
//# sourceMappingURL=Data_Rank_MyFriendsItem.js.map