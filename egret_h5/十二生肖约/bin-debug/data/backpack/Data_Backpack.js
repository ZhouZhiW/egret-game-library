var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Data_Backpack = (function (_super) {
    __extends(Data_Backpack, _super);
    function Data_Backpack() {
        return _super.call(this) || this;
    }
    Data_Backpack.prototype.setServiceData = function (data) {
        if (data == null) {
            return;
        }
        this.data = data;
        this.grids = [];
        for (var i = 0; i < data.backpacks.length; i++) {
            this.grids.push(new Data_BaseMaterial(data.backpacks[i]));
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    };
    Object.defineProperty(Data_Backpack.prototype, "bpGrids", {
        get: function () {
            return this.grids;
        },
        enumerable: true,
        configurable: true
    });
    return Data_Backpack;
}(BaseData));
__reflect(Data_Backpack.prototype, "Data_Backpack");
//# sourceMappingURL=Data_Backpack.js.map