var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Data_Rank_MyFriends = (function (_super) {
    __extends(Data_Rank_MyFriends, _super);
    function Data_Rank_MyFriends() {
        return _super.call(this) || this;
        // console.log("进入了DATA构造");
        // this.arrayType = num;
        // this.test();
    }
    Data_Rank_MyFriends.prototype.setServiceData = function (data) {
        this.data = data;
        // console.log(this.data);
        // console.log(this.data.users[1]);
        if (data.friends != null) {
            this.friends = [];
            this.arrayType = data.arrayID;
            // console.log("dataArrayID" + data.arrayID);
            for (var i = 0; i < this.data.friends.length; i++) {
                // const item = new Data_Rank_MyFriendsItem(this.data.friends[i]);
                this.friends.push(new Data_Rank_MyFriendsItem(this.data.friends[i]));
                this.friends[i].setRankNum(i);
            }
            this.callListener(BaseData.DATA_SOURCE_SERVICE);
        }
    };
    Data_Rank_MyFriends.prototype.clearData = function () {
        this.data = null;
    };
    Object.defineProperty(Data_Rank_MyFriends.prototype, "myFriendsItems", {
        get: function () {
            return this.items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank_MyFriends.prototype, "friendsUser", {
        get: function () {
            return this.friends;
        },
        enumerable: true,
        configurable: true
    });
    Data_Rank_MyFriends.prototype.setItemType = function (type) {
        this.itemtype = type;
    };
    Object.defineProperty(Data_Rank_MyFriends.prototype, "arrayID", {
        get: function () {
            return this.arrayType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Rank_MyFriends.prototype, "tpye", {
        get: function () {
            return this.itemtype;
        },
        enumerable: true,
        configurable: true
    });
    Data_Rank_MyFriends.prototype.test = function () {
        this.items = [];
        for (var i = 0; i < 5; i++) {
            var item = new Data_Rank_MyFriendsItem(0);
            item.setItemType(this.itemtype);
            this.items.push(item);
            this.items[i].setRankNum(i);
        }
    };
    Data_Rank_MyFriends.prototype.setArrayType = function (type) {
        this.arrayType = type;
    };
    return Data_Rank_MyFriends;
}(BaseData));
__reflect(Data_Rank_MyFriends.prototype, "Data_Rank_MyFriends");
//# sourceMappingURL=Data_Rank_MyFriends.js.map