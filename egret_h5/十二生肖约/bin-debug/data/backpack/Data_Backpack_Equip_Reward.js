var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Data_Backpack_Equip_Reward = (function () {
    function Data_Backpack_Equip_Reward(data) {
        this.data = data;
    }
    Object.defineProperty(Data_Backpack_Equip_Reward.prototype, "rewardName", {
        get: function () {
            return this.data.rewardName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Backpack_Equip_Reward.prototype, "rewardValue", {
        get: function () {
            return this.data.rewardValue;
        },
        enumerable: true,
        configurable: true
    });
    return Data_Backpack_Equip_Reward;
}());
__reflect(Data_Backpack_Equip_Reward.prototype, "Data_Backpack_Equip_Reward");
//# sourceMappingURL=Data_Backpack_Equip_Reward.js.map