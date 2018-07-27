var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Data_Offline = (function (_super) {
    __extends(Data_Offline, _super);
    function Data_Offline() {
        var _this = _super.call(this) || this;
        _this._offlineMaterials = [];
        return _this;
    }
    Data_Offline.prototype.setServiceData = function (data) {
        this.data = data;
        this._offlineMaterials = [];
        for (var i = 0; i < this.data.offlineMaterials.length; i++) {
            this._offlineMaterials.push(new Data_Material(this.data.offlineMaterials[i]));
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    };
    Object.defineProperty(Data_Offline.prototype, "offlineTime", {
        get: function () {
            return this.data.offlineTime; //
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Offline.prototype, "offlineMaterials", {
        get: function () {
            return this._offlineMaterials;
        },
        enumerable: true,
        configurable: true
    });
    return Data_Offline;
}(BaseData));
__reflect(Data_Offline.prototype, "Data_Offline");
//# sourceMappingURL=Data_Offline.js.map