
//
//////////////////////////////////////////////////////////////////////////////////////

class LoadingUI extends eui.Component implements RES.PromiseTaskReporter {

    public constructor() {
        super();

        this.skinName = LoadingViewSkin;

        // this.createView();
    }
    protected createChildren() {
        super.createChildren();
        this.height = Const.SH;
        this.width = Const.SW;

        let mcFactory = new egret.MovieClipDataFactory(RES.getRes("cola_json"), RES.getRes("cola_png"));
        let movieClip = new egret.MovieClip();
        movieClip.movieClipData = mcFactory.generateMovieClipData("walk");
        movieClip.play(-1);
        movieClip.y = 200;
        movieClip.x = 440;
        this.uiGroup.addChild(movieClip);

    }

    public icon_bg: eui.Image;
    public uiGroup: eui.Group;
    public icon_bar: eui.Image;
    public icon_mask: eui.Rect;




    // private textField: egret.TextField;

    /*private createView() {
        let icon1 = new eui.Image("indexbg_jpg");
        icon1.width = Const.STAGE_WIDTH;
        icon1.height = Const.STAGE_HEIGHT;
        this.addChild(icon1);
        let group = new eui.Group();
        group.width = 960;
        group.height = 640;
        group.horizontalCenter = 0;
        this.addChild(group);
        let icon = new eui.Image("company_logo_png");
        icon.x = Const.STAGE_WIDTH / 2 - 80;
        icon.y = 200;
        group.addChild(icon);

        this.textField = new egret.TextField();
        group.addChild(this.textField);
        this.textField.x = Const.STAGE_WIDTH / 2 - 240;
        this.textField.y = 400;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textColor = 0xcccccc;
        this.textField.textAlign = "center";
    }*/

    public onProgress(current: number, total: number): void {
        // this.textField.text = `Loading...${current}/${total}`;
        // console.log(">>>>>>", current, total);
        this.icon_bar.mask = this.icon_mask;
        this.icon_bar.x = -208 + (current / total) * 459;
        // this.logo.x = 250 + (current / total) * 425;
    }
}
