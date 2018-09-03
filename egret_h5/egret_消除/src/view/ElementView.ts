class ElementView extends egret.Sprite {
	private thisParent:egret.Sprite;
	//游戏中的元素
	public constructor(tParent:egret.Sprite) {
		super();
		this.thisParent=tParent;
		this.init();
	}
	public location:number = 0;//位置编号，用于提供移动使用

	/*-----------------------------ID 编号相关，携带测试信息-----------------------------------*/
	public _id:number =-1; //ID编号，对应GameData.elements中的数据ID，与数据下标相同

	public get id() : number {
		return this._id;
	}

	public set id(v : number) {
		this._id = v;
	}
	/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/

	 /*----------------------------元素位图 初始化相关功能-----------------------------------*/
    private bitmap:egret.Bitmap; //当前元素中的位图数据

    /**
	 * 初始化所有数据	
	 */
	private init(){
		this.touchEnabled =true;
		this.touchChildren =false;
		this.bitmap = new egret.Bitmap();
		let bitWidth:number =(GameData.stageW - 40)/GameData.MaxColumn;
		this.bitmap.width =bitWidth-10;
		this.bitmap.height=bitWidth-10;
		this.bitmap.x = -1*bitWidth/2;
		this.bitmap.y= -1*bitWidth/2;
		this.addChild(this.bitmap);
	}
	/**
	 * 设置贴图
	 */
	public setTexture(val:string)
    {
        this.bitmap.texture = RES.getRes(val);
    }
	/*-------------------------------------焦点管理相关----------------------------------------*/
	private _focus:boolean=false;
	public get focus():boolean{
		return this._focus;
	}
   
	//private _focusImg:egret.Bitmap;
	//设置选中状态的焦点样式
	public setFocus(val:boolean){
		if(val!=this.focus){
			this._focus = val;		

			if(val){
				this.setTexture("e"+GameData.elements[this.id].type+"foucs_png" );
			}else{						
				this.setTexture("e"+GameData.elements[this.id].type+"_png" );
			}
		}
	}

	/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
	/*-----------------------------------移动到新位置，乱序操作使用-----------------------------------------*/
    public speed:number = 700;
    //移动到新位置,使用cubicInOut算法移动，直线运动
    public move()
    {
        //console.log("乱序移动开始！",this.id,this.location,this.targetX(),this.targetY(),this.x,this.y);
        var tw:egret.Tween = egret.Tween.get(this);
        tw.to({x:this.targetX(),y:this.targetY()},this.speed, egret.Ease.cubicInOut);
    }
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/

	
  	/*-------------------------------------显示元素，从上方掉落----------------------------------------*/
    /*-------------------------------------掉落后添加到父级别显示列表-----------------------------------*/
    public show(wait:number){
		let tw:egret.Tween = egret.Tween.get(this);
		tw.wait(wait,false);
		tw.call(this.addThisToParent,this);
		tw.to({x:this.targetX(),y:this.targetY()},this.speed, egret.Ease.bounceOut);
	}

	private addThisToParent() //添加到父级显示对象
	{
		if(!this.parent)
		{
			this.thisParent.addChild(this);
		}
	}

	public targetX():number{
		let girdWidth:number = (GameData.stageW - 40)/GameData.MaxColumn;
        let xx:number = 20 + girdWidth*(this.location%GameData.MaxColumn)+girdWidth/2+5;
        return xx; 
	}
	public targetY():number //目标Y轴位置
    {
        var girdWidth:number = (GameData.stageW - 40)/GameData.MaxColumn;
        var startY:number = (GameData.stageH - (GameData.stageW - 30)/6 - 60 )-girdWidth*GameData.MaxColumn;
        var yy:number = startY + girdWidth*(Math.floor(this.location/8))+girdWidth/2+5;
        return yy;
    }
	/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/

  	/*--------------------------------------移动并且返回-------------------------------------*/
    /*----------------------用于用户交换两个对象，但未找到能够连接消除的时候使用------------------------*/
    //移动到另外一个位置，然后再移动回来
    public moveAndBack(location:number,isScale:boolean=false)
    {
        var girdWidth:number = (GameData.stageW - 40)/GameData.MaxColumn;
        var xx:number = 20 + girdWidth*(location%GameData.MaxColumn)+girdWidth/2+5;
        var startY:number = (GameData.stageH - (GameData.stageW - 30)/6 - 60 )-girdWidth*GameData.MaxColumn;
        var yy:number = startY + girdWidth*(Math.floor(location/GameData.MaxColumn))+girdWidth/2+5;
        //移动时候，不仅会移动位置，还会放到或者缩小，移动回来时，scale都设置为1
        var tw:egret.Tween = egret.Tween.get(this);      
        if(isScale)
        {
            tw.to({x:xx,y:yy,scaleX:1.2,scaleY:1.2},300, egret.Ease.cubicOut).call(this.back,this);;
        }
        else
        {
            tw.to({x:xx,y:yy,scaleX:0.8,scaleY:0.8},300, egret.Ease.cubicOut).call(this.back,this);;
        }
    }
    private back()
    {
        var tw:egret.Tween = egret.Tween.get(this);
        tw.to({x:this.targetX(),y:this.targetY(),scaleX:1,scaleY:1},300, egret.Ease.cubicOut);
    }
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/


	public evm:ElementViewManage;

 	/*-----------------------------此动画用于移动元素，然后消除--------------------------------------*/
	 
    //移动到另外一个位置，然后再返回原始的scale
	public moveAndScale(location:number,isScale:boolean=false){
		let girdWidth:number = (GameData.stageW - 40)/GameData.MaxColumn;;
		let xx:number =20+girdWidth*(location%GameData.MaxColumn)+girdWidth/2+5;
		let startY:number = (GameData.stageH - (GameData.stageW - 30)/6 - 60 )-girdWidth*GameData.MaxColumn;
        let yy:number = startY + girdWidth*(Math.floor(location/GameData.MaxRow))+girdWidth/2+5;

		let tw:egret.Tween = egret.Tween.get(this);
		if(isScale){
			tw.to({x:xx,y:yy,scaleX:1.4,scaleY:1.4},300,egret.Ease.cubicInOut).call(this.backScaleNoCall,this);
		}
		else{
			tw.to({x:xx,y:yy,scaleX:0.6,scaleY:0.6},300,egret.Ease.cubicInOut).call(this.backScale,this);
		}
	}

	private backScale(){
		let tw:egret.Tween = egret.Tween.get(this); 
		tw.to({scaleX:1,scaleY:1},300, egret.Ease.backOut)
		.call(this.canRemove,this);	
	}
	private backScaleNoCall(){
		let tw:egret.Tween = egret.Tween.get(this); 
		tw.to({scaleX:1,scaleY:1},300, egret.Ease.backOut);	
	}
	public   canRemove(){
		//console.log("回调");
		let evt:ElementViewManageEvent = new ElementViewManageEvent(ElementViewManageEvent.REMOVE_ANIMATION_OVER);
   		this.evm.dispatchEvent(evt);
	}

	
	/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/

	/*-----------------此动画用于将元素移动到关卡积分器位置,然后移除显示列表----------------------------*/

    /*-------------------------删除元素，当元素不属于关卡条件时，执行此动画---------------------------------*/
    //播放直接消除动画,自己放大，然后缩回到原有大小，然后删除
    public playRemoveAni()
    {
        var tw:egret.Tween = egret.Tween.get(this);
        tw.to({scaleX:1.4,scaleY:1.4},300, egret.Ease.cubicInOut).to({scaleX:0.1,scaleY:0.1},300, egret.Ease.cubicInOut).call(this.removeAniCall,this);
    }
    private removeAniCall()
    {
        if(this.parent)
        {			
            this.parent.removeChild(this);
			//console.log(this.id,this.parent);
        }
		var evt:ElementViewManageEvent = new ElementViewManageEvent(ElementViewManageEvent.UPDATE_MAP);
       // this.evm.dispatchEvent(evt);
	   this.evm.updateMap(evt);
    }
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/


	/*-------------------------移动到新位置，方块被消除后重新生成下落使用---------------------------------*/

	/**
	 * 播放曲线动画
	 */
	public playCurveMove(tx:number,ty:number)
	{
		let tw:egret.Tween =  egret.Tween.get(this);
		tw.to({x:tx,y:ty},700,egret.Ease.quadOut).call(this.overCurveMove,this);
	}
	
	private overCurveMove(){
		if(this.parent){
			this.parent.removeChild(this);
		}
		let evt:ElementViewManageEvent = new ElementViewManageEvent(ElementViewManageEvent.UPDATE_MAP);
		this.evm.updateMap(evt);
	}
	/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
    //根据列编号，重新计算元素X轴位置，从其实Y轴开始播放下落动画
    public moveNewLocation()
    {
		
		//console.log(this.id,this.parent);
		if(!this.parent)
		{
			let girdWidth:number = (GameData.stageW - 40)/GameData.MaxColumn;
			let startY:number = (GameData.stageH - (GameData.stageW - 30)/6 - 60 )-girdWidth*GameData.MaxColumn;
			this.y = startY - this.width;
			this.scaleX = 1;
			this.scaleY = 1;
			this.x = this.targetX();			
			//被删除的元素要重新加入
			this.thisParent.addChild(this);
		}
	
 		
        egret.Tween.get(this).to({x:this.targetX(),y:this.targetY()},this.speed, egret.Ease.bounceOut).call(this.moveNewLocationOver,this);
    }
    private moveNewLocationOver()
    {
       	let evt:ElementViewManageEvent = new ElementViewManageEvent(ElementViewManageEvent.UPDATE_VIEW_OVER);
        //this.evm.dispatchEvent(evt);
		this.evm.moveNewLocationOver(evt);
    }
    /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/


}