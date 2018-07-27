class SceneLayer extends BaseLayer {
    private GameLevelStatusWait = 1;
    private GameLevelStatusPlaying = 2;
    private TimerRate = 5;

    private goldMcdf: egret.MovieClipDataFactory;

    private MaxBossTime;
    private maxMonstersHp: number;
    private nowMonstersHp: number;

    private gameLevelStatus: number;
    private background: eui.Image;
    private gameLevelData: Data_GameLevel;
    private isBossLevel: boolean;
    private chapterIndex: number;
    private waveIndex: number;

    private bossLevelCurrentCount: number;
    private gameLevelTimer: egret.Timer

    public constructor() {
        super();
        this.touchEnabled = true;
    }
    protected onCreate() {
        super.onCreate();
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

        var mcpath: Array<string> = [];
        mcpath.push("resource/mc/scene/money");
        this.loadMovieClipDataFactorys(mcpath);
        this.gameLevelStatus = this.GameLevelStatusWait;
        DataManager.inst.gameLevel.addDataListener(this.refreshGameLevel, this);
    }

    protected onDestroy() {
        if (this.gameLevelTimer != null) {
            this.gameLevelTimer.stop();
            this.gameLevelTimer.removeEventListener(egret.TimerEvent.TIMER, this.timerEvent, this);
            this.gameLevelTimer = null;
        }
        super.onDestroy();
    }

    protected getMovieClipDataFactorys(mcdfs: Array<egret.MovieClipDataFactory>) {
        this.goldMcdf = mcdfs[0];
    }

    private refreshGameLevel(e: DataEvent) {
        this.gameLevelData = e.data;
        if (this.gameLevelData.monsterNum < 1 || this.gameLevelData.monsterIds.length < 1 || this.gameLevelData.monsterHp < 1 || this.gameLevelData.monsterGold < 1) {
            const dialog = new NTextDialog();
            dialog.setTitle(">>关卡信息错误<<")
            dialog.setContent("monsterNum:" + this.gameLevelData.monsterNum + " monsterIds:" + this.gameLevelData.monsterIds.length + " monsterHp:"
                + this.gameLevelData.monsterHp + " monsterGold:" + this.gameLevelData.monsterGold);
            dialog.setWarn(this.gameLevelData.waveIndex + " / " + this.gameLevelData.maxChapter);
            dialog.show();
            this.gameLevelData = null;
        }
    }

    public bossTimeStop() {
        this.bossLevelCurrentCount = -1;
    }

    private timerEvent() {
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
                    } else if (FightLayer.inst.monsterLayer.isComplete()) {
                        this.sendNextLevel();
                    }
                } else {
                    if (FightLayer.inst.monsterLayer.isComplete()) {
                        this.sendNextLevel();
                    }
                }
                break;
        }
    }

    private newGameLevel() {
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
        FightLayer.inst.monsterLayer.setMonsters(this.gameLevelData.monsterNum, this.gameLevelData.monsterIds,
            this.gameLevelData.monsterHp, this.gameLevelData.monsterGold, this.gameLevelData.bossChestID);
        FightLayer.inst.infoLayer.setChest(this.gameLevelData.chestID);
        FightLayer.inst.infoLayer.setBossChallenge(this.isBossLevel, this.gameLevelData.maxChapterIsBoss);
        FightLayer.inst.infoLayer.showGameLevelInfo(this.gameLevelData.isBoss ? 0 : this.gameLevelData.waveIndex);
        this.gameLevelData = null;
    }


    public jumpGameLevel() {
        FightLayer.inst.monsterLayer.removeAllMonsters();
        this.PickAllGold();
        NetEventManager.inst.pushGameLevelCross(this.chapterIndex, this.waveIndex, 2);
        NetEventManager.inst.pushGameStatistics();
        this.gameLevelStatus = this.GameLevelStatusWait;
    }


    private cancleGameLevel() {
        FightLayer.inst.monsterLayer.removeAllMonsters();
        this.PickAllGold();
        NetEventManager.inst.pushGameLevelCross(this.chapterIndex, this.waveIndex, 1);
        NetEventManager.inst.pushGameStatistics();
        this.gameLevelStatus = this.GameLevelStatusWait;
    }

    private sendNextLevel() {
        this.PickAllGold();
        NetEventManager.inst.pushGameLevelCross(this.chapterIndex, this.waveIndex, 0);
        NetEventManager.inst.pushGameStatistics();
        this.gameLevelStatus = this.GameLevelStatusWait;
    }
    // =============HP==================
    public loseHP(hp: number) {
        if (hp <= 0) {
            return;
        }
        this.nowMonstersHp -= hp;
        DataManager.inst.gameLevel.setHP(this.nowMonstersHp, this.maxMonstersHp);
    }

    // =============Gold==================
    public pushGold(goldData: Data_Gold, point: egret.Point) {
        const goldPoint = this.globalToLocal(point.x, point.y);
        const gold = new Gold(goldData, goldPoint, this.goldMcdf);
        this.addChild(gold);
    }

    private checkGoldClick(stageX: number, stageY: number): boolean {
        for (let i = this.numChildren - 1; i >= 0; i--) {
            const child = this.getChildAt(i);
            if (!(child instanceof Gold)) {
                continue;
            }
            const gold = <Gold>child;
            if (gold.checkClick(stageX, stageY)) {
                const md = gold.pickUp();
                if (md != null) {
                    this.sendGold([md]);
                }
                return true;
            }
        }
        return false;
    }

    private PickAllGold() {
        const datas: Array<Data_Gold> = [];
        for (let i = 0; i < this.numChildren; i++) {
            const child = this.getChildAt(i);
            if (child instanceof Gold) {
                const data = child.pickUp();
                if (data != null) {
                    datas.push(data);
                }
            }
        }
        if (datas.length > 0) {
            this.sendGold(datas);
        }

    }

    private sendGold(golds: Array<Data_Gold>) {
        if (this.chapterIndex == null || this.waveIndex == null) {
            console.error("sendGold gameLevelData is Null !!!");
            return;
        }
        NetEventManager.inst.pushGameLevelGolds(this.chapterIndex, this.waveIndex, golds);
    }
    // ===========================


    public checkClick(stageX: number, stageY: number): boolean {
        if (this.checkGoldClick(stageX, stageY)) {
            return true;
        }
        return false;
    }
}