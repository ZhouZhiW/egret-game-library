var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        _super.call(this);
        this.createView();
    }
    var d = __define,c=LoadingUI,p=c.prototype;
    p.createView = function () {
        var sW = egret.MainContext.instance.stage.stageWidth / 2;
        var sH = egret.MainContext.instance.stage.stageHeight / 2;
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
        this.textField.y = sH - this.textField.height / 2;
        this.textField.x = sW - this.textField.width / 2;
    };
    p.setProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
})(egret.Sprite);
egret.registerClass(LoadingUI,'LoadingUI');
//# sourceMappingURL=LoadingUI.js.map