

class LoadingUI extends egret.Sprite {

    public constructor() {
        super();
        this.createView();
    }

    private textField:egret.TextField;

    private createView():void {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 990;
        this.textField.width = 1080;
        this.textField.height = 990;
        this.textField.size = 80;
        this.textField.textAlign = "center";
    }

    public setProgress(current, total):void {
        this.textField.text = "Loading..." + current + "/" + total;
    }
}
