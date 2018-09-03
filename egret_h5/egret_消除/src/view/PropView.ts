class PropView extends egret.Sprite {
	public constructor(type:number) {
		super();
		this._type = type;
		this.init();
	}
	//道具元素界面
	private _view_box:egret.Bitmap;//道具盒子
	private _view_active:egret.Bitmap;//激活道具图像
	private _numText:egret.BitmapText;//数字文本
	private _type:number = -1;            //道具类型
	public id:number=-1;
	
	public get proptype():number
    {
        return this._type;
    }

	private init(){
		this.createView();
		this.createNumText();
		this.addChild(this._view_active);
		this.addChild(this._view_box);
		this.addChild(this._numText);
		this.setActivateState(true);
	}


	private createNumText(){
		this._numText = new egret.BitmapText();
		this._numText.font = RES.getRes("number_fnt");
		this._numText.x = this._view_active.width -31;
	}

	private createView(){
		let _interval:number =15;
		let _width:number =(GameData.stageW -_interval*6)/5;
		if(!this._view_active){
			this._view_active = new egret.Bitmap();
			this._view_active.texture = RES.getRes(this.getActivateTexture(this._type));
			this._view_active.width = this._view_active.height = _width;
		}
		if(!this._view_box){
			this._view_box = new egret.Bitmap();
			this._view_box.texture = RES.getRes("propbox_png");
			this._view_box.width = this._view_box.height= this._view_active.width+10;
			this._view_box.x = -5;
			this._view_box.y = -5;
		}
	}
	private _num:number = 0;//数量
    public get num():number
    {
        return this._num;
    }
    public set num(val:number)
    {
        this._num = val;
        this._numText.text = val.toString();
        if(val<=0)
        {
            this.setActivateState(false);
        }
        else
        {
            this.setActivateState(true);
        }
    }
	private getFocusTexture(type:number):string{
			let textureName:string ="";
			switch(type){
				case 0:
				textureName = "tongseactive_png";
				break;
				case 1:
					textureName = "zhadanactive_png";
					break;
				case 2:
					textureName = "zhenghangactive_png";
					break;
				case 3:
					textureName = "zhenglieactive_png";
					break;
				case 4:
					textureName = "chanziactive_png";
					break;
			}
			return textureName;
		}
	
	private getActivateTexture(type:number):string{
		let textureName:string ="";
		switch(type){
			case 0:
			textureName = "tongse_png";
			break;
			case 1:
                textureName = "zhadan_png";
                break;
            case 2:
                textureName = "zhenghang_png";
                break;
            case 3:
                textureName = "zhenglie_png";
                break;
            case 4:
                textureName = "chanzi_png";
                break;
		}
		return textureName;
	}

    private getDisableTexture(type:number):string
    {
        var textureName:string = "";
        switch(type)
        {
            case 0:
                textureName = "tongsedisable_png";
                break;
            case 1:
                textureName = "zhadandisable_png";
                break;
            case 2:
                textureName = "zhenghangdisable_png";
                break;
            case 3:
                textureName = "zhengliedisable_png";
                break;
            case 4:
                textureName = "chanzidisable_png";
                break;
        }
        return textureName;
    }

	private setActivateState(val:boolean){
		this.touchEnabled = val;
		if(val){
			this._view_active.texture = RES.getRes(this.getActivateTexture(this._type));
			this._numText.font = RES.getRes("number_fnt");
           // this._view_box.texture = RES.getRes("propbox_png");
		}else{
			this._view_active.texture = RES.getRes(this.getDisableTexture(this._type));
			this._numText.font = RES.getRes("numberdisable_fnt");
          //  this._view_box.texture = RES.getRes("propboxdisable_png");
		}

	}

 	public setFocus(val:boolean)
    {
	
        if(val)
        {
			this._view_active.texture = RES.getRes(this.getFocusTexture(this._type));
            //this._view_box.texture = RES.getRes("propboxactive_png");
			
        }
        else
        {
			if(this._num>0){
				this._view_active.texture = RES.getRes(this.getActivateTexture(this._type));
			}
			else{
				this._view_active.texture = RES.getRes(this.getDisableTexture(this._type));
			}
            //this._view_box.texture = RES.getRes("propbox_png");
        }
    }

}