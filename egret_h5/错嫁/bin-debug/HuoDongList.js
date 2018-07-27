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
var HuoDongList = (function (_super) {
    __extends(HuoDongList, _super);
    function HuoDongList(thisObj, gamescene) {
        var _this = _super.call(this) || this;
        _this.gameimgSheet = RES.getRes("gameimg_json");
        _this.coverimgSheet = RES.getRes("coverimg_json");
        _this.huodongimgSheet = RES.getRes("huodong_json");
        _this.huodongscene = thisObj;
        _this.gamescene = gamescene;
        _this.init();
        return _this;
    }
    HuoDongList.prototype.init = function () {
        var qiandaokuang = new egret.Bitmap();
        qiandaokuang.texture = this.huodongimgSheet.getTexture("huodongkuang");
        qiandaokuang.x = (GameUtils.SCREEN_W - qiandaokuang.texture.textureWidth) / 2;
        qiandaokuang.y = 10;
        this.addChild(qiandaokuang);
        var showindex = 0;
        var qiandaoicon = new egret.Bitmap();
        qiandaoicon.texture = this.huodongimgSheet.getTexture("huodongicon2");
        qiandaoicon.x = (GameUtils.SCREEN_W - qiandaokuang.texture.textureWidth) / 2 + 3;
        qiandaoicon.y = 10;
        this.addChild(qiandaoicon);
        if (GameUtils.playerBean.player_sign_in == 0) {
            var qiandaobtn = new egret.Bitmap();
            qiandaobtn.texture = this.gameimgSheet.getTexture("qiandaobtn1");
            qiandaobtn.name = "qiandaoopen";
            qiandaobtn.x = GameUtils.SCREEN_W - 176;
            qiandaobtn.y = 38;
            this.addChild(qiandaobtn);
            qiandaobtn.touchEnabled = true;
            qiandaobtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.qianDao, this);
        }
        else {
            var qiandaobtn = new egret.Bitmap();
            qiandaobtn.texture = this.gameimgSheet.getTexture("qiandaobtn2");
            qiandaobtn.x = GameUtils.SCREEN_W - 176;
            qiandaobtn.y = 38;
            this.addChild(qiandaobtn);
        }
        showindex++;
        if (!GameUtils.noYaoQing) {
            var fenxiangkuang = new egret.Bitmap();
            fenxiangkuang.texture = this.huodongimgSheet.getTexture("huodongkuang");
            fenxiangkuang.x = (GameUtils.SCREEN_W - fenxiangkuang.texture.textureWidth) / 2;
            fenxiangkuang.y = 10 + 116 * showindex;
            this.addChild(fenxiangkuang);
            var fenxiangicon = new egret.Bitmap();
            fenxiangicon.texture = this.huodongimgSheet.getTexture("huodongicon4");
            fenxiangicon.x = (GameUtils.SCREEN_W - fenxiangkuang.texture.textureWidth) / 2 + 3;
            fenxiangicon.y = 10 + 116 * showindex;
            this.addChild(fenxiangicon);
            var fenxiangbtn = new egret.Bitmap();
            fenxiangbtn.texture = this.gameimgSheet.getTexture("fenxiangbtn");
            fenxiangbtn.x = GameUtils.SCREEN_W - 176;
            fenxiangbtn.y = 38 + 116 * showindex;
            this.addChild(fenxiangbtn);
            fenxiangbtn.touchEnabled = true;
            fenxiangbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fenxiang, this);
            showindex++;
        }
        if (!GameUtils.noFriend) {
            var friendkuang = new egret.Bitmap();
            friendkuang.texture = this.huodongimgSheet.getTexture("huodongkuang");
            friendkuang.x = (GameUtils.SCREEN_W - friendkuang.texture.textureWidth) / 2;
            friendkuang.y = 10 + 116 * showindex;
            this.addChild(friendkuang);
            var friendicon = new egret.Bitmap();
            friendicon.texture = this.huodongimgSheet.getTexture("huodongicon5");
            friendicon.x = (GameUtils.SCREEN_W - friendkuang.texture.textureWidth) / 2 + 3;
            friendicon.y = 10 + 116 * showindex;
            this.addChild(friendicon);
            var friendbtn = new egret.Bitmap();
            friendbtn.texture = this.gameimgSheet.getTexture("btnmohaoyou");
            friendbtn.x = GameUtils.SCREEN_W - 176;
            friendbtn.y = 38 + 116 * showindex;
            this.addChild(friendbtn);
            friendbtn.touchEnabled = true;
            friendbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotofriend, this);
            showindex++;
        }
        var duihuankuang = new egret.Bitmap();
        duihuankuang.texture = this.huodongimgSheet.getTexture("huodongkuang");
        duihuankuang.x = (GameUtils.SCREEN_W - duihuankuang.texture.textureWidth) / 2;
        duihuankuang.y = 10 + 116 * showindex;
        this.addChild(duihuankuang);
        var duihuanicon = new egret.Bitmap();
        duihuanicon.texture = this.huodongimgSheet.getTexture(GameUtils.noqqQun ? "huodongicon6" : "huodongicon1");
        duihuanicon.x = (GameUtils.SCREEN_W - duihuankuang.texture.textureWidth) / 2 + 3;
        duihuanicon.y = 10 + 116 * showindex;
        this.addChild(duihuanicon);
        if (!GameUtils.noqqQun) {
            var qqGroupNum = new egret.TextField();
            qqGroupNum.x = 100 + (GameUtils.SCREEN_W - 510) / 2;
            qqGroupNum.y = 90 + 116 * showindex;
            qqGroupNum.textColor = 0xffffff;
            qqGroupNum.size = GameUtils.TEXT_SIZE_SMALL;
            qqGroupNum.text = GameUtils.qqGroupNum;
            this.addChild(qqGroupNum);
            qqGroupNum.strokeColor = 0x6d3401;
            qqGroupNum.stroke = 3;
        }
        var duihuanbtn = new egret.Bitmap();
        duihuanbtn.texture = this.gameimgSheet.getTexture("shurubtn");
        duihuanbtn.x = GameUtils.SCREEN_W - 176;
        duihuanbtn.y = 38 + 116 * showindex;
        this.addChild(duihuanbtn);
        duihuanbtn.touchEnabled = true;
        duihuanbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.duiHuan, this);
        showindex++;
        if (!GameUtils.noGuanZhu) {
            this.guanzhu_index = showindex;
            var guanzhukuang = new egret.Bitmap();
            guanzhukuang.texture = this.huodongimgSheet.getTexture("huodongkuang");
            guanzhukuang.x = (GameUtils.SCREEN_W - guanzhukuang.texture.textureWidth) / 2;
            guanzhukuang.y = 10 + 116 * showindex;
            this.addChild(guanzhukuang);
            var guanzhuicon = new egret.Bitmap();
            guanzhuicon.texture = this.huodongimgSheet.getTexture("huodongicon3");
            guanzhuicon.x = (GameUtils.SCREEN_W - guanzhukuang.texture.textureWidth) / 2 + 3;
            guanzhuicon.y = 10 + 116 * showindex;
            this.addChild(guanzhuicon);
            if (GameUtils.playerBean.player_follow_reward == 0) {
                var guanzhubtn = new egret.Bitmap();
                guanzhubtn.texture = this.gameimgSheet.getTexture("lingqubtn");
                guanzhubtn.name = "guanzhuopen";
                guanzhubtn.x = GameUtils.SCREEN_W - 176;
                guanzhubtn.y = 38 + 116 * showindex;
                this.addChild(guanzhubtn);
                guanzhubtn.touchEnabled = true;
                guanzhubtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.guanZhu, this);
            }
            else {
                var guanzhubtn = new egret.Bitmap();
                guanzhubtn.texture = this.gameimgSheet.getTexture("lingqubtn1");
                guanzhubtn.x = GameUtils.SCREEN_W - 176;
                guanzhubtn.y = 38 + 116 * showindex;
                this.addChild(guanzhubtn);
            }
        }
    };
    HuoDongList.prototype.gotofriend = function (evt) {
        var dianeff = new DianEff(this.huodongscene, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.gamescene.gotoFriend();
    };
    HuoDongList.prototype.fenxiang = function (evt) {
        var dianeff = new DianEff(this.huodongscene, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        NetWorkUtils.sendSimpleNetPostRequest(109, this.getsharelistComplete, this.onPostIOError, this.huodongscene, this);
    };
    HuoDongList.prototype.getsharelistComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_109.k", event);
        if (obj) {
            GameUtils.shareListBean = new ShareListBean(obj);
        }
        var showsharelist = new DrawUtils();
        showsharelist.drawShareList();
        this.huodongscene.addChild(showsharelist);
    };
    HuoDongList.prototype.qianDao = function (evt) {
        var dianeff = new DianEff(this.huodongscene, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        var btn = evt.currentTarget;
        if (btn) {
            NetWorkUtils.sendSimpleNetPostRequest(204, this.getQianDaoComplete, this.onPostIOError, this.huodongscene, this);
        }
    };
    HuoDongList.prototype.guanZhu = function (evt) {
        var dianeff = new DianEff(this.huodongscene, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        var btn = evt.currentTarget;
        if (btn) {
            if (!GameUtils.dateEventSprite.hasEventListener(EventData.DATA_LISTFOLLOW)) {
                GameUtils.dateEventSprite.addEventListener(EventData.DATA_LISTFOLLOW, this.callBackHuoDongFollow, this);
            }
            GameUtils.checkFollowSceneType = 1;
            HlmyUtils.HlmyCheckFollow();
        }
    };
    HuoDongList.prototype.callBackHuoDongFollow = function (event) {
        if (GameUtils.checkFollow == 1) {
            NetWorkUtils.sendSimpleNetPostRequest(803, this.getGuanZhuComplete, this.onPostIOError, this.huodongscene, this);
        }
        else {
            HlmyUtils.HlmyFollow();
        }
        if (GameUtils.dateEventSprite.hasEventListener(EventData.DATA_LISTFOLLOW)) {
            GameUtils.dateEventSprite.removeEventListener(EventData.DATA_LISTFOLLOW, this.callBackHuoDongFollow, this);
        }
    };
    HuoDongList.prototype.duiHuan = function (evt) {
        var dianeff = new DianEff(this.huodongscene, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        var btn = evt.currentTarget;
        if (btn) {
            this.drawDuiHuanKuang();
        }
    };
    HuoDongList.prototype.drawDuiHuanKuang = function () {
        this.duihuanlayer = new egret.Sprite();
        this.huodongscene.addChild(this.duihuanlayer);
        var alphaspr = new egret.Sprite;
        alphaspr.graphics.beginFill(0x000000, 1);
        alphaspr.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H);
        alphaspr.graphics.endFill();
        alphaspr.width = GameUtils.SCREEN_W;
        alphaspr.height = GameUtils.SCREEN_H;
        alphaspr.alpha = 0.0;
        this.duihuanlayer.addChild(alphaspr);
        alphaspr.touchEnabled = true;
        var duihuanbg = new egret.Bitmap();
        duihuanbg.texture = this.coverimgSheet.getTexture("msgbg");
        duihuanbg.x = (GameUtils.SCREEN_W - 460) / 2;
        duihuanbg.y = 180;
        this.duihuanlayer.addChild(duihuanbg);
        var bgrectsound = new egret.Rectangle(50, 50, 50, 50);
        duihuanbg.scale9Grid = bgrectsound;
        duihuanbg.width = 460;
        duihuanbg.height = 250;
        var duihuankuang1 = new egret.Bitmap();
        duihuankuang1.texture = this.coverimgSheet.getTexture("msgkuang1");
        duihuankuang1.x = (GameUtils.SCREEN_W - duihuankuang1.texture.textureWidth) / 2;
        duihuankuang1.y = 190;
        this.duihuanlayer.addChild(duihuankuang1);
        var name = new egret.TextField();
        name.x = 0;
        name.y = 180;
        name.height = 70;
        name.width = GameUtils.SCREEN_W;
        name.textColor = 0xffdf48;
        name.size = GameUtils.TEXT_SIZE_MIDDLE;
        name.text = "请输入兑换码";
        name.verticalAlign = egret.VerticalAlign.MIDDLE;
        name.textAlign = egret.HorizontalAlign.CENTER;
        this.duihuanlayer.addChild(name);
        name.strokeColor = 0xae6363;
        name.stroke = 2;
        var firstFocus = false;
        this.text_duihuan = new egret.TextField();
        this.text_duihuan.type = egret.TextFieldType.INPUT;
        this.text_duihuan.inputType = egret.TextFieldInputType.TEXT;
        this.text_duihuan.name = "duihuanma";
        this.text_duihuan.text = "输入兑换码";
        this.text_duihuan.width = 200;
        this.text_duihuan.height = 30;
        this.text_duihuan.textColor = 0xffffff;
        this.text_duihuan.background = true;
        this.text_duihuan.backgroundColor = 0x83807c;
        this.text_duihuan.size = GameUtils.TEXT_SIZE_SMALL;
        this.text_duihuan.x = (GameUtils.SCREEN_W - 200) / 2;
        this.text_duihuan.y = 280;
        this.text_duihuan.maxChars = 16;
        this.text_duihuan.multiline = true;
        this.duihuanlayer.addChild(this.text_duihuan);
        this.text_duihuan.addEventListener(egret.FocusEvent.FOCUS_IN, function () {
            if (!firstFocus) {
                this.text_duihuan.text = "";
                firstFocus = true;
            }
        }, this);
        // this.text_duihuan.addEventListener(egret.FocusEvent.FOCUS_IN, function (evt: egret.TouchEvent) {
        // }, this)
        // this.text_duihuan.addEventListener(egret.FocusEvent.FOCUS_OUT, function (evt: egret.TouchEvent) {
        //     this.test_text.text = this.text_duihuan.text;
        // }, this);
        // this.text_duihuan.addEventListener(egret.Event.CHANGE, function (evt: egret.TouchEvent) {
        //     this.test_text.text = this.text_duihuan.text;
        // }, this);
        // this.test_text = new egret.TextField();
        // this.test_text.text = "";
        // this.test_text.width = 200;
        // this.test_text.height = 30;
        // this.test_text.textColor = 0xffffff;
        // this.test_text.size = GameUtils.TEXT_SIZE_SMALL;
        // this.test_text.x = (GameUtils.SCREEN_W - 200) / 2;
        // this.test_text.y = 280;
        // this.test_text.background = true;
        // this.test_text.backgroundColor = 0x83807c;
        // this.test_text.maxChars = 16;
        // this.duihuanlayer.addChild(this.test_text);
        var sendduihuan = new egret.Bitmap();
        sendduihuan.texture = this.coverimgSheet.getTexture("ok1");
        sendduihuan.x = (GameUtils.SCREEN_W - 124) / 2;
        sendduihuan.y = 350;
        this.duihuanlayer.addChild(sendduihuan);
        sendduihuan.touchEnabled = true;
        sendduihuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendDuiHuan, this);
        var closeduihuan = new egret.Bitmap();
        closeduihuan.texture = this.coverimgSheet.getTexture("closemenu");
        closeduihuan.x = (GameUtils.SCREEN_W - 460) / 2 + 460 - closeduihuan.texture.textureWidth - 10;
        closeduihuan.y = 190;
        this.duihuanlayer.addChild(closeduihuan);
        closeduihuan.touchEnabled = true;
        closeduihuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeDuiHuan, this);
    };
    HuoDongList.prototype.sendDuiHuan = function (evt) {
        var dianeff = new DianEff(this.huodongscene, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        var btn = evt.currentTarget;
        if (btn) {
            if (this.text_duihuan) {
                if (this.text_duihuan.text.length > 0) {
                    var sendduihuanobj = { cmd: 205, player_token: GameUtils.playerToken, cd_key: this.text_duihuan.text, return_json: 1 };
                    NetWorkUtils.sendNetPostRequest(sendduihuanobj, this.getDuiHuanComplete, this.onPostIOError, this.huodongscene, this);
                }
                else {
                    var tishi = new DrawUtils();
                    tishi.createTishi("coverimg_json", "tishikuang1", "请输入兑换码");
                    this.huodongscene.addChild(tishi);
                }
            }
        }
    };
    HuoDongList.prototype.getDuiHuanComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_205.k", event);
        // console.log(obj);
        if (this.duihuanlayer) {
            this.duihuanlayer.removeChildren();
        }
        if (obj.result == 1) {
            if (obj.attributes.length == 0) {
                if (obj.info) {
                    var tishi = new DrawUtils();
                    tishi.createTishi("coverimg_json", "tishikuang1", obj.info);
                    this.huodongscene.addChild(tishi);
                }
            }
            else {
                this.showGiftToast(obj);
            }
            NetWorkUtils.sendSimpleNetPostRequest(100, this.getPlayerComplete, this.onPostIOError, this.huodongscene, this);
        }
    };
    HuoDongList.prototype.showGiftToast = function (obj) {
        this.toastBgLayer = new egret.Sprite();
        this.toastBgLayer.graphics.beginFill(0x000000, 1);
        this.toastBgLayer.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H - 82);
        this.toastBgLayer.graphics.endFill();
        this.toastBgLayer.width = GameUtils.SCREEN_W;
        this.toastBgLayer.height = GameUtils.SCREEN_H - 82;
        this.toastBgLayer.alpha = 0.0;
        this.huodongscene.addChild(this.toastBgLayer);
        this.toastBgLayer.touchEnabled = true;
        var kuang_w = 520;
        var kuang_h = 260;
        this.toastLayer = new egret.Sprite();
        this.toastLayer.alpha = 0;
        this.toastLayer.scaleX = 0.02;
        this.toastLayer.scaleY = 0.02;
        this.toastLayer.x = (GameUtils.SCREEN_W) / 2;
        this.toastLayer.y = (GameUtils.SCREEN_H) / 2;
        this.toastLayer.width = kuang_w;
        this.toastLayer.height = kuang_h;
        this.toastLayer.anchorOffsetX = kuang_w / 2;
        this.toastLayer.anchorOffsetY = kuang_h / 2;
        this.huodongscene.addChild(this.toastLayer);
        var tw = egret.Tween.get(this.toastLayer);
        tw.to({ alpha: 1, scaleX: 1.3, scaleY: 1.3 }, 300).
            to({ alpha: 1, scaleX: 1, scaleY: 1 }, 100);
        var kuang = new egret.Bitmap();
        kuang.texture = this.coverimgSheet.getTexture("tishikuang1");
        kuang.x = 0;
        kuang.y = 0;
        this.toastLayer.addChild(kuang);
        var kuangscaleGrid = new egret.Rectangle(34, 34, 34, 34);
        kuang.scale9Grid = kuangscaleGrid;
        kuang.width = kuang_w;
        kuang.height = kuang_h + 20;
        var title = new egret.Bitmap();
        title.texture = this.gameimgSheet.getTexture("duihuan_title");
        title.x = (kuang_w - 408) / 2;
        title.y = -10;
        this.toastLayer.addChild(title);
        var iconlength = obj.attributes.length;
        var icon_W = (kuang_w - 88 * iconlength) / (iconlength + 1);
        var icon_x = icon_W;
        for (var i = 0; i < iconlength; i++) {
            var icon = new egret.Bitmap();
            icon.texture = this.gameimgSheet.getTexture(this.getGiftIconName(obj.attributes[i].type));
            icon.x = icon_x + (88 + icon_W) * i;
            icon.y = (kuang_h - 88) / 2;
            this.toastLayer.addChild(icon);
            var giftnum = new egret.TextField();
            giftnum.x = icon_x + (88 + icon_W) * i;
            giftnum.y = (kuang_h - 88) / 2 + 88 + 5;
            giftnum.textColor = 0xff0000;
            giftnum.size = 16;
            giftnum.text = "+" + obj.attributes[i].value;
            this.toastLayer.addChild(giftnum);
            // giftnum.strokeColor = 0x000000;
            // giftnum.stroke = 2;
            giftnum.width = 88;
            giftnum.textAlign = egret.HorizontalAlign.CENTER;
        }
        var okbtn = new egret.Bitmap();
        okbtn.texture = this.coverimgSheet.getTexture("ok1");
        okbtn.x = (kuang_w - 126) / 2;
        okbtn.y = kuang_h - 10;
        this.toastLayer.addChild(okbtn);
        okbtn.touchEnabled = true;
        okbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clearToastLayer, this);
    };
    HuoDongList.prototype.getGiftIconName = function (icontype) {
        var iconname = "qqbggift";
        if (icontype == 0) {
            iconname = "duihuan_icon_1";
        }
        else if (icontype == 4) {
            iconname = "duihuan_icon_3";
        }
        else if (icontype == 5) {
            iconname = "duihuan_icon_2";
        }
        else if (icontype == 10) {
            iconname = "qqbggift";
        }
        else if (icontype == 11) {
            iconname = "duihuan_icon_0";
        }
        return iconname;
    };
    HuoDongList.prototype.clearToastLayer = function () {
        var tw = egret.Tween.get(this.toastLayer);
        tw.to({ scaleX: 1.3, scaleY: 1.3 }, 100).
            to({ alpha: 0.1, scaleX: 0.1, scaleY: 0.1 }, 300).call(function () {
            if (this.toastLayer) {
                this.toastLayer.removeChildren();
                if (this.toastLayer.parent) {
                    this.toastLayer.parent.removeChild(this.toastLayer);
                }
            }
            if (this.toastBgLayer) {
                this.toastBgLayer.removeChildren();
                if (this.toastBgLayer.parent) {
                    this.toastBgLayer.parent.removeChild(this.toastBgLayer);
                }
            }
        }, this);
    };
    HuoDongList.prototype.closeDuiHuan = function (evt) {
        var dianeff = new DianEff(this.huodongscene, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.duihuanlayer) {
            this.duihuanlayer.removeChildren();
        }
    };
    HuoDongList.prototype.getGuanZhuComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_803.k", event);
        if (obj.result == 1) {
            var guanzhubtn = this.getChildByName("guanzhuopen");
            if (guanzhubtn) {
                if (guanzhubtn.parent) {
                    guanzhubtn.parent.removeChild(guanzhubtn);
                    var guanzhuclosebtn = new egret.Bitmap();
                    guanzhuclosebtn.texture = this.gameimgSheet.getTexture("lingqubtn1");
                    guanzhuclosebtn.x = GameUtils.SCREEN_W - 176;
                    guanzhuclosebtn.y = 38 + 116 * this.guanzhu_index;
                    this.addChild(guanzhuclosebtn);
                }
            }
            var tishi = new DrawUtils();
            tishi.createTishi("coverimg_json", "tishikuang1", obj.info);
            this.huodongscene.addChild(tishi);
            NetWorkUtils.sendSimpleNetPostRequest(100, this.getPlayerComplete, this.onPostIOError, this.huodongscene, this);
        }
        else {
            HlmyUtils.HlmyFollow();
        }
    };
    HuoDongList.prototype.getQianDaoComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_204.k", event);
        if (obj.info) {
            var qiandaobtn = this.getChildByName("qiandaoopen");
            if (qiandaobtn) {
                if (qiandaobtn.parent) {
                    qiandaobtn.parent.removeChild(qiandaobtn);
                    var qiandaoclosebtn = new egret.Bitmap();
                    qiandaoclosebtn.texture = this.gameimgSheet.getTexture("qiandaobtn2");
                    qiandaoclosebtn.x = GameUtils.SCREEN_W - 126 - 50;
                    qiandaoclosebtn.y = 10 + 28;
                    this.addChild(qiandaoclosebtn);
                }
            }
            var tishi = new DrawUtils();
            tishi.createTishi("coverimg_json", "tishikuang1", obj.info);
            this.huodongscene.addChild(tishi);
            NetWorkUtils.sendSimpleNetPostRequest(100, this.getPlayerComplete, this.onPostIOError, this.huodongscene, this);
        }
    };
    HuoDongList.prototype.getPlayerComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_100.k", event);
        if (obj.player) {
            GameUtils.playerBean = new PlayerBean(obj);
        }
    };
    HuoDongList.prototype.onPostIOError = function (event) {
        NetWorkUtils.clearNetLoading();
    };
    return HuoDongList;
}(egret.DisplayObjectContainer));
__reflect(HuoDongList.prototype, "HuoDongList");
//# sourceMappingURL=HuoDongList.js.map