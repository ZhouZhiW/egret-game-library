var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Data_ActivityInfos = (function (_super) {
    __extends(Data_ActivityInfos, _super);
    function Data_ActivityInfos() {
        var _this = _super.call(this) || this;
        _this._activityInfos = [];
        return _this;
    }
    Data_ActivityInfos.prototype.setServiceData = function (data) {
        this.data = data;
        if (data.activities != null) {
            this._activityInfos = [];
            for (var i = 0; i < this.data.activities.length; i++) {
                this._activityInfos.push(new Data_ActivityInfo(this.data.activities[i]));
            }
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    };
    Object.defineProperty(Data_ActivityInfos.prototype, "activityInfos", {
        get: function () {
            return this._activityInfos;
        },
        enumerable: true,
        configurable: true
    });
    return Data_ActivityInfos;
}(BaseData));
__reflect(Data_ActivityInfos.prototype, "Data_ActivityInfos");
//# sourceMappingURL=Data_ActivityInfos.js.map