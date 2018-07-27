var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Chest = (function (_super) {
    __extends(Chest, _super);
    function Chest(chestID) {
        var _this = _super.call(this) || this;
        _this.MoveAreaLeft = -40;
        _this.MoveAreaTop = 200;
        _this.MoveAreaRight = 500;
        _this.MoveAreaBottom = 500;
        _this.MoveSpeed = 1;
        _this.chestID = chestID;
        _this.getRandomPoint();
        _this.moveAngle = _this.getRandomAngle();
        _this.loadMovieClipDataFactory("resource/mc/monsters/flybox", _this.getChestMC);
        return _this;
    }
    Chest.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        this.moveTimer = new egret.Timer(100, 0);
        this.moveTimer.addEventListener(egret.TimerEvent.TIMER, this.move, this);
        this.moveTimer.start();
    };
    Chest.prototype.onDestroy = function () {
        if (this.moveTimer != null) {
            this.moveTimer.stop();
            this.moveTimer.removeEventListener(egret.TimerEvent.TIMER, this.move, this);
            this.moveTimer = null;
        }
        _super.prototype.onDestroy.call(this);
    };
    Chest.prototype.getChestMC = function (mcdf) {
        this.chestMC = new egret.MovieClip(mcdf.generateMovieClipData("flybox"));
        this.addChild(this.chestMC);
        this.chestMC.gotoAndPlay("flybox", -1);
        this.scaleX = this.direction;
    };
    Chest.prototype.checkClick = function (stageX, stageY) {
        if (this.hitTestPoint(stageX, stageY, false)) {
            this.end(true);
            return true;
        }
        else {
            return false;
        }
    };
    Chest.prototype.end = function (isOpen) {
        if (this.chestMC != null) {
            this.chestMC.stop();
        }
        if (this.moveTimer != null) {
            this.moveTimer.stop();
        }
        egret.Tween.get(this).to({ alpha: 0 }, 200).call(this.openComplete, this);
        NetEventManager.inst.pushOpenChest(this.chestID, isOpen);
    };
    Chest.prototype.openComplete = function () {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    };
    Chest.prototype.move = function () {
        this.x += this.MoveSpeed * Math.cos(this.moveAngle);
        this.y += this.MoveSpeed * Math.sin(this.moveAngle);
        if (this.x < this.MoveAreaLeft || this.x > this.MoveAreaRight || this.y < this.MoveAreaTop || this.y > this.MoveAreaBottom) {
            // this.moveAngle = this.getRandomAngle();
            this.end(false);
        }
    };
    Chest.prototype.getRandomPoint = function () {
        var r = Math.random();
        var x = r < 0.5 ? this.MoveAreaLeft : this.MoveAreaRight;
        var y = Utils.random(this.MoveAreaTop, this.MoveAreaBottom);
        this.x = x;
        this.y = y;
        this.direction = x < 0 ? -1 : 1;
    };
    Chest.prototype.getRandomAngle = function () {
        var x = this.x < 0 ? this.MoveAreaRight : this.MoveAreaLeft;
        var y = Utils.random(this.MoveAreaTop, this.MoveAreaBottom);
        var h = Math.atan2(y - this.y, x - this.x);
        return h;
    };
    return Chest;
}(BaseMovieClip));
__reflect(Chest.prototype, "Chest");
//# sourceMappingURL=Chest.js.map