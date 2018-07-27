/**
 *
 * @author 
 *
 */
class ShopScene extends egret.DisplayObjectContainer {
    private gameimgSheet: egret.SpriteSheet;
    private coverimgSheet: egret.SpriteSheet;
    private shopimgSheet: egret.SpriteSheet;
    private buyspr: egret.Sprite;
    private tishi_index: number;
    private listlayer: egret.Sprite;
    private btnlayer: egret.Sprite;
    private closeallbtn: egret.Bitmap;
    private gamescene: GameScene;
    public constructor(gamescene: GameScene) {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initstage, this);
        this.gamescene = gamescene;
    }
    private initstage(event: egret.Event) {
        this.gameimgSheet = RES.getRes("gameimg_json");
        this.coverimgSheet = RES.getRes("coverimg_json");
        this.shopimgSheet = RES.getRes("shopimg_json");
        this.createScene();
    }
    private createScene(): void {
        var ditu: egret.Bitmap = new egret.Bitmap();
        ditu.texture = this.gameimgSheet.getTexture("ditu");
        ditu.fillMode = egret.BitmapFillMode.REPEAT;
        ditu.x = 0;
        ditu.y = 48;
        ditu.width = GameUtils.SCREEN_W;
        ditu.height = GameUtils.SCREEN_H - 82 - 48;
        this.addChild(ditu);
        ditu.touchEnabled = true;

        var shoptop: egret.Bitmap = new egret.Bitmap();
        shoptop.texture = this.gameimgSheet.getTexture("titletop");
        shoptop.x = 0;
        shoptop.y = 50;
        this.addChild(shoptop);

        var titleshop: egret.Bitmap = new egret.Bitmap();
        titleshop.texture = this.gameimgSheet.getTexture("titleshop");
        titleshop.x = (GameUtils.SCREEN_W - titleshop.texture.textureWidth) / 2;
        titleshop.y = 60;
        this.addChild(titleshop);

        var titlebottom: egret.Bitmap = new egret.Bitmap();
        titlebottom.texture = this.gameimgSheet.getTexture("titlebottom");
        titlebottom.x = 0;
        titlebottom.y = GameUtils.SCREEN_H - 100;
        this.addChild(titlebottom);

        this.btnlayer = new egret.Sprite();
        this.addChild(this.btnlayer);
        this.listlayer = new egret.Sprite();
        this.addChild(this.listlayer);

        this.closeallbtn = new egret.Bitmap();
        this.closeallbtn.texture = this.coverimgSheet.getTexture("closemenu");
        this.closeallbtn.x = GameUtils.SCREEN_W - this.closeallbtn.texture.textureWidth - 5;
        this.closeallbtn.y = 50;
        this.addChild(this.closeallbtn);
        this.closeallbtn.touchEnabled = true;
        this.closeallbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeAll, this);

        this.drawList();

    }
    private closeAll(evt: egret.TouchEvent) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.gamescene.backJuQing();
    }
    private drawList(): void {
        var shopbg0_h: number = GameUtils.SCREEN_H - 180;

        var list = new BagList(this);
        this.listlayer.addChild(list);

        var myscrollView: egret.ScrollView = new egret.ScrollView();
        myscrollView.setContent(list);
        myscrollView.width = GameUtils.SCREEN_W;
        myscrollView.height = shopbg0_h - 50;
        myscrollView.x = 0;
        myscrollView.y = 110;
        myscrollView.verticalScrollPolicy = "on";
        myscrollView.horizontalScrollPolicy = "off";
        this.listlayer.addChild(myscrollView);
    }
    public drawTishi(str1: string): void {
        var tishi = new DrawUtils();
        tishi.createTishi("coverimg_json", "tishikuang1", str1);
        this.addChild(tishi);
    }
    public drawBianCeTishi() {
        var tishi = new DrawUtils();
        tishi.createBianCeTishi("gameimg_json", "biance");
        this.addChild(tishi);
    }

    public closeScene(): void {
        this.removeChildren();
    }
    private gotoFriend(evt: egret.TouchEvent) {
        if (GameUtils.gameSandPause) {
            return;
        }
        this.gamescene.gotoFriend();
    }
}
