var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Data_Treasures = (function (_super) {
    __extends(Data_Treasures, _super);
    function Data_Treasures() {
        var _this = _super.call(this) || this;
        _this._treasures = [];
        return _this;
    }
    Data_Treasures.prototype.setServiceData = function (data) {
        if (data == null || data.dataList == null || data.dataList.length < 1) {
            // console.error("Data_Treasures setServiceData is null!")
            return;
        }
        this.data = data;
        this._treasures = [];
        for (var i = 0; i < data.dataList.length; i++) {
            this._treasures.push(new Data_Material(data.dataList[i]));
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    };
    Object.defineProperty(Data_Treasures.prototype, "treasures", {
        get: function () {
            return this._treasures;
        },
        enumerable: true,
        configurable: true
    });
    return Data_Treasures;
}(BaseData));
__reflect(Data_Treasures.prototype, "Data_Treasures");
//# sourceMappingURL=Data_Treasures.js.map