class Data_Online_Item {
    private data: any;
    private materials: Array<Data_Material>;

    private type: number;
    private caption: string;
    private reward: string;
    private count: number;
    private flag: number;

    constructor(data: any) {
        this.data = data;
        this.count = 0;
        if (data.rewards != null) {
            this.materials = [];
            for (let i = 0; i < data.rewards.length; i++) {
                this.materials.push(new Data_Material(data.rewards[i]));
            }
        }
    }

    public get state(): number {
        return this.data.state;
    }

    public get description(): string {
        return this.data.description;
    }

    public get timeCount() {
        return ++this.count;
    }

    public get time(): number {
        return this.data.time;
    }

    public get rewards(): Array<Data_Material> {
        return this.materials;
    }

    public get index(): number {
        return this.data.index;
    }

    public get sumOnlineTime(): number {
        return this.data.sumOnlineTime;
    }

}
