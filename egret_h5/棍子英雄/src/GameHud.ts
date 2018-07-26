/**
 */
class GameHud extends egret.Sprite{

    private stageW:number;
    private stageH:number;

    public toolTips:egret.Bitmap;
    public scoreLabel:egret.TextField;
    private toolNumLabel:egret.TextField;
    private revivalNumLabel:egret.TextField;

    private toolBg:egret.Bitmap;
    public usingTool:boolean = false;

    public constructor(){

        super();
        this.init();

    }

    private init():void{

        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.setUI();
    }

    // 设置界面
    private setUI():void{
        var stageW = this.stageW;
        var stageH = this.stageH;
        // 分数背景
        var scoreBg = new egret.Bitmap();
        scoreBg.texture = RES.getRes("scoreBg_png");
        this.addChild(scoreBg);
        scoreBg.anchorOffsetX = scoreBg.width/2;
        scoreBg.x = this.stageW/2;
        scoreBg.y = scoreBg.height/2;
        //// 道具背景
        //var toolBg = new egret.Bitmap();
        //toolBg.texture = RES.getRes("scoreBg_png");
        //this.addChild(toolBg);
        //toolBg.anchorX = 0.5;
        //toolBg.x = stageW/2;
        //toolBg.y = scoreBg.height*2;
        //this.toolBg = toolBg;
        //// 道具图标
        //var toolIcon = new egret.Bitmap();
        //toolIcon.texture = RES.getRes("propres1_png");
        //this.addChild(toolIcon);
        //toolIcon.anchorX = 0.5;
        //toolIcon.x = toolBg.x;
        //toolIcon.y = toolBg.y;
        //toolIcon.touchEnabled = true;
        //toolIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toolIconCallback, this);
        //toolIcon.addEventListener(egret.TouchEvent.TOUCH_END, this.toolIconCallback, this);
        //toolIcon.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.toolIconCallback, this);
        //// 道具开关提示
        //var toolTips = new egret.Bitmap();
        //toolTips.texture = RES.getRes("propres2_png");
        //this.addChild(toolTips);
        //toolTips.anchorX = 0.5;
        //toolTips.x = toolBg.x;
        //toolTips.y = toolBg.y + toolBg.height/2 + toolTips.height*2;
        //this.toolTips = toolTips;

        // 初始分数标签
        var scoreLabel = new egret.TextField();
        this.addChild(scoreLabel);
        scoreLabel.x = scoreBg.x;
        scoreLabel.y = scoreBg.y + scoreBg.height/2;
        scoreLabel.size = 100;
        scoreLabel.textAlign = "center";
        scoreLabel.text = "0";
        scoreLabel.anchorOffsetX = scoreLabel.width/2;
        scoreLabel.anchorOffsetY = scoreLabel.height/2;
        this.scoreLabel = scoreLabel;

        //// 初始道具个数标签
        //var toolNumLabel = new egret.TextField();
        //this.addChild(toolNumLabel);
        //toolNumLabel.anchorX = toolNumLabel.anchorY = 0.5;
        //toolNumLabel.x = toolBg.x + toolBg.width*0.2;
        //toolNumLabel.y = toolBg.y + toolBg.height/2;
        //toolNumLabel.size = 60;
        //toolNumLabel.textAlign = "center";
        //toolNumLabel.text = "x 0";
        //this.toolNumLabel = toolNumLabel;

        //// 复活次数标签
        //var revivalNumLabel = new egret.TextField();
        //this.addChild(revivalNumLabel);
        //revivalNumLabel.anchorX = revivalNumLabel.anchorY = 0.5;
        //revivalNumLabel.x = stageW*0.8;
        //revivalNumLabel.y = toolBg.y -  (toolBg.y - scoreBg.y - scoreBg.height) / 2;
        //revivalNumLabel.size = 40;
        //revivalNumLabel.textAlign = "center";
        //revivalNumLabel.text = "复活: x0";
        //this.revivalNumLabel = revivalNumLabel;
        //
        //// 获取道具礼包按钮
        //var toolGift = new egret.Bitmap();
        //toolGift.texture = RES.getRes("gunzi_png");
        //this.addChild(toolGift);
        //toolGift.anchorX = toolGift.anchorY = 0.5;
        //toolGift.anchorX = 0.5;
        //toolGift.x = stageW*0.2;
        //toolGift.y = revivalNumLabel.y;
        //toolGift.touchEnabled = true;
        //toolGift.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toolGiftCallback, this);
        //toolGift.addEventListener(egret.TouchEvent.TOUCH_END, this.toolGiftCallback, this);
        //toolGift.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.toolGiftCallback, this);

    }

    //private toolIconCallback(evt:egret.TouchEvent):void{
    //
    //    if(evt.type == egret.TouchEvent.TOUCH_BEGIN){
    //        //console.log("touch begin");
    //        evt.currentTarget.scaleX = 1.05;
    //        evt.currentTarget.scaleY = 1.05;
    //    }else if(evt.type == egret.TouchEvent.TOUCH_END){
    //        //console.log("touch ended");
    //        evt.currentTarget.scaleX = 1.0;
    //        evt.currentTarget.scaleY = 1.0;
    //        if (!this.usingTool) {
    //            this.toolTips.texture = RES.getRes("propres3_png");
    //        }else{
    //            this.toolTips.texture = RES.getRes("propres2_png");
    //        }
    //
    //        this.usingTool = !this.usingTool;
    //
    //    }else if(evt.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE){
    //        //console.log("touch cancel");
    //        evt.currentTarget.scaleX = 1.0;
    //        evt.currentTarget.scaleY = 1.0;
    //    }
    //}

    //private toolGiftCallback(evt:egret.TouchEvent):void{
    //
    //    if(evt.type == egret.TouchEvent.TOUCH_BEGIN){
    //        //console.log("touch begin");
    //        evt.currentTarget.scaleX = 1.05;
    //        evt.currentTarget.scaleY = 1.05;
    //    }else if(evt.type == egret.TouchEvent.TOUCH_END){
    //        //console.log("touch ended");
    //        evt.currentTarget.scaleX = 1.0;
    //        evt.currentTarget.scaleY = 1.0;
    //
    //    }else if(evt.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE){
    //        //console.log("touch cancel");
    //        evt.currentTarget.scaleX = 1.0;
    //        evt.currentTarget.scaleY = 1.0;
    //    }
    //}

}