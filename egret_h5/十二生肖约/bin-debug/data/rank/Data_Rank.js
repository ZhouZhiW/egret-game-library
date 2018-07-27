var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Data_Rank = (function (_super) {
    __extends(Data_Rank, _super);
    // private _resttime: number;
    function Data_Rank() {
        return _super.call(this) || this;
        // this.test();
    }
    Data_Rank.prototype.setServiceData = function (data) {
        this.data = data;
        if (data.users != null) {
            this.users = [];
            for (var i = 0; i < this.data.users.length; i++) {
                this.users.push(new Data_Rank_item(this.data.users[i]));
                if (DataManager.inst.userInfo.userId == this.data.users[i].userId) {
                    this.userRank = i + 1;
                }
            }
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    };
    Object.defineProperty(Data_Rank.prototype, "kind", {
        get: function () {
            return this.data.kind;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank.prototype, "userRankNum", {
        get: function () {
            return this.userRank;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank.prototype, "rankItems", {
        get: function () {
            return this.items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank.prototype, "rankUser", {
        get: function () {
            return this.users;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank.prototype, "rank", {
        get: function () {
            return this.data.rank;
        },
        enumerable: true,
        configurable: true
    });
    return Data_Rank;
}(BaseData));
__reflect(Data_Rank.prototype, "Data_Rank");
//# sourceMappingURL=Data_Rank.js.map