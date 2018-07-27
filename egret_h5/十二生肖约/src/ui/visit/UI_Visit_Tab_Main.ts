class UI_Visit_Tab_Main extends BaseComponent  {
    private heroTower: eui.Button;
    private stardust: eui.Button;
    private goBack: eui.Button;
    private visitTitleUserIcon: eui.Image;
    private visitTitleUserMask: eui.Image;
    private visitName: eui.Label;
    private visitStar: eui.Label;
    private sex: eui.Image;
    private visitDps: eui.Label;
    private visitGoldNum: eui.Label;
    private visitMaxChapter: eui.Label;
    private currentTab: UI_Base_Tab;
    private minClould: eui.Image;
    private maxClould: eui.Image;
    private masterLV: eui.Label;
    private appointmentIcon: eui.Image;
    private appointmentLV: eui.Label;
    private dateUserMask: eui.Image;
    private dateUserAvatar: eui.Image;
    private dateUserBg: eui.Image;

    private starMC: egret.MovieClip;
    private visitId: string;

    constructor(id: string) {
        super();
        this.visitId = id;
        NetEventManager.inst.pushVisit(id);
    }

    protected onCreate() {
        super.onCreate();
        DataManager.inst.visit.addDataListener(this.refreshVisit, this);
        this.heroTower.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedHeroBtn, this);
        this.goBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedGoBack, this);
        this.stardust.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedStardustBtn, this);
        egret.Tween.get(this.maxClould, { loop: true }).to({ x: 480 + 326 }, 180000);
        egret.Tween.get(this.minClould, { loop: true }).to({ x: -203 }, 180000);
        this.startMovie();
    }

    protected onDestroy() {
        DataManager.inst.visit.removeDataListener(this.refreshVisit, this);
        this.heroTower.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedHeroBtn, this);
        this.goBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedGoBack, this);
        this.stardust.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedStardustBtn, this);
        egret.Tween.get(this.maxClould);
        egret.Tween.get(this.minClould);
        super.onDestroy();
    }

    private refreshVisit(e: DataEvent) {
        const data: Data_Visit = e.data;
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
        } else {
            this.appointmentLV.visible = true;
            this.appointmentIcon.visible = true;
            this.dateUserBg.visible = true;
            this.dateUserMask.visible = true;
            this.dateUserAvatar.visible = true;
            this.dateUserAvatar.source = data.appointmentAvatar;
            this.dateUserAvatar.mask = this.dateUserMask;
            this.appointmentLV.text = "LV." + data.appointmentLevel;
        }
    }





    private clickedHeroBtn(e: egret.TouchEvent) {
        this.currentTab = new UI_Visit_Hero_Tab(this.visitId);
        this.addChild(this.currentTab);
        // this.currentTab.showStar(this);
        this.swapChildren(this.currentTab,this.goBack);
    }

    private clickedGoBack(e: egret.TouchEvent) {
        this.parent.removeChild(this);
    }

    private clickedStardustBtn(e: egret.TouchEvent) {
        this.currentTab = new UI_Visit_Stardust_Main_Tab();
        this.addChild(this.currentTab);
        // this.currentTab.showStar(this);
        this.swapChildren(this.currentTab,this.goBack);
    }

    private startMovie() {
        // let data = RES.getRes("resource/mc/ui/visit/star.json");
        // let txtr = RES.getRes("resource/mc/ui/visit/star.png");
        // const mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        // const mc1: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("star"));
        // mc1.x = 100;
        // mc1.y = 100;
        // this.addChild(mc1);
        // mc1.gotoAndPlay("star", 3);
        this.loadMovieClipDataFactory("resource/mc/ui/visit/star", this.starMCComplete);
    }

    private starMCComplete(mc: egret.MovieClipDataFactory) {
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
    }

    private loadMovieClipDataFactory(path: string, callback: Function, self: any = this) {
        let mcTexture = null;
        let mcData = null;
        const check = function () {
            if (mcTexture == null || mcData == null) {
                return;
            }
            const mcDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
            callback.call(self, mcDataFactory);
        }

        const textureLoader = new egret.URLLoader();
        textureLoader.addEventListener(egret.Event.COMPLETE, function textureLoadOver(e) {
            mcTexture = e.currentTarget.data;
            check();
        }, this);
        textureLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        const textureRequest = new egret.URLRequest(path + ".png");
        textureLoader.load(textureRequest);


        let dataLoader = new egret.URLLoader();
        dataLoader.addEventListener(egret.Event.COMPLETE, function dataLoadOver(e) {
            mcData = JSON.parse(e.currentTarget.data);
            check();
        }, this);
        dataLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var dataRequest = new egret.URLRequest(path + ".json");
        dataLoader.load(dataRequest);
    }

    protected get skinPath(): string {
        return "resource/skins/ui/visit/UI_Visit_Tab_MainSkin.exml";
    }
}