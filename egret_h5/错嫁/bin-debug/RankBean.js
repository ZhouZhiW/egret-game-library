var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var RankBean = (function () {
    function RankBean(ranking, player_id, name, avatar, meilizhi) {
        this.meili_rank_ranking = ranking;
        this.meili_rank_player_id = player_id;
        this.meili_rank_name = name;
        this.meili_rank_avatar = avatar;
        this.meili_rank_meilizhi = meilizhi;
    }
    return RankBean;
}());
__reflect(RankBean.prototype, "RankBean");
//# sourceMappingURL=RankBean.js.map