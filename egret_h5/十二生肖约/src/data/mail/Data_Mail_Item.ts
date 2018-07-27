class Data_Mail_Item {
    private data: any;
    constructor(data: any) {
        this.data = data;
    }

    public get description(): string {
        return this.data.description;
    }

    public get cost(): number {
        return this.data.cost;
    }

    public get path(): string {
        return this.data.path;
    }

    public get diamond(): number {
        return this.data.diamond;
    }

    public get index(): number {
        return this.data.index;
    }

    public get canShop(): boolean {
        return this.data.canShop;
    }

    public get errorDescription(): string {
        return this.data.errorDescription;
    }
}