var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var ShareListBean = (function () {
    function ShareListBean(sharelistobj) {
        this.share_list = new Array();
        this.share_result = sharelistobj.result;
        this.share_count = sharelistobj.share_count;
        this.invite_count = sharelistobj.invite_count;
        var sharelist = new Array();
        if (sharelistobj.items) {
            for (var i = 0; i < sharelistobj.items.length; i++) {
                sharelist.push(new ShareBean(sharelistobj.items[i]));
            }
        }
        this.share_list = sharelist;
        this.share_limit = sharelistobj.share_limit;
        this.share_reward = sharelistobj.share_reward;
        this.share_time = sharelistobj.share_time ? sharelistobj.share_time : 0;
        this.share_interval = sharelistobj.share_interval;
    }
    return ShareListBean;
}());
__reflect(ShareListBean.prototype, "ShareListBean");
//# sourceMappingURL=ShareListBean.js.map