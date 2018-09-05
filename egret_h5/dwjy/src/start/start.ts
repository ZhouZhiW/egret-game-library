// class gamestart extends eui.Component implements  eui.UIComponent {
class gamestart extends eui.Component {
    constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.skinName = "resource/skins/start.exml";
    }
    protected createChildren() {
        super.createChildren();
        this.init();
        console.log("createChildren")
    }
    private onComplete(): void {
        console.log("onComplete");
    }
    public btn1: eui.Image;
    // public btn2: eui.Image;
    // public rankbtn: eui.Image;
    // public morebtn: eui.Image;
    private init() {
        // var btn = new egret.Bitmap();
        // btn.texture = RES.getRes("ewm_jpg");
        // btn.x = 0;
        // btn.y = this.stage.stageHeight - 150;
        // btn.width=43*3;
        // btn.height=43*3;
        // this.addChild(btn);
        // btn.touchEnabled = true;
        // btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
        //     platform.previewImage();
        // }, this)
        this.btn1.touchEnabled = true;
        this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.game, this);
        // var ewm = new ewm();
        // this.addChild(ewm);
        // this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gamePk, this)
        // this.rankbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameRank, this)
        // this.morebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameMore, this)
    }
    private game() {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        var _playgame = new playgame();
        Data.mainlayer.addChild(_playgame);

    }
    private gamePk() {

    }
    private gameRank() {

    }
    private gameMore() {

    }
    private onRemoveFromStage() {
        if (this.btn1.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.game, this)
        }
        // if (this.btn2.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
        //     this.btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gamePk, this)
        // }
        // if (this.rankbtn.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
        //     this.rankbtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gameRank, this)
        // }
        // if (this.morebtn.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
        //     this.morebtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gameMore, this)
        // }
    }

}