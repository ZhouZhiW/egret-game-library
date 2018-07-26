/**
 *
 * @author 
 *
 */
class GameScene extends egret.Sprite{
    /**地图元素*/
    private map_E:MapLoad;
    /**缓存可视元素的 图*/
    private context: egret.Sprite = new egret.Sprite();
    /**网格线 图层*/
    private lineScene: egret.Sprite = new egret.Sprite();
    /**障碍点 图层*/
    private pointScene: egret.Sprite = new egret.Sprite();
    private out_x:number = 0;
    private out_y:number = 0;
    /**地图坐标转换*/
    private mapPoint: MapPoint = new MapPoint();
    private tw:egret.Tween;
    //主角
    private hero: Hero = new Hero();
    //怪
    //private monster: Monster = new Monster();
    //private monster_a: Monster = new Monster();
    //怪组
    private Monster_zu:MonsterType[] = [];
    
    //private monster: Hero = new Hero();
    //private hero: Monster = new Monster();
    private timer: egret.Timer = new egret.Timer(500);
    
	public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
	}
	private init():void{
        
	    this.map_E = new MapLoad();
        this.addChild(this.context);
        //用 调度事件 侦听地图的配置是否加载完成
        this.map_E.addEventListener("LoadOk",this.onSceneEvent,this);
        //用 定时器 侦听 场景移动是否到位，反馈给 调用的对象
        
        
	}
    private onSceneEvent(e: egret.Event): void {
        //console.log(e.type);
        this.dispatchEvent(new egret.Event("mapLoadOk"));
        this.map_E.removeEventListener("LoadOk",this.onSceneEvent,this);
        
            
            
            //载入英雄
            //this.hero = new Hero();
            this.addChild(this.hero);
            //this.addChild(this.monster);
            //this.addChild(this.monster_a);
            //this.setMonster(2,1,1);
        this.onLine(MapLoad.mapWidth,MapLoad.mapHeight,MapLoad.tileWidth,MapLoad.tileHeight);
        //this.lineScene.cacheAsBitmap = true;
        
        //this.setLine();
        this.onPo(MapLoad.sceneArray,MapLoad.row,MapLoad.offsetY);
        //this.pointScene.cacheAsBitmap = true;
        
        //this.setPo();
        
        
    }
    /**网格线开关*/
    public setLine():void{
        if(this.lineScene.parent){
            this.removeChild(this.lineScene);
        }else{
            this.addChild(this.lineScene);
        }
    }
    /**障碍点开关*/
    public setPo(): void {
        if(this.pointScene.parent) {
            this.removeChild(this.pointScene);
        } else {
            this.addChild(this.pointScene);
        }
    }   
    /**画网格线*/
    private onLine(w1: number,h1: number,grid_W: number,grid_H:number):void{
        
        var n1: number = grid_H/2;
        var n2: number = grid_W/2;
        //var h1:number = 3600;
        //var w1:number = 4500;
        var m1: number = Math.round(h1 / grid_H * 2);
        //console.log("bb:" + m1);
        //this.line_A(n2,0,0,n1);
        //this.line_A(0,h1 - n1,n2,h1);
        //return;
        for(var i:number = 0;i < m1 ;i++){
            this.line_A(n2,0,0,n1);
            this.line_A(0,h1 - n1,n2,h1);
            n1 += grid_H;
            n2 += grid_W;
        }     
    }
    private line_A(a:number,b:number,c:number,d:number):void{
        var shp: egret.Shape = new egret.Shape();
        //shp.graphics.lineStyle(1,0x00ff00);//绿色
        shp.graphics.lineStyle(0.5,0xffffff);//白色
        shp.graphics.moveTo(a,b);
        shp.graphics.lineTo(c,d);
        shp.graphics.endFill();
        this.lineScene.addChild(shp);
    }
    /**画障碍点*/
    private onPo(sceneArray: any,row: number,offsetY:number): void {
        var t:string;
        var m:number = 30;
        var n:number = 15;
        for(var i:number = 0;i<row;i++){
            for(var j: number = 0;j < row;j++) {
                t = sceneArray[i][j];
                if(t != "0"){
                    //画中心点
                    var center: egret.Shape = new egret.Shape();
                    if(t == "1") center.graphics.lineStyle(0.5,0xff0000);
                    if(t == "2") center.graphics.lineStyle(0.5,0x0000ff);
                    //center.graphics.beginFill(0xff0000,1);
                    center.graphics.drawCircle(0,0,6);
                    center.graphics.endFill();
                    //center.anchorOffsetX = 3;
                    //center.anchorOffsetY = 3;
                    center.x = m * (i - (offsetY - j));
                    center.y = n * (i + offsetY - j);
                    this.pointScene.addChild(center);
                }
            }
        }
        
    }
    
    public mapOk(nx: number,ny: number,n_z: egret.Point[]):void{
        
        this.map_E.playMusic();//有些 浏览器 需要点击一次 才能播放音频 
        
        this.hero.moveHero(nx,ny,n_z);
        
    	  this.out_x = nx;
        this.out_y = ny;
        
/*        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
        var isRemove:boolean = false;
        var imgN:imgName;
        
        for(var i: number = 0,length:number = this.map_E.mapsElement.length;i < length;i++) {
            isRemove = true;
            imgN = this.map_E.mapsElement[i];
            //if(mm.x > Vc.x - stageW && mm.x < Vc.x + stageW && mm.y > Vc.y - stageH && mm.y < Vc.y + stageH) 
            if(imgN.x > nx - stageW && imgN.x < nx + stageW * 2) {
                if(imgN.y > ny - stageH && imgN.y < ny + stageH * 2) {
                    
                    if(imgN.isLoad){
                        this.context.addChild(imgN.mapsElement);
                        isRemove = false;
                    }else{
                        this.map_E.onMap(imgN,this.context);
                    }
                }
            }
            if(isRemove) {
                if(imgN.isLoad){
                    if(imgN.mapsElement.parent) {
                        imgN.mapsElement.parent.removeChild(imgN.mapsElement);
                    }
                }
                
            }
            
        }
*/        
        //this.context.cacheAsBitmap = true;//缓存位图(如果合成一张超大图，会卡一下，所以。。然并卵。。)
        //console.log(this.context.width + "|" + this.context.height);
        
        /*if(this.lineScene.parent) {
            this.swapChildren(this.lineScene,this.context);//交换深度
        }
        if(this.pointScene.parent) {
            this.swapChildren(this.pointScene,this.lineScene);//交换深度
        }*/
        

        
        /*if(this.hero.parent) {
            this.swapChildren(this.hero,this.pointScene);//交换深度
        }*/
        
        this.isTimer(true);
        
        this.moveScene(nx,ny,n_z);
	}
	/**移动场景*/
    private moveScene(nx: number,ny: number,n_z: egret.Point[]):void{
    	
        var sW: number = egret.MainContext.instance.stage.stageWidth / 2;
        var sH: number = egret.MainContext.instance.stage.stageHeight / 2;
        this.tw = egret.Tween.get(this);
        
        var np: egret.Point = new egret.Point();
        np.x = 0;
        np.y = 0;
        var c:number = 0;
        var mp: egret.Point;
        var vb:number = MapLoad.tileHeight;
        var speed:number = 200;
        var va:number = 0;
        for(var i: number = 0, j = n_z.length; i < j; i++){
            mp = Tile.getTilePointToStage(n_z[i].x,n_z[i].y);
            mp.x = mp.x - sW;
            mp.y = mp.y / 2 - sH;
            //根据格子距离 改变速度
            c = this.distance(np.x,np.y,mp.x,mp.y);
            if(c > vb) {
                va = speed * 2;
            } else {
                va = speed;     
            }
            
            this.tw.to({ x: -mp.x,y: -mp.y },va);
            np.x = mp.x;
            np.y = mp.y;
        }
        
	}

	/**删除缓动*/
    public reMoveTw(): egret.Point{
    	  if(this.tw){
            this.tw.pause;
            this.tw = new egret.Tween.removeTweens(this);
    	  }
    	  
        //this.monster.reMoveTw();
    	  
        var ww: egret.Point;
        ww = this.hero.reMoveTw();
        
        var hh: egret.Point = new egret.Point();
        
        /*if(this.out_x < 0){
            hh.x = -Math.abs(this.x);
        }else{
            hh.x = Math.abs(this.x);
        }
        if(this.out_y < 0){
            hh.y = -Math.abs(this.y);
        }else{
            hh.y = Math.abs(this.y);
        }*/
        //console.log(hh.x + " | " + hh.y);
        hh.x = this.x;
        hh.y = this.y;
        var po:egret.Point = this.hero.getHeroPoint();
        //console.log(po.x + "|" + po.y);
        return ww;
	}
	
    /**是否启动定时器*/
    private isTimer(is: boolean) {
        if(is) {
            this.timer.addEventListener(egret.TimerEvent.TIMER,this.onRoleTimer,this);
            this.timer.start();
        } else {
            this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onRoleTimer,this);
            this.timer.stop();
        }
    }
    private heroSetp:number = 0;
    private onRoleTimer(evt: egret.Event): void{
        //调整 显示次序
        this.setHeroIndex();
        if(this.out_x == Math.abs(this.x) && this.out_y == Math.abs(this.y)){
            this.isTimer(false);
        }
        //console.log("KKK: " + this.out_x + "  " + Math.abs(this.x));
        //走动中 累计 2 次 定时器，检测一次 地图块的加载 和 显示
        if(this.heroSetp <= 0){
            this.heroSetp = 2;
            this.loMap();
        }else{
            this.heroSetp -= 1;
        }
        

    }
    /** 动态加载 和 显示地图块 */
	private loMap():void{
        var imgWH: number = MapLoad.imgWH;
        var stageW: number = this.stage.stageWidth / 2 + imgWH;
        var stageH: number = this.stage.stageHeight / 2 + imgWH;
        imgWH /= 2;

        var isRemove: boolean = false;
        var imgN: imgName;
        var j: number = this.map_E.mapsElement.length;
        var Vc: egret.Point = this.hero.getHeroPoint();
        Vc.x += 240;
        Vc.y += 400;
        var mm: egret.Point = new egret.Point();

        for(var i: number = 0;i < j;i++) {
            isRemove = true;
            imgN = this.map_E.mapsElement[i];
            mm.x = imgN.x + imgWH;
            mm.y = imgN.y + imgWH;
            if(mm.x > Vc.x - stageW && mm.x < Vc.x + stageW && mm.y > Vc.y - stageH && mm.y < Vc.y + stageH) {
                //console.log("A: " + imgN.x + " " + imgN.y + " | " + Vc.x + " " + Vc.y);
                if(imgN.isLoad) {
                    this.context.addChild(imgN.mapsElement);
                    isRemove = false;
                } else {
                    this.map_E.onMap(imgN,this.context);
                }
            }
            if(isRemove) {
                if(imgN.isLoad) {
                    if(imgN.mapsElement.parent) {
                        imgN.mapsElement.parent.removeChild(imgN.mapsElement);
                    }
                }

            }
        }        
	}
	/**调整显示次序*/
	private setHeroIndex():void{
        //=======================================调整显示次序 开始
        var stageW: number = this.stage.stageWidth / 2;
        var stageH: number = this.stage.stageHeight / 2;
        var mm: egret.Point;
        var j: number = this.Monster_zu.length;
        //console.log(".........");
        var Va: number = this.getChildIndex(this.hero);
        var Vc: egret.Point = this.hero.getHeroPoint();
        //var Vc: number = hh.y;
        var Vb: number;
        for(var i: number = 0;i < j;i++) {
            if(!this.Monster_zu[i].monster.parent) this.addChild(this.Monster_zu[i].monster);
            
            mm = this.Monster_zu[i].monster.getHeroPoint();
            
            if(mm.x > Vc.x - stageW && mm.x < Vc.x + stageW && mm.y > Vc.y - stageH && mm.y < Vc.y + stageH){
                Vb = this.getChildIndex(this.Monster_zu[i].monster);

                if(Va > Vb && Vc.y < mm.y) {
                    this.swapChildren(this.Monster_zu[i].monster,this.hero);//交换深度
                } else if(Va < Vb && Vc.y > mm.y) {
                    this.swapChildren(this.hero,this.Monster_zu[i].monster);//交换深度
                }
                this.Monster_zu[i].monster.isTimer(true);
                //console.log("AA: " + i);
            } else {
                if(this.Monster_zu[i].monster.parent) this.removeChild(this.Monster_zu[i].monster);
                this.Monster_zu[i].monster.isTimer(false);
            }
            
        }
        //=======================================调整显示次序 结束
	}
    /** 获取A*格两点的格子数距离  */
    private distance(startX: number,startY: number,endX: number,endY: number): number {
        var dx: number = Math.abs(startX - endX);
        var dy: number = Math.abs(startY - endY);
        return Math.max(dx,dy);
    }
    /**设置英雄坐标*/
    public setHeroPoint(nx: number,ny: number): void {
        this.hero.setHeroPoint(nx,ny);//移动英雄到指定坐标点
        //var stageW: number = this.stage.stageWidth;
        //var stageH: number = this.stage.stageHeight;
        //this.monster.setHeroPoint(690,1115);
        //this.monster_a.setHeroPoint(780,1130);
    }
    //private monster_a: Monster = new Monster();
    /**设置怪物*/
    public setMonster(key:number,mo_x:number,mo_y:number): void {
        //console.log("BB:" + mo_x + " " + mo_y);
        var mo: MonsterType = new MonsterType();
        var m:Monster = new Monster();
        mo.monster = m;
        mo.key = key;
        mo.monster.setHeroPoint(mo_x,mo_y);
        this.addChild(mo.monster);
        this.Monster_zu.push(mo);
    }
}
