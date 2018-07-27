var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Assistor = (function (_super) {
    __extends(Assistor, _super);
    function Assistor(data) {
        var _this = _super.call(this) || this;
        _this.AttackFrameRate = 15;
        _this.BreatchFrameRate = 8;
        _this.isNull = true;
        _this.x = 400;
        _this.y = 615;
        _this.timeTimer = new egret.Timer(1000, 0);
        _this.timeTimer.addEventListener(egret.TimerEvent.TIMER, _this.timeChange, _this);
        _this.makeLabel();
        data.addDataListener(_this.refreshAssistor, _this);
        _this.loadMovieClipDataFactory("resource/mc/altar/assist_altar", _this.getAltarMovieClip);
        return _this;
    }
    Assistor.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
    };
    Assistor.prototype.onDestroy = function () {
        if (this.timeTimer != null) {
            this.timeTimer.stop();
            this.timeTimer.removeEventListener(egret.TimerEvent.TIMER, this.timeChange, this);
            this.timeTimer = null;
        }
        this.destroyAttackTimer();
        _super.prototype.onDestroy.call(this);
    };
    Assistor.prototype.destroyAttackTimer = function () {
        if (this.attackTimer != null) {
            this.attackTimer.stop();
            this.attackTimer.removeEventListener(egret.TimerEvent.TIMER, this.attackEvent, this);
            this.attackTimer = null;
        }
    };
    Assistor.prototype.makeLabel = function () {
        this.assistorInfo = new AssistorInfo();
        this.assistorInfo.visible = false;
        this.assistorInfo.horizontalCenter = 0;
        this.assistorInfo.bottom = -40;
        this.addChild(this.assistorInfo);
    };
    Assistor.prototype.refreshAssistor = function (e) {
        this.data = e.data;
        this.isNull = (this.data.index == "");
        this.setAltarLevel(this.data.altarLevel);
        this.setAltarValue(this.data.altarValue);
        if (this.userId != null && this.userId == e.data.userId + e.data.assistorType) {
            return; //同一个人+同一身份
        }
        this.userId = this.data.userId + this.data.assistorType;
        this.setIndex(this.data.index);
        if (this.isNull) {
            this.assistorTimeEvent(false);
        }
        else {
            this.baseDamage = this.data.damage;
            this.baseDimagePercent = this.data.damagePercent;
            this.restTime = this.data.restTime;
            this.saveTime = this.data.saveTime;
            this.assistorTimeEvent(true);
            this.assistorInfo.setAvatar(this.data.userAvatar);
            this.assistorInfo.setLevel(this.data.userLevel);
            this.assistorInfo.setTime(this.restTime, this.restTime > this.saveTime);
        }
    };
    Assistor.prototype.assistorTimeEvent = function (start) {
        if (this.timeTimer == null) {
            return;
        }
        this.timeTimer.reset();
        if (start) {
            this.timeTimer.start();
        }
        this.assistorInfo.visible = start;
    };
    Assistor.prototype.setIndex = function (index) {
        if (this.index == index) {
            return;
        }
        this.index = index;
        if (this.index == "") {
            this.loadMovieClipDataFactory("resource/mc/player/player_door", this.getAssistorMovieClip);
        }
        else {
            this.loadMovieClipDataFactory("resource/mc/player/player_" + index, this.getAssistorMovieClip);
        }
    };
    Assistor.prototype.getAssistorMovieClip = function (mcdf) {
        if (this.assistMC != null) {
            this.removeChild(this.assistMC);
            this.assistMC = null;
        }
        this.assistMC = new egret.MovieClip(mcdf.generateMovieClipData("player"));
        this.assistMC.scaleX = -1;
        if (this.altarMC == null) {
            this.addChildAt(this.assistMC, 0);
        }
        else if (this.altarMC != null) {
            this.addChildAt(this.assistMC, 1);
        }
        else {
            this.addChild(this.assistMC);
        }
        this.breatch();
    };
    Assistor.prototype.getAltarMovieClip = function (mcdf) {
        this.altarMC = new egret.MovieClip(mcdf.generateMovieClipData("altar"));
        this.addChildAt(this.altarMC, 0);
        this.setAltarLevel(this.data.altarLevel);
    };
    Assistor.prototype.setAltarValue = function (value) {
        if (this.isNull) {
            this.destroyAttackTimer();
            return;
        }
        var d = Math.round(1000 / value);
        if (this.attackTimer != null && this.attackTimer.delay == d) {
            return; //相同不处理
        }
        this.destroyAttackTimer();
        this.attackTimer = new egret.Timer(d, 0);
        this.attackTimer.addEventListener(egret.TimerEvent.TIMER, this.attackEvent, this);
        this.currentAttackFrameRate = Math.ceil(this.AttackFrameRate * value);
        this.attackTimer.start();
    };
    Assistor.prototype.setAltarLevel = function (level) {
        if (this.altarMC == null) {
            return;
        }
        var l = Math.ceil(level / 10);
        if (this.altarMC && !this.isNull) {
            this.altarMC.gotoAndPlay("level" + l, -1);
        }
    };
    Assistor.prototype.breatch = function () {
        if (this.assistMC == null) {
            return;
        }
        this.assistMC.frameRate = this.BreatchFrameRate;
        this.assistMC.gotoAndPlay("breath", -1);
    };
    Assistor.prototype.attack = function () {
        if (this.isNull || FightLayer.inst.monsterLayer.isComplete()) {
            return;
        }
        this.attackMonster();
        this.attackPlay();
    };
    Assistor.prototype.attackMonster = function () {
        if (!this.attactReady) {
            return;
        }
        var attackValue = this.getAttackValue();
        var v = FightLayer.inst.monsterLayer.attactMonster(this.getPoint(), attackValue, true, 0, null);
    };
    Assistor.prototype.attackPlay = function () {
        this.attactReady = true;
        if (this.assistMC == null) {
            return;
        }
        if (this.assistMC.currentLabel == "breath") {
            this.assistMC.stop();
            this.assistMC.frameRate = this.currentAttackFrameRate;
        }
        this.assistMC.gotoAndPlay("attack", 1);
    };
    Assistor.prototype.getAttackValue = function () {
        return this.baseDamage * this.baseDimagePercent;
    };
    Assistor.prototype.attackEvent = function () {
        this.attack();
    };
    Assistor.prototype.timeChange = function () {
        var offsetTime = this.restTime + this.timeTimer.currentCount;
        if (offsetTime >= this.saveTime) {
            this.assistorInfo.setTime(offsetTime, true);
        }
        else {
            this.assistorInfo.setTime(offsetTime, false);
        }
    };
    Assistor.prototype.checkClick = function (stageX, stageY) {
        if (this.isNull && this.assistMC != null && this.assistMC.hitTestPoint(stageX, stageY, false)) {
            UILayer.inst.home.showTab(4, 1);
            return true;
        }
        else {
            return false;
        }
    };
    return Assistor;
}(BaseMovieClip));
__reflect(Assistor.prototype, "Assistor");
var AssistorInfo = (function (_super) {
    __extends(AssistorInfo, _super);
    function AssistorInfo() {
        return _super.call(this) || this;
    }
    AssistorInfo.prototype.onCreate = function () {
        this.infoAvatar.mask = this.infoAvatarMask;
    };
    AssistorInfo.prototype.onDestroy = function () {
    };
    AssistorInfo.prototype.setAvatar = function (url) {
        this.infoAvatar.source = url;
    };
    AssistorInfo.prototype.setLevel = function (level) {
        this.infoLevel.text = "LV. " + level;
    };
    AssistorInfo.prototype.setTime = function (time, overtime) {
        this.infoTime.textColor = overtime ? 0xFF4B00 : 0x39B7CA;
        this.infoTime.strokeColor = overtime ? 0x3B1301 : 0x05293F;
        this.infoTime.text = Utils.formatLongTime(time);
    };
    Object.defineProperty(AssistorInfo.prototype, "skinPath", {
        get: function () {
            return "resource/skins/game/AssistorInfoSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    return AssistorInfo;
}(BaseComponent));
__reflect(AssistorInfo.prototype, "AssistorInfo");
//# sourceMappingURL=Assistor.js.map