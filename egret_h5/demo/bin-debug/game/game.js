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
var gameplay = (function (_super) {
    __extends(gameplay, _super);
    function gameplay() {
        var _this = _super.call(this) || this;
        _this.needFalldown = false;
        _this.growRate = 6; /*伸长的单位*/
        _this.stageH = egret.MainContext.instance.stage.stageHeight;
        _this.isRunning = false;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.init, _this);
        _this.skinName = "resource/myskin/game.exml";
        return _this;
    }
    gameplay.prototype.init = function () {
        this.touchEnabled = true;
        this.blockArr = [this.block1, this.block2];
        this.addHero(this.blockArr[0].width / 2);
        this.addStick();
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegan, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnded, this);
    };
    gameplay.prototype.addHero = function (_x) {
        var hero = new Hero(Data.getHeroIndex());
        hero.x = _x;
        hero.y = 780;
        this.addChild(hero);
        this.hero = hero;
    };
    gameplay.prototype.addStick = function () {
        //  创建 两根棍子
        var _x = this.blockArr[0].width + this.blockArr[0].x;
        var _y = this.blockArr[0].y;
        this.createStick(_x, _y);
        var _x = this.blockArr[1].width + this.blockArr[1].y;
        var _y = this.blockArr[1].y;
    };
    gameplay.prototype.createStick = function (_x, _y) {
        var stick1 = new egret.Bitmap();
        stick1.texture = RES.getRes("stick1_png");
        this.addChild(stick1);
        // stick1.scaleX = 2;
        stick1.anchorOffsetX = stick1.width;
        stick1.anchorOffsetY = stick1.height;
        stick1.x = _x;
        stick1.y = _y;
        this.stick1 = stick1;
    };
    gameplay.prototype.onTouchBegan = function () {
        var stick1 = this.stick1;
        stick1.scaleY = 1;
        stick1.rotation = 0;
        this.isRunning = true;
        this.staickScaleY();
    };
    gameplay.prototype.staickScaleY = function () {
        var timer = new egret.Timer(1000 / 60, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, this.growHeight, this);
        this.timer = timer;
        this.timer.start();
    };
    gameplay.prototype.growHeight = function () {
        // 如果长度超过屏幕高的一半，则不再变长
        if (this.stick1.height * this.stick1.scaleY >= this.stageH / 2) {
            console.log("growth end", this.stick1.height * this.scaleY);
            return;
        }
        this.stick1.anchorOffsetX = this.stick1.width;
        this.stick1.anchorOffsetY = this.stick1.height;
        this.stick1.scaleY += this.growRate;
    };
    gameplay.prototype.onTouchEnded = function () {
        var stick1 = this.stick1;
        var stick2 = this.stick2;
        var hero = this.hero;
        console.log("touch ended", this.stick1.height * this.stick1.scaleY);
        this.touchEnabled = false;
        if (!this.isRunning) {
            return;
        }
        this.timer.stop();
        // 播放踢棍子动画
        hero.heroMC.movieClipData = hero.mcDataFactory.generateMovieClipData("kick");
        hero.heroMC.play(1);
        hero.heroMC.addEventListener(egret.Event.COMPLETE, this.heroKickDone, this);
    };
    gameplay.prototype.heroKickDone = function () {
        this.hero.heroMC.removeEventListener(egret.Event.COMPLETE, this.heroKickDone, this);
        this.stick1.anchorOffsetX = this.stick1.width;
        this.stick1.anchorOffsetY = this.stick1.height;
        var tw = egret.Tween.get(this.stick1);
        tw.to({ rotation: 90 }, 300);
        tw.call(this.heroMove, this);
    };
    // 英雄移动
    gameplay.prototype.heroMove = function () {
        var stick1 = this.stick1;
        var stick2 = this.stick2;
        var hero = this.hero;
        // hero.y -= 10;
        var stickLength = 0; // 棍子长度
        var distance1 = 0; // 到达第二个台阶的左边
        var distance2 = 0; // 到达第二个台阶的右边
        var distance3 = 0; // 到达红点的左边
        var distance4 = 0; // 到达红点的右边
        var posX = 0; //  英雄移动终点X坐标
        var posY = 0; //  英雄移动终点Y坐标
        stickLength = stick1.height * stick1.scaleY;
        var stage2 = this.blockArr[1];
        var stage1 = this.blockArr[0];
        distance1 = stage2.x - stage1.x - stage1.width * stage1.scaleX / 2 - stage2.width * stage2.scaleX / 2;
        distance2 = distance1 + stage2.width * stage2.scaleX;
        // 到达台阶
        if (stickLength >= distance1 && stickLength <= distance2) {
            posX = stage2.x + stage2.width * stage2.scaleX / 2 - this.hero.width;
            posY = stage2.y;
        }
        else {
            posX = stick1.x + stick1.height * stick1.scaleY;
            posY = stick1.y;
            this.needFalldown = true;
        }
        // 英雄和背景同时移动
        // 播放英雄行走动画
        hero.heroMC.movieClipData = this.hero.mcDataFactory.generateMovieClipData("walk");
        hero.heroMC.play(-1);
        var tw = egret.Tween.get(hero);
        tw.to({ x: posX, y: posY }, 1000);
        tw.call(this.heroMoveDone, this);
    };
    gameplay.prototype.heroMoveDone = function () {
        var hero = this.hero;
        // 播放英雄站立动画
        hero.heroMC.movieClipData = hero.mcDataFactory.generateMovieClipData("stay");
        hero.heroMC.play(-1);
        // 判断英雄是否掉落
        if (this.needFalldown) {
            var tw = egret.Tween.get(this.stick1);
            tw.to({ rotation: 180 }, 300);
            //  播放掉落声音
            //RES.getRes("fall_ogg").play();
            var tw = egret.Tween.get(hero);
            tw.to({ y: this.stageH + hero.heroSprite.height }, 300);
            tw.call(this.heroFalldown, this);
            return;
        }
        //RES.getRes("score_ogg").play();
        //  移动台阶
        this.moveStage();
    };
    //  英雄掉落回调
    gameplay.prototype.heroFalldown = function () {
        //  隐藏英雄
        this.hero.visible = false;
        //  不再需要掉落
        this.needFalldown = false;
        //  播放死亡声音
        //RES.getRes("death_ogg").play();
        //  屏幕震动
        var tw = egret.Tween.get(this);
        tw.to({ x: this.x + 20, y: this.y + 20 }, 100, egret.Ease.bounceOut);
        tw.to({ x: this.x - 20, y: this.y - 20 }, 100, egret.Ease.bounceIn);
        tw.to({ x: this.x + 20, y: this.y + 20 }, 100, egret.Ease.bounceOut);
        tw.to({ x: this.x - 20, y: this.y - 20 }, 100, egret.Ease.bounceIn);
        tw.to({ x: this.x + 20, y: this.y + 20 }, 100, egret.Ease.bounceOut);
        tw.to({ x: this.x - 20, y: this.y - 20 }, 100, egret.Ease.bounceIn);
        tw.call(this.showContinueTip, this);
    };
    // 显示游戏结束界面
    gameplay.prototype.showContinueTip = function () {
        var layer = new FailedLayer();
        this.addChild(layer);
    };
    //  移动台阶
    gameplay.prototype.moveStage = function () {
        var stage1 = this.blockArr[0];
        var stage2 = this.blockArr[1];
        var stick1 = this.stick1;
        var stick2 = this.stick2;
        var hero = this.hero;
        //  先将两个台阶同时移动
        var moveDis = 0;
        moveDis = stage1.x + stage1.width * stage1.scaleX / 2;
        var tw1 = egret.Tween.get(stick1);
        tw1.to({ x: stick1.x - moveDis }, 300);
        var tw3 = egret.Tween.get(stage1);
        tw3.to({ x: stage1.x - moveDis }, 300);
        var tw4 = egret.Tween.get(stage2);
        tw4.to({ x: stage2.x - moveDis }, 300);
        var tw5 = egret.Tween.get(hero);
        tw5.to({ x: hero.x - moveDis }, 300);
        tw5.call(this.moveStageDone, this);
    };
    // 台阶移动结束
    gameplay.prototype.moveStageDone = function () {
        // 更新分数, 如果砸中了红点则分数翻倍
        var score = 1;
    };
    //  随机设置台阶
    gameplay.prototype.randomSetStage = function (mystage) {
        // 台阶随机10-40倍宽
        var scaleX = Math.floor(Math.random() * 31 + 10);
        mystage.scaleX = scaleX;
        // 将台阶放在屏幕右外边
        // 随机一个位置，在前一个台阶的右边，在屏幕之内
        // var posx = Math.floor(Math.random() * (
        //     stageW - mystage.stageSprite.width * mystage.scaleX - stageOriginX - hero.heroSprite.width) +
        //     stageOriginX + mystage.stageSprite.width * mystage.scaleX / 2 + hero.heroSprite.width
        // );
        // var tw1 = egret.Tween.get(mystage);
        // tw1.to({ x: posx }, 300);
        // tw1.call(this.stepOver, this);
    };
    gameplay.prototype.stepOver = function () {
        this.touchEnabled = true;
        this.isRunning = false;
        //  清除所有缓动动画
        egret.Tween.removeAllTweens();
    };
    return gameplay;
}(Scene));
__reflect(gameplay.prototype, "gameplay");
