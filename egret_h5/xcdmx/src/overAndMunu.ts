class overAndMunu extends egret.Sprite {
    public constructor() {
        super();
        this.addbtn();
    }
    private addbtn() {
        var egret_width = egret.MainContext.instance.stage.stageWidth;
        var egret_height = egret.MainContext.instance.stage.stageHeight;
        data.createBtn("home_png", function () {
            data.updateData()//重置数据；
            data.Game_Layer.parent.removeChild(data.Game_Layer);
            var _start = new start();
            data.Main_Layer.addChild(_start);
        }, egret_width / 2 - 102, egret_height / 2 + 100, this)
        data.createBtn("again_png", function () {
            data.updateData()//重置数据；
            data.Game_Layer.parent.removeChild(data.Game_Layer);
            var _game: game = new game();
            data.Main_Layer.addChild(_game);
        }, egret_width / 2 + 102, egret_height / 2 + 100, this)
    }

}