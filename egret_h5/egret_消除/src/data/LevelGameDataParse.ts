class LevelGameDataParse {
	/**
	 * 针对当前关卡JSON数据，进行解析
	 */
	public static parseLevelGameData(val:any){
		GameData.stepNum  = val.step;
		GameData.levelStepNum = val.step;
		GameData.elementTypes =val.element;
		GameData.levelBackgroundImageName = val.levelbgimg;
		LevelGameDataParse.parseLevelReq(val.levelreq);
	}

	/**
	 *解析过关条件数据 
	 */
	private static parseLevelReq(val:any){	
		GameData.levelReq.openChange();
		let len = val.length;
		for(let i=0;i<len;i++){
		
			GameData.levelReq.addElements(val[i].type,val[i].num);
		}
	}
}