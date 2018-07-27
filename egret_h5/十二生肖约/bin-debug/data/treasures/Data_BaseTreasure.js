var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Data_BaseTreasure = (function () {
    function Data_BaseTreasure(data) {
        this.data = null;
        this.data = data;
    }
    Object.defineProperty(Data_BaseTreasure.prototype, "baseData", {
        get: function () {
            return this.data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_BaseTreasure.prototype, "type", {
        get: function () {
            return this.data.type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_BaseTreasure.prototype, "value", {
        get: function () {
            return this.data.value;
        },
        enumerable: true,
        configurable: true
    });
    return Data_BaseTreasure;
}());
__reflect(Data_BaseTreasure.prototype, "Data_BaseTreasure");
//# sourceMappingURL=Data_BaseTreasure.js.map