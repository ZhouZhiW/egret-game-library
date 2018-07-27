class UI_Tre_Gem extends BaseComponent {
    private gemData: Data_BaseGem;
    private gemIcon: eui.Image;

    private gemNum: eui.Label;
    private listener: any;
    constructor() {
        super();
    }
    protected get skinPath(): String {
        return "resource/skins/ui/treasures/UI_Tre_GemSkin.exml";
    }

    protected onCreate() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    protected onDestroy() {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.listener = null;
    }

    private setGemStatus(type: number, level: number = 0) {
        this.gemIcon.source = UI_Tre_GemConfig.getGemPath(type, level);
    }

    public setData(data: Data_BaseGem) {
        this.gemData = data;
        if (data == null) {
            this.setGemStatus(DataType_GemType.Null);
            this.gemNum.text = "";
        } else {
            this.setGemStatus(data.gemType, data.gemLevel);
            var n = data.gemCounts;
            this.gemNum.text = n > 1 ? "x" + n : "";
        }
    }

    public getData(): Data_BaseGem {
        return this.gemData;
    }

    public setListener(listener: Function, self: any) {
        this.listener = { callback: listener, callbackThis: self };
    }

    public removeListener(listener: Function) {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.listener = null;
    }
    private clickHandler() {
        if (this.gemData == null || this.gemData.gemType == DataType_GemType.Null) {
            return;
        }
        this.listener.callback.call(this.listener.callbackThis, this);
    }



}