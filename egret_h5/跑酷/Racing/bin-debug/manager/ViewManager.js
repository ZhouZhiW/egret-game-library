var game;
(function (game) {
    /**
     *
     * @author xsstomy
     * 场景舞台，这里是我个人设定的为舞台
     */
    var ViewManager = (function (_super) {
        __extends(ViewManager, _super);
        function ViewManager() {
            _super.call(this);
        }
        var d = __define,c=ViewManager;p=c.prototype;
        //获取单例
        ViewManager.getInstance = function () {
            if (ViewManager.instance == null) {
                ViewManager.instance = new ViewManager();
            }
            return ViewManager.instance;
        };
        //开始
        p.start = function () {
            this.init();
            this.initListener();
        };
        //初始化数据
        p.init = function () {
            this.gameStart = new game.GameStart();
            this.gameOver = new game.GameOver();
            this.gamePlaying = new game.GamePlaying();
            this.addChild(this.gameStart);
        };
        //初始化事件监听
        p.initListener = function () {
            this.addEventListener(game.SceneEvent.ChangeScene, this.onChangeScene, this);
        };
        p.onChangeScene = function (e) {
            //移除所有子对象
            this.removeChildren();
            //判断事件，接下来添加哪个场景在舞台展现
            switch (e.eventType) {
                case game.SceneEvent.GAME_START:
                    this.addChild(this.gameStart);
                    break;
                case game.SceneEvent.GAME_PLAYING:
                    this.addChild(this.gamePlaying);
                    break;
                case game.SceneEvent.GAME_END:
                    this.addChild(this.gameOver);
                    break;
                default: break;
            }
        };
        return ViewManager;
    })(egret.Sprite);
    game.ViewManager = ViewManager;
    egret.registerClass(ViewManager,"game.ViewManager");
})(game || (game = {}));
