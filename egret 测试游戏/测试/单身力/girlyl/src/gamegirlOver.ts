class gamegirlOver extends egret.DisplayObjectContainer {
    constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage() {
        var _score = Math.floor(Math.random() * 18 + 1);
        CanvasToimages_1("result/game_"+_score);
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