class NetEventManager {

    private NET_INIT = "100";
    private NET_GAME_LEVEL = "110";
    private NET_ASSET = "111";
    private NET_GAME_STATISTICS = "112";

    public NET_RELEASE_SKILL = "114"
    public NET_OPEN_CHEST = "115";
    public NET_UP_SELECTION = "116";

    public NET_UPGRADE_PANEL = "120";
    public NET_UPGRADE_HERO = "121";

    public NET_GEM_PANEL = "130";
    public NET_GEM_LOCK = "131";
    public NET_GEM_EQUIP = "132"
    public NET_GEM_REPLACE = "133";
    public NET_GEM_REMOVE = "134";
    public NET_GEM_COMPOSE = "135";
    public NET_GEM_LOTTERY = "136";
    public NET_GEM_UP_ESS = "137"

    public NET_MISSION = "140";
    public NET_ACHIEVED = "150";

    public NET_RANK = "160";
    public NET_FRIENDS = "170";

    public NET_ASSISTOR = "178";

    public NET_PEDESTAL_UP = "301";

    public NET_VISIT = "230";
    public NET_HEROTOWER = "231";

    public NET_BACKPACK = "600";
    public NET_EMAIL = "601";
    public NET_EQUIP = "602";

    public NET_PAY = "704";
    public NET_TOPUP = "701";
    public NET_MAIL = "200";
    public NET_BUY = "201";

    public NET_FIRSTPAY = "702";
    public NET_DAILY = "705";
    public NET_ONLINE = "706";
    public NET_INVITATION = "707";

    private static ins: NetEventManager;


    constructor() {
    }

    public getOption(key: string) {
        return egret.getOption(key);
    }

    public static get inst(): NetEventManager {
        if (this.ins == null) {
            this.ins = new NetEventManager();
        }
        return this.ins;
    }

    public pushLogin(loginParam: string) {
        new HttpRequest().login(loginParam);
    }

    public pushInit() {
        new HttpRequest().send(this.NET_INIT);
    }

    public pushGameLevelCross(chapterIndex: number, waveIndex: number, chapterType: number) {//type 0:过关 1:失败 2:终止过关
        new HttpRequest().send(this.NET_GAME_LEVEL, { chapterIndex: chapterIndex, waveIndex: waveIndex, chapterType: chapterType });
    }


    public pushGameLevelGolds(chapterIndex: number, waveIndex: number, golds: Array<Data_Gold>) {
        const json = JSON.stringify(golds);
        new HttpRequest().send(this.NET_ASSET, { chapterIndex: chapterIndex, waveIndex: waveIndex, golds: json });
    }

    public pushGameStatistics() {
        const json = JSON.stringify(FightLayer.inst.gameStatistics);
        FightLayer.inst.gameStatistics.reset();
        new HttpRequest().send(this.NET_GAME_STATISTICS, { statistics: json });
    }

    public pushReleaseSkill(skillIndex: number, requestAction: number) {// requestAction: 1:释放 2 释放完毕 3 冷却完成
        const time = new Date().getTime();
        new HttpRequest().send(this.NET_RELEASE_SKILL, { skillIndex: skillIndex, requestAction: requestAction, time: time });
    }

    public pushUpgradePanel() {
        new HttpRequest().send(this.NET_UPGRADE_PANEL);
    }

    public pushUpgrade(roleId: number, upgradeType: number) {// 
        new HttpRequest().send(this.NET_UPGRADE_HERO, { roleId: roleId, levelUpType: upgradeType });
    }

    public pushGemPanel() {
        new HttpRequest().send(this.NET_GEM_PANEL);
    }

    public pushGemLock(grooveIndex: number, lockType: number) {
        new HttpRequest().send(this.NET_GEM_LOCK, { index: grooveIndex, type: lockType });
    }

    public pushEquipGem(grooveIndex: number, gem: Data_BaseMaterial) {
        const json = JSON.stringify(gem.getBaseData());
        new HttpRequest().send(this.NET_GEM_EQUIP, { index: grooveIndex, gem: json });
    }

