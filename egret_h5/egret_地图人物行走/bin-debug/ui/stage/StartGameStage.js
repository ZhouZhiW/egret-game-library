var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**开始游戏界面函数
 *
 */
var StartGameStage = (function (_super) {
    __extends(StartGameStage, _super);
    function StartGameStage(config) {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/stageSkin/StartGameStageSkin.exml";
        //获取该类所需要的config
        _this.config = config;
        //初始化界面按钮点击事件监听
        var type = egret.TouchEvent.TOUCH_TAP;
        _this.init_Btn(_this.btnStart, config.btnStart_Name, type, _this.btnStart_Click, _this);
        _this.init_Btn(_this.btnOption, config.btnOption_Name, type, _this.btnOption_Click, _this);
        _this.init_Btn(_this.btnExit, config.btnExit_Name, type, _this.btnExit_Click, _this);
        return _this;
    }
    /**大标题动画
     *
     * @param title 大标题
     * @param startScale 开始scale
     * @param endScale  结束scale
     * @param waitTime  动画等待时间
     * @param tweenTime 动画执行时间
     */
    StartGameStage.prototype.titleTween = function (title, startScale, endScale, waitTime, tweenTime) {
        egret.Tween.get(title, {
            loop: true
        })
            .to({ scaleY: endScale }, tweenTime)
            .set({ scaleY: endScale })
            .wait(waitTime);
    };
    /**开始按钮点击事件
     *
     * @param event
     */
    StartGameStage.prototype.btnStart_Click = function (event) {
        //移除自身
        var thisParent = this.parent;
        if (thisParent) {
            thisParent.removeChild(this);
            var hero = new Hero();
            hero.heroUtil = Comman.getRes("Hero_json");
            GameManager.ins.hero = hero;
        }
        //获取荧幕相关的东西
        var sceneConfig = Comman.getRes(GameConfig.SCENE_CONFIG);
        var sceneUtil = Comman.searchScene(sceneConfig.sceneUtilArray, this.config.name);
        var storyTitle = new StoryTitle();
        ControlStage.ins.addChild(storyTitle);
        storyTitle.nextStage = GameManager.ins;
        //不为null，则设置title和content，方便测试
        if (sceneUtil != null) {
            storyTitle.setContent(sceneUtil.titleName, sceneUtil.contentName);
        }
    };
    /**游戏选项按钮点击事件
     *
     * @param event
     */
    StartGameStage.prototype.btnOption_Click = function (event) {
        console.log("option");
    };
    /**退出按钮点击事件
     *
     * @param event
     */
    StartGameStage.prototype.btnExit_Click = function (event) {
        console.log("exit");
    };
    /**初始化OvButton
     *
     * @param button OvButton类
     * @param text  OvButton.labelDislay.text
     * @param type  触摸事件
     * @param listener 触摸监听函数
     * @param objectSender 作用域
     */
    StartGameStage.prototype.init_Btn = function (button, text, type, listener, objectThis) {
        var label = button.labelDisplay;
        label.text = text;
        button.touchEnabled = true;
        button.addEventListener(type, listener, objectThis);
    };
    /**当添加到舞台触发此事件
     *
     */
    StartGameStage.prototype.addToStage = function (event) {
        var config = this.config;
        this.title.text = config.title_Name;
        this.titleTween(this.title, config.titleTween_startScale, config.titleTween_endScale, config.titleTween_WaitTime, config.titleTween_TweenTime);
    };
    Object.defineProperty(StartGameStage, "ins", {
        /**获取类单例，若为null则new一个
         *
         */
        get: function () {
            if (this._ins == null) {
                var res = Comman.getRes(GameConfig.START_CONFIG);
                this._ins = new StartGameStage(res);
            }
            return this._ins;
        },
        /**只能设置此为null
         *
         */
        set: function (value) {
            if (value != null) {
                return;
            }
            this._ins = value;
        },
        enumerable: true,
        configurable: true
    });
    /**删除事件监听并显式设置为null
     *
     */
    StartGameStage.prototype.dispose = function () {
        //移除父类的监听事件
        _super.prototype.dispose.call(this);
        //移除自身tween--虽然没什么用
        egret.Tween.removeTweens(this.title);
        //移除自身按钮监听事件
        var type = egret.TouchEvent.TOUCH_TAP;
        this.btnStart.removeEventListener(type, this.btnStart_Click, this);
        this.btnOption.removeEventListener(type, this.btnOption_Click, this);
        this.btnExit.removeEventListener(type, this.btnExit_Click, this);
    };
    return StartGameStage;
}(BaseStage));
__reflect(StartGameStage.prototype, "StartGameStage");
//# sourceMappingURL=StartGameStage.js.map