var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Monster = (function (_super) {
    __extends(Monster, _super);
    function Monster(mcdf, id, hp, gold, bossChestId) {
        var _this = _super.call(this) || this;
        _this.MoveSpeed = 0;
        _this.index = id;
        _this.monsterMaxHP = hp;
        _this.monsterNowHP = _this.monsterMaxHP;
        _this.goldValue = gold;
        _this.bossChestId = bossChestId;
        _this.moveTimer = new egret.Timer(100, 0);
        _this.moveTimer.addEventListener(egret.TimerEvent.TIMER, _this.move, _this);
        _this.moveTimer.start();
        _this.loadMovieClipDataFactory("resource/mc/monsters/monster_" + _this.index, _this.getMonsterMC);
        if (mcdf != null) {
            _this.monsterBornMC = new egret.MovieClip(mcdf.generateMovieClipData("born"));
            _this.monsterDeadMC = new egret.MovieClip(mcdf.generateMovieClipData("dead"));
        }
        var p = _this.getRandomPoint();
        _this.x = p.x;
        _this.y = p.y;
        return _this;
    }
    Monster.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
    };
    Monster.prototype.onDestroy = function () {
        if (this.moveTimer != null) {
            this.moveTimer.stop();
            this.moveTimer.removeEventListener(egret.TimerEvent.TIMER, this.move, this);
            this.moveTimer = null;
        }
        _super.prototype.onDestroy.call(this);
    };
    Monster.prototype.getMonsterMC = function (mcdf) {
        this.monsterMC = new egret.MovieClip(mcdf.generateMovieClipData("monster"));
        this.monsterMC.alpha = 0;
        this.born();
    };
    Monster.prototype.born = function () {
        if (this.monsterBornMC) {
            this.addChild(this.monsterBornMC);
            this.monsterBornMC.once(egret.Event.COMPLETE, this.bornComplete, this);
            this.monsterBornMC.gotoAndPlay("born", 1);
        }
        egret.Tween.get(this.monsterMC).to({ y: -40, alpha: 1 }, 200, egret.Ease.sineOut)
            .to({ y: 0 }, 200, egret.Ease.sineIn).call(this.start, this);
        this.addChild(this.monsterMC);
    };
    Monster.prototype.bornComplete = function () {
        if (this.monsterBornMC.parent != null) {
            this.monsterBornMC.parent.removeChild(this.monsterBornMC);
        }
        this.monsterBornMC = null;
    };
    Monster.prototype.start = function () {
        if (this.monsterMC == null) {
            return;
        }
        this.hPProgressBar = new G_HPProgressBar();
        this.hPProgressBar.x = -this.hPProgressBar.getW() >> 1;
        this.hPProgressBar.y = (this.monsterMC.height >> 1);
        this.addChild(this.hPProgressBar);
        this.moveAngle = this.getRandomAngle();
        this.monsterMC.gotoAndPlay("walk", -1);
        this.MoveSpeed = 1.6;
    };
    Monster.prototype.move = function () {
        if (this.MoveSpeed == 0) {
            return;
        }
        this.x += this.MoveSpeed * Math.cos(this.moveAngle);
        this.y += this.MoveSpeed * Math.sin(this.moveAngle);
        if (this.x < Monster.MoveAreaLeft || this.x > Monster.MoveAreaRight || this.y < Monster.MoveAreaTop || this.y > Monster.MoveAreaBottom) {
            this.moveAngle = this.getRandomAngle();
        }
    };
    Monster.prototype.attact = function (attactValue, isShowValue, attactGold, attactEffec) {
        if (attactGold === void 0) { attactGold = 0; }
        if (attactEffec === void 0) { attactEffec = null; }
        if (this.monsterNowHP == 0) {
            return 0;
        }
        var value = Math.abs(attactValue);
        var isCris = attactValue < 0;
        var lostHp;
        if (this.monsterNowHP <= value) {
            lostHp = this.monsterNowHP;
            this.monsterNowHP = 0;
            this.dead();
        }
        else {
            lostHp = value;
            this.monsterNowHP -= lostHp;
        }
        if (attactGold > 0) {
            var goldData = Data_Gold.makeGoldData(DataType_Gold.PlayerSkill, this.goldValue * attactGold);
            FightLayer.inst.sceneLayer.pushGold(goldData, this.getPoint());
        }
        if (this.monsterMC != null && attactEffec != null) {
            attactEffec.once(egret.Event.COMPLETE, this.attackEffectComplete, this);
            attactEffec.gotoAndPlay("skill", 1);
            this.addChild(attactEffec);
        }
        FightLayer.inst.sceneLayer.loseHP(lostHp);
        if (this.hPProgressBar) {
            this.hPProgressBar.setHP(this.monsterNowHP, this.monsterMaxHP);
        }
        if (isShowValue) {
            FightLayer.inst.roleLayer.showFloatingAttactValue(attactValue, this.getPoint());
        }
        return isCris ? -lostHp : lostHp;
    };
    Monster.prototype.attackEffectComplete = function (e) {
        var attackEffect = e.currentTarget;
        if (attackEffect.parent != null) {
            attackEffect.parent.removeChild(attackEffect);
        }
    };
    Monster.prototype.dead = function () {
        if (this.monsterDeadMC) {
            this.addChild(this.monsterDeadMC);
            this.monsterDeadMC.once(egret.Event.COMPLETE, this.deadComplete, this);
            this.monsterDeadMC.gotoAndPlay("dead", 1);
        }
        if (this.bossChestId > 0) {
            FightLayer.inst.monsterLayer.showBossChest(this.getPoint());
        }
        else {
            var goldData = Data_Gold.makeGoldData(DataType_Gold.Monster, this.goldValue);
            FightLayer.inst.sceneLayer.pushGold(goldData, this.getPoint());
        }
        egret.Tween.get(this).to({ alpha: 0 }, 200, egret.Ease.sineIn).call(this.end, this);
    };
    Monster.prototype.deadComplete = function () {
        if (this.monsterDeadMC.parent != null) {
            this.monsterDeadMC.parent.removeChild(this.monsterDeadMC);
        }
        this.monsterDeadMC = null;
    };
    Monster.prototype.cancle = function () {
        if (this.monsterNowHP == 0) {
            return;
        }
        this.monsterNowHP = 0;
        egret.Tween.get(this).to({ alpha: 0 }, 200, egret.Ease.sineIn).call(this.end, this);
    };
    Monster.prototype.end = function () {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    };
    Monster.prototype.getDistance = function (p) {
        return this.monsterNowHP == 0 ? -1 : egret.Point.distance(p, this.getPoint());
    };
    Monster.prototype.getRandomPoint = function () {
        if (this.movePoint == null) {
            this.movePoint = new egret.Point();
        }
        var x = Utils.random(Monster.MoveAreaLeft, Monster.MoveAreaRight);
        var y = Utils.random(Monster.MoveAreaTop, Monster.MoveAreaBottom);
        this.movePoint.x = x;
        this.movePoint.y = y;
        return this.movePoint;
    };
    //已经斜边和角度  角度的对边=斜边*sin角度 角度邻边=斜边*cos角度
    //1弧度=180/π度 1度=π/180弧度  两点之间角度：atan2(y2-y1,x2-x1);
    // 90度π/2 180度2π/3 270度 -π/2
    Monster.prototype.getRandomAngle = function (type) {
        if (type === void 0) { type = 0; }
        var p = this.getRandomPoint();
        var h = Math.atan2(p.y - this.y, p.x - this.x);
        if (Math.abs(h) < Math.PI / 2) {
            this.monsterMC.scaleX = -1;
        }
        else {
            this.monsterMC.scaleX = 1;
        }
        return h;
    };
    return Monster;
}(BaseMovieClip));
Monster.MoveAreaLeft = 120;
Monster.MoveAreaTop = 200;
Monster.MoveAreaRight = 360;
Monster.MoveAreaBottom = 500;
__reflect(Monster.prototype, "Monster");
//# sourceMappingURL=Monster.js.map