var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        _this.BreatchFrameRate = 8;
        _this.AttackFrameRate = 15;
        _this.autoAttackMaxNum = 10;
        _this.lastX = -1;
        _this.lastY = -1;
        _this.clickFlag = 10;
        _this.clickSecondNums = 0;
        _this.x = 80;
        _this.y = 615;
        _this.increasesDamagePercent = 1;
        _this.increasesCriPercent = 0;
        _this.skillAutoAttackNum = 0;
        _this.makeLabel();
        _this.loadMovieClipDataFactory("resource/mc/altar/player_altar", _this.getAltarMovieClip);
        return _this;
    }
    Player.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        this.checkTimer = new egret.Timer(1000, 0);
        this.checkTimer.addEventListener(egret.TimerEvent.TIMER, this.plugEvent, this);
        this.checkTimer.start();
        DataManager.inst.roles.player.addDataListener(this.refreshPlayer, this);
    };
    Player.prototype.onDestroy = function () {
        this.playMC.removeEventListener(egret.Event.COMPLETE, this.attactPlayComplete, this);
        if (this.autoAttackTimer != null) {
            this.autoAttackTimer.stop();
            this.autoAttackTimer.removeEventListener(egret.TimerEvent.TIMER, this.timerEvent, this);
            this.autoAttackTimer = null;
        }
        if (this.checkTimer != null) {
            this.checkTimer.stop();
            this.checkTimer.removeEventListener(egret.TimerEvent.TIMER, this.plugEvent, this);
            this.checkTimer = null;
        }
        _super.prototype.onDestroy.call(this);
    };
    Player.prototype.makeLabel = function () {
        this.levelabel = new eui.Label();
        this.levelabel.horizontalCenter = 0;
        this.levelabel.bottom = -20;
        this.levelabel.size = 18;
        this.levelabel.italic = true;
        this.levelabel.stroke = 2;
        this.levelabel.strokeColor = 0x533f35;
        this.levelabel.fontFamily = "黑体";
        this.levelabel.textColor = 0xfff8ea;
        this.addChildAt(this.levelabel, 2);
    };
    Player.prototype.refreshPlayer = function (e) {
        this.data = e.data;
        this.setIndex(this.data.index);
        this.baseDamage = this.data.damage;
        this.baseDimagePercent = this.data.damagePercent;
        this.baseCritPercent = this.data.criticalPercent;
        this.baseCritDamage = this.data.criticalRatePercent;
        this.baseAutoAttackNum = this.data.autoAttack;
        if (this.levelabel != null) {
            this.levelabel.text = "LV. " + this.data.level;
        }
        this.setAltarLevel(this.data.altarLevel);
        this.checkAutoAttackTimer();
        // console.log("baseDamage: " + this.baseDamage);
        // console.log("baseDimagePercent: " + this.baseDimagePercent);
        // console.log("baseCritPercent: " + this.baseCritPercent);
        // console.log("baseCritRatePercent: " + this.baseCritRatePercent);
    };
    Player.prototype.setIndex = function (index) {
        if (index == null) {
            return;
        }
        if (this.index == null || this.index != index) {
            this.index = index;
            var mcpath = [];
            mcpath.push("resource/mc/player/player_" + index);
            mcpath.push("resource/mc/player/player_effect");
            this.loadMovieClipDataFactorys(mcpath);
        }
    };
    Player.prototype.getMovieClipDataFactorys = function (mcdfs) {
        if (this.playMC != null) {
            this.playMC.removeEventListener(egret.Event.COMPLETE, this.attactPlayComplete, this);
            this.removeChild(this.playMC);
            this.playMC = null;
        }
        if (this.attackEffectMC != null) {
            this.attackEffectMC.removeEventListener(egret.Event.COMPLETE, this.attackEffectPlayComplete, this);
            this.attackEffectMC = null;
        }
        this.playMC = new egret.MovieClip(mcdfs[0].generateMovieClipData("player"));
        this.playMC.addEventListener(egret.Event.COMPLETE, this.attactPlayComplete, this);
        this.addChildAt(this.playMC, 1);
        this.breatch();
        this.attackEffectMC = new egret.MovieClip(mcdfs[1].generateMovieClipData("attack"));
        this.attackEffectMC.addEventListener(egret.Event.COMPLETE, this.attackEffectPlayComplete, this);
    };
    Player.prototype.getAltarMovieClip = function (mcdf) {
        this.altarMC = new egret.MovieClip(mcdf.generateMovieClipData("altar"));
        this.addChildAt(this.altarMC, 0);
        this.setAltarLevel(this.data.altarLevel);
    };
    Player.prototype.setAltarLevel = function (level) {
        if (this.altarMC == null) {
            return;
        }
        var l = Math.ceil(level / 10);
        if (this.altarMC) {
            this.altarMC.gotoAndPlay("level" + l, -1);
        }
    };
    Player.prototype.destroyAutoAttackTimer = function () {
        if (this.autoAttackTimer != null) {
            this.autoAttackTimer.stop();
            this.autoAttackTimer.removeEventListener(egret.TimerEvent.TIMER, this.timerEvent, this);
            this.autoAttackTimer = null;
        }
    };
    Player.prototype.checkAutoAttackTimer = function () {
        var num = this.autoAttackNums();
        if (num < 1) {
            this.destroyAutoAttackTimer();
            return;
        }
        var delay = Math.round(1000 / num);
        if (this.autoAttackTimer != null && this.autoAttackTimer.delay == delay) {
            return;
        }
        this.destroyAutoAttackTimer();
        this.autoAttackTimer = new egret.Timer(delay, 0);
        this.autoAttackTimer.addEventListener(egret.TimerEvent.TIMER, this.timerEvent, this);
        this.autoAttackTimer.start();
    };
    Player.prototype.autoAttackNums = function () {
        var num = this.baseAutoAttackNum + this.skillAutoAttackNum;
        num = (num > this.autoAttackMaxNum) ? this.autoAttackMaxNum : num;
        return num;
    };
    Player.prototype.timerEvent = function () {
        var num = this.autoAttackNums();
        if (num == 0) {
            this.destroyAutoAttackTimer();
            return;
        }
        this.attack();
    };
    Player.prototype.attack = function () {
        if (FightLayer.inst.monsterLayer.isComplete()) {
            return;
        }
        var attackValue = this.getAttackValue();
        var v = FightLayer.inst.monsterLayer.attactMonster(this.getPoint(), attackValue, true, this.dropGoldPercent(), null);
        if (v != 0) {
            FightLayer.inst.gameStatistics.addPlayerAttackCount();
        }
        if (v < 0) {
            FightLayer.inst.gameStatistics.addPlayerCriCount();
            FightLayer.inst.roleLayer.attackCris();
        }
        this.attackPlay();
    };
    Player.prototype.attackPlay = function () {
        if (this.playMC == null) {
            return;
        }
        if (this.playMC.currentLabel == "breath") {
            this.playMC.stop();
            this.playMC.frameRate = this.AttackFrameRate;
        }
        if (this.playMC.isPlaying) {
            this.playMC.frameRate = this.AttackFrameRate * 2;
            return;
        }
        else {
            this.playMC.frameRate = this.AttackFrameRate;
        }
        this.playMC.gotoAndPlay("attack", 1);
    };
    Player.prototype.attactPlayComplete = function () {
        this.breatch();
    };
    Player.prototype.attackEffectPlay = function (x, y) {
        if (this.attackEffectMC == null || this.attackEffectMC.parent == null) {
            return;
        }
        this.attackEffectMC.x = x;
        this.attackEffectMC.y = y;
        this.attackEffectMC.visible = true;
        this.attackEffectMC.gotoAndPlay("attack", 1);
    };
    Player.prototype.attackEffectPlayComplete = function () {
        this.attackEffectMC.visible = false;
    };
    Player.prototype.getAttackValue = function () {
        var currentDamage = 0;
        var random = Math.random();
        var crit = this.baseCritPercent + this.increasesCriPercent;
        if (random <= crit) {
            currentDamage = -1 * this.baseDamage * this.baseDimagePercent * this.baseCritDamage;
        }
        else {
            currentDamage = this.baseDamage * this.baseDimagePercent;
        }
        currentDamage = currentDamage * this.increasesDamagePercent;
        // console.log("attackCrit: " + this.baseDamage + " / " + this.baseDimagePercent + " / " + this.baseCritPercent + " / " + this.baseCritDamage);
        return currentDamage;
    };
    Player.prototype.breatch = function () {
        if (this.playMC == null) {
            return;
        }
        this.playMC.frameRate = this.BreatchFrameRate;
        this.playMC.gotoAndPlay("breath", -1);
    };
    Player.prototype.dropGoldPercent = function () {
        return this.skillDropGoldPercent;
    };
    Player.prototype.plugEvent = function () {
        this.clickSecondNums = 0;
    };
    Player.prototype.checkClick = function (stageX, stageY) {
        if (this.lastX != stageX || this.lastY != stageY) {
            this.lastX = stageX;
            this.lastY = stageY;
        }
        else {
            this.clickSecondNums++;
            // console.log("clickSecondNums: " + this.clickSecondNums);
            if (this.clickSecondNums > this.clickFlag) {
                var dialog = new NTextDialog();
                dialog.content.text = "点击太频繁！";
                dialog.show();
            }
        }
        FightLayer.inst.roleLayer.showPlayerEffect(this.attackEffectMC);
        this.attackEffectPlay(stageX, stageY);
        this.attack();
        return true;
    };
    // ======================skill==================
    Player.prototype.startSkillAuts = function (mc, num) {
        this.skillAutoAttackNum = num;
        if (this.autoAttackMC == null) {
            this.autoAttackMC = mc;
        }
        if (this.autoAttackMC == null) {
            return;
        }
        this.autoAttackMC.gotoAndPlay("effect", -1);
        this.addChild(this.autoAttackMC);
        this.checkAutoAttackTimer();
    };
    Player.prototype.stopSkillAuts = function () {
        this.skillAutoAttackNum = 0;
        if (this.autoAttackMC != null) {
            this.autoAttackMC.stop();
            if (this.autoAttackMC.parent != null) {
                this.autoAttackMC.parent.removeChild(this.autoAttackMC);
            }
        }
        this.checkAutoAttackTimer();
    };
    Player.prototype.startSkillCris = function (mc, cris) {
        if (cris <= 0) {
            return;
        }
        this.increasesCriPercent = cris;
        if (this.crisMC == null) {
            this.crisMC = mc;
        }
        if (this.crisMC == null) {
            return;
        }
        this.crisMC.gotoAndPlay("effect", 1);
        this.crisMC.once(egret.Event.COMPLETE, this.skillMCComplete, this);
        this.addChild(this.crisMC);
    };
    Player.prototype.stopSkillCris = function () {
        this.increasesCriPercent = 0;
    };
    Player.prototype.startSkillCdms = function (mc, cdms) {
        if (cdms <= 0) {
            return;
        }
        this.increasesDamagePercent = cdms;
        if (this.cdmsMC == null) {
            this.cdmsMC = mc;
        }
        if (this.cdmsMC == null) {
            return;
        }
        this.cdmsMC.gotoAndPlay("effect", 1);
        this.cdmsMC.once(egret.Event.COMPLETE, this.skillMCComplete, this);
        this.addChild(this.cdmsMC);
    };
    Player.prototype.stopSkillCdms = function () {
        this.increasesDamagePercent = 1;
    };
    Player.prototype.startSkillSmzms = function (goldPercent) {
        this.skillDropGoldPercent = goldPercent;
    };
    Player.prototype.stopskillSmzms = function () {
        this.skillDropGoldPercent = 0;
    };
    Player.prototype.skillMCComplete = function (e) {
        var mc = e.currentTarget;
        if (mc != null && mc.parent != null) {
            mc.parent.removeChild(mc);
        }
    };
    return Player;
}(BaseMovieClip));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map