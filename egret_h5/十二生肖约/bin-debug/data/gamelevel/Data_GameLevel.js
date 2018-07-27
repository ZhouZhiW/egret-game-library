var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Data_GameLevel = (function (_super) {
    __extends(Data_GameLevel, _super);
    function Data_GameLevel() {
        return _super.call(this) || this;
    }
    Data_GameLevel.prototype.setServiceData = function (data) {
        this.data = data;
        if (this.data == null) {
            console.error("Data_GameLevel setServiceData is null!");
            return;
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    };
    Data_GameLevel.prototype.setHP = function (nowHp, maxHp) {
        this._nowMonstersHp = nowHp;
        this._maxMonstersHp = maxHp;
        this.callListener(BaseData.DATA_SOURCE_CLIENT, Data_GameLevel.Refresh_Hp);
    };
    Data_GameLevel.prototype.setBossTime = function (nowTime, maxTime) {
        this._nowBossTime = nowTime;
        this._maxBossTime = maxTime;
        this.callListener(BaseData.DATA_SOURCE_CLIENT, Data_GameLevel.Refresh_BossTime);
    };
    Object.defineProperty(Data_GameLevel.prototype, "nowMonstersHp", {
        get: function () {
            return this._nowMonstersHp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GameLevel.prototype, "maxMonstersHp", {
        get: function () {
            return this._maxMonstersHp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GameLevel.prototype, "maxBossTime", {
        get: function () {
            return this._maxBossTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GameLevel.prototype, "nowBossTime", {
        get: function () {
            return this._nowBossTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GameLevel.prototype, "chapterIndex", {
        get: function () {
            return this.data.chapterIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GameLevel.prototype, "background", {
        get: function () {
            return this.data.background;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GameLevel.prototype, "maxChapter", {
        get: function () {
            return this.data.maxChapter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GameLevel.prototype, "isBoss", {
        get: function () {
            return this.data.chapterIndex % 5 == 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GameLevel.prototype, "bossMaxTime", {
        get: function () {
            return this.data.bossMaxTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GameLevel.prototype, "chestID", {
        get: function () {
            return this.data.gemStoneId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GameLevel.prototype, "maxChapterIsBoss", {
        get: function () {
            return this.data.maxChapter % 5 == 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GameLevel.prototype, "waveIndex", {
        get: function () {
            return this.data.waveIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GameLevel.prototype, "maxWave", {
        get: function () {
            return this.data.maxWave;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GameLevel.prototype, "monsterNum", {
        get: function () {
            return this.data.monsterNum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GameLevel.prototype, "monsterHp", {
        get: function () {
            return this.data.monsterHp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GameLevel.prototype, "monsterGold", {
        get: function () {
            return this.data.monsterGold;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GameLevel.prototype, "bossChestID", {
        get: function () {
            return this.data.bossChestId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_GameLevel.prototype, "monsterIds", {
        get: function () {
            return this.data.monsterIds;
        },
        enumerable: true,
        configurable: true
    });
    return Data_GameLevel;
}(BaseData));
Data_GameLevel.Refresh_Hp = 201;
Data_GameLevel.Refresh_BossTime = 202;
__reflect(Data_GameLevel.prototype, "Data_GameLevel");
//# sourceMappingURL=Data_GameLevel.js.map