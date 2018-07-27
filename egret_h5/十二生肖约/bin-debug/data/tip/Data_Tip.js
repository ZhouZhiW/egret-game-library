var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Data_Tip = (function () {
    function Data_Tip(data) {
        this.data = data;
    }
    Object.defineProperty(Data_Tip.prototype, "index", {
        get: function () {
            return this.data.index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Tip.prototype, "status", {
        get: function () {
            return this.data.status;
        },
        enumerable: true,
        configurable: true
    });
    return Data_Tip;
}());
__reflect(Data_Tip.prototype, "Data_Tip");
//# sourceMappingURL=Data_Tip.js.map