var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Mission_Tab = (function (_super) {
    __extends(UI_Mission_Tab, _super);
    function UI_Mission_Tab() {
        var _this = _super.call(this) || this;
        NetEventManager.inst.pushMission();
        return _this;
    }
    Object.defineProperty(UI_Mission_Tab.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/mission/UI_Mission_TabSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    UI_Mission_Tab.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        // this.missionBtn.enabled = false;
        // this.setData(new Data_Mission());
        // egret.Tween.get(this.missionBtn).wait(5000,false).call(this.setData);
        // this.scroller.verticalScrollBar = null;
        DataManager.inst.mission.addDataListener(this.refreshMission, this);
        this.missionBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClicked, this);
        this.missionBtn.setText("领取");
        this.missionBtn.setTextSize(18);
    };
    UI_Mission_Tab.prototype.refreshMission = function (e) {
        var data = e.data;
        this.dataMission = data;
        // this.contentPic.source = this.dataMission.missionContentPic;
        this.goldNum.text = EasyNumber.easyNum(data.missionGoldNum);
        this.diamondsNum.text = EasyNumber.easyNum(data.missionDiamondsNum);
        this.missionBtn.enabled = data.missionBtnFlag;
        this.title.text = data.missionTitle;
        this.contentPic.fillMode = egret.BitmapFillMode.CLIP;
        this.contentTx.text = data.missionContentTx;
        this.target.text = data.missionTarget;
        this.status.text = data.missionStatus;
        this.gemGroup.removeChildren();
        for (var i = 0; i < data.missionGems.length; i++) {
            var missionGem = new UI_Tre_Gem();
            missionGem.setData(data.missionGems[i]);
            missionGem.setListener(this.clickedGem, this);
            this.gemGroup.addChild(missionGem);
        }
        this.flag = data.missionContentPic;
        this.loadMovieClipDataFactory("resource/mc/" + this.flag, this.getHoroscope, this);
        // this.loadMovieClipDataFactory("resource/mc/hero/hero_athena", this.getHoroscope, this);
    };
    UI_Mission_Tab.prototype.getData = function () {
        return this.dataMission;
    };
    UI_Mission_Tab.prototype.onClicked = function (e) {
        NetEventManager.inst.pushNextMission();
    };
    UI_Mission_Tab.prototype.clickedGem = function (gem) {
        var dialog = new NTextDialog();
        dialog.setTitle(UI_Tre_GemConfig.getGemName(gem.getData().gemType, gem.getData().gemLevel) + "  x" + gem.getData().gemCounts);
        dialog.setContent(UI_Tre_GemConfig.getAttributesInfo(gem.getData().gemType, gem.getData().gemAttributes));
        dialog.show();
    };
    UI_Mission_Tab.prototype.onDestroy = function () {
        DataManager.inst.mission.removeDataListener(this.refreshMission, this);
        this.missionBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClicked, this);
        _super.prototype.onDestroy.call(this);
    };
    UI_Mission_Tab.prototype.getHoroscope = function (mcf) {
        if (this.horoscopeMC != null) {
            this.removeChild(this.horoscopeMC);
        }
        var flagStop = this.flag.split('/')[0];
        var flagScale = this.flag.split('_')[1];
        this.horoscopeMC = new egret.MovieClip(mcf.generateMovieClipData(flagStop));
        this.horoscopeMC.scaleX;
        if (flagScale == "handes" || flagScale == "poseidon" || flagScale == "zeus") {
            this.horoscopeMC.scaleX = -1;
        }
        else {
            this.horoscopeMC.scaleX = 1;
        }
        this.horoscopeMC.x = 100;
        this.horoscopeMC.y = 190;
        this.addChild(this.horoscopeMC);
        this.horoscopeMC.frameRate = 6;
        if (flagStop == "hero") {
            this.horoscopeMC.stop();
        }
        else {
            this.horoscopeMC.gotoAndPlay("breath", -1);
        }
    };
    UI_Mission_Tab.prototype.loadMovieClipDataFactory = function (path, callback, self) {
        if (self === void 0) { self = this; }
        var mcTexture = null;
        var mcData = null;
        var check = function () {
            if (mcTexture == null || mcData == null) {
                return;
            }
            var mcDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
            callback.call(self, mcDataFactory, path);
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
    return UI_Mission_Tab;
}(BaseComponent));
__reflect(UI_Mission_Tab.prototype, "UI_Mission_Tab");
//# sourceMappingURL=UI_Mission_Tab.js.map