//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.skinName = LoadingViewSkin;
        return _this;
        // this.createView();
    }
    LoadingUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.height = Const.SH;
        this.width = Const.SW;
        var mcFactory = new egret.MovieClipDataFactory(RES.getRes("cola_json"), RES.getRes("cola_png"));
        var movieClip = new egret.MovieClip();
        movieClip.movieClipData = mcFactory.generateMovieClipData("walk");
        movieClip.play(-1);
        movieClip.y = 200;
        movieClip.x = 440;
        this.uiGroup.addChild(movieClip);
    };
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
    LoadingUI.prototype.onProgress = function (current, total) {
        // this.textField.text = `Loading...${current}/${total}`;
        // console.log(">>>>>>", current, total);
        this.icon_bar.mask = this.icon_mask;
        this.icon_bar.x = -208 + (current / total) * 459;
        // this.logo.x = 250 + (current / total) * 425;
    };
    return LoadingUI;
}(eui.Component));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
//# sourceMappingURL=LoadingUI.js.map