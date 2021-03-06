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
var SetScene = (function (_super) {
    __extends(SetScene, _super);
    function SetScene(gamescene) {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initstage, _this);
        _this.gamescene = gamescene;
        return _this;
    }
    SetScene.prototype.initstage = function (event) {
        this.gameimgSheet = RES.getRes("gameimg_json");
        this.coverimgSheet = RES.getRes("coverimg_json");
        this.createScene();
    };
    SetScene.prototype.createScene = function () {
        this.setLayer = new egret.Sprite();
        this.addChild(this.setLayer);
        var ditu = new egret.Bitmap();
        ditu.texture = this.gameimgSheet.getTexture("ditu");
        ditu.fillMode = egret.BitmapFillMode.REPEAT;
        ditu.x = 0;
        ditu.y = 48;
        ditu.width = GameUtils.SCREEN_W;
        ditu.height = GameUtils.SCREEN_H - 82 - 48;
        this.setLayer.addChild(ditu);
        ditu.touchEnabled = true;
        var settop = new egret.Bitmap();
        settop.texture = this.gameimgSheet.getTexture("titletop");
        settop.x = 0;
        settop.y = 50;
        this.setLayer.addChild(settop);
        var titleset = new egret.Bitmap();
        titleset.texture = this.gameimgSheet.getTexture("titleset");
        titleset.x = (GameUtils.SCREEN_W - titleset.texture.textureWidth) / 2;
        titleset.y = 60;
        this.setLayer.addChild(titleset);
        var closeset = new egret.Bitmap();
        closeset.texture = this.gameimgSheet.getTexture("close");
        closeset.x = GameUtils.SCREEN_W - closeset.texture.textureWidth;
        closeset.y = 55;
        this.setLayer.addChild(closeset);
        closeset.touchEnabled = true;
        closeset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeSet, this);
        var titlebottom = new egret.Bitmap();
        titlebottom.texture = this.gameimgSheet.getTexture("titlebottom");
        titlebottom.x = 0;
        titlebottom.y = GameUtils.SCREEN_H - 100;
        this.setLayer.addChild(titlebottom);
        var clearSave = new egret.Bitmap();
        clearSave.texture = this.gameimgSheet.getTexture("chongxin");
        clearSave.x = (GameUtils.SCREEN_W - clearSave.texture.textureWidth) / 2;
        clearSave.y = GameUtils.SCREEN_H / 2 - 80;
        this.setLayer.addChild(clearSave);
        clearSave.touchEnabled = true;
        clearSave.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoDrawClearGame, this);
        var soundimg = new egret.Bitmap();
        soundimg.texture = this.gameimgSheet.getTexture("soundimg");
        soundimg.x = GameUtils.SCREEN_W / 2 - 20 - soundimg.texture.textureWidth;
        soundimg.y = GameUtils.SCREEN_H / 2 + 20;
        this.setLayer.addChild(soundimg);
        var soundbg = new egret.Bitmap();
        soundbg.texture = this.gameimgSheet.getTexture("soundbg");
        soundbg.x = GameUtils.SCREEN_W / 2 + 20;
        soundbg.y = GameUtils.SCREEN_H / 2 + 23;
        this.setLayer.addChild(soundbg);
        soundbg.touchEnabled = true;
        soundbg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.soundBtn, this);
        if (GameUtils.isSound) {
            this.soundopen = new egret.Bitmap();
            this.soundopen.texture = this.gameimgSheet.getTexture("soundopen");
            this.soundopen.name = "soundopen";
            this.soundopen.x = GameUtils.SCREEN_W / 2 + 25;
            this.soundopen.y = GameUtils.SCREEN_H / 2 + 16;
            this.setLayer.addChild(this.soundopen);
        }
        var version = new egret.TextField();
        version.x = 0;
        version.y = GameUtils.SCREEN_H - 140;
        version.width = GameUtils.SCREEN_W;
        version.height = 40;
        version.textColor = 0xffffff;
        version.size = GameUtils.TEXT_SIZE_SMALL;
        version.text = GameUtils.GAME_VERSION;
        version.verticalAlign = egret.VerticalAlign.MIDDLE;
        version.textAlign = egret.HorizontalAlign.CENTER;
        this.setLayer.addChild(version);
        version.strokeColor = 0x000000;
        version.stroke = 2;
    };
    SetScene.prototype.closeSet = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.removeChildren();
    };
    SetScene.prototype.gotoDrawClearGame = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.drawClearGameSave();
    };
    SetScene.prototype.drawClearGameSave = function () {
        this.cleargamelayer = new egret.Sprite();
        this.addChild(this.cleargamelayer);
        var tishi = new egret.Shape;
        tishi.graphics.beginFill(0x000000, 1);
        tishi.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H);
        tishi.graphics.endFill();
        tishi.alpha = 0.0;
        tishi.touchEnabled = true;
        this.cleargamelayer.addChild(tishi);
        var duihuanbg = new egret.Bitmap();
        duihuanbg.texture = this.coverimgSheet.getTexture("msgbg");
        duihuanbg.x = (GameUtils.SCREEN_W - 460) / 2;
        duihuanbg.y = 180;
        this.cleargamelayer.addChild(duihuanbg);
        var bgrectsound = new egret.Rectangle(50, 50, 50, 50);
        duihuanbg.scale9Grid = bgrectsound;
        duihuanbg.width = 460;
        duihuanbg.height = 250;
        var name = new egret.TextField();
        name.x = (GameUtils.SCREEN_W - 393) / 2;
        name.y = 220;
        name.height = 100;
        name.width = 393;
        name.textColor = 0xff0000;
        name.size = GameUtils.TEXT_SIZE_MIDDLE;
        name.text = "注意！重新开始(如果没有免死金牌)需花费一颗还魂丹，将会清除现有进度和属性数据，以便挑战其他结局！";
        this.cleargamelayer.addChild(name);
        var clear = new egret.Bitmap();
        clear.texture = this.coverimgSheet.getTexture("ok1");
        clear.x = 100;
        clear.y = 360;
        this.cleargamelayer.addChild(clear);
        clear.touchEnabled = true;
        clear.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clearGameSave, this);
        var back = new egret.Bitmap();
        back.texture = this.gameimgSheet.getTexture("quxiao");
        back.x = GameUtils.SCREEN_W - back.texture.textureWidth - 100;
        back.y = 360;
        this.cleargamelayer.addChild(back);
        back.touchEnabled = true;
        back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backSet, this);
    };
    SetScene.prototype.clearGameSave = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        NetWorkUtils.sendSimpleNetPostRequest(104, this.getcleargameComplete, this.onPostIOError, this, this);
    };
    SetScene.prototype.getcleargameComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_104.k", event);
        if (obj.result == 0) {
            var tishi = new DrawUtils();
            tishi.createTishi("coverimg_json", "tishikuang1", obj.info);
            this.addChild(tishi);
        }
        else {
            this.closeScene();
            this.gamescene.closeGameScene();
            var gamecover = new CoverScene();
            this.gamescene.addChild(gamecover);
            var tishi = new DrawUtils();
            tishi.createTishi("coverimg_json", "tishikuang1", obj.info);
            this.gamescene.addChild(tishi);
        }
    };
    SetScene.prototype.closeScene = function () {
        this.removeChildren();
    };
    SetScene.prototype.onPostIOError = function (event) {
        NetWorkUtils.clearNetLoading();
    };
    SetScene.prototype.backSet = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.cleargamelayer) {
            this.cleargamelayer.removeChildren();
        }
    };
    SetScene.prototype.soundBtn = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (!GameUtils.isLoadSoundError) {
            if (GameUtils.isSound) {
                GameUtils.isSound = false;
                if (this.soundopen) {
                    if (this.soundopen.parent) {
                        this.soundopen.parent.removeChild(this.soundopen);
                    }
                }
                GameUtils.stopSound();
                GameUtils.saveGameSound("soundclose");
            }
            else {
                GameUtils.isSound = true;
                this.soundopen = new egret.Bitmap();
                this.soundopen.texture = this.gameimgSheet.getTexture("soundopen");
                this.soundopen.name = "soundopen";
                this.soundopen.x = GameUtils.SCREEN_W / 2 + 25;
                this.soundopen.y = GameUtils.SCREEN_H / 2 + 16;
                this.setLayer.addChild(this.soundopen);
                if (GameUtils.gameSound) {
                    GameUtils.gameSoundChannel = GameUtils.gameSound.play();
                    GameUtils.gameSoundChannel.volume = 1.0;
                }
                GameUtils.saveGameSound("soundopen");
            }
        }
    };
    return SetScene;
}(egret.DisplayObjectContainer));
__reflect(SetScene.prototype, "SetScene");
//# sourceMappingURL=SetScene.js.map