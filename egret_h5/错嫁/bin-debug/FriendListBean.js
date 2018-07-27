var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var FriendListBean = (function () {
    function FriendListBean(friendobj) {
        this.friendl_interaction = 0;
        this.friendl_friend_id = friendobj.friend_id;
        this.friendl_name = friendobj.name;
        if (friendobj.meilizhi) {
            this.friendl_meilizhi = friendobj.meilizhi;
        }
        else {
            this.friendl_meilizhi = 0;
        }
        this.friendl_avatar = friendobj.avatar;
        this.friendl_gid = friendobj.gid;
        if (friendobj.interaction) {
            this.friendl_interaction = friendobj.interaction;
        }
    }
    return FriendListBean;
}());
__reflect(FriendListBean.prototype, "FriendListBean");
//# sourceMappingURL=FriendListBean.js.map