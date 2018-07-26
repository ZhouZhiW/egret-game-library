/**
 */
class Stage extends egret.Sprite{

    public stageSprite:egret.Bitmap;
    public constructor(){

        super();
        this.init();

    }

    private init():void{

        var stageSprite = new egret.Bitmap();
        stageSprite.texture = RES.getRes("stage1_png");
        stageSprite.anchorOffsetX = stageSprite.width/2;
        stageSprite.anchorOffsetY = 0;
        this.addChild(stageSprite);
        this.stageSprite = stageSprite;

    }

}