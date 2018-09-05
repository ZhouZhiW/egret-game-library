/*
    棍子
*/
class Stick extends egret.Sprite {

    private growRate: number;
    private stageW: number;
    private stageH: number;
    public stickSprite: egret.Bitmap;

    public timer: egret.Timer;

    public constructor(kind: number, _x, _y) {

        super();

        this.init(kind, _x, _y);

    }


    private init(kind: number, _x, _y): void {

        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.growRate = 6;

        //  锚点为右下角

        var stickSprite = new egret.Bitmap();
        stickSprite.texture = RES.getRes("stick1_png");
        this.addChild(stickSprite);
        stickSprite.scaleX = 2;
        this.anchorOffsetX = stickSprite.width;
        this.anchorOffsetY = stickSprite.height;
        stickSprite.x = _x;
        stickSprite.y = _y;
        this.stickSprite = stickSprite;


        var timer = new egret.Timer(1000 / 60, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, this.growHeight, this);
        this.timer = timer;



    }

    //  朝上变长
    public growHeight(): void {

        // 如果长度超过屏幕高的一半，则不再变长
        this.anchorOffsetX = this.stickSprite.width;
        this.stickSprite.anchorOffsetY = this.stickSprite.height;
        if (this.stickSprite.height * this.scaleY >= this.stageH / 2) {
            console.log("growth end");
            return;
        }

        this.stickSprite.scaleY += this.growRate;

    }

    //  朝右变长
    private growWidth(): void {

        // 如果长度超过屏幕高的一半，则不再变长
        if (this.stickSprite.width * this.scaleX >= this.stageH / 2) {
            console.log("growth end");
            return;
        }
        this.scaleX += this.growRate;
    }
}
