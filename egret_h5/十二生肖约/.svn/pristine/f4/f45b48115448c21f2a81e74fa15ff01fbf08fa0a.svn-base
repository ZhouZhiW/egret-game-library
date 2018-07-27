class Data_Backpack_Equip {
    private data: any;
    private _rewards: Array<Data_Backpack_Equip_Reward>;
    constructor(data: any) {
        this.data = data;
        this._rewards = [];
        for (let i = 0; i < data.rewards.length; i++) {
            this._rewards.push(new Data_Backpack_Equip_Reward(data.rewards[i]));
        }
    }

    public get clotheId(): number {
        return this.data.clotheId;
    }
    public get bpRewards(): Array<Data_Backpack_Equip_Reward> {
        return this._rewards;
    }
    public get expireTime(): string {
        return this.data.expireTime;
    }
    public get btnStatus(): number {//0 未装备 1装备
        return this.data.btnStatus;
    }
    public get name(): string {
        return this.data.name;
    }
    public get picture(): string {
        return this.data.picture;
    }

    public get level(): number {
        return this.data.level;
    }
}