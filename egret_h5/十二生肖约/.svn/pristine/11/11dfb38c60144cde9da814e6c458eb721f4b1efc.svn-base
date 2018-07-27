enum DataType_RankSkillType { Gold, Chest, Damage, Weak }; //Gold 增加金币掉落, Chest 宝箱时间, Damage 伤害, Weak 怪物虚弱

class Data_Rank_item {
    private data: any;
    private count: number;
    constructor(data: any) {
        this.data = data;
        this.count = 0;
    }

    public get timeCount() {
        return ++this.count;
    }

    public get restTime() {
        return this.data.restTime;
    }

    public get saveTime() {
        return this.data.saveTime;
    }
    public get rankSex(): number {//主体性别
        return this.data.userSex;
    }

    public get rankUserName(): string {//主体名字
        return this.data.username;
    }



    public get rankUserAvatar(): string {//主体头像
        return this.data.userAvatar;
    }

    public get rankStar(): number {//主体星座
        return this.data.userStar;
    }

    public get rankRank(): number {//主体排名
        return this.data.rank;
    }

    public get rankSkillType(): number {
        return this.data.rankSkillType;
    }

    public get rankSkillValue(): string {
        return this.data.rankSkillValue;
    }

    // public get rankGold(): string {//金币收益
    //     return this.data.goldPercent;
    // }

    // public get rankFragment(): string {//底座碎片收益
    //     return this.data.appointmentBaseEssencePercent;
    // }

    // public get rankEssence(): string {//宝石精华收益
    //     return this.data.masterBaseEssencePercent;
    // }

    // public get rankGem(): string {//宝石收益
    //     return this.data.gemPercent;
    // }

    public get rankBtnStatus(): number {//0 约会 1 约会中 2 抢约 3 不可约
        return this.data.btnStatus;
    }

    public get rankUserID(): string {//主体id
        return this.data.userId;
    }

    public get rankDps(): number {//约会人dps
        return this.data.damage;
    }

    public get rankDateAvatar(): string {//他约的人的头像
        return this.data.appointmentAvatar;
    }

    public get rankDateName(): string {//他约会人名
        return this.data.appointmentName;
    }

    public get rankDiamond(): number {//约的宝石
        return this.data.diamond;
    }
}