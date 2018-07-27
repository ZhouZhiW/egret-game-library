var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Data_Online = (function (_super) {
    __extends(Data_Online, _super);
    function Data_Online() {
        return _super.call(this) || this;
    }
    Data_Online.prototype.setServiceData = function (data) {
        if (data == null) {
            return;
        }
        this.data = data;
        this.onlines = [];
        for (var i = 0; i < data.onlines.length; i++) {
            this.onlines.push(new Data_Online_Item(data.onlines[i]));
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    };
    Object.defineProperty(Data_Online.prototype, "onlineArr", {
        get: function () {
            return this.onlines;
        },
        enumerable: true,
        configurable: true
    });
    Data_Online.prototype.testData = function (index) {
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
    };
    return Data_Online;
}(BaseData));
__reflect(Data_Online.prototype, "Data_Online");
//# sourceMappingURL=Data_Online.js.map