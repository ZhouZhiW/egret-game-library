var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Visit_Tab_Main = (function (_super) {
    __extends(UI_Visit_Tab_Main, _super);
    function UI_Visit_Tab_Main(id) {
        var _this = _super.call(this) || this;
        _this.visitId = id;
        NetEventManager.inst.pushVisit(id);
        return _this;
    }
    UI_Visit_Tab_Main.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        DataManager.inst.visit.addDataListener(this.refreshVisit, this);
        this.heroTower.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedHeroBtn, this);
        this.goBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedGoBack, this);
        this.stardust.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedStardustBtn, this);
        egret.Tween.get(this.maxClould, { loop: true }).to({ x: 480 + 326 }, 180000);
        egret.Tween.get(this.minClould, { loop: true }).to({ x: -203 }, 180000);
        this.startMovie();
    };
    UI_Visit_Tab_Main.prototype.onDestroy = function () {
        DataManager.inst.visit.removeDataListener(this.refreshVisit, this);
        this.heroTower.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedHeroBtn, this);
        this.goBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedGoBack, this);
        this.stardust.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedStardustBtn, this);
        egret.Tween.get(this.maxClould);
        egret.Tween.get(this.minClould);
        _super.prototype.onDestroy.call(this);
    };
    UI_Visit_Tab_Main.prototype.refreshVisit = function (e) {
        var data = e.data;
        if (data.isValidate) {
            return;
        }
        this.visitTitleUserIcon.source = data.userAvatar;
        this.visitTitleUserIcon.mask = this.visitTitleUserMask;
        this.visitName.text = data.userName;
        this.visitDps.text = data.totDps;
        this.visitGoldNum.text = EasyNumber.easyNum(data.gold);
        this.visitMaxChapter.text = data.maxChapter + "";
        this.masterLV.text = "LV." + data.masterLevel;
        if (data.appointmentLevel == 0) {
            this.appointmentLV.visible = false;
            this.appointmentIcon.visible = false;
            this.dateUserBg.visible = false;
            this.dateUserMask.visible = false;
            this.dateUserAvatar.visible = false;
        }
        else {
            this.appointmentLV.visible = true;
            this.appointmentIcon.visible = true;
            this.dateUserBg.visible = true;
            this.dateUserMask.visible = true;
            this.dateUserAvatar.visible = true;
            this.dateUserAvatar.source = data.appointmentAvatar;
            this.dateUserAvatar.mask = this.dateUserMask;
            this.appointmentLV.text = "LV." + data.appointmentLevel;
        }
    };
    UI_Visit_Tab_Main.prototype.clickedHeroBtn = function (e) {
        this.currentTab = new UI_Visit_Hero_Tab(this.visitId);
        this.addChild(this.currentTab);
        // this.currentTab.showStar(this);
        this.swapChildren(this.currentTab, this.goBack);
    };
    UI_Visit_Tab_Main.prototype.clickedGoBack = function (e) {
        this.parent.removeChild(this);
    };
    UI_Visit_Tab_Main.prototype.clickedStardustBtn = function (e) {
        this.currentTab = new UI_Visit_Stardust_Main_Tab();
        this.addChild(this.currentTab);
        // this.currentTab.showStar(this);
        this.swapChildren(this.currentTab, this.goBack);
    };
    UI_Visit_Tab_Main.prototype.startMovie = function () {
        // let data = RES.getRes("resource/mc/ui/visit/star.json");
        // let txtr = RES.getRes("resource/mc/ui/visit/star.png");
        // const mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        // const mc1: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("star"));
        // mc1.x = 100;
        // mc1.y = 100;
        // this.addChild(mc1);
        // mc1.gotoAndPlay("star", 3);
        this.loadMovieClipDataFactory("resource/mc/ui/visit/star", this.starMCComplete);
    };
    UI_Visit_Tab_Main.prototype.starMCComplete = function (mc) {
        if (this.starMC != null) {
            this.starMC.stop();
            this.starMC.removeEventListener(egret.Event.COMPLETE, this.starMCComplete, this);
            this.removeChild(this.starMC);
            this.starMC = null;
        }
        this.starMC = new egret.MovieClip(mc.generateMovieClipData("star"));
        this.starMC.gotoAndPlay("star", -1);
        this.starMC.x = 300;
        this.starMC.y = 200;
        this.addChild(this.starMC);
    };
    UI_Visit_Tab_Main.prototype.loadMovieClipDataFactory = function (path, callback, self) {
        if (self === void 0) { self = this; }
        var mcTexture = null;
        var mcData = null;
        var check = function () {
            if (mcTexture == null || mcData == null) {
                return;
            }
            var mcDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
            callback.call(self, mcDataFactory);
        };
        var textureLoader = new egret.URLLoader();
        textureLoader.addEventListener(egret.Event.COMPLETE, function textureLoadOver(e) {
            mcTexture = e.currentTarget.data;
            check();
        }, this);
        textureLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        var textureRequest = new egret.URLRequest(path + ".png");
        textureLoader.load(textureRequest);
        var dataLoader = new egret.URLLoader();
        dataLoader.addEventListener(egret.Event.COMPLETE, function dataLoadOver(e) {
            mcData = JSON.parse(e.currentTarget.data);
            check();
        }, this);
        dataLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var dataRequest = new egret.URLRequest(path + ".json");
        dataLoader.load(dataRequest);
    };
    Object.defineProperty(UI_Visit_Tab_Main.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/visit/UI_Visit_Tab_MainSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    return UI_Visit_Tab_Main;
}(BaseComponent));
__reflect(UI_Visit_Tab_Main.prototype, "UI_Visit_Tab_Main");
//# sourceMappingURL=UI_Visit_Tab_Main.js.map