    public pushRemoveGem(grooveIndex: number) {
        new HttpRequest().send(this.NET_GEM_REMOVE, { index: grooveIndex });
    }

    public pushReplaceGem(groove1Index: number, groove2Index: number) {
        new HttpRequest().send(this.NET_GEM_REPLACE, { index1: groove1Index, index2: groove2Index });
    }

    public pushComposeGem(composeTyppe: number, gem: Data_BaseMaterial) {
        const json = JSON.stringify(gem.getBaseData());
        new HttpRequest().send(this.NET_GEM_COMPOSE, { type: composeTyppe, gem: json });
    }

    public pushMission() {
        new HttpRequest().send(this.NET_MISSION, { type: 0 });
    }

    public pushNextMission() {
        new HttpRequest().send(this.NET_MISSION, { type: 1 });
    }

    public pushAchieved() {
        new HttpRequest().send(this.NET_ACHIEVED, { type: 0 });
    }

    public pushNextAchieved(type: number, index: number) {
        new HttpRequest().send(this.NET_ACHIEVED, { type, index });
    }
    public pushGemLottery() {
        new HttpRequest().send(this.NET_GEM_LOTTERY);
    }
    public pushGemEssUp() {
        new HttpRequest().send(this.NET_GEM_UP_ESS);
    }
    public pushGemPedestalUp(type: number) {
        new HttpRequest().send(this.NET_PEDESTAL_UP, { type });
    }
    public pushRank(type: number) {
        new HttpRequest().send(this.NET_RANK, { type });
    }
    public pushFriends(type: number) {
        new HttpRequest().send(this.NET_FRIENDS, { type });
    }
    public pushAssistor(ass: string, tp: number, ac: number) {//ass:约会人ID, tp约会人类型(0排行榜1好友),ac(0约会1终止)
        new HttpRequest().send(this.NET_ASSISTOR, { appointmentId: ass, type: tp, action: ac });
    }
    public pushOpenChest(chestID: number, open: boolean) {
        new HttpRequest().send(this.NET_OPEN_CHEST, { gemStoneId: chestID, action: open ? 0 : 1 });
    }
    public pushVisit(v: string) {
        new HttpRequest().send(this.NET_VISIT, { visitId: v });
    }
    public pushHeroTower(v: string) {
        new HttpRequest().send(this.NET_HEROTOWER, { visitId: v });
    }
    public pushBackpack() {
        new HttpRequest().send(this.NET_BACKPACK);
    }
    public pushEMail(id: number, type: number) {
        new HttpRequest().send(this.NET_EMAIL, { backpackId: id, operate: type });
    }
    public pushEquip(id: number, type: number) {
        new HttpRequest().send(this.NET_EQUIP, { backpackId: id, operate: type });
    }
    public pushSelection(index: number) {
        new HttpRequest().send(this.NET_UP_SELECTION, { userStar: index });
    }
    public pushPay(id: number) {//支付
        new HttpRequest().send(this.NET_PAY, { productId: id });
    }
    public pushMAIL() {
        new HttpRequest().send(this.NET_MAIL);
    }
    public pushBuy(id: number) {
        new HttpRequest().send(this.NET_BUY, { index: id });
    }
    public pushTopUp() {
        new HttpRequest().send(this.NET_TOPUP);
    }
    public pushFirstPay(index: number, action: number) {
        new HttpRequest().send(this.NET_FIRSTPAY, { index: index, action: action });
    }//index：打开面板的下标  action：0是打开面板 1是领取奖励
    public pushDaily(index: number, action: number) {
        new HttpRequest().send(this.NET_DAILY, { index: index, action: action });
    }
    public pushOnline(index: number, action: number) {
        new HttpRequest().send(this.NET_ONLINE, { index: index, action: action });
    }
    public pushInvitation(index: number, action: number) {
        new HttpRequest().send(this.NET_INVITATION, { index: index, action: action });
    }
}