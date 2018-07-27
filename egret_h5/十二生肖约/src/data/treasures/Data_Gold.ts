class Data_Gold extends Data_BaseTreasure {
    private _type: number;
    private _value: number;
    public constructor(data: any) {
        super(data);
        this._type = data.type;
        this._value = data.value;
    }
    public static makeGoldData(type: number, value: number) {
        return new Data_Gold({ type: type, value: value });
    }

}