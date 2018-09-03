class MoveBar extends BaseStage {
	public constructor() {
		super();
		this.skinName="resource/eui_skins/commponentsSkin/MoveBarSkin.exml";

		//创建内圈和外圈的圆环
		let width=this.width;

		this.bitmap=this.createCircleBar(0xFF0000,width/2,width/2,width/2,width/4,0.3);

		this.addChild(this.bitmap);
		
		//添加上下左右按键的监听事件
		let type:string=egret.TouchEvent.TOUCH_TAP;

		//上
		this.initBtn(this.btnTop,type,this.btnTop_Click,this);

		//左
		this.initBtn(this.btnLeft,type,this.btnLeft_Click,this);

		//右
		this.initBtn(this.btnRight,type,this.btnRight_Click,this);

		//下
		this.initBtn(this.btnBottom,type,this.btnBottom_Click,this);
	}

	//帮顶gameManager到此类上
	public gameManager:GameManager;

	//上按键的资源图片按键的资源图片及其事件
	private btnTop:eui.Image;
	private btnTop_Click(event:egret.TouchEvent){
		this.gameManager.move(MoveEnum.TOP);
	}

	//左按键的资源图片及其事件
	private btnLeft:eui.Image;
	private btnLeft_Click(event:egret.TouchEvent){
		this.gameManager.move(MoveEnum.LEFT);
	}

	//右按键的资源图片及其事件
	private btnRight:eui.Image;
	private btnRight_Click(event:egret.TouchEvent){
		this.gameManager.move(MoveEnum.RIGHT);
	}

	//下按键的资源图片及其事件
	private btnBottom:eui.Image;

	private btnBottom_Click(event:egret.TouchEvent){
		this.gameManager.move(MoveEnum.BOTTOM);
	}

	//初始化点击事件
	private initBtn<Z>(button:eui.Image,type:string,listeners:(this:Z,event:egret.TouchEvent)=>void,thisObject:this):void{
		button.touchEnabled=true;
		button.addEventListener(type,listeners,thisObject);
	}
	//bar的图片资源
	private bitmap:egret.Bitmap;

	//当添加到舞台上时，没有bar，则创建
	protected addToStage(event:egret.Event){
		if(this.bitmap!=null){
			let index:number=this.getChildIndex(this.bitmap);
			if(index!=0){
				this.setChildIndex(this.bitmap,0);
			}
		}
	}

	/**创建圆环
	 * 
	 * @param color 圆环fill颜色
	 * @param pointX 圆环所在的x坐标
	 * @param pointY y坐标 
	 * @param bigRadius 外圈的半径
	 * @param smallRadius 内圈的半径
	 * @param bitmapAlpha 外圈的透明度
	 */
	private createCircleBar(color:number,pointX:number,pointY:number,bigRadius:number,smallRadius:number,bitmapAlpha:number):egret.Bitmap{
		let group:eui.Group=new eui.Group();

		//创建外圈
		let bgLayer:egret.Shape=this.createCircleShape(color,pointX,pointY,bigRadius);		
		group.addChild(bgLayer);

		//创建内圈
		let maskLayer:egret.Shape=this.createCircleShape(color,pointX,pointY,smallRadius);
		maskLayer.blendMode=egret.BlendMode.ERASE;
		group.addChild(maskLayer);	

		//获得bar的资源图片
		let bitmap:egret.Bitmap=this.render(group,bitmapAlpha);
		return bitmap;
	}

	/**创建圆圈
	 * 
	 * @param color 颜色
	 * @param pointX x坐标
	 * @param pointY y坐标
	 * @param radius 半径
	 */
	private createCircleShape(color:number,pointX:number,pointY:number,radius:number):egret.Shape{
		let shape:egret.Shape=new egret.Shape();
		shape.graphics.beginFill(color);
		shape.graphics.drawCircle(pointX,pointY,radius);
		shape.graphics.endFill();
		return shape;
	}

	/**把所刻画的转换成bitmap
	 * 
	 * @param group 容器
	 * @param bitmapAlpha 图片透明度 
	 */
	private render(group:eui.Group,bitmapAlpha:number):egret.Bitmap{
		let renderTexture:egret.RenderTexture=new egret.RenderTexture();
		renderTexture.drawToTexture(group);
		let bitmap:egret.Bitmap=new egret.Bitmap(renderTexture);
		bitmap.alpha=bitmapAlpha;
		return bitmap;
	}

	/**删除事件监听
	 * 
	 */
	protected dispose(){
		super.dispose();

		//删除事件监听
		let type:string=egret.TouchEvent.TOUCH_TAP;
		this.btnLeft.removeEventListener(type,this.btnLeft_Click,this);
		this.btnRight.removeEventListener(type,this.btnRight_Click,this);
		this.btnTop.removeEventListener(type,this.btnTop_Click,this);
		this.btnBottom.removeEventListener(type,this.btnBottom_Click,this);
	}
}