
class Data_GemPanel extends BaseData {
     
    private gemGroup: Array<Data_BaseMaterial>;
    private grooveGroup: Array<Data_BaseMaterial>;
    constructor() {
        super();
        this.gemGroup = [];
        this.grooveGroup = [];
    }

    protected setServiceData(data: any) {
        if (data == null) {
            return;
        }
        this.data = data;
        if (data.unequips != null) {
            this.gemGroup = [];
            for (let i: number = 0; i < data.unequips.length; i++) {
                this.gemGroup.push(new Data_BaseMaterial(this.data.unequips[i]));
            }
        }
        if (data.equips != null) {
            this.grooveGroup = [];
            for (let i: number = 0; i < this.data.equips.length; i++) {
                this.grooveGroup.push(new Data_BaseMaterial(this.data.equips[i]));
            }
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    }


    public get gemPieces(): number {//总宝石精华
        return this.data.gemEssence;
    }

    public get gemLotteryDiamond(): number {//单抽宝箱所需钻石
        return this.data.composeDiamond;
    }

    public get gemPlayerAtt(): number {
        return this.data.gemMasterPercent;
    }
    public get gemPlayerCri(): number {
        return this.data.gemMasterCriticalPercent;
    }
    public get gemPlayerCsd(): number {
        return this.data.gemMasterCriticalRatePercent;
    }
    public get gemHerosAtt(): number {
        return this.data.gemHeroPercent;
    }
    public get gemMoney(): number {
        return this.data.gemGoldPercent;
    }

    public get gemGroupDatas(): Array<Data_BaseMaterial> {
        return this.gemGroup;
    }

    public get grooveGroupDatas(): Array<Data_BaseMaterial> {
        return this.grooveGroup;
    }

    public get groovesCurrent(): number {//守护石槽当前属性
        return this.data.num1;
    }
    public get groovesNext(): number {//守护石槽下级属性
        return this.data.num2;
    }

    public get groovesLevel(): number {//守护石槽等级
        return this.data.troughLevel;
    }
    public get groovesEss(): number {//守护石槽钻石升级
        return this.data.cost;
    }


}