var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Data_Mail = (function (_super) {
    __extends(Data_Mail, _super);
    function Data_Mail() {
        return _super.call(this) || this;
    }
    Data_Mail.prototype.setServiceData = function (data) {
        if (data == null) {
            return;
        }
        this.data = data;
        if (data.shops != null) {
            this.items = [];
            for (var i = 0; i < data.shops.length; i++) {
                this.items.push(new Data_Mail_Item(data.shops[i]));
            }
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    };
    Object.defineProperty(Data_Mail.prototype, "diamond", {
        get: function () {
            return this.data.diamond;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Mail.prototype, "shops", {
        get: function () {
            return this.items;
        },
        enumerable: true,
        configurable: true
    });
    return Data_Mail;
}(BaseData));
__reflect(Data_Mail.prototype, "Data_Mail");
//# sourceMappingURL=Data_Mail.js.map