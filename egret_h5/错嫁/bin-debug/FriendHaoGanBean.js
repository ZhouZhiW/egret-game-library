var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var FriendHaoGanBean = (function () {
    function FriendHaoGanBean(haogandu, npc_id, player_id) {
        this.hao_haogandu = 0;
        this.hao_npc_id = 0;
        this.hao_player_id = 0;
        this.hao_haogandu = haogandu;
        this.hao_npc_id = npc_id;
        this.hao_player_id = player_id;
    }
    return FriendHaoGanBean;
}());
__reflect(FriendHaoGanBean.prototype, "FriendHaoGanBean");
//# sourceMappingURL=FriendHaoGanBean.js.map