var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Data_TopUp = (function (_super) {
    __extends(Data_TopUp, _super);
    function Data_TopUp() {
        return _super.call(this) || this;
    }
    Data_TopUp.prototype.setServiceData = function (data) {
        if (data == null) {
            return;
        }
        this.data = data;
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    };
    Object.defineProperty(Data_TopUp.prototype, "products", {
        get: function () {
            return this.data.products;
        },
        enumerable: true,
        configurable: true
    });
    return Data_TopUp;
}(BaseData));
__reflect(Data_TopUp.prototype, "Data_TopUp");
//# sourceMappingURL=Data_TopUp.js.map