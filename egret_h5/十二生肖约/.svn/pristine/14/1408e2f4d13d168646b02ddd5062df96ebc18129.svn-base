var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DataManager = (function () {
    function DataManager() {
        // ================================================================
        this.RES_USER = "1000";
        this.RES_ROLES = "1001";
        this.RES_ASSET = "1002";
        this.RES_PLAYER_SKILLS = "1003";
        this.RES_GAMELEVEL = "1004";
        this.RES_SKILL = "1005";
        this.RES_UPGRADE = "1006";
        this.RES_GEM = "1007";
        this.RES_MISSION = "1008";
        this.RES_ACHIEVED = "1009";
        this.RES_TREASURES = "1010";
        this.RES_RANK = "1011";
        this.RES_FRIENDS = "1012";
        this.RES_ASSISTOR = "1020";
        this.RES_PEDESTAL = "1021";
        this.netMsgMap = {};
        this.RES_VISIT = "1019";
        this.RES_HEROTOWER = "2000";
        this.RES_BACKPACK = "3000";
        this.RES_HLMYCDK = "4000";
        this.RES_TOPUP = "4002";
        this.RES_MAIL = "1016";
        this.RES_TIPS = "4001";
        this.RES_OFFLINE = "4003";
        this.RES_ACTIVITYS = "4004";
        this.RES_FIRSTPAY = "4005";
        this.RES_MONTHCARD = "4006";
        this.RES_LIFECARD = "4007";
        this.RES_DAILY = "4010";
        this.RES_ONLINE = "4011";
        this.RES_INVITATION = "4012";
        this.initDataMap();
    }
    Object.defineProperty(DataManager, "inst", {
        get: function () {
            if (this.ins == null) {
                this.ins = new DataManager();
            }
            return this.ins;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "userInfo", {
        get: function () {
            return this._userInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "asset", {
        get: function () {
            return this._asset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "roles", {
        get: function () {
            return this._roles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "playerSkills", {
        get: function () {
            return this._skillPancel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "gameLevel", {
        get: function () {
            return this._gameLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "upgrade", {
        get: function () {
            return this._upgrade;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "gemPanel", {
        get: function () {
            return this._gemPanel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "mission", {
        get: function () {
            return this._mission;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "achieved", {
        get: function () {
            return this._achieved;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "treasures", {
        get: function () {
            return this._treasures;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "rank", {
        get: function () {
            return this._rank;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "friends", {
        get: function () {
            return this._friends;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "assistor", {
        get: function () {
            return this._assitor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "pedestal", {
        get: function () {
            return this._pedestal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "visit", {
        get: function () {
            return this._visit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "heroTower", {
        get: function () {
            return this._heroTower;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "backpack", {
        get: function () {
            return this._backpack;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "mail", {
        get: function () {
            return this._mail;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "tips", {
        get: function () {
            return this._tips;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "offline", {
        get: function () {
            return this._offline;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "activitys", {
        get: function () {
            return this._activitys;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "topUp", {
        get: function () {
            return this._topUp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "firstPay", {
        get: function () {
            return this._firstPay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "monthCard", {
        get: function () {
            return this._monthCard;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "lifeCard", {
        get: function () {
            return this._lifeCard;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "daily", {
        get: function () {
            return this._daily;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "online", {
        get: function () {
            return this._online;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "invitation", {
        get: function () {
            return this._invitation;
        },
        enumerable: true,
        configurable: true
    });
    DataManager.prototype.addMsgMap = function (res, data) {
        this.netMsgMap[res] = data;
    };
    DataManager.prototype.initDataMap = function () {
        this._userInfo = new Data_UserInfo();
        this._asset = new Data_Asset();
        this._roles = new Data_Roles();
        this._skillPancel = new Data_SkillPancel();
        this._gameLevel = new Data_GameLevel();
        this._upgrade = new Data_Upgrade();
        this._gemPanel = new Data_GemPanel();
        this._mission = new Data_Mission();
        this._achieved = new Data_Achieved();
        this._treasures = new Data_Treasures();
        this._rank = new Data_Rank();
        this._friends = new Data_Rank_MyFriends();
        this._assitor = new Data_Assistor();
        this._pedestal = new Data_Pedestal();
        this._visit = new Data_Visit();
        this._heroTower = new Data_HeroTower();
        this._backpack = new Data_Backpack();
        this._topUp = new Data_TopUp();
        this._mail = new Data_Mail();
        this._tips = new Data_Tips();
        this._offline = new Data_Offline();
        this._activitys = new Data_ActivityInfos();
        this._firstPay = new Data_Activity_FirstPayment();
        this._monthCard = new Data_Activity_MonthCard();
        this._lifeCard = new Data_Activity_LifeCard();
        this._daily = new Data_Daily();
        this._online = new Data_Online();
        this._invitation = new Data_Invitation();
        this.addMsgMap(this.RES_USER, this._userInfo);
        this.addMsgMap(this.RES_ASSET, this._asset);
        this.addMsgMap(this.RES_ROLES, this._roles);
        this.addMsgMap(this.RES_PLAYER_SKILLS, this._skillPancel);
        this.addMsgMap(this.RES_GAMELEVEL, this._gameLevel);
        this.addMsgMap(this.RES_UPGRADE, this._upgrade);
        this.addMsgMap(this.RES_GEM, this._gemPanel);
        this.addMsgMap(this.RES_MISSION, this._mission);
        this.addMsgMap(this.RES_ACHIEVED, this._achieved);
        this.addMsgMap(this.RES_TREASURES, this._treasures);
        this.addMsgMap(this.RES_RANK, this._rank);
        this.addMsgMap(this.RES_FRIENDS, this._friends);
        this.addMsgMap(this.RES_ASSISTOR, this._assitor);
        this.addMsgMap(this.RES_PEDESTAL, this._pedestal);
        this.addMsgMap(this.RES_VISIT, this._visit);
        this.addMsgMap(this.RES_HEROTOWER, this._heroTower);
        this.addMsgMap(this.RES_BACKPACK, this._backpack);
        this.addMsgMap(this.RES_TOPUP, this._topUp);
        this.addMsgMap(this.RES_MAIL, this._mail);
        this.addMsgMap(this.RES_TIPS, this._tips);
        this.addMsgMap(this.RES_OFFLINE, this._offline);
        this.addMsgMap(this.RES_ACTIVITYS, this._activitys);
        this.addMsgMap(this.RES_FIRSTPAY, this._firstPay);
        this.addMsgMap(this.RES_MONTHCARD, this._monthCard);
        this.addMsgMap(this.RES_LIFECARD, this._lifeCard);
        this.addMsgMap(this.RES_DAILY, this._daily);
        this.addMsgMap(this.RES_ONLINE, this._online);
        this.addMsgMap(this.RES_INVITATION, this._invitation);
    };
    DataManager.prototype.pushDatas = function (messageCode, body) {
        // console.log("============response: " + messageCode + "============");
        for (var i = 0; i < body.length; i++) {
            // console.log("dataId: " + body[i].dataId);
            if (this.netMsgMap[body[i].dataId]) {
                this.netMsgMap[body[i].dataId].setServiceData(body);
            }
            else {
            }
        }
        // console.log("===================================================");
        if (messageCode == "100") {
            if (this.initDataListener) {
                this.initDataListener.callback.call(this.initDataListener.self);
            }
        }
    };
    DataManager.prototype.addInitDataListener = function (callback, self) {
        this.initDataListener = { callback: callback, self: self };
    };
    DataManager.prototype.removeInitDataListener = function () {
        this.initDataListener = null;
    };
    return DataManager;
}());
__reflect(DataManager.prototype, "DataManager");
//# sourceMappingURL=DataManager.js.map