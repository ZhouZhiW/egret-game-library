class UI_Gem_GemGroup extends BaseComponent {
    private gemGroupArrowLeft: eui.Image;
    private gemGroupArrowRight: eui.Image;
    private gemGroup: eui.Group;

    private currentPage;
    private pageNums = 0;
    private gemStoneDatas: Array<Data_BaseMaterial>;
    private gemListener: any;
    constructor() {
        super();
    }

    public onCreate() {
        for (var i = 0; i < this.gemGroup.numChildren; i++) {
            var v = <UI_Gem_Gem>this.gemGroup.getChildAt(i);
            v.setGroupID(i);
            v.setListener(this.gemListener.callback, this.gemListener.callbackThis);
        }
        this.gemGroupArrowLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TipLeftHandler, this);
        this.gemGroupArrowRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TipRightHandler, this);
    }

    public onDestroy() {
        this.gemGroupArrowLeft.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.TipLeftHandler, this);
        this.gemGroupArrowRight.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.TipRightHandler, this);
        this.removeGemListener();
    }


    public setData(datas: Array<Data_BaseMaterial> = []) {
        this.gemStoneDatas = datas;
        const p = Math.ceil(this.gemStoneDatas.length / 10);
        this.pageNums = p < 1 ? 1 : p;
        this.setPage(0);
    }

    public setGemListener(l, obj) {
        this.gemListener = { callback: l, callbackThis: obj };
    }
    public removeGemListener(l?, obj?) {
        for (var i = 0; i < this.gemGroup.numChildren; i++) {
            var v = <UI_Gem_Gem>this.gemGroup.getChildAt(i);
            v.removeListener(this.gemListener);
        }
        this.gemListener = null;
    }
    private setPage(index) {
        if (index < 0 || index > this.pageNums - 1) {
            return;
        }
        this.currentPage = index;

        // 设置箭头
        this.setArrowImage(this.currentPage > 0, this.currentPage < this.pageNums - 1)

        //设置显示宝石数据
        this.setshowData(this.getShowDatas());
    }

    private getShowDatas(): Array<Data_BaseMaterial> {
        var datas: Array<Data_BaseMaterial> = [];
        for (var i = this.currentPage * 10; i < this.currentPage * 10 + 10; i++) {
            if (i >= this.gemStoneDatas.length) {
                datas.push(null);//这个地方是要重新处理的
            } else {
                datas.push(this.gemStoneDatas[i]);
            }

        }
        return datas;
    }


    private setArrowImage(left: boolean, right: boolean) {
        this.gemGroupArrowLeft.source = "resource/res/ui/gem/gs_arr_left" + (left ? "_a.png" : "_u.png");
        this.gemGroupArrowRight.source = "resource/res/ui/gem/gs_arr_right" + (right ? "_a.png" : "_u.png");
    }

    private setshowData(datas: Array<Data_BaseMaterial>) {
        for (var i = 0; i < this.gemGroup.numChildren; i++) {
            (<UI_Gem_Gem>this.gemGroup.getChildAt(i)).setMaterialData(datas[i]);
        }
    }

    private TipLeftHandler(e) {
        this.setPage(this.currentPage - 1);

    }
    private TipRightHandler(e) {
        this.setPage(this.currentPage + 1);
    }


    public checkSelectGem(x: number, y: number): UI_Gem_Gem {
        for (var i = 0; i < this.gemGroup.numChildren; i++) {
            var v = <UI_Gem_Gem>this.gemGroup.getChildAt(i);
            if (v.checkSelect(x, y)) {
                return v;
            }
        }
        return null;
    }

    public checkArea(x: number, y: number): boolean {
        return this.hitTestPoint(x, y, false);
    }





}