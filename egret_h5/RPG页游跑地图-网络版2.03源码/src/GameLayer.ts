/**
 *
 * @author 
 *
 */
class GameLayer extends egret.DisplayObjectContainer {
    private stageW: number = 0;
    private stageH: number = 0;
    public static gameScene:GameScene;
    //与 场景左上角 的 总距离
    private scX:number = 0;
    private scY:number = 0;
    /**用户点击 XY*/
    private downPoint: egret.Point = new egret.Point();
    //主角运动距离
    private speedX: number = 0;
    private speedY: number = 0;
    /**中心点*/
    private center: egret.Shape = new egret.Shape();
    /**地图坐标转换*/
    private mapPoint:MapPoint;
    private textField:egret.TextField = new egret.TextField();
    /**现在的格子*/
    private onGrid: egret.Point = new egret.Point();
    /**要到的格子*/
    private inGrid: egret.Point = new egret.Point();
    
    private tile_a:Tile = new Tile();
    
    private aStar_a:AStar;
    
    //主角
    //private hero:Hero;
    
	public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
	}
    private init():void {
        //  获取屏幕大小
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        //this.stageW = egret.MainContext.instance.stage.stageWidth / 2;
        //this.stageH = egret.MainContext.instance.stage.stageHeight / 2;
        
        this.touchEnabled = true;//触摸启用
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouch,this);
        //纯色背景
        var shp: egret.Shape = new egret.Shape;
        shp.graphics.beginFill(0x336699);//填充
        shp.graphics.drawRoundRect(0,0,this.stageW,this.stageH,3,3);
        shp.graphics.endFill();
        this.addChild(shp);
        //载入场景
        GameLayer.gameScene = new GameScene();
        this.addChild(GameLayer.gameScene);
        
        //用 调度事件 侦听场景的移动是否到位
        GameLayer.gameScene.addEventListener("mapOk",this.onSceneEvent,this);
        
        this.textField.touchEnabled = true;
        this.textField.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapHandler,this);
        this.textField.size = 22;
        this.textField.x = this.stageW / 2;
        this.textField.y = 0;
        this.textField.width = this.stageW / 2;
        this.textField.height = 90;
        this.textField.textColor = 0xffffff;//设置颜色
        //this.textField.bold = true;
        
        this.textField.textAlign = "center";
        this.textField.text = "期待QQ:8X4X7X7X8";
        this.addChild(this.textField);
        
        //用 调度事件 侦听场景的配置是否加载完成
        GameLayer.gameScene.addEventListener("mapLoadOk",this.onSceneEvent,this);

    }
    /**移动场景*/
    private moveScene(nx: number,ny: number,n_z: egret.Point[]): void {
        
        //this.hero.moveHero(nx,ny,n_z);
        GameLayer.gameScene.mapOk(nx,ny,n_z);
        //var tw = egret.Tween.get(this.gameScene);
        //tw.to({ x: -nx,y: -ny },1000);
    }

    private onSceneEvent(e: egret.Event):void{
        //console.log(e.type);
        if(e.type == "mapLoadOk"){
            GameLayer.gameScene.removeEventListener("mapLoadOk",this.onSceneEvent,this);
            this.mapPoint = new MapPoint();
            this.tile_a.data = MapLoad.sceneArray;
            Tile.OFFSET_TAB_Y = MapLoad.offsetY;
            Tile.TILE_WIDTH = MapLoad.tileWidth;
            Tile.TILE_HEIGHT = MapLoad.tileHeight;
            Tile.TITE_HALF_WIDTH = MapLoad.tileWidth / 2;
            Tile.TITE_HALF_HEIGHT = MapLoad.tileWidth / 2;

            this.aStar_a = new AStar(this.tile_a,100);
            //设置出生点
            //this.movePoint(3032,424);
            
            //this.movePoint(240,400);
            //获取人物的坐标
            var xx:egret.Point = new egret.Point();
            xx.x = RoleConstant.player.x;
            xx.y = RoleConstant.player.y;
            
            var hh: egret.Point = this.mapPoint.Point_b(xx.x,xx.y);
            this.movePoint(hh.x,hh.y);
            //console.log("F: " + hh.x + " " + hh.y);
            //this.movePoint(3240,1310);
            //  ======================转换 到 格子中心点 坐标 开始
            //console.log(this.scX + "::" + this.scY);
            hh = this.mapPoint.Point_a(this.scX,this.scY);
            this.scX = hh.x;
            this.scY = hh.y;
            
            hh = this.mapPoint.Point_c(this.scX,this.scY);
            this.onGrid.x = hh.x;
            this.onGrid.y = hh.y;
            this.textField.text = "点击这里开关网格\n期待QQ:8X4X7X7X8\n地图坐标 x:" + this.scX + " y:" + this.scY + "\n格子坐标 x:" + hh.x + " y:" + hh.y;
            //  ======================转换 到 格子中心点 坐标 结束
            GameLayer.gameScene.x = -this.scX;
            GameLayer.gameScene.y = -this.scY;
            var grid_z: egret.Point[] = [];
            GameLayer.gameScene.mapOk(this.scX,this.scY,grid_z);//触发加载
            
            this.center.x = this.width / 2;
            this.center.y = this.height / 2;
            //this.hero.x = -this.scX;
            //this.hero.y = -this.scY;
            GameLayer.gameScene.setHeroPoint(this.scX,this.scY);//移动英雄到指定坐标点
            
            /*this.tile_a.data = MapLoad.sceneArray;
            Tile.OFFSET_TAB_Y = MapLoad.offsetY;
            Tile.TILE_WIDTH = MapLoad.tileWidth;
            Tile.TILE_HEIGHT = MapLoad.tileHeight;
            Tile.TITE_HALF_WIDTH = MapLoad.tileWidth / 2;
            Tile.TITE_HALF_HEIGHT = MapLoad.tileWidth / 2;
            
            this.aStar_a = new AStar(this.tile_a,100);*/
            
            hh = this.mapPoint.Point_b(70,82);
            hh.x -= this.stageW / 2;
            hh.y -= this.stageH / 2;
            GameLayer.gameScene.setMonster(1,hh.x,hh.y);//移动英雄到指定坐标点
            
            hh = this.mapPoint.Point_b(70,87);
            hh.x -= this.stageW / 2;
            hh.y -= this.stageH / 2;
            GameLayer.gameScene.setMonster(2,hh.x,hh.y);//移动英雄到指定坐标点

            hh = this.mapPoint.Point_b(76,86);
            hh.x -= this.stageW / 2;
            hh.y -= this.stageH / 2;
            GameLayer.gameScene.setMonster(3,hh.x,hh.y);//移动英雄到指定坐标点

            hh = this.mapPoint.Point_b(73,93);
            hh.x -= this.stageW / 2;
            hh.y -= this.stageH / 2;
            GameLayer.gameScene.setMonster(4,hh.x,hh.y);//移动英雄到指定坐标点

            hh = this.mapPoint.Point_b(60,102);
            hh.x -= this.stageW / 2;
            hh.y -= this.stageH / 2;
            GameLayer.gameScene.setMonster(5,hh.x,hh.y);//移动英雄到指定坐标点

            hh = this.mapPoint.Point_b(72,75);
            hh.x -= this.stageW / 2;
            hh.y -= this.stageH / 2;
            GameLayer.gameScene.setMonster(6,hh.x,hh.y);//移动英雄到指定坐标点

            hh = this.mapPoint.Point_b(82,68);
            hh.x -= this.stageW / 2;
            hh.y -= this.stageH / 2;
            GameLayer.gameScene.setMonster(7,hh.x,hh.y);//移动英雄到指定坐标点

            hh = this.mapPoint.Point_b(88,79);
            hh.x -= this.stageW / 2;
            hh.y -= this.stageH / 2;
            GameLayer.gameScene.setMonster(8,hh.x,hh.y);//移动英雄到指定坐标点
        }
        
    }
    
    /**响应屏幕的鼠标点击*/
    private onTouch(e: egret.TouchEvent) {
        //console.log(e.stageX + "|" + e.stageY);
        //console.log(":A:");
        //  ======================删除 运行中的缓动，返回对象的现在 坐标 开始
        //this.hero.reMoveTw();
        var hh: egret.Point = GameLayer.gameScene.reMoveTw();
        //console.log(hh.x + "||" + hh.y);
        this.scX = hh.x;
        this.scY = hh.y;
        hh = this.mapPoint.Point_c(this.scX,this.scY);
        this.onGrid.x = hh.x;
        this.onGrid.y = hh.y;
        //  ======================删除 运行中的缓动，返回对象的现在 坐标 结束
        //console.log(":B:");
        this.movePoint(e.stageX,e.stageY);
        //  ======================转换 到 格子中心点 坐标 开始
        hh = this.mapPoint.Point_a(this.scX,this.scY);
        //console.log(this.scX + "::" + this.scY + "::" + hh.x + "::" + hh.y);
        this.scX = hh.x;
        this.scY = hh.y;
        //接近 0 线坐标转换有点小问题。。暂时不去想了，做个判断转换。。
        if(this.scY == -5) this.scY = 5;
        if(this.scY == 10) this.scY = -10;
        if(this.scX == -5) this.scX = 5;
        if(this.scX == 10) this.scX = -10;
        //  ======================转换 到 格子中心点 坐标 结束
        //console.log(this.scX + "::" + this.scY);
        hh = this.mapPoint.Point_c(this.scX,this.scY);
        this.inGrid.x = hh.x;
        this.inGrid.y = hh.y;
        this.textField.text = "点击这里开关网格线\n期待QQ:8X4X7X7X8\n地图坐标 x:" + this.scX + " y:" + this.scY + "\n格子坐标 x:" + hh.x + " y:" + hh.y;
        //console.log(":C:");
        if(this.onGrid.x == this.inGrid.x && this.onGrid.y == this.inGrid.y){
            
        }else{
            //var grid_z: Point[] = this.mapPoint.AStar(this.onGrid.x,this.onGrid.y,this.inGrid.x,this.inGrid.y);
            //this.moveScene(this.scX,this.scY,grid_z);
            //console.log(":C:" + this.onGrid.x + " " + this.onGrid.y);
            var arr: Array<any> = this.aStar_a.find(this.onGrid.x,this.onGrid.y,this.inGrid.x,this.inGrid.y);
            var grid_z: egret.Point[] = [];
            var ar_t:string = "";
            if(arr){
                //console.log(":D:" + arr.length);
                for(var i: number = 0,j = arr.length;i < j;i++) {
                    var ar: egret.Point = new egret.Point();
                    ar.x = arr[i][0];
                    ar.y = arr[i][1];
                    //console.log(ar.x + " | " + ar.y);
                    grid_z.push(ar);
                    
                    if(i == j - 1){
                        ar_t += ar.x + ",";
                        ar_t += ar.y;
                    }else{
                        ar_t += ar.x + ",";
                        ar_t += ar.y + "|";
                    }
                    
                } 
            }
            
            //this.moveScene(this.scX,this.scY,grid_z);
            
            //console.log("aa " + this.scX + " " + this.scY);
            //消息类型，格子坐标，地图坐标，路径数据
            //var msg: any = MsgType.msgB_a + "#" + hh.x + "," + hh.y + "#" + this.scX + "," + this.scY + "#" + ar_t;
            var json = {
                "move": [{
                    "type": MsgType.msgB_a,"point_a": hh.x + "," + hh.y,"point_b": this.scX + "," + this.scY,"astar": ar_t
                }]
            };
            this.pushMsg(json);
        }
        //console.log(":D:");
    }
    /**发送消息*/
    private pushMsg(msg: any) {
        if(NetMsg.isConnection) {
            NetMsg.serverConn.sendData(msg);
        }
    }
    /**移动到点*/
    private movePoint(zx:number,zy:number):void{
        //  获取屏幕大小
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        var sW: number = this.stageW / 2;
        var sH: number = this.stageH / 2;
        //计算用户点击 与 中心点 的距离
        var downX: number = Math.abs(zx - sW);
        var downY: number = Math.abs(zy - sH);
        if(downX && downY) {
            this.speedX = downX;
            this.speedY = downY;
        }
        //获取到用户点击的点
        this.downPoint.x = zx;
        this.downPoint.y = zy;
        
        //计算角度、方向
        var angleSpeed: number = Math.atan2(this.downPoint.y - sH,this.downPoint.x - sW);
        var vr: number = angleSpeed * 180 / Math.PI;//角度
        var n: number = this.FangXiang(vr);//方向
        this.tiaozheng(n,vr);//根据 鼠标点击的方向、角度，调整 角色动作 和 移动地图 
        //Hero.fx = n;
        //console.log("方向：" + n)
    }
    /**
     * 判断方向
     * 1右边，2下边，3，左边，4，上边，5，右下，6，左下，7，左上，8，右上
     */ 
    private FangXiang(N: number): number {
        var F = 1;
        //console.log("调试输出N ：" + N);//调试
        if(N <= 20 && N >= -20) {
            F = 1;
        } else if(N <= 110 && N >= 70) {
            F = 2;
        } else if(N <= -170 || N >= 170) {
            F = 3;
        } else if(N <= -70 && N >= -110) {
            F = 4;
        } else if(N < 70 && N > 20) {
            F = 5;
        } else if(N < 170 && N > 110) {
            F = 6;
        } else if(N < -110 && N > -170) {
            F = 7;
        } else if(N < -20 && N > -70) {
            F = 8;
        }
        return F;
    }
    
    /**
     * 调整角色动作
     * n:方向
     * m:角度
     */
    private tiaozheng(n: number,m:number): void {

        switch(n) {
            case 1:
                //右边
                this.scX += this.speedX;
                if(m>0){
                    this.scY += this.speedY;
                }else if(m<0){
                    this.scY -= this.speedY;
                }
                break;
            case 2:
                //下边
                if(m<90){
                    this.scX += this.speedX;
                }else if(m>90){
                    this.scX -= this.speedX;
                }
                this.scY += this.speedY;
                break;
            case 3:
                //左边
                this.scX -= this.speedX;
                if(m>0){
                    this.scY += this.speedY;
                }else if(m<0){
                    this.scY -= this.speedY;
                }
                break;
            case 4:
                //上边
                if(m>-90){
                    this.scX += this.speedX;
                }else if(m<-90){
                    this.scX -= this.speedX;
                }
                this.scY -= this.speedY;
                break;
            case 5:
                //右下
                this.scX += this.speedX;
                this.scY += this.speedY;
                break;
            case 6:
                //左下
                this.scX -= this.speedX;
                this.scY += this.speedY;
                break;
            case 7:
                //左上
                this.scX -= this.speedX;
                this.scY -= this.speedY;
                break;
            case 8:
                //右上
                this.scX += this.speedX;
                this.scY -= this.speedY;
                break;
        }
        
    }
    /**响应文本的点击事件*/
    private tapHandler(e: egret.TouchEvent) {
        GameLayer.gameScene.setLine();
        GameLayer.gameScene.setPo();
    }
}
