class Loading extends egret.DisplayObjectContainer
{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED, this.init, this);
    }

    private heart:egret.Bitmap;
    private init(e) {
        this.removeEventListener(egret.Event.ADDED, this.init, this);
        if (this.heart==null){
            this.createbg();
            this.createText();
            this.createHeart();
        }
        this.startMove();
    }
    //fcad4f
    private createbg(){
        let bg:egret.Shape = new egret.Shape();
        bg.graphics.beginFill(0xfcad4f,0.8);
        bg.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
        bg.graphics.endFill();
        this.addChild(bg);
    }
    private createText(){
        let k:egret.Bitmap = new egret.Bitmap();
        k.texture = RES.getRes("loading");
        this.addChild(k);
        k.x = (this.stage.stageWidth-k.width)/2;
        k.y = this.stage.stageHeight/2 + 100;
    }
    private createHeart(){
        this.heart = new egret.Bitmap();
        this.heart.texture = RES.getRes("loadingui");
        this.addChild(this.heart);
        this.heart.anchorOffsetX = this.heart.width/2;
        this.heart.anchorOffsetY = this.heart.height/2;
        this.heart.x = this.stage.stageWidth /2;
        this.heart.y = this.stage.stageHeight / 2;
    }
    private startMove(){
        egret.Tween.get( this.heart ).to( {scaleX:1.5,scaleY:1.5}, 700 , egret.Ease.elasticOut ).to( {scaleX:1,scaleY:1}, 600 , egret.Ease.elasticOut ).call(this.startMove,this);
    }
}