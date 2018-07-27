var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var ShopModelBean = (function () {
    function ShopModelBean(description, id, name, scope, value) {
        this.shopm_description = description;
        this.shopm_id = id;
        this.shopm_name = name;
        this.shopm_scope = scope;
        this.shopm_value = value;
    }
    return ShopModelBean;
}());
__reflect(ShopModelBean.prototype, "ShopModelBean");
//# sourceMappingURL=ShopModelBean.js.map