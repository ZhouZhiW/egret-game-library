class startgame extends Scene {
    constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.init, this);
        this.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.destory, this)
        this.skinName = "resource/myskin/start.exml"
    }
    private startArr: eui.Image[];
    public hero: eui.Image;
    public genggai_btn: eui.Image;
    public start_btn: eui.Image;
    public group: eui.Group;

    private init() {

        this.removeEventListener(eui.UIEvent.COMPLETE, this.init, this);
        this.startArr = [this.start_btn, this.genggai_btn];
        this.startBtnMove();
        for (let i: number = 0; i < this.startArr.length; i++) {
            this.startArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapStartBtn, this);
        }


    }
    // protected startbg;
    // public startbg2;

    // protected addtwobg() {

    //     var startbg = new egret.Bitmap();
    //     startbg.texture = RES.getRes("bg1_jpg");
    //     this.addChild(startbg);
    //     startbg.y = 0 - startbg.height;
    //     this.startbg = startbg;
    //     var startbg2 = new egret.Bitmap();
    //     startbg2.texture = RES.getRes("bg1_jpg");
    //     this.addChild(startbg2);
    //     startbg2.y = 0;
    //     this.startbg2 = startbg2;
    //     // egret.startTick(this.update, this);
    //     egret.Ticker.getInstance().register(this.update, this);
    // }
    // private speed = 200
    // protected update(dt): boolean {

    //     var speed =1/ dt *this.speed
    //     this.startbg2.y += speed;
    //     this.startbg.y += speed;

    //     if (this.startbg2.y > this.startbg.height) {
    //         this.startbg2.y = (this.startbg.y - this.startbg.height + 1);
    //     }
    //     if (this.startbg.y > this.startbg.height) {
    //         this.startbg.y = (this.startbg2.y - this.startbg.height + 1);
    //     }
    //     return true;


    // }

    private onTapStartBtn(e: egret.TouchEvent) {
        let tg = e.target;
        switch (tg.name) {
            case "start":
                this.enterGame();
                break;
            case "genggai":
                this.genggai();
                break;
        }
    }
    /*开始按钮的上下动画*/
    private startBtnMove() {
        egret.Tween.get(this.start_btn, { loop: true }).
            to({ x: this.start_btn.x, y: this.start_btn.y + 50 }, 1000).
            to({ x: this.start_btn.x, y: this.start_btn.y }, 1000)
    }
    /*点击开始按钮*/
    private enterGame() {
        let game = new gameplay();
        SceneManager.Instance.changeScene(game);
    }
    /*点击切换英雄按钮*/
    private hero_idx = 0
    private genggai() {
        var that = this;
        var _x = this.group.x
        egret.Tween.get(this.group).
            to({ x: this.group.x - this.stage.stageWidth / 2, y: this.group.y }, 300, egret.Ease.sineIn).call(function () {
                that.hero_idx++;
                if (that.hero_idx > 4) {
                    that.hero_idx = 1;
                }
                that.group.x = that.stage.stageWidth;
                that.hero.texture = RES.getRes("hero0" + that.hero_idx + "_png");
                egret.Tween.get(that.group).
                    to({ x: _x, y: that.group.y }, 300, egret.Ease.sineIn)
            })
    }
    /*删除监听*/
    private destory() {
        for (let i: number = 0; i < this.startArr.length; i++) {
            this.startArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapStartBtn, this);
        }
    }
}