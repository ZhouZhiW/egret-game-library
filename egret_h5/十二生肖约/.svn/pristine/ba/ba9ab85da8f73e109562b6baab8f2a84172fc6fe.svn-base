class InfoLayer extends BaseLayer {
    private bossChallenge: Boss_Challenge;

    public constructor() {
        super();
        this.touchEnabled = true;
    }

    protected onCreate() {
        super.onCreate();

        this.bossChallenge = new Boss_Challenge();
        this.bossChallenge.x = 230;
        this.bossChallenge.y = 630;
        this.addChild(this.bossChallenge);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clickHandler, this);
    }

    protected onDestroy() {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clickHandler, this);
        super.onDestroy();
    }

    public showGameLevelInfo(value: number) {
        this.addChild(new GameLevelInfo(value));
    }

    public setBossChallenge(isBoss: boolean, maxChapterIsBoss: boolean) {
        if (this.bossChallenge == null) {
            return;
        }
        // 0:隐藏状态 1：可进入boss 2：可退出boss
        if (isBoss) {
            this.bossChallenge.setChallengeStatus(2);
        } else if (maxChapterIsBoss) {
            this.bossChallenge.setChallengeStatus(1);
        } else {
            this.bossChallenge.setChallengeStatus(0);
        }
    }

    private clickHandler(e: egret.TouchEvent) {
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
    }



    public setChest(chestId: number) {
        if (chestId <= 0) {
            return;
        }
        this.addChildAt(new Chest(chestId), 0);
    }


    private checkChestClick(stageX: number, stageY: number): boolean {
        for (let i = this.numChildren - 1; i >= 0; i--) {
            const child = this.getChildAt(i);
            if (!(child instanceof Chest)) {
                continue;
            }
            const chest = <Chest>child;
            if (chest.checkClick(stageX, stageY)) {
                return true;
            }
        }
        return false;
    }
}