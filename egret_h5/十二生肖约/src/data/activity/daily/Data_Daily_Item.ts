class Data_Daily_Item {
    private data: any;
    private materials: Array<Data_Material>;

    private type: number;
    private caption: string;
    private reward: string;

    constructor(data: any) {
        this.data = data;
        // this.reward = reward;
        // this.caption = caption;
        // this.type = type;
        if (data.rewards != null) {
            this.materials = [];
            for (let i = 0; i < data.rewards.length; i++) {
                this.materials.push(new Data_Material(data.rewards[i]));
            }
        }

    }

    public get index(): number {
        return this.data.index;
    }

    public get description(): string {
        return this.data.description;
    }

    public get state(): number {
        return this.data.state;
    }

    public get rewards(): Array<Data_Material> {
        return this.materials;
    }

    public get restDay(): number {
        return this.data.restDay;
    }






    public get btnType() {
        return this.type;
    }

    public get captionTx() {
        return this.caption;
    }

    public get rewardTx() {
        return this.reward;
    }
}