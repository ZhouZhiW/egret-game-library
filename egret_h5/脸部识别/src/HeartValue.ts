class HeartValue extends egret.DisplayObjectContainer
{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED, this.init, this);
    }

    private heart:egret.Bitmap;
    private init(e) {
        this.removeEventListener(egret.Event.ADDED, this.init, this);
        this.heart = new egret.Bitmap();
        this.heart.texture = RES.getRes("xin");
        this.addChild(this.heart);

        let agetext: egret.BitmapText = new egret.BitmapText();
        agetext.font = RES.getRes("ssfont_fnt");
        agetext.text = Math.ceil(Math.ceil(AnLogic.FEN)).toString()+"%";
       // agetext.width *= 0.7
       // agetext.height *= 0.7
        agetext.x = (this.heart.width-agetext.width)/2;
        agetext.y = (this.heart.height-agetext.height)/2+10;
        this.addChild(agetext);

        this.anchorOffsetX = this.heart.width/2;
        this.anchorOffsetY = this.heart.height/2;
    }
}