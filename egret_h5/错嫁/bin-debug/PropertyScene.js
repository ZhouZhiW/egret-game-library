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
var PropertyScene = (function (_super) {
    __extends(PropertyScene, _super);
    function PropertyScene(gamescene) {
        var _this = _super.call(this) || this;
        _this.npc = new Array("npc0", "npc1");
        _this.npc_w = new Array(0, 230);
        _this.proname = "";
        _this.npcnum = new Array();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initstage, _this);
        _this.gameScene = gamescene;
        return _this;
    }
    PropertyScene.prototype.initstage = function (event) {
        this.gameimgSheet = RES.getRes("gameimg_json");
        this.coverimgSheet = RES.getRes("coverimg_json");
        this.shopimgSheet = RES.getRes("shopimg_json");
        this.createScene();
    };
    PropertyScene.prototype.createScene = function () {
        this.playerlayer = new egret.Sprite();
        this.addChild(this.playerlayer);
        var ditu = new egret.Bitmap();
        ditu.texture = this.gameimgSheet.getTexture("ditu");
        ditu.fillMode = egret.BitmapFillMode.REPEAT;
        ditu.x = 0;
        ditu.y = 48;
        ditu.width = GameUtils.SCREEN_W;
        ditu.height = GameUtils.SCREEN_H - 82 - 48;
        this.playerlayer.addChild(ditu);
        ditu.touchEnabled = true;
        this.bg1_x = 8;
        this.bg1_y = 50;
        var bg1_h = GameUtils.SCREEN_H - 140;
        var bg1 = new egret.Bitmap();
        bg1.texture = this.gameimgSheet.getTexture("propertybg1");
        bg1.x = this.bg1_x;
        bg1.y = this.bg1_y;
        this.playerlayer.addChild(bg1);
        var bgrect1 = new egret.Rectangle(50, 50, 50, 50);
        bg1.scale9Grid = bgrect1;
        bg1.width = GameUtils.SCREEN_W - this.bg1_x * 2;
        bg1.height = bg1_h;
        var bg2_h = GameUtils.SCREEN_H - 380;
        var bg2 = new egret.Bitmap();
        bg2.texture = this.gameimgSheet.getTexture("propertybg2");
        bg2.x = this.bg1_x + 10;
        bg2.y = this.bg1_y + 10;
        this.playerlayer.addChild(bg2);
        var bgrect2 = new egret.Rectangle(34, 34, 34, 34);
        bg2.scale9Grid = bgrect2;
        bg2.width = GameUtils.SCREEN_W - (this.bg1_x + 10) * 2;
        bg2.height = bg2_h;
        var iphone_top_y = 0;
        if (GameUtils.is_iphone_x) {
            iphone_top_y = 30;
        }
        var touxiangkuang = new egret.Bitmap();
        touxiangkuang.texture = this.gameimgSheet.getTexture("touxiangkuang");
        touxiangkuang.x = this.bg1_x + 15;
        touxiangkuang.y = this.bg1_y + 15 + iphone_top_y;
        this.playerlayer.addChild(touxiangkuang);
        var playername = new egret.TextField();
        playername.x = this.bg1_x + 110;
        playername.y = this.bg1_y + 20 + iphone_top_y;
        playername.textColor = 0xffffff;
        playername.size = GameUtils.TEXT_SIZE_MIDDLE;
        playername.text = GameUtils.playerBean.player_name;
        this.playerlayer.addChild(playername);
        var playerid = new egret.TextField();
        playerid.x = this.bg1_x + 110;
        playerid.y = this.bg1_y + 50 + iphone_top_y;
        playerid.textColor = 0xffffff;
        playerid.size = 16;
        playerid.text = "用户ID：" + GameUtils.playerBean.player_id;
        this.playerlayer.addChild(playerid);
        if (GameUtils.playerBean.player_avatar) {
            var imgLoader = new NetImageLoader();
            imgLoader.imgid = i;
            imgLoader.addEventListener(egret.Event.COMPLETE, this.imgLoadHandler, this);
            imgLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.imgError, this);
            imgLoader.load(GameUtils.playerBean.player_avatar);
        }
        else {
            var tou0 = new egret.Bitmap();
            tou0.texture = this.gameimgSheet.getTexture("tou0");
            tou0.x = this.bg1_x + 22;
            tou0.y = this.bg1_y + 22;
            this.playerlayer.addChild(tou0);
        }
        var property_s_x = 40;
        var property0_x = this.bg1_x + 110;
        var property0_y = this.bg1_y + 120 + iphone_top_y;
        var property0_w = 62;
        var property0 = new egret.Bitmap();
        property0.texture = this.gameimgSheet.getTexture("property0");
        property0.x = property0_x - property_s_x;
        property0.y = property0_y;
        this.playerlayer.addChild(property0);
        this.meilinum = new egret.BitmapText();
        this.meilinum.font = RES.getRes("propertynum_fnt");
        this.playerlayer.addChild(this.meilinum);
        this.meilinum.text = "" + GameUtils.playerBean.player_meilizhi;
        this.meilinum.letterSpacing = 0;
        this.meilinum.x = property0_x + property0_w + 20 - property_s_x;
        this.meilinum.y = 2 + property0_y;
        var property1 = new egret.Bitmap();
        property1.texture = this.gameimgSheet.getTexture("property1");
        property1.x = property0_x - property_s_x;
        property1.y = property0_y + 33;
        this.playerlayer.addChild(property1);
        this.zhihuinum = new egret.BitmapText();
        this.zhihuinum.font = RES.getRes("propertynum_fnt");
        this.playerlayer.addChild(this.zhihuinum);
        this.zhihuinum.text = "" + GameUtils.playerBean.player_zhihui;
        this.zhihuinum.letterSpacing = 0;
        this.zhihuinum.x = property0_x + property0_w + 20 - property_s_x;
        this.zhihuinum.y = 2 + property0_y + 33;
        var property2 = new egret.Bitmap();
        property2.texture = this.gameimgSheet.getTexture("property2");
        property2.x = property0_x - property_s_x;
        property2.y = property0_y + 33 * 2;
        this.playerlayer.addChild(property2);
        this.koucainum = new egret.BitmapText();
        this.koucainum.font = RES.getRes("propertynum_fnt");
        this.playerlayer.addChild(this.koucainum);
        this.koucainum.text = "" + GameUtils.playerBean.player_koucai;
        this.koucainum.letterSpacing = 0;
        this.koucainum.x = property0_x + property0_w + 20 - property_s_x;
        this.koucainum.y = 2 + property0_y + 33 * 2;
        var property3 = new egret.Bitmap();
        property3.texture = this.gameimgSheet.getTexture("property3");
        property3.x = property0_x - property_s_x;
        property3.y = property0_y + 33 * 3;
        this.playerlayer.addChild(property3);
        this.wulinum = new egret.BitmapText();
        this.wulinum.font = RES.getRes("propertynum_fnt");
        this.playerlayer.addChild(this.wulinum);
        this.wulinum.text = "" + GameUtils.playerBean.player_wuli;
        this.wulinum.letterSpacing = 0;
        this.wulinum.x = property0_x + property0_w + 20 - property_s_x;
        this.wulinum.y = 2 + property0_y + 33 * 3;
        for (var i = 0; i < 3; i++) {
            var add_btn = new egret.Bitmap();
            add_btn.texture = this.gameimgSheet.getTexture("p_buy_add");
            add_btn.name = "" + i;
            add_btn.x = property0_x + property0_w + 85 - property_s_x;
            add_btn.y = property0_y + 33 + 33 * i;
            this.playerlayer.addChild(add_btn);
            add_btn.touchEnabled = true;
            add_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addProperty, this);
        }
        var iphone_y = 0;
        if (GameUtils.is_iphone_x) {
            iphone_y = -60;
        }
        var propertyplayer = new egret.Bitmap();
        propertyplayer.texture = this.gameimgSheet.getTexture("propertyplayer");
        propertyplayer.x = GameUtils.SCREEN_W / 2 + 20;
        propertyplayer.y = this.bg1_y + bg2_h - 190 - propertyplayer.texture.textureHeight + iphone_y;
        this.playerlayer.addChild(propertyplayer);
        var bg3 = new egret.Bitmap();
        bg3.texture = this.gameimgSheet.getTexture("propertybg3");
        bg3.x = this.bg1_x + 20;
        bg3.y = this.bg1_y + bg2_h - 195 + iphone_y;
        this.playerlayer.addChild(bg3);
        var bgrect3 = new egret.Rectangle(34, 34, 34, 34);
        bg3.scale9Grid = bgrect3;
        bg3.width = GameUtils.SCREEN_W - (this.bg1_x + 10) * 2 - 20;
        bg3.height = 200;
        var propertybg4 = new egret.Bitmap();
        propertybg4.texture = this.gameimgSheet.getTexture("propertybg4");
        propertybg4.x = (GameUtils.SCREEN_W - propertybg4.texture.textureWidth) / 2;
        propertybg4.y = this.bg1_y + bg2_h - 195 + iphone_y;
        this.playerlayer.addChild(propertybg4);
        var npc_x = (GameUtils.SCREEN_W - 230 * 2 - 10) / 2;
        for (var i = 0; i < GameUtils.playerBean.player_haogandu.length; i++) {
            var npc = new egret.Bitmap();
            npc.texture = this.gameimgSheet.getTexture(this.getnpcicon(GameUtils.playerBean.player_haogandu[i].hao_npc_id));
            this.playerlayer.addChild(npc);
            npc.x = npc_x + this.npc_w[i];
            npc.y = bg3.y + propertybg4.texture.textureHeight + 10;
            this.npcnum[i] = new egret.BitmapText();
            this.npcnum[i].font = RES.getRes("haogannum_fnt");
            this.playerlayer.addChild(this.npcnum[i]);
            this.npcnum[i].text = "" + GameUtils.playerBean.player_haogandu[i].hao_haogandu;
            this.npcnum[i].letterSpacing = 0;
            var npc_W = 10;
            this.npcnum[i].x = npc_W + npc_x + this.npc_w[i];
            this.npcnum[i].y = bg3.y + propertybg4.texture.textureHeight + 15 + npc.texture.textureHeight;
            var add_btn_0 = new egret.Bitmap();
            add_btn_0.texture = this.gameimgSheet.getTexture("p_buy_add");
            add_btn_0.name = "" + i;
            add_btn_0.x = npc_x + this.npc_w[i] + npc.texture.textureWidth - 60;
            add_btn_0.y = bg3.y + propertybg4.texture.textureHeight + 15 + npc.texture.textureHeight;
            this.playerlayer.addChild(add_btn_0);
            add_btn_0.touchEnabled = true;
            add_btn_0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addHaogan, this);
        }
        var bgsound = new egret.Bitmap();
        bgsound.texture = this.gameimgSheet.getTexture("propertybg2");
        bgsound.x = this.bg1_x + 10;
        bgsound.y = this.bg1_y + bg2_h + 20;
        this.playerlayer.addChild(bgsound);
        var bgrectsound = new egret.Rectangle(34, 34, 34, 34);
        bgsound.scale9Grid = bgrectsound;
        bgsound.width = GameUtils.SCREEN_W - (this.bg1_x + 10) * 2;
        bgsound.height = 100;
        var bgzhu = new egret.Bitmap();
        bgzhu.texture = this.gameimgSheet.getTexture("propertybg2");
        bgzhu.x = this.bg1_x + 10;
        bgzhu.y = this.bg1_y + bg2_h + 130;
        this.playerlayer.addChild(bgzhu);
        var bgrectzhu = new egret.Rectangle(34, 34, 34, 34);
        bgzhu.scale9Grid = bgrectzhu;
        bgzhu.width = GameUtils.SCREEN_W - (this.bg1_x + 10) * 2;
        bgzhu.height = 100;
        var btn_W = 35;
        var btn_x = (GameUtils.SCREEN_W - 76 * 4 - btn_W * 3) / 2;
        this.setbtn = new egret.Bitmap();
        this.setbtn.texture = this.gameimgSheet.getTexture("btn_set");
        this.setbtn.x = btn_x;
        this.setbtn.y = this.bg1_y + bg2_h + 38;
        this.playerlayer.addChild(this.setbtn);
        this.setbtn.touchEnabled = true;
        this.setbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setBtn, this);
        this.aboutbtn = new egret.Bitmap();
        this.aboutbtn.texture = this.gameimgSheet.getTexture("btn_about");
        this.aboutbtn.x = btn_x + (76 + btn_W);
        this.aboutbtn.y = this.bg1_y + bg2_h + 38;
        this.playerlayer.addChild(this.aboutbtn);
        this.aboutbtn.touchEnabled = true;
        this.aboutbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.aboutBtn, this);
        this.msgbtn = new egret.Bitmap();
        this.msgbtn.texture = this.gameimgSheet.getTexture("btn_msg");
        this.msgbtn.x = btn_x + (76 + btn_W) * 2;
        this.msgbtn.y = this.bg1_y + bg2_h + 38;
        this.playerlayer.addChild(this.msgbtn);
        this.msgbtn.touchEnabled = true;
        this.msgbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.messageBtn, this);
        this.backBtn = new egret.Bitmap();
        this.backBtn.texture = this.gameimgSheet.getTexture("endbtn");
        this.backBtn.x = btn_x + (76 + btn_W) * 3;
        this.backBtn.y = this.bg1_y + bg2_h + 38;
        this.playerlayer.addChild(this.backBtn);
        this.backBtn.touchEnabled = true;
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showEnd, this);
        var kt = new egret.Bitmap();
        kt.texture = this.gameimgSheet.getTexture("kt");
        kt.x = (GameUtils.SCREEN_W - kt.texture.textureWidth) / 2;
        kt.y = this.bg1_y + bg2_h + 136;
        this.playerlayer.addChild(kt);
        this.closeallbtn = new egret.Bitmap();
        this.closeallbtn.texture = this.coverimgSheet.getTexture("closemenu");
        this.closeallbtn.x = GameUtils.SCREEN_W - this.closeallbtn.texture.textureWidth - 8;
        this.closeallbtn.y = this.bg1_y;
        this.playerlayer.addChild(this.closeallbtn);
        this.closeallbtn.touchEnabled = true;
        this.closeallbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeAll, this);
    };
    PropertyScene.prototype.getItemId = function (index) {
        this.attribute_type = 0;
        switch (index) {
            case 0:
                break;
            case 1:
                this.attribute_type = 1;
                this.proname = "武力提高";
                break;
            case 2:
                this.attribute_type = 2;
                this.proname = "智慧提高";
                break;
            case 3:
                this.attribute_type = 3;
                this.proname = "口才提高";
                break;
            case 5:
                this.attribute_type = 5;
                if (this.npc_id == 0) {
                    this.proname = "赫连楚好感度提高";
                }
                else {
                    this.proname = "木神好感度提高";
                }
                break;
        }
        this.prolist = new Array();
        for (var i = 0; i < GameUtils.propertyModeList.length; i++) {
            if (GameUtils.propertyModeList[i].propertym_attribute_type == this.attribute_type) {
                if (GameUtils.propertyModeList[i].propertym_attribute_type == 5) {
                    if (GameUtils.propertyModeList[i].propertym_npc_id == (this.npc_id + 1)) {
                        this.prolist.push(new PropertyModeBean(GameUtils.propertyModeList[i].propertym_item_id, GameUtils.propertyModeList[i].propertym_attribute_type, GameUtils.propertyModeList[i].propertym_price, GameUtils.propertyModeList[i].propertym_money_type, GameUtils.propertyModeList[i].propertym_value, GameUtils.propertyModeList[i].propertym_npc_id));
                    }
                }
                else {
                    this.prolist.push(new PropertyModeBean(GameUtils.propertyModeList[i].propertym_item_id, GameUtils.propertyModeList[i].propertym_attribute_type, GameUtils.propertyModeList[i].propertym_price, GameUtils.propertyModeList[i].propertym_money_type, GameUtils.propertyModeList[i].propertym_value, GameUtils.propertyModeList[i].propertym_npc_id));
                }
            }
        }
    };
    PropertyScene.prototype.showBuyProperty = function () {
        this.buylayer_a = new egret.Sprite();
        this.buylayer_a.graphics.beginFill(0x000000, 1);
        this.buylayer_a.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H);
        this.buylayer_a.graphics.endFill();
        this.buylayer_a.width = GameUtils.SCREEN_W;
        this.buylayer_a.height = GameUtils.SCREEN_H;
        this.buylayer_a.alpha = 0.2;
        this.addChild(this.buylayer_a);
        this.buylayer_a.touchEnabled = true;
        this.buylayer = new egret.Sprite();
        this.addChild(this.buylayer);
        var kuang = new egret.Bitmap();
        kuang.texture = this.gameimgSheet.getTexture("p_buy_bg");
        kuang.x = (GameUtils.SCREEN_W - 400) / 2;
        kuang.y = GameUtils.SCREEN_H - 310;
        this.buylayer.addChild(kuang);
        var bgrect = new egret.Rectangle(34, 34, 34, 34);
        kuang.scale9Grid = bgrect;
        kuang.width = 400;
        kuang.height = 230;
        var name = new egret.TextField();
        name.x = (GameUtils.SCREEN_W - 400) / 2;
        name.y = GameUtils.SCREEN_H - 310;
        name.textColor = 0x000000;
        name.size = GameUtils.TEXT_SIZE_SMALL;
        name.text = this.proname;
        name.width = 400;
        name.height = 70;
        this.buylayer.addChild(name);
        name.textAlign = egret.HorizontalAlign.CENTER;
        name.verticalAlign = egret.VerticalAlign.MIDDLE;
        var buy_W = 50;
        var buy_H = 20;
        var buy_x = (GameUtils.SCREEN_W - 98 * 2 - buy_W) / 2;
        var buy_y = GameUtils.SCREEN_H - 280 + (200 - 58 * 2 - buy_H) / 2;
        for (var i = 0; i < 4; i++) {
            var buy_btn = new egret.Bitmap();
            buy_btn.texture = this.gameimgSheet.getTexture("p_buy_btn");
            buy_btn.name = "" + i;
            buy_btn.x = buy_x + (98 + buy_W) * (i % 2);
            buy_btn.y = buy_y + (58 + buy_H) * Math.floor(i / 2);
            this.buylayer.addChild(buy_btn);
            buy_btn.touchEnabled = true;
            buy_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyProperty, this);
            var value = new egret.TextField();
            value.x = buy_x + (98 + buy_W) * (i % 2);
            value.y = buy_y + (58 + buy_H) * Math.floor(i / 2);
            value.textColor = 0xffffff;
            value.size = GameUtils.TEXT_SIZE_SMALL;
            value.text = "+" + this.prolist[i].propertym_value;
            value.width = 98;
            value.height = 30;
            this.buylayer.addChild(value);
            value.textAlign = egret.HorizontalAlign.CENTER;
            value.verticalAlign = egret.VerticalAlign.MIDDLE;
            var iconstr = "shopmoneyicon0";
            if (this.prolist[i].propertym_money_type == 10) {
                iconstr = "shopmoneyicon0";
            }
            else if (this.prolist[i].propertym_money_type == 11) {
                iconstr = "shopmoneyicon1";
            }
            else {
                iconstr = "shopmoneyicon2";
            }
            var shopmoneyicon = new egret.Bitmap();
            shopmoneyicon.texture = this.shopimgSheet.getTexture(iconstr);
            this.buylayer.addChild(shopmoneyicon);
            shopmoneyicon.x = buy_x + 20 + (98 + buy_W) * (i % 2);
            shopmoneyicon.y = buy_y + 31 + (58 + buy_H) * Math.floor(i / 2);
            var buynum = new egret.TextField();
            buynum.x = buy_x + 50 + (98 + buy_W) * (i % 2);
            buynum.y = buy_y + 30 + (58 + buy_H) * Math.floor(i / 2);
            buynum.textColor = 0x000000;
            buynum.size = GameUtils.TEXT_SIZE_SMALL;
            buynum.text = "" + this.prolist[i].propertym_price;
            buynum.width = 98;
            buynum.height = 30;
            this.buylayer.addChild(buynum);
            buynum.verticalAlign = egret.VerticalAlign.MIDDLE;
        }
        if (GameUtils.channelStr != "玩吧") {
            if (!GameUtils.noYaoQing) {
                var yaoqingbtn = new egret.Bitmap();
                yaoqingbtn.texture = this.gameimgSheet.getTexture("btn_property_share");
                yaoqingbtn.x = (GameUtils.SCREEN_W - 400) / 2 + 400 - 40;
                yaoqingbtn.y = buy_y + 55 + buy_H;
                this.buylayer.addChild(yaoqingbtn);
                yaoqingbtn.touchEnabled = true;
                yaoqingbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.yaoqing, this);
            }
        }
        else {
            if (!GameUtils.isNewPlayerFourDay) {
                if (!GameUtils.noYaoQing) {
                    var yaoqingbtn = new egret.Bitmap();
                    yaoqingbtn.texture = this.gameimgSheet.getTexture("btn_property_share");
                    yaoqingbtn.x = (GameUtils.SCREEN_W - 400) / 2 + 400 - 40;
                    yaoqingbtn.y = buy_y + 55 + buy_H;
                    this.buylayer.addChild(yaoqingbtn);
                    yaoqingbtn.touchEnabled = true;
                    yaoqingbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.yaoqing, this);
                }
            }
            else {
                if (GameUtils.isShowRecallList) {
                    var huanxing = new egret.Bitmap();
                    huanxing.texture = this.gameimgSheet.getTexture("btn_property_huanxing");
                    huanxing.x = (GameUtils.SCREEN_W - 400) / 2 + 400 - 40;
                    huanxing.y = buy_y + 55 + buy_H;
                    this.buylayer.addChild(huanxing);
                    huanxing.touchEnabled = true;
                    huanxing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnHuanXing, this);
                }
            }
        }
        var buyclose = new egret.Bitmap();
        buyclose.texture = this.coverimgSheet.getTexture("closemenu");
        buyclose.x = (GameUtils.SCREEN_W - 400) / 2 + 400 - 55;
        buyclose.y = GameUtils.SCREEN_H - 310;
        this.buylayer.addChild(buyclose);
        buyclose.touchEnabled = true;
        buyclose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBuyProperty, this);
    };
    PropertyScene.prototype.btnHuanXing = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        NetWorkUtils.sendSimpleNetPostRequest(101, this.getFriendListComplete, this.onPostIOError, this, this);
    };
    PropertyScene.prototype.getFriendListComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_101.k", event);
        //                GameUtils.debugLog(obj);
        if (obj.friends) {
            if (obj.friends.length > 0) {
                GameUtils.friendBeanList = new Array();
                for (var i = 0; i < obj.friends.length; i++) {
                    GameUtils.friendBeanList.push(new FriendListBean(obj.friends[i]));
                }
                GameUtils.friendBeanList.sort(function (a, b) {
                    return b.friendl_meilizhi - a.friendl_meilizhi;
                });
            }
        }
        var isshow = false;
        for (var i = 0; i < GameUtils.friendBeanList.length; i++) {
            if (GameUtils.friendBeanList[i].friendl_interaction == 0) {
                isshow = true;
                break;
            }
        }
        if (isshow) {
            this.gameScene.gotoFriendNoSendMsg();
        }
        else {
            var tishi = new DrawUtils();
            tishi.createTishi("coverimg_json", "tishikuang1", "没有可以唤醒的好友");
            this.addChild(tishi);
        }
    };
    PropertyScene.prototype.yaoqing = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        NetWorkUtils.sendSimpleNetPostRequest(109, this.getsharelistComplete, this.onPostIOError, this, this);
    };
    PropertyScene.prototype.getsharelistComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_109.k", event);
        //                GameUtils.debugLog(obj);
        if (obj) {
            GameUtils.shareListBean = new ShareListBean(obj);
        }
        var showsharelist = new DrawUtils();
        showsharelist.drawShareList();
        this.addChild(showsharelist);
    };
    PropertyScene.prototype.buyProperty = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        var btn = evt.currentTarget;
        if (btn) {
            var btnid = parseInt(btn.name);
            var itemid = 500;
            if (this.prolist.length > 0) {
                itemid = this.prolist[btnid].propertym_item_id;
                this.mta_itemid = itemid;
                var sendbuyobj = { cmd: 112, player_token: GameUtils.playerToken, item_id: itemid, return_json: 1 };
                NetWorkUtils.sendNetPostRequest(sendbuyobj, this.getBuyComplete, this.onPostIOError, this, this);
            }
        }
    };
    PropertyScene.prototype.getBuyComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_112.k", event);
        if (obj.result == 0) {
            var tishi = new DrawUtils();
            tishi.createTiaoZhuanTishi("coverimg_json", "tishikuang1", obj.info, this.gotoShop, this);
            this.addChild(tishi);
        }
        else if (obj.result == 1) {
            NetWorkUtils.sendSimpleNetPostRequest(100, this.getPlayerComplete, this.onPostIOError, this, this);
            var tishi = new DrawUtils();
            tishi.createMoveTishi(obj.info);
            this.addChild(tishi);
        }
    };
    PropertyScene.prototype.gotoShop = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.gameScene.gotoShangChengDaoju();
    };
    PropertyScene.prototype.getPlayerComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_100.k", event);
        if (obj.player) {
            GameUtils.playerBean = new PlayerBean(obj);
            this.RefreshPropertyNum();
        }
    };
    PropertyScene.prototype.RefreshPropertyNum = function () {
        this.meilinum.text = "" + GameUtils.playerBean.player_meilizhi;
        this.zhihuinum.text = "" + GameUtils.playerBean.player_zhihui;
        this.koucainum.text = "" + GameUtils.playerBean.player_koucai;
        this.wulinum.text = "" + GameUtils.playerBean.player_wuli;
        for (var i = 0; i < GameUtils.playerBean.player_haogandu.length; i++) {
            this.npcnum[i].text = "" + GameUtils.playerBean.player_haogandu[i].hao_haogandu;
        }
    };
    PropertyScene.prototype.closeBuyProperty = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.buylayer_a) {
            if (this.buylayer_a.parent) {
                this.buylayer_a.parent.removeChild(this.buylayer_a);
            }
        }
        if (this.buylayer) {
            this.buylayer.removeChildren();
            if (this.buylayer.parent) {
                this.buylayer.parent.removeChild(this.buylayer);
            }
        }
    };
    PropertyScene.prototype.addProperty = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        var btn = evt.currentTarget;
        if (btn) {
            var btnid = parseInt(btn.name);
            var index = 0;
            if (btnid == 0) {
                index = 2;
            }
            else if (btnid == 1) {
                index = 3;
            }
            else if (btnid == 2) {
                index = 1;
            }
            this.getItemId(index);
            this.showBuyProperty();
        }
    };
    PropertyScene.prototype.addHaogan = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        var btn = evt.currentTarget;
        if (btn) {
            var btnid = parseInt(btn.name);
            this.npc_id = btnid;
            this.getItemId(5);
            this.showBuyProperty();
        }
    };
    PropertyScene.prototype.imgError = function (event) {
        var tou0 = new egret.Bitmap();
        tou0.texture = this.gameimgSheet.getTexture("tou0");
        tou0.x = this.bg1_x + 22;
        tou0.y = this.bg1_y + 22;
        this.playerlayer.addChild(tou0);
    };
    PropertyScene.prototype.imgLoadHandler = function (evt) {
        var loader = evt.currentTarget;
        if (loader) {
            var iphone_top_y = 0;
            if (GameUtils.is_iphone_x) {
                iphone_top_y = 30;
            }
            var bmd = loader.data;
            var texture = new egret.Texture();
            texture.bitmapData = bmd;
            var bmp = new egret.Bitmap(texture);
            bmp.x = this.bg1_x + 22;
            bmp.y = this.bg1_y + 22 + iphone_top_y;
            bmp.width = 72;
            bmp.height = 72;
            this.playerlayer.addChild(bmp);
        }
    };
    PropertyScene.prototype.getnpcicon = function (npcid) {
        var str = "npc0";
        for (var i = 0; i < this.npc.length; i++) {
            if (i == (npcid - 1)) {
                str = this.npc[i];
            }
        }
        return str;
    };
    PropertyScene.prototype.closeAll = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.gameScene.backJuQing();
    };
    PropertyScene.prototype.setBtn = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.setscene = new SetScene(this.gameScene);
        this.addChild(this.setscene);
    };
    PropertyScene.prototype.aboutBtn = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        this.aboutscene = new AboutScene();
        this.addChild(this.aboutscene);
    };
    PropertyScene.prototype.messageBtn = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        NetWorkUtils.sendSimpleNetPostRequest(103, this.getMessageListComplete, this.onPostIOError, this, this);
    };
    PropertyScene.prototype.getMessageListComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_103.k", event);
        if (obj.notifications) {
            if (obj.notifications.length > 0) {
                GameUtils.messageList = new Array();
                var readList = new Array();
                var not_readList = new Array();
                for (var i = 0; i < obj.notifications.length; i++) {
                    if (obj.notifications[i].state == 0) {
                        not_readList.push(new MessageBean(obj.notifications[i]));
                    }
                    else {
                        readList.push(new MessageBean(obj.notifications[i]));
                    }
                }
                not_readList.sort(function (a, b) {
                    return b.message_create_time - a.message_create_time;
                });
                readList.sort(function (a, b) {
                    return b.message_create_time - a.message_create_time;
                });
                for (var i = 0; i < not_readList.length; i++) {
                    GameUtils.messageList.push(not_readList[i]);
                }
                for (var i = 0; i < readList.length; i++) {
                    GameUtils.messageList.push(readList[i]);
                }
            }
            this.messagescene = new MessageScene();
            this.addChild(this.messagescene);
        }
    };
    PropertyScene.prototype.onPostIOError = function (event) {
        NetWorkUtils.clearNetLoading();
    };
    PropertyScene.prototype.showEnd = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        NetWorkUtils.sendSimpleNetPostRequest(118, this.getOpenEndListComplete, this.onPostIOError, this, this);
    };
    PropertyScene.prototype.getOpenEndListComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_118.k", event);
        if (obj.result == 1) {
            GameUtils.openEndList = new Array();
            for (var i = 0; i < obj.triggers.length; i++) {
                GameUtils.openEndList.push(new TriggerOpenModelBean(obj.triggers[i]));
            }
            var endScene = new EndScene();
            this.addChild(endScene);
        }
    };
    PropertyScene.prototype.closeScene = function () {
        this.removeChildren();
    };
    return PropertyScene;
}(egret.DisplayObjectContainer));
__reflect(PropertyScene.prototype, "PropertyScene");
//# sourceMappingURL=PropertyScene.js.map