var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Data_Upgrade = (function (_super) {
    __extends(Data_Upgrade, _super);
    function Data_Upgrade() {
        return _super.call(this) || this;
    }
    Data_Upgrade.prototype.setServiceData = function (data) {
        this.data = data;
        if (this.data == null || this.data.roles == null) {
            console.error("Data_Upgrade setServiceData is null!");
            return;
        }
        this.upgradeRoles = [];
        for (var i = 0; i < this.data.roles.length; i++) {
            this.upgradeRoles.push(new Data_UpgradeRole(this.data.roles[i]));
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    };
    Object.defineProperty(Data_Upgrade.prototype, "totalDPS", {
        get: function () {
            return this.data == null ? 0 : this.data.totDps;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Upgrade.prototype, "roles", {
        get: function () {
            return this.upgradeRoles;
        },
        enumerable: true,
        configurable: true
    });
    return Data_Upgrade;
}(BaseData));
__reflect(Data_Upgrade.prototype, "Data_Upgrade");
//# sourceMappingURL=Data_Upgrade.js.map