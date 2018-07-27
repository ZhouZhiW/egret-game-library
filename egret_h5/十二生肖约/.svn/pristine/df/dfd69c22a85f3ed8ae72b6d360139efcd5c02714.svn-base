var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SceneLayer = (function (_super) {
    __extends(SceneLayer, _super);
    function SceneLayer() {
        var _this = _super.call(this) || this;
        _this.GameLevelStatusWait = 1;
        _this.GameLevelStatusPlaying = 2;
        _this.TimerRate = 5;
        _this.touchEnabled = true;
        return _this;
    }
    SceneLayer.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        this.background = new eui.Image;
        this.addChild(this.background);
        // this.background.source = "resource/res/base/base_background.png"
        this.background.width = 520;
        this.background.height = 840;
        this.background.x = -20;
        this.background.y = -20;
        // const bg = new TestBG();
        // bg.x = Monster.MoveAreaLeft;
        // bg.y = Monster.MoveAreaTop;
        // bg.width = Monster.MoveAreaRight - Monster.MoveAreaLeft;
        // bg.height = Monster.MoveAreaBottom - Monster.MoveAreaTop;
        // this.addChild(bg)
        this.gameLevelTimer = new egret.Timer(1000 / this.TimerRate, 0);
        this.gameLevelTimer.addEventListener(egret.TimerEvent.TIMER, this.timerEvent, this);
        this.gameLevelTimer.start();
        var mcpath = [];
        mcpath.push("resource/mc/scene/money");
        this.loadMovieClipDataFactorys(mcpath);
        this.gameLevelStatus = this.GameLevelStatusWait;
        DataManager.inst.gameLevel.addDataListener(this.refreshGameLevel, this);
    };
    SceneLayer.prototype.onDestroy = function () {
        if (this.gameLevelTimer != null) {
            this.gameLevelTimer.stop();
            this.gameLevelTimer.removeEventListener(egret.TimerEvent.TIMER, this.timerEvent, this);
            this.gameLevelTimer = null;
        }
        _super.prototype.onDestroy.call(this);
    };
    SceneLayer.prototype.getMovieClipDataFactorys = function (mcdfs) {
        this.goldMcdf = mcdfs[0];
    };
    SceneLayer.prototype.refreshGameLevel = function (e) {
        this.gameLevelData = e.data;
        if (this.gameLevelData.monsterNum < 1 || this.gameLevelData.monsterIds.length < 1 || this.gameLevelData.monsterHp < 1 || this.gameLevelData.monsterGold < 1) {
            var dialog = new NTextDialog();
            dialog.setTitle(">>关卡信息错误<<");
            dialog.setContent("monsterNum:" + this.gameLevelData.monsterNum + " monsterIds:" + this.gameLevelData.monsterIds.length + " monsterHp:"
                + this.gameLevelData.monsterHp + " monsterGold:" + this.gameLevelData.monsterGold);
            dialog.setWarn(this.gameLevelData.waveIndex + " / " + this.gameLevelData.maxChapter);
            dialog.show();
            this.gameLevelData = null;
        }
    };
    SceneLayer.prototype.bossTimeStop = function () {
        this.bossLevelCurrentCount = -1;
    };
    SceneLayer.prototype.timerEvent = function () {
        switch (this.gameLevelStatus) {
            case this.GameLevelStatusWait:
                this.newGameLevel();
                break;
            case this.GameLevelStatusPlaying:
                if (this.isBossLevel) {
                    if (this.bossLevelCurrentCount >= 0 && this.gameLevelTimer.currentCount % this.TimerRate == 0) {
                        this.bossLevelCurrentCount++;
                        DataManager.inst.gameLevel.setBossTime(this.MaxBossTime - this.bossLevelCurrentCount, this.MaxBossTime);
                        if (this.bossLevelCurrentCount == this.MaxBossTime) {
                            this.cancleGameLevel();
                        }
                    }
                    else if (FightLayer.inst.monsterLayer.isComplete()) {
                        this.sendNextLevel();
                    }
                }
                else {
                    if (FightLayer.inst.monsterLayer.isComplete()) {
                        this.sendNextLevel();
                    }
                }
                break;
        }
    };
    SceneLayer.prototype.newGameLevel = function () {
        if (this.gameLevelData == null) {
            return;
        }
        this.gameLevelStatus = this.GameLevelStatusPlaying;
        this.background.source = this.gameLevelData.background;
        this.isBossLevel = this.gameLevelData.isBoss;
        this.chapterIndex = this.gameLevelData.chapterIndex;
        this.waveIndex = this.gameLevelData.waveIndex;
        this.maxMonstersHp = this.gameLevelData.monsterNum * this.gameLevelData.monsterHp;
        this.nowMonstersHp = this.maxMonstersHp;
        DataManager.inst.gameLevel.setHP(this.nowMonstersHp, this.maxMonstersHp);
        if (this.isBossLevel) {
            this.MaxBossTime = this.gameLevelData.bossMaxTime;
            this.bossLevelCurrentCount = 0;
            DataManager.inst.gameLevel.setBossTime(this.MaxBossTime, this.MaxBossTime);
        }
        FightLayer.inst.monsterLayer.setMonsters(this.gameLevelData.monsterNum, this.gameLevelData.monsterIds, this.gameLevelData.monsterHp, this.gameLevelData.monsterGold, this.gameLevelData.bossChestID);
        FightLayer.inst.infoLayer.setChest(this.gameLevelData.chestID);
        FightLayer.inst.infoLayer.setBossChallenge(this.isBossLevel, this.gameLevelData.maxChapterIsBoss);
        FightLayer.inst.infoLayer.showGameLevelInfo(this.gameLevelData.isBoss ? 0 : this.gameLevelData.waveIndex);
        this.gameLevelData = null;
    };
    SceneLayer.prototype.jumpGameLevel = function () {
        FightLayer.inst.monsterLayer.removeAllMonsters();
        this.PickAllGold();
        NetEventManager.inst.pushGameLevelCross(this.chapterIndex, this.waveIndex, 2);
        NetEventManager.inst.pushGameStatistics();
        this.gameLevelStatus = this.GameLevelStatusWait;
    };
    SceneLayer.prototype.cancleGameLevel = function () {
        FightLayer.inst.monsterLayer.removeAllMonsters();
        this.PickAllGold();
        NetEventManager.inst.pushGameLevelCross(this.chapterIndex, this.waveIndex, 1);
        NetEventManager.inst.pushGameStatistics();
        this.gameLevelStatus = this.GameLevelStatusWait;
    };
    SceneLayer.prototype.sendNextLevel = function () {
        this.PickAllGold();
        NetEventManager.inst.pushGameLevelCross(this.chapterIndex, this.waveIndex, 0);
        NetEventManager.inst.pushGameStatistics();
        this.gameLevelStatus = this.GameLevelStatusWait;
    };
    // =============HP==================
    SceneLayer.prototype.loseHP = function (hp) {
        if (hp <= 0) {
            return;
        }
        this.nowMonstersHp -= hp;
        DataManager.inst.gameLevel.setHP(this.nowMonstersHp, this.maxMonstersHp);
    };
    // =============Gold==================
    SceneLayer.prototype.pushGold = function (goldData, point) {
        var goldPoint = this.globalToLocal(point.x, point.y);
        var gold = new Gold(goldData, goldPoint, this.goldMcdf);
        this.addChild(gold);
    };
    SceneLayer.prototype.checkGoldClick = function (stageX, stageY) {
        for (var i = this.numChildren - 1; i >= 0; i--) {
            var child = this.getChildAt(i);
            if (!(child instanceof Gold)) {
                continue;
            }
            var gold = child;
            if (gold.checkClick(stageX, stageY)) {
                var md = gold.pickUp();
                if (md != null) {
                    this.sendGold([md]);
                }
                return true;
            }
        }
        return false;
    };
    SceneLayer.prototype.PickAllGold = function () {
        var datas = [];
        for (var i = 0; i < this.numChildren; i++) {
            var child = this.getChildAt(i);
            if (child instanceof Gold) {
                var data = child.pickUp();
                if (data != null) {
                    datas.push(data);
                }
            }
        }
        if (datas.length > 0) {
            this.sendGold(datas);
        }
    };
    SceneLayer.prototype.sendGold = function (golds) {
        if (this.chapterIndex == null || this.waveIndex == null) {
            console.error("sendGold gameLevelData is Null !!!");
            return;
        }
        NetEventManager.inst.pushGameLevelGolds(this.chapterIndex, this.waveIndex, golds);
    };
    // ===========================
    SceneLayer.prototype.checkClick = function (stageX, stageY) {
        if (this.checkGoldClick(stageX, stageY)) {
            return true;
        }
        return false;
    };
    return SceneLayer;
}(BaseLayer));
__reflect(SceneLayer.prototype, "SceneLayer");
//# sourceMappingURL=SceneLayer.js.map