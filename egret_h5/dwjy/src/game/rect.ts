class Rect extends egret.Sprite {
    constructor(tag, row, col, x, y) {
        super();

        this._x = x;
        this._y = y;
        this.row = row;
        this.col = col;
        this.texttag = tag;
        this.tag = tag;
        var _tag = tag % 9;
        if (_tag == 0) {
            _tag = 9;
        }
        this.bmttag = _tag;
        this.CreateObj();
    }
    private _font;
    public _x;
    public _y;
    public row;
    public col;
    public tag;/*用于表示该对象的数字大小*/
    public texttag/*表示的是文字的大小*/
    public bmttag/*表示的是颜色背景图片的下标*/
    /*用于评估函数的三个数值*/
    public ag = 0;
    public ah = 0;
    public af = 0;
    public isOb = null;/*用于寻路算法中 判断是否能通过某个位置*/
    public parentNode = null;/*添加 父节点属性*/

    public ismove: boolean;/*该对象是移动状态*/
    public ischeck: boolean = false;/*改对象是否被检测*/
    public isfall: boolean;/*该对象是否是下落状态*/
    public removeArr = [];/*用于存储数字方块要删除时的移动路径*/
    public removeIdx = 0;
    public removeEnd = false;
    public removeCreate = false;
    public remoSpeed = null;
    public isClickStage: boolean;/*判断某个数值方块是否是点击状态*/
    public _obj;/*创建纹理图片*/
    public num;/*创建纹理数字*/
    private CreateObj() {
        this._obj = new egret.Bitmap();
        this._obj.texture = RES.getRes(Data.colorArr[this.bmttag - 1]);
        this._obj.width = Data._width;
        this._obj.height = Data._width;
        this._obj.anchorOffsetX = this._obj.width / 2;
        this._obj.anchorOffsetY = this._obj.height / 2;
        this._obj.x = this.x;
        this._obj.y = this.y;
        this.addChild(this._obj);
        this.setChildIndex(this._obj, 1);
        this.num = new egret.TextField();
        // this.num = new egret.BitmapText();
        // this.num.font=Data.playlayer._font;
        // this.num.scale=0.2;
        this.num.size = 80;
        this.num.text = this.texttag.toString();
        this.num.anchorOffsetX = this.num.width / 2;
        this.num.anchorOffsetY = this.num.height / 2;
        // this.num.textColor = 0x000;
        this.num.x = this.x;
        this.num.y = this.y;
        this.addChild(this.num);
        this.setChildIndex(this.num, 2);
    }

}