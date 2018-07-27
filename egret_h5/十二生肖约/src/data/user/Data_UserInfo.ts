class Data_UserInfo extends BaseData {
    constructor() {
        super();
    }

    public setServiceData(data: any) {
        this.data = data;
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    }

    public get userId(): string {
        return this.data.userId;
    }
    public get userName(): string { //用户名
        return this.data.userName;
    }
    public get avatar(): string { //用户头像
        return this.data.avatar;
    }
    public get vipType(): number {//会员种类 0 普通 1 月卡 2终身
        return this.data.vipType;
    }
    public get payDiamond(): string {//	钻石消费数
        return this.data.payDiamond;
    }
    public get sumOnlineTime(): number {//在线时间
        return this.data.sumOnlineTime;
    }
    public get gid() {
        return this.data.gid;
    }
    public get appkey() {
        return this.data.appkey;
    }
    public get hlmy_gw() {
        return this.data.hlmy_gw;
    }

}