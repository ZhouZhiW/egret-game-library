/**
 */
class GameScene extends egret.Sprite{

    private gameHud:GameHud;
    private bgLayer:BgLayer;
    private hero:Hero;
    private stick1:Stick;
    private stick2:Stick;
    private stickTool:Stick;
    private stage1:Stage;
    private stage2:Stage;

    private stageW:number = 0;
    private stageH:number = 0;
    private stageOriginX:number = 0;

    private redPoint:egret.Bitmap;
    private perfect:egret.Bitmap;

    private isRunning:boolean = false;
    private curStage:number = 1;
    private isPerfect:boolean = false;
    private needFalldown:boolean = false;
    private curScore:number = 0;

    public constructor(){

        super();
        this.init();
    }

    private init():void{

        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        var stageW = this.stageW;
        var stageH = this.stageH;
        this.stageOriginX = this.stageW/6;
        var stageOriginx = this.stageOriginX;
        //  添加背景
        var bgLayer = new BgLayer(true);
        this.addChild(bgLayer);
        this.bgLayer = bgLayer;
        //  添加操作层
        var gameHud = new GameHud();
        this.addChild(gameHud);
        this.gameHud = gameHud;
        //  添加台阶
        this.addStage();
        //  创建棍子
        var stick1 = new Stick(1);
        this.addChild(stick1);
        this.stick1 = stick1;
        var stick2 = new Stick(1);
        this.addChild(stick2);
        this.stick2 = stick2;
        var stickTool = new Stick(2);
        stickTool.visible = false;
        this.addChild(stickTool);
        this.stickTool = stickTool;
        //  添加英雄
        var stage1 = this.stage1;
        var stage2 = this.stage2;
        var hero = new Hero(GameManager.getHeroIndex());
        hero.x = stage1.stageSprite.width * stage1.scaleX * 0.7;
        hero.y = stage1.y;
        this.addChild(hero);
        this.hero = hero;
        //  添加红点
        var redPoint = new egret.Bitmap();
        redPoint.texture = RES.getRes("lovered_png");
        redPoint.anchorOffsetX = redPoint.width/2;
        redPoint.scaleX = redPoint.scaleY = 1.5;
        redPoint.x = stage2.x;
        redPoint.y = stage2.y;
        this.addChild(redPoint);
        this.redPoint = redPoint;
        //  创建perfect提示
        var perfect = new egret.Bitmap();
        perfect.texture = RES.getRes("scoreAdd1_png");
        perfect.anchorOffsetX = perfect.width/2;
        perfect.anchorOffsetY = perfect.height;
        this.addChild(perfect);
        this.perfect = perfect;

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegan, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnded, this);
    }
    // 添加台阶
    private addStage():void{
        // 先创建两个台阶
        var stageH = this.stageH;
        var stageW = this.stageW;
        var stage1 = new Stage();
        var stage2 = new Stage();
        this.addChild(stage1);
        this.addChild(stage2);
        stage1.scaleX = 30;
        stage1.x = stage1.stageSprite.width * stage1.scaleX/2;
        stage1.y = stageH - stage1.height;
        stage2.scaleX = 30;
        stage2.x = stage2.stageSprite.width * stage2.scaleX/2 + stageW/2;
        stage2.y = stageH - stage1.height;
        this.stage1 = stage1;
        this.stage2 = stage2;

    }

    // 触摸开始
    private onTouchBegan(evt:egret.TouchEvent):void{

        var gameHud = this.gameHud;
        var curStage = this.curStage;
        var stick1 = this.stick1;
        var stick2 = this.stick2;
        var stickTool = this.stickTool;
        var stage1 = this.stage1;
        var stage2 = this.stage2;
        //console.log("touch pos:" + evt.stageX + ", " + evt._stageY);
        //  如果点击位置高于道具按钮则返回false
        this.isRunning = true;
        //if(evt.stageY < gameHud.toolTips.y + gameHud.toolTips.height){
        //    return;
        //}

        if(curStage == 1 ){
            if (stick1.visible == false) {
                stick1.visible = true;
            }
            stick1.scaleY = 1;
            stick1.rotation = 0;
            stick1.x = stage1.x + stage1.stageSprite.width * stage1.scaleX/2;
            stick1.y = stage1.y + stick1.stickSprite.width * stick1.scaleX/2;

            if(gameHud.usingTool){
                stickTool.scaleX = 1;
                stickTool.x = stick1.x;
                stickTool.y = stick1.y;
                stickTool.visible = true;
                stickTool.timer.start();
            }

            stick1.timer.start();
            //  播放棍子变长声音
            //RES.getRes("stick_grow_loop_ogg").play();

        }
        else if(curStage == 2){
            if (stick2.visible == false) {
                stick2.visible = true;
            }
            stick2.scaleY = 1;
            stick2.rotation = 0;
            stick2.x = stage2.x + stage2.stageSprite.width * stage2.scaleX/2;
            stick2.y = stage2.y + stick2.stickSprite.width * stick2.scaleX/2;

            if(gameHud.usingTool){
                stickTool.scaleX = 1;
                stickTool.x = stick2.x;
                stickTool.y = stick2.y;
                stickTool.visible = true;
                stickTool.timer.start();
            }

            stick2.timer.start();
            //  播放棍子变长声音
            //RES.getRes("stick_grow_loop_ogg").play();

        }

    }

    // 触摸结束
    private onTouchEnded(evt:egret.TouchEvent):void{

        var gameHud = this.gameHud;
        var stick1 = this.stick1;
        var stick2 = this.stick2;
        var stickTool = this.stickTool;
        var hero = this.hero;

        if(!this.isRunning){
            return;
        }
        //  如果点击位置高于道具按钮则返回false
        //if(evt.stageY < gameHud.toolTips.y + gameHud.toolTips.height){
        //    return;
        //}
        console.log("touch ended");
        //this.isRunning = true;
        this.touchEnabled = false;
        if(stick1.timer.running){
         stick1.timer.stop();
        }
        if(stick2.timer.running){
         stick2.timer.stop();
        }
        if(stickTool.timer.running){
         stickTool.timer.stop();
        }

        // 播放踢棍子动画
        hero.heroMC.movieClipData = hero.mcDataFactory.generateMovieClipData("kick");
        hero.heroMC.play(1);
        hero.heroMC.addEventListener(egret.Event.COMPLETE, this.heroKickDone, this);
    }

    // 英雄踢倒棍子回调
    private heroKickDone():void{

        this.hero.heroMC.removeEventListener(egret.Event.COMPLETE, this.heroKickDone, this);
        //  播放踢棍子声音
        //RES.getRes("kick_ogg").play();
        if(this.curStage == 1){
            var tw = egret.Tween.get(this.stick1);
            tw.to({rotation:90}, 300);
            tw.call(this.heroMove, this);
        }else{
            var tw = egret.Tween.get(this.stick2);
            tw.to({rotation:90}, 300);
            tw.call(this.heroMove, this);
        }

    }

    // 英雄移动
    private heroMove():void{

        var gameHud = this.gameHud;
        var stick1 = this.stick1;
        var stick2 = this.stick2;
        var stage1 = this.stage1;
        var stage2 = this.stage2;
        var stickTool = this.stickTool;
        var hero = this.hero;
        var redPoint = this.redPoint;

        hero.y -= 10;
        // 如果使用了道具，则更新道具数量
        if(gameHud.usingTool){
            stickTool.visible = false;
            //gm->getGameHud()->updateToolNum();

        }
    //
        var stickLength:number = 0;              // 棍子长度
        var distance1:number = 0;                // 到达第二个台阶的左边
        var distance2:number = 0;                // 到达第二个台阶的右边
        var distance3:number = 0;                // 到达红点的左边
        var distance4:number = 0;                // 到达红点的右边
        var posX:number = 0;//  英雄移动终点X坐标
        var posY:number = 0;//  英雄移动终点Y坐标

        //Vec2 point = Vec2::ZERO;
        // 如果当前台阶为1，则英雄移动到台阶2上
        if(this.curStage == 1){
            // 如果棍子没有到达下一个台阶或者超出下一个台阶，则英雄掉落，棍子旋转到180度
            stickLength = stick1.stickSprite.height * stick1.scaleY;
            distance1 = stage2.x - stage1.x - stage1.stageSprite.width*stage1.scaleX/2 - stage2.stageSprite.width*stage2.scaleX/2;
            distance2 = distance1 + stage2.stageSprite.width*stage2.scaleX;
            distance3 = distance1 + stage2.stageSprite.width*stage2.scaleX/2 - redPoint.width*redPoint.scaleX/2;
            distance4 = distance3 + redPoint.width*redPoint.scaleX;

            // 砸中红点
            if (stickLength >= distance3 && stickLength <= distance4) {
                this.isPerfect = true;
                // 显示perfect提示
                //log("perfect!");
                this.showPerfect();
                // 设置英雄移动终点
                posX = stage2.x + stage2.stageSprite.width*stage2.scaleX/2 - hero.heroSprite.width;
                posY = stage2.y;
            }
            // 到达台阶
            else if (stickLength >= distance1 && stickLength <= distance2) {
                posX = stage2.x + stage2.stageSprite.width*stage2.scaleX/2 - hero.heroSprite.width;
                posY = stage2.y;
            }
            // 不在台阶上
            else {
                posX = stick1.x + stick1.stickSprite.height*stick1.scaleY;
                posY = stick1.y;
                this.needFalldown = true;
            }


        }
        // 如果当前台阶为2，则英雄移动到台阶1上
        else if(this.curStage == 2){
            // 如果棍子没有到达下一个台阶或者超出下一个台阶，则英雄掉落，棍子旋转到180度
            stickLength = stick2.stickSprite.height * stick2.scaleY;
            distance1 = stage1.x - stage2.x - stage2.stageSprite.width*stage2.scaleX/2 - stage1.stageSprite.width*stage1.scaleX/2;
            distance2 = distance1 + stage1.stageSprite.width*stage1.scaleX;
            distance3 = distance1 + stage1.stageSprite.width*stage1.scaleX/2 - redPoint.width*redPoint.scaleX/2;
            distance4 = distance3 + redPoint.width*redPoint.scaleX;

            // 砸中红点
            if (stickLength >= distance3 && stickLength <= distance4) {
                // 显示perfect提示
                this.isPerfect = true;
                //log("perfect!");
                this.showPerfect();
                // 设置英雄移动终点
                posX = stage1.x + stage1.stageSprite.width*stage1.scaleX/2 - hero.heroSprite.width;
                posY = stage1.y;
            }
            // 到达台阶
            else if (stickLength >= distance1 && stickLength <= distance2) {
                posX = stage1.x + stage1.stageSprite.width*stage1.scaleX/2 - hero.heroSprite.width;
                posY = stage1.y;
            }
            // 不在台阶上
            else {
                posX = stick2.x + stick2.stickSprite.height*stick2.scaleY;
                posY = stick2.y;
                this.needFalldown = true;
            }


        }
        // 英雄和背景同时移动
        // 播放英雄行走动画
        hero.heroMC.movieClipData = this.hero.mcDataFactory.generateMovieClipData("walk");
        hero.heroMC.play(-1);
        var tw = egret.Tween.get(hero);
        tw.to({x:posX, y:posY}, 1000);
        tw.call(this.heroMoveDone, this);
    }

    // 显示perfect提示
    private showPerfect() {

        // 播放perfect声音
        //RES.getRes("victory_ogg").play();
        var perfect = this.perfect;
        var redPoint = this.redPoint;
        perfect.alpha = 1;
        perfect.x = redPoint.x;
        perfect.y = redPoint.y;

        var tw = egret.Tween.get(perfect);
        tw.to({x: perfect.x, y: perfect.y - perfect.height * 10}, 500);
        var tw1 = egret.Tween.get(perfect);
        tw1.to({alpha: 0}, 500);
    }

    private heroMoveDone():void{

        var hero = this.hero;
        // 停止背景移动
        this.bgLayer.timer.stop();
        // 播放英雄站立动画
        hero.heroMC.movieClipData = hero.mcDataFactory.generateMovieClipData("stay");
        hero.heroMC.play(-1);
        // 判断英雄是否掉落
        if (this.needFalldown) {

            if(this.curStage == 1){
                var tw = egret.Tween.get(this.stick1);
                tw.to({rotation:180}, 300);
            }
            else if (this.curStage == 2){
                var tw = egret.Tween.get(this.stick2);
                tw.to({rotation:180}, 300);
            }
            //  播放掉落声音
            //RES.getRes("fall_ogg").play();
            var tw = egret.Tween.get(hero);
            tw.to({y:this.stageH +  hero.heroSprite.height}, 300);
            tw.call(this.heroFalldown, this);

            return;
        }
        //RES.getRes("score_ogg").play();
        //  移动台阶
        this.moveStage();

    }

    //  英雄掉落回调
    private heroFalldown():void{

        //  隐藏英雄
        this.hero.visible = false;
        //  不再需要掉落
        this.needFalldown = false;

        //  播放死亡声音
        //RES.getRes("death_ogg").play();
        //  屏幕震动
        var tw = egret.Tween.get(this);
        tw.to({x:this.x + 20, y:this.y + 20}, 100, egret.Ease.bounceOut);
        tw.to({x:this.x - 20, y:this.y - 20}, 100, egret.Ease.bounceIn);
        tw.to({x:this.x + 20, y:this.y + 20}, 100, egret.Ease.bounceOut);
        tw.to({x:this.x - 20, y:this.y - 20}, 100, egret.Ease.bounceIn);
        tw.to({x:this.x + 20, y:this.y + 20}, 100, egret.Ease.bounceOut);
        tw.to({x:this.x - 20, y:this.y - 20}, 100, egret.Ease.bounceIn);
        tw.call(this.showContinueTip, this);

    }

    // 显示继续提示
    private showContinueTip():void{

        var layer = new FailedLayer();
        egret.MainContext.instance.stage.addChild(layer);

    }

    //  移动台阶
    private moveStage(){

        var stage1 = this.stage1;
        var stage2 = this.stage2;
        var stick1 = this.stick1;
        var stick2 = this.stick2;
        var hero = this.hero;
        var redPoint = this.redPoint;
        //  先将两个台阶同时移动
        var moveDis:number = 0;
        if (this.curStage == 1) {
            moveDis = stage2.x + stage2.stageSprite.width*stage2.scaleX/2 - this.stageOriginX;
        }
        else if (this.curStage == 2){
            moveDis = stage1.x + stage1.stageSprite.width*stage1.scaleX/2 - this.stageOriginX;

        }
        var tw1 = egret.Tween.get(stick1);
        tw1.to({x:stick1.x - moveDis}, 300);
        var tw2 = egret.Tween.get(stick2);
        tw2.to({x:stick2.x - moveDis}, 300);
        var tw3 = egret.Tween.get(stage1);
        tw3.to({x:stage1.x - moveDis}, 300);
        var tw4 = egret.Tween.get(stage2);
        tw4.to({x:stage2.x - moveDis}, 300);
        var tw6 = egret.Tween.get(redPoint);
        tw6.to({x:redPoint.x - moveDis}, 300);
        var tw5 = egret.Tween.get(hero);
        tw5.to({x:hero.x - moveDis}, 300);
        tw5.call(this.moveStageDone, this);

    }

    // 台阶移动结束
    private moveStageDone():void{

        // 更新分数, 如果砸中了红点则分数翻倍
        var score = 1;
        if(this.isPerfect){
            score = 2;
            this.isPerfect = false;
        }
        this.curScore += score;
        GameManager.setCurScore(this.curScore);
        this.gameHud.scoreLabel.text = ""+this.curScore;
        var tw = egret.Tween.get(this.gameHud.scoreLabel);
        tw.to({scaleX:1.3, scaleY:1.3}, 200).to({scaleX:1.0, scaleY:1.0}, 200);

        if (this.curStage == 1) {
            this.curStage = 2;

            this.randomSetStage(this.stage1);
        }
        else if (this.curStage == 2){
            this.curStage = 1;

            this.randomSetStage(this.stage2);
        }

    }

    //  随机设置台阶
    private randomSetStage(mystage:Stage):void{

        var stageW = this.stageW;
        var stageOriginX = this.stageOriginX;
        var redPoint = this.redPoint;
        var hero = this.hero;
        // 台阶随机10-40倍宽
        var scaleX = Math.floor(Math.random()*31 + 10);
        mystage.scaleX = scaleX;
        // 将台阶放在屏幕右外边
        mystage.x = stageW + mystage.stageSprite.width;
        // 将红点放在台阶上
        redPoint.x = mystage.x;
        // 随机一个位置，在前一个台阶的右边，在屏幕之内
        var posx = Math.floor(Math.random()*(
            stageW - mystage.stageSprite.width*mystage.scaleX - stageOriginX - hero.heroSprite.width) +
            stageOriginX + mystage.stageSprite.width*mystage.scaleX/2 + hero.heroSprite.width
        );
        var tw1 = egret.Tween.get(mystage);
        tw1.to({x:posx}, 300);
        tw1.call(this.stepOver, this);

        var tw2 = egret.Tween.get(redPoint);
        tw2.to({x:posx}, 300);

    }

    // 一个可得分的行走过程结束
    private stepOver():void{
        this.touchEnabled = true;
        this.isRunning = false;
        //  清除所有缓动动画
        egret.Tween.removeAllTweens();
    }

}