var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Data_Online_Item = (function () {
    function Data_Online_Item(data) {
        this.data = data;
        this.count = 0;
        if (data.rewards != null) {
            this.materials = [];
            for (var i = 0; i < data.rewards.length; i++) {
                this.materials.push(new Data_Material(data.rewards[i]));
            }
        }
    }
    Object.defineProperty(Data_Online_Item.prototype, "state", {
        get: function () {
            return this.data.state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Online_Item.prototype, "description", {
        get: function () {
            return this.data.description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Online_Item.prototype, "timeCount", {
        get: function () {
            return ++this.count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Online_Item.prototype, "time", {
        get: function () {
            return this.data.time;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Online_Item.prototype, "rewards", {
        get: function () {
            return this.materials;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Online_Item.prototype, "index", {
        get: function () {
            return this.data.index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Online_Item.prototype, "sumOnlineTime", {
        get: function () {
            return this.data.sumOnlineTime;
        },
        enumerable: true,
        configurable: true
    });
    return Data_Online_Item;
}());
__reflect(Data_Online_Item.prototype, "Data_Online_Item");
//# sourceMappingURL=Data_Online_Item.js.map