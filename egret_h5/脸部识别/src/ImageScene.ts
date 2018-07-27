class ImageScene extends egret.DisplayObjectContainer {

    private con: egret.DisplayObjectContainer;
    private rcon: egret.DisplayObjectContainer;
    private photo: egret.Bitmap;

    private scale: number = 0;
    private maxW: number = 877;
    private maxH: number = 300;

    private node: one.WebNode;

    //private htmlImg: HTMLImage;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED, this.init, this);
    }

    private init(e) {
        this.removeEventListener(egret.Event.ADDED, this.init, this);
        //this.htmlImg = new HTMLImage();
        this.node = new one.WebNode();
        this.maxH = this.stage.stageHeight - 798
    }

    public InitImage(data: string, xuanzhuan: boolean) {
        console.log("旋转", xuanzhuan)
        if (this.photo != null) {
            this.con.removeChildren();
            this.rcon.removeChildren();
            this.photo = null;
            this.con = null;
            this.rcon = null;
            this.removeChildren()
            //this.htmlImg.removeFromDOM();
            console.log("clear")
        }
        RES.getResByUrl(data, (texture: egret.Texture) => {
            console.log(texture)
            this.photo = new egret.Bitmap(texture);
            this.photo.smoothing = true;
            console.log(this.photo)
            egret.log("拍照的图", this.photo.width, this.photo.height)
            this.addChild(this.photo);
            this.drawCon();
        }, this, RES.ResourceItem.TYPE_IMAGE);
    }


    private drawCon() {
        if (this.con == null) {
            this.con = new egret.DisplayObjectContainer();
            this.rcon = new egret.DisplayObjectContainer();
            this.rcon.addChild(this.con);
            this.addChild(this.rcon);
        }
        this.con.addChild(this.photo);
        console.log((this.photo.width / this.photo.height), (this.maxW / this.maxH))
        if ((this.photo.width / this.photo.height) < (this.maxW / this.maxH)) {
            this.scale = this.maxH / this.photo.height;
        } else {
            this.scale = this.maxW / this.photo.width;
        }

        this.con.scaleX = this.scale;
        this.con.scaleY = this.scale;
        this.con.x = (this.stage.stageWidth - this.con.width * this.scale) / 2;
        this.con.y = 444 + (this.maxH - this.con.height * this.scale) / 2;

        //框
        let k: egret.Bitmap = new egret.Bitmap();
        k.texture = RES.getRes("kuang_png");
        this.rcon.addChild(k);
        k.width = this.photo.width * this.scale + 33;
        k.height = this.photo.height * this.scale + 33;
        k.x = this.con.x - 16;
        k.y = this.con.y - 6;

    }

    public drawAnalysis(obj: Object[], bardata: Object[]) {
        console.log(obj);

        if (obj.length == 0) {
            //没有脸
            let bg: egret.Bitmap = new egret.Bitmap();
            let texture: egret.Texture = RES.getRes("meilian_png")
            bg.texture = texture;
            bg.x = (this.stage.stageWidth - bg.width) / 2;
            bg.y = (this.stage.stageHeight - bg.height) / 2;
            this.rcon.addChild(bg);

        } else {
            for (let i = 0; i < obj.length; i++) {
                this.drawBorder(obj[i])
            }
            this.drawbar(bardata);
            this.drawErweima();

            //创建html image标签1
            let rect: egret.Rectangle = new egret.Rectangle(0, 0, this.stage.stageWidth, this.stage.stageHeight);
            rect.height = this.con.y + this.con.height * this.scale + 50//this.rcon.height;//this.con.y + this.con.height * this.scale + 50;
            //this.htmlImg.addToDOM(this.stage, rect, this.stage);
            //this.htmlImg.removeDOMByID("jietu")

            let img = document.createElement("img");
            this.node.bind(img);
            this.node.width = rect.width;
            this.node.height = rect.height;
            this.addChild(this.node);

            var renterTexture: egret.RenderTexture = new egret.RenderTexture();
            renterTexture.drawToTexture(this.stage, rect);
            img.src = renterTexture.toDataURL("image/png");
            //this.rcon.removeChildren();

            this.succeeText();
        }
        
    }

    private drawBorder(obj: any) {
        //框
        let border: egret.Shape = new egret.Shape();
        border.graphics.lineStyle(2, 0xffffff, 0.5);
        border.graphics.drawRect(this.con.x + this.scale * obj["faceRectangle"].left, this.con.y + this.scale * obj["faceRectangle"].top, this.scale * obj["faceRectangle"].width, this.scale * obj["faceRectangle"].height);
        border.graphics.endFill();
        this.rcon.addChild(border);
    }

    private drawbar(obj: Object[]) {
        console.log("标签", obj)
        let len: number = 0;
        if (obj.length > 2) {
            len = 2;
        } else {
            len = obj.length
        }
        let rects: egret.Rectangle[] = []
        console.log("长度", len)
        for (let i = 0; i < len; i++) {
            //年龄bar
            let bar: egret.DisplayObjectContainer = Bar.create(parseFloat(obj[i]["faceAttributes"]["smile"]),
                obj[i]["faceAttributes"]["gender"],
                parseInt(obj[i]["faceAttributes"]["age"]))

            bar.x = this.con.x + this.scale * obj[i]["faceRectangle"].left + (this.scale * obj[i]["faceRectangle"].width - bar.width) / 2;
            bar.y = (this.con.y + this.scale * obj[i]["faceRectangle"].top) - 140
            rects.push(new egret.Rectangle(bar.x, bar.y, bar.width, bar.height));
            bar.alpha = 0.85;
            this.rcon.addChild(bar)
        }
        if (rects.length == 2) {
            this.linkHeart(rects[0], rects[1]);
        }
    }

    private drawErweima() {
        let erweima: egret.Bitmap = new egret.Bitmap();
        erweima.texture = RES.getRes("erweima_png");
        this.rcon.addChild(erweima);

        erweima.width = 150;
        erweima.height = 150;
        erweima.x = this.con.x + this.con.width * this.scale - erweima.width;
        erweima.y = this.con.y + this.con.height * this.scale - erweima.height;
    }

    private linkHeart(rect1: egret.Rectangle, rect2: egret.Rectangle) {
        let heart: HeartValue = new HeartValue();
        this.rcon.addChild(heart);
        let p1: egret.Point = new egret.Point(rect1.x + rect1.width / 2, rect1.y + rect1.height / 2);
        let p2: egret.Point = new egret.Point(rect2.x + rect2.width / 2, rect2.y + rect2.height / 2);

        let pc: egret.Point = egret.Point.interpolate(p1, p2, 0.5);;
        if (egret.Point.distance(p1, p2) < 358) {
            pc.y -= 170
        }

        heart.x = pc.x;
        heart.y = pc.y;
        heart.alpha = 0.85;
        //e63333 line
        let l1: egret.Shape = new egret.Shape();
        l1.graphics.lineStyle(5, 0xe63333, 0.85);
        l1.graphics.moveTo(p1.x, p1.y);
        l1.graphics.curveTo(p1.x, pc.y, pc.x, pc.y);
        l1.graphics.endFill();
        this.rcon.addChildAt(l1, this.rcon.numChildren - 3);


        let l2: egret.Shape = new egret.Shape();
        l2.graphics.lineStyle(5, 0xe63333, 0.85);
        l2.graphics.moveTo(p2.x, p2.y);
        l2.graphics.curveTo(p2.x, pc.y, pc.x, pc.y);
        l2.graphics.endFill();
        this.rcon.addChildAt(l2, this.rcon.numChildren - 3);
        //console.log(rect1,rect2,heart.getBounds())
    }

    private succeeText() {
        let k: egret.Bitmap = new egret.Bitmap();
        k.texture = RES.getRes("tishi");
        this.rcon.addChild(k);
        k.x = (this.stage.stageWidth - k.width) / 2;
        k.y = this.con.y + this.con.height * this.scale + 50
    }
}