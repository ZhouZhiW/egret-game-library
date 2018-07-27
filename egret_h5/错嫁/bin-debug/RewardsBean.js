var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var RewardsBean = (function () {
    function RewardsBean(obj) {
        this.rewards_name = obj.name;
        this.rewards_type = obj.type;
        this.rewards_url = obj.url;
    }
    return RewardsBean;
}());
__reflect(RewardsBean.prototype, "RewardsBean");
//# sourceMappingURL=RewardsBean.js.map