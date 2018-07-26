var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        _super.call(this);
        this.loadingLength = 235; //车道的像素距离
        this.skinName = "loadingUISkin";
    }
    var d = __define,c=LoadingUI;p=c.prototype;
    p.setProgress = function (current, total) {
        this.loadingText.text = "" + Math.floor((current / total) * 100) + "%";
        this.loadingGroup.x += Math.floor(this.loadingLength / total);
    };
    return LoadingUI;
})(eui.Component);
egret.registerClass(LoadingUI,"LoadingUI");
