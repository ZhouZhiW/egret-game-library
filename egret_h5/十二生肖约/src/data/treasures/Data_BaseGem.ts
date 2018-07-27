class Data_BaseGem extends Data_BaseTreasure {

    constructor(data: any) {
        super(data);
    }


    public get gemType(): number {
        return this.data.type;
    }

    public get gemLevel(): number {
        return this.data.level;
    }

    public get gemCounts(): number {
        return this.data.counts;
    }

    public get gemResolveEss(): number {// 守护石精华
        return this.data.decomposeNum;
    }

    public get gemLockDisc(): string {//解锁条件
        return this.data.condition.disc;
    }
    public get gemLockCurrentProgress(): number {//当前进度
        return this.data.condition.curr;
    }
    public get gemLockMaxProgress(): number {//总进度
        return this.data.condition.tot;
    }
    public get gemLockCost(): number {//立即解锁所需钻石
        return this.data.condition.cost;
    }

    public get gemAttributes(): number {
        return this.data.attributes;
    }

}