module game {
	/**
	 *
	 * @author xsstomy
	 *
	 */
    export class GameOver extends eui.Component {
        public constructor() {
            super();
            this.skinName = "gameOverSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded,this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoved,this);
        }

        private sceneEvent: SceneEvent = new SceneEvent(SceneEvent.ChangeScene);
        public resultGroup: eui.Group;
        public result: eui.Image;
        public playAgainBtn: eui.Button;

        //添加到舞台
        private onAdded(e:egret.Event)
        {
            this.sceneEvent.eventType = SceneEvent.GAME_START;
            this.resultGroup.y = -600;
            egret.Tween.get(this.resultGroup).to({ y: 97 },500,egret.Ease.backOut);
            this.playAgainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPlayAgain,this);
            if(!Data.gameResult)
            {
                this.result.source = "failedNotice_png";
            }
        }
        //离开舞台
        private onRemoved(e:egret.Event)
        {
            egret.Tween.removeTweens(this.resultGroup);
            this.playAgainBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onPlayAgain,this);
        }
        
        private onPlayAgain(e: egret.TouchEvent) {
            
            ViewManager.getInstance().dispatchEvent(this.sceneEvent);
        }
    }
}
