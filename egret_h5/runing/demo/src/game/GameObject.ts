


class GameObject extends egret.HashObject {

    public view: any;
    public id: number;
    public key: string = "gameObject";
    public speed: number = 500;
    constructor() {
        super();
    }

    public onCreate(): void {

    }
    /**
     * 销毁view
     */
    public onDestroy(): void {
        let view = this.view;
        if (view != null) {
            view.parent && view.parent.removeChild(view);
        }
    }

    public onEnterFrame(advancedTime: number): void {

    }


}
