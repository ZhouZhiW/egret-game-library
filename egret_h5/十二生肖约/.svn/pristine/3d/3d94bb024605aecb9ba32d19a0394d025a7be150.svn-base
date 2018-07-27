class MonstersLayer extends BaseLayer {
    private monsterEffectMCDF: egret.MovieClipDataFactory;
    private mostersTimer: egret.Timer
    private bossChest: BossChest;
    public constructor() {
        super();
        this.loadMovieClipDataFactory("resource/mc/monsters/monster_effect", this.getMonsterEffectMCDF);
    }

    protected onCreate() {
        super.onCreate();
    }

    protected onDestroy() {
        super.onDestroy();
    }



    public isComplete(): boolean {
        return this.numChildren == 0;
    }



    public showBossChest(p: egret.Point) {
        FightLayer.inst.sceneLayer.bossTimeStop();
        FightLayer.inst.infoLayer.setBossChallenge(false, false);
        if (this.bossChest) {
            this.bossChest.drop(p)
            this.addChild(this.bossChest);
        }
        this.bossChest = null;
    }


    public setMonsters(monsterNums: number, monsterIDs: Array<string>, monsterHP: number, monsterGold: number, bossChestId: number) {
        this.removeChildren();
        if (bossChestId > 0) {
            this.bossChest = new BossChest(bossChestId);
        }
        for (let i = 0; i < monsterNums; i++) {
            const m = new Monster(this.monsterEffectMCDF, monsterIDs[i % monsterIDs.length], monsterHP, monsterGold, bossChestId);
            this.addChild(m);
        }

    }




    public aoeMonsters(attactValue: number) {
        for (let i = 0; i < this.numChildren; i++) {
            const monster = <Monster>this.getChildAt(i);
            monster.attact(attactValue, true, 0, null);
        }
    }

    public attactMonster(attactPoint: egret.Point, attactValue: number, isShowValue: boolean, attactGold: number = 0, attactEffec: egret.MovieClip = null): number {
        let attactMonster: Monster = null;
        let distance: number = 100000;
        for (let i = 0; i < this.numChildren; i++) {
            const monster = this.getChildAt(i);
            if (monster instanceof Monster) {
                const d = monster.getDistance(attactPoint);
                if (d >= 0 && d < distance) {
                    attactMonster = monster;
                    distance = d;
                }
            }
        }
        if (attactMonster != null) {
            return attactMonster.attact(attactValue, isShowValue, attactGold, attactEffec);
        } else {
            return 0;
        }
    }



    public removeAllMonsters() {
        for (let i = 0; i < this.numChildren; i++) {
            const monster = this.getChildAt(i);
            if (monster instanceof Monster) {
                monster.cancle();
            }
        }
    }

    public checkClick(stageX: number, stageY: number): boolean {
        for (let i = 0; i < this.numChildren; i++) {
            const m = this.getChildAt(i);
            if (m instanceof BossChest) {
                if (m.checkClick(stageX, stageY)) {
                    return true;
                }
            }
        }
        return false;
    }

    private getMonsterEffectMCDF(mcdf: egret.MovieClipDataFactory) {
        this.monsterEffectMCDF = mcdf;
    }


}