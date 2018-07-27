var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Data_Hero = (function (_super) {
    __extends(Data_Hero, _super);
    function Data_Hero() {
        return _super.call(this) || this;
    }
    Data_Hero.prototype.setServiceData = function (data) {
        this.data = data;
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    };
    Object.defineProperty(Data_Hero.prototype, "index", {
        get: function () {
            return GameUtils.herosName(this.data.index);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Hero.prototype, "id", {
        get: function () {
            return this.data.index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Hero.prototype, "name", {
        get: function () {
            switch (this.data.index) {
                case 1:
                    return "潘多拉";
                case 2:
                    return "波塞冬";
                case 3:
                    return "雅典娜";
                case 4:
                    return "哈迪斯";
                case 5:
                    return "赫拉";
                case 6:
                    return "宙斯";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Hero.prototype, "level", {
        get: function () {
            return this.data.level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Hero.prototype, "damage", {
        get: function () {
            return this.data.damage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Hero.prototype, "damagePercent", {
        get: function () {
            return this.data.damagePercent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Hero.prototype, "active", {
        get: function () {
            return this.data.active;
        },
        enumerable: true,
        configurable: true
    });
    return Data_Hero;
}(BaseData));
__reflect(Data_Hero.prototype, "Data_Hero");
//# sourceMappingURL=Data_Hero.js.map