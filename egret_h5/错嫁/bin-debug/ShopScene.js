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
var ShopScene = (function (_super) {
    __extends(ShopScene, _super);
    function ShopScene(gamescene) {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initstage, _this);
        _this.gamescene = gamescene;
        return _this;
    }
    ShopScene.prototype.initstage = function (event) {
        this.gameimgSheet = RES.getRes("gameimg_json");
        this.coverimgSheet = RES.getRes("coverimg_json");
        this.shopimgSheet = RES.getRes("shopimg_json");
        this.createScene();
    };
    ShopScene.prototype.createScene = function () {
        var ditu = new egret.Bitmap();
        ditu.texture = this.gameimgSheet.getTexture("ditu");
        ditu.fillMode = egret.BitmapFillMode.REPEAT;
        ditu.x = 0;
        ditu.y = 48;
        ditu.width = GameUtils.SCREEN_W;
        ditu.height = GameUtils.SCREEN_H - 82 - 48;
        this.addChild(ditu);
        ditu.touchEnabled = true;
        var shoptop = new egret.Bitmap();
        shoptop.texture = this.gameimgSheet.getTexture("titletop");
        shoptop.x = 0;
        shoptop.y = 50;
        this.addChild(shoptop);
        var titleshop = new egret.Bitmap();
        titleshop.texture = this.gameimgSheet.getTexture("titleshop");
        titleshop.x = (GameUtils.SCREEN_W - titleshop.texture.textureWidth) / 2;
        titleshop.y = 60;
        this.addChild(titleshop);
        var titlebottom = new egret.Bitmap();
        titlebottom.texture = this.gameimgSheet.getTexture("titlebottom");
        titlebottom.x = 0;
        titlebottom.y = GameUtils.SCREEN_H - 100;
        this.addChild(titlebottom);
        this.btnlayer = new egret.Sprite();
        this.addChild(this.btnlayer);
        this.listlayer = new egret.Sprite();
        this.addChild(this.listlayer);
        this.closeallbtn = new egret.Bitmap();
        this.closeallbtn.texture = this.coverimgSheet.getTexture("closemenu");
        this.closeallbtn.x = GameUtils.SCREEN_W - this.closeallbtn.texture.textureWidth - 5;
        this.closeallbtn.y = 50;
        this.addChild(this.closeallbtn);
        this.closeallbtn.touchEnabled = true;
        this.closeallbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeAll, this);
        this.drawList();
    };
    ShopScene.prototype.closeAll = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.gamescene.backJuQing();
    };
    ShopScene.prototype.drawList = function () {
        var shopbg0_h = GameUtils.SCREEN_H - 180;
        var list = new BagList(this);
        this.listlayer.addChild(list);
        var myscrollView = new egret.ScrollView();
        myscrollView.setContent(list);
        myscrollView.width = GameUtils.SCREEN_W;
        myscrollView.height = shopbg0_h - 50;
        myscrollView.x = 0;
        myscrollView.y = 110;
        myscrollView.verticalScrollPolicy = "on";
        myscrollView.horizontalScrollPolicy = "off";
        this.listlayer.addChild(myscrollView);
    };
    ShopScene.prototype.drawTishi = function (str1) {
        var tishi = new DrawUtils();
        tishi.createTishi("coverimg_json", "tishikuang1", str1);
        this.addChild(tishi);
    };
    ShopScene.prototype.drawBianCeTishi = function () {
        var tishi = new DrawUtils();
        tishi.createBianCeTishi("gameimg_json", "biance");
        this.addChild(tishi);
    };
    ShopScene.prototype.closeScene = function () {
        this.removeChildren();
    };
    ShopScene.prototype.gotoFriend = function (evt) {
        if (GameUtils.gameSandPause) {
            return;
        }
        this.gamescene.gotoFriend();
    };
    return ShopScene;
}(egret.DisplayObjectContainer));
__reflect(ShopScene.prototype, "ShopScene");
//# sourceMappingURL=ShopScene.js.map