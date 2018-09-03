var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 角色信息
 */
var PlayerData = (function () {
    function PlayerData() {
        this.hp = 0; //生命
        this.full = 0; //饥饿
        this.lk = 0; //运气
        this.hpMax = 0; //最大生命值
        this.fullMax = 0; //最大饥饿
        this.lkMax = 0; //最大幸运
        this.time = 0; //时间
    }
    return PlayerData;
}());
__reflect(PlayerData.prototype, "PlayerData");
//# sourceMappingURL=PlayerData.js.map