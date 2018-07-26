module game {
	/**
	 *
	 * @author xsstomy
	 * 场景舞台，这里是我个人设定的为舞台
	 */
    export class ViewManager extends egret.Sprite {
        public constructor() {
            super();
        }

        private static instance: ViewManager;
        private gameStart: GameStart;
        private gamePlaying: GamePlaying;
        private gameOver: GameOver;

        //获取单例
        public static getInstance(): ViewManager {
            if (ViewManager.instance == null) {
                ViewManager.instance = new ViewManager();
            }
            return ViewManager.instance;
        }
        
        //开始
        public start() {
            this.init();

            this.initListener();
        }

        //初始化数据
        private init() {
            this.gameStart = new GameStart();
            this.gameOver = new GameOver();
            this.gamePlaying = new GamePlaying();

            this.addChild(this.gameStart);
        }
        
        //初始化事件监听
        private initListener() {

            this.addEventListener(SceneEvent.ChangeScene, this.onChangeScene, this);
        }
        private onChangeScene(e: SceneEvent) {
            
            //移除所有子对象
            this.removeChildren();
            
            //判断事件，接下来添加哪个场景在舞台展现
            switch (e.eventType) {
                case SceneEvent.GAME_START:
                    this.addChild(this.gameStart);
                    break;

                case SceneEvent.GAME_PLAYING:
                    this.addChild(this.gamePlaying);
                    break;

                case SceneEvent.GAME_END:
                    this.addChild(this.gameOver);
                    break;
                default: break;
            }
        }
    }
}
