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
var DrawUtils = (function (_super) {
    __extends(DrawUtils, _super);
    function DrawUtils() {
        return _super.call(this) || this;
    }
    DrawUtils.prototype.createBtn = function (Sheetname, upData, downData, dispatcher) {
        this._downImg = new egret.Bitmap();
        this._upImg = new egret.Bitmap();
        var result = RES.getRes(Sheetname);
        this._downImg.texture = result.getTexture(downData);
        this._upImg.texture = result.getTexture(upData);
        this._dispatcher = dispatcher;
        this.addChild(this._downImg);
        this.addChild(this._upImg);
        this._downImg.visible = false;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.upHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.upHandler, this);
    };
    DrawUtils.prototype.createBtnId = function (id, Sheetname, upData, downData, dispatcher) {
        this.btnid = id;
        this._downImg = new egret.Bitmap();
        this._upImg = new egret.Bitmap();
        var result = RES.getRes(Sheetname);
        this._downImg.texture = result.getTexture(downData);
        this._upImg.texture = result.getTexture(upData);
        this._dispatcher = dispatcher;
        this.addChild(this._downImg);
        this.addChild(this._upImg);
        this._downImg.visible = false;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.upHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.upHandler, this);
    };
    DrawUtils.prototype.downHandler = function (evt) {
        this._downImg.visible = true;
        this._upImg.visible = false;
    };
    DrawUtils.prototype.upHandler = function (evt) {
        this._downImg.visible = false;
        this._upImg.visible = true;
    };
    DrawUtils.prototype.touchTapHandler = function (evt) {
        this._dispatcher.dispatchEventWith("startGame");
    };
    DrawUtils.prototype.createTishiLayer = function () {
        this.tishi_index = 0;
        this.layer = new egret.Sprite();
        this.layer.graphics.beginFill(0x000000, 1);
        this.layer.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H - 82);
        this.layer.graphics.endFill();
        this.layer.width = GameUtils.SCREEN_W;
        this.layer.height = GameUtils.SCREEN_H - 82;
        this.layer.alpha = 0.0;
        this.addChild(this.layer);
        this.layer.touchEnabled = true;
    };
    DrawUtils.prototype.createTishiKuang = function (Sheetname, kuangname, str1, str0, istextflow, iscenter, isbtn) {
        var tishi = new egret.TextField();
        tishi.x = 30;
        tishi.y = 40;
        tishi.textColor = 0xff0000;
        tishi.size = GameUtils.TEXT_SIZE_MIDDLE;
        if (!istextflow) {
            tishi.text = str0;
        }
        else {
            tishi.textFlow = str1;
        }
        tishi.lineSpacing = 5;
        if (iscenter) {
            tishi.textAlign = egret.HorizontalAlign.CENTER;
        }
        tishi.verticalAlign = egret.VerticalAlign.MIDDLE;
        tishi.width = 340;
        var kuang_w = 400;
        var kuang_h = 220;
        if (tishi.textHeight > 140) {
            kuang_h = tishi.height + 80;
            tishi.height = tishi.height;
        }
        else {
            tishi.height = 140;
        }
        this.buyspr = new egret.Sprite();
        this.buyspr.alpha = 0;
        this.buyspr.scaleX = 0.02;
        this.buyspr.scaleY = 0.02;
        this.buyspr.x = (GameUtils.SCREEN_W) / 2;
        this.buyspr.y = (GameUtils.SCREEN_H) / 2;
        this.buyspr.width = kuang_w;
        this.buyspr.height = kuang_h;
        this.buyspr.anchorOffsetX = kuang_w / 2;
        this.buyspr.anchorOffsetY = kuang_h / 2;
        this.addChild(this.buyspr);
        var tw = egret.Tween.get(this.buyspr);
        tw.to({ alpha: 1, scaleX: 1.3, scaleY: 1.3 }, 300).
            to({ alpha: 1, scaleX: 1, scaleY: 1 }, 100);
        this.kuang = new egret.Bitmap();
        var imgsheet = RES.getRes(Sheetname);
        this.kuang.texture = imgsheet.getTexture(kuangname);
        this.kuang.x = 0;
        this.kuang.y = 0;
        this.buyspr.addChild(this.kuang);
        var bgrect = new egret.Rectangle(34, 34, 34, 34);
        this.kuang.scale9Grid = bgrect;
        this.kuang.width = kuang_w;
        this.kuang.height = kuang_h + 20;
        this.buyspr.addChild(tishi);
        if (isbtn) {
            var okbtn = new egret.Bitmap();
            var imgsheet = RES.getRes(Sheetname);
            okbtn.texture = imgsheet.getTexture("ok1");
            okbtn.x = (kuang_w - 124) / 2;
            okbtn.y = kuang_h - 10;
            this.buyspr.addChild(okbtn);
        }
    };
    DrawUtils.prototype.createTishiOption = function (Sheetname, kuangname, str0) {
        this.createTishiLayer();
        this.layer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clearTishi, this);
        this.createTishiKuang(Sheetname, kuangname, str0, "", true, true, false);
    };
    DrawUtils.prototype.createTiaoZhuanTishi = function (Sheetname, kuangname, str0, tiaozhuan, thisObj) {
        this.createTishiLayer();
        this.layer.addEventListener(egret.TouchEvent.TOUCH_TAP, tiaozhuan, thisObj);
        var strarr;
        this.createTishiKuang(Sheetname, kuangname, strarr, str0, false, true, true);
    };
    DrawUtils.prototype.createGoToShareTishi = function (Sheetname, kuangname, str0, thisObj) {
        this.anyScene = thisObj;
        this.createTishiLayer();
        this.layer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clearGotoShareTishi, this);
        var strarr;
        this.createTishiKuang(Sheetname, kuangname, strarr, str0, false, true, true);
    };
    DrawUtils.prototype.createTishi = function (Sheetname, kuangname, str0) {
        this.createTishiLayer();
        this.layer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clearTishi, this);
        var strarr;
        this.createTishiKuang(Sheetname, kuangname, strarr, str0, false, true, true);
    };
    DrawUtils.prototype.createDesTishi = function (Sheetname, kuangname, str0) {
        this.createTishiLayer();
        this.layer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clearTishi, this);
        var strarr;
        this.createTishiKuang(Sheetname, kuangname, strarr, str0, false, false, false);
    };
    DrawUtils.prototype.createGiftTishi = function (Sheetname, kuangname, str0, result) {
        this.createTishiLayer();
        this.layer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clearTishi, this);
        var toast = new egret.TextField();
        toast.x = 30;
        toast.y = 130;
        toast.textColor = 0x000000;
        toast.size = GameUtils.TEXT_SIZE_MIDDLE;
        toast.text = str0;
        toast.lineSpacing = 5;
        toast.textAlign = egret.HorizontalAlign.CENTER;
        toast.verticalAlign = egret.VerticalAlign.MIDDLE;
        toast.width = 340;
        toast.height = toast.measuredHeight;
        var kuang_w = 400;
        var kuang_h = 185 + toast.height;
        this.buyspr = new egret.Sprite();
        this.buyspr.alpha = 0;
        this.buyspr.scaleX = 0.02;
        this.buyspr.scaleY = 0.02;
        this.buyspr.x = (GameUtils.SCREEN_W) / 2;
        this.buyspr.y = (GameUtils.SCREEN_H) / 2;
        this.buyspr.width = kuang_w;
        this.buyspr.height = kuang_h;
        this.buyspr.anchorOffsetX = kuang_w / 2;
        this.buyspr.anchorOffsetY = kuang_h / 2;
        this.addChild(this.buyspr);
        var tw = egret.Tween.get(this.buyspr);
        tw.to({ alpha: 1, scaleX: 1.3, scaleY: 1.3 }, 300).
            to({ alpha: 1, scaleX: 1, scaleY: 1 }, 100);
        var imgsheet = RES.getRes(Sheetname);
        this.kuang = new egret.Bitmap();
        this.kuang.texture = imgsheet.getTexture(kuangname);
        this.kuang.x = 0;
        this.kuang.y = 0;
        this.buyspr.addChild(this.kuang);
        var bgrect = new egret.Rectangle(34, 34, 34, 34);
        this.kuang.scale9Grid = bgrect;
        this.kuang.width = kuang_w;
        this.kuang.height = kuang_h + 20;
        this.buyspr.addChild(toast);
        var des1 = new egret.TextField();
        des1.x = 0;
        des1.y = 50;
        des1.textColor = 0x000000;
        des1.size = GameUtils.TEXT_SIZE_MIDDLE;
        if (result == 1) {
            des1.text = "领取成功\n恭喜你获得:";
        }
        else {
            des1.text = "每天只能领取一次哦\n你今天已经领取过：";
        }
        des1.lineSpacing = 5;
        des1.width = 400;
        des1.height = 65;
        des1.textAlign = egret.HorizontalAlign.CENTER;
        des1.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.buyspr.addChild(des1);
        var des2 = new egret.TextField();
        des2.x = 0;
        des2.y = 145 + toast.height;
        des2.textColor = 0x000000;
        des2.size = GameUtils.TEXT_SIZE_SMALL;
        des2.text = "记得明天继续到\n" + GameUtils.channelStr + "礼包中心领取新的礼物哦！";
        des2.lineSpacing = 5;
        des2.width = 400;
        des2.height = 50;
        des2.textAlign = egret.HorizontalAlign.CENTER;
        des2.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.buyspr.addChild(des2);
        var title = new egret.Bitmap();
        var imgsheet = RES.getRes(Sheetname);
        title.texture = imgsheet.getTexture("gifttitle");
        title.x = (kuang_w - 232) / 2;
        title.y = -10;
        this.buyspr.addChild(title);
        var okbtn = new egret.Bitmap();
        var imgsheet = RES.getRes(Sheetname);
        okbtn.texture = imgsheet.getTexture("closemenu");
        okbtn.x = kuang_w - 40;
        okbtn.y = -20;
        this.buyspr.addChild(okbtn);
    };
    DrawUtils.prototype.createTriggerToast = function (Sheetname, str0, type, toastnum) {
        this.toastIndex = 0;
        this.toastNum = toastnum;
        this.layer = new egret.Sprite();
        this.layer.graphics.beginFill(0x000000, 1);
        this.layer.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H);
        this.layer.graphics.endFill();
        this.layer.alpha = 0.7;
        this.addChild(this.layer);
        this.layer.touchEnabled = true;
        this.layer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clearTriggerToast, this);
        var kuang_w = 338;
        var kuang_h = 162;
        this.buyspr = new egret.Sprite();
        this.buyspr.alpha = 0;
        this.buyspr.scaleX = 0.02;
        this.buyspr.scaleY = 0.02;
        this.buyspr.x = (GameUtils.SCREEN_W) / 2;
        this.buyspr.y = (GameUtils.SCREEN_H) / 2 - 80;
        this.buyspr.width = kuang_w;
        this.buyspr.height = kuang_h;
        this.buyspr.anchorOffsetX = kuang_w / 2;
        this.buyspr.anchorOffsetY = kuang_h / 2;
        this.addChild(this.buyspr);
        var tw = egret.Tween.get(this.buyspr);
        tw.to({ alpha: 1, scaleX: 1.3, scaleY: 1.3 }, 300).
            to({ alpha: 1, scaleX: 1, scaleY: 1 }, 100);
        this.kuang = new egret.Bitmap();
        var imgsheet = RES.getRes(Sheetname);
        this.kuang.texture = imgsheet.getTexture("targetkuang");
        this.kuang.x = 0;
        this.kuang.y = -40;
        this.buyspr.addChild(this.kuang);
        var title = new egret.Bitmap();
        var titlesheet = RES.getRes(Sheetname);
        if (type == 1) {
            title.texture = titlesheet.getTexture("targettype_0");
        }
        else if (type == 3) {
            title.texture = titlesheet.getTexture("targettype_1");
        }
        title.x = -50;
        title.y = -5;
        this.buyspr.addChild(title);
        var tishi = new egret.TextField();
        tishi.x = 45;
        tishi.y = 50 - 40;
        tishi.textColor = 0xff0000;
        tishi.size = GameUtils.TEXT_SIZE_MIDDLE;
        tishi.text = str0;
        tishi.textAlign = egret.HorizontalAlign.CENTER;
        tishi.verticalAlign = egret.VerticalAlign.MIDDLE;
        tishi.width = 270;
        tishi.height = 62;
        this.buyspr.addChild(tishi);
        var lockstr = "解锁事件：";
        if (type == 1) {
            lockstr = "解锁事件：";
        }
        else if (type == 3) {
            lockstr = "解锁结局：";
        }
        this.shareDes = lockstr + str0;
        if (GameUtils.noFacialRecognition && GameUtils.channelStr == "玩吧") {
            var congratulation = new egret.TextField();
            congratulation.x = 0;
            congratulation.y = 130;
            congratulation.textColor = 0xffffff;
            congratulation.size = GameUtils.TEXT_SIZE_MIDDLE;
            congratulation.text = "恭喜你解锁了新形象！\n快来试一试有惊喜~";
            congratulation.textAlign = egret.HorizontalAlign.CENTER;
            congratulation.width = kuang_w;
            congratulation.lineSpacing = 4;
            this.buyspr.addChild(congratulation);
            var btnface = new egret.Bitmap();
            btnface.texture = titlesheet.getTexture("btnface_trigger");
            btnface.x = 87;
            btnface.y = 230;
            this.buyspr.addChild(btnface);
            btnface.touchEnabled = true;
            btnface.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnFace, this);
        }
        else {
            if (!GameUtils.noShare || !GameUtils.noYaoQing) {
                var btnshare = new egret.Bitmap();
                btnshare.texture = titlesheet.getTexture("btnshare_trigger");
                btnshare.x = 87;
                btnshare.y = 150;
                this.buyspr.addChild(btnshare);
                btnshare.touchEnabled = true;
                btnshare.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnshare, this);
            }
        }
    };
    DrawUtils.prototype.btnFace = function (evt) {
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
    DrawUtils.prototype.btnshare = function (evt) {
        if (GameUtils.gameSandPause) {
            return;
        }
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        HlmyUtils.HlmySetShareInfo({ "state": GameUtils.MYAPPKEY_1758, "tipInfo": true, "reward": this.shareDes, "appKey": GameUtils.APPKEY_1758, "gid": GameUtils.playerGid });
    };
    DrawUtils.prototype.drawRewards = function () {
        var kuang_w = 320;
        var kuang_h = 384;
        this.buyspr = new egret.Sprite();
        this.buyspr.alpha = 0;
        this.buyspr.scaleX = 0.02;
        this.buyspr.scaleY = 0.02;
        this.buyspr.x = (GameUtils.SCREEN_W) / 2;
        this.buyspr.y = (GameUtils.SCREEN_H) / 2;
        this.buyspr.width = kuang_w;
        this.buyspr.height = kuang_h;
        this.buyspr.anchorOffsetX = kuang_w / 2;
        this.buyspr.anchorOffsetY = kuang_h / 2;
        this.addChild(this.buyspr);
        var tw = egret.Tween.get(this.buyspr);
        tw.to({ alpha: 1, scaleX: 1.3, scaleY: 1.3 }, 300).
            to({ alpha: 1, scaleX: 1, scaleY: 1 }, 100);
        var bg = new egret.Bitmap();
        var bgsheet = RES.getRes("huodong_json");
        bg.texture = bgsheet.getTexture("rewards_bg");
        bg.x = 0;
        bg.y = 0;
        this.buyspr.addChild(bg);
        var id = GameUtils.rewardsList.length - this.toastNum;
        if (GameUtils.rewardsList[id]) {
            if (GameUtils.rewardsList[id].rewards_bitdata) {
                var bitdata = GameUtils.rewardsList[id].rewards_bitdata;
                var texture = new egret.Texture();
                texture.bitmapData = bitdata;
                var icon = new egret.Bitmap(texture);
                icon.scaleX = 1.3;
                icon.scaleY = 1.3;
                icon.x = kuang_w / 2;
                icon.y = kuang_h / 2;
                icon.anchorOffsetX = bitdata.width / 2;
                icon.anchorOffsetY = bitdata.height / 2;
                this.buyspr.addChild(icon);
            }
            if (GameUtils.rewardsList[id].rewards_type) {
                var typestr = "发型";
                switch (GameUtils.rewardsList[id].rewards_type) {
                    case 10:
                        typestr = "发型";
                        break;
                    case 20:
                        typestr = "妆容";
                        break;
                    case 30:
                        typestr = "外套";
                        break;
                    case 80:
                        typestr = "连衣裙";
                        break;
                    case 40:
                        typestr = "上衣";
                        break;
                    case 50:
                        typestr = "下装";
                        break;
                    case 60:
                        typestr = "袜子";
                        break;
                    case 70:
                        typestr = "鞋子";
                        break;
                }
                var type = new egret.TextField();
                type.x = 0;
                type.y = 257;
                type.textColor = 0xffffff;
                type.size = GameUtils.TEXT_SIZE_MIDDLE;
                type.text = typestr;
                type.textAlign = egret.HorizontalAlign.CENTER;
                type.verticalAlign = egret.VerticalAlign.MIDDLE;
                type.width = kuang_w;
                type.height = 35;
                this.buyspr.addChild(type);
            }
            if (GameUtils.rewardsList[id].rewards_name) {
                var name = new egret.TextField();
                name.x = 0;
                name.y = 307;
                name.textColor = 0xffffff;
                name.size = GameUtils.TEXT_SIZE_MIDDLE;
                name.text = GameUtils.rewardsList[id].rewards_name;
                name.textAlign = egret.HorizontalAlign.CENTER;
                name.verticalAlign = egret.VerticalAlign.MIDDLE;
                name.width = kuang_w;
                name.height = 35;
                this.buyspr.addChild(name);
            }
        }
    };
    DrawUtils.prototype.clearTriggerToast = function (evt) {
        if (GameUtils.gameSandPause) {
            return;
        }
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        this.toastNum--;
        if (this.toastNum <= 0) {
            this.toastNum == 0;
            this.clearTishiLayer();
        }
        else {
            if (this.buyspr) {
                this.buyspr.removeChildren();
                if (this.buyspr.parent) {
                    this.buyspr.parent.removeChild(this.buyspr);
                }
            }
            this.drawRewards();
        }
    };
    DrawUtils.prototype.createMoveTishi = function (str0) {
        this.tishi_index = 0;
        this.layer = new egret.Sprite();
        this.addChild(this.layer);
        var tishi = new egret.TextField();
        tishi.x = 0;
        tishi.y = GameUtils.SCREEN_H - 500;
        tishi.textColor = 0x00ff00;
        tishi.size = GameUtils.TEXT_SIZE_SMALL;
        tishi.text = str0;
        tishi.textAlign = egret.HorizontalAlign.CENTER;
        tishi.verticalAlign = egret.VerticalAlign.MIDDLE;
        tishi.width = GameUtils.SCREEN_W;
        tishi.height = 36;
        var kuang_w = tishi.textWidth + 30;
        var kuang_x = (GameUtils.SCREEN_W - kuang_w) / 2;
        var kuang_y = GameUtils.SCREEN_H - 500;
        this.layer.graphics.beginFill(0x000000, 1);
        this.layer.graphics.drawRect(kuang_x, kuang_y, kuang_w, 36);
        this.layer.graphics.endFill();
        this.layer.width = GameUtils.SCREEN_W;
        this.layer.height = 36;
        this.layer.addChild(tishi);
        var tw = egret.Tween.get(this.layer);
        tw.to({ y: -70 }, 800)
            .to({ y: -140, alpha: 0.3 }, 800).call(function () {
            if (this.layer) {
                this.layer.removeChildren();
                if (this.layer.parent) {
                    this.layer.parent.removeChild(this.layer);
                }
            }
        }, this);
    };
    DrawUtils.prototype.createBianCeTishi = function (Sheetname, kuangname) {
        this.tishi_index = 0;
        this.layer = new egret.Sprite();
        this.layer.graphics.beginFill(0x000000, 1);
        this.layer.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H - 82);
        this.layer.graphics.endFill();
        this.layer.width = GameUtils.SCREEN_W;
        this.layer.height = GameUtils.SCREEN_H - 82;
        this.layer.alpha = 0.3;
        this.addChild(this.layer);
        this.layer.touchEnabled = true;
        this.layer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clearTishi, this);
        var kuang_w = 252;
        var kuang_h = 268;
        this.buyspr = new egret.Sprite();
        this.buyspr.alpha = 0;
        this.buyspr.scaleX = 0.02;
        this.buyspr.scaleY = 0.02;
        this.buyspr.x = (GameUtils.SCREEN_W) / 2;
        this.buyspr.y = (GameUtils.SCREEN_H) / 2;
        this.buyspr.width = kuang_w;
        this.buyspr.height = kuang_h;
        this.buyspr.anchorOffsetX = kuang_w / 2;
        this.buyspr.anchorOffsetY = kuang_h / 2;
        this.addChild(this.buyspr);
        var tw = egret.Tween.get(this.buyspr);
        tw.to({ alpha: 1, scaleX: 1.3, scaleY: 1.3 }, 300).
            to({ alpha: 1, scaleX: 1, scaleY: 1 }, 100);
        this.kuang = new egret.Bitmap();
        var imgsheet = RES.getRes(Sheetname);
        this.kuang.texture = imgsheet.getTexture(kuangname);
        this.kuang.x = 0;
        this.kuang.y = 0;
        this.buyspr.addChild(this.kuang);
        var okbtn = new egret.Bitmap();
        var imgsheet = RES.getRes("coverimg_json");
        okbtn.texture = imgsheet.getTexture("ok1");
        okbtn.x = (kuang_w - 124) / 2;
        okbtn.y = kuang_h - 17;
        this.buyspr.addChild(okbtn);
    };
    DrawUtils.prototype.clearGotoShareTishi = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        this.clearTishiLayer();
        if (!GameUtils.noYaoQing) {
            this.anyScene.showSharList();
        }
    };
    DrawUtils.prototype.clearTishi = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        this.clearTishiLayer();
    };
    DrawUtils.prototype.clearTishiLayer = function () {
        this.buyspr.touchEnabled = false;
        var tw = egret.Tween.get(this.buyspr);
        tw.to({ scaleX: 1.3, scaleY: 1.3 }, 100).
            to({ alpha: 0.1, scaleX: 0.1, scaleY: 0.1 }, 300).call(function () {
            if (this.layer) {
                if (this.layer.parent) {
                    this.layer.parent.removeChild(this.layer);
                }
            }
            if (this.buyspr) {
                this.buyspr.removeChildren();
                if (this.buyspr.parent) {
                    this.buyspr.parent.removeChild(this.buyspr);
                }
            }
        }, this);
    };
    DrawUtils.prototype.tishiOut = function (event) {
        this.tishi_index++;
        if (this.tishi_index > 50) {
            if (this.buyspr) {
                this.buyspr.alpha -= 0.03;
                if (this.buyspr.alpha < 0) {
                    this.buyspr.removeChildren();
                    if (this.buyspr.parent) {
                        this.buyspr.removeEventListener(egret.Event.ENTER_FRAME, this.tishiOut, this);
                        this.buyspr.parent.removeChild(this.buyspr);
                    }
                }
            }
        }
    };
    DrawUtils.prototype.drawShare = function () {
        this.createTime();
        var gameimgSheet = RES.getRes("gameimg_json");
        var coverimgSheet = RES.getRes("coverimg_json");
        this.sharelayer = new egret.Sprite();
        this.addChild(this.sharelayer);
        var share_sh = new egret.Shape;
        share_sh.graphics.beginFill(0x000000, 1);
        share_sh.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H);
        share_sh.graphics.endFill();
        share_sh.alpha = 0.7;
        this.sharelayer.addChild(share_sh);
        share_sh.touchEnabled = true;
        var bg_H = 300;
        var bg_h = (GameUtils.SCREEN_H - bg_H) / 2;
        var sharebg = new egret.Bitmap();
        sharebg.texture = gameimgSheet.getTexture("helpbg");
        sharebg.x = 30;
        sharebg.y = bg_h;
        this.sharelayer.addChild(sharebg);
        var bgrect = new egret.Rectangle(34, 34, 34, 34);
        sharebg.scale9Grid = bgrect;
        sharebg.width = GameUtils.SCREEN_W - 60;
        sharebg.height = bg_H;
        var sharetitle = new egret.Bitmap();
        sharetitle.texture = gameimgSheet.getTexture("sharetitle");
        sharetitle.x = 40;
        sharetitle.y = bg_h - 30;
        this.sharelayer.addChild(sharetitle);
        var closeshare = new egret.Bitmap();
        closeshare.texture = coverimgSheet.getTexture("closemenu");
        closeshare.x = GameUtils.SCREEN_W - 80;
        closeshare.y = bg_h - 30;
        this.sharelayer.addChild(closeshare);
        closeshare.touchEnabled = true;
        closeshare.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeshare, this);
        var strelement = [
            { text: "每日发送给朋友或", style: { "textColor": 0xffffff, "size": 30 } },
            { text: "群", style: { "textColor": 0x57fac1, "size": 32 } },
            { text: "，立即获得", style: { "textColor": 0xffffff, "size": 30 } },
            { text: "XX", style: { "size": 20 } },
            { text: "奖励。", style: { "textColor": 0xffffff, "size": 30 } }
        ];
        var str_text = "";
        var img_x = 0;
        var img_y = 0;
        for (var i = 0; i < strelement.length; i++) {
            str_text += strelement[i].text;
            if (strelement[i].text == "XX") {
                strelement[i].text = "       ";
                for (var j = 0; j < i; j++) {
                    for (var a = 0; a < strelement[j].text.length; a++) {
                        img_x += strelement[j].style.size;
                        if (img_x > (GameUtils.SCREEN_W - 100)) {
                            img_x = strelement[j].style.size;
                            img_y += 30;
                        }
                    }
                }
            }
        }
        var icon = new egret.Bitmap();
        icon.texture = gameimgSheet.getTexture("tili1");
        icon.x = 50 + img_x + 2;
        icon.y = bg_h + 50 + img_y + 4;
        this.sharelayer.addChild(icon);
        var description = new egret.TextField();
        description.x = 50;
        description.y = bg_h + 50;
        description.textColor = 0xffffff;
        description.textFlow = strelement;
        description.width = GameUtils.SCREEN_W - 100;
        description.lineSpacing = 5;
        this.sharelayer.addChild(description);
        var sharebtn = new egret.Bitmap();
        sharebtn.texture = gameimgSheet.getTexture("sharebtn");
        sharebtn.x = (GameUtils.SCREEN_W - 156) / 2;
        sharebtn.y = bg_h + bg_H - 20 - 52;
        this.sharelayer.addChild(sharebtn);
        sharebtn.touchEnabled = true;
        sharebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sharebtn, this);
        var count = GameUtils.shareListBean.share_count < GameUtils.shareListBean.share_limit ? GameUtils.shareListBean.share_count : GameUtils.shareListBean.share_limit;
        var nowDate = new Date();
        //                        console.log(nowDate.getTime());
        var time_num = GameUtils.shareListBean.share_interval - (nowDate.getTime() - GameUtils.shareListBean.share_time);
        //                console.log(nowDate.getTime() - GameUtils.sharelistbean.share_time);
        //                console.log(time_num);
        var timestr = "";
        var timedes_1 = "";
        if (time_num > 0 && GameUtils.shareListBean.share_count > 0 && GameUtils.shareListBean.share_count < GameUtils.shareListBean.share_limit) {
            timestr = this.MillisecondToDate(time_num) + "";
            timedes_1 = " 后分享 ";
        }
        this.timeTF = new egret.TextField();
        this.timeTF.x = 50;
        this.timeTF.y = bg_h + 150;
        this.timeTF.textColor = 0xffffff;
        this.timeTF.size = GameUtils.TEXT_SIZE_MIDDLE;
        this.timeTF.text = timestr;
        this.sharelayer.addChild(this.timeTF);
        this.timedesTF_1 = new egret.TextField();
        this.timedesTF_1.x = 50 + this.timeTF.textWidth;
        this.timedesTF_1.y = bg_h + 150;
        this.timedesTF_1.textColor = 0x57fac1;
        this.timedesTF_1.size = GameUtils.TEXT_SIZE_MIDDLE;
        this.timedesTF_1.text = timedes_1;
        this.sharelayer.addChild(this.timedesTF_1);
        this.timedesTF_2 = new egret.TextField();
        this.timedesTF_2.x = 50 + this.timeTF.textWidth + this.timedesTF_1.textWidth;
        this.timedesTF_2.y = bg_h + 150;
        this.timedesTF_2.textColor = 0xffffff;
        this.timedesTF_2.size = GameUtils.TEXT_SIZE_MIDDLE;
        this.timedesTF_2.text = "奖励：";
        this.sharelayer.addChild(this.timedesTF_2);
        this.timetili_icon = new egret.Bitmap();
        this.timetili_icon.texture = gameimgSheet.getTexture("tili1");
        this.timetili_icon.x = 50 + this.timeTF.textWidth + this.timedesTF_1.textWidth + this.timedesTF_2.textWidth;
        this.timetili_icon.y = bg_h + 150;
        this.sharelayer.addChild(this.timetili_icon);
        var reward = GameUtils.shareListBean.share_reward;
        this.reward_arr = reward.split(",");
        var reward_index = count;
        if (reward_index >= GameUtils.shareListBean.share_limit) {
            reward_index = GameUtils.shareListBean.share_limit - 1;
        }
        this.timedesTF_3 = new egret.TextField();
        this.timedesTF_3.x = 50 + this.timeTF.textWidth + this.timedesTF_1.textWidth + this.timedesTF_2.textWidth + 35;
        this.timedesTF_3.y = bg_h + 150;
        this.timedesTF_3.textColor = 0xff0000;
        this.timedesTF_3.size = GameUtils.TEXT_SIZE_MIDDLE;
        this.timedesTF_3.text = "+" + parseInt(this.reward_arr[reward_index]);
        this.sharelayer.addChild(this.timedesTF_3);
    };
    DrawUtils.prototype.createTime = function () {
        //创建一个计时器对象
        this.shareTime = new egret.Timer(1000, GameUtils.shareListBean.share_interval / 1000);
        //注册事件侦听器
        this.shareTime.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.shareTime.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        //开始计时
        this.shareTime.start();
    };
    DrawUtils.prototype.removeShareTime = function () {
        if (this.shareTime.hasEventListener(egret.TimerEvent.TIMER)) {
            this.shareTime.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        }
        if (this.shareTime.hasEventListener(egret.TimerEvent.TIMER_COMPLETE)) {
            this.shareTime.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        }
        this.shareTime.stop();
        this.shareTime.reset();
    };
    DrawUtils.prototype.setTimeTextPosition = function () {
        this.timedesTF_1.x = 50 + this.timeTF.textWidth;
        this.timedesTF_2.x = 50 + this.timeTF.textWidth + this.timedesTF_1.textWidth;
        this.timetili_icon.x = 50 + this.timeTF.textWidth + this.timedesTF_1.textWidth + this.timedesTF_2.textWidth;
        var count = GameUtils.shareListBean.share_count < GameUtils.shareListBean.share_limit ? GameUtils.shareListBean.share_count : GameUtils.shareListBean.share_limit;
        var reward_index = count;
        if (reward_index >= GameUtils.shareListBean.share_limit) {
            reward_index = GameUtils.shareListBean.share_limit - 1;
        }
        this.timedesTF_3.text = "+" + parseInt(this.reward_arr[reward_index]);
        this.timedesTF_3.x = 50 + this.timeTF.textWidth + this.timedesTF_1.textWidth + this.timedesTF_2.textWidth + 35;
    };
    DrawUtils.prototype.timerFunc = function () {
        var nowDate = new Date();
        var time_num = GameUtils.shareListBean.share_interval - (nowDate.getTime() - GameUtils.shareListBean.share_time);
        var timestr = "";
        var timedes_1 = "";
        if (time_num > 0 && GameUtils.shareListBean.share_count > 0 && GameUtils.shareListBean.share_count < GameUtils.shareListBean.share_limit) {
            this.timeTF.text = this.MillisecondToDate(time_num) + "";
            this.timedesTF_1.text = " 后分享 ";
        }
        else {
            this.timeTF.text = timestr;
            this.timedesTF_1.text = timedes_1;
        }
        this.setTimeTextPosition();
    };
    DrawUtils.prototype.timerComFunc = function () {
        if (this.shareTime.hasEventListener(egret.TimerEvent.TIMER)) {
            this.shareTime.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        }
        if (this.shareTime.hasEventListener(egret.TimerEvent.TIMER_COMPLETE)) {
            this.shareTime.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        }
        this.shareTime.stop();
        this.shareTime.reset();
        this.timeTF.text = "";
        this.timedesTF_1.text = "";
        this.setTimeTextPosition();
    };
    DrawUtils.prototype.MillisecondToDate = function (msd) {
        var time = "";
        var hours = msd / 1000 / 60 / 60;
        var hoursRound = Math.floor(hours);
        if (hoursRound > 0) {
            time += hoursRound + "小时";
        }
        var minutes = msd / 1000 / 60 - (60 * hoursRound);
        var minutesRound = Math.floor(minutes);
        if (hoursRound > 0 || minutesRound > 0) {
            time += minutesRound + "分";
        }
        var seconds = msd / 1000 - (60 * 60 * hoursRound) - (60 * minutesRound);
        var secondsRound = Math.floor(seconds);
        time += secondsRound + "秒";
        return time;
    };
    DrawUtils.prototype.drawShareList = function () {
        var gameimgSheet = RES.getRes("gameimg_json");
        var coverimgSheet = RES.getRes("coverimg_json");
        this.sharelayer = new egret.Sprite();
        this.addChild(this.sharelayer);
        var share_sh = new egret.Shape;
        share_sh.graphics.beginFill(0x000000, 1);
        share_sh.graphics.drawRect(0, 0, GameUtils.SCREEN_W, GameUtils.SCREEN_H);
        share_sh.graphics.endFill();
        share_sh.alpha = 0.7;
        this.sharelayer.addChild(share_sh);
        share_sh.touchEnabled = true;
        var sharebg = new egret.Bitmap();
        sharebg.texture = gameimgSheet.getTexture("helpbg");
        sharebg.x = 30;
        sharebg.y = 50;
        this.sharelayer.addChild(sharebg);
        var bgrect = new egret.Rectangle(34, 34, 34, 34);
        sharebg.scale9Grid = bgrect;
        sharebg.width = GameUtils.SCREEN_W - 60;
        sharebg.height = GameUtils.SCREEN_H - 100;
        var sharetitle = new egret.Bitmap();
        sharetitle.texture = gameimgSheet.getTexture("yaoqingtitle");
        sharetitle.x = 40;
        sharetitle.y = 20;
        this.sharelayer.addChild(sharetitle);
        var closeshare = new egret.Bitmap();
        closeshare.texture = coverimgSheet.getTexture("closemenu");
        closeshare.x = GameUtils.SCREEN_W - 80;
        closeshare.y = 20;
        this.sharelayer.addChild(closeshare);
        closeshare.touchEnabled = true;
        closeshare.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeshare, this);
        var strelement = [
            { text: "每日发送给朋友或", style: { "textColor": 0xffffff, "size": 20 } },
            { text: "群", style: { "textColor": 0x57fac1, "size": 22 } },
            { text: "，立即获得", style: { "textColor": 0xffffff, "size": 20 } },
            { text: "XX", style: { "size": 20 } },
            { text: "奖励。只要有人通过您的邀请", style: { "textColor": 0xffffff, "size": 20 } },
            { text: "进入游戏", style: { "textColor": 0x57fac1, "size": 22 } },
            { text: "，您还可以获得额外邀请奖励。", style: { "textColor": 0xffffff, "size": 20 } }
        ];
        var str_text = "";
        var img_x = 0;
        var img_y = 0;
        for (var i = 0; i < strelement.length; i++) {
            str_text += strelement[i].text;
            if (strelement[i].text == "XX") {
                strelement[i].text = "        ";
                for (var j = 0; j < i; j++) {
                    img_x += strelement[j].text.length * strelement[j].style.size;
                }
            }
        }
        var icon = new egret.Bitmap();
        icon.texture = gameimgSheet.getTexture("tili1");
        icon.x = 50 + img_x + 2;
        icon.y = 80 + img_y - 2;
        this.sharelayer.addChild(icon);
        var description = new egret.TextField();
        description.x = 50;
        description.y = 80;
        description.textColor = 0xffffff;
        description.textFlow = strelement;
        description.width = GameUtils.SCREEN_W - 100;
        description.lineSpacing = 5;
        this.sharelayer.addChild(description);
        var sharelistbg = new egret.Bitmap();
        sharelistbg.texture = gameimgSheet.getTexture("propertybg1");
        sharelistbg.x = 40;
        sharelistbg.y = 160;
        this.sharelayer.addChild(sharelistbg);
        var bgrectlist = new egret.Rectangle(50, 50, 50, 50);
        sharelistbg.scale9Grid = bgrectlist;
        sharelistbg.width = GameUtils.SCREEN_W - 80;
        sharelistbg.height = GameUtils.SCREEN_H - 290;
        this.sharelist = new ShareList(this);
        this.sharelayer.addChild(this.sharelist);
        var myscrollView = new egret.ScrollView();
        myscrollView.setContent(this.sharelist);
        myscrollView.width = GameUtils.SCREEN_W - 100;
        myscrollView.height = GameUtils.SCREEN_H - 310;
        myscrollView.x = 50;
        myscrollView.y = 170;
        myscrollView.verticalScrollPolicy = "on";
        myscrollView.horizontalScrollPolicy = "off";
        this.sharelayer.addChild(myscrollView);
        var sharebtn = new egret.Bitmap();
        sharebtn.texture = gameimgSheet.getTexture("yaoqingbtn");
        sharebtn.x = (GameUtils.SCREEN_W - 156) / 2;
        sharebtn.y = GameUtils.SCREEN_H - 120;
        this.sharelayer.addChild(sharebtn);
        sharebtn.touchEnabled = true;
        sharebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sharebtn, this);
    };
    DrawUtils.prototype.sharebtn = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        var reward = new Array("每日分享可得：", "体力奖励", "若您的好友通过您的分享加入我们的", "游戏您还将获得更丰厚的奖励哦~", "更有免死金牌相送!!!");
        if (!GameUtils.noShare) {
            reward = new Array("每日分享可得：", "体力奖励");
        }
        if (!GameUtils.noYaoQing) {
            reward = new Array("每日分享可得：", "体力奖励", "若您的好友通过您的分享加入我们的", "游戏您还将获得更丰厚的奖励哦~", "更有免死金牌相送!!!");
        }
        HlmyUtils.HlmySetShareInfo({ "state": GameUtils.MYAPPKEY_1758, "tipInfo": true, "reward": reward, "appKey": GameUtils.APPKEY_1758, "gid": GameUtils.playerGid });
    };
    DrawUtils.prototype.closeshare = function (evt) {
        var dianeff = new DianEff(this, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        if (this.shareTime) {
            this.removeShareTime();
        }
        if (this.sharelist) {
            this.sharelist.removeShareListTime();
        }
        if (this.sharelayer) {
            this.sharelayer.removeChildren();
            if (this.sharelayer.parent) {
                this.sharelayer.parent.removeChild(this.sharelayer);
            }
        }
    };
    return DrawUtils;
}(egret.Sprite));
__reflect(DrawUtils.prototype, "DrawUtils");
//# sourceMappingURL=DrawUtils.js.map