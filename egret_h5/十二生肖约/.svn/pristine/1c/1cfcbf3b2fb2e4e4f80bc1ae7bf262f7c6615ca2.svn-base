class Data_Backpack_Mail {

    private materials: Array<Data_Material>;

    private _reward: Array<Data_Backpack_Mail_Reward>;
    private gems: Array<Data_BaseGem>;
    private data: any;
    constructor(data: any) {
        this.data = data;
        // this._reward = [];
        // this.gems = [];
        // for (let i = 0; i < data.rewards.length; i++) {
        //     if (data.rewards[i].type != 5) {
        //         this._reward.push(new Data_Backpack_Mail_Reward(data.rewards[i].value, data.rewards[i].type));
        //     } else {
        //         for (let j: number = 0; j < data.rewards[i].value.length; j++) {
        //             this.gems.push(new Data_BaseGem(data.rewards[i].value[j]));
        //         }
        //     }
        // }
        if (data.rewards != null) {
            this.materials = [];
            for (let i = 0; i < data.rewards.length; i++) {
                this.materials.push(new Data_Material(data.rewards[i]));
            }
        }
    }

    public get rewards(): Array<Data_Material> {
        return this.materials;
    }

    public get mailGems(): Array<Data_BaseGem> {
        return this.gems;
    }

    public get emailTitle(): string {
        return this.data.emailTitle;
    }

    public get emailContent(): string {
        return this.data.emailContent;
    }

    public get btnStatus(): number {
        return this.data.btnStatus;
    }

    public get emailId(): number {
        return this.data.emailId;
    }

    public get mailRewards(): Array<Data_Backpack_Mail_Reward> {
        return this._reward;
    }

    public get date(): string {
        return this.data.date;
    }

    public get expireTime(): string {
        return this.data.expireTime;
    }

    public get state(): number {
        return this.data.state;
    }

}