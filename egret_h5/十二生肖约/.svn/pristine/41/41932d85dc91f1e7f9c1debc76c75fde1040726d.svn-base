var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NetEventManager = (function () {
    function NetEventManager() {
        this.NET_INIT = "100";
        this.NET_GAME_LEVEL = "110";
        this.NET_ASSET = "111";
        this.NET_GAME_STATISTICS = "112";
        this.NET_RELEASE_SKILL = "114";
        this.NET_OPEN_CHEST = "115";
        this.NET_UP_SELECTION = "116";
        this.NET_UPGRADE_PANEL = "120";
        this.NET_UPGRADE_HERO = "121";
        this.NET_GEM_PANEL = "130";
        this.NET_GEM_LOCK = "131";
        this.NET_GEM_EQUIP = "132";
        this.NET_GEM_REPLACE = "133";
        this.NET_GEM_REMOVE = "134";
        this.NET_GEM_COMPOSE = "135";
        this.NET_GEM_LOTTERY = "136";
        this.NET_GEM_UP_ESS = "137";
        this.NET_MISSION = "140";
        this.NET_ACHIEVED = "150";
        this.NET_RANK = "160";
        this.NET_FRIENDS = "170";
        this.NET_ASSISTOR = "178";
        this.NET_PEDESTAL_UP = "301";
        this.NET_VISIT = "230";
        this.NET_HEROTOWER = "231";
        this.NET_BACKPACK = "600";
        this.NET_EMAIL = "601";
        this.NET_EQUIP = "602";
        this.NET_PAY = "704";
        this.NET_TOPUP = "701";
        this.NET_MAIL = "200";
        this.NET_BUY = "201";
        this.NET_FIRSTPAY = "702";
        this.NET_DAILY = "705";
        this.NET_ONLINE = "706";
        this.NET_INVITATION = "707";
    }
    NetEventManager.prototype.getOption = function (key) {
        return egret.getOption(key);
    };
    Object.defineProperty(NetEventManager, "inst", {
        get: function () {
            if (this.ins == null) {
                this.ins = new NetEventManager();
            }
            return this.ins;
        },
        enumerable: true,
        configurable: true
    });
    NetEventManager.prototype.pushLogin = function (loginParam) {
        new HttpRequest().login(loginParam);
    };
    NetEventManager.prototype.pushInit = function () {
        new HttpRequest().send(this.NET_INIT);
    };
    NetEventManager.prototype.pushGameLevelCross = function (chapterIndex, waveIndex, chapterType) {
        new HttpRequest().send(this.NET_GAME_LEVEL, { chapterIndex: chapterIndex, waveIndex: waveIndex, chapterType: chapterType });
    };
    NetEventManager.prototype.pushGameLevelGolds = function (chapterIndex, waveIndex, golds) {
        var json = JSON.stringify(golds);
        new HttpRequest().send(this.NET_ASSET, { chapterIndex: chapterIndex, waveIndex: waveIndex, golds: json });
    };
    NetEventManager.prototype.pushGameStatistics = function () {
        var json = JSON.stringify(FightLayer.inst.gameStatistics);
        FightLayer.inst.gameStatistics.reset();
        new HttpRequest().send(this.NET_GAME_STATISTICS, { statistics: json });
    };
    NetEventManager.prototype.pushReleaseSkill = function (skillIndex, requestAction) {
        var time = new Date().getTime();
        new HttpRequest().send(this.NET_RELEASE_SKILL, { skillIndex: skillIndex, requestAction: requestAction, time: time });
    };
    NetEventManager.prototype.pushUpgradePanel = function () {
        new HttpRequest().send(this.NET_UPGRADE_PANEL);
    };
    NetEventManager.prototype.pushUpgrade = function (roleId, upgradeType) {
        new HttpRequest().send(this.NET_UPGRADE_HERO, { roleId: roleId, levelUpType: upgradeType });
    };
    NetEventManager.prototype.pushGemPanel = function () {
        new HttpRequest().send(this.NET_GEM_PANEL);
    };
    NetEventManager.prototype.pushGemLock = function (grooveIndex, lockType) {
        new HttpRequest().send(this.NET_GEM_LOCK, { index: grooveIndex, type: lockType });
    };
    NetEventManager.prototype.pushEquipGem = function (grooveIndex, gem) {
        var json = JSON.stringify(gem.getBaseData());
        new HttpRequest().send(this.NET_GEM_EQUIP, { index: grooveIndex, gem: json });
    };
    NetEventManager.prototype.pushRemoveGem = function (grooveIndex) {
        new HttpRequest().send(this.NET_GEM_REMOVE, { index: grooveIndex });
    };
    NetEventManager.prototype.pushReplaceGem = function (groove1Index, groove2Index) {
        new HttpRequest().send(this.NET_GEM_REPLACE, { index1: groove1Index, index2: groove2Index });
    };
    NetEventManager.prototype.pushComposeGem = function (composeTyppe, gem) {
        var json = JSON.stringify(gem.getBaseData());
        new HttpRequest().send(this.NET_GEM_COMPOSE, { type: composeTyppe, gem: json });
    };
    NetEventManager.prototype.pushMission = function () {
        new HttpRequest().send(this.NET_MISSION, { type: 0 });
    };
    NetEventManager.prototype.pushNextMission = function () {
        new HttpRequest().send(this.NET_MISSION, { type: 1 });
    };
    NetEventManager.prototype.pushAchieved = function () {
        new HttpRequest().send(this.NET_ACHIEVED, { type: 0 });
    };
    NetEventManager.prototype.pushNextAchieved = function (type, index) {
        new HttpRequest().send(this.NET_ACHIEVED, { type: type, index: index });
    };
    NetEventManager.prototype.pushGemLottery = function () {
        new HttpRequest().send(this.NET_GEM_LOTTERY);
    };
    NetEventManager.prototype.pushGemEssUp = function () {
        new HttpRequest().send(this.NET_GEM_UP_ESS);
    };
    NetEventManager.prototype.pushGemPedestalUp = function (type) {
        new HttpRequest().send(this.NET_PEDESTAL_UP, { type: type });
    };
    NetEventManager.prototype.pushRank = function (type) {
        new HttpRequest().send(this.NET_RANK, { type: type });
    };
    NetEventManager.prototype.pushFriends = function (type) {
        new HttpRequest().send(this.NET_FRIENDS, { type: type });
    };
    NetEventManager.prototype.pushAssistor = function (ass, tp, ac) {
        new HttpRequest().send(this.NET_ASSISTOR, { appointmentId: ass, type: tp, action: ac });
    };
    NetEventManager.prototype.pushOpenChest = function (chestID, open) {
        new HttpRequest().send(this.NET_OPEN_CHEST, { gemStoneId: chestID, action: open ? 0 : 1 });
    };
    NetEventManager.prototype.pushVisit = function (v) {
        new HttpRequest().send(this.NET_VISIT, { visitId: v });
    };
    NetEventManager.prototype.pushHeroTower = function (v) {
        new HttpRequest().send(this.NET_HEROTOWER, { visitId: v });
    };
    NetEventManager.prototype.pushBackpack = function () {
        new HttpRequest().send(this.NET_BACKPACK);
    };
    NetEventManager.prototype.pushEMail = function (id, type) {
        new HttpRequest().send(this.NET_EMAIL, { backpackId: id, operate: type });
    };
    NetEventManager.prototype.pushEquip = function (id, type) {
        new HttpRequest().send(this.NET_EQUIP, { backpackId: id, operate: type });
    };
    NetEventManager.prototype.pushSelection = function (index) {
        new HttpRequest().send(this.NET_UP_SELECTION, { userStar: index });
    };
    NetEventManager.prototype.pushPay = function (id) {
        new HttpRequest().send(this.NET_PAY, { productId: id });
    };
    NetEventManager.prototype.pushMAIL = function () {
        new HttpRequest().send(this.NET_MAIL);
    };
    NetEventManager.prototype.pushBuy = function (id) {
        new HttpRequest().send(this.NET_BUY, { index: id });
    };
    NetEventManager.prototype.pushTopUp = function () {
        new HttpRequest().send(this.NET_TOPUP);
    };
    NetEventManager.prototype.pushFirstPay = function (index, action) {
        new HttpRequest().send(this.NET_FIRSTPAY, { index: index, action: action });
    }; //index：打开面板的下标  action：0是打开面板 1是领取奖励
    NetEventManager.prototype.pushDaily = function (index, action) {
        new HttpRequest().send(this.NET_DAILY, { index: index, action: action });
    };
    NetEventManager.prototype.pushOnline = function (index, action) {
        new HttpRequest().send(this.NET_ONLINE, { index: index, action: action });
    };
    NetEventManager.prototype.pushInvitation = function (index, action) {
        new HttpRequest().send(this.NET_INVITATION, { index: index, action: action });
    };
    return NetEventManager;
}());
__reflect(NetEventManager.prototype, "NetEventManager");
//# sourceMappingURL=NetEventManager.js.map