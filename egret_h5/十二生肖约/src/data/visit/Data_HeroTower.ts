class Data_HeroTower extends BaseData {

    private heroTowerRoles: Array<Data_HeroTowerRole>;

    constructor() {
        super();
    }

    public setServiceData(data: any) {
        this.data = data;
        if (this.data == null || this.data.roles == null) {
            return;
        }
        this.heroTowerRoles = [];
        for (let i = 0; i < this.data.roles.length; i++) {
            this.heroTowerRoles.push(new Data_HeroTowerRole(this.data.roles[i]));
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    }

    public get isValidate() {
        if (this.data == null) {
            return true;
        }
        return false;
    }
    public get totalDPS(): number {//总DPS
        return this.data == null ? 0 : this.data.totDps;
    }

    public get roles(): Array<Data_HeroTowerRole> {
        return this.heroTowerRoles;
    }
}