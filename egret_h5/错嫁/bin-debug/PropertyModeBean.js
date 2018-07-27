var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var PropertyModeBean = (function () {
    function PropertyModeBean(item_id, attribute_type, price, money_type, value, npc_id) {
        this.propertym_item_id = item_id;
        this.propertym_attribute_type = attribute_type;
        this.propertym_price = price;
        this.propertym_money_type = money_type;
        this.propertym_value = value;
        this.propertym_npc_id = npc_id;
    }
    return PropertyModeBean;
}());
__reflect(PropertyModeBean.prototype, "PropertyModeBean");
//# sourceMappingURL=PropertyModeBean.js.map