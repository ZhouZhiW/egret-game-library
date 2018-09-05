class introduction extends egret.DisplayObjectContainer {
    constructor() {
        super();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private _isRemo = false;
    private onAddToStage() {
        var bgc = new egret.Shape();
        bgc.graphics.beginFill(0x000, 0.5);
        bgc.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this.addChild(bgc);
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes("shuoming_png");
        bg.width = 600;
        bg.height = 548;
        this.addChild(bg);
        bg.x = this.stage.stageWidth / 2;
        bg.y = this.stage.stageHeight + 700;
        bg.anchorOffsetX = bg.width / 2;
        bg.anchorOffsetY = bg.height / 2;
        var _x = this.stage.stageWidth / 2;
        var _y = this.stage.stageHeight / 2;
        var that = this;
        egret.Tween.get(bg).to({ x: _x, y: _y }, 500, egret.Ease.sineIn).call(function () {
            that._isRemo = true;
        });
        bg.touchEnabled=true;
        bg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (that.parent && that._isRemo) {
                that.parent.removeChild(that);
            }
        }, this)
    }
}