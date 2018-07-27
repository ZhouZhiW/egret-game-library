var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var VipigiftBean = (function () {
    function VipigiftBean(obj) {
        this.giftId = obj.giftId;
        this.type = obj.type;
        this.value = obj.value;
        this.description = obj.description;
    }
    return VipigiftBean;
}());
__reflect(VipigiftBean.prototype, "VipigiftBean");
//# sourceMappingURL=VipigiftBean.js.map