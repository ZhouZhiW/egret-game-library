var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var PlayerFriendBean = (function () {
    function PlayerFriendBean(wuli, id, koucai, current_in, zhihui, name, meilizhi, avatar, haogandu) {
        this.other_haogandu = new Array();
        this.other_wuli = wuli;
        this.other_id = id;
        this.other_koucai = koucai;
        this.other_current_in = current_in;
        this.other_zhihui = zhihui;
        this.other_name = name;
        this.other_meilizhi = meilizhi;
        this.other_avatar = avatar;
        this.other_haogandu = haogandu;
    }
    return PlayerFriendBean;
}());
__reflect(PlayerFriendBean.prototype, "PlayerFriendBean");
//# sourceMappingURL=PlayerFriendBean.js.map