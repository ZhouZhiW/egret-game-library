var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var VipBean = (function () {
    function VipBean(obj) {
        this.vip = 0;
        this.ireceive = new Array();
        this.items = new Array();
        this.isReceive = 0; //1没有购买过 0购买过
        this.is_expire = false; //false有效，true失效
        if (obj.vip) {
            this.vip = obj.vip;
        }
        if (obj.isReceive) {
            this.isReceive = obj.isReceive;
        }
        if (obj.is_expire) {
            this.is_expire = obj.is_expire;
        }
        if (obj.ireceive) {
            if (obj.ireceive.length > 0) {
                for (var i = 0; i < obj.ireceive.length; i++) {
                    var ireceivebean = new VipIreceiveBean(obj.ireceive[i]);
                    this.ireceive.push(ireceivebean);
                }
            }
        }
        if (obj.items) {
            if (obj.items.length > 0) {
                for (var i = 0; i < obj.items.length; i++) {
                    var itembean = new VipItemBean(obj.items[i]);
                    this.items.push(itembean);
                }
            }
        }
    }
    return VipBean;
}());
__reflect(VipBean.prototype, "VipBean");
//# sourceMappingURL=VipBean.js.map