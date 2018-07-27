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
var FriendScene = (function (_super) {
    __extends(FriendScene, _super);
    function FriendScene(gamescene, type) {
        var _this = _super.call(this) || this;
        _this.npc = new Array("npc0", "npc1");
        _this.stageType = 0;
        //type 0：普通好友列表,1：玩吧唤醒好友列表
        _this.stageType = type;
        _this.gameScene = gamescene;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initstage, _this);
        return _this;
    }
    FriendScene.prototype.initstage = function (event) {
        this.gameimgSheet = RES.getRes("gameimg_json");
        this.coverimgSheet = RES.getRes("coverimg_json");
        this.createScene(this.stageType);
    };
    FriendScene.prototype.callBackTencentFriendList = function (event) {
        this.createScene(this.stageType);
        if (GameUtils.dateEventSprite.hasEventListener(EventData.DATA_TENCENT_FRIENDLIST)) {
            GameUtils.dateEventSprite.removeEventListener(EventData.DATA_TENCENT_FRIENDLIST, this.callBackTencentFriendList, this);
        }
    };
    FriendScene.prototype.createScene = function (type) {
        var ditu = new egret.Bitmap();
        ditu.texture = this.gameimgSheet.getTexture("ditu");
        ditu.fillMode = egret.BitmapFillMode.REPEAT;
        ditu.x = 0;
        ditu.y = 48;
        ditu.width = GameUtils.SCREEN_W;
        ditu.height = GameUtils.SCREEN_H - 82 - 48;
        this.addChild(ditu);
        ditu.touchEnabled = true;
        var friendtop = new egret.Bitmap();
        friendtop.texture = this.gameimgSheet.getTexture("titletop");
        friendtop.x = 0;
        friendtop.y = 50;
        this.addChild(friendtop);
        var titlefriend = new egret.Bitmap();
        titlefriend.texture = this.gameimgSheet.getTexture("titlefriend");
        titlefriend.x = (GameUtils.SCREEN_W - titlefriend.texture.textureWidth) / 2;
        titlefriend.y = 60;
        this.addChild(titlefriend);
        var titlebottom = new egret.Bitmap();
        titlebottom.texture = this.gameimgSheet.getTexture("titlebottom");
        titlebottom.x = 0;
        titlebottom.y = GameUtils.SCREEN_H - 100;
        this.addChild(titlebottom);
        if (GameUtils.friendBeanList.length == 0) {
            var nofriend = new egret.TextField();
            nofriend.x = 110;
            nofriend.y = 200;
            nofriend.height = 100;
            nofriend.width = GameUtils.SCREEN_W - 220;
            nofriend.textColor = 0xffffff;
            nofriend.size = GameUtils.TEXT_SIZE_MIDDLE;
            nofriend.text = "没有发现好友，快去分享游戏把小伙伴们叫来吧~";
            nofriend.verticalAlign = egret.VerticalAlign.MIDDLE;
            nofriend.textAlign = egret.HorizontalAlign.CENTER;
            nofriend.lineSpacing = 10;
            this.addChild(nofriend);
        }
        this.list_area = false;
        var isshow = false;
        for (var i = 0; i < GameUtils.friendBeanList.length; i++) {
            if (GameUtils.friendBeanList[i].friendl_interaction == 0) {
                isshow = true;
                break;
            }
        }
        if (GameUtils.isShowRecallList && isshow) {
            this.Recalltext = new egret.TextField();
            this.Recalltext.text = "成功唤醒好友\n可得10体力。";
            this.Recalltext.x = 20;
            this.Recalltext.y = 110;
            this.Recalltext.size = 16;
            this.Recalltext.textColor = 0xffffff;
            this.Recalltext.height = 50;
            this.Recalltext.width = 142;
            this.Recalltext.lineSpacing = 4;
            this.Recalltext.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.Recalltext.strokeColor = 0x000000;
            this.Recalltext.stroke = 2;
            this.addChild(this.Recalltext);
            this.btnHuanxinglist = new egret.Bitmap();
            this.btnHuanxinglist.texture = this.gameimgSheet.getTexture("btn_flisttype_0");
            this.btnHuanxinglist.x = GameUtils.SCREEN_W - 118 - 15;
            this.btnHuanxinglist.y = 120;
            this.addChild(this.btnHuanxinglist);
            this.btnHuanxinglist.touchEnabled = true;
            this.btnHuanxinglist.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnHuanxing, this);
            this.btnFriendlist = new egret.Bitmap();
            this.btnFriendlist.texture = this.gameimgSheet.getTexture("btn_flisttype_1");
            this.btnFriendlist.x = 15;
            this.btnFriendlist.y = 120;
            this.addChild(this.btnFriendlist);
            this.btnFriendlist.touchEnabled = true;
            this.btnFriendlist.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnFriendNormal, this);
            this.btnFriendlist.alpha = 0;
            this.btnFriendlist.touchEnabled = false;
            this.list_area = true;
        }
        if (!GameUtils.noYaoQing) {
            var btnYaoqing = new egret.Bitmap();
            btnYaoqing.texture = this.gameimgSheet.getTexture("flistyaoqingbtn");
            btnYaoqing.x = 142;
            btnYaoqing.y = 110;
            this.addChild(btnYaoqing);
            btnYaoqing.touchEnabled = true;
            btnYaoqing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.yaoqing, this);
            this.list_area = true;
        }
        this.listLayer = new egret.Sprite();
        this.addChild(this.listLayer);
        if (type == 0) {
            this.drawList(0);
        }
        else {
            this.btnHuanxinglist.alpha = 0;
            this.btnHuanxinglist.touchEnabled = false;
            this.Recalltext.alpha = 0;
            this.btnFriendlist.alpha = 1;
            this.btnFriendlist.touchEnabled = true;
            this.drawList(1);
        }
        this.closeallbtn = new egret.Bitmap();
        this.closeallbtn.texture = this.coverimgSheet.getTexture("closemenu");
        this.closeallbtn.x = GameUtils.SCREEN_W - this.closeallbtn.texture.textureWidth - 5;
        this.closeallbtn.y = 50;
        this.addChild(this.closeallbtn);
        this.closeallbtn.touchEnabled = true;
        this.closeallbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeAll, this);
        this.otherplayer_layer = new egret.Sprite();
        this.addChild(this.otherplayer_layer);
    };
    FriendScene.prototype.clearList = function () {
        if (this.listLayer) {
            this.listLayer.removeChildren();
        }
    };
    FriendScene.prototype.drawList = function (type) {
        var friendlist = new FriendList(this, type);
        this.listLayer.addChild(friendlist);
        var list_y = 165;
        var list_h = GameUtils.SCREEN_H - 285;
        if (!this.list_area) {
            list_y = 110;
            list_h = GameUtils.SCREEN_H - 220;
        }
        var myscrollView = new egret.ScrollView();
        myscrollView.setContent(friendlist);
        myscrollView.width = GameUtils.SCREEN_W;
        myscrollView.height = list_h;
        myscrollView.x = 0;
        myscrollView.y = list_y;
        myscrollView.verticalScrollPolicy = "on";
        myscrollView.horizontalScrollPolicy = "off";
        this.listLayer.addChild(myscrollView);
    };
    FriendScene.prototype.btnHuanxing = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.btnHuanxinglist.alpha = 0;
        this.btnHuanxinglist.touchEnabled = false;
        this.Recalltext.alpha = 0;
        this.btnFriendlist.alpha = 1;
        this.btnFriendlist.touchEnabled = true;
        this.clearList();
        this.drawList(1);
    };
    FriendScene.prototype.btnFriendNormal = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.btnHuanxinglist.alpha = 1;
        this.btnHuanxinglist.touchEnabled = true;
        this.Recalltext.alpha = 1;
        this.btnFriendlist.alpha = 0;
        this.btnFriendlist.touchEnabled = false;
        this.clearList();
        this.drawList(0);
    };
    FriendScene.prototype.yaoqing = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.showSharList();
    };
    FriendScene.prototype.closeAll = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.gameScene.backJuQing();
    };
    FriendScene.prototype.closeScene = function () {
        this.removeChildren();
    };
    FriendScene.prototype.drawOtherPlayer = function () {
        var alphaspr = new egret.Sprite;
        alphaspr.graphics.beginFill(0x000000, 1);
        alphaspr.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H);
        alphaspr.graphics.endFill();
        alphaspr.width = GameUtils.SCREEN_W;
        alphaspr.height = GameUtils.SCREEN_H;
        alphaspr.alpha = 0.0;
        this.otherplayer_layer.addChild(alphaspr);
        alphaspr.touchEnabled = true;
        var bg1_h = GameUtils.SCREEN_H - 300;
        this.bg1_x = 8;
        this.bg1_y = 150;
        var bg1 = new egret.Bitmap();
        bg1.texture = this.gameimgSheet.getTexture("propertybg1");
        bg1.x = this.bg1_x;
        bg1.y = this.bg1_y;
        this.otherplayer_layer.addChild(bg1);
        var bgrect1 = new egret.Rectangle(50, 50, 50, 50);
        bg1.scale9Grid = bgrect1;
        bg1.width = GameUtils.SCREEN_W - this.bg1_x * 2;
        bg1.height = bg1_h;
        var bgkuang_h = GameUtils.SCREEN_H - 380;
        var bg2_h = GameUtils.SCREEN_H - 320;
        var bg2 = new egret.Bitmap();
        bg2.texture = this.gameimgSheet.getTexture("propertybg2");
        bg2.x = this.bg1_x + 10;
        bg2.y = this.bg1_y + 10;
        this.otherplayer_layer.addChild(bg2);
        var bgrect2 = new egret.Rectangle(34, 34, 34, 34);
        bg2.scale9Grid = bgrect2;
        bg2.width = GameUtils.SCREEN_W - (this.bg1_x + 10) * 2;
        bg2.height = bg2_h;
        var closebtn = new egret.Bitmap();
        closebtn.texture = this.gameimgSheet.getTexture("close");
        closebtn.x = GameUtils.SCREEN_W - closebtn.texture.textureWidth;
        closebtn.y = this.bg1_y;
        this.otherplayer_layer.addChild(closebtn);
        closebtn.touchEnabled = true;
        closebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeOther, this);
        var iphone_top_y = 0;
        if (GameUtils.is_iphone_x) {
            iphone_top_y = 50;
        }
        var touxiangkuang = new egret.Bitmap();
        touxiangkuang.texture = this.gameimgSheet.getTexture("touxiangkuang");
        touxiangkuang.x = this.bg1_x + 15;
        touxiangkuang.y = this.bg1_y + 15 + iphone_top_y;
        this.otherplayer_layer.addChild(touxiangkuang);
        var othername = new egret.TextField();
        othername.x = this.bg1_x + 110;
        othername.y = this.bg1_y + 20 + iphone_top_y;
        othername.textColor = 0xffffff;
        othername.size = GameUtils.TEXT_SIZE_MIDDLE;
        othername.text = GameUtils.playerfriendbean.other_name;
        this.otherplayer_layer.addChild(othername);
        if (GameUtils.playerfriendbean.other_avatar) {
            var imgLoader = new NetImageLoader();
            imgLoader.imgid = i;
            imgLoader.addEventListener(egret.Event.COMPLETE, this.imgLoadHandler, this);
            imgLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.imgError, this);
            imgLoader.load(GameUtils.playerfriendbean.other_avatar);
        }
        else {
            var tou0 = new egret.Bitmap();
            tou0.texture = this.gameimgSheet.getTexture("tou0");
            tou0.x = this.bg1_x + 22;
            tou0.y = this.bg1_y + 22 + iphone_top_y;
            this.otherplayer_layer.addChild(tou0);
        }
        var property0_x = this.bg1_x + 110;
        ;
        var property0_y = this.bg1_y + 120;
        var property0_w = 62;
        var property0 = new egret.Bitmap();
        property0.texture = this.gameimgSheet.getTexture("property0");
        property0.x = property0_x;
        property0.y = property0_y;
        this.otherplayer_layer.addChild(property0);
        var meilinum = new egret.BitmapText();
        meilinum.font = RES.getRes("propertynum_fnt");
        this.otherplayer_layer.addChild(meilinum);
        meilinum.text = "" + GameUtils.playerfriendbean.other_meilizhi;
        meilinum.letterSpacing = 0;
        meilinum.x = property0_x + property0_w + 20;
        meilinum.y = 2 + property0_y;
        var property1 = new egret.Bitmap();
        property1.texture = this.gameimgSheet.getTexture("property1");
        property1.x = property0_x;
        property1.y = property0_y + 33;
        this.otherplayer_layer.addChild(property1);
        var jizhinum = new egret.BitmapText();
        jizhinum.font = RES.getRes("propertynum_fnt");
        this.otherplayer_layer.addChild(jizhinum);
        jizhinum.text = "" + GameUtils.playerfriendbean.other_zhihui;
        jizhinum.letterSpacing = 0;
        jizhinum.x = property0_x + property0_w + 20;
        jizhinum.y = 2 + property0_y + 33;
        var property2 = new egret.Bitmap();
        property2.texture = this.gameimgSheet.getTexture("property2");
        property2.x = property0_x;
        property2.y = property0_y + 33 * 2;
        this.otherplayer_layer.addChild(property2);
        var meimaonum = new egret.BitmapText();
        meimaonum.font = RES.getRes("propertynum_fnt");
        this.otherplayer_layer.addChild(meimaonum);
        meimaonum.text = "" + GameUtils.playerfriendbean.other_koucai;
        meimaonum.letterSpacing = 0;
        meimaonum.x = property0_x + property0_w + 20;
        meimaonum.y = 2 + property0_y + 33 * 2;
        var property3 = new egret.Bitmap();
        property3.texture = this.gameimgSheet.getTexture("property3");
        property3.x = property0_x;
        property3.y = property0_y + 33 * 3;
        this.otherplayer_layer.addChild(property3);
        var gongfunum = new egret.BitmapText();
        gongfunum.font = RES.getRes("propertynum_fnt");
        this.otherplayer_layer.addChild(gongfunum);
        gongfunum.text = "" + GameUtils.playerfriendbean.other_wuli;
        gongfunum.letterSpacing = 0;
        gongfunum.x = property0_x + property0_w + 20;
        gongfunum.y = 2 + property0_y + 33 * 3;
        var iphone_y = 0;
        if (GameUtils.is_iphone_x) {
            iphone_y = -20;
        }
        var propertyplayer = new egret.Bitmap();
        propertyplayer.texture = this.gameimgSheet.getTexture("propertyplayer");
        propertyplayer.x = GameUtils.SCREEN_W / 2 + 20;
        propertyplayer.y = this.bg1_y + 10 + bgkuang_h - 200 - propertyplayer.texture.textureHeight + iphone_y;
        this.otherplayer_layer.addChild(propertyplayer);
        var bg3 = new egret.Bitmap();
        bg3.texture = this.gameimgSheet.getTexture("propertybg3");
        bg3.x = this.bg1_x + 20;
        bg3.y = this.bg1_y + bgkuang_h - 195 + iphone_y;
        this.otherplayer_layer.addChild(bg3);
        var bgrect3 = new egret.Rectangle(34, 34, 34, 34);
        bg3.scale9Grid = bgrect3;
        bg3.width = GameUtils.SCREEN_W - (this.bg1_x + 10) * 2 - 20;
        bg3.height = 200;
        var propertybg4 = new egret.Bitmap();
        propertybg4.texture = this.gameimgSheet.getTexture("propertybg4");
        propertybg4.x = (GameUtils.SCREEN_W - propertybg4.texture.textureWidth) / 2;
        propertybg4.y = this.bg1_y + bgkuang_h - 195 + iphone_y;
        this.otherplayer_layer.addChild(propertybg4);
        var npc_x = (GameUtils.SCREEN_W - 230 * 2 - 10) / 2;
        for (var i = 0; i < GameUtils.playerfriendbean.other_haogandu.length; i++) {
            var npc = new egret.Bitmap();
            npc.texture = this.gameimgSheet.getTexture(this.getnpcicon(GameUtils.playerfriendbean.other_haogandu[i].hao_npc_id));
            this.otherplayer_layer.addChild(npc);
            npc.x = npc_x + 240 * i;
            npc.y = bg3.y + propertybg4.texture.textureHeight + 10;
            var npcnum = new egret.BitmapText();
            npcnum.font = RES.getRes("haogannum_fnt");
            this.otherplayer_layer.addChild(npcnum);
            npcnum.text = "" + GameUtils.playerfriendbean.other_haogandu[i].hao_haogandu;
            npcnum.letterSpacing = 0;
            var npc_W = (npc.texture.textureWidth - npcnum.textWidth) / 2;
            npcnum.x = npc_W + npc_x + 240 * i;
            npcnum.y = bg3.y + propertybg4.texture.textureHeight + 15 + npc.texture.textureHeight;
        }
        //        var stealbtn: egret.Bitmap = new egret.Bitmap();
        //        stealbtn.texture = this.gameimgSheet.getTexture("moyixia");
        //        stealbtn.x = (GameUtils.SCREEN_W - 150) /2;
        //        stealbtn.y = this.bg1_y + bgkuang_h+10;
        //        this.otherplayer_layer.addChild(stealbtn);
        //        stealbtn.touchEnabled = true;
        //        stealbtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.stealOther,this);
        //       
    };
    FriendScene.prototype.imgError = function (event) {
        var tou0 = new egret.Bitmap();
        tou0.texture = this.gameimgSheet.getTexture("tou0");
        tou0.x = this.bg1_x + 22;
        tou0.y = this.bg1_y + 22;
        this.otherplayer_layer.addChild(tou0);
    };
    FriendScene.prototype.imgLoadHandler = function (evt) {
        var loader = evt.currentTarget;
        if (loader) {
            var iphone_top_y = 0;
            if (GameUtils.is_iphone_x) {
                iphone_top_y = 50;
            }
            var bmd = loader.data;
            var texture = new egret.Texture();
            texture.bitmapData = bmd;
            var bmp = new egret.Bitmap(texture);
            bmp.x = this.bg1_x + 22;
            bmp.y = this.bg1_y + 22 + iphone_top_y;
            bmp.width = 72;
            bmp.height = 72;
            this.otherplayer_layer.addChild(bmp);
        }
    };
    FriendScene.prototype.getnpcicon = function (npcid) {
        var str = "npc0";
        for (var i = 0; i < this.npc.length; i++) {
            if (i == (npcid - 1)) {
                str = this.npc[i];
            }
        }
        return str;
    };
    FriendScene.prototype.showSharList = function () {
        NetWorkUtils.sendSimpleNetPostRequest(109, this.getsharelistComplete, this.onPostIOError, this, this);
    };
    FriendScene.prototype.getsharelistComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_109.k", event);
        if (obj) {
            GameUtils.shareListBean = new ShareListBean(obj);
        }
        var showsharelist = new DrawUtils();
        showsharelist.drawShareList();
        this.addChild(showsharelist);
    };
    FriendScene.prototype.onPostIOError = function (event) {
        NetWorkUtils.clearNetLoading();
    };
    FriendScene.prototype.closeOther = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.otherplayer_layer) {
            if (this.otherplayer_layer.parent) {
                this.otherplayer_layer.removeChildren();
                FriendList.isLookStage = false;
            }
        }
    };
    return FriendScene;
}(egret.DisplayObjectContainer));
__reflect(FriendScene.prototype, "FriendScene");
//# sourceMappingURL=FriendScene.js.map