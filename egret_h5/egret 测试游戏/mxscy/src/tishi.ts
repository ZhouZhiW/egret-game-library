class tishi extends egret.DisplayObjectContainer{
    constructor(){
        super();
        this.addtishi();
    }
      private addtishi() {
        var _shape = new egret.Shape();
        _shape.graphics.beginFill(0x000000,0.5);
        var _posX = egret.MainContext.instance.stage.stageWidth/ 2 - 150;
        var _posY =egret.MainContext.instance.stage.stageHeight / 2-100;
        _shape.graphics.drawRoundRect(_posX, _posY, 300, 100, 50, 50);
        _shape.graphics.endFill();
        this.addChild(_shape);
        var _text = this.Createtext("请输入姓名", 40);
        _text.x = _posX;
        _text.y = _posY;
        _text.width=300;
        _text.height=100;
        _text.textAlign="center";
        _text.verticalAlign=egret.VerticalAlign.MIDDLE;
        this.addChild(_text);
    }  
    private Createtext(str, _num) {
        var _text: egret.TextField = new egret.TextField();
        _text.text = str;
        _text.size = _num;
        return _text;
    }
}