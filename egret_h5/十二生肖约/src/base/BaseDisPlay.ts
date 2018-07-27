class BaseDisPlay extends egret.DisplayObject {
    public constructor() {
        super();
        this.touchEnabled = false;
        this.once(egret.Event.ADDED_TO_STAGE, this.onCreate, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onDestroy, this);

    }



    protected onCreate() {

    }

    protected onDestroy() {

    }
}
