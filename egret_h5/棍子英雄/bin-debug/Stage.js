/**
 */
var Stage = (function (_super) {
    __extends(Stage, _super);
    function Stage() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=Stage;p=c.prototype;
    p.init = function () {
        var stageSprite = new egret.Bitmap();
        stageSprite.texture = RES.getRes("stage1_png");
        stageSprite.anchorOffsetX = stageSprite.width / 2;
        stageSprite.anchorOffsetY = 0;
        this.addChild(stageSprite);
        this.stageSprite = stageSprite;
    };
    return Stage;
})(egret.Sprite);
egret.registerClass(Stage,"Stage");
