/**
 *
 * @author 
 *
 */
class MessageList extends egret.DisplayObjectContainer {
    private gameimgSheet: egret.SpriteSheet;
    private messageScene: MessageScene;
    private coverimgSheet: egret.SpriteSheet;
    private infolayer: egret.Sprite;
    private readId: number = 0;
    public constructor(thisObj: any) {
        super();
        this.gameimgSheet = RES.getRes("gameimg_json");
        this.coverimgSheet = RES.getRes("coverimg_json");
        this.messageScene = thisObj;
        this.init();
    }
    private init() {
        for (var i: number = 0; i < GameUtils.messageList.length; i++) {
            var msgkuang = new egret.Bitmap();
            msgkuang.texture = this.gameimgSheet.getTexture("msgkuang");
            msgkuang.name = "" + i;
            msgkuang.x = (GameUtils.SCREEN_W - msgkuang.texture.textureWidth) / 2;
            msgkuang.y = 70 * i;
            this.addChild(msgkuang);
            msgkuang.touchEnabled = true;
            msgkuang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showInfo, this);

            if (GameUtils.messageList[i].message_state == 0) {
                var circleshp: egret.Shape = new egret.Shape();
                circleshp.x = 40;
                circleshp.y = 32 + 70 * i;
                circleshp.graphics.beginFill(0xff0000, 1);
                circleshp.graphics.drawCircle(0, 0, 6);
                circleshp.graphics.endFill();
                this.addChild(circleshp);
            }

            var name: egret.TextField = new egret.TextField();
            name.x = 60;
            name.y = 70 * i;
            name.height = 70;
            name.textColor = 0xffe84c;
            name.size = GameUtils.TEXT_SIZE_SMALL;
            name.text = GameUtils.messageList[i].message_title;
            name.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.addChild(name);
            name.strokeColor = 0x000000;
            name.stroke = 2;

            var myDate = new Date(GameUtils.messageList[i].message_create_time);

            var time: egret.TextField = new egret.TextField();
            time.x = GameUtils.SCREEN_W / 2;
            time.y = 70 * i;
            time.height = 70;
            time.textColor = 0xffffff;
            time.size = GameUtils.TEXT_SIZE_SMALL;
            time.text = "" + (myDate.getMonth() + 1) + " 月 " + myDate.getDate() + " 日";
            time.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.addChild(time);

            var hours: string = myDate.getHours() < 10 ? ("0" + myDate.getHours()) : ("" + myDate.getHours());
            var minutes: string = myDate.getMinutes() < 10 ? ("0" + myDate.getMinutes()) : ("" + myDate.getMinutes());
            var time_h: egret.TextField = new egret.TextField();
            time_h.x = GameUtils.SCREEN_W / 2 + 140;
            time_h.y = 70 * i;
            time_h.height = 70;
            time_h.textColor = 0xffffff;
            time_h.size = GameUtils.TEXT_SIZE_SMALL;
            time_h.text = hours + ":" + minutes;
            time_h.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.addChild(time_h);
        }

    }
    private showInfo(evt: egret.TouchEvent) {
        var dianeff = new DianEff(this.messageScene, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        var btn: egret.Bitmap = evt.currentTarget;
        if (btn) {
            this.readId = parseInt(btn.name);
            var sendstealobj = { cmd: 120, player_token: GameUtils.playerToken, notification_id: GameUtils.messageList[this.readId].message_id, return_json: 1 };
            NetWorkUtils.sendNetPostRequest(sendstealobj, this.getReadComplete, this.onPostIOError, this.messageScene, this);
            this.drawInfo(btn.name);
        }
    }
    private getReadComplete(event: egret.Event) {
        var obj = NetWorkUtils.getResponseObj("p_120.k", event);
        // GameUtils.debugLog(obj);
        if (obj.result == 1) {
            GameUtils.messageList[this.readId].message_state = 1;
        }
    }
    private onPostIOError(event: egret.IOErrorEvent): void {
        NetWorkUtils.clearNetLoading();
    }
    public drawInfo(id: string) {
        this.infolayer = new egret.Sprite();
        this.messageScene.addChild(this.infolayer);

        var alphaspr: egret.Sprite = new egret.Sprite;
        alphaspr.graphics.beginFill(0x000000, 1);
        alphaspr.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H);
        alphaspr.graphics.endFill();
        alphaspr.width = GameUtils.SCREEN_W;
        alphaspr.height = GameUtils.SCREEN_H;
        alphaspr.alpha = 0.0;
        this.infolayer.addChild(alphaspr);
        alphaspr.touchEnabled = true;

        var infobg: egret.Bitmap = new egret.Bitmap();
        infobg.texture = this.coverimgSheet.getTexture("msgbg");
        infobg.x = (GameUtils.SCREEN_W - 460) / 2;
        infobg.y = (GameUtils.SCREEN_H - 420) / 2;
        this.infolayer.addChild(infobg);
        var bgrectsound: egret.Rectangle = new egret.Rectangle(50, 50, 50, 50);
        infobg.scale9Grid = bgrectsound;
        infobg.width = 460;
        infobg.height = 420;

        var msgkuang1: egret.Bitmap = new egret.Bitmap();
        msgkuang1.texture = this.coverimgSheet.getTexture("msgkuang1");
        msgkuang1.x = (GameUtils.SCREEN_W - msgkuang1.texture.textureWidth) / 2;
        msgkuang1.y = (GameUtils.SCREEN_H - 420) / 2 + 10;
        this.infolayer.addChild(msgkuang1);

        var name: egret.TextField = new egret.TextField();
        name.x = 0;
        name.y = (GameUtils.SCREEN_H - 420) / 2;
        name.height = 70;
        name.width = GameUtils.SCREEN_W;
        name.textColor = 0xffdf48;
        name.size = GameUtils.TEXT_SIZE_MIDDLE;
        name.text = GameUtils.messageList[parseInt(id)].message_title;
        name.verticalAlign = egret.VerticalAlign.MIDDLE;
        name.textAlign = egret.HorizontalAlign.CENTER;
        this.infolayer.addChild(name);
        name.strokeColor = 0xae6363;
        name.stroke = 2;
        if (GameUtils.messageList[parseInt(id)].message_type == 100) {
            var info: egret.TextField = new egret.TextField();
            info.x = 28;
            info.y = 10;
            info.width = GameUtils.SCREEN_W - 120;
            info.textColor = 0x000000;
            info.size = GameUtils.TEXT_SIZE_MIDDLE;
            info.textFlow = (new egret.HtmlTextParser).parser(GameUtils.messageList[parseInt(id)].message_info);
            info.lineSpacing = 5;
            this.infolayer.addChild(info);
            info.touchEnabled = true;
            info.addEventListener(egret.TextEvent.LINK, function (evt: egret.TextEvent) {
                // console.log(evt.text);
            }, this);
        } else {
            var info: egret.TextField = new egret.TextField();
            info.x = 28;
            info.y = 10;
            info.width = GameUtils.SCREEN_W - 120;
            info.textColor = 0x000000;
            info.size = GameUtils.TEXT_SIZE_MIDDLE;
            info.text = GameUtils.messageList[parseInt(id)].message_info;
            info.lineSpacing = 5;
            info.bold = true;
            this.infolayer.addChild(info);
        }



        var myscrollView: egret.ScrollView = new egret.ScrollView();
        myscrollView.setContent(info);
        myscrollView.x = 40;
        myscrollView.y = (GameUtils.SCREEN_H - 420) / 2 + 80;
        myscrollView.width = GameUtils.SCREEN_W - 80;
        myscrollView.height = 420 - 80 - 70;
        myscrollView.verticalScrollPolicy = "on";
        myscrollView.horizontalScrollPolicy = "off";
        this.infolayer.addChild(myscrollView);


        var closeinfo: egret.Bitmap = new egret.Bitmap();
        closeinfo.texture = this.coverimgSheet.getTexture("ok1");
        closeinfo.x = (GameUtils.SCREEN_W - 124) / 2;
        closeinfo.y = (GameUtils.SCREEN_H - 420) / 2 + 360;
        this.infolayer.addChild(closeinfo);
        closeinfo.touchEnabled = true;
        closeinfo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeInfo, this);
    }
    private closeInfo(evt: egret.TouchEvent) {
        var dianeff = new DianEff(this.messageScene, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.infolayer) {
            this.infolayer.removeChildren();
        }
        this.messageScene.refreshList();
    }
}
