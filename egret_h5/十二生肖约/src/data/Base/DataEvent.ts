class DataEvent {
    constructor(source: number, type: number, data: any) {
        this.source = source;
        this.type = type;
        this.data = data;
    }
    public source: number;
    public type: number;
    public data: any;
}