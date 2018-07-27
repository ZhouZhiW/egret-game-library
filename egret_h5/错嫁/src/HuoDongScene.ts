/**
 *
 * @author 
 *
 */
class HuoDongScene extends egret.DisplayObjectContainer {
    private gameimgSheet: egret.SpriteSheet;
    private coverimgSheet: egret.SpriteSheet;
    private huodonglayer: egret.Sprite;
    private gamescene: GameScene;
    public constructor(gamescene: GameScene) {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initstage, this);
        this.gamescene = gamescene;
    }
    private initstage(event: egret.Event) {
        this.gameimgSheet = RES.getRes("gameimg_json");
        this.coverimgSheet = RES.getRes("coverimg_json");
        this.createScene();
    }
    private createScene(): void {
        this.huodonglayer = new egret.Sprite();
        this.addChild(this.huodonglayer);

        var ditu: egret.Bitmap = new egret.Bitmap();
        ditu.texture = this.gameimgSheet.getTexture("ditu");
        ditu.fillMode = egret.BitmapFillMode.REPEAT;
        ditu.x = 0;
        ditu.y = 48;
        ditu.width = GameUtils.SCREEN_W;
        ditu.height = GameUtils.SCREEN_H - 82 - 48;
        this.huodonglayer.addChild(ditu);
        ditu.touchEnabled = true;

        var huodongtop: egret.Bitmap = new egret.Bitmap();
        huodongtop.texture = this.gameimgSheet.getTexture("titletop");
        huodongtop.x = 0;
        huodongtop.y = 50;
        this.huodonglayer.addChild(huodongtop);

        var titlehuodong: egret.Bitmap = new egret.Bitmap();
        titlehuodong.texture = this.gameimgSheet.getTexture("titlehuodong");
        titlehuodong.x = (GameUtils.SCREEN_W - titlehuodong.texture.textureWidth) / 2;
        titlehuodong.y = 60;
        this.huodonglayer.addChild(titlehuodong);

        var closeallbtn: egret.Bitmap = new egret.Bitmap();
        closeallbtn.texture = this.coverimgSheet.getTexture("closemenu");
        closeallbtn.x = GameUtils.SCREEN_W - closeallbtn.texture.textureWidth - 5;
        closeallbtn.y = 50;
        this.huodonglayer.addChild(closeallbtn);
        closeallbtn.touchEnabled = true;
        closeallbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeAll, this);

        var titlebottom: egret.Bitmap = new egret.Bitmap();
        titlebottom.texture = this.gameimgSheet.getTexture("titlebottom");
        titlebottom.x = 0;
        titlebottom.y = GameUtils.SCREEN_H - 100;
        this.huodonglayer.addChild(titlebottom);

        var huodonglist: HuoDongList = new HuoDongList(this, this.gamescene);
        this.huodonglayer.addChild(huodonglist);

        var myscrollView: egret.ScrollView = new egret.ScrollView();
        myscrollView.setContent(huodonglist);
        myscrollView.width = GameUtils.SCREEN_W;
        myscrollView.height = GameUtils.SCREEN_H - 220;
        myscrollView.x = 0;
        myscrollView.y = 110;

        myscrollView.verticalScrollPolicy = "on";
        myscrollView.horizontalScrollPolicy = "off";
        this.huodonglayer.addChild(myscrollView);
    }
    private closeAll(evt: egret.TouchEvent) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.gamescene.backJuQing();
    }
    public closeScene(): void {
        this.removeChildren();
    }
}
