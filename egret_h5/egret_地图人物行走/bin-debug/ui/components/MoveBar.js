var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MoveBar = (function (_super) {
    __extends(MoveBar, _super);
    function MoveBar() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/commponentsSkin/MoveBarSkin.exml";
        //创建内圈和外圈的圆环
        var width = _this.width;
        _this.bitmap = _this.createCircleBar(0xFF0000, width / 2, width / 2, width / 2, width / 4, 0.3);
        _this.addChild(_this.bitmap);
        //添加上下左右按键的监听事件
        var type = egret.TouchEvent.TOUCH_TAP;
        //上
        _this.initBtn(_this.btnTop, type, _this.btnTop_Click, _this);
        //左
        _this.initBtn(_this.btnLeft, type, _this.btnLeft_Click, _this);
        //右
        _this.initBtn(_this.btnRight, type, _this.btnRight_Click, _this);
        //下
        _this.initBtn(_this.btnBottom, type, _this.btnBottom_Click, _this);
        return _this;
    }
    MoveBar.prototype.btnTop_Click = function (event) {
        this.gameManager.move(MoveEnum.TOP);
    };
    MoveBar.prototype.btnLeft_Click = function (event) {
        this.gameManager.move(MoveEnum.LEFT);
    };
    MoveBar.prototype.btnRight_Click = function (event) {
        this.gameManager.move(MoveEnum.RIGHT);
    };
    MoveBar.prototype.btnBottom_Click = function (event) {
        this.gameManager.move(MoveEnum.BOTTOM);
    };
    //初始化点击事件
    MoveBar.prototype.initBtn = function (button, type, listeners, thisObject) {
        button.touchEnabled = true;
        button.addEventListener(type, listeners, thisObject);
    };
    //当添加到舞台上时，没有bar，则创建
    MoveBar.prototype.addToStage = function (event) {
        if (this.bitmap != null) {
            var index = this.getChildIndex(this.bitmap);
            if (index != 0) {
                this.setChildIndex(this.bitmap, 0);
            }
        }
    };
    /**创建圆环
     *
     * @param color 圆环fill颜色
     * @param pointX 圆环所在的x坐标
     * @param pointY y坐标
     * @param bigRadius 外圈的半径
     * @param smallRadius 内圈的半径
     * @param bitmapAlpha 外圈的透明度
     */
    MoveBar.prototype.createCircleBar = function (color, pointX, pointY, bigRadius, smallRadius, bitmapAlpha) {
        var group = new eui.Group();
        //创建外圈
        var bgLayer = this.createCircleShape(color, pointX, pointY, bigRadius);
        group.addChild(bgLayer);
        //创建内圈
        var maskLayer = this.createCircleShape(color, pointX, pointY, smallRadius);
        maskLayer.blendMode = egret.BlendMode.ERASE;
        group.addChild(maskLayer);
        //获得bar的资源图片
        var bitmap = this.render(group, bitmapAlpha);
        return bitmap;
    };
    /**创建圆圈
     *
     * @param color 颜色
     * @param pointX x坐标
     * @param pointY y坐标
     * @param radius 半径
     */
    MoveBar.prototype.createCircleShape = function (color, pointX, pointY, radius) {
        var shape = new egret.Shape();
        shape.graphics.beginFill(color);
        shape.graphics.drawCircle(pointX, pointY, radius);
        shape.graphics.endFill();
        return shape;
    };
    /**把所刻画的转换成bitmap
     *
     * @param group 容器
     * @param bitmapAlpha 图片透明度
     */
    MoveBar.prototype.render = function (group, bitmapAlpha) {
        var renderTexture = new egret.RenderTexture();
        renderTexture.drawToTexture(group);
        var bitmap = new egret.Bitmap(renderTexture);
        bitmap.alpha = bitmapAlpha;
        return bitmap;
    };
    /**删除事件监听
     *
     */
    MoveBar.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        //删除事件监听
        var type = egret.TouchEvent.TOUCH_TAP;
        this.btnLeft.removeEventListener(type, this.btnLeft_Click, this);
        this.btnRight.removeEventListener(type, this.btnRight_Click, this);
        this.btnTop.removeEventListener(type, this.btnTop_Click, this);
        this.btnBottom.removeEventListener(type, this.btnBottom_Click, this);
    };
    return MoveBar;
}(BaseStage));
__reflect(MoveBar.prototype, "MoveBar");
//# sourceMappingURL=MoveBar.js.map