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
var FriendList = (function (_super) {
    __extends(FriendList, _super);
    function FriendList(thisObj, stagetype) {
        var _this = _super.call(this) || this;
        _this.btnPositionArr = new Array(454, 388, 332);
        _this.friend_index = 0;
        _this.stagetype = 0;
        _this.friendArrayList = new Array();
        _this.showhuanxingtishi = false;
        _this.huanxingText = "showhuanxingtishi";
        _this.friendscene = thisObj;
        _this.gameimgSheet = RES.getRes("gameimg_json");
        _this.coverimgSheet = RES.getRes("coverimg_json");
        //是否有唤醒提示语
        if (egret.localStorage.getItem(_this.huanxingText) == "open") {
            _this.showhuanxingtishi = true;
        }
        FriendList.isLookStage = false;
        _this.stagetype = stagetype;
        _this.friendArrayList = new Array();
        for (var i = 0; i < GameUtils.friendBeanList.length; i++) {
            if (_this.stagetype == 1) {
                if (GameUtils.friendBeanList[i].friendl_interaction == 0) {
                    _this.friendArrayList.push(GameUtils.friendBeanList[i]);
                }
            }
            else {
                _this.friendArrayList.push(GameUtils.friendBeanList[i]);
            }
        }
        _this.init();
        return _this;
    }
    FriendList.prototype.init = function () {
        for (var i = 0; i < this.friendArrayList.length; i++) {
            var haoyoukuang = new egret.Bitmap();
            haoyoukuang.texture = this.gameimgSheet.getTexture("haoyoukuang");
            haoyoukuang.x = 15;
            haoyoukuang.y = 112 * i;
            this.addChild(haoyoukuang);
            haoyoukuang.name = "" + i;
            haoyoukuang.touchEnabled = true;
            haoyoukuang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.canguan, this);
            var touxiangkuang = new egret.Bitmap();
            touxiangkuang.texture = this.gameimgSheet.getTexture("touxiangkuang");
            touxiangkuang.x = 35;
            touxiangkuang.y = 8 + 112 * i;
            this.addChild(touxiangkuang);
            if (this.friendArrayList[i].friendl_avatar) {
                var imgLoader = new NetImageLoader();
                imgLoader.imgid = i;
                imgLoader.addEventListener(egret.Event.COMPLETE, this.imgLoadHandler, this);
                imgLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.imgError, this);
                imgLoader.load(this.friendArrayList[i].friendl_avatar);
            }
            else {
                var tou0 = new egret.Bitmap();
                tou0.texture = this.gameimgSheet.getTexture("tou0");
                tou0.x = 42;
                tou0.y = 15 + 112 * i;
                this.addChild(tou0);
            }
            var name = new egret.TextField();
            name.x = 141;
            name.y = 16 + 112 * i;
            name.textColor = 0x000000;
            name.size = 24;
            name.text = this.friendArrayList[i].friendl_name;
            this.addChild(name);
            var meili = new egret.TextField();
            meili.x = 141;
            meili.y = 56 + 112 * i;
            meili.textColor = 0x000000;
            meili.size = 24;
            meili.text = "魅力：" + this.friendArrayList[i].friendl_meilizhi;
            this.addChild(meili);
            var btnindex = 0;
            if (this.stagetype == 1) {
                var huanxingbtn = new egret.Bitmap();
                huanxingbtn.texture = this.gameimgSheet.getTexture("btnhuanxing");
                huanxingbtn.name = "" + i;
                huanxingbtn.x = this.btnPositionArr[btnindex];
                huanxingbtn.y = 23 + 112 * i;
                this.addChild(huanxingbtn);
                huanxingbtn.touchEnabled = true;
                huanxingbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnHuanXing, this);
            }
            else {
                var stealbtn = new egret.Bitmap();
                stealbtn.texture = this.gameimgSheet.getTexture("canguan0");
                stealbtn.name = "" + i;
                stealbtn.x = this.btnPositionArr[btnindex];
                stealbtn.y = 23 + 112 * i;
                this.addChild(stealbtn);
                stealbtn.touchEnabled = true;
                stealbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stealOther, this);
            }
            btnindex++;
            // if (GameUtils.show_off) {
            //     var playermeili_num: number = GameUtils.playerbean.player_meilizhi;
            //     if (playermeili_num > this.friendArrayList[i].friendl_meilizhi) {
            //         var btnxuanyao: egret.Bitmap = new egret.Bitmap();
            //         btnxuanyao.texture = this.gameimgSheet.getTexture("btnxuanyao");
            //         btnxuanyao.name = "" + i;
            //         btnxuanyao.x = this.btnPositionArr[btnindex];
            //         btnxuanyao.y = 23 + 112 * i;
            //         this.addChild(btnxuanyao);
            //         btnxuanyao.touchEnabled = true;
            //         btnxuanyao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnXuanYao, this);
            //         btnindex++;
            //     }
            // }
            if (GameUtils.noFacialRecognition && GameUtils.channelStr == "玩吧") {
                var facebtn = new egret.Bitmap();
                facebtn.texture = this.gameimgSheet.getTexture("btn_meiyan_share");
                facebtn.name = "" + i;
                facebtn.x = this.btnPositionArr[btnindex];
                facebtn.y = 23 + 112 * i;
                this.addChild(facebtn);
                facebtn.touchEnabled = true;
                facebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnFace, this);
                btnindex++;
            }
            var canguanbtn = new egret.Bitmap();
            canguanbtn.texture = this.gameimgSheet.getTexture("flistcanguanbtn");
            canguanbtn.x = this.btnPositionArr[btnindex];
            canguanbtn.y = 30 + 112 * i;
            this.addChild(canguanbtn);
        }
    };
    FriendList.prototype.btnFace = function (evt) {
        if (GameUtils.gameSandPause) {
            return;
        }
        var face = {
            "appKey": GameUtils.APPKEY_1758,
            "hlmy_gw": GameUtils.hlmy_gw,
            "gid": GameUtils.playerGid
        };
        HlmyUtils.HlmyFace(face);
        // console.log("人脸融合SDK");
    };
    FriendList.prototype.drawHuanXingToast = function () {
        this.huanxingToastLayer = new egret.Sprite();
        this.huanxingToastLayer.graphics.beginFill(0x000000, 0);
        this.huanxingToastLayer.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H);
        this.huanxingToastLayer.graphics.endFill();
        this.huanxingToastLayer.width = GameUtils.SCREEN_W;
        this.huanxingToastLayer.height = GameUtils.SCREEN_H - 82;
        this.huanxingToastLayer.touchEnabled = true;
        this.friendscene.addChild(this.huanxingToastLayer);
        var kuang_w = 356;
        var kuang_h = 260;
        var bg = new egret.Bitmap();
        bg.texture = this.coverimgSheet.getTexture("tishikuang1");
        bg.x = (GameUtils.SCREEN_W - kuang_w) / 2;
        bg.y = (GameUtils.SCREEN_H - kuang_h) / 2;
        this.huanxingToastLayer.addChild(bg);
        var bgscale = new egret.Rectangle(34, 34, 34, 34);
        bg.scale9Grid = bgscale;
        bg.width = kuang_w;
        bg.height = kuang_h;
        var title = new egret.Bitmap();
        title.texture = this.gameimgSheet.getTexture("huangxing_title");
        title.x = (GameUtils.SCREEN_W - 144) / 2;
        title.y = (GameUtils.SCREEN_H - kuang_h) / 2 - 30;
        this.huanxingToastLayer.addChild(title);
        var text = new egret.TextField();
        text.x = (GameUtils.SCREEN_W - kuang_w) / 2 + 20;
        text.y = (GameUtils.SCREEN_H - kuang_h) / 2 + 50;
        text.textColor = 0xff0000;
        text.size = 24;
        text.text = "　　好友回归游戏之后，系统会自动奖励10体力。可在“属性”——“消息”中查看";
        this.huanxingToastLayer.addChild(text);
        text.width = kuang_w - 40;
        var tixing = new egret.TextField();
        tixing.x = 200 + 20 + 24;
        tixing.y = (GameUtils.SCREEN_H - kuang_h) / 2 + 160;
        tixing.textColor = 0x000000;
        tixing.size = 24;
        tixing.text = "不再提醒";
        this.huanxingToastLayer.addChild(tixing);
        this.btnHuangXingtishi = new egret.Bitmap();
        this.btnHuangXingtishi.texture = this.gameimgSheet.getTexture("huanxing_btn2");
        this.btnHuangXingtishi.x = 200;
        this.btnHuangXingtishi.y = (GameUtils.SCREEN_H - kuang_h) / 2 + 160;
        this.btnHuangXingtishi.touchEnabled = true;
        this.btnHuangXingtishi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnHuanxingTishi, this);
        this.huanxingToastLayer.addChild(this.btnHuangXingtishi);
        var btnCloseHuanxing = new egret.Bitmap();
        btnCloseHuanxing.texture = this.gameimgSheet.getTexture("huanxing_btn1");
        btnCloseHuanxing.x = (GameUtils.SCREEN_W - kuang_w) / 2 + 20;
        btnCloseHuanxing.y = (GameUtils.SCREEN_H - kuang_h) / 2 + kuang_h - 10 - 44;
        btnCloseHuanxing.touchEnabled = true;
        btnCloseHuanxing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseHuanxing, this);
        this.huanxingToastLayer.addChild(btnCloseHuanxing);
        var btnGotoHuanxing = new egret.Bitmap();
        btnGotoHuanxing.texture = this.gameimgSheet.getTexture("huanxing_btn0");
        btnGotoHuanxing.x = (GameUtils.SCREEN_W - kuang_w) / 2 + kuang_w - 20 - 99;
        btnGotoHuanxing.y = (GameUtils.SCREEN_H - kuang_h) / 2 + kuang_h - 10 - 44;
        btnGotoHuanxing.touchEnabled = true;
        btnGotoHuanxing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGotoHuanXing, this);
        this.huanxingToastLayer.addChild(btnGotoHuanxing);
    };
    FriendList.prototype.btnHuanxingTishi = function (evt) {
        var dianeff = new DianEff(this.friendscene, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause || FriendList.isLookStage) {
            return;
        }
        if (!this.showhuanxingtishi) {
            this.showhuanxingtishi = true;
            this.btnHuangXingtishi.texture = this.gameimgSheet.getTexture("huanxing_btn3");
            egret.localStorage.setItem(this.huanxingText, "open");
        }
        else {
            this.showhuanxingtishi = false;
            this.btnHuangXingtishi.texture = this.gameimgSheet.getTexture("huanxing_btn2");
            egret.localStorage.setItem(this.huanxingText, "close");
        }
    };
    FriendList.prototype.btnCloseHuanxing = function (evt) {
        var dianeff = new DianEff(this.friendscene, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause || FriendList.isLookStage) {
            return;
        }
        if (this.showhuanxingtishi) {
            egret.localStorage.setItem(this.huanxingText, "open");
        }
        else {
            egret.localStorage.setItem(this.huanxingText, "close");
        }
        if (this.huanxingToastLayer) {
            this.huanxingToastLayer.removeChildren();
            if (this.huanxingToastLayer.parent) {
                this.huanxingToastLayer.parent.removeChild(this.huanxingToastLayer);
            }
        }
    };
    FriendList.prototype.btnGotoHuanXing = function (evt) {
        var dianeff = new DianEff(this.friendscene, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause || FriendList.isLookStage) {
            return;
        }
        if (this.showhuanxingtishi) {
            egret.localStorage.setItem(this.huanxingText, "open");
        }
        else {
            egret.localStorage.setItem(this.huanxingText, "close");
        }
        if (this.huanxingToastLayer) {
            this.huanxingToastLayer.removeChildren();
            if (this.huanxingToastLayer.parent) {
                this.huanxingToastLayer.parent.removeChild(this.huanxingToastLayer);
            }
        }
        //发送消息给好友
        HlmyUtils.HlmyExecuteRecall(this.friendArrayList[this.huanxingIndex].friendl_gid, "你的好友在召唤你，现在回归会有5颗心奖励。");
    };
    FriendList.prototype.xuanyaoCallBack = function () {
        var tishi = new DrawUtils();
        tishi.createTishi("coverimg_json", "tishikuang1", GameUtils.is_xuanyao_success ? "炫耀成功" : "炫耀失败");
        this.friendscene.addChild(tishi);
    };
    FriendList.prototype.btnXuanYao = function (evt) {
        var dianeff = new DianEff(this.friendscene, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause || FriendList.isLookStage) {
            return;
        }
        var btn = evt.currentTarget;
        if (btn) {
            var btnid = parseInt(btn.name);
            HlmyUtils.HlmySetShareInfo({
                "state": GameUtils.MYAPPKEY_1758, "tipInfo": true, "reward": "", "appKey": GameUtils.APPKEY_1758, "gid": GameUtils.playerGid,
                fgid: this.friendArrayList[btnid].friendl_gid, content: "嘿……你魅力不够哦，我轻松超过了你~~~"
            });
        }
    };
    FriendList.prototype.imgError = function (event) {
        var loader = event.currentTarget;
        if (loader) {
            var tou0 = new egret.Bitmap();
            tou0.texture = this.gameimgSheet.getTexture("tou0");
            tou0.x = 42;
            tou0.y = 15 + 112 * loader.imgid;
            this.addChild(tou0);
        }
    };
    FriendList.prototype.imgLoadHandler = function (evt) {
        var loader = evt.currentTarget;
        if (loader) {
            var bmd = loader.data;
            var texture = new egret.Texture();
            texture.bitmapData = bmd;
            var bmp = new egret.Bitmap(texture);
            bmp.x = 42;
            bmp.y = 15 + 112 * loader.imgid;
            bmp.width = 72;
            bmp.height = 72;
            this.addChild(bmp);
        }
    };
    FriendList.prototype.canguan = function (evt) {
        var dianeff = new DianEff(this.friendscene, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause || FriendList.isLookStage) {
            return;
        }
        var btn = evt.currentTarget;
        if (btn) {
            var btnid = parseInt(btn.name);
            this.avatar = this.friendArrayList[btnid].friendl_avatar;
            FriendList.isLookStage = true;
            var sendotherplayerobj = { cmd: 102, player_token: GameUtils.playerToken, friend_id: this.friendArrayList[btnid].friendl_friend_id, return_json: 1 };
            NetWorkUtils.sendNetPostRequest(sendotherplayerobj, this.getOtherPlayerComplete, this.onPostIOError, this.friendscene, this);
        }
    };
    FriendList.prototype.getOtherPlayerComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_102.k", event);
        if (obj.friend) {
            var friend_haogandu = new Array();
            if (obj.haogandus) {
                for (var i = 0; i < obj.haogandus.length; i++) {
                    friend_haogandu.push(new FriendHaoGanBean(obj.haogandus[i].haogandu, obj.haogandus[i].npc_id, obj.haogandus[i].player_id));
                }
            }
            GameUtils.playerfriendbean = new PlayerFriendBean(obj.friend.wuli, obj.friend.player_id, obj.friend.koucai, obj.friend.current_in, obj.friend.zhihui, obj.friend.name, obj.friend.meilizhi, this.avatar, friend_haogandu);
            this.friendscene.drawOtherPlayer();
        }
    };
    FriendList.prototype.btnHuanXing = function (evt) {
        var dianeff = new DianEff(this.friendscene, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause || FriendList.isLookStage) {
            return;
        }
        var btn = evt.currentTarget;
        if (btn) {
            var btnid = parseInt(btn.name);
            this.huanxingIndex = btnid;
            if (!this.showhuanxingtishi) {
                this.drawHuanXingToast();
            }
            else {
                //发送消息给好友
                HlmyUtils.HlmyExecuteRecall(this.friendArrayList[this.huanxingIndex].friendl_gid, "你的好友在召唤你，现在回归会有5颗心奖励。");
            }
        }
    };
    FriendList.prototype.stealOther = function (evt) {
        var dianeff = new DianEff(this.friendscene, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause || FriendList.isLookStage) {
            return;
        }
        var btn = evt.currentTarget;
        if (btn) {
            var btnid = parseInt(btn.name);
            this.friend_index = btnid;
            var sendstealobj = { cmd: 106, player_token: GameUtils.playerToken, friend_id: this.friendArrayList[btnid].friendl_friend_id, return_json: 1 };
            NetWorkUtils.sendNetPostRequest(sendstealobj, this.getStealOtherComplete, this.onPostIOError, this.friendscene, this);
        }
    };
    FriendList.prototype.getStealOtherComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_106.k", event);
        if (obj.result == 0) {
            var tishi = new DrawUtils();
            tishi.createGoToShareTishi("coverimg_json", "tishikuang1", obj.info, this.friendscene);
            this.friendscene.addChild(tishi);
        }
        else {
            var tishi = new DrawUtils();
            tishi.createMoveTishi(obj.info);
            this.friendscene.addChild(tishi);
            NetWorkUtils.sendSimpleNetPostRequest(100, this.getPlayerComplete, this.onPostIOError, this, this);
            //发送消息给好友
            HlmyUtils.HlmyExecuteSendMsg(this.friendArrayList[this.friend_index].friendl_gid, "偷偷摸了你一下，快点摸回来~");
        }
    };
    FriendList.prototype.getPlayerComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_100.k", event);
        if (obj.player) {
            GameUtils.playerBean = new PlayerBean(obj);
        }
    };
    FriendList.prototype.onPostIOError = function (event) {
        FriendList.isLookStage = false;
        NetWorkUtils.clearNetLoading();
    };
    return FriendList;
}(egret.DisplayObjectContainer));
__reflect(FriendList.prototype, "FriendList");
//# sourceMappingURL=FriendList.js.map