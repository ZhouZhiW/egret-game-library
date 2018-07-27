var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Data_Daily = (function (_super) {
    __extends(Data_Daily, _super);
    // private dailies:Array<number>;
    function Data_Daily() {
        return _super.call(this) || this;
    }
    Data_Daily.prototype.setServiceData = function (data) {
        if (data == null) {
            return;
        }
        this.data = data;
        this.dailies = [];
        for (var i = 0; i < data.dailies.length; i++) {
            this.dailies.push(new Data_Daily_Item(data.dailies[i]));
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    };
    Object.defineProperty(Data_Daily.prototype, "dailyArr", {
        get: function () {
            return this.dailies;
        },
        enumerable: true,
        configurable: true
    });
    //0:终生卡 1:月卡 2：充值 3：英雄 4：星尘 5：领取 6：不能领取 7:排行榜
    Data_Daily.prototype.testData = function (index) {
        switch (index) {
            case 0:
                this.testCaption = "购买终身卡";
                this.testReward = "奖励：钻石*100";
                this.testType = 0;
                break;
            case 1:
                this.testCaption = "购买月卡";
                this.testReward = "奖励：钻石*100";
                this.testType = 1;
                break;
            case 2:
                this.testCaption = "本日充值任意金额";
                this.testReward = "奖励：钻石*100";
                this.testType = 2;
                break;
            case 3:
                this.testCaption = "升级英雄";
                this.testReward = "奖励：钻石*100";
                this.testType = 3;
                break;
            case 4:
                this.testCaption = "主角升级";
                this.testReward = "奖励：钻石*100";
                this.testType = 3;
                break;
            case 5:
                this.testCaption = "王座升级";
                this.testReward = "奖励：钻石*100";
                this.testType = 4;
                break;
            case 6:
                this.testCaption = "神坛升级";
                this.testReward = "奖励：钻石*100";
                this.testType = 4;
                break;
            case 7:
                this.testCaption = "累计获取飞行宝箱";
                this.testReward = "奖励：钻石*100";
                this.testType = 5;
                break;
            case 8:
                this.testCaption = "排行榜约会1次";
                this.testReward = "奖励：钻石*100";
                this.testType = 7;
                break;
            case 9:
                this.testCaption = "约会好友2次";
                this.testReward = "奖励：钻石*100";
                this.testType = 7;
                break;
            case 10:
                this.testCaption = "消灭怪物X只";
                this.testReward = "奖励：钻石*100";
                this.testType = 5;
                break;
        }
    };
    return Data_Daily;
}(BaseData));
__reflect(Data_Daily.prototype, "Data_Daily");
//# sourceMappingURL=Data_Daily.js.map