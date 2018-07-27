
class UI_Gem_Gem extends BaseMaterial {

    private groupID: number;
    private listener: any;
    private titleInfo: string;
    private contentInfo: string;

    public constructor() {
        super();
    }

    public checkSelect(x: number, y: number): boolean {
        if (this.getMaterialData() == null || this.getMaterialData().getType() == DataType_Material.Null) {
            return false;
        }
        return this.hitTestPoint(x, y, false);
    }

    public getGroupID(): number {
        return this.groupID;
    }

    public setGroupID(id: number) {
        this.groupID = id;
    }

    public getTitleInfo(): string {
        return this.getMaterialData().getName();
    }

    public getContentInfo(): string {
        return UI_Tre_GemConfig.getAttributesInfo(this.getMaterialData().getGemType(), this.getMaterialData().gemAttributes);
    }

    private clickHandler() {
        if (this.getMaterialData() == null || this.getMaterialData().getType() == DataType_Material.Null) {
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

}