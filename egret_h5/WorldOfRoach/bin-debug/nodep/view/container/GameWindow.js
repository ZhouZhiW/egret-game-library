var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 游戏通用的界面,继承之后可以通过GameWindow进行管理
 * 1.01:
 * 界面的缩放不影响布局效果
 * @author nodep
 * @version 1.01
 */
var GameWindow = (function (_super) {
    __extends(GameWindow, _super);
    function GameWindow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         *所屬層級,需要在業務中自定義
         */
        _this.layerType = "";
        //非初次加入舞台
        _this.__inited = false;
        //布局方式
        _this.__align = "NONE";
        _this.__offsetX = 0;
        _this.__offsetY = 0;
        /**
         * 是否有遮罩
         */
        _this.pop = false;
        return _this;
    }
    GameWindow.prototype.partAdded = function (partName, instance) {
        instance.name = partName;
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GameWindow.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.visible = true;
        this.resize();
    };
    /**
     *再次加入舞臺
     */
    GameWindow.prototype.reOpen = function () {
        this.visible = true;
    };
    /**
     * 捕获到对应的通知
     */
    GameWindow.prototype.update = function (updateType, updateObject) {
    };
    /**
     * 关闭界面之前
     * 如果要添加关闭动画则在实现中返回false,并实现自己的关闭动画。则关闭动画完成后彻底移除。
     */
    GameWindow.prototype.beforeClose = function () {
        return true;
    };
    /**
     * 舞台大小发生变化
     */
    GameWindow.prototype.resize = function () {
        switch (this.__align) {
            case AlignType.TOP_LEFT:
                this.x = this.__offsetX;
                this.y = this.__offsetY;
                break;
            case AlignType.TOP_CENTER:
                this.x = (WinsManager.stageWidth - this.width * this.scaleX) / 2 + this.__offsetX;
                this.y = this.__offsetY;
                break;
            case AlignType.TOP_RIGHT:
                this.x = WinsManager.stageWidth - this.width * this.scaleX + this.__offsetX;
                this.y = this.__offsetY;
                break;
            case AlignType.CENTER:
                this.x = (WinsManager.stageWidth - this.width * this.scaleX) / 2 + this.__offsetX;
                this.y = (WinsManager.stageHeight - this.height * this.scaleY) / 2 + this.__offsetY;
                break;
            case AlignType.BOTTOM_LEFT:
                this.x = this.__offsetX;
                this.y = WinsManager.stageHeight - this.height * this.scaleY + this.__offsetY;
                break;
            case AlignType.BOTTOM_CENTER:
                this.x = this.x = (WinsManager.stageWidth - this.width * this.scaleX) / 2 + this.__offsetX;
                this.y = WinsManager.stageHeight - this.height * this.scaleY + this.__offsetY;
                break;
            case AlignType.BOTTOM_RIGHT:
                this.x = WinsManager.stageWidth - this.width * this.scaleX + this.__offsetX;
                this.y = WinsManager.stageHeight - this.height * this.scaleY + this.__offsetY;
                break;
        }
    };
    /**
     * 设置布局方式
     */
    GameWindow.prototype.align = function (alignType, offsetX, offsetY) {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        this.__align = alignType;
        this.__offsetX = offsetX * this.scaleX;
        this.__offsetY = offsetY * this.scaleY;
        if (this.stage != null)
            this.resize();
    };
    /**
     * 为自己的子对象增加事件监听:点击
     * 可传数组或字符串
     */
    GameWindow.prototype.addEventTap = function (args) {
        switch (typeof args) {
            case "string":
                this.getChildByName(args).addEventListener(egret.TouchEvent.TOUCH_TAP, this.eventTapHandler, this);
                break;
            case "object":
                var key;
                for (key in args) {
                    this.getChildByName(args[key]).addEventListener(egret.TouchEvent.TOUCH_TAP, this.eventTapHandler, this);
                }
                break;
            default:
                throw (new Error(NodepErrorType.PARAM_TYPE_ERROR));
        }
    };
    /**
     * tap响应函数
     */
    GameWindow.prototype.tapCallback = function (childName) {
    };
    GameWindow.prototype.eventTapHandler = function (evt) {
        this.tapCallback(evt.currentTarget.name);
    };
    return GameWindow;
}(eui.Component));
__reflect(GameWindow.prototype, "GameWindow");
//# sourceMappingURL=GameWindow.js.map