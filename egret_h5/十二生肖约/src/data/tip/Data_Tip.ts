class Data_Tip {
    // 0 英雄 1 星尘 2 背包 3 任务 4 排行榜 5 商城 
    //10首冲 11月卡 12终身 13邀请 14充值 15日常 16在线

    private data: any;
    constructor(data: any) {
        this.data = data;
    }

    public get index(): number {
        return this.data.index;
    }

    public get status(): number { // 0: 隐藏 1：显示
        return this.data.status
    }

}