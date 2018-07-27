var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Home_TitleAsset = (function (_super) {
    __extends(UI_Home_TitleAsset, _super);
    function UI_Home_TitleAsset() {
        return _super.call(this) || this;
    }
    Object.defineProperty(UI_Home_TitleAsset.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/home/UI_Home_TitleAssetSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    UI_Home_TitleAsset.prototype.onCreate = function () {
        DataManager.inst.asset.addDataListener(this.refreshAsset, this);
        this.gold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedHelpBtn, this);
        this.diamond.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickDiamondHelp, this);
    };
    UI_Home_TitleAsset.prototype.onDestroy = function () {
        DataManager.inst.asset.removeDataListener(this.refreshAsset, this);
        this.gold.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedHelpBtn, this);
        this.diamond.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickDiamondHelp, this);
    };
    UI_Home_TitleAsset.prototype.refreshAsset = function (e) {
        var data = e.data;
        this.goldMC.goldEffect();
        this.goldvalue.text = EasyNumber.easyNum(data.clientGold); // 设置金钱
        this.diamondvalue.text = EasyNumber.easyNum(data.diamond); // 设置钻石
    };
    UI_Home_TitleAsset.prototype.clickDiamondHelp = function (e) {
        UILayer.inst.home.showActivity(13);
    };
    UI_Home_TitleAsset.prototype.clickedHelpBtn = function (e) {
        var helpDialog = new LargeImageDialog("resource/res/ui/home/home_title_gold_help_bg.png ");
        helpDialog.show();
    };
    return UI_Home_TitleAsset;
}(BaseComponent));
__reflect(UI_Home_TitleAsset.prototype, "UI_Home_TitleAsset");
var UI_Home_TitleGold = (function (_super) {
    __extends(UI_Home_TitleGold, _super);
    function UI_Home_TitleGold() {
        var _this = _super.call(this) || this;
        _this.loadMovieClipDataFactory("resource/mc/ui/home/home_gold_effect", _this.getGoldEffectMovieClip);
        return _this;
    }
    UI_Home_TitleGold.prototype.getGoldEffectMovieClip = function (mcdf) {
        this.gold = new egret.MovieClip(mcdf.generateMovieClipData("gold"));
        this.addChild(this.gold);
    };
    UI_Home_TitleGold.prototype.goldEffect = function () {
        if (this.gold == null) {
            return;
        }
        this.gold.gotoAndPlay("effect", 1);
    };
    return UI_Home_TitleGold;
}(BaseMovieClip));
__reflect(UI_Home_TitleGold.prototype, "UI_Home_TitleGold");
//# sourceMappingURL=UI_Home_TitleAsset.js.map