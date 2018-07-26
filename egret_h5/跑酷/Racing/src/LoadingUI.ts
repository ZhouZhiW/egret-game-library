
class LoadingUI extends eui.Component {
    public constructor() {
        super();
        this.skinName = "loadingUISkin";
    }

    public loadingText: eui.Label;
    public loadingGroup: eui.Group;
    private loadingLength: number = 235;//车道的像素距离
    
    public setProgress(current,total): void {
        this.loadingText.text = "" + Math.floor((current / total) * 100) + "%";
        this.loadingGroup.x += Math.floor(this.loadingLength / total);
    }
}
