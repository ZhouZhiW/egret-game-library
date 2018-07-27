class Data_Online extends BaseData {
    private onlines: Array<Data_Online_Item>;
    private testCaption: string;
    private testReward: string;
    private testType: number;
    private timeFlag: number;
    constructor() {
        super();

    }

    protected setServiceData(data: any) {
        if (data == null) {
            return;
        }
        this.data = data;
        this.onlines = [];
        for (let i = 0; i < data.onlines.length; i++) {
            this.onlines.push(new Data_Online_Item(data.onlines[i]));
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    }

    public get onlineArr() {
        return this.onlines;
    }

    private testData(index: number) {
        switch (index) {
            case 0:
                this.testCaption = "累计在线5分钟";
                this.testReward = "奖励：钻石*50";
                this.testType = 0;
                this.timeFlag = 10;
                break;
            case 1:
                this.testCaption = "累计在线15分钟";
                this.testReward = "奖励：钻石*100";
                this.testType = 0;
                this.timeFlag = 15;
                break;
            case 2:
                this.testCaption = "累计在线30分钟";
                this.testReward = "奖励：钻石*250";
                this.testType = 0;
                this.timeFlag = 20;
                break;
            case 3:
                this.testCaption = "累计在线60分钟";
                this.testReward = "奖励：碎片*5  精华*5";
                this.testType = 0;
                this.timeFlag = 25;
                break;
        }
    }
}