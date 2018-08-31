class Rect extends egret.Sprite {
    public constructor(num: number, id: number, _spType: number, roatation_type: number) {
        super();
        this.Id = id;
        this.RotationId = roatation_type;
        this.TypeSprite(num, _spType, roatation_type);
    }
    public Id: number;
    public RotationId: number;

    public _RectBool: RectBool;
    public _rect: Array<any> = [];
    public rectType: Array<string> = ["c1_png", "c2_png", "c3_png", "c4_png", "c5_png", "c6_png",];
    private TypeSprite(num: number, _spType: number, roatation_type: number) {

        // var _spType =10;  
        // console.log("选择的类型为:",_spType);
        for (var a = 0; a < data.typeArray[_spType][roatation_type].length; a++) {
            var sp_x = data.typeArray[_spType][roatation_type][a][0] * data.rect_width;
            var sp_y = data.typeArray[_spType][roatation_type][a][1] * data.rect_width;
            this.createRect(sp_x, sp_y, num, _spType, roatation_type);
        }
    }
    private createRect(sp_x: number, sp_y: number, num: number, spType: number, _roatation_type: number) {
        var str: string = this.rectType[num];
        var sp: RectBool = new RectBool();
        sp.texture = RES.getRes(str);
        this.addChild(sp);
        sp.COLOR = num;
        sp.TYPE = spType;
        sp.ROTATIONTYPE = _roatation_type;
        sp.CANREMOVE = false;
        sp.x = sp_x;
        sp.y = sp_y;
        sp.ROW = 0;
        sp.COL = 0;

        this._rect.push(sp);
    }
}