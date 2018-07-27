class UI_Home_TitleAsset extends BaseComponent {


    private diamond: eui.Group;
    private diamondvalue: eui.Label;
    private gold: eui.Group;
    private goldMC: UI_Home_TitleGold;
    private goldvalue: eui.Label;

    public constructor() {
        super();
    }

    protected get skinPath(): String {
        return "resource/skins/ui/home/UI_Home_TitleAssetSkin.exml";
    }

    protected onCreate() {
        DataManager.inst.asset.addDataListener(this.refreshAsset, this);
        this.gold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedHelpBtn, this);
        this.diamond.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickDiamondHelp, this);
    }

    protected onDestroy() {
        DataManager.inst.asset.removeDataListener(this.refreshAsset, this);
        this.gold.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedHelpBtn, this);
        this.diamond.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickDiamondHelp, this);
    }

    private refreshAsset(e: DataEvent) {
        let data: Data_Asset = e.data;
        this.goldMC.goldEffect();
        this.goldvalue.text = EasyNumber.easyNum(data.clientGold);// 设置金钱
        this.diamondvalue.text = EasyNumber.easyNum(data.diamond);// 设置钻石
    }

    private clickDiamondHelp(e: egret.TouchEvent) {
        UILayer.inst.home.showActivity(13);
    }

    private clickedHelpBtn(e: egret.TouchEvent) {
        const helpDialog = new LargeImageDialog("resource/res/ui/home/home_title_gold_help_bg.png ");
        helpDialog.show();
    }
}

class UI_Home_TitleGold extends BaseMovieClip {
    private gold: egret.MovieClip;

    public constructor() {
        super();
        this.loadMovieClipDataFactory("resource/mc/ui/home/home_gold_effect", this.getGoldEffectMovieClip);
    }

    private getGoldEffectMovieClip(mcdf: egret.MovieClipDataFactory) {
        this.gold = new egret.MovieClip(mcdf.generateMovieClipData("gold"));
        this.addChild(this.gold);
    }

    public goldEffect() {
        if (this.gold == null) {
            return;
        }
        this.gold.gotoAndPlay("effect", 1);
    }

}