var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Data_Achieved = (function (_super) {
    __extends(Data_Achieved, _super);
    function Data_Achieved() {
        return _super.call(this) || this;
        // this.test();
    }
    Data_Achieved.prototype.setServiceData = function (data) {
        if (data == null) {
            return;
        }
        this.data = data;
        this.dps = data.dps;
        if (data.items != null) {
            this.items = [];
            for (var i = 0; i < this.data.items.length; i++) {
                this.items.push(new Data_Achieved_Item(this.data.items[i]));
            }
        }
        else {
            console.error("Data_Achieved setServiceData is null!");
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    };
    Object.defineProperty(Data_Achieved.prototype, "acTotalDPS", {
        get: function () {
            return this.data.dps;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Achieved.prototype, "acItems", {
        get: function () {
            return this.items;
        },
        enumerable: true,
        configurable: true
    });
    return Data_Achieved;
}(BaseData));
__reflect(Data_Achieved.prototype, "Data_Achieved");
//# sourceMappingURL=Data_Achieved.js.map