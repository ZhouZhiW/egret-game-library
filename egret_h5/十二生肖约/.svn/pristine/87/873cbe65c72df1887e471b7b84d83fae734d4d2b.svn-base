class UI_Backpack_Tab extends UI_Base_Tab {
    private backpackGroup: eui.Group;
    private leftArrow: eui.Image;
    private rightArrow: eui.Image;
    private datas: Data_Backpack;

    private pageNums: number = 0;
    private pageNow: number = 0;
    // private icons: Array<eui.Image>;

    constructor() {
        super();
        NetEventManager.inst.pushBackpack();
    }

    protected get skinPath(): string {
        return "resource/skins/ui/backpack/UI_Backpack_TabSkin.exml"
    }

    public onCreate() {
        super.onCreate();
        this.leftArrow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickLeft, this);
        this.rightArrow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRight, this);
        DataManager.inst.backpack.addDataListener(this.refreshBackpack, this);
    }

    public onDestroy() {
        DataManager.inst.backpack.removeDataListener(this.refreshBackpack, this);
        this.leftArrow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickLeft, this);
        this.rightArrow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRight, this);
        super.onDestroy();
    }

    private refreshBackpack(e: DataEvent) {
        this.datas = e.data;
        // console.log("dataLength" + this.datas.bpGrids.length);
        this.pageNums = Math.ceil(this.datas.bpGrids.length / 20);
        // console.log("this.pageNums:" + this.pageNums);

        this.setArrow(this.pageNow);

        // if (data.bpGrids.length < 20) {
        //     for (let i = 0; i < data.bpGrids.length; i++) {
        //         const g: UI_Backpack_Grid = new UI_Backpack_Grid();
        //         g.onChange(data.bpGrids[i].backpackId, data.bpGrids[i].backpackType, data.bpGrids[i].backpackState, data.bpGrids[i].backpackPath);
        //         this.backpackGroup.addChild(g);
        //     }
        //     for (let i = 0; i < (20 - data.bpGrids.length); i++) {
        //         this.backpackGroup.addChild(new UI_Backpack_Grid());
        //     }
        // }
    }

    private clickLeft(e) {
        if (this.pageNow > 0) {
            this.setArrow(this.pageNow - 1);
        }
    }

    private clickRight(e) {
        if (this.pageNow < this.pageNums - 1) {
            this.setArrow(this.pageNow + 1);
        }
    }

    private setArrow(n: number) {
        this.pageNow = n;
        if (this.pageNow > 0) {
            this.setArrowImage(false, true);
        } else {
            this.setArrowImage(false, false);
        }
        if (this.pageNow < this.pageNums - 1) {
            this.setArrowImage(true, true);
        } else {
            this.setArrowImage(true, false);
        }
        this.setData();
    }

    private setArrowImage(arrowType: boolean, isFocus: boolean) {
        const img = arrowType ? this.rightArrow : this.leftArrow;
        let path = arrowType ? "resource/res/ui/gem/gs_arr_right" : "resource/res/ui/gem/gs_arr_left";
        path += isFocus ? "_a.png" : "_u.png";
        img.source = path;
    }

    private setData() {
        this.backpackGroup.removeChildren();
        let l: number = this.datas.bpGrids.length - (20 * this.pageNow);
        if (this.pageNow < this.pageNums - 1) {
            for (let i = this.pageNow * 20; i < (this.pageNow + 1) * 20; i++) {
                const g: UI_Backpack_Grid = new UI_Backpack_Grid();
                g.setMaterialData(this.datas.bpGrids[i]);
                this.backpackGroup.addChild(g);
            }
        } else {
            for (let i = this.pageNow * 20; i < this.pageNow * 20 + l; i++) {
                const g: UI_Backpack_Grid = new UI_Backpack_Grid();
                g.setMaterialData(this.datas.bpGrids[i]);
                this.backpackGroup.addChild(g);
            }
            for (let i = 0; i < (20 - l); i++) {
                this.backpackGroup.addChild(new UI_Backpack_Grid());
            }

        }
    }

}