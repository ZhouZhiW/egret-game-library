class PropViewManage {
	private _layer:egret.Sprite;

	public constructor(root:egret.Sprite) {
		this._layer =root;
		this.init();
	}

	private _props:PropView[];
	private init(){
		this._props = new Array();
		this.testdata();

	}
    /**
     * (测试)随机生成 道具 数量
     */
    private testdata()
    {
        for(var i:number=0;i<5;i++)
        {
            var prop:PropView = new PropView(i);
            prop.x = 15+(5+prop.width)*i;
            //console.log("道具宽度",prop.width);
            prop.y = GameData.stageH - prop.height -10;//- 15;
            this._layer.addChild(prop);
            this._props.push(prop);
            prop.num = Math.floor(Math.random()*5) +10;         
            prop.id = i;
            prop.addEventListener(egret.TouchEvent.TOUCH_TAP,this.click,this);
        }

    }

    private _currentID:number = -1;
    /**
     * 处理道具被点击事件
     */
    private click(evt:egret.TouchEvent) {
        if(this._currentID!=-1){
            this._props[this._currentID].setFocus(false);
            if(this._currentID ==(<PropView>evt.currentTarget).id){
                this._currentID=-1;
                PropViewManage.propType=-1;                
            }
            else{
                this._currentID =(<PropView>evt.currentTarget).id;
                this._props[this._currentID].setFocus(true);
                PropViewManage.propType = this._props[this._currentID].proptype;
            }
        }
        else{
            this._currentID =(<PropView>evt.currentTarget).id;
            this._props[this._currentID].setFocus(true);
            PropViewManage.propType = this._props[this._currentID].proptype;
        }
    }
	public static propType:number = -1;  //道具类型
    /**
     * 使用道具
     */
    public useProp()
    {
        console.log("当前焦点ID",this._currentID);
        this._props[this._currentID].num--;
        this._props[this._currentID].setFocus(false);
        this._currentID = -1;
        PropViewManage.propType = -1;
    }
}