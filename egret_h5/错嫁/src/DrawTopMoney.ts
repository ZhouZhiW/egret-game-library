/**
 *
 * @author 
 *
 */
class DrawTopMoney extends egret.DisplayObjectContainer {
    private netloading: NetLoadingUI;
    private gameimgSheet: egret.SpriteSheet;
    private coverimgSheet: egret.SpriteSheet;
    private huodongSheet: egret.SpriteSheet;
    private toplayer: egret.Sprite;
    private gotoshops: Function;
    private gotoshopc: Function;
    private gotoshopf: Function;
    public layer: egret.Sprite;
    public helplayer: egret.Sprite;
    public miansilayer: egret.Sprite;
    private thisobj: any;
    private frameindex: number;
    private framespr: egret.Sprite;
    public constructor(gotoshopS: Function, gotoshopC: Function, gotoshopf: Function, sceneObj: any) {
        super();
        this.gotoshops = gotoshopS;
        this.gotoshopc = gotoshopC;
        this.thisobj = sceneObj;
        this.gotoshopf = gotoshopf;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initstage, this);
    }
    private initstage(event: egret.Event) {
        this.frameindex = 0;
        this.framespr = new egret.Sprite();
        this.addChild(this.framespr);
        this.framespr.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);

        this.huodongSheet = RES.getRes("huodong_json");
        this.gameimgSheet = RES.getRes("gameimg_json");
        this.coverimgSheet = RES.getRes("coverimg_json");
        this.toplayer = new egret.Sprite();
        this.addChild(this.toplayer);
        this.createScene();
    }
    public onEnterFrame(e: egret.Event) {
        this.frameindex++;
        if (this.frameindex > 1024) {
            this.frameindex = 0;
        }
        if ((this.frameindex % 30) == 0) {
            if (GameUtils.draw_yuanbao_num != GameUtils.playerBean.player_yuanbao
                || GameUtils.draw_jinpai_num != GameUtils.playerBean.player_jinpai
                || GameUtils.draw_tili_num != GameUtils.playerBean.player_tili
                || GameUtils.draw_miansi_num != GameUtils.playerBean.player_miansi) {
                this.resetMoney();
                GameUtils.draw_yuanbao_num = GameUtils.playerBean.player_yuanbao;
                GameUtils.draw_jinpai_num = GameUtils.playerBean.player_jinpai;
                GameUtils.draw_tili_num = GameUtils.playerBean.player_tili;
                GameUtils.draw_miansi_num = GameUtils.playerBean.player_miansi;
            }
        }
    }
    public closeMenoyFrame(): void {
        if (this.framespr) {
            if (this.framespr.hasEventListener(egret.Event.ENTER_FRAME)) {
                this.framespr.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            }
        }
    }
    public resetMoney() {
        if (this.toplayer) {
            this.toplayer.removeChildren();
        }
        this.createScene();
    }
    private createScene() {
        var topkuang: egret.Bitmap = new egret.Bitmap();
        topkuang.texture = this.gameimgSheet.getTexture("moneytop");
        topkuang.x = 0;
        topkuang.y = 0;
        this.toplayer.addChild(topkuang);

        if (GameUtils.noDress) {
            var dressicon: egret.Bitmap = new egret.Bitmap();
            dressicon.texture = this.gameimgSheet.getTexture("gotodress");
            dressicon.x = 0;
            dressicon.y = 5;
            this.toplayer.addChild(dressicon);
            dressicon.touchEnabled = true;
            dressicon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dressBtn, this);
        } else {
            var helpicon: egret.Bitmap = new egret.Bitmap();
            helpicon.texture = this.gameimgSheet.getTexture("helpicon");
            helpicon.x = 18;
            helpicon.y = 0;
            this.toplayer.addChild(helpicon);
            helpicon.touchEnabled = true;
            helpicon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.helpBtn, this);
        }

        if (GameUtils.isShowMiansiIcon || GameUtils.playerBean.player_miansi == 1) {
            var miansi_texturename = GameUtils.playerBean.player_miansi == 0 ? "icon_miansi_0" : "icon_miansi_1";
            var miansiicon: egret.Bitmap = new egret.Bitmap();
            miansiicon.texture = this.gameimgSheet.getTexture(miansi_texturename);
            miansiicon.x = 85;
            miansiicon.y = 3;
            this.toplayer.addChild(miansiicon);
            if (GameUtils.playerBean.player_miansi == 0) {
                miansiicon.touchEnabled = true;
                miansiicon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.miansiBtn, this);
            }
        }

        var fuhuo_x = GameUtils.SCREEN_W - 143 * 2 - 121;
        var fuhuokuang: egret.Bitmap = new egret.Bitmap();
        fuhuokuang.texture = this.gameimgSheet.getTexture("moneykuangshort");
        fuhuokuang.x = fuhuo_x;
        fuhuokuang.y = 5;
        this.toplayer.addChild(fuhuokuang);

        var fuhuoicon: egret.Bitmap = new egret.Bitmap();
        fuhuoicon.texture = this.gameimgSheet.getTexture("moneyicon");
        fuhuoicon.x = fuhuo_x + 3;
        fuhuoicon.y = 6;
        this.toplayer.addChild(fuhuoicon);

        var fuhuonumimg: egret.BitmapText = new egret.BitmapText();
        fuhuonumimg.font = RES.getRes("moneyfont_fnt");
        fuhuonumimg.name = "fuhuonum";
        this.toplayer.addChild(fuhuonumimg);
        fuhuonumimg.text = "" + GameUtils.playerBean.player_jinpai;
        fuhuonumimg.letterSpacing = 0;
        fuhuonumimg.x = fuhuo_x + 93 - fuhuonumimg.textWidth - 5;
        fuhuonumimg.y = 9;

        var fuhuoadd: egret.Bitmap = new egret.Bitmap();
        fuhuoadd.texture = this.gameimgSheet.getTexture("moneyadd");
        fuhuoadd.x = fuhuo_x + 88;
        fuhuoadd.y = 8;
        this.toplayer.addChild(fuhuoadd);
        fuhuoadd.touchEnabled = true;
        fuhuoadd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoshops, this.thisobj);

        var zuanshi_x = GameUtils.SCREEN_W - 143 * 2;
        var zuanshikuang: egret.Bitmap = new egret.Bitmap();
        zuanshikuang.texture = this.gameimgSheet.getTexture("moneykuang");
        zuanshikuang.x = zuanshi_x;
        zuanshikuang.y = 5;
        this.toplayer.addChild(zuanshikuang);

        var zuanshiicon: egret.Bitmap = new egret.Bitmap();
        zuanshiicon.texture = this.gameimgSheet.getTexture("zhuanshiicon");
        zuanshiicon.x = zuanshi_x + 3;
        zuanshiicon.y = 6;
        this.toplayer.addChild(zuanshiicon);

        var zuanshinumimg: egret.BitmapText = new egret.BitmapText();
        zuanshinumimg.font = RES.getRes("moneyfont_fnt");
        this.toplayer.addChild(zuanshinumimg);
        zuanshinumimg.name = "zuanshinumimg";
        zuanshinumimg.text = "" + GameUtils.playerBean.player_yuanbao;
        zuanshinumimg.letterSpacing = 0;
        zuanshinumimg.x = zuanshi_x + 115 - zuanshinumimg.textWidth - 5;
        zuanshinumimg.y = 9;

        var zuanshiadd: egret.Bitmap = new egret.Bitmap();
        zuanshiadd.texture = this.gameimgSheet.getTexture("moneyadd");
        zuanshiadd.x = zuanshi_x + 110;
        zuanshiadd.y = 8;
        this.toplayer.addChild(zuanshiadd);
        zuanshiadd.touchEnabled = true;
        zuanshiadd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoshopc, this.thisobj);


        var tili_x = GameUtils.SCREEN_W - 143;
        var tilikuang: egret.Bitmap = new egret.Bitmap();
        tilikuang.texture = this.gameimgSheet.getTexture("moneykuang");
        tilikuang.x = tili_x;
        tilikuang.y = 5;
        this.toplayer.addChild(tilikuang);

        var tili: egret.Bitmap = new egret.Bitmap();
        tili.texture = this.gameimgSheet.getTexture("tili1");
        tili.x = tili_x + 3;
        tili.y = 8;
        this.toplayer.addChild(tili);

        var tilinum: egret.BitmapText = new egret.BitmapText();
        tilinum.font = RES.getRes("moneyfont_fnt");
        this.toplayer.addChild(tilinum);
        tilinum.name = "tilinum";
        tilinum.text = "" + GameUtils.playerBean.player_tili + "c" + GameUtils.MAX_TILI;
        tilinum.letterSpacing = 0;
        tilinum.x = tili_x + 115 - tilinum.textWidth - 5;
        tilinum.y = 9;
        if (!GameUtils.noFriend) {
            var tiliadd: egret.Bitmap = new egret.Bitmap();
            tiliadd.texture = this.gameimgSheet.getTexture("moneyadd");
            tiliadd.x = tili_x + 110;
            tiliadd.y = 8;
            this.toplayer.addChild(tiliadd);
            tiliadd.touchEnabled = true;
            tiliadd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoshopf, this.thisobj);
        }
    }
    private miansiBtn(evt: egret.TouchEvent) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.drawMianSi();
    }
    private drawMianSi() {
        this.layer = new egret.Sprite;
        this.layer.graphics.beginFill(0x000000, 1);
        this.layer.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H);
        this.layer.graphics.endFill();
        this.layer.width = GameUtils.SCREEN_W;
        this.layer.height = GameUtils.SCREEN_H;
        this.layer.alpha = 0.7;
        this.thisobj.addChild(this.layer);
        this.layer.touchEnabled = true;

        this.miansilayer = new egret.Sprite;
        this.thisobj.addChild(this.miansilayer);

        var miansikuang: egret.Bitmap = new egret.Bitmap();
        miansikuang.texture = this.huodongSheet.getTexture("miansibg");
        miansikuang.x = 5;
        miansikuang.y = (GameUtils.SCREEN_H - 500) / 2 - 55;
        this.miansilayer.addChild(miansikuang);

        var miansiprice = new egret.BitmapText();
        miansiprice.font = RES.getRes("miansinum_fnt");
        this.miansilayer.addChild(miansiprice);
        miansiprice.text = "" + GameUtils.miansi_price + "+";
        miansiprice.letterSpacing = 0;
        miansiprice.x = 5 + 365;
        miansiprice.y = (GameUtils.SCREEN_H - 500) / 2 - 55 + 206;

        var miansiokbtn = new egret.Bitmap();
        miansiokbtn.texture = this.gameimgSheet.getTexture("miansi_buy");
        miansiokbtn.x = (GameUtils.SCREEN_W - 254) / 2;
        miansiokbtn.y = GameUtils.SCREEN_H / 2 + 215 - 55;
        this.miansilayer.addChild(miansiokbtn);
        miansiokbtn.touchEnabled = true;
        miansiokbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyMiansi, this);

        var miansiclosebtn = new egret.Bitmap();
        miansiclosebtn.texture = this.coverimgSheet.getTexture("closemenu");
        miansiclosebtn.x = GameUtils.SCREEN_W - 82;
        miansiclosebtn.y = GameUtils.SCREEN_H / 2 - 270 - 55;
        this.miansilayer.addChild(miansiclosebtn);
        miansiclosebtn.touchEnabled = true;
        miansiclosebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeMiansi, this);
        if (!GameUtils.noYaoQing) {
            var yaoqingbtn = new egret.Bitmap();
            yaoqingbtn.texture = this.gameimgSheet.getTexture("btn_miansi_share");
            yaoqingbtn.x = 70;
            yaoqingbtn.y = GameUtils.SCREEN_H / 2 + 80;
            this.miansilayer.addChild(yaoqingbtn);
            yaoqingbtn.touchEnabled = true;
            yaoqingbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.yaoqing, this);
        }
    }
    private yaoqing(evt: egret.TouchEvent) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }

        NetWorkUtils.sendSimpleNetPostRequest(109, this.getsharelistComplete, this.onPostIOError, this, this);
    }
    private getsharelistComplete(event: egret.Event) {
        var obj = NetWorkUtils.getResponseObj("p_109.k", event);
        //                GameUtils.debugLog(obj);
        if (obj) {
            GameUtils.shareListBean = new ShareListBean(obj);
        }
        var showsharelist = new DrawUtils();
        showsharelist.drawShareList();
        this.thisobj.addChild(showsharelist);
    }
    private buyMiansi(evt: egret.TouchEvent) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        //        onPay({ "appKey": GameUtils.APPKEY_1758,"itemCode": GameUtils.MIANSI_ITEMCODE});
        var sendpayobj = { cmd: 113, player_token: GameUtils.playerToken, item_id: 99, hlmy_gw: GameUtils.hlmy_gw, return_json: 1 };
        NetWorkUtils.sendNetPostRequest(sendpayobj, this.getPayGoodsComplete, this.onPostIOError, this, this);
    }
    private onPostIOError(event: egret.IOErrorEvent): void {
        NetWorkUtils.clearNetLoading();
    }
    private getPayGoodsComplete(event: egret.Event) {
        var obj = NetWorkUtils.getResponseObj("p_113.k", event);
        if (obj.result == 1) {
            //支付
            if (!GameUtils.dateEventSprite.hasEventListener(EventData.DATA_ONPAY_SUCCEED)) {
                GameUtils.dateEventSprite.addEventListener(EventData.DATA_ONPAY_SUCCEED, this.onPaySucceed, this);
            }
            HlmyUtils.HlmyOnpay({
                "paySafecode": obj.pay_safe_code, callback: function (data) {
                    if (data.status == 1) {
                        //成功
                        var callBackEvent = new JsCallBackEvent.CallBack();
                        callBackEvent.onPaySucceedCallBack();
                    }
                }
            });
        } else {
            var tishi = new DrawUtils();
            tishi.createTishi("coverimg_json", "tishikuang1", obj.info);
            this.thisobj.addChild(tishi);
        }
    }
    private onPaySucceed() {
        NetWorkUtils.sendSimpleNetPostRequest(100, this.getPlayerComplete, this.onPostIOError, this, this);
    }
    private getPlayerComplete(event: egret.Event) {
        var obj = NetWorkUtils.getResponseObj("p_100.k", event);
        if (obj.player) {
            GameUtils.playerBean = new PlayerBean(obj);
        }
    }
    private closeMiansi(evt: egret.TouchEvent) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.miansilayer) {
            this.miansilayer.removeChildren();
            if (this.miansilayer.parent) {
                this.miansilayer.parent.removeChild(this.miansilayer);
            }
        }
        if (this.layer.parent) {
            this.layer.parent.removeChild(this.layer);
        }
    }
    private dressBtn(evt: egret.TouchEvent) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        window.location.href = GameUtils.dressUrl + "&state=t2";
    }
    private helpBtn(evt: egret.TouchEvent) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.drawHelp();
    }
    private drawHelp() {
        this.layer = new egret.Sprite;
        this.layer.graphics.beginFill(0x000000, 1);
        this.layer.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H);
        this.layer.graphics.endFill();
        this.layer.width = GameUtils.SCREEN_W;
        this.layer.height = GameUtils.SCREEN_H;
        this.layer.alpha = 0.7;
        this.thisobj.addChild(this.layer);
        this.layer.touchEnabled = true;

        this.helplayer = new egret.Sprite;
        this.thisobj.addChild(this.helplayer);

        var helpbg: egret.Bitmap = new egret.Bitmap();
        helpbg.texture = this.gameimgSheet.getTexture("helpbg");
        helpbg.x = 10;
        helpbg.y = 40;
        this.helplayer.addChild(helpbg);
        var bgrectsound: egret.Rectangle = new egret.Rectangle(34, 34, 34, 34);
        helpbg.scale9Grid = bgrectsound;
        helpbg.width = GameUtils.SCREEN_W - 20;
        helpbg.height = GameUtils.SCREEN_H - 60;

        var helptop: egret.Bitmap = new egret.Bitmap();
        helptop.texture = this.gameimgSheet.getTexture("helptop");
        helptop.x = (GameUtils.SCREEN_W - 294) / 2;
        helptop.y = 8;
        this.helplayer.addChild(helptop);

        var tx: egret.TextField = new egret.TextField;
        tx.width = GameUtils.SCREEN_W - 60;
        tx.x = 0;
        tx.y = 0;
        tx.size = 24;
        tx.lineSpacing = 8;
        var titleFontsSize = GameUtils.TEXT_SIZE_MIDDLE;
        var titleColor = 0xADFF2F;
        var pointColor = 0xADFF2F;
        var mainBodySize = 24;
        var mainBodyColor = 0xF0F8FF;
        var warnColor = 0xDC143C;
        var flow_1: Array<egret.ITextElement> = <Array<egret.ITextElement>>[
            { text: "客服QQ：2647365846、3386559580。", style: { "textColor": 0xff0000, "size": mainBodySize } },
            { text: "\r\n" },
            { text: "属性介绍", style: { "textColor": titleColor, "size": titleFontsSize } }
            , { text: "\r\n\t●", style: { "textColor": pointColor } }
            , { text: "本游戏有武力、智慧、口才和魅力、好感度五种属性；", style: { "textColor": mainBodyColor, "size": mainBodySize } }
            , { text: "\r\n\t●", style: { "textColor": pointColor } }
            , { text: "观看剧情过程中会面临各种选项，不同的选项会增加不同数额的武力、智慧、口才属性值；", style: { "textColor": mainBodyColor, "size": mainBodySize } }
            , { text: "\r\n\t●", style: { "textColor": pointColor } }
            , { text: "武力、智慧、口才的增加会带动魅力值的增加，且当前的武力、智慧、口才数值越高新增加的魅力值也会越多；", style: { "textColor": mainBodyColor, "size": mainBodySize } }
            , { text: "\r\n\t●", style: { "textColor": pointColor } }
            , { text: "剧情中的一些选项还会增加对应角色对您的好感度，选项不同增加的数值不同；", style: { "textColor": mainBodyColor, "size": mainBodySize } }
            , { text: "\r\n\t●", style: { "textColor": pointColor } }
            , { text: "魅力值会额外提高所获得的好感度，魅力值越高额外获得的好感度越高；", style: { "textColor": mainBodyColor, "size": mainBodySize } }
            , { text: "\r\n" }
            , { text: "\r\n" }

            , { text: "体力", style: { "textColor": titleColor, "size": titleFontsSize } }
            , { text: "\r\n\t●", style: { "textColor": pointColor } }
            , { text: "右上角的红心即体力；", style: { "textColor": mainBodyColor, "size": mainBodySize } }
            , { text: "\r\n\t●", style: { "textColor": pointColor } }
            , { text: "体力每小时恢复一点，上限为12点；", style: { "textColor": mainBodyColor, "size": mainBodySize } }
            , { text: "\r\n\t●", style: { "textColor": pointColor } }
            , { text: "体力可以在商城中购买对应的商品、提高各种属性；", style: { "textColor": mainBodyColor, "size": mainBodySize } }

        ];
        var flow_2: Array<egret.ITextElement> = <Array<egret.ITextElement>>[
            { text: "\r\n" }
            , { text: "\r\n" }
            , { text: "分享", style: { "textColor": titleColor, "size": titleFontsSize } }
            , { text: "\r\n\t●", style: { "textColor": pointColor } }
            , { text: "把我们的游戏分享给您的朋友将会获得奖励；", style: { "textColor": mainBodyColor, "size": mainBodySize } }

        ];
        var flow_3: Array<egret.ITextElement> = <Array<egret.ITextElement>>[
            { text: "\r\n\t●", style: { "textColor": pointColor } }
            , { text: "若您的好友因为您的分享加入到我们的游戏，您会获得更丰厚的奖励；", style: { "textColor": mainBodyColor, "size": mainBodySize } }
        ];
        var flow_4: Array<egret.ITextElement> = <Array<egret.ITextElement>>[
            { text: "\r\n" }
            , { text: "\r\n" }
            , { text: "好友互动", style: { "textColor": titleColor, "size": titleFontsSize } }
            , { text: "\r\n\t●", style: { "textColor": pointColor } }
            , { text: "好友的详情中有互动的功能，与好友的互动会增加一定数量的体力；", style: { "textColor": mainBodyColor, "size": mainBodySize } }
            , { text: "\r\n\t●", style: { "textColor": pointColor } }
            , { text: "每天互动获得奖励有一点的次数限制，超出限制后将不会获得奖励；", style: { "textColor": mainBodyColor, "size": mainBodySize } }

        ];
        var flow_5: Array<egret.ITextElement> = <Array<egret.ITextElement>>[
            { text: "\r\n" }
            , { text: "\r\n" }
            , { text: "活动", style: { "textColor": titleColor, "size": titleFontsSize } }
            , { text: "\r\n\t●", style: { "textColor": pointColor } }
            , { text: "菜单界面的活动选项中有各种活动；", style: { "textColor": mainBodyColor, "size": mainBodySize } }
            , { text: "\r\n\t●", style: { "textColor": pointColor } }
            , { text: "关注对应的游戏平台的公众微信可在游戏中领取关注奖励；", style: { "textColor": mainBodyColor, "size": mainBodySize } }
            , { text: "\r\n\t●", style: { "textColor": pointColor } }
            , { text: "会有不定期的活动发放兑换码，可在兑换选项兑换奖励；", style: { "textColor": mainBodyColor, "size": mainBodySize } }

            , { text: "\r\n" }
            , { text: "\r\n" }
            , { text: "重新开始游戏", style: { "textColor": warnColor, "size": titleFontsSize } }
            , { text: "\r\n\t●", style: { "textColor": warnColor } }
            , { text: "属性==》设置==》可以选择重新开始游戏，需消耗一颗还魂丹，也可使用免死金牌；", style: { "textColor": mainBodyColor, "size": mainBodySize } }
            , { text: "\r\n\t●", style: { "textColor": warnColor } }
            , { text: "选择重新开始游戏后之前的游戏属性将被清零，进度将回到剧情的开始；", style: { "textColor": mainBodyColor, "size": mainBodySize } }
            , { text: "\r\n\t●", style: { "textColor": warnColor } }
            , { text: "选择重新开始游戏后之前的游戏属性和进度将不可恢复，请谨慎操作；", style: { "textColor": mainBodyColor, "size": mainBodySize } }

        ];
        var flowindex: number = 0;
        var allflowarr: Array<egret.ITextElement> = new Array();
        for (var i = 0; i < flow_1.length; i++) {
            allflowarr[i] = flow_1[i];
        }
        flowindex += flow_1.length;
        if (!GameUtils.noFriend) {
            if (!GameUtils.noShare) {
                for (var i = 0; i < flow_2.length; i++) {
                    allflowarr[flowindex + i] = flow_2[i];
                }
                flowindex += flow_2.length;
            }
            if (!GameUtils.noYaoQing) {
                for (var i = 0; i < flow_3.length; i++) {
                    allflowarr[flowindex + i] = flow_3[i];
                }
                flowindex += flow_3.length;
            }
            for (var i = 0; i < flow_4.length; i++) {
                allflowarr[flowindex + i] = flow_4[i];
            }
            flowindex += flow_4.length;
        } else {
            if (!GameUtils.noShare) {
                for (var i = 0; i < flow_2.length; i++) {
                    allflowarr[flowindex + i] = flow_2[i];
                }
                flowindex += flow_2.length;
            }
        }
        for (var i = 0; i < flow_5.length; i++) {
            allflowarr[flowindex + i] = flow_5[i];
        }
        flowindex += flow_5.length;
        tx.textFlow = allflowarr;

        this.helplayer.addChild(tx);

        var myscrollView: egret.ScrollView = new egret.ScrollView();
        myscrollView.setContent(tx);
        myscrollView.x = 30;
        myscrollView.y = 85;
        myscrollView.width = GameUtils.SCREEN_W - 50;
        myscrollView.height = GameUtils.SCREEN_H - 125;

        myscrollView.verticalScrollPolicy = "on";
        myscrollView.horizontalScrollPolicy = "off";
        this.helplayer.addChild(myscrollView);

        var closehelp: egret.Bitmap = new egret.Bitmap();
        closehelp.texture = this.coverimgSheet.getTexture("closemenu");
        closehelp.x = GameUtils.SCREEN_W - 60;
        closehelp.y = 20;
        this.helplayer.addChild(closehelp);
        closehelp.touchEnabled = true;
        closehelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHelp, this);
    }
    private closeHelp(evt: egret.TouchEvent) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.helplayer) {
            this.helplayer.removeChildren();
            if (this.helplayer.parent) {
                this.helplayer.parent.removeChild(this.helplayer);
            }
        }
        if (this.layer.parent) {
            this.layer.parent.removeChild(this.layer);
        }
    }
}
