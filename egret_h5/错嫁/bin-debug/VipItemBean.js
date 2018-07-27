var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var VipItemBean = (function () {
    function VipItemBean(obj) {
        this.vip = 0;
        this.igift = new Array();
        this.isBuy = 0; //1没有购买过 0购买过
        this.vip = obj.vip;
        this.gift_type = obj.gift_type;
        this.name = obj.name;
        this.originalPrice = obj.originalPrice;
        this.money_type = obj.money_type;
        this.price = obj.price;
        this.isBuy = obj.isBuy;
        this.description = obj.description;
        if (obj.igift) {
            if (obj.igift.length > 0) {
                for (var i = 0; i < obj.igift.length; i++) {
                    var igiftbean = new VipigiftBean(obj.igift[i]);
                    this.igift.push(igiftbean);
                }
            }
        }
    }
    return VipItemBean;
}());
__reflect(VipItemBean.prototype, "VipItemBean");
//# sourceMappingURL=VipItemBean.js.map