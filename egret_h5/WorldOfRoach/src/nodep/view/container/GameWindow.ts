/**
 * 游戏通用的界面,继承之后可以通过GameWindow进行管理
 * 1.01:
 * 界面的缩放不影响布局效果
 * @author nodep
 * @version 1.01
 */
class GameWindow extends eui.Component {
    /**
     *所屬層級,需要在業務中自定義
     */
    public layerType: string = "";
    //非初次加入舞台
    public __inited: boolean = false;
    //布局方式
    private __align: string = "NONE";
    private __offsetX: number = 0;
    private __offsetY: number = 0;
    /**
     *界面的唯一命名
     */
    public typeName: string;
    /**
     * 是否有遮罩
     */
    public pop: boolean = false;

    protected partAdded(partName: string, instance: any): void {
        instance.name = partName;
        super.partAdded(partName, instance);
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.visible = true;
        this.resize();
    }
    /**
     *再次加入舞臺
     */
    public reOpen(): void {
        this.visible = true;
    }

    /**
     * 捕获到对应的通知
     */
    public update(updateType: number, updateObject: any): void {
    }

    /**
     * 关闭界面之前
     * 如果要添加关闭动画则在实现中返回false,并实现自己的关闭动画。则关闭动画完成后彻底移除。
     */
    public beforeClose(): boolean {
        return true;
    }

    /**
     * 舞台大小发生变化
     */
    public resize(): void {
        switch (this.__align) {
            case AlignType.TOP_LEFT:
                this.x = this.__offsetX;
                this.y = this.__offsetY;
                break;
            case AlignType.TOP_CENTER:
                this.x = (WinsManager.stageWidth - this.width*this.scaleX) / 2 + this.__offsetX;
                this.y = this.__offsetY;
                break;
            case AlignType.TOP_RIGHT:
                this.x = WinsManager.stageWidth - this.width*this.scaleX + this.__offsetX;
                this.y = this.__offsetY;
                break;
            case AlignType.CENTER:
                this.x = (WinsManager.stageWidth - this.width*this.scaleX) / 2 + this.__offsetX;
                this.y = (WinsManager.stageHeight - this.height*this.scaleY) / 2 + this.__offsetY;
                break;
            case AlignType.BOTTOM_LEFT:
                this.x = this.__offsetX;
                this.y = WinsManager.stageHeight - this.height*this.scaleY + this.__offsetY;
                break;
            case AlignType.BOTTOM_CENTER:
                this.x = this.x = (WinsManager.stageWidth - this.width*this.scaleX) / 2 + this.__offsetX;
                this.y = WinsManager.stageHeight - this.height*this.scaleY + this.__offsetY;
                break;
            case AlignType.BOTTOM_RIGHT:
                this.x = WinsManager.stageWidth - this.width*this.scaleX + this.__offsetX;
                this.y = WinsManager.stageHeight - this.height*this.scaleY + this.__offsetY;
                break;
        }
    }

    /**
     * 设置布局方式
     */
    public align(alignType: string, offsetX: number=0, offsetY: number=0): void {
        this.__align = alignType;
        this.__offsetX = offsetX*this.scaleX;
        this.__offsetY = offsetY*this.scaleY;
        if (this.stage != null)
            this.resize();
    }

    /**
     * 为自己的子对象增加事件监听:点击
     * 可传数组或字符串
     */
    protected addEventTap(args: any): void {
        switch (typeof args) {
            case "string":
                this.getChildByName(args).addEventListener(egret.TouchEvent.TOUCH_TAP, this.eventTapHandler, this);
                break;
            case "object":
                var key: any;
                for (key in args) {
                    this.getChildByName(args[key]).addEventListener(egret.TouchEvent.TOUCH_TAP, this.eventTapHandler, this);
                }
                break;
            default:
                throw (new Error(NodepErrorType.PARAM_TYPE_ERROR));
        }
    }

    /**
     * tap响应函数
     */
    protected tapCallback(childName: string): void {

    }

    private eventTapHandler(evt: egret.TouchEvent): void {
        this.tapCallback(evt.currentTarget.name);
    }
}