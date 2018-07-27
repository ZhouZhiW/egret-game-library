var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var MoreGameBean = (function () {
    function MoreGameBean(id, icon, name, description, url, state, order) {
        this.more_id = 0;
        this.more_state = 0;
        this.more_order = 0;
        this.more_id = id;
        this.more_icon = icon;
        this.more_name = name;
        this.more_description = description;
        this.more_url = url;
        this.more_state = state;
        this.more_order = order;
    }
    return MoreGameBean;
}());
__reflect(MoreGameBean.prototype, "MoreGameBean");
//# sourceMappingURL=MoreGameBean.js.map