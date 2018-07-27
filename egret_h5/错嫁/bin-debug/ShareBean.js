var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var ShareBean = (function () {
    function ShareBean(shareobj) {
        this.sharename = shareobj.name;
        this.count = shareobj.count;
        this.award = shareobj.award;
        this.description = shareobj.description;
        this.type = shareobj.type;
        this.state = shareobj.state;
    }
    return ShareBean;
}());
__reflect(ShareBean.prototype, "ShareBean");
//# sourceMappingURL=ShareBean.js.map