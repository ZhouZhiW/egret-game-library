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
var BagList = (function (_super) {
    __extends(BagList, _super);
    function BagList(thisObj) {
        var _this = _super.call(this) || this;
        _this.iconname = new Array("shopicon0", "shopicon1", "shopicon2", "shopicon8", "shopicon3", "shopicon3", "shopicon3", "shopicon4", "shopicon4", "shopicon5", "shopicon6", "shopicon7", "shopicon7", "shopicon3", "shopicon4", "shopicon200", "shopicon201", "shopicon202", "shopicon203", "shopicon6");
        _this.iconid = new Array(3, 4, 15, 83, 24, 25, 26, 27, 28, 29, 30, 98, 99, 107, 108, 200, 201, 202, 203, 31);
        _this.shopscene = thisObj;
        _this.shopimgSheet = RES.getRes("shopimg_json");
        _this.init();
        return _this;
    }
    BagList.prototype.init = function () {
        var start_x = (GameUtils.SCREEN_W - 260 * 2) / 2;
        var kuang_W = 260;
        var kuang_H = 132;
        for (var i = 0; i < GameUtils.shopGoodsList.length; i++) {
            var shopbg1 = new egret.Bitmap();
            shopbg1.texture = this.shopimgSheet.getTexture("shopbg1");
            this.addChild(shopbg1);
            shopbg1.x = start_x + kuang_W * (i % 2);
            shopbg1.y = kuang_H * Math.floor(i / 2);
            var shopiconkuang = new egret.Bitmap();
            shopiconkuang.texture = this.shopimgSheet.getTexture("shopiconkuang");
            this.addChild(shopiconkuang);
            shopiconkuang.x = 20 + start_x + kuang_W * (i % 2);
            shopiconkuang.y = 48 + kuang_H * Math.floor(i / 2);
            var shopicon0 = new egret.Bitmap();
            shopicon0.texture = this.shopimgSheet.getTexture(this.getIconName(GameUtils.shopGoodsList[i].shopl_id));
            this.addChild(shopicon0);
            shopicon0.x = 23 + start_x + kuang_W * (i % 2);
            shopicon0.y = 51 + kuang_H * Math.floor(i / 2);
            if (GameUtils.shopGoodsList[i].shopl_discount == 1) {
                var remaistr = "shopremai";
                if (GameUtils.isShopDiscounts) {
                    remaistr = "shopremai_h";
                }
                var remai = new egret.Bitmap();
                remai.texture = this.shopimgSheet.getTexture(remaistr);
                this.addChild(remai);
                remai.x = 4 + start_x + kuang_W * (i % 2);
                remai.y = 33 + kuang_H * Math.floor(i / 2);
            }
            else if (GameUtils.shopGoodsList[i].shopl_discount == 2) {
                var dazhe = new egret.Bitmap();
                dazhe.texture = this.shopimgSheet.getTexture("shopdazhe");
                this.addChild(dazhe);
                dazhe.x = 4 + start_x + kuang_W * (i % 2);
                dazhe.y = 33 + kuang_H * Math.floor(i / 2);
            }
            else if (GameUtils.shopGoodsList[i].shopl_discount == 3) {
                var xianshi = new egret.Bitmap();
                xianshi.texture = this.shopimgSheet.getTexture("shopxianshi");
                this.addChild(xianshi);
                xianshi.x = 4 + start_x + kuang_W * (i % 2);
                xianshi.y = 33 + kuang_H * Math.floor(i / 2);
            }
            if (GameUtils.shopGoodsList[i].shopl_stack > 1) {
                var goodsdi = new egret.Bitmap();
                goodsdi.texture = this.shopimgSheet.getTexture("shopdijiao");
                this.addChild(goodsdi);
                goodsdi.x = 21 + start_x + kuang_W * (i % 2);
                goodsdi.y = 104 + kuang_H * Math.floor(i / 2);
                var goodsnum = new egret.BitmapText();
                goodsnum.font = RES.getRes("shopgoodsnum_fnt");
                this.addChild(goodsnum);
                goodsnum.text = "x" + GameUtils.shopGoodsList[i].shopl_stack;
                goodsnum.letterSpacing = 0;
                goodsnum.x = 16 + start_x + kuang_W * (i % 2);
                goodsnum.y = 48 + kuang_H * Math.floor(i / 2);
                goodsnum.width = 72;
                goodsnum.height = 72;
                goodsnum.textAlign = egret.HorizontalAlign.RIGHT;
                goodsnum.verticalAlign = egret.VerticalAlign.BOTTOM;
            }
            var btn = new egret.Bitmap();
            btn.texture = this.shopimgSheet.getTexture("shopbuybtn0");
            btn.name = "" + i;
            this.addChild(btn);
            btn.x = 130 + start_x + kuang_W * (i % 2);
            btn.y = 88 + kuang_H * Math.floor(i / 2);
            btn.touchEnabled = true;
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyBtn, this);
            // if (GameUtils.shopGoodsList[i].shopl_id == 31) {
            //     var chong: egret.TextField = new egret.TextField();
            //     chong.x = 130 + start_x + kuang_W * (i % 2);
            //     chong.y = 88 + kuang_H * Math.floor(i / 2);
            //     chong.textColor = 0x000000;
            //     chong.size = GameUtils.TEXT_SIZE_SMALL;
            //     chong.text = "去充值";
            //     chong.width = 98;
            //     chong.height = 36;
            //     chong.bold = true;
            //     this.addChild(chong);
            //     chong.textAlign = egret.HorizontalAlign.CENTER;
            //     chong.verticalAlign = egret.VerticalAlign.MIDDLE;
            // } else {
            var iconstr = "shopmoneyicon0";
            if (GameUtils.shopGoodsList[i].shopl_money_type == 10) {
                iconstr = "shopmoneyicon0";
            }
            else if (GameUtils.shopGoodsList[i].shopl_money_type == 11) {
                iconstr = "shopmoneyicon1";
            }
            else {
                iconstr = "shopmoneyicon2";
            }
            var shopmoneyicon = new egret.Bitmap();
            shopmoneyicon.texture = this.shopimgSheet.getTexture(iconstr);
            this.addChild(shopmoneyicon);
            shopmoneyicon.x = 140 + start_x + kuang_W * (i % 2);
            shopmoneyicon.y = 94 + kuang_H * Math.floor(i / 2);
            if (GameUtils.isMiansiDiscounts) {
                if (GameUtils.shopGoodsList[i].shopl_id == 99) {
                    var buynum1 = new egret.BitmapText();
                    buynum1.font = RES.getRes("shopnum_fnt");
                    this.addChild(buynum1);
                    buynum1.text = "" + GameUtils.miansipriceStr;
                    buynum1.letterSpacing = 0;
                    buynum1.x = 169 + start_x + kuang_W * (i % 2);
                    buynum1.y = 98 + kuang_H * Math.floor(i / 2);
                    var miansishare = new egret.Shape;
                    miansishare.graphics.beginFill(0xff0000, 1);
                    miansishare.graphics.drawRect(169 + start_x + kuang_W * (i % 2) - 4, 98 + kuang_H * Math.floor(i / 2) + 6, 30, 2);
                    miansishare.graphics.endFill();
                    this.addChild(miansishare);
                    var buynumText = new egret.TextField();
                    buynumText.x = 169 + start_x + kuang_W * (i % 2) + 30;
                    buynumText.y = 88 + kuang_H * Math.floor(i / 2);
                    buynumText.textColor = 0xff0000;
                    buynumText.size = 24;
                    buynumText.text = "" + GameUtils.shopGoodsList[i].shopl_price;
                    this.addChild(buynumText);
                    buynumText.height = 36;
                    buynumText.verticalAlign = egret.VerticalAlign.MIDDLE;
                }
                else {
                    var buynum = new egret.BitmapText();
                    buynum.font = RES.getRes("shopnum_fnt");
                    this.addChild(buynum);
                    buynum.text = "" + GameUtils.shopGoodsList[i].shopl_price;
                    buynum.letterSpacing = 0;
                    buynum.x = 169 + start_x + kuang_W * (i % 2);
                    buynum.y = 98 + kuang_H * Math.floor(i / 2);
                }
            }
            else {
                var buynum = new egret.BitmapText();
                buynum.font = RES.getRes("shopnum_fnt");
                this.addChild(buynum);
                buynum.text = "" + GameUtils.shopGoodsList[i].shopl_price;
                buynum.letterSpacing = 0;
                buynum.x = 169 + start_x + kuang_W * (i % 2);
                buynum.y = 98 + kuang_H * Math.floor(i / 2);
            }
            // }
            var name = new egret.TextField();
            name.x = start_x + kuang_W * (i % 2);
            name.y = kuang_H * Math.floor(i / 2);
            name.textColor = 0x69382b;
            name.size = 24;
            name.text = GameUtils.shopGoodsList[i].shopl_name;
            name.bold = true;
            name.width = 260;
            name.height = 33;
            this.addChild(name);
            name.textAlign = egret.HorizontalAlign.CENTER;
            name.verticalAlign = egret.VerticalAlign.MIDDLE;
            var value_1 = new egret.TextField();
            value_1.x = 130 + start_x + kuang_W * (i % 2) + 49;
            value_1.y = 61 + kuang_H * Math.floor(i / 2);
            value_1.size = 22;
            // value_1.textFlow = this.getFlowArr(GameUtils.shopGoodsList[i].shopl_description, GameUtils.shopGoodsList[i].shopl_id);
            value_1.text = GameUtils.shopGoodsList[i].shopl_description;
            value_1.anchorOffsetX = value_1.textWidth / 2;
            value_1.anchorOffsetY = value_1.textHeight / 2;
            this.addChild(value_1);
        }
    };
    BagList.prototype.getFlowArr = function (textstr, id) {
        var textelement_arr = new Array();
        if (textstr.indexOf("%") >= 0 && (id == 28 || id == 108)) {
            var position = textstr.indexOf("%");
            var text1 = textstr.substr(0, position - 2);
            var text2 = textstr.substr(position - 2, 3);
            var text3 = textstr.substr(position + 1, textstr.length - position - 1);
            textelement_arr.push({ text: text1, style: { "textColor": 0xffffff } });
            textelement_arr.push({ text: text2, style: { "textColor": 0xff0000 } });
            textelement_arr.push({ text: text3, style: { "textColor": 0xffffff } });
        }
        else {
            textelement_arr.push({ text: textstr, style: { "textColor": 0xffffff } });
        }
        return textelement_arr;
    };
    BagList.prototype.getIconName = function (id) {
        var str = "shopicon0";
        for (var i = 0; i < this.iconid.length; i++) {
            if (id == this.iconid[i]) {
                str = this.iconname[i];
            }
        }
        return str;
    };
    BagList.prototype.getGoodsName = function (id) {
        var str = "";
        for (var i = 0; i < GameUtils.shopModelList.length; i++) {
            if (id == GameUtils.shopModelList[i].shopm_id) {
                str = GameUtils.shopModelList[i].shopm_name;
            }
        }
        return str;
    };
    BagList.prototype.getGoodsDes = function (id) {
        var str = "";
        for (var i = 0; i < GameUtils.shopModelList.length; i++) {
            if (id == GameUtils.shopModelList[i].shopm_id) {
                str = GameUtils.shopModelList[i].shopm_description;
                str = str.replace("{}", "" + GameUtils.shopModelList[i].shopm_value);
            }
        }
        return str;
    };
    BagList.prototype.buyBtn = function (evt) {
        var dianeff = new DianEff(this.shopscene, evt.stageX, evt.stageY);
        if (GameUtils.gameSandPause) {
            return;
        }
        var btn = evt.currentTarget;
        if (btn) {
            var btnid = parseInt(btn.name);
            if (GameUtils.shopGoodsList[btnid].shopl_goods_type == 0) {
                this.mta_buybtn_id = btnid;
                var sendbuyobj = { cmd: 202, player_token: GameUtils.playerToken, item_id: GameUtils.shopGoodsList[btnid].shopl_id, return_json: 1 };
                NetWorkUtils.sendNetPostRequest(sendbuyobj, this.getBuyGoodsComplete, this.onPostIOError, this.shopscene, this);
            }
            else {
                if (GameUtils.shopGoodsList[btnid].shopl_item_code) {
                    this.mta_buybtn_id = btnid;
                    var sendpayobj = { cmd: 113, player_token: GameUtils.playerToken, item_id: GameUtils.shopGoodsList[btnid].shopl_id, hlmy_gw: GameUtils.hlmy_gw, return_json: 1 };
                    NetWorkUtils.sendNetPostRequest(sendpayobj, this.getPayGoodsComplete, this.onPostIOError, this.shopscene, this);
                }
            }
        }
    };
    BagList.prototype.getPayGoodsComplete = function (event) {
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
        }
        else {
            this.shopscene.drawTishi(obj.info);
        }
    };
    BagList.prototype.onPaySucceed = function () {
        NetWorkUtils.sendSimpleNetPostRequest(100, this.getPlayerComplete, this.onPostIOError, this.shopscene, this);
    };
    BagList.prototype.getBuyGoodsComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_202.k", event);
        if (obj.result == 1) {
            this.shopscene.drawTishi("购买成功\n" + obj.info);
            NetWorkUtils.sendSimpleNetPostRequest(100, this.getPlayerComplete, this.onPostIOError, this.shopscene, this);
        }
        else if (obj.result == 2) {
            this.shopscene.drawBianCeTishi();
            NetWorkUtils.sendSimpleNetPostRequest(100, this.getPlayerComplete, this.onPostIOError, this.shopscene, this);
        }
        else {
            this.shopscene.drawTishi(obj.info);
        }
    };
    BagList.prototype.getPlayerComplete = function (event) {
        var obj = NetWorkUtils.getResponseObj("p_100.k", event);
        if (obj.player) {
            GameUtils.playerBean = new PlayerBean(obj);
        }
    };
    BagList.prototype.onPostIOError = function (event) {
        NetWorkUtils.clearNetLoading();
    };
    return BagList;
}(egret.DisplayObjectContainer));
__reflect(BagList.prototype, "BagList");
//# sourceMappingURL=BagList.js.map