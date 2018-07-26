var game;
(function (game) {
    /**
     *
     * @author xsstomy
     *
     */
    var Data = (function () {
        function Data() {
        }
        var d = __define,c=Data;p=c.prototype;
        Data.gameResult = true; //默认为true,表示是成功的；false表示失败，没有完成任务
        Data.distanceLength = 0; //记录走过的路程距离
        Data.targetDistance = 10000; //目标距离
        Data.stageH = 800; //舞台高
        Data.stageW = 480; //舞台宽
        Data.currentSpeedY = 6; //当前车速度
        return Data;
    })();
    game.Data = Data;
    egret.registerClass(Data,"game.Data");
})(game || (game = {}));
