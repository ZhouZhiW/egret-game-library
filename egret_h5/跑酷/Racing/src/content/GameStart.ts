module game {
	/**
	 *
	 * @author xsstomy
	 *
	 */
    export class GameStart extends eui.Component {
        public constructor() {
            super();
            this.skinName = "gameStartSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        }

        public startBtn: eui.Button;
        private sceneEvent: SceneEvent = new SceneEvent(SceneEvent.ChangeScene);
        
        //添加显示列表
        private onAdded(e: egret.Event) {
            this.sceneEvent.eventType = SceneEvent.GAME_PLAYING;
            this.sceneEvent.eventObj = this;
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
        }
        //移除显示列表
        private onRemoved(e: egret.Event) {

            this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
        }


        private onStartGame(e: egret.TouchEvent) {
            ViewManager.getInstance().dispatchEvent(this.sceneEvent);
        }
    }
}
