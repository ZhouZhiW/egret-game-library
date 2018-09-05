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
var startgame = (function (_super) {
    __extends(startgame, _super);
    function startgame() {
        var _this = _super.call(this) || this;
        /*点击切换英雄按钮*/
        _this.hero_idx = 0;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.init, _this);
        _this.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, _this.destory, _this);
        _this.skinName = "resource/myskin/start.exml";
        return _this;
    }
    startgame.prototype.init = function () {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.init, this);
        this.startArr = [this.start_btn, this.genggai_btn];
        this.startBtnMove();
        for (var i = 0; i < this.startArr.length; i++) {
            this.startArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapStartBtn, this);
        }
    };
    // protected startbg;
    // public startbg2;
    // protected addtwobg() {
    //     var startbg = new egret.Bitmap();
    //     startbg.texture = RES.getRes("bg1_jpg");
    //     this.addChild(startbg);
    //     startbg.y = 0 - startbg.height;
    //     this.startbg = startbg;
    //     var startbg2 = new egret.Bitmap();
    //     startbg2.texture = RES.getRes("bg1_jpg");
    //     this.addChild(startbg2);
    //     startbg2.y = 0;
    //     this.startbg2 = startbg2;
    //     // egret.startTick(this.update, this);
    //     egret.Ticker.getInstance().register(this.update, this);
    // }
    // private speed = 200
    // protected update(dt): boolean {
    //     var speed =1/ dt *this.speed
    //     this.startbg2.y += speed;
    //     this.startbg.y += speed;
    //     if (this.startbg2.y > this.startbg.height) {
    //         this.startbg2.y = (this.startbg.y - this.startbg.height + 1);
    //     }
    //     if (this.startbg.y > this.startbg.height) {
    //         this.startbg.y = (this.startbg2.y - this.startbg.height + 1);
    //     }
    //     return true;
    // }
    startgame.prototype.onTapStartBtn = function (e) {
        var tg = e.target;
        switch (tg.name) {
            case "start":
                this.enterGame();
                break;
            case "genggai":
                this.genggai();
                break;
        }
    };
    /*开始按钮的上下动画*/
    startgame.prototype.startBtnMove = function () {
        egret.Tween.get(this.start_btn, { loop: true }).
            to({ x: this.start_btn.x, y: this.start_btn.y + 50 }, 1000).
            to({ x: this.start_btn.x, y: this.start_btn.y }, 1000);
    };
    /*点击开始按钮*/
    startgame.prototype.enterGame = function () {
        var game = new gameplay();
        SceneManager.Instance.changeScene(game);
    };
    startgame.prototype.genggai = function () {
        var that = this;
        var _x = this.group.x;
        egret.Tween.get(this.group).
            to({ x: this.group.x - this.stage.stageWidth / 2, y: this.group.y }, 300, egret.Ease.sineIn).call(function () {
            that.hero_idx++;
            if (that.hero_idx > 4) {
                that.hero_idx = 1;
            }
            that.group.x = that.stage.stageWidth;
            that.hero.texture = RES.getRes("hero0" + that.hero_idx + "_png");
            egret.Tween.get(that.group).
                to({ x: _x, y: that.group.y }, 300, egret.Ease.sineIn);
        });
    };
    /*删除监听*/
    startgame.prototype.destory = function () {
        for (var i = 0; i < this.startArr.length; i++) {
            this.startArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapStartBtn, this);
        }
    };
    return startgame;
}(Scene));
__reflect(startgame.prototype, "startgame");
