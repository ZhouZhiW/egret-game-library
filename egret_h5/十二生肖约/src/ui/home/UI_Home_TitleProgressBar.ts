class UI_Home_TitleProgressBar extends BaseComponent {
    private ProgressWidth = 198;
    private homeTitleProgressLevel: eui.Label;
    private homeTitleProgressHP: eui.Image;//179
    private homeTitleProgressHPTx: eui.Label;
    private homeTitleProgressTime: eui.Image;//186
    private homeTitleProgressTimeTx: eui.Label;
    private homeTitleProgressTimeBg: eui.Image;
    private homeTitleProgressClock: eui.Image;

    constructor() {
        super();
    }

    public onCreate() {
        DataManager.inst.gameLevel.addDataListener(this.refreshChapter, this);
        DataManager.inst.gameLevel.addDataListener(this.refreshHP, this, Data_GameLevel.Refresh_Hp);
        DataManager.inst.gameLevel.addDataListener(this.refreshBossTime, this, Data_GameLevel.Refresh_BossTime);
    }

    public onDestroy() {
        DataManager.inst.gameLevel.removeDataListener(this.refreshChapter, this);
        DataManager.inst.gameLevel.removeDataListener(this.refreshHP, this, Data_GameLevel.Refresh_Hp);
        DataManager.inst.gameLevel.removeDataListener(this.refreshBossTime, this, Data_GameLevel.Refresh_BossTime);
    }

    private refreshHP(e: DataEvent) {
        let data: Data_GameLevel = e.data;
        this.setHP(data.nowMonstersHp, data.maxMonstersHp);
    }

    private refreshBossTime(e: DataEvent) {
        let data: Data_GameLevel = e.data;
        this.setBossTime(data.nowBossTime, data.maxBossTime);
    }

    private refreshChapter(e: DataEvent) {
        let data: Data_GameLevel = e.data;
        this.homeTitleProgressTimeTx.visible = data.isBoss;
        this.homeTitleProgressTimeBg.visible = data.isBoss;
        this.homeTitleProgressTime.visible = data.isBoss;
        this.homeTitleProgressClock.visible = data.isBoss;
        this.homeTitleProgressLevel.text = EasyNumber.easyNum(data.waveIndex) + "/" + EasyNumber.easyNum(data.maxWave);
    }

    private setHP(currentHP: number, TotleHP: number) {
        egret.Tween.removeTweens(this.homeTitleProgressHP);
        if (currentHP == TotleHP) {
            this.homeTitleProgressHP.width = this.ProgressWidth;
        } else {
            const w = Math.round(this.ProgressWidth * currentHP / TotleHP);
            egret.Tween.get(this.homeTitleProgressHP).to({ width: w }, 200, egret.Ease.sineIn);
        }
        this.homeTitleProgressHPTx.text = EasyNumber.easyNum(currentHP) + "/" + EasyNumber.easyNum(TotleHP)
    }

    private setBossTime(currentBossTime: number, TotleBossTiem: number) {
        egret.Tween.removeTweens(this.homeTitleProgressTime);
        if (currentBossTime == TotleBossTiem) {
            this.homeTitleProgressTime.width = this.ProgressWidth;
        } else {

            const w = Math.round(this.ProgressWidth * currentBossTime / TotleBossTiem);
            egret.Tween.get(this.homeTitleProgressTime).to({ width: w }, 1000);
        }
        this.homeTitleProgressTimeTx.text = currentBossTime + "s";
    }

}