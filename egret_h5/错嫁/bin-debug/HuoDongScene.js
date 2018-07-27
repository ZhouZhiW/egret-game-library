var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 *
 * @author
 *
 */
var HuoDongScene = (function (_super) {
    __extends(HuoDongScene, _super);
    function HuoDongScene(gamescene) {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initstage, _this);
        _this.gamescene = gamescene;
        return _this;
    }
    HuoDongScene.prototype.initstage = function (event) {
        this.gameimgSheet = RES.getRes("gameimg_json");
        this.coverimgSheet = RES.getRes("coverimg_json");
        this.createScene();
    };
    HuoDongScene.prototype.createScene = function () {
        this.huodonglayer = new egret.Sprite();
        this.addChild(this.huodonglayer);
        var ditu = new egret.Bitmap();
        ditu.texture = this.gameimgSheet.getTexture("ditu");
        ditu.fillMode = egret.BitmapFillMode.REPEAT;
        ditu.x = 0;
        ditu.y = 48;
        ditu.width = GameUtils.SCREEN_W;
        ditu.height = GameUtils.SCREEN_H - 82 - 48;
        this.huodonglayer.addChild(ditu);
        ditu.touchEnabled = true;
        var huodongtop = new egret.Bitmap();
        huodongtop.texture = this.gameimgSheet.getTexture("titletop");
        huodongtop.x = 0;
        huodongtop.y = 50;
        this.huodonglayer.addChild(huodongtop);
        var titlehuodong = new egret.Bitmap();
        titlehuodong.texture = this.gameimgSheet.getTexture("titlehuodong");
        titlehuodong.x = (GameUtils.SCREEN_W - titlehuodong.texture.textureWidth) / 2;
        titlehuodong.y = 60;
        this.huodonglayer.addChild(titlehuodong);
        var closeallbtn = new egret.Bitmap();
        closeallbtn.texture = this.coverimgSheet.getTexture("closemenu");
        closeallbtn.x = GameUtils.SCREEN_W - closeallbtn.texture.textureWidth - 5;
        closeallbtn.y = 50;
        this.huodonglayer.addChild(closeallbtn);
        closeallbtn.touchEnabled = true;
        closeallbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeAll, this);
        var titlebottom = new egret.Bitmap();
        titlebottom.texture = this.gameimgSheet.getTexture("titlebottom");
        titlebottom.x = 0;
        titlebottom.y = GameUtils.SCREEN_H - 100;
        this.huodonglayer.addChild(titlebottom);
        var huodonglist = new HuoDongList(this, this.gamescene);
        this.huodonglayer.addChild(huodonglist);
        var myscrollView = new egret.ScrollView();
        myscrollView.setContent(huodonglist);
        myscrollView.width = GameUtils.SCREEN_W;
        myscrollView.height = GameUtils.SCREEN_H - 220;
        myscrollView.x = 0;
        myscrollView.y = 110;
        myscrollView.verticalScrollPolicy = "on";
        myscrollView.horizontalScrollPolicy = "off";
        this.huodonglayer.addChild(myscrollView);
    };
    HuoDongScene.prototype.closeAll = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.gamescene.backJuQing();
    };
    HuoDongScene.prototype.closeScene = function () {
        this.removeChildren();
    };
    return HuoDongScene;
}(egret.DisplayObjectContainer));
__reflect(HuoDongScene.prototype, "HuoDongScene");
//# sourceMappingURL=HuoDongScene.js.map