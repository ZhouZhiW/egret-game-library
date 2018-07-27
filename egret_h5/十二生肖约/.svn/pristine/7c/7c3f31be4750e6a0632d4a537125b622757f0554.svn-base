var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Data_Mission = (function (_super) {
    __extends(Data_Mission, _super);
    // private title: string;
    // private contentPic: string;
    // private contentTx: string;
    // private goldNum: number;
    // private diamondsNum: number;
    // private btnFlag: boolean;
    // private gemsArr: Array<Data_BaseGem>;
    function Data_Mission() {
        return _super.call(this) || this;
    }
    Data_Mission.prototype.setServiceData = function (data) {
        this.data = data;
        if (this.data.gems != null) {
            this.gems = [];
            for (var i = 0; i < this.data.gems.length; i++) {
                this.gems.push(new Data_BaseGem(this.data.gems[i]));
            }
        }
        this.callListener(BaseData.DATA_SOURCE_SERVICE);
    };
    Object.defineProperty(Data_Mission.prototype, "missionTitle", {
        get: function () {
            return this.data.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Mission.prototype, "missionContentPic", {
        get: function () {
            return this.data.contentPic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Mission.prototype, "missionContentTx", {
        get: function () {
            return this.data.contentTx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Mission.prototype, "missionGoldNum", {
        get: function () {
            return this.data.goldNum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Mission.prototype, "missionDiamondsNum", {
        get: function () {
            return this.data.diamondsNum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Mission.prototype, "missionTarget", {
        get: function () {
            return this.data.target;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Mission.prototype, "missionStatus", {
        get: function () {
            return this.data.status;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Mission.prototype, "missionGems", {
        get: function () {
            // const gems: Array<Data_BaseGem> = [];
            // for (let i = 0; i < 3; i++) {
            //     gems.push(new Data_BaseGem());
            // }
            // return this.data.gemsArr = gems;
            return this.gems;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data_Mission.prototype, "missionBtnFlag", {
        get: function () {
            return this.data.btnFlag;
        },
        enumerable: true,
        configurable: true
    });
    return Data_Mission;
}(BaseData));
__reflect(Data_Mission.prototype, "Data_Mission");
//# sourceMappingURL=Data_Mission.js.map