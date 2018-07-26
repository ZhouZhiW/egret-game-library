module game {
	/**
	 *
	 * @author xsstomy
	 *
	 */
	export class SceneEvent extends egret.Event{
        public static ChangeScene: string = "changeScene";
        public eventType: string;//事件类型
        public eventObj: any;//对象
        
        
        public static GAME_START: string = "gamestart";
        public static GAME_PLAYING: string = "gameplaying";
        public static GAME_END: string = "gameend";
        public constructor(type: string,bubbles: boolean = false,cancelable: boolean = false) {
            super(type,bubbles,cancelable);
		}
	}
}
