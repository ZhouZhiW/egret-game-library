class Data_Invitation_Item {
    private data: any;
    private materials: Array<Data_Material>;
    private count: number;

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

    public get target(): number {
        return this.data.target;
    }

    public get currStatus(): number {
        return this.data.currStatus;
    }

    public get restTime(): number {
        return this.data.restTime;
    }

    public get timeCount() {
        return ++this.count;
    }
}