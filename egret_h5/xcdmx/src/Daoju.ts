class addDaoju extends egret.Sprite {
    public constructor() {
        super();
        this.addDaojuAnction();
    }
    private addDaojuAnction() {/*添加增加玩家道具动画*/
        this.touchEnabled = true;
        var egret_width = egret.MainContext.instance.stage.stageWidth;
        var egret_height = egret.MainContext.instance.stage.stageHeight;
        this.touchEnabled = true;//防止点击穿透；防止下层点击事件被触发
        var sp: egret.Sprite = new egret.Sprite();
        // sp.graphics.lineStyle(0x000000);
        sp.graphics.beginFill(0x000000, 0.5);
        sp.graphics.drawRect(0, 0, egret_width, egret_height);
        sp.graphics.endFill();
        this.addChild(sp);

        var _data = RES.getRes("sun_json");
        var txtr = RES.getRes("sun_png");
        var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(_data, txtr);
        var mc1: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("sun"));
        this.addChild(mc1);
        mc1.play(2);
        mc1.x = egret.MainContext.instance.stage.stageWidth / 2 - mc1.width / 2 - 10;
        mc1.y = egret.MainContext.instance.stage.stageHeight / 2 - mc1.height / 2 - 10;
        mc1.anchorOffsetX = mc1.width / 2;
        mc1.anchorOffsetY = mc1.height / 2;
        var sp_Array = [
            {
                url: "refresh_png",
                _x: 450,
                _y: 920,
            },
            {
                url: "transform_png",
                _x: 600,
                _y: 920,
            },
        ]
        var _index = Math.floor(Math.random() * 2);
        var _url = sp_Array[_index].url

        var btn1: egret.Bitmap = new egret.Bitmap();
        btn1.texture = RES.getRes(_url);
        this.addChildAt(btn1, 10);
        btn1.x = egret.MainContext.instance.stage.stageWidth / 2;
        btn1.y = egret.MainContext.instance.stage.stageHeight / 2;
        btn1.anchorOffsetX = btn1.width / 2;
        btn1.anchorOffsetY = btn1.height / 2;
        this.addChild(btn1);
        var that = this;

        mc1.addEventListener(egret.Event.COMPLETE, (e: egret.Event) => {
            var end_x = sp_Array[_index]._x;
            var end_y = sp_Array[_index]._y;
            if (mc1.parent) {
                mc1.parent.removeChild(mc1);
                egret.Tween.get(btn1).to({ x: end_x, y: end_y, scaleX: 0.5, scaleY: 0.5 }, 1000).call(function () {
                    if (_index == 0) {
                        data.UPDATE_data++;
                        console.log("ssss", data.Game_Layer)
                        data.Game_Layer._updatedata.text = data.UPDATE_data.toString();
                    } else {
                        data.ROTATION_data++;
                        console.log("ssss", data.Game_Layer)
                        data.Game_Layer._rotationdata.text = data.ROTATION_data.toString();
                    }
                    that.parent.removeChild(that);
                });
            }
        }, this);
    }
    
}