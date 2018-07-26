/**
 */
var ShareTips = (function (_super) {
    __extends(ShareTips, _super);
    function ShareTips() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=ShareTips;p=c.prototype;
    p.init = function () {
        this.setUI();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnded, this);
    };
    p.setUI = function () {
        var stageW = egret.MainContext.instance.stage.stageWidth;
        var stageH = egret.MainContext.instance.stage.stageHeight;
        //  绘制背景
        var shp = new egret.Shape();
        shp.graphics.beginFill(0x000000, 0.85);
        shp.graphics.drawRect(0, 0, stageW, stageH);
        shp.graphics.endFill();
        this.addChild(shp);
        //  添加指向右上角的提示箭头
        var tips = new egret.Bitmap();
        tips.texture = RES.getRes("arrow_png");
        this.addChild(tips);
        tips.anchorOffsetX = tips.width;
        tips.scaleX = tips.scaleY = 2;
        tips.x = stageW;
        //  添加文本提示
        var tipsLabel = new egret.TextField();
        this.addChild(tipsLabel);
        tipsLabel.textAlign = "center";
        tipsLabel.text = "请点击右上角按钮\n选择【分享到朋友圈】";
        tipsLabel.size = 80;
        tipsLabel.anchorOffsetX = tipsLabel.width / 2;
        tipsLabel.x = stageW / 2;
        tipsLabel.y = tips.height * tips.scaleX;
    };
    // 触摸结束
    p.onTouchEnded = function (evt) {
        console.log("sharetips touch end");
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return ShareTips;
})(egret.Sprite);
egret.registerClass(ShareTips,"ShareTips");
