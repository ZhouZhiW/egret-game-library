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
var GameOverScene = (function (_super) {
    __extends(GameOverScene, _super);
    function GameOverScene(gamescene, drawstage) {
        var _this = _super.call(this) || this;
        _this.gamescene = gamescene;
        _this.drawstage = drawstage;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initstage, _this);
        return _this;
    }
    GameOverScene.prototype.initstage = function (event) {
        this.loading = new LoadingUI();
        this.addChild(this.loading);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("gameover");
    };
    GameOverScene.prototype.onResourceProgress = function (event) {
        if (event.groupName == "gameover") {
            this.loading.setProgress(0, event.itemsLoaded, event.itemsTotal);
        }
    };
    GameOverScene.prototype.onComplete = function (event) {
        if (event.groupName == "gameover") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.loadSound();
        }
    };
    GameOverScene.prototype.loadComplete = function () {
        if (this.loading.parent) {
            this.loading.parent.removeChild(this.loading);
        }
        this.gameimgSheet = RES.getRes("gameimg_json");
        this.createScene();
    };
    GameOverScene.prototype.loadSound = function () {
        this.soundloadtimeout = new SoundLoadTimeOut(this.overSoundLoadTimeOut, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadSoundComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onLoadSoundError, this);
        RES.loadGroup("gameoversound");
    };
    GameOverScene.prototype.overSoundLoadTimeOut = function () {
        GameUtils.isLoadSoundError = true;
        this.removeOverLis();
    };
    GameOverScene.prototype.onLoadSoundComplete = function (event) {
        if (event.groupName == "gameoversound") {
            GameUtils.isLoadSoundError = false;
            this.removeOverLis();
        }
    };
    GameOverScene.prototype.onLoadSoundError = function (event) {
        if (event.groupName == "gameoversound") {
            GameUtils.isLoadSoundError = true;
            this.removeOverLis();
        }
    };
    GameOverScene.prototype.removeOverLis = function () {
        if (this.soundloadtimeout) {
            this.soundloadtimeout.clearSoundTimer();
        }
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadSoundComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onLoadSoundError, this);
        this.loadComplete();
    };
    GameOverScene.prototype.createScene = function () {
        var bg = new egret.Bitmap();
        if (this.drawstage == 0) {
            bg.texture = RES.getRes("end01_jpg");
        }
        else {
            bg.texture = RES.getRes("end02_jpg");
        }
        bg.fillMode = egret.BitmapFillMode.REPEAT;
        bg.x = 0;
        bg.y = 0;
        bg.width = GameUtils.SCREEN_W;
        bg.height = GameUtils.SCREEN_H;
        this.addChild(bg);
        this.timershowbtn = new egret.Timer(2000, 1);
        //注册事件侦听器
        this.timershowbtn.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        //开始计时
        this.timershowbtn.start();
        // var texture = RES.getRes("huaban_png");
        // var config = RES.getRes("huaban_json");
        // this.system_hua = new particle.GravityParticleSystem(texture, config);
        // this.addChild(this.system_hua);
        // this.system_hua.start();
        if ("jieju_mp3" != GameUtils.gameSoundName && !GameUtils.isLoadSoundError) {
            GameUtils.gameSoundName = "jieju_mp3";
            if (!GameUtils.gameSoundChannel) {
                GameUtils.playSound("jieju_mp3");
            }
            else {
                GameUtils.stopSound();
                GameUtils.playSound("jieju_mp3");
            }
        }
    };
    GameOverScene.prototype.timerComFunc = function () {
        if (this.timershowbtn.hasEventListener(egret.TimerEvent.TIMER_COMPLETE)) {
            this.timershowbtn.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        }
        this.timershowbtn.stop();
        this.timershowbtn.reset();
        if (GameUtils.sequelUrl == "") {
            var jiejubtn_0 = new egret.Bitmap();
            jiejubtn_0.texture = this.gameimgSheet.getTexture("jieju_0");
            jiejubtn_0.x = (GameUtils.SCREEN_W - jiejubtn_0.texture.textureWidth) / 2;
            jiejubtn_0.y = GameUtils.SCREEN_H - 140;
            this.addChild(jiejubtn_0);
            jiejubtn_0.touchEnabled = true;
            jiejubtn_0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backCover, this);
        }
        else {
            var jiejubtn_1 = new egret.Bitmap();
            jiejubtn_1.texture = this.gameimgSheet.getTexture("jieju_1");
            jiejubtn_1.x = (GameUtils.SCREEN_W - jiejubtn_1.texture.textureWidth) / 2;
            jiejubtn_1.y = GameUtils.SCREEN_H - 140;
            this.addChild(jiejubtn_1);
            jiejubtn_1.touchEnabled = true;
            jiejubtn_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoSequel, this);
        }
    };
    GameOverScene.prototype.gotoSequel = function (evt) {
        // 跳转到第二季
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        this.removeChildren();
        window.location.href = GameUtils.sequelUrl;
    };
    GameOverScene.prototype.backCover = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        this.removeChildren();
        var produce = new ProductionGroup();
        this.addChild(produce);
    };
    return GameOverScene;
}(egret.DisplayObjectContainer));
__reflect(GameOverScene.prototype, "GameOverScene");
//# sourceMappingURL=GameOverScene.js.map