var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var VipIreceiveBean = (function () {
    function VipIreceiveBean(obj) {
        this.vip = 0;
        this.igift = new Array();
        this.vip = obj.vip;
        if (obj.igift) {
            if (obj.igift.length > 0) {
                for (var i = 0; i < obj.igift.length; i++) {
                    var igiftbean = new VipigiftBean(obj.igift[i]);
                    this.igift.push(igiftbean);
                }
            }
        }
    }
    return VipIreceiveBean;
}());
__reflect(VipIreceiveBean.prototype, "VipIreceiveBean");
//# sourceMappingURL=VipIreceiveBean.js.map