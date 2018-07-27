class BackgroundScene extends egret.DisplayObjectContainer
{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED,this.init,this);
    }

    private init(e){
        this.removeEventListener(egret.Event.ADDED,this.init,this);

        this.initbg();
        this.initLogo();
        this.initCovertop();
        this.initButton();
    }

    private initbg(){
        let bg:egret.Bitmap = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes("bg_jpg")
        bg.texture = texture;
        this.addChild(bg);
    }

    private logo:egret.Bitmap
    private initLogo(){
        this.logo = new egret.Bitmap();
        let texture: egret.Texture  = RES.getRes("newlogo");
        console.log(texture)
        this.logo.texture = texture;
        this.logo.x = (this.stage.stageWidth - this.logo.width)/2;
        this.logo.y = this.stage.stageHeight - this.logo.height - 10;
        this.addChild(this.logo);
    }

    private initCovertop(){
        let Covertop:egret.Bitmap = new egret.Bitmap();
        let texture: egret.Texture  = RES.getRes("cover-top")
        Covertop.texture = texture;
        Covertop.x = (this.stage.stageWidth - Covertop.width)/2;
        Covertop.y = 10;//this.stage.stageHeight - Covertop.height - 10;
        this.addChild(Covertop);
    }

    private initButton(){
        let btn:egret.Bitmap = new egret.Bitmap();
        let texture: egret.Texture  = RES.getRes("button")
        btn.texture = texture;
        btn.x = (this.stage.stageWidth - btn.width)/2;
        btn.y = this.logo.y - btn.height - 10;
        this.addChild(btn);

        btn.touchEnabled = true;
        btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.click, this);
    }
    private click(e: egret.TouchEvent) {
        this.dispatchEvent(e);
    }
}