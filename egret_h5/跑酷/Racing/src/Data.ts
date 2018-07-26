module game {
	/**
	 *
	 * @author xsstomy
	 *
	 */
	export class Data {

        public static gameResult: boolean = true; //默认为true,表示是成功的；false表示失败，没有完成任务
		
		public static distanceLength: number = 0;//记录走过的路程距离
		
		public static targetDistance:number = 10000;//目标距离
		
		public static stageH:number = 800;//舞台高
		
		public static stageW:number = 480;//舞台宽
		
		public static currentSpeedY:number = 6;//当前车速度
	}
}
