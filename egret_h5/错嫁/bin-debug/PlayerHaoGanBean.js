var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var PlayerHaoGanBean = (function () {
    function PlayerHaoGanBean(haoganobj) {
        this.hao_haogandu = 0;
        this.hao_npc_id = 0;
        this.hao_player_id = 0;
        this.hao_npc_id = haoganobj.npc_id;
        this.hao_haogandu = haoganobj.haogandu;
        this.hao_player_id = haoganobj.player_id;
    }
    return PlayerHaoGanBean;
}());
__reflect(PlayerHaoGanBean.prototype, "PlayerHaoGanBean");
//# sourceMappingURL=PlayerHaoGanBean.js.map