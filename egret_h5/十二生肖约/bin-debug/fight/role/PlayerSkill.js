var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerSkill = (function () {
    function PlayerSkill(data) {
        this.currentStatus = -1;
        this.skillTimeCount = 0;
        data.addDataListener(this.refreshSkill, this, Data_Skill.Refresh_SkillStatus);
    }
    PlayerSkill.prototype.refreshSkill = function (e) {
        var newData = e.data;
        if (this.currentStatus == newData.gameStatus) {
            return;
        }
        this.data = newData;
        this.currentStatus = newData.gameStatus;
        switch (this.currentStatus) {
            case DataType_SkillStatus.InUse:
                this.eventSkill(true);
                break;
            case DataType_SkillStatus.Cool:
                this.eventSkill(false);
                break;
        }
    };
    PlayerSkill.prototype.eventSkill = function (isRelease) {
        FightLayer.inst.roleLayer.onSkill(isRelease, this.data);
        this.skillTimeCount = 0;
    };
    PlayerSkill.prototype.timeChange = function () {
        if (this.data == null || this.skillTimeCount < 0) {
            return;
        }
        if (this.data.gameMaxTime > this.skillTimeCount) {
            this.data.setGameTime(this.data.gameMaxTime - this.skillTimeCount);
            this.skillTimeCount++;
        }
        else if (this.data.gameStatus == DataType_SkillStatus.InUse) {
            NetEventManager.inst.pushReleaseSkill(this.data.index, 2);
            this.skillTimeCount = -1;
        }
        else if (this.data.gameStatus == DataType_SkillStatus.Cool) {
            NetEventManager.inst.pushReleaseSkill(this.data.index, 3);
            this.skillTimeCount = -1;
        }
    };
    return PlayerSkill;
}());
__reflect(PlayerSkill.prototype, "PlayerSkill");
//# sourceMappingURL=PlayerSkill.js.map