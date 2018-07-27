var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Data_Player = (function (_super) {
    __extends(Data_Player, _super);
    function Data_Player() {
        return _super.call(this) || this;
    }
    Data_Player.prototype.setServiceData = function (data) {
        this.data = data;
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    };
    Object.defineProperty(Data_Player.prototype, "index", {
        get: function () {
            return GameUtils.starsName(this.data.index);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Player.prototype, "level", {
        get: function () {
            return this.data.level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Player.prototype, "isAwoke", {
        get: function () {
            return this.data.level >= 50;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Player.prototype, "damage", {
        get: function () {
            return this.data.damage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Player.prototype, "damagePercent", {
        get: function () {
            return this.data.damagePercent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Player.prototype, "criticalPercent", {
        get: function () {
            return this.data.criticalPercent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Player.prototype, "criticalRatePercent", {
        get: function () {
            // return 0.3;
            return this.data.criticalRatePercent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Player.prototype, "autoAttack", {
        get: function () {
            return this.data.autoAttackCount;
            // return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Player.prototype, "altarLevel", {
        get: function () {
            return this.data.baseLevel;
        },
        enumerable: true,
        configurable: true
    });
    return Data_Player;
}(BaseData));
__reflect(Data_Player.prototype, "Data_Player");
//# sourceMappingURL=Data_Player.js.map