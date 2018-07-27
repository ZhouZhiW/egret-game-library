var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Data_Backpack_Mail_Reward = (function () {
    function Data_Backpack_Mail_Reward(n, type) {
        // this.data = data;
        this.num = n;
        this.datatype = type;
    }
    Object.defineProperty(Data_Backpack_Mail_Reward.prototype, "type", {
        get: function () {
            // return this.data.type;
            return this.datatype;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Backpack_Mail_Reward.prototype, "value", {
        get: function () {
            // return this.data.value;
            return this.num;
        },
        enumerable: true,
        configurable: true
    });
    return Data_Backpack_Mail_Reward;
}());
__reflect(Data_Backpack_Mail_Reward.prototype, "Data_Backpack_Mail_Reward");
//# sourceMappingURL=Data_Backpack_Mail_Reward.js.map