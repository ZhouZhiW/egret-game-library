class UI_Gem_Groove extends BaseComponent {
    private GemName_Null = "已解锁";
    private GemName_UnLock = "可解锁";
    private GemName_Lock = "未解锁";

    private gem: UI_Gem_Gem;
    private gemGrooveTx: eui.Label;
    private groupID: number;

    private gemData: Data_BaseMaterial;

    private listener: any;

    public constructor() {
        super();
    }

    public onCreate() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    public onDestroy() {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.listener = null;
    }

    public setMaterialData(data: Data_BaseMaterial) {
        this.gemData = data;
        if (data == null) {
            this.gem.setMaterialData(null);
            this.setLable(this.GemName_Null);
        } else {
            this.gem.setMaterialData(data);
            switch (data.getGemType()) {
                case DataType_GemType.Null:
                    this.setLable(this.GemName_Null);
                    return;
                case DataType_GemType.UnLock:
                    this.setLable(this.GemName_UnLock, 0x029536);
                    return;
                case DataType_GemType.Lock:
                    this.setLable(this.GemName_Lock, 0xFB0C0C);
                    return;
            }
            this.setLable(this.gemData.getName());
        }
    }
    private setLable(tx: string, color: number = 0x712F19) {
        this.gemGrooveTx.text = tx;
        this.gemGrooveTx.textColor = color;
    }

    public checkSelect(x: number, y: number): boolean {
        if (this.gemData == null || this.gemData.getType() == DataType_Material.Null
            || this.gemData.getType() == DataType_GemType.UnLock || this.gemData.getType() == DataType_Material.Lock) {
            return false;
        }
        return this.hitTestPoint(x, y, false);
    }

    public checkEquip(x: number, y: number): boolean {
        if (this.gemData == null || this.gemData.getType() == DataType_GemType.UnLock || this.gemData.getType() == DataType_Material.Lock) {
            return false;
        }
        return this.hitTestPoint(x, y, false);
    }
    public getMaterialData(): Data_BaseMaterial {
        return this.gemData;
    }

    private clickHandler() {
        if (this.gemData == null || this.gemData.getType() == DataType_Material.Null) {
            return;
        }
        this.listener.callback.call(this.listener.callbackThis, this);
    }

    public setListener(listener: Function, self: any) {
        this.listener = { callback: listener, callbackThis: self };
    }

    public removeListener(listener: Function) {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    public setGroupID(id: number) {
        this.groupID = id;
    }

    public getGroupID(): number {
        return this.groupID;
    }

    public getType(): number {
        if (this.gemData == null) {
            return DataType_GemType.Null;
        } else {
            return this.gemData.getGemType();
        }
    }

}