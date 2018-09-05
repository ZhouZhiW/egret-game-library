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
var overLayer = (function (_super) {
    __extends(overLayer, _super);
    function overLayer(score) {
        var _this = _super.call(this) || this;
        _this.isdisplay = false;
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, _this.onAddToStage, _this);
        RES.loadGroup("over");
        _this.score = score;
        _this.skinName = "resource/skins/overLayer.exml";
        return _this;
    }
    overLayer.prototype.onAddToStage = function () {
        this.bitfont.text = this.score.toString();
        this.init();
    };
    overLayer.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.init();
        console.log("createChildren");
    };
    overLayer.prototype.onComplete = function () {
        console.log("onComplete");
    };
    overLayer.prototype.init = function () {
        this.challengeBtn.touchEnabled = true;
        this.challengeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.challengefun, this);
        this.lefrBtn.touchEnabled = true;
        this.lefrBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lefrBtnfun, this);
        this.rightBtn.touchEnabled = true;
        this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rightBtnfun, this);
        this.anginBtn.touchEnabled = true;
        this.anginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.anginBtnfun, this);
        this.startBtn.touchEnabled = true;
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startSkipBtn, this);
        console.log("结束分数", this.score);
    };
    overLayer.prototype.challengefun = function () {
        window.platform.shareAppMessage().then(function (res) {
            console.log('挑战分享成功回调', res);
        }, function (err) {
            console.log('挑战分享失败回调', err);
        });
    };
    overLayer.prototype.lefrBtnfun = function () {
        /*好友榜*/
        this.onButtonClick();
    };
    overLayer.prototype.rightBtnfun = function () {
        /*全球榜*/
    };
    overLayer.prototype.anginBtnfun = function () {
        /*在玩一次*/
        if (Data.playlayer.parent) {
            Data.playlayer.parent.removeChild(Data.playlayer);
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
        var _playgame = new playgame();
        Data.mainlayer.addChild(_playgame);
    };
    overLayer.prototype.startSkipBtn = function () {
        /*回首页*/
        if (Data.playlayer.parent) {
            Data.playlayer.parent.removeChild(Data.playlayer);
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
        var _gamestart = new gamestart();
        Data.mainlayer.addChild(_gamestart);
    };
    overLayer.prototype.onButtonClick1 = function () {
        var openDataContext = wx.getOpenDataContext();
        if (this.isdisplay) {
            this.bitmap.parent && this.bitmap.parent.removeChild(this.bitmap);
            this.rankingListMask.parent && this.rankingListMask.parent.removeChild(this.rankingListMask);
            this.isdisplay = false;
        }
        else {
            //处理遮罩，避免开放数据域事件影响主域。
            this.rankingListMask = new egret.Shape();
            this.rankingListMask.graphics.beginFill(0x000000, 1);
            this.rankingListMask.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
            this.rankingListMask.graphics.endFill();
            this.rankingListMask.alpha = 0.5;
            this.rankingListMask.touchEnabled = true;
            this.addChild(this.rankingListMask);
            this._exit = new egret.TextField();
            this._exit.text = "退出";
            this._exit.textColor = 0xffffff;
            this._exit.x = 320;
            this._exit.y = 1000;
            this.addChild(this._exit);
            this._exit.touchEnabled = true;
            var that = this;
            this._exit.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                that._exit.parent && that._exit.parent.removeChild(that._exit);
                that.bitmap.parent && that.bitmap.parent.removeChild(that.bitmap);
                that.rankingListMask.parent && that.rankingListMask.parent.removeChild(that.rankingListMask);
                that.isdisplay = false;
                // this.parent.removeChild(that)
            }, this);
            //简单实现，打开这关闭使用一个按钮。
            // this.addChild(this.btnClose);
            //主要示例代码开始
            var bitmapdata_1 = new egret.BitmapData(window["sharedCanvas"]);
            bitmapdata_1.$deleteSource = false;
            var texture = new egret.Texture();
            texture._setBitmapData(bitmapdata_1);
            this.bitmap = new egret.Bitmap(texture);
            this.bitmap.width = this.stage.stageWidth;
            this.bitmap.height = this.stage.stageHeight;
            this.addChild(this.bitmap);
            egret.startTick(function (timeStarmp) {
                egret.WebGLUtils.deleteWebGLTexture(bitmapdata_1.webGLTexture);
                bitmapdata_1.webGLTexture = null;
                return false;
            }, this);
            //主要示例代码结束            
            this.isdisplay = true;
        }
        //发送消息
        openDataContext.postMessage({
            isDisplay: this.isdisplay,
            text: 'hello',
            year: (new Date()).getFullYear()
        });
    };
    overLayer.prototype.onButtonClick = function () {
    };
    return overLayer;
}(eui.Component));
__reflect(overLayer.prototype, "overLayer");
