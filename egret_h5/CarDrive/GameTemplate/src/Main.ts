/**
 * D5Power游戏框架模版
 * 
 * @author D5-Howard(d5@microgame.cn)
 * 
 */
class Main extends egret.DisplayObjectContainer {

    private static _me:Main;
    public static get me():Main
    {
        return this._me;
    }

    private _game:d5power.GameScene;


    public constructor() {
        super();
        Main._me = this;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    public get game():d5power.GameScene
    {
        return this._game;
    }

    /**
     * 舞台初始化后运行
     * @param event 
     */
    private onAddToStage(event: egret.Event):void {
        // 请从这里开始编写游戏逻辑
        d5power.D5UIResourceData.setup('resource/assets/ui/default/',this.onUIReady,this);
    }

    /**
     * 当界面主题加载完成后运行本方法
     */
    private onUIReady():void
    {
        
        this._game = new d5power.GameScene();
        
        this.addChild(this._game);

        
    }
}