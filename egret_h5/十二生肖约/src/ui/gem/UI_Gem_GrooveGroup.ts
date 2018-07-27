class UI_Gem_GrooveGroup extends BaseComponent {
    private gemGroup: eui.Group;
    private grooveListener: any;
    constructor() {
        super();

    }
    public onCreate() {
        for (var i = 0; i < this.gemGroup.numChildren; i++) {
            var v = <UI_Gem_Groove>this.gemGroup.getChildAt(i);
            v.setGroupID(i);
            v.setListener(this.grooveListener, this);
        }

    }

    public onDestroy() {
        this.removeGrooveListener();
    }

    public setData(datas: Array<Data_BaseMaterial> = []) {
        for (var i = 0; i < this.gemGroup.numChildren; i++) {
            (<UI_Gem_Groove>this.gemGroup.getChildAt(i)).setMaterialData(datas[i]);
        }
    }

    public getNullGroove(): UI_Gem_Groove {
        for (var i = 0; i < this.gemGroup.numChildren; i++) {
            var v = <UI_Gem_Groove>this.gemGroup.getChildAt(i);
            if (v.getMaterialData() == null || v.getMaterialData().getGemType() == DataType_GemType.Null) {
                return v;
            }
        }
        return null;
    }
    public addGrooveListener(l, obj) {
        this.grooveListener = { callback: l, callbackThis: obj };
    }

    public removeGrooveListener(l?, obj?) {
        for (var i = 0; i < this.gemGroup.numChildren; i++) {
            var v = <UI_Gem_Groove>this.gemGroup.getChildAt(i);
            v.removeListener(this.grooveListener);
        }
        this.grooveListener = null;
    }

    public checkSelectGroove(x: number, y: number): UI_Gem_Groove {
        for (var i = 0; i < this.gemGroup.numChildren; i++) {
            var v = <UI_Gem_Groove>this.gemGroup.getChildAt(i);
            if (v.checkSelect(x, y)) {
                return v;
            }
        }
        return null;
    }
    public checkEquipGroove(x: number, y: number): UI_Gem_Groove {
        for (var i = 0; i < this.gemGroup.numChildren; i++) {
            var v = <UI_Gem_Groove>this.gemGroup.getChildAt(i);
            if (v.checkEquip(x, y)) {
                return v;
            }
        }
        return null;
    }
    public checkArea(x: number, y: number): boolean {
        return this.hitTestPoint(x, y, false);
    }
}