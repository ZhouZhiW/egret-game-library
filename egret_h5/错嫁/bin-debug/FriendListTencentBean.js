var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var FriendListTencentBean = (function () {
    function FriendListTencentBean(nick, score, avatar, rank) {
        this.friendl_T_nick = nick;
        this.friendl_T_score = score;
        this.friendl_T_avatar = avatar;
        this.friendl_T_rank = rank;
    }
    return FriendListTencentBean;
}());
__reflect(FriendListTencentBean.prototype, "FriendListTencentBean");
//# sourceMappingURL=FriendListTencentBean.js.map