class gameplay extends Scene {
    constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.init, this);

        this.skinName = "resource/myskin/game.exml"
    }
    public bg: eui.Image;
    public moon: eui.Image;
    public block1: eui.Image;
    public block2: eui.Image;
    private blockArr: eui.Image[];
    private hero;
    private init() {
        this.touchEnabled = true;
        this.blockArr = [this.block1, this.block2];

        this.addHero(this.blockArr[0].width / 2);
        this.addStick();
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegan, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnded, this);

    }
    private addHero(_x) {
        var hero = new Hero(Data.getHeroIndex());
        hero.x = _x
        hero.y = 780;
        this.addChild(hero);
        this.hero = hero;
    }
    private stick1;
    private stick2;

    private needFalldown: boolean = false;
    private addStick() {
        //  创建 两根棍子
        var _x = this.blockArr[0].width + this.blockArr[0].x;
        var _y = this.blockArr[0].y;
        this.createStick(_x, _y);

        var _x = this.blockArr[1].width + this.blockArr[1].y;
        var _y = this.blockArr[1].y;


    }
    private createStick(_x, _y) {
        var stick1 = new egret.Bitmap();
        stick1.texture = RES.getRes("stick1_png");
        this.addChild(stick1);
        // stick1.scaleX = 2;
        stick1.anchorOffsetX = stick1.width;
        stick1.anchorOffsetY = stick1.height;
        stick1.x = _x;
        stick1.y = _y;
        this.stick1 = stick1;
    }
    private onTouchBegan() {
        var stick1 = this.stick1;
        stick1.scaleY = 1;
        stick1.rotation = 0;
        this.isRunning = true;
        this.staickScaleY();
    }
    public timer: egret.Timer;
    private staickScaleY() {
        var timer = new egret.Timer(1000 / 60, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, this.growHeight, this);
        this.timer = timer;
        this.timer.start();
    }
    private growRate = 6;/*伸长的单位*/
    private stageH = egret.MainContext.instance.stage.stageHeight;
    private growHeight() {
        // 如果长度超过屏幕高的一半，则不再变长
        if (this.stick1.height * this.stick1.scaleY >= this.stageH / 2) {
            console.log("growth end", this.stick1.height * this.scaleY);
            return;
        }
        this.stick1.anchorOffsetX = this.stick1.width;
        this.stick1.anchorOffsetY = this.stick1.height;
        this.stick1.scaleY += this.growRate;
    }
    private onTouchEnded() {
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

    }
    private heroKickDone() {
        this.hero.heroMC.removeEventListener(egret.Event.COMPLETE, this.heroKickDone, this);

        this.stick1.anchorOffsetX = this.stick1.width;
        this.stick1.anchorOffsetY = this.stick1.height;
        var tw = egret.Tween.get(this.stick1);
        tw.to({ rotation: 90 }, 300);
        tw.call(this.heroMove, this);

    }
    // 英雄移动
    private heroMove(): void {
        var stick1 = this.stick1;
        var stick2 = this.stick2;
        var hero = this.hero;

        // hero.y -= 10;

        var stickLength: number = 0;              // 棍子长度
        var distance1: number = 0;                // 到达第二个台阶的左边
        var distance2: number = 0;                // 到达第二个台阶的右边
        var distance3: number = 0;                // 到达红点的左边
        var distance4: number = 0;                // 到达红点的右边
        var posX: number = 0;//  英雄移动终点X坐标
        var posY: number = 0;//  英雄移动终点Y坐标
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
        // 不在台阶上
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

    }
    private heroMoveDone() {
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
        //RES.getRes("score_ogg").play();2
        //  移动台阶
        this.moveStage();
    }
    //  英雄掉落回调
    private heroFalldown(): void {

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

    }

    // 显示游戏结束界面
    private showContinueTip(): void {

        var layer = new FailedLayer();
        this.addChild(layer);

    }
    //  移动台阶
    private moveStage() {

        var stage1 = this.blockArr[0];
        var stage2 = this.blockArr[1];
        var stick1 = this.stick1;
        var stick2 = this.stick2;
        var hero = this.hero;

        //  先将两个台阶同时移动
        var moveDis: number = 0;

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

    }

    // 台阶移动结束
    private moveStageDone(): void {

        // 更新分数, 如果砸中了红点则分数翻倍
        var score = 1;



    }

    //  随机设置台阶
    private randomSetStage(mystage): void {


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



    }
    private isRunning = false;
    private stepOver(): void {
        this.touchEnabled = true;
        this.isRunning = false;
        //  清除所有缓动动画
        egret.Tween.removeAllTweens();
    }

}