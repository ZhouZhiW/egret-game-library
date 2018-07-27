var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Data_Daily_Item = (function () {
    function Data_Daily_Item(data) {
        this.data = data;
        // this.reward = reward;
        // this.caption = caption;
        // this.type = type;
        if (data.rewards != null) {
            this.materials = [];
            for (var i = 0; i < data.rewards.length; i++) {
                this.materials.push(new Data_Material(data.rewards[i]));
            }
        }
    }
    Object.defineProperty(Data_Daily_Item.prototype, "index", {
        get: function () {
            return this.data.index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Daily_Item.prototype, "description", {
        get: function () {
            return this.data.description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Daily_Item.prototype, "state", {
        get: function () {
            return this.data.state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Daily_Item.prototype, "rewards", {
        get: function () {
            return this.materials;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Daily_Item.prototype, "restDay", {
        get: function () {
            return this.data.restDay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Daily_Item.prototype, "btnType", {
        get: function () {
            return this.type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Daily_Item.prototype, "captionTx", {
        get: function () {
            return this.caption;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Daily_Item.prototype, "rewardTx", {
        get: function () {
            return this.reward;
        },
        enumerable: true,
        configurable: true
    });
    return Data_Daily_Item;
}());
__reflect(Data_Daily_Item.prototype, "Data_Daily_Item");
//# sourceMappingURL=Data_Daily_Item.js.map