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
var EndScene = (function (_super) {
    __extends(EndScene, _super);
    function EndScene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initstage, _this);
        return _this;
    }
    EndScene.prototype.initstage = function (event) {
        this.gameimgSheet = RES.getRes("gameimg_json");
        this.menuIndex = 0;
        this.createScene();
    };
    EndScene.prototype.createScene = function () {
        this.endLayer = new egret.Sprite();
        this.addChild(this.endLayer);
        var ditu = new egret.Bitmap();
        ditu.texture = this.gameimgSheet.getTexture("ditu");
        ditu.fillMode = egret.BitmapFillMode.REPEAT;
        ditu.x = 0;
        ditu.y = 48;
        ditu.width = GameUtils.SCREEN_W;
        ditu.height = GameUtils.SCREEN_H - 82 - 48;
        ditu.touchEnabled = true;
        this.endLayer.addChild(ditu);
        this.menuLayer = new egret.Sprite();
        this.addChild(this.menuLayer);
        var settop = new egret.Bitmap();
        settop.texture = this.gameimgSheet.getTexture("titletop");
        settop.x = 0;
        settop.y = 50;
        this.endLayer.addChild(settop);
        var titleset = new egret.Bitmap();
        titleset.texture = this.gameimgSheet.getTexture("titleend");
        titleset.x = (GameUtils.SCREEN_W - 142) / 2;
        titleset.y = 60;
        this.endLayer.addChild(titleset);
        var closeset = new egret.Bitmap();
        closeset.texture = this.gameimgSheet.getTexture("close");
        closeset.x = GameUtils.SCREEN_W - closeset.texture.textureWidth;
        closeset.y = 55;
        this.endLayer.addChild(closeset);
        closeset.touchEnabled = true;
        closeset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeEnd, this);
        this.drawMenu();
        var titlebottom = new egret.Bitmap();
        titlebottom.texture = this.gameimgSheet.getTexture("titlebottom");
        titlebottom.x = 0;
        titlebottom.y = GameUtils.SCREEN_H - 100;
        this.endLayer.addChild(titlebottom);
        this.listLayer = new egret.Sprite();
        this.endLayer.addChild(this.listLayer);
        this.drawList();
    };
    EndScene.prototype.drawList = function () {
        var endList = new EndList(this, this.menuIndex);
        this.listLayer.addChild(endList);
        var myscrollView = new egret.ScrollView();
        myscrollView.setContent(endList);
        myscrollView.x = 0;
        myscrollView.y = 160;
        myscrollView.width = GameUtils.SCREEN_W;
        myscrollView.height = GameUtils.SCREEN_H - 265;
        myscrollView.verticalScrollPolicy = "on";
        myscrollView.horizontalScrollPolicy = "off";
        this.listLayer.addChild(myscrollView);
    };
    EndScene.prototype.drawMenu = function () {
        var meun_0 = new egret.Bitmap();
        meun_0.texture = this.gameimgSheet.getTexture(this.menuIndex == 0 ? "btn_end_type2" : "btn_end_type0");
        meun_0.x = GameUtils.SCREEN_W / 2 - 86 - 10;
        meun_0.y = 100;
        meun_0.touchEnabled = true;
        meun_0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickMenuE, this);
        this.menuLayer.addChild(meun_0);
        var meun_1 = new egret.Bitmap();
        meun_1.texture = this.gameimgSheet.getTexture(this.menuIndex == 1 ? "btn_end_type3" : "btn_end_type1");
        meun_1.x = GameUtils.SCREEN_W / 2 + 10;
        meun_1.y = 100;
        meun_1.touchEnabled = true;
        meun_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickMenuT, this);
        this.menuLayer.addChild(meun_1);
    };
    EndScene.prototype.clickMenuE = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.menuIndex != 0) {
            this.menuIndex = 0;
            if (this.menuLayer) {
                this.menuLayer.removeChildren();
            }
            this.drawMenu();
            if (this.listLayer) {
                this.listLayer.removeChildren();
            }
            this.drawList();
        }
    };
    EndScene.prototype.clickMenuT = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.menuIndex != 1) {
            this.menuIndex = 1;
            if (this.menuLayer) {
                this.menuLayer.removeChildren();
            }
            this.drawMenu();
            if (this.listLayer) {
                this.listLayer.removeChildren();
            }
            this.drawList();
        }
    };
    EndScene.prototype.closeEnd = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.removeChildren();
    };
    return EndScene;
}(egret.DisplayObjectContainer));
__reflect(EndScene.prototype, "EndScene");
//# sourceMappingURL=EndScene.js.map