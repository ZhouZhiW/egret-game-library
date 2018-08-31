class Map extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.CreateMap();
        this.addUi();

        data.Map_Layer = this;
    }
    public Map_Array: Array<any> = [];
    private CreateMap() {
        var bg: egret.Bitmap = this.createBitmapByName("bg2_jpg");
        bg.width = egret.MainContext.instance.stage.stageWidth;
        bg.height = egret.MainContext.instance.stage.stageHeight;
        this.addChild(bg);
        for (var a = 0; a < data.map_row; a++) {
            for (var b = 0; b < data.map_col; b++) {
                this.Map_Array.push(
                    {
                        row: a,
                        col: b,
                        x: data.rect_x + data.rect_width * b,
                        y: data.rect_y + a * data.rect_width,
                        canDown: false
                    }
                )
                this.addSprite(data.rect_x + data.rect_width * a, data.rect_y + b * data.rect_width);
            }
        }
        if (data.Is_first && data.readDateArray&&data.readDateArray.gameArray.up_game.length>0) {
            for (var i = 0; i < data.readDateArray.gameArray.up_game.length; i++) {
                var _x = data.readDateArray.gameArray.up_game[i].rect_x;
                var _y = data.readDateArray.gameArray.up_game[i].rect_y;//表示随机从方块类型为13种选取一中
                var _row = data.readDateArray.gameArray.up_game[i].rect_row;
                var _col = data.readDateArray.gameArray.up_game[i].rect_col;
                var _color = data.readDateArray.gameArray.up_game[i].rect_color;
                this.create_Rect(_x, _y, _color, _row, _col);
            }
        }
    }
    private addSprite(sp_x: number, sp_y: number) {
        var bg: egret.Bitmap = this.createBitmapByName("geizi_png");
        bg.x = sp_x;
        bg.y = sp_y;
        this.addChild(bg);
    }
    private addUi() {
        var jiangbei: egret.Bitmap = this.createBitmapByName("achievement_png");
        this.addChild(jiangbei);
        jiangbei.x = egret.MainContext.instance.stage.stageWidth / 2 - jiangbei.width / 2;
        jiangbei.y = 75;

    }
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    public rectType: Array<string> = ["c1_png", "c2_png", "c3_png", "c4_png", "c5_png", "c6_png",];
    private create_Rect(sp_x: number, sp_y: number, _color: number, _row: number, _col: number) {
        var str: string = this.rectType[_color];
        var sp: RectBool = new RectBool();
        sp.texture = RES.getRes(str);
        this.addChild(sp);
        sp.COLOR = _color;
        sp.CANREMOVE = false;
        sp.x = sp_x;
        sp.y = sp_y;
        sp.ROW = _row;
        sp.COL = _col;
        data.Block_Array[sp.ROW * data.map_row + sp.COL] = sp;
        this.Map_Array[sp.ROW * data.map_row + sp.COL].canDown = true;
    }

}