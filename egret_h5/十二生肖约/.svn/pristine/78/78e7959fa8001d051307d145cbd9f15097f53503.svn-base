class Data_Mission extends BaseData {

    private gems: Array<Data_BaseGem>;
    // private title: string;
    // private contentPic: string;
    // private contentTx: string;
    // private goldNum: number;
    // private diamondsNum: number;
    // private btnFlag: boolean;
    // private gemsArr: Array<Data_BaseGem>;

    constructor() {
        super();
    }

    protected setServiceData(data: any) {
        this.data = data;
        if (this.data.gems != null) {
            this.gems = [];
            for (let i: number = 0; i < this.data.gems.length; i++) {
                this.gems.push(new Data_BaseGem(this.data.gems[i]));
            }
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    }


    public get missionTitle(): string {
        return this.data.title;
    }

    public get missionContentPic(): string {
        return this.data.contentPic;
    }

    public get missionContentTx(): string {
        return this.data.contentTx;
    }

    public get missionGoldNum(): number {
        return this.data.goldNum;
    }

    public get missionDiamondsNum(): number {
        return this.data.diamondsNum;
    }

    public get missionTarget(): string {
        return this.data.target;
    }

    public get missionStatus(): string {
        return this.data.status;
    }

    public get missionGems(): Array<Data_BaseGem> {
        // const gems: Array<Data_BaseGem> = [];
        // for (let i = 0; i < 3; i++) {
        //     gems.push(new Data_BaseGem());
        // }
        // return this.data.gemsArr = gems;
        return this.gems;
    }

    public get missionBtnFlag(): boolean {
        return this.data.btnFlag;
    }

    // public setMissionData(title: string, contentPic: string, contentTx: string, goldNum: number, diamondsNum: number, gems: Array<Data_BaseGem>) {
    //     this.title = title;
    //     this.contentPic = contentPic;
    //     this.contentTx = contentTx;
    //     this.goldNum = goldNum;
    //     this.diamondsNum = diamondsNum;
    //     this.gemsArr = gems;
    // }
    //差宝石、任务目标

    // private test() {
    //     this.data.title = "踏上征程";
    //     // this.contentPic = "ms_content_pic_1_png";
    //     this.data.contentPic = "ms_content_pic_png";
    //     // this.contentPic = "http://i1.sinaimg.cn/blog/2011/1202/U3370P346DT20111202110614.jpg"
    //     this.data.contentTx = "在一个古老的国度中";
    //     this.data.goldNum = 1554151566165161616165561165;
    //     this.data.btnFlag = false;
    //     this.data.diamondsNum = 94984094890496161658;
    // }
}