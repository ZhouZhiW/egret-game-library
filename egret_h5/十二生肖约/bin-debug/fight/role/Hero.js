var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero(data) {
        var _this = _super.call(this) || this;
        _this.attackSpeed = 1;
        _this.active = false;
        _this.attactReady = false;
        _this.makeLabel();
        _this.setIndex(data.index);
        data.addDataListener(_this.refreshHero, _this);
        return _this;
    }
    Hero.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
    };
    Hero.prototype.onDestroy = function () {
        this.destroyAttackTimer();
        _super.prototype.onDestroy.call(this);
    };
    Hero.prototype.makeLabel = function () {
        this.namelabel = new eui.Label();
        this.namelabel.horizontalCenter = 0;
        this.namelabel.bottom = 15;
        this.namelabel.stroke = 2;
        this.namelabel.strokeColor = 0x533f35;
        this.namelabel.size = 13;
        this.namelabel.fontFamily = "黑体";
        this.namelabel.textColor = 0xfff8ea;
        this.levelabel = new eui.Label();
        this.levelabel.horizontalCenter = 0;
        this.levelabel.bottom = 0;
        this.levelabel.size = 13;
        this.levelabel.stroke = 2;
        this.levelabel.strokeColor = 0x533f35;
        this.levelabel.fontFamily = "黑体";
        this.levelabel.italic = true;
        this.levelabel.textColor = 0xfff8ea;
        this.addChild(this.namelabel);
        this.addChild(this.levelabel);
    };
    Hero.prototype.refreshHero = function (e) {
        this.data = e.data;
        this.active = this.data.active;
        this.baseDamage = this.data.damage;
        this.baseDimagePercent = this.data.damagePercent;
        this.setHeroActive();
        this.namelabel.text = this.data.name;
        this.levelabel.text = "LV. " + this.data.level;
    };
    Hero.prototype.setIndex = function (index) {
        if (index == null) {
            return;
        }
        this.index = index;
        this.setHeroPoint();
        this.loadMovieClipDataFactory("resource/mc/hero/hero_" + index, this.getHeroMovieClip);
    };
    Hero.prototype.getHeroMovieClip = function (mcdf) {
        this.heroMC = new egret.MovieClip(mcdf.generateMovieClipData("hero"));
        this.attackEffectMC = new egret.MovieClip(mcdf.generateMovieClipData("skill"));
        this.baseAttackFrameRate = this.heroMC.frameRate;
        this.baseAttackEffectFrameRate = this.attackEffectMC.frameRate;
        this.addChildAt(this.heroMC, 0);
        this.setHeroActive();
    };
    Hero.prototype.destroyAttackTimer = function () {
        if (this.attackTimer != null) {
            this.attackTimer.stop();
            this.attackTimer.removeEventListener(egret.TimerEvent.TIMER, this.attackEvent, this);
            this.attackTimer = null;
        }
    };
    Hero.prototype.setAttackSpeed = function () {
        var delay = Math.round(1000 / this.attackSpeed);
        if (this.attackTimer != null && this.attackTimer.delay == delay) {
            return;
        }
        this.destroyAttackTimer();
        this.attackTimer = new egret.Timer(delay, 0);
        this.attackTimer.addEventListener(egret.TimerEvent.TIMER, this.attackEvent, this);
        this.attackTimer.start();
        if (this.heroMC != null) {
            this.heroMC.frameRate = this.baseAttackFrameRate * this.attackSpeed;
        }
        if (this.attackEffectMC != null) {
            this.attackEffectMC.frameRate = this.baseAttackEffectFrameRate * this.attackSpeed;
        }
        if (this.attackSpeed > 1 && this.spesMC != null) {
            this.spesMC.once(egret.Event.COMPLETE, this.skillMCComplete, this);
            this.addChild(this.spesMC);
            this.spesMC.gotoAndPlay("effect", 1);
        }
    };
    Hero.prototype.setHeroActive = function () {
        if (this.active) {
            this.setAttackSpeed();
        }
        else {
            this.destroyAttackTimer();
        }
        if (this.heroMC == null) {
            return;
        }
        var frame = this.active ? "attack" : "gray";
        this.heroMC.gotoAndStop(frame);
    };
    Hero.prototype.attackEvent = function () {
        this.attack();
    };
    Hero.prototype.attack = function () {
        if (!this.active || FightLayer.inst.monsterLayer.isComplete()) {
            return;
        }
        this.attackMonster();
        this.attackPlay();
    };
    Hero.prototype.attackMonster = function () {
        if (!this.attactReady) {
            return;
        }
        var attackValue = this.getAttackValue();
        var v = FightLayer.inst.monsterLayer.attactMonster(this.getPoint(), attackValue, false, 0, this.getAttackEffectMC());
    };
    Hero.prototype.attackPlay = function () {
        this.attactReady = true;
        if (this.heroMC != null) {
            this.heroMC.gotoAndPlay("attack", 1);
        }
    };
    Hero.prototype.getAttackEffectMC = function () {
        return this.attackEffectMC;
    };
    Hero.prototype.startSkillSpes = function (mcdf, rate) {
        if (!this.active || rate <= 1) {
            return;
        }
        this.attackSpeed = rate;
        if (mcdf != null && this.spesMC == null) {
            this.spesMC = new egret.MovieClip(mcdf.generateMovieClipData("skill"));
        }
        this.setAttackSpeed();
    };
    Hero.prototype.stopSkillSpes = function () {
        if (!this.active) {
            return;
        }
        this.attackSpeed = 1;
        this.setAttackSpeed();
    };
    Hero.prototype.skillMCComplete = function (e) {
        var mc = e.currentTarget;
        if (mc != null && mc.parent != null) {
            mc.parent.removeChild(mc);
        }
        this.spesMC = null;
    };
    Hero.prototype.getAttackValue = function () {
        return this.baseDamage * this.baseDimagePercent;
    };
    Hero.prototype.setHeroPoint = function () {
        switch (this.index) {
            case "pandora":
                this.x = 40;
                this.y = 470;
                break;
            case "poseidon":
                this.x = 430;
                this.y = 470;
                break;
            case "athena":
                this.x = 40;
                this.y = 370;
                break;
            case "handes":
                this.x = 430;
                this.y = 370;
                break;
            case "hera":
                this.x = 40;
                this.y = 270;
                break;
            case "zeus":
                this.x = 430;
                this.y = 270;
                break;
        }
    };
    return Hero;
}(BaseMovieClip));
__reflect(Hero.prototype, "Hero");
//# sourceMappingURL=Hero.js.map