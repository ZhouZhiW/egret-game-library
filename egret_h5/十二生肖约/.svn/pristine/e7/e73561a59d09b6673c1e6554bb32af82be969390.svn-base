var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Data_Assistor = (function (_super) {
    __extends(Data_Assistor, _super);
    function Data_Assistor() {
        return _super.call(this) || this;
    }
    Data_Assistor.prototype.setServiceData = function (data) {
        this.data = data;
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
        // console.log("this.data.userId:     :" + this.data.userId);
        // console.log("this.data.index:   " + this.data.index);
    };
    Object.defineProperty(Data_Assistor.prototype, "userId", {
        get: function () {
            return this.data.userId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Assistor.prototype, "userAvatar", {
        get: function () {
            return this.data.userAvatar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Assistor.prototype, "username", {
        get: function () {
            return this.data.username;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Assistor.prototype, "userLevel", {
        get: function () {
            return this.data.userLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Assistor.prototype, "index", {
        get: function () {
            // return GameUtils.starsName("7_20"); 
            return GameUtils.starsName(this.data.index);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Assistor.prototype, "level", {
        get: function () {
            return this.data.level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Assistor.prototype, "damage", {
        get: function () {
            return this.data.damage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Assistor.prototype, "damagePercent", {
        get: function () {
            return this.data.damagePercent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Assistor.prototype, "criticalPercent", {
        get: function () {
            return this.data.criticalPercent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Assistor.prototype, "criticalRatePercent", {
        get: function () {
            // return 0.3;
            return this.data.criticalRatePercent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Assistor.prototype, "restTime", {
        get: function () {
            return this.data.restTime;
            // return 8;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Assistor.prototype, "assistorType", {
        get: function () {
            return this.data.assistorType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Assistor.prototype, "saveTime", {
        get: function () {
            return this.data.saveTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Assistor.prototype, "altarLevel", {
        get: function () {
            return this.data.baseLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Assistor.prototype, "altarValue", {
        get: function () {
            var v = this.data.baseValue;
            v = v == null ? 1 : v;
            return v;
        },
        enumerable: true,
        configurable: true
    });
    return Data_Assistor;
}(BaseData));
__reflect(Data_Assistor.prototype, "Data_Assistor");
//# sourceMappingURL=Data_Assistor.js.map