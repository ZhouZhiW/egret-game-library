var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Data_Asset = (function (_super) {
    __extends(Data_Asset, _super);
    function Data_Asset() {
        return _super.call(this) || this;
    }
    Data_Asset.prototype.setServiceData = function (data) {
        this.data = data;
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    };
    Object.defineProperty(Data_Asset.prototype, "clientGold", {
        get: function () {
            return this.data.gold;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Asset.prototype, "diamond", {
        get: function () {
            return this.data.diamond;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Asset.prototype, "gemEssence", {
        get: function () {
            return this.data.gemEssence;
        },
        enumerable: true,
        configurable: true
    });
    return Data_Asset;
}(BaseData));
Data_Asset.AssetData_Refresh_Gold = 100;
__reflect(Data_Asset.prototype, "Data_Asset");
//# sourceMappingURL=Data_Asset.js.map