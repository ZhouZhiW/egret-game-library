class Data_Backpack_Grid {
    private data: any;
    private gems: Array<Data_BaseGem>;

    private equip: Data_Backpack_Equip;
    private mail: Data_Backpack_Mail;

    constructor(data: any) {
        this.data = data;
        switch (data.type) {
            case 0:
                this.mail = new Data_Backpack_Mail(data);
                break;
            case 1:
                this.equip = new Data_Backpack_Equip(data);
                break;
        }
    }

    public get mailData() {
        return this.mail;
    }

    public get equipData() {
        return this.equip;
    }

    public get type(): number {//0 :邮件 1：装备
        return this.data.type;
    }

    public get path(): string {
        return this.data.path;
    }

}