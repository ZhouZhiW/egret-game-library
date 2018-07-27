var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var ShopListBean = (function () {
    function ShopListBean(goodsobj) {
        this.shopl_stack = goodsobj.stack;
        this.shopl_description = goodsobj.description;
        this.shopl_discount = goodsobj.discount;
        this.shopl_discountPrice = goodsobj.discountPrice;
        this.shopl_goods_type = goodsobj.goods_type;
        this.shopl_id = goodsobj.id;
        this.shopl_item_code = goodsobj.item_code;
        this.shopl_money_type = goodsobj.money_type;
        this.shopl_name = goodsobj.name;
        this.shopl_order = goodsobj.order;
        this.shopl_price = goodsobj.price;
        this.shopl_prop_id = goodsobj.prop_id;
    }
    return ShopListBean;
}());
__reflect(ShopListBean.prototype, "ShopListBean");
//# sourceMappingURL=ShopListBean.js.map