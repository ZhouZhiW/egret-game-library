class gameOver extends egret.DisplayObjectContainer {
    constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage() {
        var _score = 0;
        for (var a = 0; a < configData.selectScore.length; a++) {
            _score += configData.selectScore[a];
        }
        console.log("s",_score);
        CanvasToimages_1(25 - _score);
        this.imageTagVisible(true);
    }
    public imageTagVisible(visible: boolean) {
        if (visible) {
            document.getElementById("saveContainer").style.display = "block";
        } else {
            document.getElementById("saveContainer").style.display = "none";
        }
    }

}