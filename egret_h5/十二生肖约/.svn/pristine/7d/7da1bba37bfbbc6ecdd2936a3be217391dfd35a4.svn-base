class Data_GameLevel extends BaseData {
    public static Refresh_Hp = 201;
    public static Refresh_BossTime = 202;


    private _maxMonstersHp;
    private _nowMonstersHp;
    private _maxBossTime;
    private _nowBossTime;

    constructor() {
        super();
    }

    public setServiceData(data: any) {
        this.data = data;
        if (this.data == null) {
            console.error("Data_GameLevel setServiceData is null!")
            return;
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    }

    public setHP(nowHp: number, maxHp: number) {
        this._nowMonstersHp = nowHp;
        this._maxMonstersHp = maxHp;
        this.callListener(BaseData.DATA_SOURCE_CLIENT, Data_GameLevel.Refresh_Hp);
    }

    public setBossTime(nowTime: number, maxTime: number) {
        this._nowBossTime = nowTime;
        this._maxBossTime = maxTime;
        this.callListener(BaseData.DATA_SOURCE_CLIENT, Data_GameLevel.Refresh_BossTime);
    }
    public get nowMonstersHp() {//怪物当前总血量
        return this._nowMonstersHp;
    }
    public get maxMonstersHp() {//怪物初始总血量
        return this._maxMonstersHp;
    }


    public get maxBossTime() { //boss关初始时间
        return this._maxBossTime;
    }
    public get nowBossTime() { //boss关剩余时间
        return this._nowBossTime;
    }


    public get chapterIndex() {//关卡序号
        return this.data.chapterIndex;
    }

    public get background() {//场景贴图
        return this.data.background;
    }

    public get maxChapter() {//最高关卡序号
        return this.data.maxChapter;
    }
    public get isBoss() {//是否BOSS关卡
        return this.data.chapterIndex % 5 == 0;
    }

    public get bossMaxTime(): number {
        return this.data.bossMaxTime;
    }
    public get chestID(): number {//是否有飞宝箱
        return this.data.gemStoneId;
    }

    public get maxChapterIsBoss() {
        return this.data.maxChapter % 5 == 0;
    }

    public get waveIndex() {//波序号
        return this.data.waveIndex;
    }
    public get maxWave() {
        return this.data.maxWave;
    }
    public get monsterNum() {//怪物数
        return this.data.monsterNum;
    }
    public get monsterHp() {//怪物血量
        return this.data.monsterHp;
    }
    public get monsterGold() {//怪物金币
        return this.data.monsterGold;
    }
    public get bossChestID() {
        return this.data.bossChestId;
    }
    public get monsterIds(): Array<string> {//怪物贴图ID列表
        return this.data.monsterIds;
    }

}