class overLayer extends eui.Component {
    constructor(score) {
        super();
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onAddToStage, this);
        RES.loadGroup("over");
        this.score = score;
        this.skinName = "resource/skins/overLayer.exml";
    }
    private score: Number;
    public bitfont: eui.BitmapLabel;
    public challengeBtn: eui.Image;
    public rightBtn: eui.Label;
    public anginBtn: eui.Image;
    public startBtn: eui.Image;
    public leftbtn: eui.Label;

    private onAddToStage() {
        this.bitfont.text = this.score.toString();
        this.init();
    }
    protected createChildren() {
        super.createChildren();
        this.init();
        console.log("createChildren")
    }
    private onComplete(): void {
        console.log("onComplete");
    }
    private init() {
        this.challengeBtn.touchEnabled = true;
        this.challengeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.challengefun, this);
        this.leftbtn.touchEnabled = true;
        this.leftbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lefrBtnfun, this);
        this.rightBtn.touchEnabled = true;
        this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rightBtnfun, this);
        this.anginBtn.touchEnabled = true;
        this.anginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.anginBtnfun, this);
        this.startBtn.touchEnabled = true;
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startSkipBtn, this);
        type UserGameData = {
            /** 用户的微信头像 url */
            avatarUrl: string,

            /** 用户的微信昵称 */
            nickName: string,

            /** 用户的 openId */
            openId: string,

            /**用户自定义数据 */
            KVList: KVData[]
        }

        type KVData = {
            key: string,
            value: string
        }
        console.log("结束分数", this.score)
    }
    private challengefun() {
        window.platform.shareAppMessage().then((res) => {
            console.log('挑战分享成功回调', res);
        }, (err) => {
            console.log('挑战分享失败回调', err);

        })

    }
    private lefrBtnfun() {

        /*好友榜*/
        this.onButtonClick();
    }
    private rightBtnfun() {
        /*全球榜*/
    }

    private anginBtnfun() {
        /*在玩一次*/
        if (Data.playlayer.parent) {
            Data.playlayer.parent.removeChild(Data.playlayer);
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
        var _playgame = new playgame();
        Data.mainlayer.addChild(_playgame);

    }
    private startSkipBtn() {
        /*回首页*/
        if (Data.playlayer.parent) {
            Data.playlayer.parent.removeChild(Data.playlayer);
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
        var _gamestart = new gamestart();
        Data.mainlayer.addChild(_gamestart);

    }
    private bitmap: egret.Bitmap;
    private isdisplay = false;
    /**
     * 排行榜遮罩，为了避免点击开放数据域影响到主域，在主域中建立一个遮罩层级来屏蔽点击事件.</br>
     * 根据自己的需求来设置遮罩的 alpha 值 0~1.</br>
     * 
     */
    private _exit;
    private rankingListMask: egret.Shape;
    private onButtonClick() {
        let openDataContext = wx.getOpenDataContext();

        if (this.isdisplay) {
            this.bitmap.parent && this.bitmap.parent.removeChild(this.bitmap);
            this.rankingListMask.parent && this.rankingListMask.parent.removeChild(this.rankingListMask);
            this.isdisplay = false;
        } else {
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
            const bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
            bitmapdata.$deleteSource = false;
            const texture = new egret.Texture();
            texture._setBitmapData(bitmapdata);
            this.bitmap = new egret.Bitmap(texture);
            this.bitmap.width = this.stage.stageWidth;
            this.bitmap.height = this.stage.stageHeight;
            this.addChild(this.bitmap);

            egret.startTick((timeStarmp: number) => {
                egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
                bitmapdata.webGLTexture = null;
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
    }
    

}