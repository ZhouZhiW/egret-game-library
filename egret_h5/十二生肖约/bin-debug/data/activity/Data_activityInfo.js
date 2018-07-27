var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Data_ActivityInfo = (function () {
    function Data_ActivityInfo(data) {
        this.data = data;
    }
    Object.defineProperty(Data_ActivityInfo.prototype, "index", {
        get: function () {
            return this.data.index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_ActivityInfo.prototype, "status", {
        get: function () {
            return this.data.status;
        },
        enumerable: true,
        configurable: true
    });
    return Data_ActivityInfo;
}());
__reflect(Data_ActivityInfo.prototype, "Data_ActivityInfo");
//# sourceMappingURL=Data_activityInfo.js.map