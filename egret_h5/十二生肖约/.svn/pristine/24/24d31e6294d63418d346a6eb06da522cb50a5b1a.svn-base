var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Data_Skill = (function (_super) {
    __extends(Data_Skill, _super);
    function Data_Skill(index) {
        var _this = _super.call(this) || this;
        _this._index = index;
        _this._gameStatus = DataType_SkillStatus.Lock;
        return _this;
    }
    Data_Skill.prototype.setData = function (data) {
        if (data == null) {
            console.error("Data_Skill is null !");
            return;
        }
        // if (this.data != null && this.data.status == data.status) {
        //     return;
        // }
        this.data = data;
        this._gameStatus = this.status;
        this._gameTime = this.gameMaxTime;
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    };
    Data_Skill.prototype.setGameStatus = function (status) {
        this._gameStatus = status;
        this.callListener(Data_Skill.Refresh_SkillStatus);
    };
    Data_Skill.prototype.setGameTime = function (time) {
        this._gameTime = time;
        this.callListener(Data_Skill.Refresh_SkillStatus);
    };
    Object.defineProperty(Data_Skill.prototype, "index", {
        get: function () {
            return this._index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Skill.prototype, "gameStatus", {
        /*index	主角技能编号
        status	主角技能状态：
        0：未解锁
        1：准备就绪
        2：使用中
        3：冷却中
        restTime	主角技能剩余时间
        diomand	主角刷新技能所需钻石
        */
        get: function () {
            return this._gameStatus;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Skill.prototype, "gameTime", {
        get: function () {
            return this._gameTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Skill.prototype, "gameMaxTime", {
        get: function () {
            return this.restTime * 10;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Skill.prototype, "gameSumTime", {
        get: function () {
            return this.sumTime * 10;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Skill.prototype, "status", {
        get: function () {
            return this.data.status;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Skill.prototype, "restTime", {
        get: function () {
            return this.data.restTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Skill.prototype, "sumTime", {
        get: function () {
            return this.data.sumTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Skill.prototype, "value", {
        get: function () {
            // switch (this.index) {
            //     case DataType_PlayerSkillType.Auts:
            //         return 10;
            //     case DataType_PlayerSkillType.Cris:
            //         return 0.3;
            //     case DataType_PlayerSkillType.Spes:
            //         return 3;
            //     case DataType_PlayerSkillType.Cdms:
            //         return 3;
            //     case DataType_PlayerSkillType.Aoes:
            //         return 5000;
            //     case DataType_PlayerSkillType.Smzms:
            //         return 0.1;
            // }
            return this.data.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Skill.prototype, "diomand", {
        get: function () {
            return this.data.diomand;
        },
        enumerable: true,
        configurable: true
    });
    return Data_Skill;
}(BaseData));
Data_Skill.Refresh_SkillStatus = 200;
__reflect(Data_Skill.prototype, "Data_Skill");
//# sourceMappingURL=Data_Skill.js.map