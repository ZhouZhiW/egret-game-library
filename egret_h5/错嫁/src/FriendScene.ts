/**
 *
 * @author 
 *
 */
class FriendScene extends egret.DisplayObjectContainer {
    private gameimgSheet: egret.SpriteSheet;
    private coverimgSheet: egret.SpriteSheet;
    private otherplayer_layer: egret.Sprite;
    private gameScene: GameScene;
    private closeallbtn: egret.Bitmap;
    private btnHuanxinglist: egret.Bitmap;
    private btnFriendlist: egret.Bitmap;
    private Recalltext: egret.TextField;
    private listLayer: egret.Sprite;
    private list_area: boolean;
    private bg1_x: number;
    private bg1_y: number;
    private npc = new Array(
        "npc0", "npc1");

    private netloading: NetLoadingUI;
    private stageType: number = 0;
    public constructor(gamescene: GameScene, type: number) {
        super();
        //type 0：普通好友列表,1：玩吧唤醒好友列表
        this.stageType = type;
        this.gameScene = gamescene;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initstage, this);
    }
    private initstage(event: egret.Event) {
        this.gameimgSheet = RES.getRes("gameimg_json");
        this.coverimgSheet = RES.getRes("coverimg_json");
        this.createScene(this.stageType);
    }
    private callBackTencentFriendList(event: EventData) {
        this.createScene(this.stageType);
        if (GameUtils.dateEventSprite.hasEventListener(EventData.DATA_TENCENT_FRIENDLIST)) {
            GameUtils.dateEventSprite.removeEventListener(EventData.DATA_TENCENT_FRIENDLIST, this.callBackTencentFriendList, this);
        }
    }
    private createScene(type: number) {
        var ditu: egret.Bitmap = new egret.Bitmap();
        ditu.texture = this.gameimgSheet.getTexture("ditu");
        ditu.fillMode = egret.BitmapFillMode.REPEAT;
        ditu.x = 0;
        ditu.y = 48;
        ditu.width = GameUtils.SCREEN_W;
        ditu.height = GameUtils.SCREEN_H - 82 - 48;
        this.addChild(ditu);
        ditu.touchEnabled = true;

        var friendtop: egret.Bitmap = new egret.Bitmap();
        friendtop.texture = this.gameimgSheet.getTexture("titletop");
        friendtop.x = 0;
        friendtop.y = 50;
        this.addChild(friendtop);

        var titlefriend: egret.Bitmap = new egret.Bitmap();
        titlefriend.texture = this.gameimgSheet.getTexture("titlefriend");
        titlefriend.x = (GameUtils.SCREEN_W - titlefriend.texture.textureWidth) / 2;
        titlefriend.y = 60;
        this.addChild(titlefriend);


        var titlebottom: egret.Bitmap = new egret.Bitmap();
        titlebottom.texture = this.gameimgSheet.getTexture("titlebottom");
        titlebottom.x = 0;
        titlebottom.y = GameUtils.SCREEN_H - 100;
        this.addChild(titlebottom);


        if (GameUtils.friendBeanList.length == 0) {
            var nofriend: egret.TextField = new egret.TextField();
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
        var isshow: boolean = false;
        for (var i: number = 0; i < GameUtils.friendBeanList.length; i++) {
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
        } else {
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

    }
    private clearList() {
        if (this.listLayer) {
            this.listLayer.removeChildren();
        }
    }
    private drawList(type: number): void {
        var friendlist: FriendList = new FriendList(this, type);
        this.listLayer.addChild(friendlist);
        var list_y: number = 165;
        var list_h: number = GameUtils.SCREEN_H - 285;
        if (!this.list_area) {
            list_y = 110;
            list_h = GameUtils.SCREEN_H - 220;
        }

        var myscrollView: egret.ScrollView = new egret.ScrollView();
        myscrollView.setContent(friendlist);
        myscrollView.width = GameUtils.SCREEN_W;
        myscrollView.height = list_h
        myscrollView.x = 0;
        myscrollView.y = list_y;

        myscrollView.verticalScrollPolicy = "on";
        myscrollView.horizontalScrollPolicy = "off";
        this.listLayer.addChild(myscrollView);
    }

    private btnHuanxing(evt: egret.TouchEvent) {
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
    }
    private btnFriendNormal(evt: egret.TouchEvent) {
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
    }
    private yaoqing(evt: egret.TouchEvent) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.showSharList();
    }
    private closeAll(evt: egret.TouchEvent) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.gameScene.backJuQing();
    }
    public closeScene(): void {
        this.removeChildren();
    }
    public drawOtherPlayer(): void {
        var alphaspr: egret.Sprite = new egret.Sprite;
        alphaspr.graphics.beginFill(0x000000, 1);
        alphaspr.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H);
        alphaspr.graphics.endFill();
        alphaspr.width = GameUtils.SCREEN_W;
        alphaspr.height = GameUtils.SCREEN_H;
        alphaspr.alpha = 0.0;
        this.otherplayer_layer.addChild(alphaspr);
        alphaspr.touchEnabled = true;

        var bg1_h: number = GameUtils.SCREEN_H - 300;
        this.bg1_x = 8;
        this.bg1_y = 150;

        var bg1: egret.Bitmap = new egret.Bitmap();
        bg1.texture = this.gameimgSheet.getTexture("propertybg1");
        bg1.x = this.bg1_x;
        bg1.y = this.bg1_y;
        this.otherplayer_layer.addChild(bg1);
        var bgrect1: egret.Rectangle = new egret.Rectangle(50, 50, 50, 50);
        bg1.scale9Grid = bgrect1;
        bg1.width = GameUtils.SCREEN_W - this.bg1_x * 2;
        bg1.height = bg1_h;

        var bgkuang_h: number = GameUtils.SCREEN_H - 380;
        var bg2_h: number = GameUtils.SCREEN_H - 320;
        var bg2: egret.Bitmap = new egret.Bitmap();
        bg2.texture = this.gameimgSheet.getTexture("propertybg2");
        bg2.x = this.bg1_x + 10;
        bg2.y = this.bg1_y + 10;
        this.otherplayer_layer.addChild(bg2);
        var bgrect2: egret.Rectangle = new egret.Rectangle(34, 34, 34, 34);
        bg2.scale9Grid = bgrect2;
        bg2.width = GameUtils.SCREEN_W - (this.bg1_x + 10) * 2;
        bg2.height = bg2_h;

        var closebtn: egret.Bitmap = new egret.Bitmap();
        closebtn.texture = this.gameimgSheet.getTexture("close");
        closebtn.x = GameUtils.SCREEN_W - closebtn.texture.textureWidth;
        closebtn.y = this.bg1_y;
        this.otherplayer_layer.addChild(closebtn);
        closebtn.touchEnabled = true;
        closebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeOther, this);

        var iphone_top_y: number = 0;
        if (GameUtils.is_iphone_x) {
            iphone_top_y = 50;
        }
        var touxiangkuang: egret.Bitmap = new egret.Bitmap();
        touxiangkuang.texture = this.gameimgSheet.getTexture("touxiangkuang");
        touxiangkuang.x = this.bg1_x + 15;
        touxiangkuang.y = this.bg1_y + 15 + iphone_top_y;
        this.otherplayer_layer.addChild(touxiangkuang);

        var othername: egret.TextField = new egret.TextField();
        othername.x = this.bg1_x + 110;
        othername.y = this.bg1_y + 20 + iphone_top_y;
        othername.textColor = 0xffffff;
        othername.size = GameUtils.TEXT_SIZE_MIDDLE;
        othername.text = GameUtils.playerfriendbean.other_name;
        this.otherplayer_layer.addChild(othername);

        if (GameUtils.playerfriendbean.other_avatar) {
            var imgLoader: NetImageLoader = new NetImageLoader();
            imgLoader.imgid = i;
            imgLoader.addEventListener(egret.Event.COMPLETE, this.imgLoadHandler, this);
            imgLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.imgError, this);
            imgLoader.load(GameUtils.playerfriendbean.other_avatar);
        } else {
            var tou0: egret.Bitmap = new egret.Bitmap();
            tou0.texture = this.gameimgSheet.getTexture("tou0");
            tou0.x = this.bg1_x + 22;
            tou0.y = this.bg1_y + 22 + iphone_top_y;
            this.otherplayer_layer.addChild(tou0);
        }

        var property0_x: number = this.bg1_x + 110;;
        var property0_y: number = this.bg1_y + 120;
        var property0_w: number = 62;
        var property0: egret.Bitmap = new egret.Bitmap();
        property0.texture = this.gameimgSheet.getTexture("property0");
        property0.x = property0_x;
        property0.y = property0_y;
        this.otherplayer_layer.addChild(property0);

        var meilinum: egret.BitmapText = new egret.BitmapText();
        meilinum.font = RES.getRes("propertynum_fnt");
        this.otherplayer_layer.addChild(meilinum);
        meilinum.text = "" + GameUtils.playerfriendbean.other_meilizhi;
        meilinum.letterSpacing = 0;
        meilinum.x = property0_x + property0_w + 20;
        meilinum.y = 2 + property0_y;


        var property1: egret.Bitmap = new egret.Bitmap();
        property1.texture = this.gameimgSheet.getTexture("property1");
        property1.x = property0_x;
        property1.y = property0_y + 33;
        this.otherplayer_layer.addChild(property1);

        var jizhinum: egret.BitmapText = new egret.BitmapText();
        jizhinum.font = RES.getRes("propertynum_fnt");
        this.otherplayer_layer.addChild(jizhinum);
        jizhinum.text = "" + GameUtils.playerfriendbean.other_zhihui;
        jizhinum.letterSpacing = 0;
        jizhinum.x = property0_x + property0_w + 20;
        jizhinum.y = 2 + property0_y + 33;

        var property2: egret.Bitmap = new egret.Bitmap();
        property2.texture = this.gameimgSheet.getTexture("property2");
        property2.x = property0_x;
        property2.y = property0_y + 33 * 2;
        this.otherplayer_layer.addChild(property2);

        var meimaonum: egret.BitmapText = new egret.BitmapText();
        meimaonum.font = RES.getRes("propertynum_fnt");
        this.otherplayer_layer.addChild(meimaonum);
        meimaonum.text = "" + GameUtils.playerfriendbean.other_koucai;
        meimaonum.letterSpacing = 0;
        meimaonum.x = property0_x + property0_w + 20;
        meimaonum.y = 2 + property0_y + 33 * 2;

        var property3: egret.Bitmap = new egret.Bitmap();
        property3.texture = this.gameimgSheet.getTexture("property3");
        property3.x = property0_x;
        property3.y = property0_y + 33 * 3;
        this.otherplayer_layer.addChild(property3);

        var gongfunum: egret.BitmapText = new egret.BitmapText();
        gongfunum.font = RES.getRes("propertynum_fnt");
        this.otherplayer_layer.addChild(gongfunum);
        gongfunum.text = "" + GameUtils.playerfriendbean.other_wuli;
        gongfunum.letterSpacing = 0;
        gongfunum.x = property0_x + property0_w + 20;
        gongfunum.y = 2 + property0_y + 33 * 3;

        var iphone_y: number = 0;
        if (GameUtils.is_iphone_x) {
            iphone_y = -20;
        }
        var propertyplayer: egret.Bitmap = new egret.Bitmap();
        propertyplayer.texture = this.gameimgSheet.getTexture("propertyplayer");
        propertyplayer.x = GameUtils.SCREEN_W / 2 + 20;
        propertyplayer.y = this.bg1_y + 10 + bgkuang_h - 200 - propertyplayer.texture.textureHeight + iphone_y;
        this.otherplayer_layer.addChild(propertyplayer);


        var bg3: egret.Bitmap = new egret.Bitmap();
        bg3.texture = this.gameimgSheet.getTexture("propertybg3");
        bg3.x = this.bg1_x + 20;
        bg3.y = this.bg1_y + bgkuang_h - 195 + iphone_y;
        this.otherplayer_layer.addChild(bg3);
        var bgrect3: egret.Rectangle = new egret.Rectangle(34, 34, 34, 34);
        bg3.scale9Grid = bgrect3;
        bg3.width = GameUtils.SCREEN_W - (this.bg1_x + 10) * 2 - 20;
        bg3.height = 200;

        var propertybg4: egret.Bitmap = new egret.Bitmap();
        propertybg4.texture = this.gameimgSheet.getTexture("propertybg4");
        propertybg4.x = (GameUtils.SCREEN_W - propertybg4.texture.textureWidth) / 2;
        propertybg4.y = this.bg1_y + bgkuang_h - 195 + iphone_y;
        this.otherplayer_layer.addChild(propertybg4);

        var npc_x = (GameUtils.SCREEN_W - 230 * 2 - 10) / 2;
        for (var i: number = 0; i < GameUtils.playerfriendbean.other_haogandu.length; i++) {
            var npc: egret.Bitmap = new egret.Bitmap();
            npc.texture = this.gameimgSheet.getTexture(this.getnpcicon(GameUtils.playerfriendbean.other_haogandu[i].hao_npc_id));
            this.otherplayer_layer.addChild(npc);
            npc.x = npc_x + 240 * i;
            npc.y = bg3.y + propertybg4.texture.textureHeight + 10;

            var npcnum: egret.BitmapText = new egret.BitmapText();
            npcnum.font = RES.getRes("haogannum_fnt");
            this.otherplayer_layer.addChild(npcnum);
            npcnum.text = "" + GameUtils.playerfriendbean.other_haogandu[i].hao_haogandu;
            npcnum.letterSpacing = 0;
            var npc_W: number = (npc.texture.textureWidth - npcnum.textWidth) / 2;
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

    }
    private imgError(event: egret.IOErrorEvent): void {
        var tou0: egret.Bitmap = new egret.Bitmap();
        tou0.texture = this.gameimgSheet.getTexture("tou0");
        tou0.x = this.bg1_x + 22;
        tou0.y = this.bg1_y + 22;
        this.otherplayer_layer.addChild(tou0);
    }
    private imgLoadHandler(evt: egret.Event): void {
        var loader: NetImageLoader = evt.currentTarget;
        if (loader) {
            var iphone_top_y: number = 0;
            if (GameUtils.is_iphone_x) {
                iphone_top_y = 50;
            }
            var bmd: egret.BitmapData = loader.data;
            var texture: egret.Texture = new egret.Texture();
            texture.bitmapData = bmd;
            var bmp: egret.Bitmap = new egret.Bitmap(texture);
            bmp.x = this.bg1_x + 22;
            bmp.y = this.bg1_y + 22 + iphone_top_y;
            bmp.width = 72;
            bmp.height = 72;
            this.otherplayer_layer.addChild(bmp);
        }
    }
    private getnpcicon(npcid: number): string {
        var str: string = "npc0";
        for (var i: number = 0; i < this.npc.length; i++) {
            if (i == (npcid - 1)) {
                str = this.npc[i];
            }
        }
        return str;
    }

    private showSharList() {
        NetWorkUtils.sendSimpleNetPostRequest(109, this.getsharelistComplete, this.onPostIOError, this, this);
    }

    private getsharelistComplete(event: egret.Event) {
        var obj = NetWorkUtils.getResponseObj("p_109.k", event);
        if (obj) {
            GameUtils.shareListBean = new ShareListBean(obj);
        }
        var showsharelist = new DrawUtils();
        showsharelist.drawShareList();
        this.addChild(showsharelist);
    }

    private onPostIOError(event: egret.IOErrorEvent): void {
        NetWorkUtils.clearNetLoading();
    }
    private closeOther(evt: egret.TouchEvent) {
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
    }
}
