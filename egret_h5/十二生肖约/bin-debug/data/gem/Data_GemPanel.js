var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Data_GemPanel = (function (_super) {
    __extends(Data_GemPanel, _super);
    function Data_GemPanel() {
        var _this = _super.call(this) || this;
        _this.gemGroup = [];
        _this.grooveGroup = [];
        return _this;
    }
    Data_GemPanel.prototype.setServiceData = function (data) {
        if (data == null) {
            return;
        }
        this.data = data;
        if (data.unequips != null) {
            this.gemGroup = [];
            for (var i = 0; i < data.unequips.length; i++) {
                this.gemGroup.push(new Data_BaseMaterial(this.data.unequips[i]));
            }
        }
        if (data.equips != null) {
            this.grooveGroup = [];
            for (var i = 0; i < this.data.equips.length; i++) {
                this.grooveGroup.push(new Data_BaseMaterial(this.data.equips[i]));
            }
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    };
    Object.defineProperty(Data_GemPanel.prototype, "gemPieces", {
        get: function () {
            return this.data.gemEssence;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GemPanel.prototype, "gemLotteryDiamond", {
        get: function () {
            return this.data.composeDiamond;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GemPanel.prototype, "gemPlayerAtt", {
        get: function () {
            return this.data.gemMasterPercent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GemPanel.prototype, "gemPlayerCri", {
        get: function () {
            return this.data.gemMasterCriticalPercent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GemPanel.prototype, "gemPlayerCsd", {
        get: function () {
            return this.data.gemMasterCriticalRatePercent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GemPanel.prototype, "gemHerosAtt", {
        get: function () {
            return this.data.gemHeroPercent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GemPanel.prototype, "gemMoney", {
        get: function () {
            return this.data.gemGoldPercent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GemPanel.prototype, "gemGroupDatas", {
        get: function () {
            return this.gemGroup;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GemPanel.prototype, "grooveGroupDatas", {
        get: function () {
            return this.grooveGroup;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GemPanel.prototype, "groovesCurrent", {
        get: function () {
            return this.data.num1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GemPanel.prototype, "groovesNext", {
        get: function () {
            return this.data.num2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GemPanel.prototype, "groovesLevel", {
        get: function () {
            return this.data.troughLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GemPanel.prototype, "groovesEss", {
        get: function () {
            return this.data.cost;
        },
        enumerable: true,
        configurable: true
    });
    return Data_GemPanel;
}(BaseData));
__reflect(Data_GemPanel.prototype, "Data_GemPanel");
//# sourceMappingURL=Data_GemPanel.js.map