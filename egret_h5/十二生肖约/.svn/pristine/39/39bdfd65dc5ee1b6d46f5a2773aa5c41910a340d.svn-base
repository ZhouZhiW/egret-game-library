class DataManager {
    private static ins: DataManager;

    constructor() {
        this.initDataMap();
    }
    public static get inst(): DataManager {
        if (this.ins == null) {
            this.ins = new DataManager();
        }
        return this.ins;
    }

    public get userInfo(): Data_UserInfo {
        return this._userInfo;
    }
    public get asset(): Data_Asset {
        return this._asset;
    }
    public get roles(): Data_Roles {
        return this._roles;
    }
    public get playerSkills(): Data_SkillPancel {
        return this._skillPancel;
    }
    public get gameLevel(): Data_GameLevel {
        return this._gameLevel;
    }
    public get upgrade(): Data_Upgrade {
        return this._upgrade;
    }
    public get gemPanel(): Data_GemPanel {
        return this._gemPanel;
    }
    public get mission(): Data_Mission {
        return this._mission;
    }
    public get achieved(): Data_Achieved {
        return this._achieved;
    }
    public get treasures(): Data_Treasures {
        return this._treasures;
    }
    public get rank(): Data_Rank {
        return this._rank;
    }
    public get friends(): Data_Rank_MyFriends {
        return this._friends;
    }
    public get assistor(): Data_Assistor {
        return this._assitor;
    }
    public get pedestal(): Data_Pedestal {
        return this._pedestal;
    }
    public get visit(): Data_Visit {
        return this._visit;
    }
    public get heroTower(): Data_HeroTower {
        return this._heroTower;
    }
    public get backpack(): Data_Backpack {
        return this._backpack;
    }
    public get mail(): Data_Mail {
        return this._mail;
    }
    public get tips(): Data_Tips {
        return this._tips;
    }
    public get offline(): Data_Offline {
        return this._offline;
    }
    public get activitys(): Data_ActivityInfos {
        return this._activitys;
    }
    public get topUp(): Data_TopUp {
        return this._topUp;
    }
    public get firstPay(): Data_Activity_FirstPayment {
        return this._firstPay;
    }
    public get monthCard(): Data_Activity_MonthCard {
        return this._monthCard;
    }
    public get lifeCard(): Data_Activity_LifeCard {
        return this._lifeCard;
    }
    public get daily(): Data_Daily {
        return this._daily;
    }
    public get online(): Data_Online {
        return this._online;
    }
    public get invitation(): Data_Invitation {
        return this._invitation;
    }
    // ================================================================
    private RES_USER = "1000";
    private RES_ROLES = "1001";
    private RES_ASSET = "1002";
    private RES_PLAYER_SKILLS = "1003";
    private RES_GAMELEVEL = "1004";
    private RES_SKILL = "1005";
    private RES_UPGRADE = "1006";
    private RES_GEM = "1007"
    private RES_MISSION = "1008";
    private RES_ACHIEVED = "1009";
    private RES_TREASURES = "1010";
    private RES_RANK = "1011";
    private RES_FRIENDS = "1012";
    private RES_ASSISTOR = "1020";
    private RES_PEDESTAL = "1021";
    private netMsgMap = {};
    private RES_VISIT = "1019";
    private RES_HEROTOWER = "2000";
    private RES_BACKPACK = "3000";
    private RES_HLMYCDK = "4000";
    private RES_TOPUP = "4002"
    private RES_MAIL = "1016"
    private RES_TIPS = "4001";
    private RES_OFFLINE = "4003";
    private RES_ACTIVITYS = "4004";
    private RES_FIRSTPAY = "4005";
    private RES_MONTHCARD = "4006";
    private RES_LIFECARD = "4007";
    private RES_DAILY = "4010";
    private RES_ONLINE = "4011";
    private RES_INVITATION = "4012";

    private _userInfo: Data_UserInfo;
    private _asset: Data_Asset;
    private _roles: Data_Roles;
    private _skillPancel: Data_SkillPancel;
    private _gameLevel: Data_GameLevel;
    private _upgrade: Data_Upgrade;
    private _gemPanel: Data_GemPanel;
    private _mission: Data_Mission;
    private _achieved: Data_Achieved;
    private _treasures: Data_Treasures;
    private _rank: Data_Rank;
    private _friends: Data_Rank_MyFriends;
    private _assitor: Data_Assistor;
    private _pedestal: Data_Pedestal;
    private _visit: Data_Visit;
    private _heroTower: Data_HeroTower;
    private _backpack: Data_Backpack;
    private _mail: Data_Mail;
    private _topUp: Data_TopUp;
    private _tips: Data_Tips;
    private _offline: Data_Offline;
    private _activitys: Data_ActivityInfos;
    private _firstPay: Data_Activity_FirstPayment;
    private _monthCard: Data_Activity_MonthCard;
    private _lifeCard: Data_Activity_LifeCard;
    private _daily: Data_Daily;
    private _online: Data_Online;
    private _invitation: Data_Invitation;

    private addMsgMap(res: string, data: BaseData) {
        this.netMsgMap[res] = data;
    }

    private initDataMap() {
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
    }

    public pushDatas(messageCode: string, body: Array<any>) {
        // console.log("============response: " + messageCode + "============");
        for (let i = 0; i < body.length; i++) {
            // console.log("dataId: " + body[i].dataId);
            if (this.netMsgMap[body[i].dataId]) {
                this.netMsgMap[body[i].dataId].setServiceData(body);
            } else {
                // console.error("未找到对应的dataId： " + body[i].dataId);
            }
        }
        // console.log("===================================================");
        if (messageCode == "100") {
            if (this.initDataListener) {
                this.initDataListener.callback.call(this.initDataListener.self);
            }
        }
    }

    private initDataListener: { callback, self };

    public addInitDataListener(callback: Function, self: any) {
        this.initDataListener = { callback: callback, self: self };
    }

    public removeInitDataListener() {
        this.initDataListener = null;
    }
}