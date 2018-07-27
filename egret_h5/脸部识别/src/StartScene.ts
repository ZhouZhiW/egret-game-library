class StartScene extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED,this.init,this);
    }
    private w:number = 0;
    private h:number = 0;
    private init(e){
        this.removeEventListener(egret.Event.ADDED,this.init,this);

        this.w = this.stage.stageWidth;
        this.h = this.stage.stageHeight;

        let bg:egret.Bitmap = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes("cover-bottom_png")
        bg.texture = texture;
        bg.x = (this.stage.stageWidth - bg.width)/2;
        bg.y = 434;
        this.addChild(bg);
    }

    public showError(){
        this.removeChildren();
        let bg:egret.Bitmap = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes("error_png")
        bg.texture = texture;
        bg.x = (this.w - bg.width)/2;
        bg.y = (this.h - bg.height)/2;
        this.addChild(bg);
    }

}