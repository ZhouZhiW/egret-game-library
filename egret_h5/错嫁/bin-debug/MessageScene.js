var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 *
 * @author
 *
 */
var MessageScene = (function (_super) {
    __extends(MessageScene, _super);
    function MessageScene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initstage, _this);
        return _this;
    }
    MessageScene.prototype.initstage = function (event) {
        this.gameimgSheet = RES.getRes("gameimg_json");
        this.createScene();
    };
    MessageScene.prototype.createScene = function () {
        this.Messagelayer = new egret.Sprite();
        this.addChild(this.Messagelayer);
        var ditu = new egret.Bitmap();
        ditu.texture = this.gameimgSheet.getTexture("ditu");
        ditu.fillMode = egret.BitmapFillMode.REPEAT;
        ditu.x = 0;
        ditu.y = 48;
        ditu.width = GameUtils.SCREEN_W;
        ditu.height = GameUtils.SCREEN_H - 82 - 48;
        this.Messagelayer.addChild(ditu);
        ditu.touchEnabled = true;
        var msgtop = new egret.Bitmap();
        msgtop.texture = this.gameimgSheet.getTexture("titletop");
        msgtop.x = 0;
        msgtop.y = 50;
        this.Messagelayer.addChild(msgtop);
        var titlemsg = new egret.Bitmap();
        titlemsg.texture = this.gameimgSheet.getTexture("titlemessage");
        titlemsg.x = (GameUtils.SCREEN_W - titlemsg.texture.textureWidth) / 2;
        titlemsg.y = 60;
        this.Messagelayer.addChild(titlemsg);
        var closemsg = new egret.Bitmap();
        closemsg.texture = this.gameimgSheet.getTexture("close");
        closemsg.x = GameUtils.SCREEN_W - closemsg.texture.textureWidth;
        closemsg.y = 55;
        this.Messagelayer.addChild(closemsg);
        closemsg.touchEnabled = true;
        closemsg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeMessageList, this);
        var titlebottom = new egret.Bitmap();
        titlebottom.texture = this.gameimgSheet.getTexture("titlebottom");
        titlebottom.x = 0;
        titlebottom.y = GameUtils.SCREEN_H - 100;
        this.Messagelayer.addChild(titlebottom);
        this.listLayer = new egret.Sprite();
        this.Messagelayer.addChild(this.listLayer);
        var msglist = new MessageList(this);
        this.listLayer.addChild(msglist);
        var myscrollView = new egret.ScrollView();
        myscrollView.setContent(msglist);
        myscrollView.width = GameUtils.SCREEN_W;
        myscrollView.height = GameUtils.SCREEN_H - 220;
        myscrollView.x = 0;
        myscrollView.y = 110;
        myscrollView.verticalScrollPolicy = "on";
        myscrollView.horizontalScrollPolicy = "off";
        this.listLayer.addChild(myscrollView);
    };
    MessageScene.prototype.refreshList = function () {
        var readList = new Array();
        var not_readList = new Array();
        for (var i = 0; i < GameUtils.messageList.length; i++) {
            if (GameUtils.messageList[i].message_state == 0) {
                not_readList.push(GameUtils.messageList[i]);
            }
            else {
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
        for (var i = 0; i < not_readList.length; i++) {
            GameUtils.messageList.push(not_readList[i]);
        }
        for (var i = 0; i < readList.length; i++) {
            GameUtils.messageList.push(readList[i]);
        }
        if (this.listLayer) {
            this.listLayer.removeChildren();
        }
        var msglist = new MessageList(this);
        this.listLayer.addChild(msglist);
        var myscrollView = new egret.ScrollView();
        myscrollView.setContent(msglist);
        myscrollView.width = GameUtils.SCREEN_W;
        myscrollView.height = GameUtils.SCREEN_H - 220;
        myscrollView.x = 0;
        myscrollView.y = 110;
        myscrollView.verticalScrollPolicy = "on";
        myscrollView.horizontalScrollPolicy = "off";
        this.listLayer.addChild(myscrollView);
    };
    MessageScene.prototype.closeMessageList = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.removeChildren();
    };
    return MessageScene;
}(egret.DisplayObjectContainer));
__reflect(MessageScene.prototype, "MessageScene");
//# sourceMappingURL=MessageScene.js.map