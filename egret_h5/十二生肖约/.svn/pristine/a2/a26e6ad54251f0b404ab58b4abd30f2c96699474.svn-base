class Data_Upgrade extends BaseData { // 升级信息总数据 对应API：
     
    private upgradeRoles: Array<Data_UpgradeRole>;
    constructor() {
        super();
    }

    public setServiceData(data: any) {
        this.data = data;
        if (this.data == null || this.data.roles == null) {
             console.error("Data_Upgrade setServiceData is null!")
            return;
        }
        this.upgradeRoles = [];
        for (let i: number = 0; i < this.data.roles.length; i++) {
            this.upgradeRoles.push(new Data_UpgradeRole(this.data.roles[i]));
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    }

    public get totalDPS(): number {//总DPS
        return this.data == null ? 0 : this.data.totDps;
    }

    public get roles(): Array<Data_UpgradeRole> {
        return this.upgradeRoles;
    }
    
}