class Data_Roles extends BaseData {
    private _player: Data_Player;
    private _heros: Array<Data_Hero>;

    constructor() {
        super();
        this._player = new Data_Player();
        this._heros = [];
        for (let i = 0; i < 6; i++) {
            this._heros.push(new Data_Hero());
        }
    }

    public setServiceData(data: any) {
        this.data = data;
        if (this.data == null) {
            console.error("Data_Roles setServiceData is null!")
            return;
        }
        this._player.setServiceData(this.data.player);
        if (this.data.heros == null || this.data.heros.length != 6) {
            console.error("Data_Roles setServiceData heros number is not 6 !")
        }
        for (let i = 0; i < this._heros.length; i++) {
            this._heros[i].setServiceData(this.data.heros[i]);
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    }


    public get player(): Data_Player {
        return this._player;
    }
    public get heros(): Array<Data_Hero> {
        return this._heros;
    }
}