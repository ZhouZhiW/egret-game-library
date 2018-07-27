var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Data_Pedestal = (function (_super) {
    __extends(Data_Pedestal, _super);
    function Data_Pedestal() {
        return _super.call(this) || this;
    }
    Data_Pedestal.prototype.setServiceData = function (data) {
        if (data == null) {
            return;
        }
        this.data = data;
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    };
    Object.defineProperty(Data_Pedestal.prototype, "percent", {
        get: function () {
            return this.data.percent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Pedestal.prototype, "nextPercent", {
        get: function () {
            return this.data.nextPercent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Pedestal.prototype, "fragmentNum", {
        get: function () {
            return this.data.appMasterBaseChip;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Pedestal.prototype, "baseLevel", {
        get: function () {
            return this.data.appMasterBaseLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Pedestal.prototype, "costFragment", {
        get: function () {
            return this.data.chipNum;
        },
        enumerable: true,
        configurable: true
    });
    return Data_Pedestal;
}(BaseData));
__reflect(Data_Pedestal.prototype, "Data_Pedestal");
//# sourceMappingURL=Data_Pedestal.js.map