/**
 */
class StartScene extends egret.Sprite{

    private loadingView : LoadingUI;
    /**测试用的位图*/
    private startBtn : egret.Bitmap;
    private heroBtn : egret.Bitmap;

    private stage1 : Stage;
    private stage2 : Stage;
    private stage1Hero:number = 0;
    private stage2Hero:number = 1;
    private heroVector : Array<Hero>;
    private canChoose : boolean = true;
    private curStage : number = 1;
    private curHero : number = 1;

    private stageW:number = 0;
    private stageH:number = 0;

    private btnClickSound:egret.Sound;

    public  constructor(){
        super();
        //  开启fps
        //egret.Profiler.getInstance().run();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.start, this);
    }

    private start():void {
        //  alert("Hello World!");
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //  初始化资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/")
    }

    //  配置文件加载完成，开始加载资源组
    private onConfigComplete(event:RES.ResourceEvent):void{

        //  移除资源加载库的监听事件
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        //  添加各种预加载事件监听
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceLoadProgress, this);
        //  开始加载组资源
        RES.loadGroup("preload");
        //RES.createGroup("all", ["herojson", "heropng", "bgpng", "uipng"]);
        //RES.loadGroup("all");
    }

    private  onResourceLoadComplete(event:RES.ResourceEvent):void{
        //  移除监听事件和加载场景
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceLoadProgress, this);
        }
        this.setUI();

    }

    private  onResourceLoadError(event:RES.ResourceEvent):void{

    }

    private  onResourceLoadProgress(event:RES.ResourceEvent):void{
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    //  设置界面
    private setUI():void {
        //  获取屏幕大小
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        var stageW = this.stageW;
        var stageH = this.stageH;
        //  添加背景
        var bg = new BgLayer(false);
        this.addChild(bg);
        // 添加标题
        var title = new egret.Bitmap();
        title.texture = RES.getRes("uires_1_png");
        this.addChild(title);
        title.anchorOffsetX = title.width/2;
        title.anchorOffsetY = title.height/2;
        title.x = stageW/2;
        title.y = title.height;
        console.log("aa",stageW);
        // 开始按钮
        var startBtn = new egret.Bitmap();
        startBtn.texture = RES.getRes("uires_2_png");
        this.addChild(startBtn);
        startBtn.anchorOffsetX = startBtn.width/2;
        startBtn.anchorOffsetY = startBtn.height/2;
        startBtn.x = stageW/2;
        startBtn.y = stageH/2;
        startBtn.touchEnabled = true;
        startBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startBtnCallback, this);
        startBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.startBtnCallback, this);
        startBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.startBtnCallback, this);
        this.startBtn = startBtn;
        //  按钮上下移动
        this.startBtnMove();

        // 添加英雄选择台阶
        this.addHeroStage();

        // 添加英雄切换按钮
        var heroBtn = new egret.Bitmap();
        heroBtn.texture = RES.getRes("mainqiehuan_png");
        this.addChild(heroBtn);
        heroBtn.anchorOffsetX = heroBtn.width/2;
        heroBtn.anchorOffsetY = heroBtn.height/2;
        heroBtn.x = stageW/2;
        heroBtn.y = this.stage1.y + this.stage1.height/4 ;
        heroBtn.touchEnabled = true;
        heroBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.heroBtnCallback, this);
        heroBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.heroBtnCallback, this);
        heroBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.heroBtnCallback, this);
        this.heroBtn = heroBtn;
    }
    //  开始按钮上下移动
    private startBtnMove():void{

        var stageH = this.stageH;
        var startBtn = this.startBtn;
        var tw = egret.Tween.get(startBtn);
        tw.to({y:stageH/2 + startBtn.height/10}, 1500);
        tw.to({y:stageH/2 - startBtn.height/10}, 1500);
        tw.call(this.startBtnMove, this);
    }

    //  开始按钮回调
    private startBtnCallback(evt:egret.TouchEvent):void {

        if(!this.canChoose){
            return;
        }
        if(evt.type == egret.TouchEvent.TOUCH_BEGIN){
            //console.log("touch begin");
            evt.currentTarget.scaleX = 1.05;
            evt.currentTarget.scaleY = 1.05;
            ////  播放按钮声音
            //this.btnClickSound.play();
        }else if(evt.type == egret.TouchEvent.TOUCH_END){
            //console.log("touch ended");
            evt.currentTarget.scaleX = 1.0;
            evt.currentTarget.scaleY = 1.0;
            //  添加游戏界面，删除开始界面
            egret.MainContext.instance.stage.removeChild(this);
            GameManager.setHeroIndex(this.curHero);
            var layer = new GameScene();
            egret.MainContext.instance.stage.addChild(layer);

        }else if(evt.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE){
            //console.log("touch cancel");
            evt.currentTarget.scaleX = 1.0;
            evt.currentTarget.scaleY = 1.0;
        }

    }
    //  选择英雄按钮回调
    private heroBtnCallback(evt:egret.TouchEvent):void {

        var stageW = this.stageW;
        var stage1 = this.stage1;
        var stage2 = this.stage2;

        if(evt.type == egret.TouchEvent.TOUCH_BEGIN){
            //console.log("touch begin");
            evt.currentTarget.scaleX = 1.05;
            evt.currentTarget.scaleY = 1.05;
            ////  播放按钮声音
            //this.btnClickSound.play();
        }else if(evt.type == egret.TouchEvent.TOUCH_END){
            //console.log("touch ended");
            evt.currentTarget.scaleX = 1.0;
            evt.currentTarget.scaleY = 1.0;
            if (!this.canChoose) {
                return;
            }
            //  不可继续切换
            this.canChoose = false;
            // 如果台阶1在屏幕中间，则将台阶1移出屏幕，台阶2移到屏幕中间
            if (this.curStage == 1) {
                this.curStage = 2;
                var tw1 = egret.Tween.get(stage1);
                tw1.to({x:-stageW/2}, 500);
                tw1.to({x:stageW*1.5}, 0);

                var tw2= egret.Tween.get(stage2);
                tw2.to({x:stageW/2}, 500);
                tw2.call(this.choosenCallback, this);
            }
            // 如果台阶2在屏幕中间，则将台阶2移出屏幕，台阶1移到屏幕中间
            else if(this.curStage == 2){
                this.curStage = 1;
                var tw3 = egret.Tween.get(stage2);
                tw3.to({x:-stageW/2}, 500);
                tw3.to({x:stageW*1.5}, 0);

                var tw4= egret.Tween.get(stage1);
                tw4.to({x:stageW/2}, 500);
                tw4.call(this.choosenCallback, this);
            }


        }else if(evt.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE){
            //console.log("touch cancel");
            evt.currentTarget.scaleX = 1.0;
            evt.currentTarget.scaleY = 1.0;
        }

    }

    // 英雄切换后回调
    private choosenCallback():void{

        if (this.curStage == 1) {
            // 移除英雄2，添加英雄4
            if (this.stage2Hero == 1) {
                this.heroVector[1].visible = false;
                this.heroVector[3].visible = true;
                this.stage2Hero = 3;
            }
            // 移除英雄4，添加英雄2
            else if (this.stage2Hero == 3){
                this.heroVector[3].visible = false;
                this.heroVector[1].visible = true;
                this.stage2Hero = 1;
            }

            // 当前展示的英雄索引为下一个台阶上的英雄索引减1
            this.curHero = (this.stage2Hero - 1 + 4)%4 + 1;

        }else if (this.curStage == 2){
            // 移除英雄1，添加英雄3
            if (this.stage1Hero == 0) {
                this.heroVector[0].visible = false;
                this.heroVector[2].visible = true;
                this.stage1Hero = 2;
            }
            // 移除英雄3，添加英雄1
            else if (this.stage1Hero == 2){
                this.heroVector[2].visible = false;
                this.heroVector[0].visible = true;
                this.stage1Hero = 0;
            }

            // 当前展示的英雄索引为下一个台阶上的英雄索引减1
            this.curHero = (this.stage1Hero - 1 + 4)%4 + 1;

        }
        // 可继续切换
        this.canChoose = true;

    }

    //  添加英雄台阶
    private addHeroStage():void{

        var stageH = this.stageH;
        var stageW = this.stageW;

        // 先创建两个台阶
        var stage1 = new Stage();
        var stage2 = new Stage();
        stage1.stageSprite.scaleX = 40;
        stage2.stageSprite.scaleX = 40;
        stage1.x = stageW/2;
        stage1.y = stageH - stage1.height;
        stage2.x = stageW*1.5;
        stage2.y = stageH - stage2.height;
        this.addChild(stage1);
        this.addChild(stage2);

        // 创建4个英雄
        var hero1 = new Hero(1);
        var hero2 = new Hero(2);
        var hero3 = new Hero(3);
        var hero4 = new Hero(4);
        var heroVector = [];
        heroVector.push(hero1);
        heroVector.push(hero2);
        heroVector.push(hero3);
        heroVector.push(hero4);

        // 将英雄1&3和英雄2&4放在台阶上
        stage1.addChild(heroVector[0]);
        stage1.addChild(heroVector[2]);
        heroVector[2].visible = false;
        this.stage1Hero = 0;
        stage2.addChild(heroVector[1]);
        stage2.addChild(heroVector[3]);
        heroVector[3].visible = false;
        this.stage2Hero = 1;

        this.stage1 = stage1;
        this.stage2 = stage2;
        this.heroVector = heroVector;

        // 添加英雄简介1
        var heroLabel1 = new egret.TextField();
        stage1.addChild(heroLabel1);
        heroLabel1.textAlign = "center";
        heroLabel1.text = "背负着理想和热血的棍子少年，即将成长为英雄。";
        heroLabel1.size = 36;
        heroLabel1.y = stage1.height*0.65;
        heroLabel1.width = stage1.width*0.25;
        heroLabel1.anchorOffsetX = heroLabel1.$getWidth()/2;
        heroLabel1.anchorOffsetY = heroLabel1.$getHeight()/2;

        // 添加英雄简介2
        var heroLabel2 = new egret.TextField();
        stage2.addChild(heroLabel2);
        heroLabel2.textAlign = "center";
        heroLabel2.text = "背负着理想和热血的棍子少年，即将成长为英雄。";
        heroLabel2.size = 36;
        heroLabel2.y = heroLabel1.y;
        heroLabel2.width = heroLabel1.width;
        heroLabel2.anchorOffsetX = heroLabel2.$getWidth()/2;
        heroLabel2.anchorOffsetY = heroLabel2.$getHeight()/2;
    }

}