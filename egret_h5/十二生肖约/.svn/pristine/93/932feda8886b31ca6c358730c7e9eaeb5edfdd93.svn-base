class BaseComponent extends eui.Component {
    public constructor() {
        super();
        this.touchEnabled = false;
        if (this.skinPath != null) {
            this.skinName = this.skinPath;
        }
        this.once(egret.Event.ADDED_TO_STAGE, this.onCreate, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onDestroy, this);

    }

    protected get skinPath(): String {
        return null;
    }

    protected onCreate() {

    }

    protected onDestroy() {

    }

}