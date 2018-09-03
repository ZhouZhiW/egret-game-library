class GameBackGround extends  egret.Sprite{
	public constructor() {
		super();
	}
	public changeBackground():void{
		this.cacheAsBitmap =false;
		this.removeChildren();
		this.createBackGroundImage();
		this.createMapBg();
		this.createLevelReqBg();
		this.createStepBg();
		this.cacheAsBitmap = true;
	}

	private bgImage:egret.Bitmap;
    private girdBg:egret.Bitmap[];
	/**
	 * 创建地图背景图片
	 */
	private createBackGroundImage(){
		if(!this.bgImage){
			this.bgImage = new egret.Bitmap();
		}
		this.bgImage.texture =RES.getRes(GameData.levelBackgroundImageName);
		this.bgImage.width = GameData.stageW;
		this.bgImage.height -GameData.stageH;
		this.addChild(this.bgImage);
		let propbg:egret.Bitmap =new egret.Bitmap();
		propbg.texture = RES.getRes("propbg_png");
		propbg.width = GameData.stageW;
        propbg.height = GameData.stageW/5 + 20;
        propbg.y = GameData.stageH - propbg.height;	
        this.addChild(propbg);

	}
	/**
	 * 创建地图背景图片的格子图
	 */
	private createMapBg(){
		if(!this.girdBg){
			this.girdBg = new Array();
		}
		let gird:egret.Bitmap;
		let girdWidth:number = (GameData.stageW - 40)/GameData.MaxColumn;
		let startY:number = (GameData.stageH - (GameData.stageW - 30)/6 - 60)-girdWidth*GameData.MaxColumn;
		for (let i = 0; i < GameData.MaxRow; i++) {
			for (let t = 0; t < GameData.MaxColumn; t++) {
				if(GameData.mapData[i][t]!=-1){				
					if(this.girdBg.length<=(i*GameData.MaxRow+t)){
						gird=new egret.Bitmap();
						this.girdBg.push(gird);
					}else{
						gird=this.girdBg[i*GameData.MaxRow+t];
					}
					gird.width =girdWidth;
					gird.height =girdWidth;
					gird.x =20+girdWidth*t;
					gird.y =startY+girdWidth*i;
				
					if((i%2==0&&t%2==0)||(i%2==1&&t%2==1)){
						gird.texture = RES.getRes("elementbg1_png");
					}else{
						gird.texture = RES.getRes("elementbg2_png");
					}
					this.addChild(gird);
				}
				
			}
			
		}
	}


	/**
	 * 创建关卡 过关条件背景图片
	 */
	private createLevelReqBg(){
		let girdWidth:number =  (GameData.stageW - 40)/GameData.MaxColumn;
		let bg:egret.Bitmap = new egret.Bitmap();
		bg.texture= RES.getRes("levelreqbg_png");
		bg.width =GameData.levelReq.getLevelReqNum()*(10+girdWidth)+20;
		bg.height = girdWidth+60;
		bg.x=20;
		bg.y=50;
		this.addChild(bg);

		let bgtxt:egret.Bitmap = new egret.Bitmap();
		bgtxt.texture = RES.getRes("levelreqtitle_png");
		bgtxt.x = bg.x +(bg.width-bgtxt.width)/2;
		bgtxt.y=bg.y-18;
		this.addChild(bgtxt);
	}
	/**
	 * 剩余步数背景
	 */
	private createStepBg(){
		let bg:egret.Bitmap = new  egret.Bitmap();
		bg.texture = RES.getRes("levelregbg_png");
        bg.width = 100;
        bg.height = 100;
        bg.x = GameData.stageW - 110;
        bg.y = 50;
        this.addChild(bg);

        var bgtxt:egret.Bitmap = new egret.Bitmap();
        bgtxt.texture = RES.getRes("sursteptitle_png");
        bgtxt.x = bg.x + (bg.width - bgtxt.width)/2;
        bgtxt.y = bg.y + 10;
        this.addChild(bgtxt);
	}
}