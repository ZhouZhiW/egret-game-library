class Data_BaseTreasure {
    protected data: any = null;
    constructor(data: any) {
        this.data = data;
    }


    public get baseData(): any {
        return this.data;
    }

    public get type(): number {
        return this.data.type;
    }
    public get value(): number {
        return this.data.value;
    }
}