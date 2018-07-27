var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Data_GemLottery = (function (_super) {
    __extends(Data_GemLottery, _super);
    function Data_GemLottery() {
        return _super.call(this) || this;
    }
    Data_GemLottery.prototype.setServiceData = function (data) {
        if (data == null) {
            return;
        }
        this.data = data;
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    };
    Object.defineProperty(Data_GemLottery.prototype, "gemLotteryDiamond", {
        get: function () {
            return this.data.composeDiamond;
        },
        enumerable: true,
        configurable: true
    });
    return Data_GemLottery;
}(BaseData));
__reflect(Data_GemLottery.prototype, "Data_GemLottery");
//# sourceMappingURL=Data_GemLottery.js.map