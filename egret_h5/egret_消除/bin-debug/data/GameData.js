var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameData = (function () {
    function GameData() {
    }
    //初始化游戏数据，仅仅创建空对象
    GameData.initData = function () {
        GameData.mapData = new Array();
        for (var i = 0; i < GameData.MaxRow; i++) {
            var arr = new Array();
            GameData.mapData.push(arr);
            for (var t = 0; t < GameData.MaxColumn; t++) {
                GameData.mapData[i].push(-2);
            }
        }
        GameData.levelReq = new LevelRequire();
        GameData.elements = new Array();
        GameData.unusedElements = new Array();
        var len = GameData.MaxRow * GameData.MaxColumn;
        var element;
        for (var i = 0; i < len; i++) {
            element = new GameElement();
            element.id = i;
            GameData.elements.push(element);
            GameData.unusedElements.push(i);
        }
        GameData.stageW = egret.MainContext.instance.stage.stageWidth;
        GameData.stageH = egret.MainContext.instance.stage.stageHeight;
    };
    return GameData;
}());
GameData.unmapnum = 0; //空白地图块数量
GameData.stepNum = 0; //玩家剩余步数
GameData.levelStepNum = 0; //当前关卡步数
GameData.levelBackgroundImageName = ""; //当前关卡背景图资源名
GameData.MaxRow = 8; //最大的行
GameData.MaxColumn = 8; //最大的列
GameData.currentElementNum = 0; //当前关卡游戏中地图可用元素数量
//舞台宽高，此封装为了方便调用
GameData.stageW = 0;
GameData.stageH = 0;
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=GameData.js.map