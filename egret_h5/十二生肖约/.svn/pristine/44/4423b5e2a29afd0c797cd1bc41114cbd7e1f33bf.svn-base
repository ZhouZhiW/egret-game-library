class Data_Visit extends BaseData {
     

    constructor() {
        super();
    }

    public setServiceData(data: any) {
        if (data == null) {
            return;
        }
        this.data = data;
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    }

    public get isValidate() {
        if (this.data == null) {
            return true;
        }
        return false;
    }

    public get userName(): string {
        return this.data.userName;
    }

    public get userSex(): number {
        return this.data.userSex;
    }

    public get userStar(): number {
        return this.data.userStar;
    }

    public get userAvatar(): string {
        return this.data.userAvatar;
    }

    public get maxChapter(): number {
        return this.data.maxChapter;
    }

    public get gold(): number {
        return this.data.gold;
    }

    public get totDps(): string {
        return this.data.totDps;
    }

    public get masterLevel(): number {
        return this.data.masterLevel;
    }

    public get appointmentLevel(): number {
        return this.data.appointmentLevel;
    }

    public get appointmentAvatar(): string {
        return this.data.appointmentAvatar;
    }
}