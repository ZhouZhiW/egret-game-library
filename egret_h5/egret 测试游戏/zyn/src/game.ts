class game extends egret.DisplayObjectContainer {
    constructor() {
        super();
        // this.startGame()
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.startGame, this);
    }
    private startGame() {

        this.Addtitle();
        // SaveImageUtils.drawCanvasimages();
        // SaveImageUtils.imageTagVisible(true);
        this.CreateUP();
        

    }
    private CreateUP() {
        var _p = this.createBitmapByName("up_jpg");
        this.addChild(_p);
        _p.width = 1080;
        _p.height = 150;
        _p.touchEnabled = true;
        var that = this;
  
        _p.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
               top.window.location.href = _data.game_url;
          
            var _upgo = new upgo();
            // that.addChild(_upgo);
        }, this)
    }
 
    private _group: eui.Group;
    private Addtitle() {
        this._group = new eui.Group();
        this.addChild(this._group);
        this._group.width = 1080;
        this._group.y = _data.start_bgY;
        this._group.x = 0
        this._group.layout = new eui.BasicLayout();
        this.addTitle(this._group);
    }
    private _title: egret.TextField;
    private _bg;
    private addTitle(_group) {
        this._title = new egret.TextField();
        _group.addChildAt(this._title, 2);
        this._title.text = _data._title;
        this._title.textAlign = egret.HorizontalAlign.CENTER;
        this._title.width = 1080;
        this._title.height = 60;
        this._title.size = 65;
        this._title.textColor = 0x000000;
        this._title.bold = true;
        this._title.y = 50;
        this.addBg(_group);
    }

    private addBg(_group) {
        var dis_num = 0
        var img_index = _data.img_type[_data.game_index].icon;
        if (img_index.length == 1) {
            this._bg = this.createBitmapByName(img_index[0]);
            _group.addChild(this._bg);
            this._bg.width = 1080;
            this._bg.height = 480;
            this._bg.y = this._title.y + this._title.height + 40;
        } else {
            var data = RES.getRes("img7_json");
            var txtr = RES.getRes("img7_png");
            var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
            this._bg = new egret.MovieClip(mcFactory.generateMovieClipData("test"));
            _group.addChild(this._bg);
            this._bg.play(-1);
            this._bg.width = 1080;
            this._bg.height = 480;
            this._bg.x = _group.width / 2;
            // this._bg.y = this._title.y + this._title.height + 40;
            this._bg.y = 400;
        }
        var _num = _data.game_index;
        dis_num = this._title.y + this._title.height + 40
        this.addQuestion(_num, dis_num);
    }
    private TextTwo: egret.TextField;
    private addQuestion(num, dis_num) {
        this.TextTwo = new egret.TextField();
        this.addChild(this.TextTwo);
        this.TextTwo.textColor = 0x000000;
        this.TextTwo.width = 1040;
        this.TextTwo.height = 200;
        this.TextTwo.x = 40;
        this.TextTwo.size = 50;
        this.TextTwo.lineSpacing = 15
        this.TextTwo.y = dis_num + this._bg.height + _data.start_bgY + 50;
        this.TextTwo.textFlow = <Array<egret.ITextElement>>[
            { text: _data.img_type[num].text_color, style: { "textColor": 0x6c2678, } },
            { text: _data.img_type[num].text, style: { "textColor": 0x000000, } },
            { text: _data.img_type[num].title, style: { "textColor": 0x000000, } },
        ];
        this.TextTwo.textAlign = egret.VerticalAlign.MIDDLE;
        var _len = _data.img_type[num].title.length
        var rect_height = this.TextTwo.y - this._group.y + this.TextTwo.height + Math.floor(_len / 20) * 50 + 100;
        this.CreateSelect(rect_height, num);

    }
    private _info: eui.Label;
    private CreateSelect(num_y, _index) {
        var group = new eui.Group();
        group.width = this.stage.stageWidth;
        this.addChild(group);
        var layout = new eui.VerticalLayout();
        layout.gap = 50;
        layout.verticalAlign = egret.VerticalAlign.MIDDLE;
        layout.horizontalAlign = egret.HorizontalAlign.CENTER;
        group.layout = layout;
        var text_w = 100;//设置答案的宽度为150
        var _length = _data.img_type[_index].result.length - 1;
        for (var a = 0; a < _length; a++) {
            this.CreateShape(group, a, num_y, text_w, _index);
        }

        var rect_height = num_y + _length * (text_w) + 50;
        this.CreateRect(rect_height);
    }
    private yes_Array = [];
    private CreateShape(_group, num, num_y, tex_w, _index) {
        var _shape = new shape();
        _shape.graphics.beginFill(0xffffff);
        _shape.graphics.drawRect(40, 0, this.stage.stageWidth - 80, tex_w);
        _shape.graphics.endFill();
        _group.addChild(_shape);
        _shape.touchEnabled = true;
        _shape.id = num;
        _shape.y = num_y + num * (tex_w);
        _shape.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onchange, this);
        _shape.addEventListener(egret.TouchEvent.TOUCH_END, this.endchange, this);
        var text: egret.TextField = new egret.TextField();
        text.text = _data.img_type[_index].result[num + 1];
        text.textColor = 0x000000;
        _group.addChild(text);
        text.y = num_y + num * (tex_w) + 25;
        text.x = 200;
        text.size = 40;
        var no_bg = this.createBitmapByName("no_png")
        _group.addChild(no_bg);
        no_bg.x = 80;
        no_bg.y = num_y + num * (tex_w) + 25;
        no_bg.width = 50;
        no_bg.height = 50;
        var sp_bg = new bg();
        sp_bg.texture = RES.getRes("yes_png");
        _group.addChild(sp_bg);
        sp_bg.width = 50;
        sp_bg.height = 50;
        sp_bg.x = 80;
        sp_bg.y = num_y + num * (tex_w) + 25;
        this.yes_Array.push(sp_bg);
        sp_bg.visible = false;
    }
    private onchange(evt: egret.TouchEvent) {
        for (var a = 0; a < this.yes_Array.length; a++) {
            this.yes_Array[a].visible = false;
        }
        this.yes_Array[evt.currentTarget.id].visible = true;
    }
    private endchange(evt: egret.TouchEvent) {
        if (this.parent) {
            this.parent.removeChild(this);
            if (_data.game_index < 8) {
                var _game = new game();
                _data.game_index++;
                _data.Main_layer.addChild(_game);
            } else {
                var _game1 = new end();
                _data.Main_layer.addChild(_game1);
            }

        }
    }
    private CreateRect(_height) {
        var bg_shape: egret.Shape = new egret.Shape();
        bg_shape.graphics.beginFill(0xe9f2f5);
        bg_shape.graphics.drawRoundRect(0, _data.start_bgY, 1080, _height, 80, 80);
        bg_shape.graphics.endFill();
        this.addChildAt(bg_shape, 1);
        this.swapChildren(this._group, bg_shape);
    }

    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}