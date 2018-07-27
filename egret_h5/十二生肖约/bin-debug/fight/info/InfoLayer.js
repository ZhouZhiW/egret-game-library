var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var InfoLayer = (function (_super) {
    __extends(InfoLayer, _super);
    function InfoLayer() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        return _this;
    }
    InfoLayer.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        this.bossChallenge = new Boss_Challenge();
        this.bossChallenge.x = 230;
        this.bossChallenge.y = 630;
        this.addChild(this.bossChallenge);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clickHandler, this);
    };
    InfoLayer.prototype.onDestroy = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clickHandler, this);
        _super.prototype.onDestroy.call(this);
    };
    InfoLayer.prototype.showGameLevelInfo = function (value) {
        this.addChild(new GameLevelInfo(value));
    };
    InfoLayer.prototype.setBossChallenge = function (isBoss, maxChapterIsBoss) {
        if (this.bossChallenge == null) {
            return;
        }
        // 0:隐藏状态 1：可进入boss 2：可退出boss
        if (isBoss) {
            this.bossChallenge.setChallengeStatus(2);
        }
        else if (maxChapterIsBoss) {
            this.bossChallenge.setChallengeStatus(1);
        }
        else {
            this.bossChallenge.setChallengeStatus(0);
        }
    };
    InfoLayer.prototype.clickHandler = function (e) {
        if (this.bossChallenge.checkClick(e.stageX, e.stageY)) {
            return;
        }
        if (this.checkChestClick(e.stageX, e.stageY)) {
            return;
        }
        if (FightLayer.inst.monsterLayer.checkClick(e.stageX, e.stageY)) {
            return;
        }
        if (FightLayer.inst.sceneLayer.checkClick(e.stageX, e.stageY)) {
            return;
        }
        FightLayer.inst.roleLayer.checkClick(e.stageX, e.stageY);
    };
    InfoLayer.prototype.setChest = function (chestId) {
        if (chestId <= 0) {
            return;
        }
        this.addChildAt(new Chest(chestId), 0);
    };
    InfoLayer.prototype.checkChestClick = function (stageX, stageY) {
        for (var i = this.numChildren - 1; i >= 0; i--) {
            var child = this.getChildAt(i);
            if (!(child instanceof Chest)) {
                continue;
            }
            var chest = child;
            if (chest.checkClick(stageX, stageY)) {
                return true;
            }
        }
        return false;
    };
    return InfoLayer;
}(BaseLayer));
__reflect(InfoLayer.prototype, "InfoLayer");
//# sourceMappingURL=InfoLayer.js.map