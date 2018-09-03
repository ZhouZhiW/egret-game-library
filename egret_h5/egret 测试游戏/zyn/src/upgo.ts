class upgo extends egret.DisplayObjectContainer {
    constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.startGame, this);
    }
    private startGame() {
        var _shape = new egret.Shape();
        var w = egret.MainContext.instance.stage.stageWidth
        var h = egret.MainContext.instance.stage.stageHeight
        _shape.graphics.beginFill(0x000000, 0.5);
        _shape.graphics.drawRect(0, 0, w, h);
        _shape.graphics.endFill();
        this.addChild(_shape);
        _shape.touchEnabled = true;
        var _upgo = this.createBitmapByName("upgo_png");
        this.addChild(_upgo);

        var _h = _upgo.width / _upgo.height
        _upgo.width = 800
        _upgo.height = _upgo.width / _h
        _upgo.x = w / 2 - _upgo.width / 2;
        _upgo.y = h / 2 - _upgo.height / 2;
        var _quxiao = this.createBitmapByName("quxiao_png");
        this.addChild(_quxiao);
        _quxiao.x=900;
        _quxiao.y=100;
        _quxiao.width=100;
        _quxiao.height=100;
        var that=this;
        _quxiao.touchEnabled=true;
        _quxiao.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){
            if(that.parent){
                that.parent.removeChild(that);
            }
        },this)
    }
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}