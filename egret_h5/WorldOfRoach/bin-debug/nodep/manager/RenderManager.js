var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏主循环控制器
 * @author nodep
 * @version 1.0
 */
var RenderManager = (function () {
    function RenderManager() {
        this._lastTime = 0;
        this._renderList = new Array();
    }
    RenderManager.getIns = function () {
        if (!this._ins)
            this._ins = new RenderManager();
        return this._ins;
    };
    /**
     * 启动这个render
     */
    RenderManager.prototype.startRender = function (stage) {
        this._stage = stage;
        this._lastTime = egret.getTimer();
        this._stage.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    /**
     * 游戏主循环
     */
    RenderManager.prototype.enterFrameHandler = function (evt) {
        var key;
        var t = egret.getTimer();
        var interval = t - this._lastTime;
        this._lastTime = t;
        for (key in this._renderList) {
            this._renderList[key].renderUpdate(interval);
        }
        //this._renderList.forEach(this.renderHandler);
    };
    /**
     * foreach处理函数
     */
    // private renderHandler(target:IRender,index:number): void {
    // 	target.renderUpdate();
    // }
    /**
     * 注册render
     */
    RenderManager.prototype.registRender = function (render) {
        this._renderList.push(render);
    };
    /**
     * 移除一个render
     */
    RenderManager.prototype.unregistRender = function (render) {
        var indexN = this._renderList.indexOf(render);
        if (indexN >= 0) {
            this._renderList.splice(indexN, 1);
        }
    };
    return RenderManager;
}());
//当前标准帧频
RenderManager.frameRate = 30;
__reflect(RenderManager.prototype, "RenderManager");
//# sourceMappingURL=RenderManager.js.map