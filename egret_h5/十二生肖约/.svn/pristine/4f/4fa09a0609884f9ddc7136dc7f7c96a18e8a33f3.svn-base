var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RoleLayer = (function (_super) {
    __extends(RoleLayer, _super);
    function RoleLayer() {
        return _super.call(this) || this;
    }
    RoleLayer.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        var mcpath = [];
        mcpath.push("resource/mc/skill/player_skill_aoto");
        mcpath.push("resource/mc/skill/player_skill_cris");
        mcpath.push("resource/mc/skill/player_skill_cdms");
        mcpath.push("resource/mc/skill/player_skill_aoes");
        mcpath.push("resource/mc/skill/player_skill_gold");
        mcpath.push("resource/mc/skill/player_skill_spes");
        this.loadMovieClipDataFactorys(mcpath);
        this.initPlayer();
        this.initHeros();
        this.initAssistor();
        this.initSkills();
        this.addEventListener(egret.Event.ADDED, this.addedChild, this);
        this.roleTimer = new egret.Timer(100, 0);
        this.roleTimer.addEventListener(egret.TimerEvent.TIMER, this.timerEvent, this);
        this.roleTimer.start();
    };
    RoleLayer.prototype.onDestroy = function () {
        this.destroyPlayer();
        this.destroyHeros();
        this.destroyAssistor();
        this.removeEventListener(egret.Event.ADDED, this.addedChild, this);
        this.removeChildren();
        if (this.roleTimer != null) {
            this.roleTimer.stop();
            this.roleTimer.removeEventListener(egret.TimerEvent.TIMER, this.timerEvent, this);
            this.roleTimer = null;
        }
        _super.prototype.onDestroy.call(this);
    };
    RoleLayer.prototype.getMovieClipDataFactorys = function (mcdfs) {
        this.skillAutsMC = new egret.MovieClip(mcdfs[0].generateMovieClipData("skill"));
        this.skillCrisMC = new egret.MovieClip(mcdfs[1].generateMovieClipData("skill"));
        this.skillCdmsMC = new egret.MovieClip(mcdfs[2].generateMovieClipData("skill"));
        this.skillAoesMC = new egret.MovieClip(mcdfs[3].generateMovieClipData("skill"));
        this.skillSmzmsMC = new egret.MovieClip(mcdfs[4].generateMovieClipData("skill"));
        this.skillSpesMCF = mcdfs[5];
    };
    RoleLayer.prototype.addedChild = function () {
        if (this.playerAttackMC != null) {
            this.setChildIndex(this.playerAttackMC, -1);
        }
    };
    RoleLayer.prototype.timerEvent = function () {
        this.skillsEvent();
    };
    RoleLayer.prototype.startSkillAoes = function (aoeValue) {
        var d = this.player.getAttackValue() * aoeValue;
        FightLayer.inst.monsterLayer.aoeMonsters(d);
        if (this.skillAoesMC == null) {
            return;
        }
        this.skillAoesMC.gotoAndPlay("effect", 1);
        this.skillAoesMC.once(egret.Event.COMPLETE, this.skillMCComplete, this);
        this.skillAoesMC.x = this.width >> 1;
        this.skillAoesMC.y = this.height >> 1;
        this.addChild(this.skillAoesMC);
    };
    RoleLayer.prototype.startSkillSmzms = function (goldPercent) {
        this.player.startSkillSmzms(goldPercent);
        if (this.skillSmzmsMC == null) {
            return;
        }
        this.skillSmzmsMC.gotoAndPlay("effect", 1);
        this.skillSmzmsMC.once(egret.Event.COMPLETE, this.skillMCComplete, this);
        this.skillSmzmsMC.x = this.width >> 1;
        this.skillSmzmsMC.y = this.height >> 1;
        this.addChild(this.skillSmzmsMC);
    };
    RoleLayer.prototype.startSkillSpes = function (rate) {
        for (var i = 0; i < this.numChildren; i++) {
            var c = this.getChildAt(i);
            if (c instanceof Hero) {
                c.startSkillSpes(this.skillSpesMCF, rate);
            }
        }
    };
    RoleLayer.prototype.stopSkillSpes = function () {
        for (var i = 0; i < this.numChildren; i++) {
            var c = this.getChildAt(i);
            if (c instanceof Hero) {
                c.stopSkillSpes();
            }
        }
    };
    RoleLayer.prototype.initPlayer = function () {
        this.player = new Player();
        this.addChild(this.player);
    };
    RoleLayer.prototype.destroyPlayer = function () {
        this.player = null;
        this.playerAttackMC = null;
    };
    RoleLayer.prototype.showPlayerEffect = function (playEffectMC) {
        if (playEffectMC == null) {
            return;
        }
        if (this.playerAttackMC == playEffectMC) {
            return;
        }
        if (this.playerAttackMC != null) {
            this.playerAttackMC.stop();
            this.removeChild(this.playerAttackMC);
        }
        this.playerAttackMC = playEffectMC;
        this.addChild(this.playerAttackMC);
    };
    RoleLayer.prototype.showFloatingAttactValue = function (atttactValue, point) {
        this.addChild(new FloatingAttactValue(atttactValue, point));
    };
    // ======hero=========================================
    RoleLayer.prototype.initHeros = function () {
        var datas = DataManager.inst.roles.heros;
        for (var i = datas.length - 1; i >= 0; i--) {
            var hero = new Hero(datas[i]);
            this.addChild(hero);
        }
    };
    RoleLayer.prototype.destroyHeros = function () {
    };
    RoleLayer.prototype.initAssistor = function () {
        var data = DataManager.inst.assistor;
        this.assistor = new Assistor(data);
        this.addChild(this.assistor);
    };
    RoleLayer.prototype.destroyAssistor = function () {
        this.assistor = null;
    };
    RoleLayer.prototype.initSkills = function () {
        this.skills = [];
        var datas = DataManager.inst.playerSkills;
        for (var i = 0; i < datas.skills.length; i++) {
            var skill = new PlayerSkill(datas.skills[i]);
            this.skills.push(skill);
        }
    };
    RoleLayer.prototype.skillsEvent = function () {
        if (this.skills == null) {
            return;
        }
        for (var i = 0; i < this.skills.length; i++) {
            this.skills[i].timeChange();
        }
    };
    RoleLayer.prototype.onSkill = function (isRelease, data) {
        switch (data.index) {
            case DataType_PlayerSkillType.Auts:
                if (isRelease) {
                    this.player.startSkillAuts(this.skillAutsMC, data.value);
                }
                else {
                    this.player.stopSkillAuts();
                }
                break;
            case DataType_PlayerSkillType.Cris:
                if (isRelease) {
                    this.player.startSkillCris(this.skillCrisMC, data.value);
                }
                else {
                    this.player.stopSkillCris();
                }
                break;
            case DataType_PlayerSkillType.Spes:
                if (isRelease) {
                    this.startSkillSpes(data.value);
                }
                else {
                    this.stopSkillSpes();
                }
                break;
            case DataType_PlayerSkillType.Cdms:
                if (isRelease) {
                    this.player.startSkillCdms(this.skillCdmsMC, data.value);
                }
                else {
                    this.player.stopSkillCdms();
                }
                break;
            case DataType_PlayerSkillType.Aoes:
                if (isRelease) {
                    this.startSkillAoes(data.value);
                }
                break;
            case DataType_PlayerSkillType.Smzms:
                if (isRelease) {
                    this.startSkillSmzms(data.value);
                }
                else {
                    this.player.stopskillSmzms();
                }
                break;
        }
    };
    RoleLayer.prototype.skillMCComplete = function (e) {
        var mc = e.currentTarget;
        if (mc != null && mc.parent != null) {
            mc.parent.removeChild(mc);
        }
    };
    RoleLayer.prototype.attackCris = function () {
        FightLayer.inst.shake();
    };
    RoleLayer.prototype.checkClick = function (stageX, stageY) {
        if (this.assistor.checkClick(stageX, stageY)) {
            return true;
        }
        if (this.player.checkClick(stageX, stageY)) {
            return true;
        }
        return false;
    };
    return RoleLayer;
}(BaseLayer));
__reflect(RoleLayer.prototype, "RoleLayer");
//# sourceMappingURL=RoleLayer.js.map