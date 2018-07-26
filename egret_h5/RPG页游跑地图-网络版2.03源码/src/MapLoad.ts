/**
 *
 * @author 
 *
 */
class MapLoad extends egret.Shape{
    /**地图 元素 数组*/
    public mapsElement: imgName[] = [];
    /**背景音乐*/
    private BgSound: Nmd;
    //=======================地图参数
    /**名称*/
    public static mapName: string = "";
    /**宽度*/
    public static mapWidth: number = 0;
    /**高度*/
    public static mapHeight: number = 0;
    /**碎图宽高*/
    public static imgWH: number = 0;
    /**格子宽*/
    public static tileWidth: number = 0;
    /**格子高*/
    public static tileHeight: number = 0;
    /**横向格子数*/
    public static row: number = 0;
    /**Y轴偏移*/
    public static offsetY: number = 0;
    /**二维数组，障碍、遮罩 点*/
    public static sceneArray = new Array();
	public constructor() {
        super();
        this.init();
	}
	private init():void{
    	this.onMusic();
        RES.getResAsync("1001_json",this.onRes,this);
	}
    private onRes(result:Array<any>):void{
        //console.log(result.length);
        
        for(var count: number = 0,length: number = result.length; count < length; count++) {
            var lineArr = result[count];
            MapLoad.mapName = lineArr["MapName"];
            MapLoad.mapWidth = parseInt(lineArr["MapWidth"]);
            MapLoad.mapHeight = parseInt(lineArr["MapHeight"]);
            MapLoad.imgWH = parseInt(lineArr["imgWH"]);
            MapLoad.tileWidth = parseInt(lineArr["TileWidth"]);
            MapLoad.tileHeight = parseInt(lineArr["TileHeight"]);
            MapLoad.row = parseInt(lineArr["Row"]);
            MapLoad.offsetY = parseInt(lineArr["OffsetY"]);
            var ScenePoint:string = lineArr["ScenePoint"];
            
            console.log(ScenePoint);
            console.log(MapLoad.mapName + "|" + MapLoad.mapWidth + "|" + MapLoad.mapHeight + "|" + MapLoad.imgWH);
            console.log(MapLoad.tileWidth + "|" + MapLoad.tileHeight + "|" + MapLoad.row + "|" + MapLoad.offsetY);
            var va: number = Math.floor(MapLoad.mapWidth / MapLoad.imgWH) - 1;
            var vb: number = Math.floor(MapLoad.mapHeight / MapLoad.imgWH) - 1;
            console.log(va + "  " + vb);
            
            var sArray = new Array();
            var msgZu: String[] = ScenePoint.split(",");//分割消息
            var n:number = 0;
            for(var k = 0;k < MapLoad.row;k++) {        //一维长度为i,i为变量，可以根据实际情况改变
                sArray[k] = new Array();    //声明二维，每一个一维数组里面的一个元素都是一个数组；
                for(var j = 0;j < MapLoad.row;j++) {      //一维数组里面每个元素数组可以包含的数量p，p也是一个变量；
                    sArray[k][j] = msgZu[n];       //这里将变量初始化，我这边统一初始化为空，后面在用所需的值覆盖里面的值
                    n += 1;
                }
            }
            console.log(sArray.length);
            console.log(sArray[12][118]);
            console.log(sArray[13][118]);
            console.log(sArray[14][118]);
            
            MapLoad.sceneArray = sArray;
            
            this.Scene(MapLoad.mapName,va,vb,MapLoad.imgWH);
        }	
        /*for(var i:number = 0,length:number = this.elName.length;i<length;i++){
            console.log(this.elName[i].name + " x:" + this.elName[i].x + " y:" + this.elName[i].y)
        }*/
	}
    private Scene(map: string,x: number,y: number,hw:number): void {
        var imgN: imgName;
        for(var i: number = 0;i <= x;i++) {
            for(var n: number = 0;n <= y;n++) {
                imgN = new imgName();
                imgN.name = i + '_' + n;
                imgN.x = i * hw ;
                imgN.y = n * hw ;
                this.mapsElement.push(imgN);
                //console.log(imgN.name + " " + imgN.x + " " + imgN.y);
                //this.onMap(imgN);
            }
        }
        this.dispatchEvent(new egret.Event("LoadOk"));
    }
    public onMap(imgN: imgName,context?: egret.Sprite): void {
        RES.getResByUrl('resource/assets/map/1001/' + imgN.name + '.jpg',function(event: any) {
            var img: egret.Texture = <egret.Texture>event;
            var bitmap: egret.Bitmap = new egret.Bitmap(img);
            bitmap.x = imgN.x;
            bitmap.y = imgN.y;
            //console.log(x + " || " + y);
            imgN.mapsElement = bitmap;
            imgN.isLoad = true;
            //this.mapsElement.push(bitmap);//地图元素
            //this.addChild(bitmap);
            if(context){
                context.addChild(bitmap);
                //console.log(imgN.name);
            }
        },this,RES.ResourceItem.TYPE_IMAGE);
    }
    private isMusic: boolean = true;
    public playMusic(): void {
        if(this.isMusic) {
            if(this.BgSound) {
                if(this.BgSound.isOk) {
                    this.BgSound.playSound();
                    console.log("播放");
                    this.isMusic = false;
                }
            }
        }
        
    }

    /** 加载场景背景音乐 */
    private onMusic(): void {
/*        RES.getResByUrl('resource/assets/map/1001/sound.mp3',function(event: any) {
            var music:egret.Sound = <egret.Sound>event;
            
            mu.setTmd_a(music);
            
        },this,RES.ResourceItem.TYPE_SOUND);*/
        RES.getResByUrl('resource/assets/map/1001/sound.mp3',this.test,this,RES.ResourceItem.TYPE_SOUND);
    }
    private test(event: any):void{
        var mu: Nmd = new Nmd();
        this.BgSound = mu;
        var music: egret.Sound = <egret.Sound>event;
        mu.setTmd_a(music);
    }
}
