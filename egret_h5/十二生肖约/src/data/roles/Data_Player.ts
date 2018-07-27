class Data_Player extends BaseData {

    constructor() {
        super();
    }

    public setServiceData(data: any) {
        this.data = data;
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    }

    public get index() {//星座+装备
        return GameUtils.starsName(this.data.index);
    }

    public get level() {//主角等级
        return this.data.level;
    }

    public get isAwoke() {
        return this.data.level >= 50;
    }

    public get damage() {//主角伤害值
        return this.data.damage;
    }
    public get damagePercent() {//主角伤害百分比
        return this.data.damagePercent;
    }
    public get criticalPercent() {//	主角暴击伤害百分比
        return this.data.criticalPercent;
    }
    public get criticalRatePercent() {//主角暴击几率百分比 (底数为0)
        // return 0.3;
        return this.data.criticalRatePercent;
    }
    public get autoAttack(): number { // 自动点击次数
        return this.data.autoAttackCount;
        // return 0;
    }

    public get altarLevel() { //底座等级
        return this.data.baseLevel;
    }
}