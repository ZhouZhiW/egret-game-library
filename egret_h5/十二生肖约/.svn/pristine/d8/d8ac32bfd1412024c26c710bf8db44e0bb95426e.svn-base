class BaseImage extends eui.Image {
    public constructor(source: string = null) {
        super();
        if (source != null) {
            this.source = source;
        }
        this.once(egret.Event.ADDED_TO_STAGE, this.onCreate, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onDestroy, this);
    }


    protected onCreate() {
        // this.validateNow();
    }

    protected onDestroy() {

    }
}