/**
 *
 * @author
 *
 */
var PromptUI = (function (_super) {
    __extends(PromptUI, _super);
    function PromptUI() {
        _super.call(this);
        this.createView();
    }
    var d = __define,c=PromptUI,p=c.prototype;
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
    p.setProgress = function (text) {
        this.textField.text = text;
    };
    return PromptUI;
})(egret.Sprite);
egret.registerClass(PromptUI,'PromptUI');
//# sourceMappingURL=PromptUI.js.map