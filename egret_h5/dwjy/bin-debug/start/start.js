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
// class gamestart extends eui.Component implements  eui.UIComponent {
var gamestart = (function (_super) {
    __extends(gamestart, _super);
    function gamestart() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
        _this.skinName = "resource/skins/start.exml";
        return _this;
    }
    gamestart.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.init();
        console.log("createChildren");
    };
    gamestart.prototype.onComplete = function () {
        console.log("onComplete");
    };
    // public btn2: eui.Image;
    // public rankbtn: eui.Image;
    // public morebtn: eui.Image;
    gamestart.prototype.init = function () {
        // var btn = new egret.Bitmap();
        // btn.texture = RES.getRes("ewm_jpg");
        // btn.x = 0;
        // btn.y = this.stage.stageHeight - 150;
        // btn.width=43*3;
        // btn.height=43*3;
        // this.addChild(btn);
        // btn.touchEnabled = true;
        // btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
        //     platform.previewImage();
        // }, this)
        this.btn1.touchEnabled = true;
        this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.game, this);
        // var ewm = new ewm();
        // this.addChild(ewm);
        // this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gamePk, this)
        // this.rankbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameRank, this)
        // this.morebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameMore, this)
    };
    gamestart.prototype.game = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        var _playgame = new playgame();
        Data.mainlayer.addChild(_playgame);
    };
    gamestart.prototype.gamePk = function () {
    };
    gamestart.prototype.gameRank = function () {
    };
    gamestart.prototype.gameMore = function () {
    };
    gamestart.prototype.onRemoveFromStage = function () {
        if (this.btn1.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.game, this);
        }
        // if (this.btn2.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
        //     this.btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gamePk, this)
        // }
        // if (this.rankbtn.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
        //     this.rankbtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gameRank, this)
        // }
        // if (this.morebtn.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
        //     this.morebtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gameMore, this)
        // }
    };
    return gamestart;
}(eui.Component));
__reflect(gamestart.prototype, "gamestart");
