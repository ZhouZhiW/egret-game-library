class LevelReqViewManage {
	private _layer:egret.Sprite;
	public constructor(layer:egret.Sprite) {
		this._layer =layer;
		this.init();
	}
	 private elements:LevelElementView[];
	 private init(){
		 this.elements = new Array();
	 }


	 private stepNumText:egret.BitmapText;
	 /**
	  * 创建当前关卡的过关条件元素
	  */
	  public createCurrentLevelReq(){
		  let len:number = GameData.levelReq.getLevelReqNum();
		  let el:LevelElementView;
		  for (let i = 0; i < len; i++) {
			  if(this.elements.length<=i){
				  el = new LevelElementView();
				  this.elements.push(el);
			  }	
			  else{
				  el = this.elements[i];
			  }	
			  el.eltype =GameData.levelReq.reqElements[i].type;
			  el.setTexture("e"+el.eltype+"_png");
			  el.x=43+(5+el.width)*i;
			  el.y=95;		
			  el.num = GameData.levelReq.reqElements[i].num;
			  this._layer.addChild(el);
			  

			 
		  }
		   if(!this.stepNumText){
				this.stepNumText = new egret.BitmapText();
				//this.stepNumText.
				this.stepNumText.font = RES.getRes("number_fnt");
				this.stepNumText.x = GameData.stageW - 95;
				this.stepNumText.y = 90;
				this.stepNumText.scaleX = 1.5;
				this.stepNumText.scaleY = 1.5;
				this._layer.addChild(this.stepNumText);
				this.stepNumText.text = GameData.stepNum.toString();
			  }

	  }


	/**
	 * 判断是否有指定类型 
	 * */
	public haveReqType(type:string):boolean{
		let l:number = this.elements.length;
		for(let i=0;i<l;i++)
		{
			if(this.elements[i].eltype==type){
				return true;
			}
		}
		return false;
	}
	/**
	 * 更新步数信息
	 */
	
    public updateStep()
    {
        this.stepNumText.text = GameData.stepNum.toString();
    }
	/**
	 * 通过类型，获取当前元素再视图中的位置信息
	 */
	public getPointByType(type:string):egret.Point{
		let p:egret.Point = new egret.Point();
		let len:number = this.elements.length;
		for(let i =0;i<len;i++){
			if(this.elements[i].eltype==type){
				p.x =this.elements[i].x+this.elements[i].width/2;
				p.y = this.elements[i].y+this.elements[i].height/2;
			}
		}
		return p;
	}
	/**
	 * 更新数据
	 */
	
    public update()
    {
        console.log("更新关卡数量数据");
        var len:number = GameData.levelReq.getLevelReqNum();
        for(var i:number=0; i<len; i++)
        {
            this.elements[i].num = GameData.levelReq.reqElements[i].num;
        }
    }
}