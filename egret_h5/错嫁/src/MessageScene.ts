/**
 *
 * @author 
 *
 */
class MessageScene extends egret.DisplayObjectContainer {
    private gameimgSheet: egret.SpriteSheet;
    private Messagelayer: egret.Sprite;
    private listLayer: egret.Sprite;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initstage, this);
    }
    private initstage(event: egret.Event) {
        this.gameimgSheet = RES.getRes("gameimg_json");
        this.createScene();
    }
    private createScene(): void {
        this.Messagelayer = new egret.Sprite();
        this.addChild(this.Messagelayer);

        var ditu: egret.Bitmap = new egret.Bitmap();
        ditu.texture = this.gameimgSheet.getTexture("ditu");
        ditu.fillMode = egret.BitmapFillMode.REPEAT;
        ditu.x = 0;
        ditu.y = 48;
        ditu.width = GameUtils.SCREEN_W;
        ditu.height = GameUtils.SCREEN_H - 82 - 48;
        this.Messagelayer.addChild(ditu);
        ditu.touchEnabled = true;

        var msgtop: egret.Bitmap = new egret.Bitmap();
        msgtop.texture = this.gameimgSheet.getTexture("titletop");
        msgtop.x = 0;
        msgtop.y = 50;
        this.Messagelayer.addChild(msgtop);

        var titlemsg: egret.Bitmap = new egret.Bitmap();
        titlemsg.texture = this.gameimgSheet.getTexture("titlemessage");
        titlemsg.x = (GameUtils.SCREEN_W - titlemsg.texture.textureWidth) / 2;
        titlemsg.y = 60;
        this.Messagelayer.addChild(titlemsg);

        var closemsg: egret.Bitmap = new egret.Bitmap();
        closemsg.texture = this.gameimgSheet.getTexture("close");
        closemsg.x = GameUtils.SCREEN_W - closemsg.texture.textureWidth;
        closemsg.y = 55;
        this.Messagelayer.addChild(closemsg);
        closemsg.touchEnabled = true;
        closemsg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeMessageList, this);

        var titlebottom: egret.Bitmap = new egret.Bitmap();
        titlebottom.texture = this.gameimgSheet.getTexture("titlebottom");
        titlebottom.x = 0;
        titlebottom.y = GameUtils.SCREEN_H - 100;
        this.Messagelayer.addChild(titlebottom);

        this.listLayer = new egret.Sprite();
        this.Messagelayer.addChild(this.listLayer);

        var msglist: MessageList = new MessageList(this);
        this.listLayer.addChild(msglist);

        var myscrollView: egret.ScrollView = new egret.ScrollView();
        myscrollView.setContent(msglist);
        myscrollView.width = GameUtils.SCREEN_W;
        myscrollView.height = GameUtils.SCREEN_H - 220;
        myscrollView.x = 0;
        myscrollView.y = 110;
        myscrollView.verticalScrollPolicy = "on";
        myscrollView.horizontalScrollPolicy = "off";
        this.listLayer.addChild(myscrollView);
    }
    public refreshList() {
        var readList: Array<MessageBean> = new Array();
        var not_readList: Array<MessageBean> = new Array();
        for (var i: number = 0; i < GameUtils.messageList.length; i++) {
            if (GameUtils.messageList[i].message_state == 0) {
                not_readList.push(GameUtils.messageList[i]);
            } else {
                readList.push(GameUtils.messageList[i]);
            }
        }
        not_readList.sort(function (a, b) {
            return b.message_create_time - a.message_create_time;
        });
        readList.sort(function (a, b) {
            return b.message_create_time - a.message_create_time;
        });
        GameUtils.messageList = new Array();
        for (var i: number = 0; i < not_readList.length; i++) {
            GameUtils.messageList.push(not_readList[i]);
        }
        for (var i: number = 0; i < readList.length; i++) {
            GameUtils.messageList.push(readList[i]);
        }
        if (this.listLayer) {
            this.listLayer.removeChildren();
        }
        var msglist: MessageList = new MessageList(this);
        this.listLayer.addChild(msglist);

        var myscrollView: egret.ScrollView = new egret.ScrollView();
        myscrollView.setContent(msglist);
        myscrollView.width = GameUtils.SCREEN_W;
        myscrollView.height = GameUtils.SCREEN_H - 220;
        myscrollView.x = 0;
        myscrollView.y = 110;
        myscrollView.verticalScrollPolicy = "on";
        myscrollView.horizontalScrollPolicy = "off";
        this.listLayer.addChild(myscrollView);
    }
    private closeMessageList(evt: egret.TouchEvent) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.removeChildren();
    }
}
