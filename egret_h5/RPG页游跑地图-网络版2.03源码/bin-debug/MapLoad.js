/**
 *
 * @author
 *
 */
var MapLoad = (function (_super) {
    __extends(MapLoad, _super);
    function MapLoad() {
        _super.call(this);
        /**地图 元素 数组*/
        this.mapsElement = [];
        this.isMusic = true;
        this.init();
    }
    var d = __define,c=MapLoad,p=c.prototype;
    p.init = function () {
        this.onMusic();
        RES.getResAsync("1001_json", this.onRes, this);
    };
    p.onRes = function (result) {
        //console.log(result.length);
        for (var count = 0, length = result.length; count < length; count++) {
            var lineArr = result[count];
            MapLoad.mapName = lineArr["MapName"];
            MapLoad.mapWidth = parseInt(lineArr["MapWidth"]);
            MapLoad.mapHeight = parseInt(lineArr["MapHeight"]);
            MapLoad.imgWH = parseInt(lineArr["imgWH"]);
            MapLoad.tileWidth = parseInt(lineArr["TileWidth"]);
            MapLoad.tileHeight = parseInt(lineArr["TileHeight"]);
            MapLoad.row = parseInt(lineArr["Row"]);
            MapLoad.offsetY = parseInt(lineArr["OffsetY"]);
            var ScenePoint = lineArr["ScenePoint"];
            console.log(ScenePoint);
            console.log(MapLoad.mapName + "|" + MapLoad.mapWidth + "|" + MapLoad.mapHeight + "|" + MapLoad.imgWH);
            console.log(MapLoad.tileWidth + "|" + MapLoad.tileHeight + "|" + MapLoad.row + "|" + MapLoad.offsetY);
            var va = Math.floor(MapLoad.mapWidth / MapLoad.imgWH) - 1;
            var vb = Math.floor(MapLoad.mapHeight / MapLoad.imgWH) - 1;
            console.log(va + "  " + vb);
            var sArray = new Array();
            var msgZu = ScenePoint.split(","); //分割消息
            var n = 0;
            for (var k = 0; k < MapLoad.row; k++) {
                sArray[k] = new Array(); //声明二维，每一个一维数组里面的一个元素都是一个数组；
                for (var j = 0; j < MapLoad.row; j++) {
                    sArray[k][j] = msgZu[n]; //这里将变量初始化，我这边统一初始化为空，后面在用所需的值覆盖里面的值
                    n += 1;
                }
            }
            console.log(sArray.length);
            console.log(sArray[12][118]);
            console.log(sArray[13][118]);
            console.log(sArray[14][118]);
            MapLoad.sceneArray = sArray;
            this.Scene(MapLoad.mapName, va, vb, MapLoad.imgWH);
        }
        /*for(var i:number = 0,length:number = this.elName.length;i<length;i++){
            console.log(this.elName[i].name + " x:" + this.elName[i].x + " y:" + this.elName[i].y)
        }*/
    };
    p.Scene = function (map, x, y, hw) {
        var imgN;
        for (var i = 0; i <= x; i++) {
            for (var n = 0; n <= y; n++) {
                imgN = new imgName();
                imgN.name = i + '_' + n;
                imgN.x = i * hw;
                imgN.y = n * hw;
                this.mapsElement.push(imgN);
            }
        }
        this.dispatchEvent(new egret.Event("LoadOk"));
    };
    p.onMap = function (imgN, context) {
        RES.getResByUrl('resource/assets/map/1001/' + imgN.name + '.jpg', function (event) {
            var img = event;
            var bitmap = new egret.Bitmap(img);
            bitmap.x = imgN.x;
            bitmap.y = imgN.y;
            //console.log(x + " || " + y);
            imgN.mapsElement = bitmap;
            imgN.isLoad = true;
            //this.mapsElement.push(bitmap);//地图元素
            //this.addChild(bitmap);
            if (context) {
                context.addChild(bitmap);
            }
        }, this, RES.ResourceItem.TYPE_IMAGE);
    };
    p.playMusic = function () {
        if (this.isMusic) {
            if (this.BgSound) {
                if (this.BgSound.isOk) {
                    this.BgSound.playSound();
                    console.log("播放");
                    this.isMusic = false;
                }
            }
        }
    };
    /** 加载场景背景音乐 */
    p.onMusic = function () {
        /*        RES.getResByUrl('resource/assets/map/1001/sound.mp3',function(event: any) {
                    var music:egret.Sound = <egret.Sound>event;
                    
                    mu.setTmd_a(music);
                    
                },this,RES.ResourceItem.TYPE_SOUND);*/
        RES.getResByUrl('resource/assets/map/1001/sound.mp3', this.test, this, RES.ResourceItem.TYPE_SOUND);
    };
    p.test = function (event) {
        var mu = new Nmd();
        this.BgSound = mu;
        var music = event;
        mu.setTmd_a(music);
    };
    //=======================地图参数
    /**名称*/
    MapLoad.mapName = "";
    /**宽度*/
    MapLoad.mapWidth = 0;
    /**高度*/
    MapLoad.mapHeight = 0;
    /**碎图宽高*/
    MapLoad.imgWH = 0;
    /**格子宽*/
    MapLoad.tileWidth = 0;
    /**格子高*/
    MapLoad.tileHeight = 0;
    /**横向格子数*/
    MapLoad.row = 0;
    /**Y轴偏移*/
    MapLoad.offsetY = 0;
    /**二维数组，障碍、遮罩 点*/
    MapLoad.sceneArray = new Array();
    return MapLoad;
})(egret.Shape);
egret.registerClass(MapLoad,'MapLoad');
//# sourceMappingURL=MapLoad.js.map