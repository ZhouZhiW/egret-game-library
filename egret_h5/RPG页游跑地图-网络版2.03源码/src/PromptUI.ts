/**
 *
 * @author 
 *
 */
class PromptUI extends egret.Sprite {
	public constructor() {
        super();
        this.createView();
	}
    private textField: egret.TextField;

    private createView(): void {
        var sW: number = egret.MainContext.instance.stage.stageWidth / 2;
        var sH: number = egret.MainContext.instance.stage.stageHeight / 2;
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
        this.textField.y = sH - this.textField.height / 2;
        this.textField.x = sW - this.textField.width / 2;
    }

    public setProgress(text:string): void {
        this.textField.text = text;
    }
}
