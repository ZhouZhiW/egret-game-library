class Data_Rank_MyFriendsItem {
    private itemType: number;
    private Num: number;

    private data: any;
    constructor(data: any) {
        this.data = data;
    }

    public getItemTyp() {
        return this.itemType;
    }

    public get rankNum() {
        return this.Num;
    }


    public setItemType(type: number) {
        this.itemType = type;
    }

    public setRankNum(index: number) {
        this.Num = index + 1;
    }

    public get rankUserName(): string {
        return this.data.nickName;
    }

    public get rankRestTime(): number {
        return this.data.restTime;
    }

    public get rankUserAvatar(): string {
        return this.data.userAvatar;
    }

    public get rankStar(): number {
        return this.data.userStar;
    }

    public get rankSex(): number {
        return this.data.userSex;
    }

    public get rankBtnStatus(): number {
        return this.data.btnStatus;
    }

    public get rankUserID(): string {
        return this.data.userId;
    }

    public get damage(): number {
        return this.data.damage;
    }
    public get rankSkillType(): number {
        return this.data.rankSkillType;
    }

    public get rankSkillValue(): string {
        return this.data.rankSkillValue;
    }
}