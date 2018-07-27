var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MonstersLayer = (function (_super) {
    __extends(MonstersLayer, _super);
    function MonstersLayer() {
        var _this = _super.call(this) || this;
        _this.loadMovieClipDataFactory("resource/mc/monsters/monster_effect", _this.getMonsterEffectMCDF);
        return _this;
    }
    MonstersLayer.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
    };
    MonstersLayer.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
    };
    MonstersLayer.prototype.isComplete = function () {
        return this.numChildren == 0;
    };
    MonstersLayer.prototype.showBossChest = function (p) {
        FightLayer.inst.sceneLayer.bossTimeStop();
        FightLayer.inst.infoLayer.setBossChallenge(false, false);
        if (this.bossChest) {
            this.bossChest.drop(p);
            this.addChild(this.bossChest);
        }
        this.bossChest = null;
    };
    MonstersLayer.prototype.setMonsters = function (monsterNums, monsterIDs, monsterHP, monsterGold, bossChestId) {
        this.removeChildren();
        if (bossChestId > 0) {
            this.bossChest = new BossChest(bossChestId);
        }
        for (var i = 0; i < monsterNums; i++) {
            var m = new Monster(this.monsterEffectMCDF, monsterIDs[i % monsterIDs.length], monsterHP, monsterGold, bossChestId);
            this.addChild(m);
        }
    };
    MonstersLayer.prototype.aoeMonsters = function (attactValue) {
        for (var i = 0; i < this.numChildren; i++) {
            var monster = this.getChildAt(i);
            monster.attact(attactValue, true, 0, null);
        }
    };
    MonstersLayer.prototype.attactMonster = function (attactPoint, attactValue, isShowValue, attactGold, attactEffec) {
        if (attactGold === void 0) { attactGold = 0; }
        if (attactEffec === void 0) { attactEffec = null; }
        var attactMonster = null;
        var distance = 100000;
        for (var i = 0; i < this.numChildren; i++) {
            var monster = this.getChildAt(i);
            if (monster instanceof Monster) {
                var d = monster.getDistance(attactPoint);
                if (d >= 0 && d < distance) {
                    attactMonster = monster;
                    distance = d;
                }
            }
        }
        if (attactMonster != null) {
            return attactMonster.attact(attactValue, isShowValue, attactGold, attactEffec);
        }
        else {
            return 0;
        }
    };
    MonstersLayer.prototype.removeAllMonsters = function () {
        for (var i = 0; i < this.numChildren; i++) {
            var monster = this.getChildAt(i);
            if (monster instanceof Monster) {
                monster.cancle();
            }
        }
    };
    MonstersLayer.prototype.checkClick = function (stageX, stageY) {
        for (var i = 0; i < this.numChildren; i++) {
            var m = this.getChildAt(i);
            if (m instanceof BossChest) {
                if (m.checkClick(stageX, stageY)) {
                    return true;
                }
            }
        }
        return false;
    };
    MonstersLayer.prototype.getMonsterEffectMCDF = function (mcdf) {
        this.monsterEffectMCDF = mcdf;
    };
    return MonstersLayer;
}(BaseLayer));
__reflect(MonstersLayer.prototype, "MonstersLayer");
//# sourceMappingURL=MonsterLayer.js.map