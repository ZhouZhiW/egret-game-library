var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Data_SkillPancel = (function (_super) {
    __extends(Data_SkillPancel, _super);
    function Data_SkillPancel() {
        var _this = _super.call(this) || this;
        _this._skills = [];
        for (var i = 0; i < 7; i++) {
            var skill = new Data_Skill(i);
            _this._skills.push(skill);
        }
        return _this;
    }
    Data_SkillPancel.prototype.setServiceData = function (data) {
        this.data = data;
        if (this.data == null) {
            console.error("Data_Skills setServiceData is null!");
            return;
        }
        if (this.data.masterSkills == null) {
            console.log("Data_SkillPancel masterSkills is null! ");
            return;
        }
        var n = this.data.masterSkills.length;
        for (var i = 0; i < n; i++) {
            var index = this.data.masterSkills[i].index;
            this.getSkillData(index).setData(this.data.masterSkills[i]);
        }
        // this.callListener(BaseData.DATA_SOURCE_SERVICE);
    };
    Data_SkillPancel.prototype.getSkillData = function (index) {
        for (var i = 0; i < this._skills.length; i++) {
            if (this.skills[i].index == index) {
                return this.skills[i];
            }
        }
        return null;
    };
    Object.defineProperty(Data_SkillPancel.prototype, "skills", {
        get: function () {
            return this._skills;
        },
        enumerable: true,
        configurable: true
    });
    return Data_SkillPancel;
}(BaseData));
__reflect(Data_SkillPancel.prototype, "Data_SkillPancel");
//# sourceMappingURL=Data_SkillPancel.js.map