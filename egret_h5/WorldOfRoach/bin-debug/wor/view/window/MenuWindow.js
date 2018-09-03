var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 游戏登陆
 */
var MenuWindow = (function (_super) {
    __extends(MenuWindow, _super);
    function MenuWindow() {
        var _this = _super.call(this) || this;
        _this.typeName = WorWindowType.MENU_WINDOW;
        _this.layerType = LayerType.LAYER_UI;
        return _this;
    }
    MenuWindow.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.getChildByName("newGame").addEventListener(egret.TouchEvent.TOUCH_TAP, this.optionHandler, this);
        this.getChildByName("oldGame").addEventListener(egret.TouchEvent.TOUCH_TAP, this.optionHandler, this);
        this.reOpen();
    };
    MenuWindow.prototype.reOpen = function () {
        this.getChildByName("newGame").visible = false;
        this.getChildByName("oldGame").visible = false;
        //请求玩家历史数据
        ProxyManager.getIns().send(ModuleType.USER, ProxyType.USER_GETHISTORY);
    };
    MenuWindow.prototype.update = function (updateType, updateObject) {
        switch (updateType) {
            case UpdateType.USER_HISTORY_BACLL:
                this.updatePanel();
                break;
        }
    };
    //刷新整个界面
    MenuWindow.prototype.updatePanel = function () {
        this.getChildByName("newGame").visible = true;
        this.getChildByName("oldGame").visible = GameData.historyData.hasData;
    };
    MenuWindow.prototype.optionHandler = function (evt) {
        switch (evt.currentTarget["name"]) {
            case "newGame":
                if (GameData.historyData.hasData)
                    AlertWindow.alertShow("确定要开始新的冒险吗?这将覆盖原有存档!", this.startNewGame, this);
                else
                    this.startNewGame(true);
                break;
            case "oldGame":
                this.startOldGame();
                break;
        }
    };
    //开始一个新游戏
    MenuWindow.prototype.startNewGame = function (flag) {
        if (flag) {
            LogTrace.log("startGame for new!");
            GameManager.getIns().isNewGame = true;
            GameManager.getIns().startNewGame();
        }
    };
    //读取以前的档案
    MenuWindow.prototype.startOldGame = function () {
        LogTrace.log("startGame for old");
        GameManager.getIns().isNewGame = false;
        GameManager.getIns().startOldGame();
    };
    return MenuWindow;
}(GameWindow));
__reflect(MenuWindow.prototype, "MenuWindow", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=MenuWindow.js.map