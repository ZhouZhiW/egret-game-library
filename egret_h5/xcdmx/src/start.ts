class start extends egret.Sprite {
    public constructor() {
        super();
        data.Start_Layer = this
        this.CreateBg();

    }
    public sound1: egret.Sound;
    public sound2: egret.Sound;

    private CreateBg() {
        var bg: egret.Bitmap = new egret.Bitmap();
        var textrue: egret.Texture = RES.getRes("bg_cover_png");
        bg.texture = textrue;
        this.addChild(bg);
        bg.x = egret.MainContext.instance.stage.stageWidth / 2;
        bg.y = egret.MainContext.instance.stage.stageHeight / 2;
        bg.anchorOffsetX = bg.width / 2;
        bg.anchorOffsetY = bg.height / 2

        var egret_width = egret.MainContext.instance.stage.stageWidth;
        var egret_height = egret.MainContext.instance.stage.stageHeight;
        data.createBtn("button_jdms_png", function () {
            if (data.Start_Layer.parent) {
                data.Start_Layer.parent.removeChild(data.Start_Layer);
            }

            data.Start_Layer.sound1 = RES.getRes("sound_del2_mp3");
            data.Start_Layer.sound2 = RES.getRes("sound_set2_mp3");
       
            var channel:egret.SoundChannel = data.Start_Layer.sound1.play(0,1);
            channel.stop()
            var channe2:egret.SoundChannel = data.Start_Layer.sound2.play(0,1);
            channe2.stop();
            
            var _game: game = new game();
            data.Main_Layer.addChild(_game);
            // egret.runEgret(new game())
        }, egret_width / 2, egret_height / 2, this)
    }
    private onLoadComplete(event: egret.Event): void {
        var loader: egret.URLLoader = <egret.URLLoader>event.target;
        //获取加载到的 Sound 对象
        var sound: egret.Sound = <egret.Sound>loader.data;
        this.sound1 = sound;

    }


}