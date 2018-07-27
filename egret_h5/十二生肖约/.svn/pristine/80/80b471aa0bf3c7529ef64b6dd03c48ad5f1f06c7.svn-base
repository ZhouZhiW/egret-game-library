var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Data_HeroTower = (function (_super) {
    __extends(Data_HeroTower, _super);
    function Data_HeroTower() {
        return _super.call(this) || this;
    }
    Data_HeroTower.prototype.setServiceData = function (data) {
        this.data = data;
        if (this.data == null || this.data.roles == null) {
            return;
        }
        this.heroTowerRoles = [];
        for (var i = 0; i < this.data.roles.length; i++) {
            this.heroTowerRoles.push(new Data_HeroTowerRole(this.data.roles[i]));
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    };
    Object.defineProperty(Data_HeroTower.prototype, "isValidate", {
        get: function () {
            if (this.data == null) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_HeroTower.prototype, "totalDPS", {
        get: function () {
            return this.data == null ? 0 : this.data.totDps;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_HeroTower.prototype, "roles", {
        get: function () {
            return this.heroTowerRoles;
        },
        enumerable: true,
        configurable: true
    });
    return Data_HeroTower;
}(BaseData));
__reflect(Data_HeroTower.prototype, "Data_HeroTower");
//# sourceMappingURL=Data_HeroTower.js.map