class GroupRect extends egret.Sprite {
    public constructor() {
        super();
        // this.createRects();
        if (data.Is_first&&data.readDateArray&&data.readDateArray.gameArray.down_game.length>0) {
            this.addSavedata();
            data.Is_first=false;
        } else {
            this.createRects();
        }
    }
    public _group: Array<Rect>;
    public id: number;
    public RotationId: number = 0;
    public getid: number = 0;
    public ISCLICK: boolean = false;
    private createRects() {
        this._group = [];//初始化数组
        for (var i = 0; i < 3; i++) {
            var _num = Math.floor(Math.random() * 6);
            var _spType = Math.floor(Math.random() * 15)//表示随机从方块类型为13种选取一中
            this.RotationId = 0;
            this.createSprite(_num, i, _spType, this.RotationId);
        }
    }
    private onClickBegin(evt: egret.TouchEvent) {
        this.getid = evt.currentTarget.Id;
        this.ISCLICK = true;
    }
    public rectType: Array<string> = ["c1_png", "c2_png", "c3_png", "c4_png", "c5_png", "c6_png",];
    private addSavedata() {
        this._group = [];//初始化数组
        var clicknum = [];
        for (var i = 0; i < data.readDateArray.gameArray.down_game.length; i++) {
            var _num = data.readDateArray.gameArray.down_game[i][0].rect_color;
            var _spType = data.readDateArray.gameArray.down_game[i][0].rect_type;//表示随机从方块类型为13种选取一中
            var RotationId = data.readDateArray.gameArray.down_game[i][0].rect_rotationtype;
            var i_index = data.readDateArray.gameArray.down_game[i][0].rect_CLICKNUM;
            this.createSprite(_num, i_index, _spType, RotationId);
            clicknum.push(i_index)
        }
        for (var a = 0; a < data.rect_num_Array.length; a++) {
            if (clicknum.indexOf(data.rect_num_Array[a]) == -1) {
                data.click_post[a].click = false;
                data.rect_num_Array.splice(a,1);
                a--;
                data.CLICKNUM--;
            }
        }

       
    }
    private createSprite(_num, _i_index, _spType, _rotationtype) {
        var rect = new Rect(_num, _i_index, _spType, _rotationtype);
        this._group[_i_index]=rect;
        this.addChild(rect);
        rect.scaleX = 0.5;
        rect.scaleY = 0.5;
        rect.x = data.DOWN_POSTION[_i_index][0];
        // rect.y = data.DOWN_POSTION[i][1];
        rect.y = 1300;
        egret.Tween.get(rect).to({ x: data.DOWN_POSTION[_i_index][0], y: data.DOWN_POSTION[_i_index][1] }, 600, egret.Ease.backOut);
        /*** 本示例关键代码段结束 ***/
        rect.touchEnabled = true;
        rect.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickBegin, this)//将组加上监听
    }
  
}