var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Data_Tips = (function (_super) {
    __extends(Data_Tips, _super);
    function Data_Tips() {
        return _super.call(this) || this;
    }
    Data_Tips.prototype.setServiceData = function (data) {
        this.data = data;
        if (data.tips != null) {
            this._tips = [];
            for (var i = 0; i < this.data.tips.length; i++) {
                this._tips.push(new Data_Tip(this.data.tips[i]));
            }
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    };
    Object.defineProperty(Data_Tips.prototype, "tips", {
        get: function () {
            return this._tips;
        },
        enumerable: true,
        configurable: true
    });
    return Data_Tips;
}(BaseData));
__reflect(Data_Tips.prototype, "Data_Tips");
//# sourceMappingURL=Data_Tips.js.map